import path from 'node:path';
import {
  FALLBACK_EXCHANGE_RATES,
  LOCALE_CURRENCY,
  TARGET_CURRENCIES,
  type ExchangeRateMap,
  type SupportedCurrency,
} from './currency';

export {
  FALLBACK_EXCHANGE_RATES,
  LOCALE_CURRENCY,
  TARGET_CURRENCIES,
  type ExchangeRateMap,
  type SupportedCurrency,
};

export interface ExchangeRateSnapshot {
  base: 'KRW';
  rates: ExchangeRateMap;
  updatedAt: string;
  source: 'open.er-api.com' | 'fawazahmed0/currency-api' | 'fallback';
}

/** 12 hours in milliseconds (2 updates per day). */
export const EXCHANGE_RATE_TTL_MS = 12 * 60 * 60 * 1000;

/** Default Next.js ISR revalidation interval in seconds (12 hours). */
export const EXCHANGE_RATE_REVALIDATE_SECONDS = 43_200;

const PRIMARY_API_URL = 'https://open.er-api.com/v6/latest/KRW';
const SECONDARY_API_URL =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.json';

const DEFAULT_SNAPSHOT_PATH = path.join(process.cwd(), 'data', 'exchange-rates.json');

interface OpenErApiResponse {
  result?: string;
  rates?: Record<string, number>;
}

interface FawazCurrencyApiResponse {
  krw?: Record<string, number>;
}

function extractRates(rawRates: Record<string, number> | undefined, lowercaseKeys = false): ExchangeRateMap | null {
  if (!rawRates) return null;

  const getRate = (code: SupportedCurrency): number | undefined => {
    const key = lowercaseKeys ? code.toLowerCase() : code;
    const value = rawRates[key];
    return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;
  };

  const usd = getRate('USD');
  const jpy = getRate('JPY');
  const cny = getRate('CNY');
  const twd = getRate('TWD');

  if (!usd || !jpy || !cny || !twd) {
    return null;
  }

  return {
    KRW: 1,
    USD: usd,
    JPY: jpy,
    CNY: cny,
    TWD: twd,
  };
}

/**
 * Checks whether an exchange-rate snapshot is missing or older than the 12-hour TTL.
 */
export function isExchangeRateStale(
  snapshot: ExchangeRateSnapshot | null | undefined,
  nowMs: number = Date.now()
): boolean {
  if (!snapshot?.updatedAt) return true;
  const updatedMs = Date.parse(snapshot.updatedAt);
  if (Number.isNaN(updatedMs)) return true;
  return nowMs - updatedMs >= EXCHANGE_RATE_TTL_MS;
}

/**
 * Fetches latest KRW-based exchange rates from free no-key APIs with fallback.
 */
export async function fetchExchangeRates(options?: {
  fetchFn?: typeof fetch;
  now?: Date;
}): Promise<ExchangeRateSnapshot> {
  const fetchFn = options?.fetchFn ?? fetch;
  const nowIso = (options?.now ?? new Date()).toISOString();

  try {
    const res = await fetchFn(PRIMARY_API_URL, {
      next: { revalidate: EXCHANGE_RATE_REVALIDATE_SECONDS },
    } as RequestInit);
    if (res.ok) {
      const data = (await res.json()) as OpenErApiResponse;
      const rates = extractRates(data.rates);
      if (rates) {
        return { base: 'KRW', rates, updatedAt: nowIso, source: 'open.er-api.com' };
      }
    }
  } catch {
    // Fall through to secondary free API
  }

  try {
    const res = await fetchFn(SECONDARY_API_URL, {
      next: { revalidate: EXCHANGE_RATE_REVALIDATE_SECONDS },
    } as RequestInit);
    if (res.ok) {
      const data = (await res.json()) as FawazCurrencyApiResponse;
      const rates = extractRates(data.krw, true);
      if (rates) {
        return { base: 'KRW', rates, updatedAt: nowIso, source: 'fawazahmed0/currency-api' };
      }
    }
  } catch {
    // Fall through to static fallback
  }

  return {
    base: 'KRW',
    rates: { ...FALLBACK_EXCHANGE_RATES },
    updatedAt: nowIso,
    source: 'fallback',
  };
}

export async function readExchangeRateSnapshot(
  filePath: string = DEFAULT_SNAPSHOT_PATH
): Promise<ExchangeRateSnapshot | null> {
  try {
    const fs = await import('node:fs/promises');
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as ExchangeRateSnapshot;
    if (!parsed?.rates || !parsed.updatedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function writeExchangeRateSnapshot(
  snapshot: ExchangeRateSnapshot,
  filePath: string = DEFAULT_SNAPSHOT_PATH
): Promise<void> {
  const fs = await import('node:fs/promises');
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf-8');
}

/**
 * Returns exchange rates, reusing cached snapshot if within 12h TTL (2x/day).
 * If stale and refresh fails, preserves existing snapshot rates before using static fallback.
 */
export async function getExchangeRates(options?: {
  readCache?: () => Promise<ExchangeRateSnapshot | null>;
  writeCache?: (snapshot: ExchangeRateSnapshot) => Promise<void>;
  fetchFn?: typeof fetch;
  now?: Date;
  forceRefresh?: boolean;
}): Promise<ExchangeRateSnapshot> {
  const now = options?.now ?? new Date();
  const readCache = options?.readCache ?? (() => readExchangeRateSnapshot());
  const writeCache = options?.writeCache ?? ((s) => writeExchangeRateSnapshot(s));

  const cached = await readCache();
  if (!options?.forceRefresh && cached && !isExchangeRateStale(cached, now.getTime())) {
    return cached;
  }

  const fresh = await fetchExchangeRates({ fetchFn: options?.fetchFn, now });
  if (fresh.source === 'fallback' && cached) {
    return cached;
  }

  if (fresh.source !== 'fallback') {
    try {
      await writeCache(fresh);
    } catch {
      // Ignore read-only filesystem errors (e.g. serverless runtime)
    }
  }

  return fresh;
}
