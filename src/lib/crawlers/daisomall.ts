import fs from 'node:fs';
import type { LocalizedText, RankingItem } from '@/types/ranking';

export interface DaisoRawProduct {
  pdNo?: string;
  pdNm?: string;
  exhPdNm?: string | null;
  pdPrc?: string | number | null;
  sleUtpc?: string | number | null;
  brndNm?: string | null;
  engBrndNm?: string | null;
  pdImgUrl?: string | null;
}

function emptyLocalized(ko: string, en = ''): LocalizedText {
  return { ko, en, ja: '', 'zh-CN': '', 'zh-TW': '' };
}

function isDaisoProduct(node: unknown): node is DaisoRawProduct {
  if (!node || typeof node !== 'object') return false;
  const record = node as Record<string, unknown>;
  return typeof record.pdNo === 'string' && typeof record.pdNm === 'string';
}

/**
 * Recursively traverses Daiso Mall exhibition API payload and extracts unique products.
 */
export function extractDaisoProductsFromApi(
  data: unknown,
  limit = 20
): RankingItem[] {
  const seen = new Set<string>();
  const items: RankingItem[] = [];

  const visit = (node: unknown) => {
    if (items.length >= limit || !node || typeof node !== 'object') return;

    if (Array.isArray(node)) {
      for (const el of node) {
        visit(el);
        if (items.length >= limit) break;
      }
      return;
    }

    if (isDaisoProduct(node) && node.pdNo && !seen.has(node.pdNo)) {
      const nameKo = (node.exhPdNm || node.pdNm || '').trim();
      if (nameKo) {
        seen.add(node.pdNo);
        const brandKo = node.brndNm?.trim() || '다이소';
        const brandEn = node.engBrndNm?.trim() || '';
        const price = Number(node.sleUtpc ?? node.pdPrc ?? 0) || 0;
        const imgPath = node.pdImgUrl?.trim() || '';
        const imageUrl = imgPath.startsWith('http')
          ? imgPath
          : imgPath
            ? `https://cdn.daisomall.co.kr${imgPath}`
            : '';

        items.push({
          rank: items.length + 1,
          rank_delta: null,
          source_product_id: node.pdNo,
          product_url: `https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=${node.pdNo}`,
          image_url: imageUrl,
          currency: 'KRW',
          price,
          sale_price: null,
          brand: emptyLocalized(brandKo, brandEn),
          name: emptyLocalized(nameKo),
          category: 'beauty',
          editorial_summary: emptyLocalized(''),
        });
      }
    }

    for (const val of Object.values(node)) {
      visit(val);
      if (items.length >= limit) break;
    }
  };

  visit(data);
  return items;
}

/**
 * Uses Playwright to open Daiso Mall Beauty C115 and capture the selExhRest JSON payload.
 */
export async function crawlDaisomall(limit = 20): Promise<RankingItem[]> {
  const { chromium } = await import('playwright');
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const executablePath = fs.existsSync(macChrome) ? macChrome : undefined;

  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  try {
    const page = await browser.newPage();
    let capturedData: unknown = null;

    page.on('response', async (res) => {
      if (!capturedData && res.url().includes('/api/ds/exh/v2/selExhRest')) {
        try {
          const json = (await res.json()) as { data?: unknown };
          capturedData = json.data ?? json;
        } catch {
          // ignore non-json responses
        }
      }
    });

    await page.goto('https://www.daisomall.co.kr/ds/diy2/C115', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(1500);

    if (!capturedData) {
      throw new Error('Failed to capture Daiso Mall selExhRest API response');
    }

    return extractDaisoProductsFromApi(capturedData, limit);
  } finally {
    await browser.close();
  }
}
