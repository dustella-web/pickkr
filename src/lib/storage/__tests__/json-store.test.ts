import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { ChannelSnapshot, RankingItem } from '@/types/ranking';
import {
  applyRankDeltas,
  readChannelSnapshot,
  writeChannelSnapshot,
} from '../json-store';

function makeItem(rank: number, id: string): RankingItem {
  return {
    rank,
    rank_delta: null,
    source_product_id: id,
    product_url: `https://example.com/${id}`,
    image_url: `https://example.com/${id}.jpg`,
    currency: 'USD',
    price: 20,
    sale_price: null,
    brand: { ko: '브랜드', en: '', ja: '', 'zh-CN': '', 'zh-TW': '' },
    name: { ko: `상품 ${id}`, en: '', ja: '', 'zh-CN': '', 'zh-TW': '' },
    category: 'beauty',
    editorial_summary: { ko: '', en: '', ja: '', 'zh-CN': '', 'zh-TW': '' },
  };
}

describe('json-store', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'kbeauty-store-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should compute rank_delta compared to previous snapshot items', () => {
    const previous = [makeItem(1, 'A'), makeItem(5, 'B')];
    const current = [makeItem(2, 'B'), makeItem(3, 'A'), makeItem(1, 'C')];

    const updated = applyRankDeltas(current, previous);

    expect(updated.find((i) => i.source_product_id === 'B')?.rank_delta).toBe(3);
    expect(updated.find((i) => i.source_product_id === 'A')?.rank_delta).toBe(-2);
    expect(updated.find((i) => i.source_product_id === 'C')?.rank_delta).toBeNull();
  });

  it('should write and read a ChannelSnapshot JSON file by stage and channel', async () => {
    const snapshot: ChannelSnapshot = {
      snapshot_id: '2026-W46',
      channel: 'lottedfs',
      status: 'PENDING_REVIEW',
      collected_at: '2026-11-14T00:00:00.000Z',
      published_at: null,
      items: [makeItem(1, '20000959645')],
    };

    await writeChannelSnapshot('staging', snapshot, tempDir);
    const loaded = await readChannelSnapshot('staging', 'lottedfs', tempDir);

    expect(loaded).toEqual(snapshot);
  });

  it('should return null when snapshot file does not exist', async () => {
    const loaded = await readChannelSnapshot('published', 'missha', tempDir);
    expect(loaded).toBeNull();
  });
});
