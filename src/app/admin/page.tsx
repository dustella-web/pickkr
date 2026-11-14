'use client';

import { useEffect, useState, useCallback } from 'react';
import type { ChannelId, ChannelSnapshot } from '@/types/ranking';

const CHANNELS: { id: ChannelId; label: string }[] = [
  { id: 'lottedfs', label: '롯데면세점' },
  { id: 'missha', label: '미샤' },
  { id: 'daisomall', label: '다이소몰' },
];

export default function AdminPage() {
  const [channel, setChannel] = useState<ChannelId>('lottedfs');
  const [snapshot, setSnapshot] = useState<ChannelSnapshot | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const authHeaders = useCallback((): Record<string, string> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (adminSecret.trim()) {
      headers['x-admin-secret'] = adminSecret.trim();
    }
    return headers;
  }, [adminSecret]);

  const loadSnapshot = useCallback(async (ch: ChannelId) => {
    setBusy(true);
    setStatusMsg(null);
    try {
      const res = await fetch(`/api/admin/snapshot?channel=${ch}&stage=staging`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg(`로드 오류: ${data.error || res.status}`);
        return;
      }
      setSnapshot(data.snapshot);
      setJsonText(data.snapshot ? JSON.stringify(data.snapshot, null, 2) : '');
    } finally {
      setBusy(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    loadSnapshot(channel);
  }, [channel, loadSnapshot]);

  const handleSaveJson = async () => {
    setBusy(true);
    setStatusMsg(null);
    try {
      const parsed = JSON.parse(jsonText) as ChannelSnapshot;
      const res = await fetch('/api/admin/snapshot', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ snapshot: parsed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg(`저장 실패: ${data.error}`);
        return;
      }
      setSnapshot(data.snapshot);
      setJsonText(JSON.stringify(data.snapshot, null, 2));
      setStatusMsg('Staging JSON이 저장되었습니다.');
    } catch (err) {
      setStatusMsg(`JSON 파싱/저장 오류: ${err instanceof Error ? err.message : '알 수 없음'}`);
    } finally {
      setBusy(false);
    }
  };

  const handleTranslate = async () => {
    setBusy(true);
    setStatusMsg('다국어 자동 번역 중...');
    try {
      const res = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ channel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg(`번역 실패: ${data.error}`);
        return;
      }
      setSnapshot(data.snapshot);
      setJsonText(JSON.stringify(data.snapshot, null, 2));
      setStatusMsg('5개국어 자동 번역이 완료되었습니다.');
    } finally {
      setBusy(false);
    }
  };

  const handlePublish = async () => {
    setBusy(true);
    setStatusMsg('Git 반영 및 배포 처리 중...');
    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ channel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg(`승인 실패: ${data.error}`);
        return;
      }
      setSnapshot(data.result.snapshot);
      setJsonText(JSON.stringify(data.result.snapshot, null, 2));
      setStatusMsg(
        `승인 완료 (${data.result.mode} 모드)${data.result.commitSha ? ` - Commit: ${data.result.commitSha}` : ''}`
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">K-Beauty Admin Dashboard</h1>
          <p className="text-sm text-slate-500">
            수집된 Staging JSON 검수 · 편집 · 자동 번역 및 Git 승인 발행
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="password"
            placeholder="Admin Secret (선택)"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
          />
          <a
            href="/en"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            라이브 보기
          </a>
        </div>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setChannel(ch.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                channel === ch.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            disabled={busy || !jsonText}
            onClick={handleSaveJson}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50"
          >
            JSON 저장
          </button>
          <button
            disabled={busy || !snapshot}
            onClick={handleTranslate}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            다국어 자동 번역
          </button>
          <button
            disabled={busy || !snapshot}
            onClick={handlePublish}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            승인 및 Git 반영
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="mb-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800">
          {statusMsg}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Staging JSON 편집기</h2>
            {snapshot && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                {snapshot.snapshot_id} · {snapshot.status}
              </span>
            )}
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder="아직 수집된 Staging JSON이 없습니다."
            className="h-[640px] w-full rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-700">
            상품 정보 미리보기 ({snapshot?.items.length ?? 0}개)
          </h2>
          <div className="max-h-[640px] space-y-3 overflow-y-auto pr-1">
            {snapshot?.items.map((item) => {
              const hasEn = Boolean(item.name.en?.trim());
              return (
                <div
                  key={`${item.rank}-${item.source_product_id}`}
                  className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {item.rank}
                  </span>
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name.ko}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 shrink-0 rounded-md border border-slate-200 object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">
                        {item.brand.ko || '브랜드 미정'}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                          hasEn
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {hasEn ? '번역됨' : '미번역'}
                      </span>
                    </div>
                    <p className="truncate text-sm font-medium text-slate-900">{item.name.ko}</p>
                    {hasEn && (
                      <p className="truncate text-xs text-slate-500">EN: {item.name.en}</p>
                    )}
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-600">
                      <span>
                        {item.currency === 'USD'
                          ? `$${item.sale_price ?? item.price}`
                          : `${(item.sale_price ?? item.price).toLocaleString()}원`}
                      </span>
                      <a
                        href={item.product_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        상품 링크 ↗
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
            {!snapshot && (
              <p className="py-12 text-center text-sm text-slate-400">
                수집된 데이터가 없습니다. 크롤러를 실행하거나 JSON을 붙여넣어 저장하세요.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
