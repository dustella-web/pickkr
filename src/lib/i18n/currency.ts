import type { Locale } from '@/types/ranking';

export type SupportedCurrency = 'KRW' | 'USD' | 'JPY' | 'CNY' | 'TWD';

export type ExchangeRateMap = Record<SupportedCurrency, number>;

export const TARGET_CURRENCIES: readonly SupportedCurrency[] = [
  'KRW',
  'USD',
  'JPY',
  'CNY',
  'TWD',
] as const;

export const LOCALE_CURRENCY: Record<Locale, SupportedCurrency> = {
  ko: 'KRW',
  en: 'USD',
  ja: 'JPY',
  'zh-CN': 'CNY',
  'zh-TW': 'TWD',
};

export const FALLBACK_EXCHANGE_RATES: ExchangeRateMap = {
  KRW: 1,
  USD: 0.00072,
  JPY: 0.11,
  CNY: 0.0052,
  TWD: 0.023,
};
