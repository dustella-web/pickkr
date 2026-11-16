import { describe, expect, it } from 'vitest';
import { PUBLIC_LOCALES } from '@/lib/i18n/messages';
import {
  buildFaqJsonLd,
  getChannelComparisonData,
  getTravelerFaqItems,
} from '../channel-comparison';

describe('channel-comparison', () => {
  it('provides localized 3-channel comparison rows for every public locale', () => {
    for (const locale of PUBLIC_LOCALES) {
      const data = getChannelComparisonData(locale);
      expect(data.rows).toHaveLength(3);
      expect(data.rows.map((r) => r.channel)).toEqual(['lottedfs', 'missha', 'daisomall']);
      for (const row of data.rows) {
        expect(row.priceTier.trim().length).toBeGreaterThan(2);
        expect(row.taxBenefit.trim().length).toBeGreaterThan(5);
        expect(row.bestFor.trim().length).toBeGreaterThan(5);
      }
    }
  });

  it('builds valid FAQPage JSON-LD from localized traveler FAQs', () => {
    for (const locale of PUBLIC_LOCALES) {
      const faqs = getTravelerFaqItems(locale);
      expect(faqs.length).toBeGreaterThanOrEqual(4);
      const jsonLd = buildFaqJsonLd(locale);
      expect(jsonLd['@type']).toBe('FAQPage');
      expect(jsonLd.mainEntity).toHaveLength(faqs.length);
      expect(jsonLd.mainEntity[0]['@type']).toBe('Question');
      expect(jsonLd.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
    }
  });
});
