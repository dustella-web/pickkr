import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { PUBLIC_LOCALES } from '@/lib/i18n/messages';
import { getProductEditorialNote } from '../product-editorial';
import type { ChannelSnapshot, RankingItem } from '@/types/ranking';

const baseItem: RankingItem = {
  rank: 1,
  rank_delta: null,
  source_product_id: 'sample-1',
  product_url: 'https://example.com/product',
  image_url: 'https://example.com/image.jpg',
  currency: 'USD',
  price: 120,
  sale_price: 96,
  brand: {
    ko: '에스트라',
    en: 'AESTURA',
    ja: 'エストラ',
    'zh-CN': 'AESTURA',
    'zh-TW': 'AESTURA',
  },
  name: {
    ko: '아토베리어365 크림 80ml 듀오 세트',
    en: 'AESTURA Atobarrier 365 Cream 80ml Duo Set',
    ja: 'エストラ アトバリア365 クリーム デュオセット',
    'zh-CN': 'AESTURA 屏障修护面霜 80ml 双支套装',
    'zh-TW': 'AESTURA 屏障修護乳霜 80ml 雙入組',
  },
  category: 'beauty',
  editorial_summary: {
    ko: '',
    en: '',
    ja: '',
    'zh-CN': '',
    'zh-TW': '',
  },
};

describe('product editorial notes', () => {
  it('returns custom editorial_summary when populated', () => {
    const itemWithCustom: RankingItem = {
      ...baseItem,
      editorial_summary: {
        ko: '커스텀 한국어 요약',
        en: 'Custom barrier cream highlight for dry skin.',
        ja: '乾燥肌向けの特選保湿クリーム。',
        'zh-CN': '适合干皮修护的热销面霜套装。',
        'zh-TW': '適合乾肌修護的熱銷乳霜禮盒。',
      },
    };

    for (const locale of PUBLIC_LOCALES) {
      expect(getProductEditorialNote(itemWithCustom, locale)).toBe(
        itemWithCustom.editorial_summary[locale]
      );
    }
  });

  it('generates localized fallback notes when editorial_summary is empty', () => {
    for (const locale of PUBLIC_LOCALES) {
      const note = getProductEditorialNote(baseItem, locale);
      const minLength = locale === 'en' ? 25 : 15;
      expect(note.trim().length).toBeGreaterThanOrEqual(minLength);
    }
  });

  it('produces 20 unique curation notes across every channel Top 20 list', () => {
    for (const channel of ['lottedfs', 'missha', 'daisomall'] as const) {
      const snapshotPath = path.join(process.cwd(), 'data', 'published', `${channel}.json`);
      const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8')) as ChannelSnapshot;
      expect(snapshot.items.length).toBeGreaterThanOrEqual(20);

      for (const locale of PUBLIC_LOCALES) {
        const notes = new Set(
          snapshot.items.slice(0, 20).map((item) => {
            const note = getProductEditorialNote(item, locale);
            const minLength = locale === 'en' ? 25 : 15;
            expect(note.trim().length).toBeGreaterThanOrEqual(minLength);
            return note;
          })
        );
        expect(notes.size).toBe(20);
      }
    }
  });

  it('produces compact variant notes distinct from full notes for homepage cards', () => {
    for (const locale of PUBLIC_LOCALES) {
      const fullNote = getProductEditorialNote(baseItem, locale, 'full');
      const compactNote = getProductEditorialNote(baseItem, locale, 'compact');
      expect(compactNote.trim().length).toBeGreaterThan(10);
      expect(compactNote).not.toBe(fullNote);
    }
  });

  it('incorporates product-specific size and active ingredient context into fallback notes', () => {
    const collagenCream: RankingItem = {
      ...baseItem,
      rank: 2,
      name: {
        ko: '콜라겐 탄력 크림 50ml',
        en: 'Collagen Firming Cream 50ml',
        ja: 'コラーゲン 弾力クリーム 50ml',
        'zh-CN': '胶原蛋白紧致面霜 50ml',
        'zh-TW': '膠原蛋白緊緻乳霜 50ml',
      },
    };
    const cicaCream: RankingItem = {
      ...baseItem,
      rank: 2,
      name: {
        ko: '시카 진정 크림 100ml',
        en: 'Cica Soothing Cream 100ml',
        ja: 'シカ 鎮静クリーム 100ml',
        'zh-CN': '积雪草舒缓面霜 100ml',
        'zh-TW': '積雪草舒緩乳霜 100ml',
      },
    };

    for (const locale of PUBLIC_LOCALES) {
      const collagenNote = getProductEditorialNote(collagenCream, locale, 'full');
      const cicaNote = getProductEditorialNote(cicaCream, locale, 'full');
      expect(collagenNote).not.toBe(cicaNote);
      expect(collagenNote).toContain('50ml');
      expect(cicaNote).toContain('100ml');
    }
  });
});
