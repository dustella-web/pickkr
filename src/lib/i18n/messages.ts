import type { ChannelId, Locale } from '@/types/ranking';

export const PUBLIC_LOCALES = ['en', 'ja', 'zh-CN', 'zh-TW'] as const;
export type PublicLocale = (typeof PUBLIC_LOCALES)[number];

export interface LocaleMeta {
  code: PublicLocale;
  flag: string;
  label: string;
}

export const LOCALE_META: Record<PublicLocale, LocaleMeta> = {
  en: { code: 'en', flag: '🇺🇸', label: 'English' },
  ja: { code: 'ja', flag: '🇯🇵', label: '日本語' },
  'zh-CN': { code: 'zh-CN', flag: '🇨🇳', label: '简体中文' },
  'zh-TW': { code: 'zh-TW', flag: '🇹🇼', label: '繁體中文' },
};

export interface UiMessages {
  siteTitle: string;
  siteSubtitle: string;
  allSummary: string;
  viewTop20: string;
  weeklyUpdate: string;
  buyOfficial: string;
  emptyChannel: string;
  guidesTitle: string;
  guidesSubtitle: string;
  readGuide: string;
  heroBadge: string;
  heroHighlightTitle: string;
  weeklyTop20Badge: string;
  editorialGuidesBadge: string;
  legalContactHeading: string;
  exchangeRateNotice: string;
  channels: Record<ChannelId, string>;
}

const MESSAGES: Record<Locale, UiMessages> = {
  ko: {
    siteTitle: 'PickKR',
    siteSubtitle: '한국 주요 뷰티·면세 채널 주간 인기 Top 20',
    allSummary: '전체 요약',
    viewTop20: 'Top 20 전체 보기 →',
    weeklyUpdate: '주간 업데이트',
    buyOfficial: '공식몰 보기 ↗',
    emptyChannel: '아직 승인된 주간 랭킹 데이터가 없습니다.',
    guidesTitle: '쇼핑 가이드 & 리뷰',
    guidesSubtitle: '한국 여행자를 위한 K-Beauty 구매 가이드',
    readGuide: '가이드 읽기 →',
    heroBadge: '주간 한국 뷰티 인덱스',
    heroHighlightTitle: '이번 주 채널별 1위',
    weeklyTop20Badge: '주간 Top 20',
    editorialGuidesBadge: '에디토리얼 가이드',
    legalContactHeading: '정책 및 문의',
    exchangeRateNotice: 'KRW/USD 기준 참고 환산 가격(1일 2회 업데이트)이며, 실제 결제 금액과 다를 수 있습니다.',
    channels: {
      lottedfs: '롯데면세점 뷰티',
      missha: '미샤 (MISSHA)',
      daisomall: '다이소몰 뷰티',
    },
  },
  en: {
    siteTitle: 'PickKR',
    siteSubtitle: 'Korea Travel Beauty Guide & Weekly Top 20 Best Sellers',
    allSummary: 'Overview',
    viewTop20: 'View Full Top 20 →',
    weeklyUpdate: 'Weekly Update',
    buyOfficial: 'Official Store ↗',
    emptyChannel: 'No published ranking data yet.',
    guidesTitle: 'Shopping Guides',
    guidesSubtitle: 'Must-buy Korean skincare guides & honest product reviews for travelers',
    readGuide: 'Read Guide →',
    heroBadge: 'Weekly Korea Beauty Index',
    heroHighlightTitle: 'This week’s #1 picks',
    weeklyTop20Badge: 'Weekly Top 20',
    editorialGuidesBadge: 'Editorial Guides',
    legalContactHeading: 'Legal & Contact',
    exchangeRateNotice: 'Estimated prices converted from KRW/USD (updated twice daily). Actual checkout totals may vary.',
    channels: {
      lottedfs: 'Lotte Duty Free Beauty',
      missha: 'MISSHA',
      daisomall: 'DAISO Mall Beauty',
    },
  },
  ja: {
    siteTitle: 'PickKR',
    siteSubtitle: '韓国旅行者のためのコスメ買い物ガイド＆週間Top 20',
    allSummary: '総合サマリー',
    viewTop20: 'Top 20 をすべて見る →',
    weeklyUpdate: '週間更新',
    buyOfficial: '公式ストアへ ↗',
    emptyChannel: '公開されたランキングデータはまだありません。',
    guidesTitle: 'ショッピングガイド',
    guidesSubtitle: '韓国旅行で買うべきコスメ解説＆レビュー記事',
    readGuide: '記事を読む →',
    heroBadge: '週間韓国ビューティー指数',
    heroHighlightTitle: '今週のチャネル別1位',
    weeklyTop20Badge: '週間 Top 20',
    editorialGuidesBadge: 'ショッピングガイド',
    legalContactHeading: '規約・お問い合わせ',
    exchangeRateNotice: 'KRW/USD基準の参考換算価格（1日2回更新）です。実際の決済金額と異なる場合があります。',
    channels: {
      lottedfs: 'ロッテ免税店 ビューティー',
      missha: 'ミシャ (MISSHA)',
      daisomall: 'ダイソーモール ビューティー',
    },
  },
  'zh-CN': {
    siteTitle: 'PickKR',
    siteSubtitle: '赴韩旅游必买美妆指南与每周热门 Top 20 榜单',
    allSummary: '总览',
    viewTop20: '查看完整 Top 20 →',
    weeklyUpdate: '每周更新',
    buyOfficial: '前往官方商城 ↗',
    emptyChannel: '暂无已发布的榜单数据。',
    guidesTitle: '购物指南与测评',
    guidesSubtitle: '专为赴韩游客打造的韩国护肤攻略与好物测评',
    readGuide: '阅读指南 →',
    heroBadge: '每周韩国美妆指数',
    heroHighlightTitle: '本周三大渠道榜首',
    weeklyTop20Badge: '每周 Top 20',
    editorialGuidesBadge: '购物攻略专栏',
    legalContactHeading: '条款与联系',
    exchangeRateNotice: '按 KRW/USD 汇率换算的参考价格（每日更新2次），实际结算金额可能有所差异。',
    channels: {
      lottedfs: '乐天免税店 美妆',
      missha: '谜尚 MISSHA',
      daisomall: '大创商城 美妆',
    },
  },
  'zh-TW': {
    siteTitle: 'PickKR',
    siteSubtitle: '訪韓旅遊必買美妝攻略與每週熱銷 Top 20 榜單',
    allSummary: '總覽',
    viewTop20: '查看完整 Top 20 →',
    weeklyUpdate: '每週更新',
    buyOfficial: '前往官方商城 ↗',
    emptyChannel: '尚無已發佈的榜單資料。',
    guidesTitle: '購物指南與評測',
    guidesSubtitle: '專為訪韓旅客打造的韓國美妝攻略與必買評測',
    readGuide: '閱讀指南 →',
    heroBadge: '每週韓國美妝指數',
    heroHighlightTitle: '本週三大通路冠軍',
    weeklyTop20Badge: '每週 Top 20',
    editorialGuidesBadge: '購物攻略專欄',
    legalContactHeading: '條款與聯絡',
    exchangeRateNotice: '依 KRW/USD 匯率換算的參考價格（每日更新2次），實際結帳金額可能有所差異。',
    channels: {
      lottedfs: '樂天免稅店 美妝',
      missha: 'MISSHA 謎尚',
      daisomall: '大創商城 美妝',
    },
  },
};

export function getUiMessages(locale: Locale): UiMessages {
  return MESSAGES[locale] ?? MESSAGES.ko;
}

export function isSupportedLocale(value: string): value is Locale {
  return value in MESSAGES;
}

export function isPublicLocale(value: string): value is PublicLocale {
  return (PUBLIC_LOCALES as readonly string[]).includes(value);
}

/**
 * Builds a localized path preserving the current subpath or falling back to activeChannel/subPath.
 */
export function buildLocalizedPath(
  pathname: string | null | undefined,
  targetLocale: PublicLocale,
  activeChannel?: ChannelId,
  subPath?: string
): string {
  if (pathname && pathname.startsWith('/')) {
    const rest = pathname.replace(/^\/(en|ja|zh-CN|zh-TW|ko)(?=\/|$)/, '');
    return `/${targetLocale}${rest}`;
  }
  if (subPath) {
    const normalized = subPath.startsWith('/') ? subPath : `/${subPath}`;
    return `/${targetLocale}${normalized}`;
  }
  return activeChannel
    ? `/${targetLocale}/channel/${activeChannel}`
    : `/${targetLocale}`;
}
