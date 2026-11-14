import fs from 'node:fs/promises';
import path from 'node:path';
import { crawlLotteDfs } from '../src/lib/crawlers/lottedfs.ts';
import type { ChannelSnapshot } from '../src/types/ranking.ts';

function getCurrentIsoWeekId(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const diffDays = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  const week = Math.ceil((diffDays + startOfYear.getUTCDay() + 1) / 7);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

async function main() {
  console.log('Crawling Lotte DFS Top 20...');
  const items = await crawlLotteDfs(20);
  const snapshot: ChannelSnapshot = {
    snapshot_id: getCurrentIsoWeekId(),
    channel: 'lottedfs',
    status: 'PENDING_REVIEW',
    collected_at: new Date().toISOString(),
    published_at: null,
    items,
  };

  const outPath = path.join(process.cwd(), 'data', 'staging', 'lottedfs.json');
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf-8');
  console.log(`Saved ${items.length} items to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
