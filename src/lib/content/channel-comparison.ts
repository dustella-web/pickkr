import type { PublicLocale } from '@/lib/i18n/messages';
import type { ChannelId } from '@/types/ranking';

export interface ChannelComparisonRow {
  channel: ChannelId;
  priceTier: string;
  taxBenefit: string;
  bestFor: string;
  pickupTip: string;
}

export interface ChannelComparisonData {
  heading: string;
  subtitle: string;
  columns: {
    channel: string;
    priceTier: string;
    taxBenefit: string;
    bestFor: string;
    pickupTip: string;
  };
  rows: ChannelComparisonRow[];
}

export interface TravelerFaqItem {
  question: string;
  answer: string;
}

const COMPARISON_DATA: Record<PublicLocale, ChannelComparisonData> = {
  en: {
    heading: 'Where to Buy K-Beauty in Korea: 3-Channel Comparison',
    subtitle: 'Compare pricing tiers, tax benefits, and pickup convenience before building your Seoul shopping route.',
    columns: {
      channel: 'Channel',
      priceTier: 'Typical Price',
      taxBenefit: 'Tax & Duty Benefit',
      bestFor: 'Best For',
      pickupTip: 'Traveler Tip',
    },
    rows: [
      {
        channel: 'lottedfs',
        priceTier: 'USD Duty-Free',
        taxBenefit: 'Tax-free upfront (up to 40–50% off multi-packs)',
        bestFor: 'Barrier creams, prestige serums, multi-pack masks',
        pickupTip: 'Order online & pick up at Incheon/Gimpo Airport post-security.',
      },
      {
        channel: 'missha',
        priceTier: '8,000–35,000 KRW',
        taxBenefit: 'Instant VAT refund at Myeongdong/Hongdae (≥15,000 KRW)',
        bestFor: 'BB creams, cushions, artemisia calming care',
        pickupTip: 'Bring your physical passport for immediate tax deduction at checkout.',
      },
      {
        channel: 'daisomall',
        priceTier: '1,000–5,000 KRW',
        taxBenefit: 'Tax refund available at select tourist stores (≥15,000 KRW)',
        bestFor: 'Cleansing tools, rice cleansers, budget souvenirs',
        pickupTip: 'Visit multi-floor Myeongdong or Hongdae flagship stores for stock.',
      },
    ],
  },
  ja: {
    heading: '韓国コスメ3大チャネル徹底比較：どこで買うのがお得？',
    subtitle: '価格帯・免税方法・得意アイテムを比較して、効率的な韓国ショッピングルートを計画できます。',
    columns: {
      channel: 'チャネル',
      priceTier: '主な価格帯',
      taxBenefit: '免税・割引メリット',
      bestFor: 'おすすめ品目',
      pickupTip: '旅行者向けポイント',
    },
    rows: [
      {
        channel: 'lottedfs',
        priceTier: 'USD 免税価格',
        taxBenefit: '事前免税＆複数買い最大40〜50%OFF',
        bestFor: '保湿クリーム・高機能美容液・大容量パック',
        pickupTip: 'オンライン注文で仁川・金浦空港の出国後に受取可能。',
      },
      {
        channel: 'missha',
        priceTier: '8,000〜35,000ウォン',
        taxBenefit: '15,000ウォン以上でパスポート即時免税',
        bestFor: 'BBクリーム・クッション・ヨモギ鎮静ケア',
        pickupTip: '明洞・弘大などの路面店では会計時にパスポート提示が必須。',
      },
      {
        channel: 'daisomall',
        priceTier: '1,000〜5,000ウォン',
        taxBenefit: '観光エリア大型店で15,000ウォン以上免税対象',
        bestFor: '洗顔ツール・お米クレンザー・ばらまき土産',
        pickupTip: '明洞駅店・弘大2号店など大型フラッグシップ店が品揃え豊富。',
      },
    ],
  },
  'zh-CN': {
    heading: '韩国美妆三大渠道对比：免税店 vs 专卖店 vs 大创怎么选？',
    subtitle: '行前对比价格区间、退税方式与热门品类，合理规划首尔护肤美妆采购路线。',
    columns: {
      channel: '渠道',
      priceTier: '常见价位',
      taxBenefit: '免税/退税优势',
      bestFor: '主打必买品类',
      pickupTip: '游客实用贴士',
    },
    rows: [
      {
        channel: 'lottedfs',
        priceTier: '美元免税价',
        taxBenefit: '直接免税，多件组合常享 5–6 折',
        bestFor: '修护面霜、精华套盒、囤货装面膜',
        pickupTip: '线上提前下单，离境过安检后在仁川/金浦机场提货不占行李。',
      },
      {
        channel: 'missha',
        priceTier: '8,000–35,000 韩元',
        taxBenefit: '单笔满 15,000 韩元支持门店即时退税',
        bestFor: '大红 BB 霜、气垫底妆、艾草舒缓系列',
        pickupTip: '明洞、弘大门店结账时出示护照原件即可直接扣除税额。',
      },
      {
        channel: 'daisomall',
        priceTier: '1,000–5,000 韩元',
        taxBenefit: '部分游客热门大型门店满 15,000 韩元可退税',
        bestFor: '洁面海绵、硅胶刷、平价伴手礼小样',
        pickupTip: '推荐前往明洞站 12 层大创或弘大旗舰店，热门美妆断货较少。',
      },
    ],
  },
  'zh-TW': {
    heading: '韓國美妝三大通路比較：免稅店 vs 品牌門市 vs 大創怎麼買最划算？',
    subtitle: '出發前先比較價位區間、退稅機制與強項品類，輕鬆安排首爾美妝採購路線。',
    columns: {
      channel: '通路',
      priceTier: '常見價位',
      taxBenefit: '免稅／退稅優勢',
      bestFor: '必買強項品類',
      pickupTip: '旅客實用攻略',
    },
    rows: [
      {
        channel: 'lottedfs',
        priceTier: '美金免稅價',
        taxBenefit: '直接免稅，多入組合常見 5–6 折優惠',
        bestFor: '修護乳霜、精華套組、囤貨盒裝面膜',
        pickupTip: '線上先下單，出境過安檢後在仁川／金浦機場取貨，不佔託運重量。',
      },
      {
        channel: 'missha',
        priceTier: '8,000–35,000 韓元',
        taxBenefit: '單筆滿 15,000 韓元享門市即時退稅',
        bestFor: '經典紅管 BB 霜、氣墊粉餅、艾草舒緩系列',
        pickupTip: '明洞、弘大門市結帳時出示護照正本即可現場折抵稅額。',
      },
      {
        channel: 'daisomall',
        priceTier: '1,000–5,000 韓元',
        taxBenefit: '指定觀光區大型門市滿 15,000 韓元可退稅',
        bestFor: '洗臉海綿、矽膠刷具、高 CP 值平價伴手禮',
        pickupTip: '建議前往明洞站多層樓旗艦店或弘大店，熱門彩妝保養補貨最齊全。',
      },
    ],
  },
};

const FAQ_ITEMS: Record<PublicLocale, TravelerFaqItem[]> = {
  en: [
    {
      question: 'How often are PickKR rankings and exchange rates updated?',
      answer: 'Channel Top 20 rankings are updated weekly from official Korean storefronts, while localized currency exchange rates (USD, JPY, CNY, TWD) refresh twice daily.',
    },
    {
      question: 'What is the minimum spend for instant VAT tax refund in Korea?',
      answer: 'Foreign visitors can receive an instant tax refund at participating road shops (such as MISSHA or flagship tourist stores) on single purchases of 15,000 KRW or more when presenting a valid passport.',
    },
    {
      question: 'Should I buy skincare at Lotte Duty Free or in Myeongdong road shops?',
      answer: 'Buy multi-pack serums, barrier creams, and gift sets at Lotte Duty Free for bundle discounts and airport pickup, and pick up single color cosmetics or 1,000–5,000 KRW tools at MISSHA or DAISO.',
    },
    {
      question: 'Are the localized prices shown on PickKR exact checkout prices?',
      answer: 'Localized prices are reference estimates converted from KRW/USD twice daily. Final checkout totals depend on your card issuer exchange rate and store promotions.',
    },
  ],
  ja: [
    {
      question: 'PickKRのランキングと為替レートはどのくらいの頻度で更新されますか？',
      answer: '各チャネルのTop 20ランキングは毎週更新され、日本円（JPY）を含む各国通貨の換算レートは1日2回（12時間ごと）自動更新されます。',
    },
    {
      question: '韓国の路面店で即時免税（Tax Refund）を受けるための最低金額は？',
      answer: 'ミシャなどの対象店舗では、1回の会計が15,000ウォン以上の場合、レジでパスポート原本を提示するとその場で消費税分が割引される即時免税が利用できます。',
    },
    {
      question: 'ロッテ免税店と明洞・弘大の路面店・ダイソーはどう使い分けるべき？',
      answer: '大容量クリームやセット商品は空港受取で荷物を減らせるロッテ免税店、BBクリームなどの色味確認や限定セールは路面店、1,000〜5,000ウォンの洗顔ツールやバラマキ土産はダイソーが最適です。',
    },
    {
      question: 'PickKRに表示されている日本円価格は実際の決済金額と同じですか？',
      answer: '表示価格は1日2回更新される参考換算価格（括弧内が公式ストアの元通貨価格）です。実際の請求額はクレジットカード会社の為替レートや店頭プロモーションにより異なる場合があります。',
    },
  ],
  'zh-CN': [
    {
      question: 'PickKR 的榜单与汇率多久更新一次？',
      answer: '三大渠道的热销 Top 20 榜单每周更新一次，而人民币（CNY）等各国参考汇率每日更新两次（每 12 小时自动同步）。',
    },
    {
      question: '在韩国美妆门店享受即时退税的最低消费门槛是多少？',
      answer: '在参与即时退税的韩国门店（如谜尚明洞/弘大店），单笔消费满 15,000 韩元即可在结账时出示护照原件直接减免税款。',
    },
    {
      question: '乐天免税店、谜尚门店和韩国大创各自适合买什么？',
      answer: '套装护肤、面霜囤货和大容量面膜建议在乐天免税店下单并机场提货；底妆试色和单品优惠适合去品牌专卖店；1,000–5,000 韩元高性价比洁面工具和小礼物推荐在大创采购。',
    },
    {
      question: '页面显示的换算价格与官方商城实际结账金额一致吗？',
      answer: '页面人民币价格为基于每日两次更新汇率的参考估算值（括号内标注原币种价格），实际结账金额会受银行刷卡汇率与门店实时活动影响。',
    },
  ],
  'zh-TW': [
    {
      question: 'PickKR 的熱銷榜單與匯率多久更新一次？',
      answer: '三大通路的 Top 20 榜單每週定期更新一次，而新台幣（TWD）等各國參考匯率則每日更新兩次（每 12 小時自動同步）。',
    },
    {
      question: '在韓國美妝門市辦理即時退稅的最低消費門檻是多少？',
      answer: '在支援即時退稅的韓國門市（如 MISSHA 明洞／弘大店），單筆消費滿 15,000 韓元即可於結帳時出示護照正本直接扣除稅額。',
    },
    {
      question: '樂天免稅店、MISSHA 門市與韓國大創應該怎麼搭配採購？',
      answer: '高單價修護霜、精華組與盒裝面膜推薦在樂天免稅店下單並於機場取貨；彩妝試色與單品優惠可逛品牌門市；1,000–5,000 韓元的潔顏工具與平價伴手禮最適合在大創一次購齊。',
    },
    {
      question: '網站顯示的新台幣價格就是官方結帳的實際金額嗎？',
      answer: '頁面顯示的新台幣為依據每日更新兩次之匯率換算的參考預估值（括號內為原幣別售價），實際刷卡金額仍以發卡銀行匯率與門市活動為準。',
    },
  ],
};

const FAQ_HEADINGS: Record<PublicLocale, string> = {
  en: 'Frequently Asked Questions for Korea Beauty Shoppers',
  ja: '韓国コスメ買い物・免税のよくある質問（FAQ）',
  'zh-CN': '赴韩美妆购物与退税常见问题（FAQ）',
  'zh-TW': '訪韓美妝購物與退稅常見問題（FAQ）',
};

export function getChannelComparisonData(locale: PublicLocale): ChannelComparisonData {
  return COMPARISON_DATA[locale];
}

export function getTravelerFaqItems(locale: PublicLocale): TravelerFaqItem[] {
  return FAQ_ITEMS[locale];
}

export function getFaqSectionHeading(locale: PublicLocale): string {
  return FAQ_HEADINGS[locale];
}

export function buildFaqJsonLd(locale: PublicLocale) {
  const items = getTravelerFaqItems(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
