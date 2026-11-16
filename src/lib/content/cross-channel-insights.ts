import type { ChannelId, RankingItem } from '@/types/ranking';

export interface ChannelSnapshotInput {
  channel: ChannelId;
  items: RankingItem[];
}

export interface CrossChannelItem {
  channel: ChannelId;
  item: RankingItem;
  discountPct: number;
}

function computeDiscountPct(item: RankingItem): number {
  if (
    item.sale_price === null ||
    item.sale_price <= 0 ||
    item.price <= 0 ||
    item.sale_price >= item.price
  ) {
    return 0;
  }
  return Math.max(1, Math.round(((item.price - item.sale_price) / item.price) * 100));
}

/**
 * Flattens ranking items from all channels with channel attribution and discount %.
 */
export function buildCrossChannelPool(
  snapshots: ChannelSnapshotInput[]
): CrossChannelItem[] {
  return snapshots.flatMap(({ channel, items }) =>
    items.map((item) => ({
      channel,
      item,
      discountPct: computeDiscountPct(item),
    }))
  );
}

/**
 * Extracts the top N discounted products across all channels.
 */
export function extractTopDeals(
  snapshots: ChannelSnapshotInput[],
  limit = 3
): CrossChannelItem[] {
  return buildCrossChannelPool(snapshots)
    .filter((entry) => entry.discountPct > 0)
    .sort((a, b) => b.discountPct - a.discountPct)
    .slice(0, limit);
}
