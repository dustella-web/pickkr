import { describe, expect, it } from 'vitest';
import {
  buildCrossChannelPool,
  extractTopDeals,
  type ChannelSnapshotInput,
} from '../cross-channel-insights';
import type { RankingItem } from '@/types/ranking';

function makeItem(id: string, price: number, salePrice: number | null): RankingItem {
  return {
    rank: 1,
    rank_delta: null,
    source_product_id: id,
    product_url: `https://example.com/${id}`,
    image_url: 'https://example.com/img.jpg',
    currency: 'KRW',
    price,
    sale_price: salePrice,
    brand: { ko: '브랜드', en: 'Brand', ja: 'ブランド', 'zh-CN': '品牌', 'zh-TW': '品牌' },
    name: { ko: '상품', en: `Product ${id}`, ja: '商品', 'zh-CN': '商品', 'zh-TW': '商品' },
    category: 'beauty',
    editorial_summary: { ko: '', en: '', ja: '', 'zh-CN': '', 'zh-TW': '' },
  };
}

describe('cross-channel-insights', () => {
  it('extracts top discounted deals across all channels sorted by discount percentage', () => {
    const inputs: ChannelSnapshotInput[] = [
      {
        channel: 'missha',
        items: [makeItem('m1', 20000, 14000), makeItem('m2', 10000, null)], // 30%, 0%
      },
      {
        channel: 'lottedfs',
        items: [makeItem('l1', 100, 53), makeItem('l2', 50, 40)], // 47%, 20%
      },
      {
        channel: 'daisomall',
        items: [makeItem('d1', 3000, null)], // 0%
      },
    ];

    const deals = extractTopDeals(inputs, 3);
    expect(deals).toHaveLength(3);
    expect(deals[0].item.source_product_id).toBe('l1');
    expect(deals[0].discountPct).toBe(47);
    expect(deals[0].channel).toBe('lottedfs');
    expect(deals[1].item.source_product_id).toBe('m1');
    expect(deals[1].discountPct).toBe(30);
    expect(deals[2].item.source_product_id).toBe('l2');
    expect(deals[2].discountPct).toBe(20);
  });

  it('flattens all channel items with channel metadata via buildCrossChannelPool', () => {
    const inputs: ChannelSnapshotInput[] = [
      { channel: 'missha', items: [makeItem('m1', 10000, null)] },
      { channel: 'daisomall', items: [makeItem('d1', 3000, null)] },
    ];

    const pool = buildCrossChannelPool(inputs);
    expect(pool).toHaveLength(2);
    expect(pool[0].channel).toBe('missha');
    expect(pool[1].channel).toBe('daisomall');
  });
});
