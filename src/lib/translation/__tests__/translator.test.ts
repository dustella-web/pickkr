import { describe, it, expect, vi } from 'vitest';
import type { RankingItem } from '@/types/ranking';
import { translateRankingItems, lookupBrandGlossary } from '../translator';

function makeUnlocalizedItem(brandKo: string, nameKo: string): RankingItem {
  return {
    rank: 1,
    rank_delta: null,
    source_product_id: '100',
    product_url: 'https://example.com/100',
    image_url: 'https://example.com/100.jpg',
    currency: 'USD',
    price: 25,
    sale_price: null,
    brand: { ko: brandKo, en: '', ja: '', 'zh-CN': '', 'zh-TW': '' },
    name: { ko: nameKo, en: '', ja: '', 'zh-CN': '', 'zh-TW': '' },
    category: 'beauty',
    editorial_summary: { ko: '', en: '', ja: '', 'zh-CN': '', 'zh-TW': '' },
  };
}

describe('translator', () => {
  it('should resolve known K-Beauty brands from glossary without calling API', () => {
    const entry = lookupBrandGlossary('에스트라');
    expect(entry).toEqual({
      ko: '에스트라',
      en: 'AESTURA',
      ja: 'エストラ',
      'zh-CN': 'AESTURA 瑷丝特兰',
      'zh-TW': 'AESTURA 靄絲特蘭',
    });
  });

  it('should skip already translated fields and translate missing ones via provider', async () => {
    const item = makeUnlocalizedItem('에스트라', '아토베리어365 크림');
    const mockProvider = vi.fn(async (texts: string[]) =>
      texts.map((t) => ({
        en: `[en] ${t}`,
        ja: `[ja] ${t}`,
        'zh-CN': `[zh-CN] ${t}`,
        'zh-TW': `[zh-TW] ${t}`,
      }))
    );

    const translated = await translateRankingItems([item], mockProvider);

    expect(mockProvider).toHaveBeenCalledTimes(1);
    expect(translated[0].brand.en).toBe('AESTURA');
    expect(translated[0].name.en).toBe('[en] 아토베리어365 크림');
    expect(translated[0].name['zh-TW']).toBe('[zh-TW] 아토베리어365 크림');

    // Re-running on already translated item should not call provider again
    await translateRankingItems(translated, mockProvider);
    expect(mockProvider).toHaveBeenCalledTimes(1);
  });
});
