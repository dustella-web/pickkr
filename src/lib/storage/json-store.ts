import fs from 'node:fs/promises';
import path from 'node:path';
import type { ChannelId, ChannelSnapshot, RankingItem } from '@/types/ranking';

export type SnapshotStage = 'staging' | 'published';

const DEFAULT_DATA_DIR = path.join(process.cwd(), 'data');

function getSnapshotPath(
  stage: SnapshotStage,
  channel: ChannelId,
  baseDir: string = DEFAULT_DATA_DIR
): string {
  return path.join(baseDir, stage, `${channel}.json`);
}

/**
 * Computes rank_delta against the previous snapshot by source_product_id.
 * Positive delta means rank improved (e.g. 5 -> 2 yields +3).
 */
export function applyRankDeltas(
  currentItems: RankingItem[],
  previousItems: RankingItem[]
): RankingItem[] {
  const previousRankById = new Map<string, number>();
  for (const item of previousItems) {
    previousRankById.set(item.source_product_id, item.rank);
  }

  return currentItems.map((item) => {
    const prevRank = previousRankById.get(item.source_product_id);
    const rankDelta = prevRank !== undefined ? prevRank - item.rank : null;
    return {
      ...item,
      rank_delta: rankDelta,
    };
  });
}

/**
 * Reads a channel snapshot JSON file from staging or published directory.
 */
export async function readChannelSnapshot(
  stage: SnapshotStage,
  channel: ChannelId,
  baseDir: string = DEFAULT_DATA_DIR
): Promise<ChannelSnapshot | null> {
  const filePath = getSnapshotPath(stage, channel, baseDir);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as ChannelSnapshot;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

/**
 * Writes a channel snapshot JSON file into staging or published directory.
 */
export async function writeChannelSnapshot(
  stage: SnapshotStage,
  snapshot: ChannelSnapshot,
  baseDir: string = DEFAULT_DATA_DIR
): Promise<string> {
  const filePath = getSnapshotPath(stage, snapshot.channel, baseDir);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf-8');
  return filePath;
}
