# 무료 환율 API 연동 및 1일 2회 다국어 통화 표시

> 무료 환율 API(API 키 불필요)를 하루 2회(12시간 주기) 갱신하여 각 언어별 현지 통화로 상품 가격을 자동 변환·표시하는 기능 구현 산출물

**Status**: Done
**Created**: 2026-11-16
**Owner**: Engineering

## 1. 목표 및 요구사항
- API 키 및 비용 없이 사용 가능한 무료 환율 API 연동
- **하루 2회(12시간 주기)** 환율 데이터 갱신 (GitHub Actions 스케줄 + 12시간 TTL/Next.js ISR)
- 지원 언어(`ko`, `en`, `ja`, `zh-CN`, `zh-TW`)별 현지 통화 자동 환산 및 포맷팅
- 네트워크 장애 시 기존 스냅샷 및 정적 폴백(Fallback) 환율로 서비스 무중단 보장

## 2. 아키텍처 및 데이터 흐름

### 2.1 무료 환율 API 선정 (No-Key)
`TWD`(대만 달러)를 포함한 5개 대상 통화(`KRW`, `USD`, `JPY`, `CNY`, `TWD`)를 모두 지원하는 무료 API를 이중화하여 구성했습니다.
1. **Primary**: `https://open.er-api.com/v6/latest/KRW` (ExchangeRate-API Open Access, API 키 불필요)
2. **Secondary (Fallback)**: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.json` (CDN 기반 무료 환율 API)
3. **Static Fallback**: 두 API 모두 실패할 경우 기존 `data/exchange-rates.json` 또는 내장 기본 환율(`FALLBACK_EXCHANGE_RATES`) 사용

### 2.2 하루 2회(12시간 주기) 갱신 전략
1. **배치 스케줄 (GitOps)**:
   - [update-exchange-rates.yml](file:///Users/choi/Documents/GitHub/pickkr/.github/workflows/update-exchange-rates.yml)이 매일 `00:00 UTC (09:00 KST)` 및 `12:00 UTC (21:00 KST)`에 `npm run rates:update`를 실행하여 [exchange-rates.json](file:///Users/choi/Documents/GitHub/pickkr/data/exchange-rates.json)을 갱신하고 커밋합니다.
2. **런타임 / ISR 캐싱**:
   - [exchange-rates.ts](file:///Users/choi/Documents/GitHub/pickkr/src/lib/i18n/exchange-rates.ts)의 `getExchangeRates()`는 `EXCHANGE_RATE_TTL_MS` (12시간 = `43,200,000ms`) 이내의 스냅샷을 재사용하고, 만료 시 자동으로 API를 호출합니다.
   - [page.tsx](file:///Users/choi/Documents/GitHub/pickkr/src/app/[locale]/page.tsx) 및 [channel/[channel]/page.tsx](file:///Users/choi/Documents/GitHub/pickkr/src/app/[locale]/channel/[channel]/page.tsx)에 `export const revalidate = 43200;`을 설정하여 12시간마다 페이지를 재검증합니다.

## 3. 언어별 통화 매핑 및 포맷 규칙

| Locale | 통화 코드 | 표기 형식 | 소수점 처리 | 예시 (3,000원 기준) |
|--------|-----------|-----------|-------------|---------------------|
| `ko` | `KRW` | `#,###원` | 정수 반올림 | `3,000원` |
| `en` | `USD` | `$#.##` | 최대 2자리 | `$2.16` |
| `ja` | `JPY` | `¥#,###` | 정수 반올림 | `¥330` |
| `zh-CN` | `CNY` | `CN¥#.##` | 최대 2자리 | `CN¥15.6` |
| `zh-TW` | `TWD` | `NT$#,###` | 정수 반올림 | `NT$69` |

- 원본 상품이 `KRW`(다이소몰, 미샤 등)이든 `USD`(롯데면세점)이든 `convertPrice()`가 `KRW` 기준 환율 맵을 통해 교차 환산합니다.
- `rates` 인자 없이 `formatProductPrice(item, locale)`을 호출하면 기존 하위 호환 동작(원가 표기)을 유지합니다.

## 4. 구현 산출물 목록
- 환율 조회·캐싱 모듈: [exchange-rates.ts](file:///Users/choi/Documents/GitHub/pickkr/src/lib/i18n/exchange-rates.ts)
- 다국어 가격 변환·포맷터: [format-price.ts](file:///Users/choi/Documents/GitHub/pickkr/src/lib/i18n/format-price.ts)
- 환율 갱신 CLI 스크립트: [update-exchange-rates.ts](file:///Users/choi/Documents/GitHub/pickkr/scripts/update-exchange-rates.ts) (`npm run rates:update`)
- 환율 스냅샷 데이터: [exchange-rates.json](file:///Users/choi/Documents/GitHub/pickkr/data/exchange-rates.json)
- 1일 2회 GitHub Actions 워크플로우: [update-exchange-rates.yml](file:///Users/choi/Documents/GitHub/pickkr/.github/workflows/update-exchange-rates.yml)
- UI/페이지 연동: [ranking-view.tsx](file:///Users/choi/Documents/GitHub/pickkr/src/components/ranking-view.tsx), [page.tsx](file:///Users/choi/Documents/GitHub/pickkr/src/app/[locale]/page.tsx), [channel/[channel]/page.tsx](file:///Users/choi/Documents/GitHub/pickkr/src/app/[locale]/channel/[channel]/page.tsx)
- 단위 테스트: [exchange-rates.test.ts](file:///Users/choi/Documents/GitHub/pickkr/src/lib/i18n/__tests__/exchange-rates.test.ts), [format-price.test.ts](file:///Users/choi/Documents/GitHub/pickkr/src/lib/i18n/__tests__/format-price.test.ts)
