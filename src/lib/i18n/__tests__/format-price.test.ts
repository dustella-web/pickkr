import { describe, it, expect } from 'vitest';
import {
  convertPrice,
  formatOriginalPrice,
  formatProductPrice,
  getProductPriceDisplay,
} from '../format-price';
import type { ExchangeRateMap } from '../exchange-rates';

const SAMPLE_RATES: ExchangeRateMap = {
  KRW: 1,
  USD: 0.00072,
  JPY: 0.11,
  CNY: 0.0052,
  TWD: 0.023,
};

describe('convertPrice', () => {
  it('should convert KRW and USD prices across target currencies', () => {
    expect(convertPrice(3000, 'KRW', 'KRW', SAMPLE_RATES)).toBe(3000);
    expect(convertPrice(3000, 'KRW', 'USD', SAMPLE_RATES)).toBeCloseTo(2.16, 4);
    expect(convertPrice(3000, 'KRW', 'JPY', SAMPLE_RATES)).toBeCloseTo(330, 4);
    expect(convertPrice(10, 'USD', 'JPY', SAMPLE_RATES)).toBeCloseTo(1527.7778, 3);
  });
});

describe('formatProductPrice', () => {
  it('should format USD and KRW prices when positive without rates', () => {
    expect(formatProductPrice({ currency: 'USD', price: 14, sale_price: 9.8 }, 'en')).toBe('$9.8');
    expect(formatProductPrice({ currency: 'USD', price: 42, sale_price: null }, 'en')).toBe('$42');
    expect(formatProductPrice({ currency: 'KRW', price: 3000, sale_price: null }, 'en')).toBe('3,000원');
  });

  it('should convert and format KRW prices for each locale when exchange rates are provided', () => {
    const item = { currency: 'KRW' as const, price: 3000, sale_price: null };
    expect(formatProductPrice(item, 'ko', SAMPLE_RATES)).toBe('3,000원');
    expect(formatProductPrice(item, 'en', SAMPLE_RATES)).toBe('$2.16');
    expect(formatProductPrice(item, 'ja', SAMPLE_RATES)).toBe('¥330');
    expect(formatProductPrice(item, 'zh-CN', SAMPLE_RATES)).toBe('CN¥15.6');
    expect(formatProductPrice(item, 'zh-TW', SAMPLE_RATES)).toBe('NT$69');
  });

  it('should convert and format USD prices for each locale when exchange rates are provided', () => {
    const item = { currency: 'USD' as const, price: 14, sale_price: 9.8 };
    expect(formatProductPrice(item, 'en', SAMPLE_RATES)).toBe('$9.8');
    expect(formatProductPrice(item, 'ko', SAMPLE_RATES)).toBe('13,611원');
    expect(formatProductPrice(item, 'ja', SAMPLE_RATES)).toBe('¥1,497');
    expect(formatProductPrice(item, 'zh-CN', SAMPLE_RATES)).toBe('CN¥70.78');
    expect(formatProductPrice(item, 'zh-TW', SAMPLE_RATES)).toBe('NT$313');
  });

  it('should return localized check-price label when price is 0 or missing', () => {
    expect(formatProductPrice({ currency: 'KRW', price: 0, sale_price: null }, 'en')).toBe('Check Price');
    expect(formatProductPrice({ currency: 'KRW', price: 0, sale_price: null }, 'ja')).toBe('価格を確認');
    expect(formatProductPrice({ currency: 'KRW', price: 0, sale_price: null }, 'zh-CN')).toBe('查看价格');
    expect(formatProductPrice({ currency: 'KRW', price: 0, sale_price: null }, 'zh-TW')).toBe('查看價格');
  });
});

describe('formatOriginalPrice', () => {
  it('should return original price string only when converted to a different currency', () => {
    expect(formatOriginalPrice({ currency: 'KRW', price: 3000, sale_price: null }, 'en')).toBe('3,000원');
    expect(formatOriginalPrice({ currency: 'KRW', price: 3000, sale_price: null }, 'ko')).toBeNull();
    expect(formatOriginalPrice({ currency: 'USD', price: 14, sale_price: 9.8 }, 'ja')).toBe('$9.8');
    expect(formatOriginalPrice({ currency: 'USD', price: 14, sale_price: 9.8 }, 'en')).toBeNull();
    expect(formatOriginalPrice({ currency: 'KRW', price: 0, sale_price: null }, 'ja')).toBeNull();
  });
});

describe('getProductPriceDisplay', () => {
  it('returns regularPrice strikethrough target and discountPct when sale_price is lower than price', () => {
    const misshaItem = { currency: 'KRW' as const, price: 20000, sale_price: 14000 };
    const enDisplay = getProductPriceDisplay(misshaItem, 'en', SAMPLE_RATES);
    expect(enDisplay.displayPrice).toBe('$10.08');
    expect(enDisplay.regularPrice).toBe('$14.4');
    expect(enDisplay.discountPct).toBe(30);
    expect(enDisplay.originalPrice).toBe('14,000원');

    const koDisplay = getProductPriceDisplay(misshaItem, 'ko', SAMPLE_RATES);
    expect(koDisplay.displayPrice).toBe('14,000원');
    expect(koDisplay.regularPrice).toBe('20,000원');
    expect(koDisplay.discountPct).toBe(30);
    expect(koDisplay.originalPrice).toBeNull();
  });

  it('returns null regularPrice and discountPct when there is no discount', () => {
    const item = { currency: 'KRW' as const, price: 18000, sale_price: null };
    const display = getProductPriceDisplay(item, 'ja', SAMPLE_RATES);
    expect(display.displayPrice).toBe('¥1,980');
    expect(display.regularPrice).toBeNull();
    expect(display.discountPct).toBeNull();
    expect(display.originalPrice).toBe('18,000원');
  });
});
