import type { Currency, Locale } from '@/types/ranking';

const CHECK_PRICE_LABELS: Record<Locale, string> = {
  ko: '가격 확인',
  en: 'Check Price',
  ja: '価格を確認',
  'zh-CN': '查看价格',
  'zh-TW': '查看價格',
};

export function formatProductPrice(
  item: { currency: Currency; price: number; sale_price: number | null },
  locale: Locale
): string {
  const effectivePrice =
    item.sale_price !== null && item.sale_price > 0 ? item.sale_price : item.price;

  if (!effectivePrice || effectivePrice <= 0) {
    return CHECK_PRICE_LABELS[locale] ?? CHECK_PRICE_LABELS.en;
  }

  return item.currency === 'USD'
    ? `$${effectivePrice}`
    : `${effectivePrice.toLocaleString()}원`;
}
