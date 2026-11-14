import { NextRequest, NextResponse } from 'next/server';
import type { ChannelId, ChannelSnapshot } from '@/types/ranking';
import { readChannelSnapshot, writeChannelSnapshot } from '@/lib/storage/json-store';
import { verifyAdminRequest } from '@/lib/auth/admin-guard';

const VALID_CHANNELS: ChannelId[] = ['lottedfs', 'missha', 'daisomall'];

function parseChannel(raw: string | null): ChannelId | null {
  if (!raw || !VALID_CHANNELS.includes(raw as ChannelId)) {
    return null;
  }
  return raw as ChannelId;
}

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const channel = parseChannel(req.nextUrl.searchParams.get('channel'));
  const stage = req.nextUrl.searchParams.get('stage') === 'published' ? 'published' : 'staging';

  if (!channel) {
    return NextResponse.json({ error: 'Invalid channel parameter' }, { status: 400 });
  }

  const snapshot = await readChannelSnapshot(stage, channel);
  return NextResponse.json({ snapshot });
}

export async function PUT(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = (await req.json()) as { snapshot?: ChannelSnapshot };
  if (!body.snapshot || !parseChannel(body.snapshot.channel)) {
    return NextResponse.json({ error: 'Invalid snapshot payload' }, { status: 400 });
  }

  await writeChannelSnapshot('staging', body.snapshot);
  return NextResponse.json({ ok: true, snapshot: body.snapshot });
}
