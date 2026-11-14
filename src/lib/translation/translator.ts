import type { Locale, LocalizedText, RankingItem } from '@/types/ranking';

export type TargetLocale = Exclude<Locale, 'ko'>;
export type TranslatedBundle = Record<TargetLocale, string>;
export type TranslateBatchFn = (texts: string[]) => Promise<TranslatedBundle[]>;

const BRAND_GLOSSARY: Record<string, LocalizedText> = {
  설화수: {
    ko: '설화수',
    en: 'Sulwhasoo',
    ja: 'ソルファス',
    'zh-CN': '雪花秀',
    'zh-TW': '雪花秀',
  },
  에스트라: {
    ko: '에스트라',
    en: 'AESTURA',
    ja: 'エストラ',
    'zh-CN': 'AESTURA 瑷丝特兰',
    'zh-TW': 'AESTURA 靄絲特蘭',
  },
  토리든: {
    ko: '토리든',
    en: 'Torriden',
    ja: 'トリデン',
    'zh-CN': 'Torriden 桃瑞丹',
    'zh-TW': 'Torriden 桃瑞丹',
  },
  미샤: {
    ko: '미샤',
    en: 'MISSHA',
    ja: 'ミシャ',
    'zh-CN': '谜尚 MISSHA',
    'zh-TW': 'MISSHA 謎尚',
  },
  라네즈: {
    ko: '라네즈',
    en: 'LANEIGE',
    ja: 'ラネージュ',
    'zh-CN': '兰芝 LANEIGE',
    'zh-TW': 'LANEIGE 蘭芝',
  },
  헤라: {
    ko: '헤라',
    en: 'HERA',
    ja: 'ヘラ',
    'zh-CN': '赫妍 HERA',
    'zh-TW': 'HERA 赫拉',
  },
};

const TARGET_LOCALES: TargetLocale[] = ['en', 'ja', 'zh-CN', 'zh-TW'];

export function lookupBrandGlossary(brandKo: string): LocalizedText | null {
  const normalized = brandKo.trim();
  return BRAND_GLOSSARY[normalized] ?? null;
}

function hasAllTranslations(text: LocalizedText): boolean {
  if (!text.ko.trim()) return true;
  return TARGET_LOCALES.every((loc) => text[loc].trim().length > 0);
}

/**
 * Translates missing brand and product name fields using glossary first,
 * then batching remaining texts through the supplied translation provider.
 */
export async function translateRankingItems(
  items: RankingItem[],
  provider: TranslateBatchFn
): Promise<RankingItem[]> {
  const cloned = items.map((item) => ({
    ...item,
    brand: { ...item.brand },
    name: { ...item.name },
  }));

  // 1. Apply brand glossary first
  for (const item of cloned) {
    if (!hasAllTranslations(item.brand)) {
      const glossaryEntry = lookupBrandGlossary(item.brand.ko);
      if (glossaryEntry) {
        item.brand = { ...glossaryEntry };
      }
    }
  }

  // 2. Collect remaining untranslated strings (diff translation)
  const pendingTexts: string[] = [];
  const pendingIndex = new Map<string, number>();

  const enqueue = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pendingIndex.has(trimmed)) return;
    pendingIndex.set(trimmed, pendingTexts.length);
    pendingTexts.push(trimmed);
  };

  for (const item of cloned) {
    if (!hasAllTranslations(item.brand)) enqueue(item.brand.ko);
    if (!hasAllTranslations(item.name)) enqueue(item.name.ko);
  }

  if (pendingTexts.length === 0) {
    return cloned;
  }

  const bundles = await provider(pendingTexts);

  const applyBundle = (target: LocalizedText) => {
    if (hasAllTranslations(target)) return;
    const idx = pendingIndex.get(target.ko.trim());
    if (idx === undefined || !bundles[idx]) return;
    const bundle = bundles[idx];
    for (const loc of TARGET_LOCALES) {
      if (!target[loc].trim() && bundle[loc]) {
        target[loc] = bundle[loc];
      }
    }
  };

  for (const item of cloned) {
    applyBundle(item.brand);
    applyBundle(item.name);
  }

  return cloned;
}

/**
 * Default translation provider using Gemini API when GEMINI_API_KEY is configured.
 * Falls back to keeping Korean source text with a clear prefix only when explicitly allowed.
 */
export async function geminiTranslateProvider(texts: string[]): Promise<TranslatedBundle[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const prompt = [
    'Translate each Korean K-Beauty product/brand string into en, ja, zh-CN (Simplified Chinese), and zh-TW (Traditional Chinese, Taiwan cosmetic terminology).',
    'Return a strict JSON array matching the input order, where each element has keys: "en", "ja", "zh-CN", "zh-TW".',
    `Input: ${JSON.stringify(texts)}`,
  ].join('\n');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Gemini translation API error: ${res.status}`);
  }

  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawJson) {
    throw new Error('Empty response from Gemini translation API');
  }

  return JSON.parse(rawJson) as TranslatedBundle[];
}
