import { crawlLotteDfs } from '../src/lib/crawlers/lottedfs.ts';
import { crawlMissha } from '../src/lib/crawlers/missha.ts';
import { crawlDaisomall } from '../src/lib/crawlers/daisomall.ts';
import {
  applyRankDeltas,
  readChannelSnapshot,
  writeChannelSnapshot,
} from '../src/lib/storage/json-store.ts';
import {
  geminiTranslateProvider,
  translateRankingItems,
} from '../src/lib/translation/translator.ts';
import type { ChannelId, ChannelSnapshot, RankingItem } from '../src/types/ranking.ts';

function getCurrentIsoWeekId(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const diffDays = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  const week = Math.ceil((diffDays + startOfYear.getUTCDay() + 1) / 7);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

const ADAPTERS: Array<{ channel: ChannelId; run: (limit: number) => Promise<RankingItem[]> }> = [
  { channel: 'lottedfs', run: crawlLotteDfs },
  { channel: 'missha', run: crawlMissha },
  { channel: 'daisomall', run: crawlDaisomall },
];

async function main() {
  const snapshotId = getCurrentIsoWeekId();
  let successCount = 0;

  for (const { channel, run } of ADAPTERS) {
    try {
      console.log(`[${channel}] Crawling Top 20...`);
      const rawItems = await run(20);
      if (rawItems.length === 0) {
        console.warn(`[${channel}] Warning: 0 items returned. Keeping previous staging.`);
        continue;
      }

      const previousPublished = await readChannelSnapshot('published', channel);
      const itemsWithDelta = previousPublished
        ? applyRankDeltas(rawItems, previousPublished.items)
        : rawItems;

      const finalItems = process.env.GEMINI_API_KEY
        ? await translateRankingItems(itemsWithDelta, geminiTranslateProvider)
        : itemsWithDelta;

      const snapshot: ChannelSnapshot = {
        snapshot_id: snapshotId,
        channel,
        status: 'PENDING_REVIEW',
        collected_at: new Date().toISOString(),
        published_at: null,
        items: finalItems,
      };

      const savedPath = await writeChannelSnapshot('staging', snapshot);
      console.log(`[${channel}] Saved ${itemsWithDelta.length} items -> ${savedPath}`);
      successCount += 1;
    } catch (err) {
      console.error(`[${channel}] Crawl failed:`, err instanceof Error ? err.message : err);
    }
  }

  if (successCount === 0) {
    throw new Error('All channel crawls failed.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
