'use client';

import { useMemo, useState } from 'react';
import type { ChannelId, RankingItem } from '@/types/ranking';
import {
  LOCALE_CURRENCY,
  type ExchangeRateMap,
} from '@/lib/i18n/currency';
import {
  convertPrice,
  formatByCurrency,
  getProductPriceDisplay,
} from '@/lib/i18n/format-price';
import { getUiMessages, type PublicLocale } from '@/lib/i18n/messages';
import { getProductEditorialNote } from '@/lib/content/product-editorial';
import { buildProductImageAlt } from '@/lib/seo/metadata';
import { ProductImage } from '@/components/product-image';

type FilterMode = 'all' | 'sale' | 'budget';
type SortMode = 'rank' | 'priceAsc' | 'priceDesc';

interface InteractiveLabels {
  filterAll: string;
  filterSale: string;
  filterBudget: string;
  sortRank: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  addToList: string;
  savedInList: string;
  clearList: string;
  tripListTitle: string;
  itemsCountSuffix: string;
  dutyFreeApplied: string;
  taxRefundEligible: string;
  taxRefundRemainingPrefix: string;
  taxRefundRemainingSuffix: string;
  emptyFilterResult: string;
}

const LABELS: Record<PublicLocale, InteractiveLabels> = {
  en: {
    filterAll: 'All',
    filterSale: 'On Sale',
    filterBudget: 'Budget Picks',
    sortRank: 'Rank Order',
    sortPriceAsc: 'Price: Low → High',
    sortPriceDesc: 'Price: High → Low',
    addToList: '+ Trip List',
    savedInList: '✓ Saved',
    clearList: 'Clear',
    tripListTitle: 'Trip Shopping Estimator',
    itemsCountSuffix: 'items',
    dutyFreeApplied: 'Duty-free pricing applied (no extra VAT refund needed).',
    taxRefundEligible: 'Eligible for Korea instant tax refund (≥15,000 KRW). Est. ~6% back:',
    taxRefundRemainingPrefix: 'Add',
    taxRefundRemainingSuffix: 'more to reach 15,000 KRW tax-refund threshold.',
    emptyFilterResult: 'No products match the selected filter.',
  },
  ja: {
    filterAll: 'すべて',
    filterSale: 'セール中',
    filterBudget: 'プチプラ',
    sortRank: 'ランキング順',
    sortPriceAsc: '価格が安い順',
    sortPriceDesc: '価格が高い順',
    addToList: '+ リストに追加',
    savedInList: '✓ 追加済み',
    clearList: 'クリア',
    tripListTitle: '旅行ショッピング計算',
    itemsCountSuffix: '点',
    dutyFreeApplied: '免税価格が適用済みです（追加の免税手続き不要）。',
    taxRefundEligible: '韓国即時免税対象（15,000ウォン以上）！目安還付額（約6%）:',
    taxRefundRemainingPrefix: '即時免税ライン（15,000ウォン）まであと',
    taxRefundRemainingSuffix: 'です。',
    emptyFilterResult: '条件に一致する商品がありません。',
  },
  'zh-CN': {
    filterAll: '全部',
    filterSale: '限时特价',
    filterBudget: '平价好物',
    sortRank: '按榜单排序',
    sortPriceAsc: '价格从低到高',
    sortPriceDesc: '价格从高到低',
    addToList: '+ 加入清单',
    savedInList: '✓ 已加入',
    clearList: '清空',
    tripListTitle: '赴韩购物预算与退税估算',
    itemsCountSuffix: '件',
    dutyFreeApplied: '已享免税价，出境提货无需额外退税。',
    taxRefundEligible: '已达韩国即时退税门槛（满15,000韩元），预计可退税约6%：',
    taxRefundRemainingPrefix: '距 15,000 韩元退税门槛还差',
    taxRefundRemainingSuffix: '。',
    emptyFilterResult: '当前筛选条件下暂无商品。',
  },
  'zh-TW': {
    filterAll: '全部',
    filterSale: '限時特價',
    filterBudget: '平價好物',
    sortRank: '依榜單排序',
    sortPriceAsc: '價格由低到高',
    sortPriceDesc: '價格由高到低',
    addToList: '+ 加入清單',
    savedInList: '✓ 已加入',
    clearList: '清空',
    tripListTitle: '訪韓購物預算與退稅試算',
    itemsCountSuffix: '件',
    dutyFreeApplied: '已享免稅價格，出境取貨無需額外辦理退稅。',
    taxRefundEligible: '已達韓國即時退稅門檻（滿15,000韓元），預估可退稅約6%：',
    taxRefundRemainingPrefix: '距離 15,000 韓元退稅門檻還差',
    taxRefundRemainingSuffix: '。',
    emptyFilterResult: '目前篩選條件下尚無商品。',
  },
};

const TAX_REFUND_THRESHOLD_KRW = 15_000;
const EST_TAX_REFUND_RATE = 0.06;

function getEffectiveItemPrice(item: RankingItem): number {
  return item.sale_price !== null && item.sale_price > 0 ? item.sale_price : item.price;
}

export function InteractiveRankingExplorer({
  channel,
  items,
  locale,
  exchangeRates,
  exchangeUpdatedAt,
}: {
  channel: ChannelId;
  items: RankingItem[];
  locale: PublicLocale;
  exchangeRates: ExchangeRateMap;
  exchangeUpdatedAt?: string;
}) {
  const t = getUiMessages(locale);
  const labels = LABELS[locale];
  const targetCurrency = LOCALE_CURRENCY[locale];

  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [sortMode, setSortMode] = useState<SortMode>('rank');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    const filtered = items.filter((item) => {
      const effective = getEffectiveItemPrice(item);
      if (filterMode === 'sale') {
        return item.sale_price !== null && item.sale_price > 0 && item.sale_price < item.price;
      }
      if (filterMode === 'budget') {
        const krwValue = convertPrice(effective, item.currency, 'KRW', exchangeRates);
        return krwValue > 0 && krwValue <= 10_000;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === 'rank') return a.rank - b.rank;
      const aPrice = convertPrice(getEffectiveItemPrice(a), a.currency, 'KRW', exchangeRates);
      const bPrice = convertPrice(getEffectiveItemPrice(b), b.currency, 'KRW', exchangeRates);
      return sortMode === 'priceAsc' ? aPrice - bPrice : bPrice - aPrice;
    });
  }, [items, filterMode, sortMode, exchangeRates]);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(item.source_product_id)),
    [items, selectedIds]
  );

  const tripTotals = useMemo(() => {
    let totalKrw = 0;
    let totalLocal = 0;
    for (const item of selectedItems) {
      const effective = getEffectiveItemPrice(item);
      if (effective > 0) {
        totalKrw += convertPrice(effective, item.currency, 'KRW', exchangeRates);
        totalLocal += convertPrice(effective, item.currency, targetCurrency, exchangeRates);
      }
    }
    return {
      totalKrw,
      totalLocal,
      remainingKrw: Math.max(0, TAX_REFUND_THRESHOLD_KRW - totalKrw),
      estRefundLocal: totalLocal * EST_TAX_REFUND_RATE,
    };
  }, [selectedItems, exchangeRates, targetCurrency]);

  const toggleSelect = (productId: string) => {
    setSelectedIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const formattedUpdatedAt = exchangeUpdatedAt
    ? `${exchangeUpdatedAt.slice(0, 16).replace('T', ' ')} UTC`
    : null;

  return (
    <div className="space-y-6">
      {/* Filter & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-[#dee3e9] bg-[#f1f4f7] p-3">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: `${labels.filterAll} (${items.length})` },
              { id: 'sale', label: labels.filterSale },
              { id: 'budget', label: labels.filterBudget },
            ] as const
          ).map((btn) => {
            const active = filterMode === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilterMode(btn.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                  active
                    ? 'bg-[#0a1317] text-white'
                    : 'bg-white text-[#4b4c4f] hover:text-[#0a1317]'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <select
            aria-label="Sort products"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="rounded-full border border-[#dee3e9] bg-white px-4 py-1.5 text-xs font-bold text-[#0a1317] focus:outline-none focus:ring-2 focus:ring-[#0064e0]"
          >
            <option value="rank">{labels.sortRank}</option>
            <option value="priceAsc">{labels.sortPriceAsc}</option>
            <option value="priceDesc">{labels.sortPriceDesc}</option>
          </select>
        </div>
      </div>

      {/* Trip Shopping & Tax Refund Estimator */}
      {selectedItems.length > 0 && (
        <div className="rounded-[24px] border border-[#0064e0]/30 bg-[#f0f6ff] p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#0064e0]">
                {labels.tripListTitle} · {selectedItems.length} {labels.itemsCountSuffix}
              </span>
              <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <span className="text-xl font-bold tabular-nums text-[#0a1317]">
                  {formatByCurrency(tripTotals.totalLocal, targetCurrency)}
                </span>
                {targetCurrency !== 'KRW' && (
                  <span className="text-xs font-medium tabular-nums text-[#5d6c7b]">
                    ({formatByCurrency(tripTotals.totalKrw, 'KRW')})
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="rounded-full border border-[#ced0d4] bg-white px-3.5 py-1.5 text-xs font-bold text-[#4b4c4f] hover:text-[#0a1317]"
            >
              {labels.clearList}
            </button>
          </div>
          <p className="mt-2 text-xs leading-5 text-[#1c1e21]">
            {channel === 'lottedfs'
              ? labels.dutyFreeApplied
              : tripTotals.totalKrw >= TAX_REFUND_THRESHOLD_KRW
                ? `${labels.taxRefundEligible} ${formatByCurrency(tripTotals.estRefundLocal, targetCurrency)}`
                : `${labels.taxRefundRemainingPrefix} ${formatByCurrency(tripTotals.remainingKrw, 'KRW')} ${labels.taxRefundRemainingSuffix}`}
          </p>
        </div>
      )}

      {/* Product Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => {
            const displayBrand = item.brand[locale]?.trim() || item.brand.ko;
            const displayName = item.name[locale]?.trim() || item.name.ko;
            const { displayPrice, regularPrice, discountPct, originalPrice } =
              getProductPriceDisplay(item, locale, exchangeRates);
            const editorialNote = getProductEditorialNote(item, locale, 'full');
            const isSelected = selectedIds.includes(item.source_product_id);

            return (
              <article
                key={`${item.rank}-${item.source_product_id}`}
                id={`rank-${item.rank}`}
                className={`flex flex-col rounded-[24px] border bg-white p-4 transition-colors ${
                  isSelected
                    ? 'border-[#0064e0] ring-1 ring-[#0064e0]/20'
                    : 'border-[#dee3e9] hover:border-[#ced0d4]'
                }`}
              >
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[16px] bg-[#f1f4f7]">
                  <ProductImage
                    src={item.image_url}
                    alt={buildProductImageAlt(displayBrand, displayName)}
                    fallbackLabel={displayBrand}
                  />
                  <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#0a1317] text-xs font-bold tabular-nums text-white">
                    {item.rank}
                  </span>
                  <div className="absolute right-3 top-3 flex items-center gap-1.5">
                    {typeof item.rank_delta === 'number' && item.rank_delta !== 0 && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                          item.rank_delta > 0
                            ? 'bg-[#e6f4ea] text-[#137333]'
                            : 'bg-[#fce8e6] text-[#c5221f]'
                        }`}
                      >
                        {item.rank_delta > 0
                          ? `▲${item.rank_delta}`
                          : `▼${Math.abs(item.rank_delta)}`}
                      </span>
                    )}
                    {discountPct !== null && discountPct > 0 && (
                      <span className="rounded-full bg-[#0064e0] px-2 py-0.5 text-[11px] font-bold tabular-nums text-white">
                        -{discountPct}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="block truncate text-xs font-bold leading-4 text-[#5d6c7b]">
                      {displayBrand}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSelect(item.source_product_id)}
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors ${
                        isSelected
                          ? 'bg-[#0064e0] text-white'
                          : 'bg-[#f1f4f7] text-[#4b4c4f] hover:bg-[#e4e9ef]'
                      }`}
                    >
                      {isSelected ? labels.savedInList : labels.addToList}
                    </button>
                  </div>
                  <h3 className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-5 text-[#0a1317]">
                    {displayName}
                  </h3>
                  <p className="mt-1.5 mb-3 line-clamp-2 text-xs leading-5 text-[#4b4c4f]">
                    {editorialNote}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#dee3e9] pt-3.5">
                    <div className="min-w-0">
                      {regularPrice && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-medium tabular-nums text-[#8595a4] line-through">
                            {regularPrice}
                          </span>
                          {discountPct !== null && (
                            <span className="text-xs font-bold tabular-nums text-[#e11d48]">
                              -{discountPct}%
                            </span>
                          )}
                        </div>
                      )}
                      <span className="block whitespace-nowrap text-base font-bold tabular-nums text-[#0a1317]">
                        {displayPrice}
                      </span>
                      {originalPrice && (
                        <span className="block truncate text-[11px] font-medium tabular-nums text-[#5d6c7b]">
                          ({originalPrice})
                        </span>
                      )}
                    </div>
                    <a
                      href={item.product_url}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="whitespace-nowrap rounded-full bg-[#0064e0] px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#0457cb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0064e0]"
                    >
                      {t.buyOfficial}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-[#ced0d4] bg-white p-10 text-center text-sm text-[#8595a4]">
          {labels.emptyFilterResult}
        </div>
      )}

      <p className="text-xs text-[#5d6c7b]">
        {t.exchangeRateNotice}
        {formattedUpdatedAt ? ` (${formattedUpdatedAt})` : ''}
      </p>
    </div>
  );
}
