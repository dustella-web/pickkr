import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { ChannelSnapshot } from '@/types/ranking';
import { publishSnapshot } from '../publisher';

const SAMPLE_SNAPSHOT: ChannelSnapshot = {
  snapshot_id: '2026-W46',
  channel: 'lottedfs',
  status: 'PENDING_REVIEW',
  collected_at: '2026-11-14T00:00:00.000Z',
  published_at: null,
  items: [],
};

describe('publishSnapshot', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'kbeauty-pub-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it('should write published and history JSON locally when GitHub env is not set', async () => {
    const result = await publishSnapshot(SAMPLE_SNAPSHOT, { baseDir: tempDir });

    expect(result.mode).toBe('local');
    expect(result.snapshot.status).toBe('PUBLISHED');
    expect(result.snapshot.published_at).toBeTruthy();

    const publishedRaw = await fs.readFile(
      path.join(tempDir, 'published', 'lottedfs.json'),
      'utf-8'
    );
    const historyRaw = await fs.readFile(
      path.join(tempDir, 'history', '2026-W46', 'lottedfs.json'),
      'utf-8'
    );

    expect(JSON.parse(publishedRaw).status).toBe('PUBLISHED');
    expect(JSON.parse(historyRaw).snapshot_id).toBe('2026-W46');
  });

  it('should commit to GitHub Contents API when github config is provided', async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (!init || init.method === 'GET') {
        return new Response(JSON.stringify({ sha: 'existing-sha-123' }), { status: 200 });
      }
      return new Response(
        JSON.stringify({ commit: { sha: 'new-commit-456' } }),
        { status: 200 }
      );
    });

    const result = await publishSnapshot(SAMPLE_SNAPSHOT, {
      github: {
        token: 'ghp_test',
        owner: 'choi',
        repo: 'project-temp-ing',
        branch: 'main',
      },
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    expect(result.mode).toBe('github');
    expect(result.commitSha).toBe('new-commit-456');
    expect(fetchMock).toHaveBeenCalled();
  });
});
