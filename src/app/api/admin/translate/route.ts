import { NextRequest, NextResponse } from 'next/server';
import type { ChannelId } from '@/types/ranking';
import { readChannelSnapshot, writeChannelSnapshot } from '@/lib/storage/json-store';
import {
  geminiTranslateProvider,
  translateRankingItems,
} from '@/lib/translation/translator';
import { verifyAdminRequest } from '@/lib/auth/admin-guard';

export async function POST(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { channel } = (await req.json()) as { channel?: ChannelId };
  if (!channel) {
    return NextResponse.json({ error: 'Channel is required' }, { status: 400 });
  }

  const snapshot = await readChannelSnapshot('staging', channel);
  if (!snapshot) {
    return NextResponse.json({ error: `No staging snapshot found for ${channel}` }, { status: 404 });
  }

  try {
    const translatedItems = await translateRankingItems(
      snapshot.items,
      geminiTranslateProvider
    );
    const updated = { ...snapshot, items: translatedItems };
    await writeChannelSnapshot('staging', updated);
    return NextResponse.json({ ok: true, snapshot: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Translation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
