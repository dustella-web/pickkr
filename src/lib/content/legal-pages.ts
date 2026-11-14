import type { PublicLocale } from '@/lib/i18n/messages';

export const LEGAL_SLUGS = [
  'about',
  'contact',
  'privacy',
  'terms',
  'disclaimer',
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  sectionHeadings: string[];
  paragraphs: string[];
}

interface RawLegalPageContent {
  title: string;
  paragraphs: string[];
}

export const LEGAL_LAST_UPDATED = '2026-11-01';

export const LEGAL_LABELS: Record<PublicLocale, Record<LegalSlug, string>> = {
  en: {
    about: 'About Us',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    disclaimer: 'Disclaimer',
  },
  ja: {
    about: 'サイトについて',
    contact: 'お問い合わせ',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    disclaimer: '免責事項',
  },
  'zh-CN': {
    about: '关于我们',
    contact: '联系我们',
    privacy: '隐私政策',
    terms: '服务条款',
    disclaimer: '免责声明',
  },
  'zh-TW': {
    about: '關於我們',
    contact: '聯絡我們',
    privacy: '隱私權政策',
    terms: '服務條款',
    disclaimer: '免責聲明',
  },
};

const CONTENT: Record<LegalSlug, Record<PublicLocale, RawLegalPageContent>> = {
  about: {
    en: {
      title: 'About PickKR',
      paragraphs: [
        'PickKR is an independent curation and shopping guide for international travelers and global K-Beauty enthusiasts planning a trip to Korea.',
        'Every week, our editorial team tracks top-20 best-selling skincare, makeup, and travel-size essentials across major Korean retail channels—including Lotte Duty Free, MISSHA official stores, and DAISO Korea—and verifies product naming, pricing units, and format trends before publishing.',
        'Rather than copying raw storefront feeds, PickKR pairs localized product rankings with practical editorial travel guides covering airport duty-free pickup logistics, instant road-shop tax refunds, Korean cosmetic label reading, and seasonal ingredient breakdowns in English, Japanese, Simplified Chinese, and Traditional Chinese.',
        'Our editorial selection process remains independent from brand sponsorships. Prices and ranking positions reflect periodic snapshots collected for reference so visitors can plan smarter itineraries, compare USD duty-free sets against KRW street pricing, and shop confidently in Seoul.',
      ],
    },
    ja: {
      title: 'PickKRについて',
      paragraphs: [
        'PickKRは、韓国旅行者および海外の韓国コスメファン向けの独立したキュレーション＆ショッピングガイドです。',
        '毎週、ロッテ免税店・ミシャ（MISSHA）・ダイソー韓国など主要チャネルの人気コスメTop 20を調査・確認し、英語・日本語・簡体字・繁体字の4言語で分かりやすく整理しています。',
        '単なる商品リンク集にとどまらず、空港免税品の受け取り動線、パスポート提示による路面店の即時免税ルール、韓国語パッケージの日付・成分表記の読み方、エリア別ショッピング比較まで編集記事として体系的に提供します。',
        'PickKRのランキング解説やガイド記事は特定のメーカーから広告費や掲載料を受け取って順位を操作するものではありません。旅行前の買い物リスト作成や現地での価格比較にお役立ていただけるよう、正確で実用的な情報更新を心がけています。',
      ],
    },
    'zh-CN': {
      title: '关于 PickKR',
      paragraphs: [
        'PickKR 是一个面向赴韩游客和全球美妆爱好者的独立精选与购物指南平台。',
        '我们每周追踪乐天免税店、谜尚（MISSHA）与韩国大创（DAISO）等主要韩国零售渠道的热销 Top 20 榜单，并核对多语言品名、币种价格与热门套装变化。',
        '除了榜单索引之外，PickKR 编辑团队还持续编写涵盖仁川机场免税提货动线、明洞及弘大路面店即时退税、韩文化妆品标签识别与成分解析的深度攻略，支持英文、日文、简体中文与繁体中文阅读。',
        '我们的内容坚持独立整理原则，不接受品牌付费干预排名顺位。所有榜单快照与消费建议旨在帮助旅客行前合理分配预算，区分免税双支装与平价便携好物的选购场景，明确机场随身液体限制与退税金额门槛，让赴韩美妆采购更加从容准确。',
      ],
    },
    'zh-TW': {
      title: '關於 PickKR',
      paragraphs: [
        'PickKR 是專為訪韓旅客與全球美妝愛好者打造的獨立精選與購物指南平台。',
        '我們每週追蹤樂天免稅店、MISSHA 謎尚與韓國大創（DAISO）等韓國主要通路的熱銷 Top 20 榜單，並校對多語系品名、幣別價格與季節熱門趨勢。',
        '除了每週排行榜，PickKR 編輯團隊亦定期製作機場免稅取貨動線、街邊門市即時退稅門檻、韓文美妝標籤辨識以及首爾逛街區域比較等實戰指南，支援英文、日文、簡體中文與繁體中文瀏覽。',
        '本站選品說明與專欄內容維持編輯獨立性，不受品牌贊助影響排名次序。所有榜單快照與採購建議皆為旅客提供行前參考，協助您比較美元免稅優惠與韓元門市價差，同時避開登機液體容量限制與熱門缺貨時段，輕鬆規劃高效率的韓國購物清單。',
      ],
    },
  },
  contact: {
    en: {
      title: 'Contact Us',
      paragraphs: [
        'Get in touch with the PickKR editorial team regarding product ranking corrections, translation feedback, guide updates, or copyright notices.',
        'Primary Editorial Email: codenum404@gmail.com. When reporting a broken store link, outdated price snapshot, or localized product naming issue, please include the channel name, product title, and locale URL so our editors can verify and resolve it quickly.',
        'For privacy, data access, or advertising compliance inquiries—including questions about cookies, consent preferences, or Google AdSense disclosures—please write to the same email address with "Privacy Inquiry" or "Compliance" in the subject line.',
        'We review incoming messages regularly and aim to respond to all legitimate editorial, partnership, and legal inquiries within 2 to 3 business days.',
      ],
    },
    ja: {
      title: 'お問い合わせ',
      paragraphs: [
        '掲載ランキングの修正依頼、翻訳表現のご指摘、提携・広告に関するご相談、著作権に関するお問い合わせは PickKR 編集部までご連絡ください。',
        'お問い合わせ窓口メール: codenum404@gmail.com。商品リンク切れや価格表記・翻訳の誤りをご報告いただく際は、該当ページのURL・チャネル名・商品名を添えていただけますと迅速に確認・修正できます。',
        'プライバシーポリシーやCookie利用、第三者広告配信（Google AdSense 等）に関するご質問・削除要請につきましても、件名に「プライバシーに関するお問い合わせ」とご記載のうえ同メールアドレスへお送りください。',
        'いただいたご連絡は編集担当者が順次確認し、通常2〜3営業日以内（韓国・日本の祝日を除く）にメールにてご返信いたします。',
      ],
    },
    'zh-CN': {
      title: '联系我们',
      paragraphs: [
        '如需内容勘误、多语言翻译反馈、商务合作咨询或版权声明联系，欢迎通过电子邮件与 PickKR 编辑团队沟通。',
        '官方联系邮箱：codenum404@gmail.com。如您在浏览榜单时发现官方链接失效、价格快照过时或产品名称翻译偏差，请在邮件中附上页面链接、渠道名称及对应商品序号，便于我们快速核实更新。',
        '若您有关于隐私政策、Cookie 偏好设置、第三方数据分析或 Google AdSense 广告合规方面的疑问与权利申请，请在邮件标题注明“隐私与合规咨询”，我们将优先受理处理。',
        '我们会在收到邮件后的 2 至 3 个工作日内安排编辑或站务人员回复您的合理咨询（不包含周末及韩国法定节假日），感谢您帮助我们持续提升指南内容准确度与实用价值。',
      ],
    },
    'zh-TW': {
      title: '聯絡我們',
      paragraphs: [
        '如有排行榜內容勘誤、多語系翻譯建議、商務合作洽詢或版權相關問題，歡迎透過電子郵件與 PickKR 編輯團隊聯繫。',
        '官方聯絡信箱：codenum404@gmail.com。若您發現商品連結異常、價格快照資訊過期或譯名有誤，請於來信時附上頁面網址、通路名稱與商品項目，以協助我們快速核對與更新。',
        '關於隱私權保護、Cookie 使用條款、網站分析工具或 Google AdSense 廣告合規等疑問或權利行使請求，請於信件主旨註明「隱私權諮詢」寄送至上述信箱。',
        '編輯團隊將於收到來信後的 2 至 3 個工作日內檢視並回覆您的訊息（不含週末與國定假日），若涉及版權移除請求亦請一併提供權利證明與對應連結，感謝您共同維護本站資訊的準確性。',
      ],
    },
  },
  privacy: {
    en: {
      title: 'Privacy Policy',
      paragraphs: [
        'PickKR respects visitor privacy: this website does not require account registration, store payment details, or collect personally identifiable information directly.',
        'Like most informational publications, standard web server logs and analytics tools may record non-identifying technical metadata such as browser type, preferred language path, referring URL, and approximate session timing to maintain site stability and improve guide coverage.',
        'Third-party advertising and measurement partners—including Google AdSense and Google Analytics—may place and read cookies or web beacons on your browser to serve ads based on prior visits to PickKR and other websites. Users may opt out of personalized advertising through Google Ads Settings (https://adssettings.google.com) or industry opt-out portals such as aboutads.info.',
        'Visitors located in the European Economic Area (EEA), the United Kingdom, or California retain applicable rights to manage cookie consent, limit third-party tracking via browser settings, or contact us at codenum404@gmail.com with any privacy questions.',
      ],
    },
    ja: {
      title: 'プライバシーポリシー',
      paragraphs: [
        'PickKR は利用者のプライバシーを尊重し、会員登録機能を持たず、氏名・住所・決済情報などの個人識別情報をサイト上で直接収集いたしません。',
        'サイト品質の維持と記事改善のため、アクセス時のブラウザ種別、閲覧言語パス、参照元URL、端末画面サイズ等の匿名統計情報が一時的なサーバーログまたは解析ツールに記録される場合があります。',
        '当サイトではアクセス解析および広告配信のために Google Analytics および Google AdSense などの第三者配信事業者を利用する場合があります。Google を含む第三者配信事業者は Cookie を使用して過去のアクセス情報に基づく広告を配信することがあり、利用者は Google 広告設定（https://adssettings.google.com）からパーソナライズ広告を無効にできます。',
        'また、ブラウザの設定により Cookie の受け入れを拒否または削除することが可能です。個人データの取り扱いや広告Cookieに関するお問い合わせは codenum404@gmail.com までご連絡ください。',
      ],
    },
    'zh-CN': {
      title: '隐私政策',
      paragraphs: [
        'PickKR 重视并保护您的隐私：本网站无需注册账号，不设置会员登录体系，也不会主动向访客收集姓名、住址或支付卡号等个人身份信息。',
        '为了保障网站运行安全并统计各语言指南的阅读需求，服务器日志与站点分析工具可能会记录浏览器类型、访问语言路径、来源页面及设备分辨率等非个人识别技术数据。',
        '本网站使用 Google Analytics 与 Google AdSense 等第三方服务进行流量评估与广告展示。包括 Google 在内的第三方供应商可能通过 Cookie 根据用户过往访问本站或其他网站的记录投放相关广告；您可访问 Google 广告设置 (https://adssettings.google.com) 或 aboutads.info 停用个性化广告。',
        '无论您位于欧洲经济区（EEA）、英国还是其他地区，您均可通过浏览器隐私设置随时管理或清除 Cookie；如对本站隐私实践有任何疑问，请发邮件至 codenum404@gmail.com 与我们联系。',
      ],
    },
    'zh-TW': {
      title: '隱私權政策',
      paragraphs: [
        'PickKR 重視您的隱私權：本網站不提供會員註冊，亦不會向訪客直接蒐集姓名、電話、地址或任何金流付款等個人識別資訊。',
        '為維持網站正常運作並改善各語系內容品質，網站伺服器與流量統計工具可能會自動記錄瀏覽器類型、語系路徑、參照來源與裝置尺寸等去識別化技術資訊。',
        '本網站可能使用 Google Analytics 與 Google AdSense 等第三方服務進行流量分析與廣告放送。包括 Google 在內的第三方廠商可能會使用 Cookie，依據使用者先前造訪本站或其他網站的紀錄顯示相關廣告；您可前往 Google 廣告設定 (https://adssettings.google.com) 關閉個人化廣告。',
        '您亦可隨時透過瀏覽器設定封鎖或刪除 Cookie，或依所在地相關法規（如 GDPR／CCPA）來信 codenum404@gmail.com 詢問本站的資料處理說明。',
      ],
    },
  },
  terms: {
    en: {
      title: 'Terms of Service',
      paragraphs: [
        'By accessing and reading PickKR, you agree to use all product rankings, currency figures, and shopping guides solely for lawful, personal, non-commercial reference.',
        'Weekly ranking snapshots, reference prices, and promotional notes are gathered periodically from public retail listings and may differ from live inventory, exchange rates, or checkout totals on official merchant websites at the time of your purchase.',
        'All brand names, product trademarks, and original retailer photography belong to their respective owners and are displayed strictly for informational identification. PickKR retains copyright over its localized editorial commentary, guides, site design, and compiled ranking structure.',
        'You agree not to scrape, mirror, automate bulk extraction, or republish PickKR editorial guides without prior written consent. We reserve the right to update, revise, or discontinue pages and ranking snapshots without advance notice.',
      ],
    },
    ja: {
      title: '利用規約',
      paragraphs: [
        'PickKR を閲覧・利用される方は、掲載されているランキング情報・価格データ・ショッピングガイドを個人の非商用参考目的に限り利用することに同意したものとみなします。',
        '当サイトの週間ランキング順位、参考価格、割引表示は定期収集時点のスナップショットに基づいており、購入時点における公式オンラインストアのリアルタイム在庫・為替・決済金額とは異なる場合があります。',
        '掲載される各ブランド名・商標・商品画像の権利はそれぞれの正当な権利者に帰属し、当サイトでは情報識別の目的でのみ参照しています。一方、PickKR 独自の編集解説文・ガイド記事・サイト構成に関する著作権は当サイトに帰属します。',
        '当サイトの解説記事や編集コンテンツを無断でスクレイピング・自動収集・転載する行為は禁止します。また、当サイトは予告なくコンテンツの更新・修正・公開終了を行う場合があります。',
      ],
    },
    'zh-CN': {
      title: '服务条款',
      paragraphs: [
        '访问并浏览 PickKR 即表示您同意仅将本网站提供的榜单信息、参考价格与购物指南用于合法的个人非商业参考用途。',
        '站内公布的每周 Top 20 排名、美元/韩元参考价及折扣提示均基于定期采集的数据快照，实际购买时的商品库存、促销有效期与结算价格请以官方商城实时页面为准。',
        '页面中提及的所有美妆品牌名称、注册商标及商品原图版权均归原品牌方或官方零售商所有，仅作客观商品识别展示；PickKR 原创的编辑指南、多语言导购文案与页面编排设计受相应著作权保护。',
        '未经事先书面许可，严禁通过爬虫抓取、镜像复制或批量转采的方式重新分发 PickKR 的原创指南内容或结构化榜单数据。本站保留随时修订榜单展示、更新攻略文本、变更功能模块或调整服务条款的权利。',
      ],
    },
    'zh-TW': {
      title: '服務條款',
      paragraphs: [
        '造訪並閱讀 PickKR 即表示您同意僅將本站提供的排行榜名次、參考售價與購物指南用於合法的個人非商業參考用途。',
        '站內每週更新的 Top 20 榜單、幣別價格與優惠摘要均依據定期彙整的資料快照生成，實際採購時的庫存狀況、折扣門檻與匯率結帳金額請以各官方通路即時頁面為準。',
        '頁面所涉及的品牌名稱、商標與官方商品圖片版權皆歸屬原權利人所有，僅作資訊識別使用；由 PickKR 撰寫的原創購物攻略、編輯點評與網站版面架構則受著作權保護。',
        '未經本站書面同意，請勿以自動化爬蟲、鏡像複製或批量轉載方式散布本站編輯內容或結構化榜單資料。PickKR 保留隨時更新網站資訊、調整版面功能與修訂服務條款的權利，且不另行個別通知。',
      ],
    },
  },
  disclaimer: {
    en: {
      title: 'External Links & Disclaimer',
      paragraphs: [
        'PickKR is an independent editorial curation guide—not an e-commerce retailer—and does not process customer orders, payments, customs filings, or international shipping.',
        'Product cards and shopping guides include outbound links directing visitors to official third-party storefronts such as Lotte Duty Free, MISSHA, and DAISO Korea. Once you leave PickKR, all browsing, checkout terms, return windows, and privacy rules are governed solely by the destination website.',
        'Skincare ingredient summaries, skin-type notes, airport liquid limits, and tax-refund thresholds published on PickKR are compiled for general informational planning only and do not constitute dermatological, medical, customs, or legal advice. Always check official packaging labels and current airport rules before flying.',
        'Some outbound links or site placements may participate in affiliate or advertising programs in the future; however, editorial guide selection and weekly ranking positions are never sold or altered in exchange for compensation.',
      ],
    },
    ja: {
      title: '外部リンクおよび免責事項',
      paragraphs: [
        'PickKR は独立した情報キュレーションメディアであり、通信販売サイトではありません。当サイト上で商品の販売、決済、通関手続き、発送業務は一切行いません。',
        '商品カードのボタンやガイド内のリンクは、ロッテ免税店・MISSHA・ダイソー韓国などの外部公式ストアへ遷移します。外部サイトへ移動した後の購入手続き、価格変更、在庫切れ、返品条件、個人情報の取り扱いについて当サイトは一切の責任を負いません。',
        '当サイトに掲載しているスキンケア成分の解説、機内持ち込み液体ルール、免税還付の条件等は一般的な旅行計画の参考情報であり、医療・皮膚科的助言や法務・税関上の公的保証を行うものではありません。渡航前に必ず航空会社および公式パッケージをご確認ください。',
        '今後、当サイトの一部のリンクや広告枠にアフィリエイトまたは Google AdSense 等の広告配信が含まれる場合がありますが、週間ランキング順位や編集ガイドの評価が広告収益によって左右されることはありません。',
      ],
    },
    'zh-CN': {
      title: '外部链接与免责声明',
      paragraphs: [
        'PickKR 是一家独立的韩妆与赴韩购物资讯指南网站，并非电子商务零售平台，不直接参与任何商品销售、在线付款、报关或跨境物流配送。',
        '站内商品卡片中的“前往官方商城”按钮及指南外链均跳转至乐天免税店、谜尚、大创等第三方官方网站。离开 PickKR 后，相关订单交易安全、实时定价变动、退换货规则及售后服务均由目标网站自行负责。',
        '本网站介绍的护肤成分特性、肤质适配提示、机场液体随身携带标准及退税金额门槛仅供出行前一般信息参考，不构成医疗、皮肤科诊疗或海关法律意见；实际购买与登机前请务必核对产品包装说明与航空公司最新公告。',
        '本站部分出站链接或广告位未来可能包含合规推广或 Google AdSense 广告展示，但每周榜单排序与编辑评测立场绝不接受任何付费置换或商业干预。',
      ],
    },
    'zh-TW': {
      title: '外部連結與免責聲明',
      paragraphs: [
        'PickKR 為獨立運作的韓國購物與美妝資訊指南平台，並非電子商務零售網站，不提供任何商品販售、線上金流結帳、報關或物流配送服務。',
        '站內商品卡片與專欄文章中的外連按鈕皆導向樂天免稅店、MISSHA、大創等第三方官方通路。當您離開 PickKR 前往外部網站後，一切交易條件、價格異動、退換貨政策與售後服務均由該官方網站全權負責。',
        '本站整理的保養成分簡介、膚質適配提醒、機場隨身液體規範及退稅門檻資訊僅供行前規劃參考，並不構成醫療皮膚諮詢、海關或法律建議；實際購買與搭機前請務必確認商品標示與航空公司最新規定。',
        '本站部分頁面與外連按鈕未來可能配置合規推薦連結或 Google AdSense 廣告版位，惟每週榜單排序與編輯選品評論絕不接受任何商業付費干預。',
      ],
    },
  },
};

const SECTION_HEADINGS: Record<LegalSlug, Record<PublicLocale, string[]>> = {
  about: {
    en: [
      '1. Independent K-Beauty Curation for Travelers',
      '2. Weekly Multi-Channel Verification Process',
      '3. Localized Rankings Paired With Travel Guides',
      '4. Editorial Independence & Reference Pricing',
    ],
    ja: [
      '1. 旅行者向けの独立した韓国コスメガイド',
      '2. 毎週のチャネル横断調査と多言語検証',
      '3. ランキングと実践的な旅行攻略の統合',
      '4. 編集の独立性と参考価格の位置づけ',
    ],
    'zh-CN': [
      '1. 面向赴韩旅客的独立美妆精选平台',
      '2. 每周跨渠道榜单追踪与多语言核对',
      '3. 榜单索引与深度购物攻略结合',
      '4. 编辑独立原则与行前预算参考',
    ],
    'zh-TW': [
      '1. 專為訪韓旅客打造的獨立美妝指南',
      '2. 每週跨通路熱銷追蹤與多語系校對',
      '3. 排行快照結合首爾採購實戰攻略',
      '4. 編輯獨立性與幣別比價參考說明',
    ],
  },
  contact: {
    en: [
      '1. Editorial Corrections & Feedback',
      '2. How to Report Link or Translation Issues',
      '3. Privacy & Advertising Compliance Inquiries',
      '4. Response Timeline',
    ],
    ja: [
      '1. 編集内容の修正およびフィードバック窓口',
      '2. リンク切れ・翻訳誤りのご報告方法',
      '3. プライバシーおよび広告配信に関するお問い合わせ',
      '4. ご返信までの目安時間',
    ],
    'zh-CN': [
      '1. 内容勘误与编辑反馈渠道',
      '2. 链接失效或翻译偏差提交方式',
      '3. 隐私合规与广告政策咨询',
      '4. 邮件处理与回复时效',
    ],
    'zh-TW': [
      '1. 內容勘誤與多語系回饋管道',
      '2. 通路連結異常與譯名修正回報',
      '3. 隱私保護與廣告合規諮詢',
      '4. 回覆處理工作天說明',
    ],
  },
  privacy: {
    en: [
      '1. Zero Account & Personal Data Collection Policy',
      '2. Standard Server Logs & Aggregate Analytics',
      '3. Google AdSense, Cookies & Personalized Ad Opt-Out',
      '4. Regional Privacy Rights (EEA, UK & California)',
    ],
    ja: [
      '1. 個人識別情報の非収集方針',
      '2. サーバーログと匿名統計データの利用',
      '3. Google AdSense と Cookie 配信・オプトアウト',
      '4. ブラウザ設定による管理とお問い合わせ窓口',
    ],
    'zh-CN': [
      '1. 无账号体系与个人身份信息保护',
      '2. 服务器日志与匿名技术统计说明',
      '3. Google AdSense、Cookie 及个性化广告退订',
      '4. 用户隐私管理权利与联系方式',
    ],
    'zh-TW': [
      '1. 免註冊與個人識別資料保護原則',
      '2. 伺服器日誌與去識別化流量統計',
      '3. Google AdSense、Cookie 與個人化廣告管理',
      '4. 使用者瀏覽器控管與隱私洽詢窗口',
    ],
  },
  terms: {
    en: [
      '1. Permitted Personal & Non-Commercial Use',
      '2. Snapshot Pricing & Live Retailer Discrepancies',
      '3. Trademarks & Editorial Copyrights',
      '4. Restrictions on Automated Scraping & Changes',
    ],
    ja: [
      '1. 個人・非商用利用への同意',
      '2. 週間スナップショット価格と実売価格の差異',
      '3. 商標権および編集コンテンツの著作権',
      '4. 自動収集の禁止と規約・公開内容の変更',
    ],
    'zh-CN': [
      '1. 个人非商业用途授权范围',
      '2. 榜单快照与官方商城实时定价差异说明',
      '3. 第三方商标归属与原创攻略著作权',
      '4. 禁止自动化抓取及条款修订权',
    ],
    'zh-TW': [
      '1. 合法個人非商業參考使用規範',
      '2. 資料快照與官方即時售價差異說明',
      '3. 品牌商標權利與本站原創著作權',
      '4. 禁止爬蟲批量轉載與內容異動權',
    ],
  },
  disclaimer: {
    en: [
      '1. Non-Retailer Editorial Information Status',
      '2. Third-Party Storefront Links & Transactions',
      '3. Cosmetic, Medical & Travel Regulations Notice',
      '4. Advertising & Affiliate Disclosure',
    ],
    ja: [
      '1. 非通販メディアとしての位置づけ',
      '2. 外部公式ストアへの遷移と取引責任',
      '3. 成分解説・機内ルール・免税情報の参考性',
      '4. 広告・アフィリエイトと編集的中立性',
    ],
    'zh-CN': [
      '1. 非零售资讯指南定位声明',
      '2. 第三方官方商城跳转与交易责任',
      '3. 护肤成分、航空液体与退税规则免责',
      '4. 广告展示与榜单中立声明',
    ],
    'zh-TW': [
      '1. 非電商銷售之獨立資訊媒體定位',
      '2. 第三方官方通路連結與交易規範',
      '3. 保養成分、搭機液體與退稅資訊免責',
      '4. 廣告版位配置與編輯中立聲明',
    ],
  },
};

export function isLegalSlug(value: string): value is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(value);
}

export function getLegalPage(slug: LegalSlug, locale: PublicLocale): LegalPageContent {
  const entry = CONTENT[slug][locale] ?? CONTENT[slug].en;
  const headings = SECTION_HEADINGS[slug][locale] ?? SECTION_HEADINGS[slug].en;
  return {
    ...entry,
    lastUpdated: LEGAL_LAST_UPDATED,
    sectionHeadings: headings,
  };
}
