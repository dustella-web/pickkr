import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import type { ChannelId } from '@/types/ranking';
import { readChannelSnapshot, writeChannelSnapshot } from '@/lib/storage/json-store';
import { publishSnapshot } from '@/lib/git/publisher';
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

  const staging = await readChannelSnapshot('staging', channel);
  if (!staging) {
    return NextResponse.json({ error: `No staging snapshot found for ${channel}` }, { status: 404 });
  }

  const result = await publishSnapshot(staging);
  await writeChannelSnapshot('staging', result.snapshot);

  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true, result });
}
