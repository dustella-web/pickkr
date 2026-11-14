import type { LocalizedText, RankingItem } from '@/types/ranking';

export interface MisshaRawProduct {
  prdmCd?: string;
  prdmNm?: string;
  prdmRepImgFileNm?: string;
  prdmLinkUrl?: string;
  prdmPrc?: string | number;
}

export interface MisshaProductListResponse {
  list?: MisshaRawProduct[];
}

const MISSHA_LIST_API = 'https://missha.com/kr/product/1/getProductList';

function parseMisshaPrice(rawPrice?: string | number): number {
  if (typeof rawPrice === 'number') {
    return Number.isFinite(rawPrice) && rawPrice > 0 ? Math.round(rawPrice) : 0;
  }
  if (typeof rawPrice === 'string') {
    const digits = rawPrice.replace(/[^\d]/g, '');
    const parsed = Number(digits);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }
  return 0;
}

function emptyLocalized(ko: string): LocalizedText {
  return { ko, en: '', ja: '', 'zh-CN': '', 'zh-TW': '' };
}

/**
 * Parses Missha product list JSON response into normalized RankingItem entries.
 */
export function parseMisshaProductList(
  payload: MisshaProductListResponse,
  limit = 20
): RankingItem[] {
  const list = payload.list ?? [];
  const items: RankingItem[] = [];

  for (const raw of list) {
    if (items.length >= limit) break;
    const code = raw.prdmCd?.trim();
    const nameKo = raw.prdmNm?.trim();
    if (!code || !nameKo) continue;

    const imageUrl = raw.prdmRepImgFileNm
      ? `https://missha.com/upload/product/productmanage/${raw.prdmRepImgFileNm}`
      : '';
    const productUrl =
      raw.prdmLinkUrl?.trim() ||
      `https://missha.com/kr/skincare/product_detail?prdmCd=${code}`;

    items.push({
      rank: items.length + 1,
      rank_delta: null,
      source_product_id: code,
      product_url: productUrl,
      image_url: imageUrl,
      currency: 'KRW',
      price: parseMisshaPrice(raw.prdmPrc),
      sale_price: null,
      brand: {
        ko: '미샤',
        en: 'MISSHA',
        ja: 'ミシャ',
        'zh-CN': '谜尚 MISSHA',
        'zh-TW': 'MISSHA 謎尚',
      },
      name: emptyLocalized(nameKo),
      category: 'skincare',
      editorial_summary: emptyLocalized(''),
    });
  }

  return items;
}

/**
 * Fetches Missha product list via its public JSON endpoint.
 */
export async function crawlMissha(limit = 20): Promise<RankingItem[]> {
  const res = await fetch(MISSHA_LIST_API, {
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Referer: 'https://missha.com/kr/skincare/product_list?cate=1&depth=1',
    },
    body: JSON.stringify({}),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`Missha API fetch failed: ${res.status}`);
  }

  const data = (await res.json()) as MisshaProductListResponse;
  return parseMisshaProductList(data, limit);
}
