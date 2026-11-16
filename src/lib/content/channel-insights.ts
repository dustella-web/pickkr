import { convertPrice } from '@/lib/i18n/format-price';
import type { ExchangeRateMap, SupportedCurrency } from '@/lib/i18n/exchange-rates';
import type { PublicLocale } from '@/lib/i18n/messages';
import type { RankingItem } from '@/types/ranking';

export type InsightCategoryKey =
  | 'mask'
  | 'serum'
  | 'cream'
  | 'makeup'
  | 'cleansing'
  | 'lipEye'
  | 'skincare';

export interface ChannelInsights {
  itemCount: number;
  averagePrice: number;
  saleCount: number;
  maxDiscountPct: number;
  risingCount: number;
  topCategories: Array<{ key: InsightCategoryKey; count: number }>;
}

const CATEGORY_RULES: Array<{ key: InsightCategoryKey; pattern: RegExp }> = [
  { key: 'lipEye', pattern: /\b(lip|eye)\b|립|아이|입술|눈가/i },
  { key: 'mask', pattern: /\b(mask|pad|pads|patch|patches|sheet)\b|마스크|패드|패치|팩/i },
  { key: 'cleansing', pattern: /\b(cleans|foam|wash|peel|sponge|puff|brush|scrub|exfoliat)\b|클렌징|폼|스펀지|퍼프|브러시|필링/i },
  { key: 'makeup', pattern: /\b(bb|cc|cushion|sun|sunscreen|spf|foundation|concealer|tint|blush|powder|primer)\b|비비|쿠션|선크림|파운데이션|틴트|파우더/i },
  { key: 'serum', pattern: /\b(serum|essence|ampoule|concentrate|toner|mist|treatment)\b|세럼|에센스|앰플|토너|미스트/i },
  { key: 'cream', pattern: /\b(cream|balm|lotion|emulsion|moisturizer|gel|ointment)\b|크림|밤|로션|에멀전/i },
];

export const INSIGHT_CATEGORY_LABELS: Record<
  InsightCategoryKey,
  Record<PublicLocale, string>
> = {
  mask: { en: 'Masks & Pads', ja: 'マスク・パッド', 'zh-CN': '面膜贴片', 'zh-TW': '面膜貼片' },
  serum: { en: 'Serums & Essences', ja: '美容液・トナー', 'zh-CN': '精华爽肤水', 'zh-TW': '精華化妝水' },
  cream: { en: 'Creams & Balms', ja: 'クリーム・保湿', 'zh-CN': '面霜保湿', 'zh-TW': '乳霜保濕' },
  makeup: { en: 'Base & Sun', ja: 'ベース・UV', 'zh-CN': '底妆防晒', 'zh-TW': '底妝防曬' },
  cleansing: { en: 'Cleansing & Tools', ja: '洗顔・ツール', 'zh-CN': '洁面美妆工具', 'zh-TW': '潔顏美妝工具' },
  lipEye: { en: 'Lip & Eye Care', ja: 'リップ・目元', 'zh-CN': '唇部眼部护理', 'zh-TW': '唇部眼周護理' },
  skincare: { en: 'Daily Skincare', ja: 'スキンケア', 'zh-CN': '基础护肤', 'zh-TW': '基礎保養' },
};

function classifyCategory(item: RankingItem): InsightCategoryKey {
  const haystack = `${item.name.en} ${item.name.ko}`;
  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(haystack)) {
      return rule.key;
    }
  }
  return 'skincare';
}

/**
 * Computes weekly market insights from a channel's ranking items.
 */
export function computeChannelInsights(
  items: RankingItem[],
  rates: ExchangeRateMap,
  targetCurrency: SupportedCurrency
): ChannelInsights {
  if (items.length === 0) {
    return {
      itemCount: 0,
      averagePrice: 0,
      saleCount: 0,
      maxDiscountPct: 0,
      risingCount: 0,
      topCategories: [],
    };
  }

  let totalConverted = 0;
  let pricedCount = 0;
  let saleCount = 0;
  let maxDiscountPct = 0;
  let risingCount = 0;
  const counts = new Map<InsightCategoryKey, number>();

  for (const item of items) {
    const hasSale =
      item.sale_price !== null && item.sale_price > 0 && item.sale_price < item.price;
    const effective = hasSale ? (item.sale_price as number) : item.price;

    if (effective > 0) {
      totalConverted += convertPrice(effective, item.currency, targetCurrency, rates);
      pricedCount += 1;
    }

    if (hasSale && item.price > 0) {
      saleCount += 1;
      const pct = Math.round(((item.price - (item.sale_price as number)) / item.price) * 100);
      if (pct > maxDiscountPct) {
        maxDiscountPct = pct;
      }
    }

    if (typeof item.rank_delta === 'number' && item.rank_delta > 0) {
      risingCount += 1;
    }

    const cat = classifyCategory(item);
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }

  const topCategories = Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return {
    itemCount: items.length,
    averagePrice: pricedCount > 0 ? totalConverted / pricedCount : 0,
    saleCount,
    maxDiscountPct,
    risingCount,
    topCategories,
  };
}
