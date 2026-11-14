import fs from 'node:fs/promises';
import path from 'node:path';
import type { ChannelSnapshot } from '@/types/ranking';
import { writeChannelSnapshot } from '../storage/json-store.ts';

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch?: string;
}

export interface PublishOptions {
  baseDir?: string;
  github?: GitHubConfig;
  fetchImpl?: typeof fetch;
}

export interface PublishResult {
  mode: 'local' | 'github';
  snapshot: ChannelSnapshot;
  commitSha?: string;
  paths: string[];
}

export function resolveGitHubConfigFromEnv(): GitHubConfig | undefined {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!token || !owner || !repo) {
    return undefined;
  }
  return { token, owner, repo, branch };
}

async function upsertGitHubFile(
  config: GitHubConfig,
  filePath: string,
  content: string,
  message: string,
  fetchImpl: typeof fetch
): Promise<string> {
  const branch = config.branch || 'main';
  const apiUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${config.token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'User-Agent': 'kbeauty-ranking-admin',
  };

  let existingSha: string | undefined;
  const getRes = await fetchImpl(`${apiUrl}?ref=${encodeURIComponent(branch)}`, {
    method: 'GET',
    headers,
  });
  if (getRes.ok) {
    const existing = (await getRes.json()) as { sha?: string };
    existingSha = existing.sha;
  }

  const encoded = Buffer.from(content, 'utf-8').toString('base64');
  const putRes = await fetchImpl(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message,
      content: encoded,
      branch,
      ...(existingSha ? { sha: existingSha } : {}),
    }),
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    throw new Error(`GitHub commit failed (${putRes.status}): ${errText}`);
  }

  const putData = (await putRes.json()) as { commit?: { sha?: string } };
  return putData.commit?.sha || '';
}

/**
 * Marks a snapshot as PUBLISHED and persists it either to GitHub (via Contents API)
 * or locally under data/published and data/history.
 */
export async function publishSnapshot(
  inputSnapshot: ChannelSnapshot,
  options: PublishOptions = {}
): Promise<PublishResult> {
  const publishedSnapshot: ChannelSnapshot = {
    ...inputSnapshot,
    status: 'PUBLISHED',
    published_at: new Date().toISOString(),
  };

  const jsonContent = `${JSON.stringify(publishedSnapshot, null, 2)}\n`;
  const publishedRelPath = `data/published/${publishedSnapshot.channel}.json`;
  const historyRelPath = `data/history/${publishedSnapshot.snapshot_id}/${publishedSnapshot.channel}.json`;

  const github = options.github ?? resolveGitHubConfigFromEnv();
  if (github) {
    const fetchImpl = options.fetchImpl ?? fetch;
    const commitMsg = `chore(data): publish ${publishedSnapshot.channel} ${publishedSnapshot.snapshot_id}`;
    const commitSha = await upsertGitHubFile(
      github,
      publishedRelPath,
      jsonContent,
      commitMsg,
      fetchImpl
    );
    await upsertGitHubFile(
      github,
      historyRelPath,
      jsonContent,
      `${commitMsg} (history)`,
      fetchImpl
    );
    return {
      mode: 'github',
      snapshot: publishedSnapshot,
      commitSha,
      paths: [publishedRelPath, historyRelPath],
    };
  }

  const baseDir = options.baseDir ?? path.join(process.cwd(), 'data');
  await writeChannelSnapshot('published', publishedSnapshot, baseDir);
  const historyPath = path.join(
    baseDir,
    'history',
    publishedSnapshot.snapshot_id,
    `${publishedSnapshot.channel}.json`
  );
  await fs.mkdir(path.dirname(historyPath), { recursive: true });
  await fs.writeFile(historyPath, jsonContent, 'utf-8');

  return {
    mode: 'local',
    snapshot: publishedSnapshot,
    paths: [publishedRelPath, historyRelPath],
  };
}
