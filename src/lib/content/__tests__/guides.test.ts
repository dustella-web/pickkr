import { describe, it, expect } from 'vitest';
import {
  GUIDE_ARTICLES,
  formatReadingTime,
  getGuideCoverImage,
  getLocalizedCategory,
  getRelatedGuides,
} from '../guides';
import { PUBLIC_LOCALES } from '@/lib/i18n/messages';

describe('GUIDE_ARTICLES', () => {
  it('should provide at least 15 original articles for AdSense readiness', () => {
    expect(GUIDE_ARTICLES.length).toBeGreaterThanOrEqual(15);
  });

  it('should have unique slugs and complete 4-locale content for every article', () => {
    const slugs = new Set<string>();
    const uniqueCovers = new Set<string>();
    for (const article of GUIDE_ARTICLES) {
      expect(slugs.has(article.slug)).toBe(false);
      slugs.add(article.slug);

      for (const locale of PUBLIC_LOCALES) {
        expect(article.title[locale].trim().length).toBeGreaterThan(5);
        expect(article.summary[locale].trim().length).toBeGreaterThan(10);
        expect(article.sections[locale].length).toBeGreaterThanOrEqual(5);
        const minSectionLen = 220;
        const minTotalLen = 1500;
        let totalLength = 0;
        for (const sec of article.sections[locale]) {
          expect(sec.heading.trim().length).toBeGreaterThan(3);
          const bodyLen = sec.body.trim().length;
          expect(bodyLen).toBeGreaterThanOrEqual(minSectionLen);
          totalLength += bodyLen;
        }
        expect(totalLength).toBeGreaterThanOrEqual(minTotalLen);
      }

      const cover = getGuideCoverImage(article.slug);
      expect(cover).toMatch(/^https:\/\//);
      expect(cover).not.toMatch(/lottedfs\.com|daisomall\.co\.kr|missha\.com/);
      expect(cover).toContain('w=1200');
      expect(cover).toContain('h=630');
      uniqueCovers.add(cover);
    }
    expect(uniqueCovers.size).toBe(GUIDE_ARTICLES.length);
  });

  it('should spread publishedAt dates across the past month instead of a single day', () => {
    const uniqueDates = new Set<string>();
    for (const article of GUIDE_ARTICLES) {
      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.publishedAt >= '2026-10-15').toBe(true);
      expect(article.publishedAt <= '2026-11-14').toBe(true);
      uniqueDates.add(article.publishedAt);
    }
    expect(uniqueDates.size).toBeGreaterThanOrEqual(12);
  });

  it('should localize guide categories and reading times for all public locales', () => {
    const categories = [...new Set(GUIDE_ARTICLES.map((a) => a.category))];
    for (const cat of categories) {
      for (const locale of PUBLIC_LOCALES) {
        const label = getLocalizedCategory(cat, locale);
        expect(label.trim().length).toBeGreaterThan(1);
        if (locale !== 'en') {
          expect(label).not.toBe(cat);
        }
      }
    }

    expect(formatReadingTime(8, 'en')).toBe('8 min read');
    expect(formatReadingTime(8, 'ja')).toContain('8');
    expect(formatReadingTime(8, 'zh-CN')).toContain('8');
    expect(formatReadingTime(8, 'zh-TW')).toContain('8');
  });

  it('should return distinct related guides excluding the current slug', () => {
    for (const article of GUIDE_ARTICLES) {
      const related = getRelatedGuides(article.slug, 3);
      expect(related.length).toBe(3);
      const slugs = new Set(related.map((item) => item.slug));
      expect(slugs.size).toBe(3);
      expect(slugs.has(article.slug)).toBe(false);
    }
  });
});
