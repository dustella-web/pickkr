import { describe, expect, it } from 'vitest';
import { computeChannelInsights } from '../channel-insights';
import type { ExchangeRateMap } from '@/lib/i18n/exchange-rates';
import type { RankingItem } from '@/types/ranking';

const SAMPLE_RATES: ExchangeRateMap = {
  KRW: 1,
  USD: 0.00072,
  JPY: 0.11,
  CNY: 0.0052,
  TWD: 0.023,
};

function makeItem(overrides: Partial<RankingItem>): RankingItem {
  return {
    rank: 1,
    rank_delta: null,
    source_product_id: 'id-1',
    product_url: 'https://example.com',
    image_url: 'https://example.com/img.jpg',
    currency: 'KRW',
    price: 10000,
    sale_price: null,
    brand: { ko: '브랜드', en: 'Brand', ja: 'ブランド', 'zh-CN': '品牌', 'zh-TW': '品牌' },
    name: {
      ko: '콜라겐 마스크팩 10매',
      en: 'Collagen Mask Pack 10 Sheets',
      ja: 'コラーゲンマスク',
      'zh-CN': '胶原蛋白面膜',
      'zh-TW': '膠原蛋白面膜',
    },
    category: 'beauty',
    editorial_summary: { ko: '', en: '', ja: '', 'zh-CN': '', 'zh-TW': '' },
    ...overrides,
  };
}

describe('computeChannelInsights', () => {
  it('computes average price, sale count, max discount, and rising count', () => {
    const items: RankingItem[] = [
      makeItem({ rank: 1, price: 10000, sale_price: 5000, rank_delta: 2 }),
      makeItem({
        rank: 2,
        price: 20000,
        sale_price: 15000,
        rank_delta: null,
        name: {
          ko: '시카 세럼 50ml',
          en: 'Cica Repair Serum 50ml',
          ja: 'シカセラム',
          'zh-CN': '积雪草精华',
          'zh-TW': '積雪草精華',
        },
      }),
      makeItem({
        rank: 3,
        price: 10000,
        sale_price: null,
        rank_delta: -1,
        name: {
          ko: '콜라겐 크림 50ml',
          en: 'Collagen Cream 50ml',
          ja: 'コラーゲンクリーム',
          'zh-CN': '胶原蛋白面霜',
          'zh-TW': '膠原蛋白乳霜',
        },
      }),
    ];

    const insights = computeChannelInsights(items, SAMPLE_RATES, 'KRW');

    expect(insights.itemCount).toBe(3);
    expect(insights.averagePrice).toBe(10000); // (5000 + 15000 + 10000) / 3
    expect(insights.saleCount).toBe(2);
    expect(insights.maxDiscountPct).toBe(50);
    expect(insights.risingCount).toBe(1);
    expect(insights.topCategories.length).toBeGreaterThan(0);
  });

  it('handles empty items safely', () => {
    const insights = computeChannelInsights([], SAMPLE_RATES, 'USD');
    expect(insights.itemCount).toBe(0);
    expect(insights.averagePrice).toBe(0);
    expect(insights.saleCount).toBe(0);
    expect(insights.maxDiscountPct).toBe(0);
  });
});
