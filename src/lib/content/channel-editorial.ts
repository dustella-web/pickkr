import type { PublicLocale } from '@/lib/i18n/messages';
import type { ChannelId } from '@/types/ranking';

export interface ChannelEditorialCopy {
  heading: string;
  homeSummary: string;
  intro: string;
  paragraphs: string[];
  relatedGuidesHeading: string;
}

export interface ChannelEditorial {
  relatedGuideSlugs: string[];
  copy: Record<PublicLocale, ChannelEditorialCopy>;
}

const CHANNEL_EDITORIALS: Record<ChannelId, ChannelEditorial> = {
  lottedfs: {
    relatedGuideSlugs: [
      'lotte-duty-free-top-skincare-duo-sets',
      'korea-duty-free-and-tax-refund-tips',
      'airport-liquid-rules-and-packing-kbeauty',
    ],
    copy: {
      en: {
        heading: 'How to Shop Lotte Duty Free Smartly',
        homeSummary:
          'Preview top 8 USD duty-free skincare sets ready for Incheon & Gimpo airport pickup.',
        intro:
          'Track weekly top-selling Korean and global skincare sets priced in USD—ideal for airport pickup without adding checked-baggage weight.',
        paragraphs: [
          'Lotte Duty Free specializes in multi-bottle duo sets, barrier creams, and clinic-inspired serums from brands like Sulwhasoo, AESTURA, Estée Lauder, and Torridon. Because purchases are collected past airport security at Incheon or Gimpo, heavy glass bottles and liquids over 100ml do not count toward your airline carry-on liquid restrictions.',
          'Our weekly Top 20 snapshot highlights the items travelers pre-order most frequently. Compare USD duty-free pricing against street-shop promotions, lock in popular duo sets 3–5 days before departure, and review our linked duty-free guides for pickup counter and customs allowance tips.',
        ],
        relatedGuidesHeading: 'Related Duty-Free Shopping Guides',
      },
      ja: {
        heading: 'ロッテ免税店を賢く活用するためのポイント',
        homeSummary:
          '空港受取で人気のUSD建て定番セット上位8品をピックアップしました。',
        intro:
          'USD建ての免税価格で人気の韓国・デパコススキンケアを毎週集計。出国後の空港受け取りで受託手荷物の重量も節約できます。',
        paragraphs: [
          'ロッテ免税店では、雪花秀（ソルファス）やエストラ（AESTURA）、エスティローダーなどの大容量セットや2本組クリームが特に高い人気を集めています。出国審査後の空港カウンターで商品を受け取る仕組みのため、100mlを超える液体ボトルや重いガラス容器も機内持ち込み制限を気にせず購入できます。',
          '当ページのTop 20は毎週更新される人気ランキングを日本語で分かりやすく整理したものです。人気セットは週末前に在庫が動くことがあるため、帰国便の3〜5日前を目安にオンラインで予約確保し、下記の免税店・パッキングガイドもあわせてご活用ください。',
        ],
        relatedGuidesHeading: '関連する免税店ショッピングガイド',
      },
      'zh-CN': {
        heading: '乐天免税店选购攻略与榜单说明',
        homeSummary:
          '精选本周乐天免税店热门榜前 8 款美元免税组合与高人气精华。',
        intro:
          '每周追踪乐天免税店美元热销榜 Top 20，出境安检后机场直接提货，轻松带回大瓶精华与双支礼盒。',
        paragraphs: [
          '乐天免税店聚集了雪花秀、AESTURA、雅诗兰黛等高单价修护面霜与双瓶装礼盒。由于采用市区或线上预订、离境安检后于仁川或金浦机场柜台提货的模式，单瓶超过 100ml 的化妆水与玻璃瓶精华完全不占用托运行李重量，也不用担心运输挤压漏液，特别适合一次采购多组正装。',
          '本页面整理的每周 Top 20 榜单便于您在出发前快速锁定热门断货款。建议提前 3~5 天在免税店比价并绑定回程航班号锁单，下单前亦可叠加会员折扣与支付满减券，同时参考下方免税退税与机场液体携带指南，提前预留机场提货排队时间，让整趟赴韩采购更省时省预算、从容又安心，轻松带回高性价比专柜正装与限定礼盒。',
        ],
        relatedGuidesHeading: '相关免税店购物指南',
      },
      'zh-TW': {
        heading: '樂天免稅店聰明採購指南與榜單說明',
        homeSummary:
          '搶先看樂天免稅店本週前 8 名美元計價護膚禮盒與機場取貨人氣款。',
        intro:
          '每週追蹤樂天免稅店美元計價熱銷 Top 20，出境後於機場櫃檯取貨，大瓶精華與雙入禮盒完全不佔託運重量。',
        paragraphs: [
          '樂天免稅店以雪花秀、AESTURA、雅詩蘭黛等高人氣雙瓶組與修護乳霜禮盒聞名。透過線上下單、出境安檢後於仁川或金浦機場提貨，超過 100ml 的液體保養品與玻璃瓶裝都不必放進託運行李，大幅降低超重與破損風險，特別適合一次添購多組專櫃保養禮盒的旅客。',
          '本站每週彙整 Top 20 熱賣清單，協助您在出發前掌握即時價格與流行品項。建議於回程前 3 至 5 天綁定航班預訂熱門套組，搭配會員優惠與行動支付折扣更划算，並請預留機場提貨櫃檯排隊時間，一併參考下方免稅退稅與登機液體規範指南規劃購物行程，省時又不易買錯，回國送禮自用都體面。',
        ],
        relatedGuidesHeading: '相關免稅店購物指南',
      },
    },
  },
  missha: {
    relatedGuideSlugs: [
      'missha-bestsellers-bb-cream-vs-artemisia',
      'seoul-beauty-districts-myeongdong-hongdae-seongsu',
      'how-to-read-korean-cosmetic-labels',
    ],
    copy: {
      en: {
        heading: 'MISSHA Road-Shop Strategy & Shade Testing Tips',
        homeSummary:
          'Snapshot of the top 8 KRW road-shop classics you can swatch across Seoul.',
        intro:
          'Weekly best sellers from MISSHA Korea—covering iconic BB creams, Time Revolution fermented essences, and calming Artemisia skincare.',
        paragraphs: [
          'Unlike airport duty-free counters, official MISSHA flagships in Myeongdong, Hongdae, and Seongsu allow you to swatch BB cream undertones (#21 vs. #23) in natural light and test fermented essence textures before buying. Many road-shop promotions also feature 1+1 deals and complimentary sample sachets.',
          'Present your physical passport at checkout on purchases of 15,000 KRW or more to receive instant tax-free deduction on the spot. Use this Top 20 ranking to shortlist core classics, then check our linked guides for district comparisons and Korean label reading tips.',
        ],
        relatedGuidesHeading: 'Related MISSHA & Seoul Shopping Guides',
      },
      ja: {
        heading: 'MISSHA路面店での賢い選び方＆テスター活用法',
        homeSummary:
          '明洞や弘大の店頭でテスター確認できるミシャ上位8商品のハイライト。',
        intro:
          'ミシャ韓国公式の週間ベストセラーTop 20。名品BBクリームや発酵エッセンス、ヨモギ鎮静ラインの最新人気動向をまとめました。',
        paragraphs: [
          '明洞や弘大、聖水エリアのミシャ直営路面店では、BBクリームの色味（21号・23号など）や発酵エッセンスのテクスチャーを実際に手元で試してから選べるのが大きな魅力です。店舗独自の1+1セールや季節ごとのサンプル特典も充実しています。',
          '会計時にパスポート原本を提示すれば、15,000ウォン以上の購入でその場から消費税が差し引かれる即時還付にも対応しています。こちらのTop 20で定番と新作を事前にチェックし、下の関連記事でソウル買い物エリア比較や韓国語ラベルの見方も確認してみてください。',
        ],
        relatedGuidesHeading: '関連するMISSHA・ソウル買い物ガイド',
      },
      'zh-CN': {
        heading: 'MISSHA 谜尚专卖店选购技巧与试色建议',
        homeSummary:
          '快速浏览首尔专卖店人气前 8 名韩元热卖单品，包含明星底妆与护肤精华。',
        intro:
          '同步谜尚韩国官方每周热销 Top 20，涵盖红 BB 霜、神仙水发酵精华与江华岛艾草舒缓系列。',
        paragraphs: [
          '相比机场免税柜台，明洞、弘大与圣水洞的谜尚官方路面店支持现场试色与肤感体验，购买红 BB 霜时可以直观对比 21 号与 23 号色调差异，避免盲买色差。此外专卖店常推出 1+1 促销装与满额小样礼包，店内美容顾问也能协助推荐适合干性或油性肌肤的修护系列，非常适合挑选底妆或伴手礼。',
          '在支持即时退税的门店单笔消费满 15,000 韩元并出示护照原件，结账即可直接扣减税款，无需再到机场排队办理。建议先通过本页 Top 20 榜单圈定热门单品，再结合下方首尔商圈对比与韩文标签识别指南高效采购，轻松选对适合肤质的经典款、防晒乳与最新季节限定系列。',
        ],
        relatedGuidesHeading: '相关 MISSHA 与首尔购物指南',
      },
      'zh-TW': {
        heading: 'MISSHA 門市選購攻略與現場試色建議',
        homeSummary:
          '精選韓國專賣店本週熱賣前 8 名韓元單品，門市即可實地試色比對。',
        intro:
          '同步韓國 MISSHA 官方每週熱銷 Top 20，網羅經典紅 BB 霜、神仙水發酵精華與艾草舒緩系列。',
        paragraphs: [
          '造訪明洞、弘大與聖水洞的 MISSHA 品牌專賣店，不僅能現場試擦 BB 霜 21 號與 23 號自然色調，還能親自感受發酵精華水與安瓶質地，現場人員也能協助依乾肌或混合肌推薦合適品項，門市亦經常推出 1+1 促銷組合與旅行小樣贈禮，送禮自用都非常體面。',
          '於貼有退稅標誌的門市單筆消費滿 15,000 韓元並出示護照正本，結帳時即可享有即時退稅折抵，省去機場排隊手續。先參考本頁 Top 20 榜單鎖定必買清單，再搭配下方首爾逛街區域與韓文標示閱讀指南，採買更精準、不輕易踩雷，也能買到最新鮮的出廠批次與季節限定款。',
        ],
        relatedGuidesHeading: '相關 MISSHA 與首爾購物指南',
      },
    },
  },
  daisomall: {
    relatedGuideSlugs: [
      'daiso-korea-beauty-under-5-dollars',
      'daiso-cleansing-tools-and-rice-cleansers',
      'kbeauty-souvenir-bundle-under-100000-krw',
    ],
    copy: {
      en: {
        heading: 'DAISO Korea Beauty Zone: What Makes It Unique',
        homeSummary:
          'Browse the top 8 viral under-5,000 KRW beauty tools and mini skincare favorites.',
        intro:
          'Weekly top 20 skincare, cleansing tools, and brand collaborations priced cleanly between 1,000 and 5,000 KRW at DAISO Korea.',
        paragraphs: [
          'DAISO Korea’s beauty floor features exclusive mini-size collaborations from major Korean skincare labs—including PDRN toners, Cica spot patches, rice pack foam cleansers, and hygienic cleansing tools. Fixed 1,000–5,000 KRW pricing makes it effortless to test trending ingredients or assemble lightweight coworker souvenirs.',
          'Because smaller neighborhood branches carry limited beauty stock, prioritize flagship stores such as the 12-story Myeongdong Station branch or Hongdae Entrance before afternoon sell-outs. Explore the Top 20 below alongside our dedicated DAISO guides for basket examples and usage tips.',
        ],
        relatedGuidesHeading: 'Related DAISO Korea Beauty Guides',
      },
      ja: {
        heading: '韓国ダイソー美容コーナーの魅力と賢い買い方',
        homeSummary:
          'お土産に人気な1,000〜5,000ウォン台の注目アイテム上位8選をチェック。',
        intro:
          '1,000〜5,000ウォンの均一価格帯で揃う韓国ダイソーの週間人気ビューティーTop 20。最新コラボや洗顔ツールのトレンドをチェックできます。',
        paragraphs: [
          '韓国ダイソーのビューティーコーナーは、人気ブランドと共同開発したミニ美容液やPDRNトナー、CICAスポットパッチ、涙型クレンジングスポンジなどが1,000〜5,000ウォンで購入できる話題のスポットです。少量サイズ中心のため旅行中の使い切りケアやバラマキ土産に最適です。',
          '小型店舗では品揃えが限られるため、明洞駅前の12階建て大型店や弘大入口駅店などの大型旗艦店を午前中に訪れるのがおすすめです。下のTop 20ランキングとあわせて、関連ガイドで3万ウォン予算のバスケット例や洗顔ツールの使い方もご覧ください。',
        ],
        relatedGuidesHeading: '関連する韓国ダイソーガイド',
      },
      'zh-CN': {
        heading: '韩国大创美妆区选品攻略与探店建议',
        homeSummary:
          '先睹为快韩国大创 5,000 韩元以内超高回购率前 8 款平价必买清单。',
        intro:
          '汇集 1,000~5,000 韩元明码标价的韩国大创每周热销美妆 Top 20，涵盖联名小安瓶、洁面刷与便携护肤好物。',
        paragraphs: [
          '韩国大创美妆区凭借与多家知名韩妆品牌联合推出的 15~30ml 迷你精华、水胶体痘痘贴、大米面膜洁面乳以及水滴洗脸海绵迅速走红。亲民的均一价格和轻巧包装，既适合作为低门槛试错体验装，也非常适合批量采购当伴手礼，出门旅行携带也完全不占行李箱空间。',
          '由于社区小店货源有限，建议优先前往明洞站 12 层旗舰店或弘大入口站大型门店，并在上午刚开门时进店挑选以避开热门款售罄时段。您可以结合下方 Top 20 榜单与相关攻略文章，轻松搭配出高性价比的大创购物篮，还能顺便购入独立分装袋方便整理与赠送亲友，用小预算收获满满战利品。',
        ],
        relatedGuidesHeading: '相关韩国大创美妆指南',
      },
      'zh-TW': {
        heading: '韓國大創美妝專區攻略與掃貨建議',
        homeSummary:
          '精選韓國大創 5,000 韓元以內本週話題度最高的前 8 款美妝伴手禮。',
        intro:
          '網羅 1,000～5,000 韓元均一價的韓國大創每週熱銷 Top 20，包含品牌聯名小安瓶、洗臉刷與旅用清潔小物。',
        paragraphs: [
          '韓國大創美妝區以與各大韓系品牌合作開發的迷你修護精華、隱形痘痘貼、米萃潔顏乳及水滴洗臉海綿備受旅客喜愛。銅板價與輕巧規格不但方便攜帶登機，也非常適合作為辦公室與親友伴手禮，輕鬆分裝不佔空間，初次嘗試韓系保養品也不必擔心荷包負擔。',
          '建議直接鎖定明洞站 12 層旗艦店或弘大入口站大型門市，於上午營業時段前往最容易買齊熱門缺貨款，部分大型門市亦支援滿額退稅服務。搭配下方相關指南中的 3 萬韓元採購清單與清潔工具教學，逛街採買更有效率，買完也能快速比對成分與用法，新手也能一次買對、輕鬆打包高 CP 值首爾美妝好物。',
        ],
        relatedGuidesHeading: '相關韓國大創美妝指南',
      },
    },
  },
};

export interface HomeEditorialCopy {
  heading: string;
  paragraphs: string[];
}

const HOME_EDITORIALS: Record<PublicLocale, HomeEditorialCopy> = {
  en: {
    heading: 'How PickKR Curates Weekly Korean Beauty Rankings & Travel Guides',
    paragraphs: [
      'PickKR compiles weekly Top 20 bestseller snapshots across three distinct Korean shopping channels so international travelers can compare pricing structures before landing in Seoul. Rather than mixing incompatible retail formats into a single list, we separate USD duty-free sets, street-level brand flagships, and flat-priced DAISO finds.',
      'Lotte Duty Free serves travelers seeking high-ticket Sulwhasoo, AESTURA, and Estée Lauder duo packs with airport airside pickup after security, keeping heavy glass bottles and liquids over 100ml out of checked luggage. MISSHA street stores highlight shade-testable cushions, BB creams, and 1+1 promotions eligible for instant passport tax refunds over 15,000 KRW, while DAISO Korea covers 1,000–5,000 KRW mini ampoules and cleansing tools.',
      'Before heading to Myeongdong, Hongdae, or Incheon Airport, combine our weekly ranking snapshots with the editorial shopping guides above—where you will find ingredient breakdowns, Korean label expiration decoders, and budget packing strategies.',
    ],
  },
  ja: {
    heading: 'PickKRの週間韓国コスメ集計基準と3大チャネル活用ガイド',
    paragraphs: [
      'PickKRでは、韓国旅行者が目的に応じて賢く買い分けられるよう、ロッテ免税店・MISSHA直営店・ダイソー韓国という性格の異なる3つの販売チャネルから毎週Top 20ランキングを集計・編集しています。',
      '100mlを超える液体スキンケアや高額な2本組セットは、出国後の空港カウンターで受け取れるロッテ免税店（USD建て）が受託手荷物の重量節約に有利です。色味を試したいベースメイクや1+1セール品は15,000ウォン以上で即時免税が使えるMISSHA路面店、1,000〜5,000ウォンの個包装コスメや洗顔グッズはダイソー大型店と使い分けるのが効率的です。',
      'ランキング一覧だけでなく、上の特集ガイドでは韓国語ラベルの使用期限表記や主要成分の見分け方、空港液体ルールも詳しく解説しています。渡航前のリスト作成と現地での買い物比較にぜひお役立てください。',
    ],
  },
  'zh-CN': {
    heading: 'PickKR 每周韩妆榜单整理逻辑与三大购物渠道指南',
    paragraphs: [
      'PickKR 按周追踪乐天免税店、MISSHA 谜尚专卖店与韩国大创（DAISO）三大代表性零售渠道的 Top 20 热销单品，帮助赴韩游客区分不同渠道的价格体系与适用场景。',
      '单瓶超过 100ml 的高机能精华与双瓶礼盒建议优先选择乐天免税店美元定价，出境安检后在机场柜台直接提货不占托运重量；需要现场试色的 BB 霜及 1+1 促销款适合前往明洞、弘大品牌路面店，满 15,000 韩元即可凭护照即时退税；而 1,000~5,000 韩元的便携小安瓶与洁面工具则可集中在大创旗舰店一次补齐。',
      '将每周榜单与上方深度攻略结合参考，您可以在行前快速看懂韩文成分标签、机场液体规定与预算分配策略，避免在首尔街头盲目逛街或重复购买。',
    ],
  },
  'zh-TW': {
    heading: 'PickKR 每週韓妝榜單整理原則與三大通路採購攻略',
    paragraphs: [
      'PickKR 每週同步追蹤樂天免稅店、MISSHA 謎尚門市與韓國大創（DAISO）三大韓國美妝通路的 Top 20 熱銷排行，協助訪韓旅客在出發前精準比較不同通路的定價與退稅優勢。',
      '超過 100ml 的專櫃化妝水與雙入禮盒適合透過樂天免稅店以美元預訂，出境安檢後於機場櫃檯取貨完全不佔託運行李額度；想現場試擦色號的底妝與 1+1 活動款可至明洞或弘大直營門市，單筆滿 15,000 韓元出示護照即可享有即時退稅；1,000～5,000 韓元的平價聯名安瓶與清潔小物則建議安排大創旗艦店掃貨。',
      '搭配上方編輯精選指南中的韓文標籤閱讀教學、機場液體規範與首爾商圈對比，讓您在行前就能輕鬆規劃高效率又不易踩雷的韓國採買清單。',
    ],
  },
};

const GUIDES_INDEX_EDITORIAL: Record<PublicLocale, string> = {
  en: 'Our 18 in-depth shopping guides are organized around real Seoul travel itineraries—comparing USD duty-free skincare duo sets, instant tax-refund thresholds at brand flagships like MISSHA, under-5,000 KRW DAISO Korea mini finds, Korean cosmetic label decoders, and seasonal barrier ingredients.',
  ja: '全18本のショッピングガイドでは、ロッテ免税店のUSD建て2本組セット比較、MISSHA路面店のパスポート即時免税ルール、ダイソー韓国の5,000ウォン以下プチプラ名品、韓国語パッケージの使用期限表記や主要成分の読み方まで、訪韓旅行の動線に沿って詳しく解説しています。',
  'zh-CN': '本专栏收录 18 篇针对赴韩自由行整理的深度购物攻略，系统对比乐天免税店美元双支装、品牌路面店满额即时退税与韩国大创平价好物，同时详解韩文化妆品生产与到期标识、热门护肤成分差异以及机场随身液体打包规范。',
  'zh-TW': '本專欄收錄 18 篇專為訪韓自由行旅客編寫的深度採購指南，完整對比樂天免稅店美元雙入禮盒、MISSHA 路面店護照即時退稅門檻與韓國大創均一價好物，並解析韓文效期標示辨識、修護成分差異與機場隨身液體規範。',
};

export function getChannelEditorial(channel: ChannelId): ChannelEditorial {
  return CHANNEL_EDITORIALS[channel];
}

export function getHomeEditorial(locale: PublicLocale): HomeEditorialCopy {
  return HOME_EDITORIALS[locale] ?? HOME_EDITORIALS.en;
}

export function getGuidesIndexEditorial(locale: PublicLocale): string {
  return GUIDES_INDEX_EDITORIAL[locale] ?? GUIDES_INDEX_EDITORIAL.en;
}
