import { describe, it, expect } from 'vitest';
import { formatProductPrice } from '../format-price';

describe('formatProductPrice', () => {
  it('should format USD and KRW prices when positive', () => {
    expect(formatProductPrice({ currency: 'USD', price: 14, sale_price: 9.8 }, 'en')).toBe('$9.8');
    expect(formatProductPrice({ currency: 'USD', price: 42, sale_price: null }, 'en')).toBe('$42');
    expect(formatProductPrice({ currency: 'KRW', price: 3000, sale_price: null }, 'en')).toBe('3,000원');
  });

  it('should return localized check-price label when price is 0 or missing', () => {
    expect(formatProductPrice({ currency: 'KRW', price: 0, sale_price: null }, 'en')).toBe('Check Price');
    expect(formatProductPrice({ currency: 'KRW', price: 0, sale_price: null }, 'ja')).toBe('価格を確認');
    expect(formatProductPrice({ currency: 'KRW', price: 0, sale_price: null }, 'zh-CN')).toBe('查看价格');
    expect(formatProductPrice({ currency: 'KRW', price: 0, sale_price: null }, 'zh-TW')).toBe('查看價格');
  });
});
