import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  EXCHANGE_RATE_TTL_MS,
  FALLBACK_EXCHANGE_RATES,
  fetchExchangeRates,
  getExchangeRates,
  isExchangeRateStale,
  type ExchangeRateSnapshot,
} from '../exchange-rates';

describe('exchange-rates', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should treat snapshot as fresh within 12 hours and stale at or after 12 hours', () => {
    const baseTime = new Date('2026-11-16T00:00:00.000Z').getTime();
    const snapshot: ExchangeRateSnapshot = {
      base: 'KRW',
      rates: { KRW: 1, USD: 0.00072, JPY: 0.11, CNY: 0.0052, TWD: 0.023 },
      updatedAt: '2026-11-16T00:00:00.000Z',
      source: 'open.er-api.com',
    };

    expect(EXCHANGE_RATE_TTL_MS).toBe(12 * 60 * 60 * 1000);
    expect(isExchangeRateStale(snapshot, baseTime + 11 * 60 * 60 * 1000)).toBe(false);
    expect(isExchangeRateStale(snapshot, baseTime + 12 * 60 * 60 * 1000)).toBe(true);
    expect(isExchangeRateStale(null, baseTime)).toBe(true);
  });

  it('should fetch and normalize rates from primary free API (open.er-api.com)', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        result: 'success',
        base_code: 'KRW',
        rates: {
          KRW: 1,
          USD: 0.000715,
          JPY: 0.1095,
          CNY: 0.00518,
          TWD: 0.0231,
        },
      }),
    });

    const snapshot = await fetchExchangeRates({
      fetchFn: fetchMock as unknown as typeof fetch,
      now: new Date('2026-11-16T09:00:00.000Z'),
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(snapshot.base).toBe('KRW');
    expect(snapshot.source).toBe('open.er-api.com');
    expect(snapshot.updatedAt).toBe('2026-11-16T09:00:00.000Z');
    expect(snapshot.rates).toEqual({
      KRW: 1,
      USD: 0.000715,
      JPY: 0.1095,
      CNY: 0.00518,
      TWD: 0.0231,
    });
  });

  it('should fallback to secondary free API when primary API fails', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('Primary API network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          date: '2026-11-16',
          krw: {
            usd: 0.00072,
            jpy: 0.11,
            cny: 0.0052,
            twd: 0.023,
          },
        }),
      });

    const snapshot = await fetchExchangeRates({
      fetchFn: fetchMock as unknown as typeof fetch,
      now: new Date('2026-11-16T09:00:00.000Z'),
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(snapshot.source).toBe('fawazahmed0/currency-api');
    expect(snapshot.rates).toEqual({
      KRW: 1,
      USD: 0.00072,
      JPY: 0.11,
      CNY: 0.0052,
      TWD: 0.023,
    });
  });

  it('should return fallback snapshot when all APIs fail', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Offline'));

    const snapshot = await fetchExchangeRates({
      fetchFn: fetchMock as unknown as typeof fetch,
      now: new Date('2026-11-16T09:00:00.000Z'),
    });

    expect(snapshot.source).toBe('fallback');
    expect(snapshot.rates).toEqual(FALLBACK_EXCHANGE_RATES);
  });

  it('should reuse cached snapshot if within 12-hour TTL and refresh when stale', async () => {
    const freshSnapshot: ExchangeRateSnapshot = {
      base: 'KRW',
      rates: { KRW: 1, USD: 0.00073, JPY: 0.112, CNY: 0.0053, TWD: 0.0235 },
      updatedAt: '2026-11-16T00:00:00.000Z',
      source: 'open.er-api.com',
    };

    const readCache = vi.fn().mockResolvedValue(freshSnapshot);
    const writeCache = vi.fn().mockResolvedValue(undefined);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: 'success',
        rates: { KRW: 1, USD: 0.00075, JPY: 0.115, CNY: 0.0054, TWD: 0.024 },
      }),
    });

    // 6시간 경과 -> 캐시 재사용 (fetch 호출 안 함)
    const cachedResult = await getExchangeRates({
      readCache,
      writeCache,
      fetchFn: fetchMock as unknown as typeof fetch,
      now: new Date('2026-11-16T06:00:00.000Z'),
    });
    expect(cachedResult).toEqual(freshSnapshot);
    expect(fetchMock).not.toHaveBeenCalled();

    // 13시간 경과 -> 만료되어 새로 fetch 및 캐시 저장
    const refreshedResult = await getExchangeRates({
      readCache,
      writeCache,
      fetchFn: fetchMock as unknown as typeof fetch,
      now: new Date('2026-11-16T13:00:00.000Z'),
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(writeCache).toHaveBeenCalledTimes(1);
    expect(refreshedResult.rates.USD).toBe(0.00075);
  });
});
