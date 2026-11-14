import * as cheerio from 'cheerio';
import type { LocalizedText, RankingItem } from '@/types/ranking';

const LOTTE_DFS_BEAUTY_URL =
  'https://kor.lottedfs.com/kr/display/category/first?dispShopNo1=10031760&treDpth=1';

function emptyLocalizedText(ko: string): LocalizedText {
  return {
    ko,
    en: '',
    ja: '',
    'zh-CN': '',
    'zh-TW': '',
  };
}

function parseUsdValues(text: string): number[] {
  const matches = text.match(/\$[0-9,]+(?:\.[0-9]+)?/g) ?? [];
  return matches
    .map((raw) => Number(raw.replace(/[$,]/g, '')))
    .filter((n) => Number.isFinite(n) && n > 0);
}

function resolveImageUrl(rawSrc: string | undefined, rawDataSrc: string | undefined): string {
  const candidate =
    rawDataSrc && rawDataSrc.startsWith('http')
      ? rawDataSrc
      : rawSrc && rawSrc.startsWith('http')
        ? rawSrc
        : rawDataSrc || rawSrc || '';

  if (candidate.startsWith('//')) {
    return `https:${candidate}`;
  }
  return candidate;
}

/**
 * Parses Lotte Duty Free category/ranking SSR HTML into normalized RankingItem entries.
 */
export function parseLotteDfsHtml(html: string, limit = 20): RankingItem[] {
  const $ = cheerio.load(html);
  const items: RankingItem[] = [];

  $('#unitStyleList > li').each((index, element) => {
    if (items.length >= limit) {
      return false;
    }

    const $li = $(element);
    const $link = $li.find('a.unit_link').first();
    const prdNo = $link.attr('data-prdNo') || $link.attr('data-prdno') || '';
    const prdOptNo = $link.attr('data-prdOptNo') || $link.attr('data-prdoptno') || '';

    const rankText = $li.find('.unit_no').first().text().trim();
    const rank = Number.parseInt(rankText, 10) || index + 1;

    const brandKo = $li.find('.unit_info .brand .kor').first().text().trim();
    const nameKo = $li.find('.unit_info .name').first().text().trim();

    if (!prdNo || !nameKo) {
      return;
    }

    const $img = $li.find('.unit_img img').first();
    const imageUrl = resolveImageUrl($img.attr('src'), $img.attr('data-src'));

    const priceText = $li.find('.unit_price').text() || $li.find('.unit_info').text();
    const usdPrices = parseUsdValues(priceText);
    const price = usdPrices[0] ?? 0;
    const salePrice = usdPrices.length > 1 ? usdPrices[usdPrices.length - 1] : null;

    const productUrl = prdOptNo
      ? `https://kor.lottedfs.com/kr/product/productDetail?prdNo=${prdNo}&prdOptNo=${prdOptNo}`
      : `https://kor.lottedfs.com/kr/product/productDetail?prdNo=${prdNo}`;

    items.push({
      rank,
      rank_delta: null,
      source_product_id: prdNo,
      product_url: productUrl,
      image_url: imageUrl,
      currency: 'USD',
      price,
      sale_price: salePrice,
      brand: emptyLocalizedText(brandKo),
      name: emptyLocalizedText(nameKo),
      category: 'beauty',
      editorial_summary: emptyLocalizedText(''),
    });
  });

  return items;
}

/**
 * Fetches Lotte Duty Free beauty category page and extracts Top N items.
 */
export async function crawlLotteDfs(limit = 20): Promise<RankingItem[]> {
  const res = await fetch(LOTTE_DFS_BEAUTY_URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      'Accept-Language': 'ko-KR,ko;q=0.9',
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`Lotte DFS fetch failed: ${res.status}`);
  }

  const html = await res.text();
  return parseLotteDfsHtml(html, limit);
}
