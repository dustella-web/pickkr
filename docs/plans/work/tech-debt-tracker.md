# Tech Debt Tracker

| # | Debt | Source Plan | Priority | Proposed Resolution |
|---|------|-------------|----------|---------------------|
| 1 | `missha` API(`/kr/product/1/getProductList`)에 가격 필드가 없어 `price: 0` 저장됨 | `001-kbeauty-ranking-platform` | P2 | `prdmLinkUrl`(mynunc) 연동 또는 상세 페이지 가격 보조 추출 검토 |
| 2 | `ADMIN_SECRET` 미설정 시 `/api/admin/*`가 오픈되는 로컬 편의성 | `001-kbeauty-ranking-platform` | P1 | Vercel 프로덕션 배포 시 `ADMIN_SECRET` 환경변수 필수 설정 및 `/admin` 로그인 게이트 추가 |
| 3 | Node 24 환경에서 `next build` 기본 Turbopack 패닉으로 `--webpack` 플래그 사용 중 | `001-kbeauty-ranking-platform` | P3 | Next.js 패치 버전 업그레이드 시 Turbopack 재검증 후 플래그 제거 |
