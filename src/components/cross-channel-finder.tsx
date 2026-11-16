'use client';

import { useMemo, useState } from 'react';
import type { ExchangeRateMap } from '@/lib/i18n/currency';
import { convertPrice, getProductPriceDisplay } from '@/lib/i18n/format-price';
import { getUiMessages, type PublicLocale } from '@/lib/i18n/messages';
import type { CrossChannelItem } from '@/lib/content/cross-channel-insights';
import { buildProductImageAlt } from '@/lib/seo/metadata';
import { ProductImage } from '@/components/product-image';

interface FinderLabels {
  heading: string;
  subtitle: string;
  placeholder: string;
  clear: string;
  quickDeals: string;
  quickBudget: string;
  topDealsTitle: string;
  noMatches: string;
  matchesPrefix: string;
}

const FINDER_LABELS: Record<PublicLocale, FinderLabels> = {
  en: {
    heading: 'Search & Compare Across All 3 Channels',
    subtitle: 'Search 60 weekly best sellers by ingredient, brand, or budget across Lotte Duty Free, MISSHA, and DAISO.',
    placeholder: 'Search e.g. Collagen, Cica, BB Cream, Lip, PDRN...',
    clear: 'Reset',
    quickDeals: 'Top Discounts',
    quickBudget: 'Under 5,000 KRW',
    topDealsTitle: 'This Week’s Highest Discounts',
    noMatches: 'No matching products found across channels.',
    matchesPrefix: 'Showing matches:',
  },
  ja: {
    heading: '3チャネル横断リアルタイム検索・比較',
    subtitle: 'ロッテ免税店・MISSHA・ダイソーの週間Top 60商品を成分・ブランド・予算で横断検索できます。',
    placeholder: '成分・商品名で検索（例: Collagen, Cica, BB, Lip, PDRN）',
    clear: 'リセット',
    quickDeals: '割引率ランキング',
    quickBudget: '5,000ウォン以下',
    topDealsTitle: '今週の最大割引アイテム',
    noMatches: '該当する商品が見つかりませんでした。',
    matchesPrefix: '検索結果:',
  },
  'zh-CN': {
    heading: '跨三大渠道实时搜索与比价',
    subtitle: '一键检索乐天免税店、谜尚、大创本周 60 款热销单品，按成分、品牌或预算快速对比。',
    placeholder: '搜索成分或商品（如 Collagen, Cica, BB, Lip, PDRN）',
    clear: '重置',
    quickDeals: '折扣榜',
    quickBudget: '5,000韩元以下',
    topDealsTitle: '本周最高折扣好物',
    noMatches: '未找到符合条件的跨渠道商品。',
    matchesPrefix: '匹配结果:',
  },
  'zh-TW': {
    heading: '跨三大通路即時搜尋與比價',
    subtitle: '一鍵搜尋樂天免稅店、MISSHA、大創本週 60 款熱銷單品，依成分、品牌或預算快速對比。',
    placeholder: '搜尋成分或品項（如 Collagen, Cica, BB, Lip, PDRN）',
    clear: '重設',
    quickDeals: '折扣榜',
    quickBudget: '5,000韓元以下',
    topDealsTitle: '本週最高折扣推薦',
    noMatches: '找不到符合條件的跨通路商品。',
    matchesPrefix: '符合結果:',
  },
};

const QUICK_KEYWORDS = ['Collagen', 'Cica', 'PDRN', 'Mask', 'Lip'] as const;

type QuickPreset = 'none' | 'deals' | 'budget';

export function CrossChannelFinder({
  pool,
  topDeals,
  locale,
  exchangeRates,
}: {
  pool: CrossChannelItem[];
  topDeals: CrossChannelItem[];
  locale: PublicLocale;
  exchangeRates: ExchangeRateMap;
}) {
  const t = getUiMessages(locale);
  const labels = FINDER_LABELS[locale];

  const [query, setQuery] = useState('');
  const [preset, setPreset] = useState<QuickPreset>('none');

  const isFiltering = query.trim().length > 0 || preset !== 'none';

  const displayedItems = useMemo(() => {
    if (!isFiltering) {
      return topDeals;
    }

    const q = query.trim().toLowerCase();
    let matched = pool.filter(({ item }) => {
      if (!q) return true;
      const haystack = [
        item.brand.en,
        item.brand.ko,
        item.brand[locale],
        item.name.en,
        item.name.ko,
        item.name[locale],
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });

    if (preset === 'deals') {
      matched = matched
        .filter((entry) => entry.discountPct > 0)
        .sort((a, b) => b.discountPct - a.discountPct);
    } else if (preset === 'budget') {
      matched = matched
        .filter(({ item }) => {
          const effective =
            item.sale_price !== null && item.sale_price > 0 ? item.sale_price : item.price;
          const krw = convertPrice(effective, item.currency, 'KRW', exchangeRates);
          return krw > 0 && krw <= 5000;
        })
        .sort((a, b) => a.item.rank - b.item.rank);
    }

    return matched.slice(0, 8);
  }, [isFiltering, query, preset, pool, topDeals, locale, exchangeRates]);

  return (
    <section className="rounded-[28px] border border-[#dee3e9] bg-[#f8fafc] p-6 md:p-8">
      <div className="max-w-3xl">
        <h2 className="text-xl font-bold tracking-tight text-[#0a1317] md:text-2xl">
          {labels.heading}
        </h2>
        <p className="mt-1.5 text-sm leading-6 text-[#4b4c4f]">{labels.subtitle}</p>
      </div>

      {/* Search & Quick Chips */}
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.placeholder}
            className="min-w-[240px] flex-1 rounded-full border border-[#ced0d4] bg-white px-4 py-2.5 text-sm text-[#0a1317] placeholder:text-[#8595a4] focus:border-[#0064e0] focus:outline-none"
          />
          {isFiltering && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setPreset('none');
              }}
              className="rounded-full border border-[#ced0d4] bg-white px-4 py-2.5 text-xs font-bold text-[#4b4c4f] hover:text-[#0a1317]"
            >
              {labels.clear}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPreset((prev) => (prev === 'deals' ? 'none' : 'deals'))}
            className={`rounded-full px-3.5 py-1 text-xs font-bold transition-colors ${
              preset === 'deals'
                ? 'bg-[#e11d48] text-white'
                : 'border border-[#dee3e9] bg-white text-[#4b4c4f] hover:text-[#0a1317]'
            }`}
          >
            {labels.quickDeals}
          </button>
          <button
            type="button"
            onClick={() => setPreset((prev) => (prev === 'budget' ? 'none' : 'budget'))}
            className={`rounded-full px-3.5 py-1 text-xs font-bold transition-colors ${
              preset === 'budget'
                ? 'bg-[#0a1317] text-white'
                : 'border border-[#dee3e9] bg-white text-[#4b4c4f] hover:text-[#0a1317]'
            }`}
          >
            {labels.quickBudget}
          </button>
          {QUICK_KEYWORDS.map((kw) => {
            const active = query.toLowerCase() === kw.toLowerCase();
            return (
              <button
                key={kw}
                type="button"
                onClick={() => setQuery(active ? '' : kw)}
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition-colors ${
                  active
                    ? 'bg-[#0064e0] text-white'
                    : 'border border-[#dee3e9] bg-white text-[#4b4c4f] hover:text-[#0a1317]'
                }`}
              >
                {kw}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wide text-[#5d6c7b]">
          {isFiltering
            ? `${labels.matchesPrefix} ${displayedItems.length}`
            : labels.topDealsTitle}
        </h3>
      </div>

      {/* Cards */}
      {displayedItems.length > 0 ? (
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {displayedItems.map(({ channel, item }) => {
            const displayBrand = item.brand[locale]?.trim() || item.brand.ko;
            const displayName = item.name[locale]?.trim() || item.name.ko;
            const { displayPrice, regularPrice, discountPct, originalPrice } =
              getProductPriceDisplay(item, locale, exchangeRates);

            return (
              <a
                key={`${channel}-${item.source_product_id}`}
                href={item.product_url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center gap-3 rounded-[18px] border border-[#dee3e9] bg-white p-3 transition-colors hover:border-[#0064e0]"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[12px] bg-[#f1f4f7]">
                  <ProductImage
                    src={item.image_url}
                    alt={buildProductImageAlt(displayBrand, displayName)}
                    fallbackLabel={displayBrand}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[11px] font-bold text-[#0064e0]">
                      {t.channels[channel]}
                    </span>
                    <span className="shrink-0 text-[11px] font-bold text-[#5d6c7b]">
                      #{item.rank}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs font-bold text-[#0a1317]">
                    {displayName}
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
                    <span className="text-sm font-bold tabular-nums text-[#0a1317]">
                      {displayPrice}
                    </span>
                    {regularPrice && (
                      <span className="text-[11px] tabular-nums text-[#8595a4] line-through">
                        {regularPrice}
                      </span>
                    )}
                    {discountPct !== null && (
                      <span className="text-[11px] font-bold tabular-nums text-[#e11d48]">
                        -{discountPct}%
                      </span>
                    )}
                    {originalPrice && (
                      <span className="text-[10px] tabular-nums text-[#5d6c7b]">
                        ({originalPrice})
                      </span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-[#8595a4]">{labels.noMatches}</p>
      )}
    </section>
  );
}
