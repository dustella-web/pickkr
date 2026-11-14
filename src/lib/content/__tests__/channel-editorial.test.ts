import { describe, expect, it } from 'vitest';
import { PUBLIC_LOCALES } from '@/lib/i18n/messages';
import { getGuideBySlug } from '@/lib/content/guides';
import {
  getChannelEditorial,
  getGuidesIndexEditorial,
  getHomeEditorial,
} from '../channel-editorial';
import { generateMetadata as generateChannelMetadata } from '@/app/[locale]/channel/[channel]/page';
import type { ChannelId } from '@/types/ranking';

const CHANNELS: ChannelId[] = ['lottedfs', 'missha', 'daisomall'];

describe('channel editorial content', () => {
  it('provides localized editorial overview and methodology for every channel', () => {
    for (const channel of CHANNELS) {
      const editorial = getChannelEditorial(channel);
      expect(editorial.relatedGuideSlugs.length).toBeGreaterThanOrEqual(3);
      for (const slug of editorial.relatedGuideSlugs) {
        expect(getGuideBySlug(slug)).toBeDefined();
      }

      for (const locale of PUBLIC_LOCALES) {
        const copy = editorial.copy[locale];
        expect(copy.heading.trim().length).toBeGreaterThan(5);
        expect(copy.intro.trim().length).toBeGreaterThan(30);
        expect(copy.homeSummary.trim().length).toBeGreaterThan(20);
        expect(copy.homeSummary).not.toBe(copy.intro);
        expect(copy.paragraphs.length).toBeGreaterThanOrEqual(2);
        const totalChars =
          copy.intro.trim().length +
          copy.paragraphs.map((p) => p.trim().length).reduce((a, b) => a + b, 0);
        expect(totalChars).toBeGreaterThanOrEqual(300);
      }
    }
  });

  it('uses unique channel-specific descriptions in channel page metadata', async () => {
    for (const locale of PUBLIC_LOCALES) {
      const descriptions = new Set<string>();
      for (const channel of CHANNELS) {
        const meta = await generateChannelMetadata({
          params: Promise.resolve({ locale, channel }),
        });
        expect(meta.description).toBe(getChannelEditorial(channel).copy[locale].intro);
        descriptions.add(String(meta.description));
      }
      expect(descriptions.size).toBe(CHANNELS.length);
    }

    const invalidMeta = await generateChannelMetadata({
      params: Promise.resolve({ locale: 'en', channel: 'unknown' }),
    });
    expect(invalidMeta).toEqual({});
  });

  it('provides localized home editorial methodology across all public locales', () => {
    for (const locale of PUBLIC_LOCALES) {
      const home = getHomeEditorial(locale);
      expect(home.heading.trim().length).toBeGreaterThan(5);
      expect(home.paragraphs.length).toBeGreaterThanOrEqual(3);
      const totalChars = home.paragraphs
        .map((p) => p.trim().length)
        .reduce((a, b) => a + b, 0);
      const minChars = locale === 'en' ? 450 : 260;
      expect(totalChars).toBeGreaterThanOrEqual(minChars);
    }
  });

  it('provides localized guides hub intro copy across all public locales', () => {
    for (const locale of PUBLIC_LOCALES) {
      const intro = getGuidesIndexEditorial(locale).trim();
      const minChars = locale === 'en' ? 180 : 100;
      expect(intro.length).toBeGreaterThanOrEqual(minChars);
    }
  });
});
