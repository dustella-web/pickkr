import { describe, expect, it } from 'vitest';
import { PUBLIC_LOCALES } from '@/lib/i18n/messages';
import { LEGAL_SLUGS, getLegalPage } from '../legal-pages';
import { generateMetadata as generateLegalMetadata } from '@/app/[locale]/legal/[slug]/page';

describe('legal pages content and metadata', () => {
  it('provides substantial localized content for every legal page', () => {
    for (const slug of LEGAL_SLUGS) {
      for (const locale of PUBLIC_LOCALES) {
        const page = getLegalPage(slug, locale);
        expect(page.title.trim().length).toBeGreaterThan(2);
        expect(page.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(page.paragraphs.length).toBeGreaterThanOrEqual(4);
        expect(page.sectionHeadings).toHaveLength(page.paragraphs.length);
        for (const heading of page.sectionHeadings) {
          expect(heading.trim().length).toBeGreaterThan(2);
        }
        const totalChars = page.paragraphs
          .map((p) => p.trim().length)
          .reduce((a, b) => a + b, 0);
        const minChars = locale === 'en' ? 550 : 300;
        expect(totalChars).toBeGreaterThanOrEqual(minChars);
      }
    }
  });

  it('uses unique first-paragraph descriptions in legal page metadata', async () => {
    for (const locale of PUBLIC_LOCALES) {
      const descriptions = new Set<string>();
      for (const slug of LEGAL_SLUGS) {
        const expectedDesc = getLegalPage(slug, locale).paragraphs[0];
        const meta = await generateLegalMetadata({
          params: Promise.resolve({ locale, slug }),
        });
        expect(meta.description).toBe(expectedDesc);
        expect(String(meta.description).trim().length).toBeGreaterThan(20);
        descriptions.add(String(meta.description));
      }
      expect(descriptions.size).toBe(LEGAL_SLUGS.length);
    }
  });
});
