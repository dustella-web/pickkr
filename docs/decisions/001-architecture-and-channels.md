# 001. Git JSON 저장소, 크롤링 채널 확정 및 인프라 확장 전략

**Status**: Accepted
**Date**: 2026-11-14
**Owner**: Engineering / PM

## 1. Context
- 초기 비용 0원(Vercel Hobby 무료 티어)으로 K-Beauty 글로벌 5개국어 랭킹 사이트를 구축하고 Google AdSense 승인을 목표로 한다.
- 주 1회 크롤링 → 다국어 번역 → 관리자 검수/승인 → 라이브 반영의 HITL(Human-in-the-Loop) 워크플로우가 필요하다.

## 2. Decisions

### 2.1 데이터 저장소: Git 기반 정적 JSON 확정
- **결정**: 별도 RDB(Supabase/Neon)를 두지 않고 리포지토리 내 `data/staging/`, `data/published/`, `data/history/` JSON 파일로 관리한다.
- **근거**: DB 유지비/콜드스타트/연결 풀 관리 부담이 없으며, Git 커밋 히스토리 자체가 주간 랭킹 아카이브 역할을 수행한다.

### 2.2 수집 채널 확정 (PoC 검증 기반)
- **자동 수집 확정 (3개 채널)**:
  - **롯데면세점 (`lottedfs`)**: SSR HTML (`cheerio` 추출, USD, 이미지 핫링크 `200 OK`)
  - **미샤 (`missha`)**: 공개 JSON API (`/kr/product/1/getProductList`, KRW)
  - **다이소몰 (`daisomall`)**: Playwright + `/api/ds/exh/v2/selExhRest` JSON 캡처 (KRW, 이미지 핫링크 `200 OK`)
- **제외/수동 전환**:
  - 올리브영(`403` Cloudflare), 신세계면세점(`406` JS 챌린지), 신라면세점(`403` Cloudflare)은 안티봇 챌린지 우회 금지 원칙에 따라 자동 크롤러에서 제외한다.
  - 더페이스샵은 `robots.txt` 제한(`Disallow: /`)으로 제외한다.

### 2.3 배치 분리 & 호스팅 확장 전략
- **초기**: 무거운 크롤링은 **GitHub Actions**(`weekly-crawl.yml`)에서 수행하고, **Vercel Hobby**는 Next.js 웹 서빙 및 `/admin` GitHub Contents API 커밋만 담당한다.
- **확장**: AdSense 수익화 본격화 또는 월 100GB 대역폭 임계치 도달 시 `@opennextjs/cloudflare`를 통해 **Cloudflare Workers + KV/R2**로 이관한다.
