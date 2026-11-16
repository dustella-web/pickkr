import type { Currency, Locale } from '@/types/ranking';
import {
  LOCALE_CURRENCY,
  type ExchangeRateMap,
  type SupportedCurrency,
} from './currency';

const CHECK_PRICE_LABELS: Record<Locale, string> = {
  ko: '가격 확인',
  en: 'Check Price',
  ja: '価格を確認',
  'zh-CN': '查看价格',
  'zh-TW': '查看價格',
};

interface CurrencyFormatRule {
  prefix: string;
  suffix: string;
  maximumFractionDigits: number;
}

const CURRENCY_FORMAT_RULES: Record<SupportedCurrency, CurrencyFormatRule> = {
  KRW: { prefix: '', suffix: '원', maximumFractionDigits: 0 },
  USD: { prefix: '$', suffix: '', maximumFractionDigits: 2 },
  JPY: { prefix: '¥', suffix: '', maximumFractionDigits: 0 },
  CNY: { prefix: 'CN¥', suffix: '', maximumFractionDigits: 2 },
  TWD: { prefix: 'NT$', suffix: '', maximumFractionDigits: 0 },
};

/**
 * Converts an amount from a source currency to a target currency using KRW-based rates.
 */
export function convertPrice(
  amount: number,
  fromCurrency: Currency,
  toCurrency: SupportedCurrency,
  rates: ExchangeRateMap
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];
  if (!fromRate || !toRate) {
    return amount;
  }
  return amount * (toRate / fromRate);
}

export function formatByCurrency(amount: number, currency: SupportedCurrency): string {
  const rule = CURRENCY_FORMAT_RULES[currency];
  const factor = 10 ** rule.maximumFractionDigits;
  const rounded = Math.round(amount * factor) / factor;
  const formattedNumber = rounded.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: rule.maximumFractionDigits,
  });
  return `${rule.prefix}${formattedNumber}${rule.suffix}`;
}

function getEffectivePrice(item: { price: number; sale_price: number | null }): number {
  return item.sale_price !== null && item.sale_price > 0 ? item.sale_price : item.price;
}

function formatRawPrice(amount: number, currency: Currency): string {
  return currency === 'USD' ? `$${amount}` : `${amount.toLocaleString()}원`;
}

/**
 * Returns the original store price string when the locale currency differs
 * from the item's source currency, or null when no conversion occurred.
 */
export function formatOriginalPrice(
  item: { currency: Currency; price: number; sale_price: number | null },
  locale: Locale
): string | null {
  const effectivePrice = getEffectivePrice(item);
  if (!effectivePrice || effectivePrice <= 0) {
    return null;
  }
  const targetCurrency = LOCALE_CURRENCY[locale] ?? 'USD';
  if (item.currency === targetCurrency) {
    return null;
  }
  return formatRawPrice(effectivePrice, item.currency);
}

function formatAmountForLocale(
  amount: number,
  sourceCurrency: Currency,
  locale: Locale,
  rates?: ExchangeRateMap
): string {
  if (!rates) {
    return formatRawPrice(amount, sourceCurrency);
  }
  const targetCurrency = LOCALE_CURRENCY[locale] ?? 'USD';
  const converted = convertPrice(amount, sourceCurrency, targetCurrency, rates);
  return formatByCurrency(converted, targetCurrency);
}

export interface ProductPriceDisplay {
  displayPrice: string;
  regularPrice: string | null;
  discountPct: number | null;
  originalPrice: string | null;
}

/**
 * Returns formatted current price, strikethrough regular price, discount percentage,
 * and original store currency price (when converted).
 */
export function getProductPriceDisplay(
  item: { currency: Currency; price: number; sale_price: number | null },
  locale: Locale,
  rates?: ExchangeRateMap
): ProductPriceDisplay {
  const effectivePrice = getEffectivePrice(item);
  if (!effectivePrice || effectivePrice <= 0) {
    return {
      displayPrice: CHECK_PRICE_LABELS[locale] ?? CHECK_PRICE_LABELS.en,
      regularPrice: null,
      discountPct: null,
      originalPrice: null,
    };
  }

  const hasDiscount =
    item.sale_price !== null &&
    item.sale_price > 0 &&
    item.price > 0 &&
    item.sale_price < item.price;

  return {
    displayPrice: formatAmountForLocale(effectivePrice, item.currency, locale, rates),
    regularPrice: hasDiscount
      ? formatAmountForLocale(item.price, item.currency, locale, rates)
      : null,
    discountPct: hasDiscount
      ? Math.max(1, Math.round(((item.price - (item.sale_price as number)) / item.price) * 100))
      : null,
    originalPrice: rates ? formatOriginalPrice(item, locale) : null,
  };
}

export function formatProductPrice(
  item: { currency: Currency; price: number; sale_price: number | null },
  locale: Locale,
  rates?: ExchangeRateMap
): string {
  const effectivePrice = getEffectivePrice(item);

  if (!effectivePrice || effectivePrice <= 0) {
    return CHECK_PRICE_LABELS[locale] ?? CHECK_PRICE_LABELS.en;
  }

  return formatAmountForLocale(effectivePrice, item.currency, locale, rates);
}
