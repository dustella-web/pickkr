# K-Beauty 글로벌 랭킹 큐레이션 플랫폼 구축

> 한국 뷰티·면세 3개 채널(롯데면세점·미샤·다이소몰) Top 20 주간 수집, 다국어 번역, 관리자 Git 승인 및 AdSense 승인 요건을 충족하는 글로벌 웹 서비스 구축

**Status**: Active
**Created**: 2026-11-14
**Owner**: Engineering / PM

## Goal
- 5개 로케일(`ko`, `en`, `ja`, `zh-CN`, `zh-TW`)로 K-Beauty 주간 Top 20 랭킹과 오리지널 가이드 콘텐츠를 서빙하고, Google AdSense 심사 승인을 통과하는 프로덕션 사이트를 Vercel Hobby(추후 Cloudflare Workers 확장) 위에 배포한다.

## Context
- 상세 기획서: [docs/plan.md](file:///Users/choi/Documents/GitHub/project-temp-ing/docs/plan.md)
- 아키텍처 결정: [001-architecture-and-channels.md](file:///Users/choi/Documents/GitHub/project-temp-ing/docs/decisions/001-architecture-and-channels.md)
- Admin API 계약: [admin-api.md](file:///Users/choi/Documents/GitHub/project-temp-ing/docs/plans/contracts/admin-api.md)

## Constraints
- DB 비용 0원: Git 리포지토리 내 정적 JSON(`data/staging/`, `data/published/`, `data/history/`)만 사용
- 안티봇 챌린지 우회 금지 (Cloudflare/JS 챌린지 사이트는 자동 크롤링에서 제외)
- AdSense 승인 필수: 단순 상품 링크 나열 금지, 오리지널 가이드/트렌드 리포트 및 법적 페이지 필수 포함
- Node 24 환경에서 Next.js 16 Turbopack PostCSS 워커 이슈로 `next build --webpack` 사용

## Tasks

| # | Task | Agent | Priority | Status | Dependencies |
|---|------|-------|----------|--------|--------------|
| 1 | 5개 후보 사이트 접근성/렌더링/핫링크 PoC 및 채널 확정 | `research` | 1 | DONE | — |
| 2 | Next.js App Router + Tailwind + Vitest 스캐폴딩 & Git JSON Store 구현 | `backend` | 1 | DONE | 1 |
| 3 | 롯데면세점 · 미샤 · 다이소몰 Top 20 크롤러 어댑터 & 통합 CLI 구현 | `backend` | 1 | DONE | 2 |
| 4 | K-Beauty 용어집 기반 다국어 번역기 & GitHub Contents API 발행기 구현 | `backend` | 1 | DONE | 2 |
| 5 | `/admin` JSON 편집·미리보기·자동 번역·Git 승인 대시보드 및 5개국어 기본 뷰 구현 | `frontend` | 2 | DONE | 3, 4 |
| 6 | 주간 GitHub Actions 자동 크롤링 워크플로우(`.github/workflows/weekly-crawl.yml`) 구성 | `tf-infra` | 2 | DONE | 3 |
| 7 | 다국어 SEO 고도화 (`hreflang`, 동적 `sitemap.xml`, `robots.txt`, JSON-LD 구조화 데이터) | `frontend` | 2 | DONE | 5 |
| 8 | AdSense 필수 법적 페이지 5종 (`About`, `Contact`, `Privacy`, `Terms`, `Disclaimer`) 4개국어 구축 | `frontend` | 2 | DONE | 5 |
| 9 | 오리지널 K-Beauty 트렌드 리포트 & 성분/쇼핑 가이드 콘텐츠(15편 4개국어 완비) | `docs` | 3 | DONE | 7, 8 |
| 10 | 롯데면세점 가격 파싱 및 미샤 가격 보완, 초기 `published` 데이터 승인 및 Vercel 배포 검증 | `qa` | 3 | TODO | 5, 8 |

## Done When
- [x] 3개 채널(`lottedfs`, `missha`, `daisomall`) 실데이터 Top 20이 `data/staging/*.json`에 수집됨
- [x] 단위 테스트(`npm test`) 및 프로덕션 빌드(`npm run build`) 통과
- [x] 5개국어(4개 Public 로케일) `hreflang`, `sitemap.xml`, `robots.txt`, JSON-LD 적용 완료
- [x] 법적 필수 페이지 5종 및 오리지널 가이드 콘텐츠 15편 이상 발행
- [ ] Google Search Console 등록 및 AdSense 심사 신청 완료

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-11-14 | Git JSON 저장소 확정 (DB 미사용) | 초기 비용 0원, Git 히스토리 기반 주간 아카이빙 |
| 2026-11-14 | 올리브영/신세계/신라/더페이스샵 제외, 3개 채널 확정 | PoC 결과 403/406 안티봇 챌린지 및 robots.txt 제한 준수 |
| 2026-11-14 | `next build --webpack` 채택 | Node 24 환경에서 Turbopack PostCSS 자식 프로세스 패닉 회피 |

## Progress Notes
- [2026-11-14] PoC 완료 및 `docs/plan.md` 마스터 플랜 고도화
- [2026-11-14] Tasks 1~6 완료 (11개 단위 테스트 통과, 3개 채널 60개 상품 Staging JSON 수집 완료)
- [2026-11-14] `.agents/workflows/plan.md` 규격에 맞춰 ADR, Admin API Contract, Work Tracker, Tech Debt Tracker 정리 완료
