# Admin API Contract

**Status**: Active
**Revision**: v1.0 (2026-11-14)
**Auth**: `ADMIN_SECRET` 환경변수 설정 시 요청 헤더 `x-admin-secret` 필수 검증 (`401 Unauthorized`).

---

## 1. `GET /api/admin/snapshot`
Staging 또는 Published 채널 스냅샷 JSON을 조회한다.

- **Query**:
  - `channel`: `'lottedfs' | 'missha' | 'daisomall'` (필수)
  - `stage`: `'staging' | 'published'` (기본값 `'staging'`)
- **Response `200 OK`**:
  ```json
  { "snapshot": { "snapshot_id": "2026-W46", "channel": "lottedfs", "status": "PENDING_REVIEW", "items": [] } }
  ```
- **Errors**: `400 Invalid channel parameter`, `401 Unauthorized`

## 2. `PUT /api/admin/snapshot`
관리자가 편집한 JSON을 Staging(`data/staging/{channel}.json`)에 저장한다.

- **Request Body**: `{ "snapshot": ChannelSnapshot }`
- **Response `200 OK`**: `{ "ok": true, "snapshot": ChannelSnapshot }`
- **Errors**: `400 Invalid snapshot payload`, `401 Unauthorized`

## 3. `POST /api/admin/translate`
Staging 스냅샷의 미번역 `brand`/`name`을 용어집 + Gemini API로 차분 번역 후 저장한다.

- **Request Body**: `{ "channel": "lottedfs" | "missha" | "daisomall" }`
- **Response `200 OK`**: `{ "ok": true, "snapshot": ChannelSnapshot }`
- **Errors**: `400`, `401`, `404 No staging snapshot`, `500 Translation failed`

## 4. `POST /api/admin/publish`
Staging 스냅샷을 `PUBLISHED` 상태로 전환하고 GitHub Contents API(또는 로컬 `data/published` 및 `data/history`)에 반영 후 Next.js 캐시를 무효화(`revalidatePath`)한다.

- **Request Body**: `{ "channel": "lottedfs" | "missha" | "daisomall" }`
- **Response `200 OK`**:
  ```json
  { "ok": true, "result": { "mode": "github" | "local", "commitSha": "...", "paths": ["data/published/lottedfs.json"] } }
  ```
- **Errors**: `400`, `401`, `404 No staging snapshot`
