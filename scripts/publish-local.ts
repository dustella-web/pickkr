import { readChannelSnapshot, writeChannelSnapshot } from '../src/lib/storage/json-store.ts';
import { publishSnapshot } from '../src/lib/git/publisher.ts';
import type { ChannelId } from '../src/types/ranking.ts';

const CHANNELS: ChannelId[] = ['lottedfs', 'missha', 'daisomall'];

async function main() {
  for (const ch of CHANNELS) {
    const staging = await readChannelSnapshot('staging', ch);
    if (!staging) {
      console.warn(`[${ch}] No staging snapshot found, skipping.`);
      continue;
    }
    const result = await publishSnapshot(staging);
    await writeChannelSnapshot('staging', result.snapshot);
    console.log(`[${ch}] Published ${result.snapshot.items.length} items (${result.mode}) -> ${result.paths.join(', ')}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
