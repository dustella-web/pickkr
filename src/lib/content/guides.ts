import type { PublicLocale } from '@/lib/i18n/messages';
import { EXTRA_GUIDE_ARTICLES } from './guides-extra';

export interface GuideArticle {
  slug: string;
  publishedAt: string;
  category: string;
  readingMinutes: number;
  title: Record<PublicLocale, string>;
  summary: Record<PublicLocale, string>;
  sections: Record<
    PublicLocale,
    Array<{ heading: string; body: string }>
  >;
}

const BASE_GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: 'seoul-kbeauty-shopping-channels-compared',
    publishedAt: '2026-11-13',
    category: 'Shopping Guide',
    readingMinutes: 8,
    title: {
      en: 'Where to Buy K-Beauty in Korea: Duty-Free vs. DAISO vs. Brand Stores',
      ja: '韓国コスメはどこで買うべき？免税店・ダイソー・ブランド公式店の違いを徹底解説',
      'zh-CN': '韩国买美妆去哪里？免税店、大创与品牌专卖店攻略对比',
      'zh-TW': '韓國買美妝去哪裡？免稅店、大創與品牌專賣店攻略比較',
    },
    summary: {
      en: 'A practical comparison of Korea’s top beauty shopping channels for tourists—covering tax-free perks, budget picks, and flagship exclusives.',
      ja: '訪韓旅行者向けに、韓国の主要コスメ購入ルート（免税店・ダイソー・MISSHA等）の価格帯とメリットを比較します。',
      'zh-CN': '为赴韩游客对比韩国三大热门美妆购买渠道：免税店奢华护肤、大创平价好物与品牌专卖店限定款。',
      'zh-TW': '為訪韓旅客比較韓國三大熱門美妝購買通路：免稅店專櫃護膚、大創平價好物與品牌專賣店限定款。',
    },
    sections: {
      en: [
        {
          heading: '1. Duty-Free (Lotte Duty Free): Best for Premium Skincare Sets',
          body: 'If you are purchasing Sulwhasoo, AESTURA, or multi-pack serums, duty-free stores offer USD pricing, instant tax exemptions, and travel-exclusive duo sets that are often 20–40% cheaper than department stores. Even better, ordering online or at downtown counters lets you pick up your sealed bags after immigration at Incheon or Gimpo Airport, freeing up checked-luggage weight for clothing and snacks while keeping liquids out of your hotel suitcase.',
        },
        {
          heading: '2. DAISO Korea Beauty Zone: Best Under-$5 Souvenirs',
          body: 'DAISO Korea has transformed into a K-Beauty hotspot with collaborations from VT, MEDIPEEL, and TonyMoly. Expect sheet masks, spot patches, and trial-size ampoules priced cleanly between 1,000 and 5,000 KRW. Because there are no confusing percentage discounts to calculate, you can quickly fill a basket with travel-friendly pouches, cleansing puffs, and individually wrapped gifts for friends and coworkers back home.',
        },
        {
          heading: '3. Single-Brand Flagships (MISSHA): Best for Iconic Classics',
          body: 'Brand stores such as MISSHA in Myeongdong or Hongdae frequently run 1+1 promotions and seasonal bundle deals on classics like Time Revolution First Essence and M Perfect Cover BB Cream. Visiting an official road-shop also lets you test shade undertones on your wrist, ask staff for fresh batch dates, and claim instant tax refunds at checkout when you present your physical passport on purchases over 15,000 KRW.',
        },
        {
          heading: '4. Smart Channel Strategy for a 3-to-5 Day Seoul Trip',
          body: 'The most cost-effective itinerary splits your budget across all three channels instead of relying on just one store. Reserve high-ticket barrier creams and serum duos for Lotte Duty Free online pre-order, pick up shade-matched cushions or BB creams at MISSHA with instant tax refund, and finish with a late-evening DAISO stop for affordable tools, cotton pads, and travel-size skincare.',
        },
        {
          heading: '5. Quick Pre-Checkout Checklist Before You Pay',
          body: 'Before tapping your card at any counter, verify three details: whether your purchase qualifies for instant passport tax refund (15,000 KRW minimum at street shops), whether the date stamped on the bottle ends in 까지 (expiration) rather than 제조 (manufactured), and whether liquid containers over 100ml need checked-baggage space or can be shifted to airport duty-free pickup instead.',
        },
      ],
      ja: [
        {
          heading: '1. ロッテ免税店：デパコス・大容量セットがお得',
          body: 'ソルファスやエストラ、エスティローダーなどの人気スキンケアをまとめて買うなら免税店が最適です。USD建ての免税価格に加えてオンラインクーポンや会員ランク割引、決済カード別の即時割引が適用されるため、百貨店より20〜40%ほど安く購入できるケースが多くあります。さらに出国審査後の空港カウンターで受け取れるため、移動中に重いガラスボトルを持ち歩く必要がなく、受託手荷物の重量節約や液漏れ防止にもつながります。人気セットは週末前に在庫が動くため、渡韓3〜5日前にアプリで確保しておくのが賢明です。ギフト用の2本組やトラベル限定サイズは路面店での取り扱いがないことも多く、家族や友人への少し特別な贈り物を選ぶ場としても非常に重宝します。',
        },
        {
          heading: '2. ダイソー韓国：1,000〜5,000ウォンのトレンド美容アイテム',
          body: 'VT（リードルショット）やメディピール、トニーモリー、マモンドなど有名ブランドとのコラボ商品が豊富で、バラマキ用のお土産や旅行中の応急ケアに大人気です。価格帯は1,000〜5,000ウォンの均一プライスで明朗会計なため、複雑なセール条件を計算せずに気軽にカゴへ入れられます。個包装のパウチ型アンプルや涙型クレンジングパフ、ニキビパッチなど、機内持ち込み制限を気にせず試せる小容量アイテムが充実しており、明洞駅や弘大の大型店舗では専用フロアでゆっくり比較できます。季節ごとに新作コラボや限定パッケージが入れ替わるため、韓国コスメの最新トレンドを手軽にチェックしたい方にとっても見逃せないスポットです。',
        },
        {
          heading: '3. ブランド直営店（MISSHA）：定番名品と1+1セール',
          body: '明洞や弘大の路面店では、タイムレボリューション「ザ・ファーストエッセンス」やMパーフェクトカバーBBクリーム、ヨモギ鎮静ラインなど定番シリーズの1+1イベントやサンプル特典が充実しています。実際にテスターで色味や肌なじみを確認できるうえ、パスポート原本を提示すれば15,000ウォン以上の会計でその場から付加価値税が差し引かれる即時還付にも対応しているため、色選びに失敗したくないベースメイクやギフト選びに最適です。店舗スタッフに肌質や普段使っている色番号を伝えると、相性の良い試供品パウチや小分けバッグを添えてくれることも多く、対面ならではの満足感が味わえます。',
        },
        {
          heading: '4. 賢い買い分けスケジュールと予算配分のコツ',
          body: '3〜5日間のソウル旅行では、1店舗で済ませずに購入品ごとにチャネルを分けるのが最も効率的です。高単価の美容液や2本組クリームセットは旅行前半に免税店アプリで予約し、色合わせが必要なファンデーションやティントリップは路面店で試して購入、最終日の夜にダイソーでメイクツールやコットン、ミニコスメを補充すると無駄がありません。同じ製品でも免税店はセット価格、路面店は1+1やサンプル量、ダイソーは使い切りやすさに強みがあるため、用途別に予算を割り振るのが満足度を高めるコツです。あらかじめスマホのメモに購入リストを作っておくと重複買いも防げますし、帰国直前のパッキングも短時間で完了します。',
        },
        {
          heading: '5. 会計前に確認したい3つのチェックポイント',
          body: 'レジで決済する前に確認したいポイントが3つあります。まず路面店なら15,000ウォン以上でパスポート原本による即時免税が適用されるか確認しましょう。次にパッケージ底面やチューブ圧着部の日付表示が「까지（使用期限）」と「제조（製造日）」のどちらなのかを見分けることが大切です。最後に、100mlを超える化粧水やクレンジングは機内持ち込みができないため、スーツケースの受託手荷物に余裕を持って入れられるか、あるいは空港受け取りの免税店注文へ切り替えるべきかを事前に判断しておくと帰国時のトラブルを防げます。特にセール品は返品交換不可の場合が多いため、色番号と容量の最終確認も忘れずに行いましょう。また、免税店受け取りを利用する際は搭乗ゲートまでの移動時間も考慮し、余裕を持って空港に到着するのが安心です。',
        },
      ],
      'zh-CN': [
        {
          heading: '1. 乐天免税店：高端护肤套装首选',
          body: '购买雪花秀、AESTURA、雅诗兰黛等双瓶装或礼盒时，免税店美元定价叠加满减券、会员等级折扣以及支付平台立减活动，通常比百货专柜划算 20%~40%。更重要的是支持市区店或线上提前下单、仁川或金浦机场出境安检后提货，重瓶玻璃精华完全不占用托运行李额度，也不用担心托运途中挤压漏液。热门两支装经常在周末前断货，建议出发前 3~5 天先在手机端锁单，到机场直接凭护照与登机牌轻松领取。此外，免税店常有限定双支礼盒或专供大容量版本，包装体面且单毫升均价更低，非常适合买来送给长辈、伴侣或作为年度囤货。只要提前绑定航空航班号并留意提货截止时间，就能把线下逛街时间留给景点与美食，省时又省力，还能避免机场柜台临时缺货的遗憾。而且线上订单如果遇到行程微调，在规定截止时间前也支持修改航班号，灵活性很高。',
        },
        {
          heading: '2. 韩国大创（DAISO）：5美元以下高性价比好物',
          body: '韩国大创美妆区汇集 VT、MEDIPEEL、托尼魅力、梦妆副牌等联名平价单品，1000~5000 韩元即可入手热门微针精华、胶原蛋白冻膜、祛痘贴与硅胶洗脸刷。全店明码标价无需凑满减或计算复杂折扣，非常适合买来当作送给同事和朋友的伴手礼，或者在酒店临时补充旅行装洁面与湿敷棉片。明洞站 12 层大创与弘大旗舰店陈列最全，晚上逛街顺路补货最省时间。由于每季都会上新平价联名系列与季节限定彩妆工具，不少韩妆爱好者甚至会专门安排半天时间在大型大创慢慢淘货，用不到一顿咖啡的钱就能体验当前首尔街头最受年轻群体欢迎的新锐配方与实用小物，性价比与趣味性兼具。',
        },
        {
          heading: '3. 品牌专卖店（MISSHA）：经典爆款与买一送一',
          body: '明洞、弘大、圣水等商圈门店常有神仙水精华、红BB霜、艾草舒缓系列等经典单品的买一送一促销及丰厚小样赠送。线下专卖店最大的优势在于可以现场试色并确认肤感，尤其是选择 BB 霜 21 号或 23 号色调时能直接在手背对比自然光效果。结账时只要携带护照原件且单笔消费满 15,000 韩元，就能直接享受门店即时退税扣减，省去机场退税柜台排队与整理单据的麻烦。部分旗舰门店还提供中文或日文导购服务，能够根据你的肤质（干皮、油敏肌或混合肌）推荐最合适的套装组合，并在结账时贴心附上分装礼品袋与旅行小样，送礼体验比纯线上购买更好，也更容易拿到最新生产批次的正装产品。遇到周末会员日或换季特惠时，热门系列还常叠加满赠化妆棉或旅行装礼盒。',
        },
        {
          heading: '4. 赴韩3~5天行程的最优分流采购策略',
          body: '建议按产品单价与体积拆分购物渠道：高单价抗老精华和双瓶装礼盒优先在乐天免税店预订并走机场提货通道；需要试色的气垫、BB霜和口红去品牌专卖店挑选并办理现场退税；最后一天晚上逛大型大创补齐粉扑刷具、独立包装安瓶和平价面膜。把不同属性的商品分配到最擅长的渠道后，同样 20 万韩元预算往往能多带回三成以上的实用好物，同时避免行李箱超重罚款。如果行程中包含多个商圈，建议先在明洞或圣水试色确认色号，再用手机比对免税店实时折扣价，确认哪边优惠力度更大后再果断下单，做到精明消费不花冤枉钱，还能把返程行李重量控制得恰到好处。合理利用三类渠道的错峰优惠，整趟旅程的护肤采购体验会更从容高效。',
        },
        {
          heading: '5. 结账前必核对的三大实用细节清单',
          body: '付款前建议逐项核对三件事：第一，品牌专卖店单笔是否已满 15,000 韩元并出示护照原件办理即买即退，部分特价清仓区可能不参与满额赠礼但仍可退税；第二，瓶身或管尾印刷日期后缀是“까지（有效期至）”还是“제조（生产日期）”，避免把生产日期误当过期时间；第三，单瓶超过 100ml 的爽肤水、卸妆油与面霜无法随身登机，务必提前确认托运行李箱空间，或直接改用免税店出境后提货服务。此外，购买买一送一促销装或赠品套盒时，记得现场清点盒内正装与小样数量是否完整并保留小票，以便离开韩国前核对退税金额与海关申报限额，确保整趟购物旅程顺利无忧。若遇促销高峰排队较长，提前准备好护照与支付二维码也能大幅节省结账等待时间。',
        },
      ],
      'zh-TW': [
        {
          heading: '1. 樂天免稅店：專櫃護膚禮盒首選',
          body: '購買雪花秀、AESTURA、雅詩蘭黛等雙瓶組或大容量禮盒時，免稅店美元定價搭配會員折扣、積分與行動支付優惠券，常比百貨專櫃省下 20%～40%。此外支援市區門市或線上下單、出境安檢後於仁川或金浦機場櫃檯取貨，玻璃瓶裝保養品完全不佔用託運行李重量，也能避免長途飛行擠壓滲漏。熱門雙支組經常在週末前售罄，建議出發前幾天先線上預訂鎖定庫存。而且免稅店常有市區買不到的旅行限定雙入組或大ml數版本，外盒體面且換算每毫升單價更划算，無論是買來孝敬長輩、送給另一半或自己年度補貨都非常超值，只要事先綁定回程航班資訊就能輕鬆在登機前取貨，完全不必擔心行程最後一天行李超重或趕時間打包，還能避開機場現場排隊結帳的人潮。',
        },
        {
          heading: '2. 韓國大創（DAISO）：百元台幣以內必買好物',
          body: '韓國大創美妝區引進 VT、MEDIPEEL、TONYMOLY、Mamonde 副牌等聯名平價系列，1,000～5,000 韓元即可入手高人氣修護安瓶、矽膠潔顏刷、水滴粉撲與痘痘貼。全館均一價標示清楚，不必費心計算滿額門檻，非常適合大量採購當作辦公室伴手禮，或購買小容量鋁箔包在飯店即時補水舒緩。明洞站 12 層門市與弘大旗艦店品項最齊全，夜間逛街順道採買最有效率。由於每一季都會推出新的聯名保養系列與彩妝輔助工具，許多喜歡嚐鮮的旅客甚至會特地安排逛一趟大型大創，用銅板價就能搶先體驗韓國本地最流行的新成分與話題小物，就算買一整籃也不會心疼荷包，是自由行必排的尋寶行程。',
        },
        {
          heading: '3. 品牌專賣店（MISSHA）：經典熱銷與 1+1 優惠',
          body: '明洞與弘大門市經常推出經典神仙水、完美無瑕紅 BB 霜與艾草舒緩系列促銷活動，不僅能現場試擦色號與質地，還常依消費金額贈送旅行小樣。購買底妝時能當場比對 21 號與 23 號自然色調差異，大幅降低盲買踩雷風險。只要隨身攜帶護照正本且單筆消費滿 15,000 韓元，結帳時就能直接享有現場退稅折抵，省去機場排隊辦理退稅的時間。許多觀光熱區門市還備有親切的中文或英文店員，能依照你的膚況推薦合適的抗老或舒緩組合，結帳時主動索取分裝小紙袋也能讓伴手禮包裝看起來更有質感，同時還能現場確認最新的製造日期與密封狀態。逢週末會員日或換季檔期時，指定品項更有滿額加贈旅行組或化妝棉的驚喜禮遇，換算下來非常划算。',
        },
        {
          heading: '4. 聰明分流採購建議：省錢又不怕行李超重',
          body: '建議將購物清單依照單價與重量分成三路採買：高價精華、眼霜雙入組與專櫃禮盒先在免稅店下單並於機場提貨，徹底省下託運重量；需試色的氣墊、BB 霜與唇彩留在路面專賣店入手；粉撲、刷具、痘痘貼與單次包裝安瓶則交給韓國大創一次補齊。透過三通路互補採購，同樣預算能買到更多實用正貨與旅用小物，回程整理行李也更輕鬆從容。若行程跨越多個商圈，不妨先在專賣店試色記下色號，再打開免稅店頁面比價折扣後下單，就能把每一分旅遊購物預算都花在刀口上，輕鬆避開重複購買與衝動消費。善用各通路的獨家促銷與滿額折扣，更能讓採購效率大幅提升，即使只有週末三天快閃首爾也能從容買齊所有清單。',
        },
        {
          heading: '5. 結帳前務必確認的三項購物細節',
          body: '刷卡付款前請先確認三個細節：第一，路面專賣店單筆是否已達 15,000 韓元退稅門檻並出示護照正本折抵，部分特賣花車商品雖不參與滿額贈禮但依然可計算退稅；第二，包裝底部或軟管封口印製的日期標示為「까지（有效期限）」還是「제조（製造日期）」，以免誤判效期而白白丟棄；第三，單瓶超過 100ml 的化妝水、卸妝油與凝膠不可帶入隨身手提行李，務必預留託運行李箱空間，或改由免稅店出境後取貨更省力。結帳後也別忘了當場核對贈品小樣數量與收據明細，確保退稅與優惠都有正確套用，安心滿載而歸。建議出發前在手機建立購物清單備忘錄，現場比對才不容易遺漏親友託買的熱門品項，同時也方便掌控個人免稅額度與托運總重，讓整體採購更加從容有序、省心又省錢，回國後也能快速分送給每一位親友與同事，留下愉快的首爾血拼回憶。',
        },
      ],
    },
  },
  {
    slug: 'daiso-korea-beauty-under-5-dollars',
    publishedAt: '2026-11-12',
    category: 'Product Review',
    readingMinutes: 7,
    title: {
      en: 'DAISO Korea Beauty Must-Buys Under $5: Why Travelers Love Them',
      ja: '韓国ダイソーで買うべき500円以下のプチプラ美容アイテム特集',
      'zh-CN': '韩国大创 5000 韩元以下必买美妆清单：游客疯抢的原因',
      'zh-TW': '韓國大創 5,000 韓元以下必買美妝清單：旅客掃貨原因解析',
    },
    summary: {
      en: 'Why DAISO Korea’s 1,000–5,000 KRW skincare tools, cleansing sponges, and brand-collab ampoules dominate tourist shopping lists.',
      ja: '韓国ダイソーの1,000〜5,000ウォン化粧品・美容ツールが観光客に支持される理由と人気アイテムの選び方を紹介します。',
      'zh-CN': '解析韩国大创 1000~5000 韩元平价护肤工具与联名安瓶为何成为游客必逛清单。',
      'zh-TW': '解析韓國大創 1,000～5,000 韓元平價護膚工具與聯名安瓶為何成為旅客必逛首選。',
    },
    sections: {
      en: [
        {
          heading: '1. Small-Batch Packaging Made for Carry-On Travel',
          body: 'Unlike full-size bottles sold at department stores, DAISO carries compact 10ml–30ml pouches, stick balms, and single-use capsules that pass airport carry-on liquid limits effortlessly. Travelers can test trending active ingredients like Reedle Shot, niacinamide, or Madecassoside for just 3,000 KRW before committing to a full-size bottle later.',
        },
        {
          heading: '2. Top Categories to Look For in Every Branch',
          body: 'Start in the skincare tool aisle for teardrop cleansing sponges (1,000 KRW), dual-ended silicone mask spatulas, and ultra-thin hydrocolloid pimple patches. Next, check the end-cap displays for co-branded Cica, retinol, and collagen eye patches, which frequently sell out by late afternoon in busy tourist hubs like Myeongdong.',
        },
        {
          heading: '3. Which DAISO Branches Have the Best Stock',
          body: 'Not all DAISO stores carry the full beauty lineup. Multi-floor flagship branches such as the 12-story Myeongdong Station store, Hongdae Entrance Station branch, and Gangnam Station store dedicate entire floors to cosmetics and tools. Visiting right after morning opening hours (10:00 AM) gives you the best chance of finding restocked viral ampoules.',
        },
        {
          heading: '4. How Korean Collaborations Keep Prices Under 5,000 KRW',
          body: 'Many shoppers wonder why major Korean labs sell products at DAISO for a fraction of flagship prices. The secret lies in streamlined outer cartons, smaller 15–30ml travel volumes, and zero department-store counter commissions—meaning the active ingredient quality stays reliable while the package stays lean and travel-ready.',
        },
        {
          heading: '5. Budget Basket Example: 10 Items Under 30,000 KRW',
          body: 'For under 30,000 KRW (~$22), you can assemble a complete travel beauty kit: two packs of hydrocolloid spot patches (2,000 KRW), a teardrop cleansing sponge (1,000 KRW), a silicone suction brush (2,000 KRW), three single-use pack foam sachets (3,000 KRW), two Cica/PDRN ampoule pouches (6,000 KRW), and a multi-balm stick (5,000 KRW) with change to spare.',
        },
      ],
      ja: [
        {
          heading: '1. 機内持ち込みしやすいコンパクトサイズと試しやすい価格',
          body: '韓国ダイソーのコスメは10〜30mlの少量パウチやスティック型、1回使い切りカプセルが多く、旅行中の滞在日数に合わせて無駄なく使い切れるのが魅力です。話題の成分や人気ブランドのコラボラインも3,000ウォン前後で気軽に試せるため、本品を買う前のトライアルとしても優秀です。さらに機内持ち込みの100ml制限にも引っかかりにくいため、LCCや手荷物のみの弾丸旅行でもホテルでの夜ケアを妥協せず充実させられます。旅先で肌に合わなかった場合でも金銭的ダメージが小さく、帰国時に使い切ってゴミを減らせる点もミニマリスト派の旅行者から高く評価されており、初めて韓国コスメに挑戦する方にも安心です。',
        },
        {
          heading: '2. 売り場で真っ先にチェックしたい定番カテゴリー',
          body: 'まず押さえたいのは1,000ウォンの涙型クレンジングスポンジやシリコンスパチュラ、極薄タイプのニキビパッチなどの美容ツールです。続いてエンド棚に並ぶCICA・レチノール・コラーゲン配合のミニ美容液やアイパッチをチェックすると、流行のアイテムを効率よく見つけられます。最近はPDRN配合トナーや2WAYパックフォームなど成分にこだわった新作も増えており、1,000〜5,000ウォンとは思えない使い心地でリピーターが絶えません。さらにヘアケア用の洗い流さないトリートメントカプセルや携帯用リップスクラブなど、ちょっとしたお土産に喜ばれる隙間アイテムも充実しているので見逃せません。',
        },
        {
          heading: '3. 品揃えが豊富な大型店舗と狙い目の時間帯',
          body: '同じダイソーでも小型店舗ではコスメの取り扱いが限られます。明洞駅前の12階建て大型店や弘大入口駅店、江南駅周辺店など、ワンフロア丸ごとビューティーコーナーになっている旗艦店がおすすめです。人気商品は夕方に売り切れることが多いため、開店直後の午前10時台に訪れると在庫が揃っています。陳列棚のPOPに日本語や英語表記があるコーナーも多く、観光客でも商品特徴を見比べながら楽しく選べます。また明洞や弘大の店舗ではセルフレジに加えて観光客向けの有人レジや免税案内表示も整っているため、混雑時間帯を避ければ会計も驚くほどスムーズに完了します。',
        },
        {
          heading: '4. なぜ大手ブランドとのコラボが5,000ウォン以下で買えるのか',
          body: '韓国の有名メーカーがダイソー向けに低価格ラインを展開できる理由は、豪華な外箱やガラス瓶を省いたシンプル包装、内容量を15〜30mlに抑えたミニ設計、そして百貨店カウンターの販売手数料を省いた流通構造にあります。中身の基本処方は韓国の正規化粧品メーカーが製造しているため品質面でも安心感があり、旅行中の使い切り用やお試し用、複数人へのお土産として非常に合理的な選択肢となっています。大ヒットした商品は数か月後にオリーブヤングや公式ショップで大容量版として展開されることもあり、いわば韓国コスメのトレンド発信基地のような役割も担っています。そのため価格だけでなく成分の鮮度や企画力でも高い支持を集めています。',
        },
        {
          heading: '5. 3万ウォン以内で作れる満足度抜群のお買い物バスケット例',
          body: '予算30,000ウォンあれば、ニキビパッチ2袋（2,000ウォン）、涙型洗顔スポンジ（1,000ウォン）、シリコン洗顔ブラシ（2,000ウォン）、パックフォーム小分けパウチ3包（3,000ウォン）、CICA・PDRNミニ美容液2本（6,000ウォン）、マルチバームスティック（5,000ウォン）などをまとめて買ってもお釣りが来ます。さらに個包装のヘアオイルやシートマスクを数枚追加すれば、自分用にも職場へのバラマキ土産にも完璧なセットが完成します。会計前にはダイソーのギフト用ミニ紙袋や小分けジップ袋も1,000ウォンで一緒に購入しておくと、ホテルに戻ってからすぐに配りやすいお土産セットへ仕分けられます。季節限定のハンドクリームやリップマスクを組み合わせれば、年齢や性別を問わず喜ばれる実用ギフトになります。',
        },
      ],
      'zh-CN': [
        {
          heading: '1. 方便登机的便携小包装与零门槛试错成本',
          body: '大创美妆主打 10ml~30ml 迷你瓶、条状保湿棒与独立胶囊包装，非常适合短途旅行随身携带，也能轻松通过机场 100ml 液体安检限制。只需 3000 韩元左右就能体验热门品牌联名的微针精华、烟酰胺或积雪草系列，比直接盲买正装更划算、不易踩雷。哪怕是只带登机箱的周末特种兵行程，也能在酒店享受到完整的多步骤护肤体验，用完即抛不占返程行李空间。对于皮肤容易敏感的游客来说，先用小包装测试三五天确认不过敏再决定是否去免税店买正装，也是最理性的消费方式，既省预算又减少闲置浪费，尤其适合第一次来韩国购买本土美妆的新手旅客，也能减少买回大瓶却不合用的困扰。',
        },
        {
          heading: '2. 进店推荐优先挑选的高人气品类',
          body: '美妆工具区首推 1000 韩元水滴洁面海绵、硅胶涂抹棒以及隐形水胶体痘痘贴，性价比远超普通药妆店。护肤区则可重点关注货架显眼位置的积雪草、视黄醇、PDRN 与胶原蛋白联名小安瓶，这类单品单价低且回购率极高，经常出现整排被扫空的情况。此外还有 3000 韩元一盒的多片装面膜洁面乳与鼻贴组合，体积轻薄好塞行李箱，送给闺蜜或同事也显得很有心意。护发区的免洗护发胶囊与便携卷发夹同样口碑极佳，顺手带两板就能解决旅行期间头发毛躁的问题，实用度拉满，是本地女生逛大创时几乎人手一份的常备消耗品，也是游客回购率最高的明星分类。',
        },
        {
          heading: '3. 貨最全的旗舰门店与最佳扫货时间',
          body: '并非每家大创都有完整美妆区，建议优先前往明洞站 12 层旗舰店、弘大入口站店或江南站大型门店，这些分店通常会设有一整层的独立美妆专区。由于热门联名款在下午茶时段后极易断货，早上 10 点刚开门时进店挑选成功率最高。大型旗舰店货架旁通常会贴有英文或中文热门榜单标签，即使看不懂韩文也能一眼锁定近期口碑爆款，大幅缩短逛店比价时间。同时这些大型门店支持自助结账机与多种移动支付方式，遇到周末客流高峰时走自助通道可以省下十多分钟排队时间，部分店铺还能直接叠加即时退税服务，买满即可享受额外优惠。逛店时建议顺手在门口拿一个购物篮，因为美妆楼层通常和日用楼层分开结账或货架密集，提前装篮能避免回头再找漏拿的单品，还能顺便在同楼层补齐分装空瓶与旅行收纳袋。',
        },
        {
          heading: '4. 知名韩妆大厂联名却能控制在 5000 韩元以内的秘密',
          body: '很多游客好奇为什么大牌联名护肤品在大创这么便宜，其实秘诀在于精简了昂贵外盒与玻璃瓶包装、把容量缩减为 15~30ml 便携装，并省去了百货专柜高额抽成与营销广告费。核心保湿与舒缓成分依然由正规韩国化妆品代工厂按严格标准生产，用来尝鲜、测试肤质耐受度或应付短期差旅十分可靠，完全不必担心低价等于低质。正因如此，韩国本土大学生和上班族也经常在大创回购日常消耗品，一些销量爆发的联名款甚至会反哺品牌正装线推出升级版产品，堪称平价美妆风向标，值得每次赴韩时都来逛一逛新品区。而且单品价格亲民，即使多人分摊试用成本也几乎没有心理负担。',
        },
        {
          heading: '5. 3万韩元搞定 10 件人气好物的购物篮参考',
          body: '按榜单热门款搭配：水胶体痘痘贴两包（2,000 韩元）、水滴洁面海绵（1,000 韩元）、吸盘硅胶洗脸刷（2,000 韩元）、独立装大米泥膜洁面 3 包（3,000 韩元）、积雪草与 PDRN 便携精华各一（6,000 韩元）外加保湿棒（5,000 韩元），全套不到 2~3 万韩元就能带走。剩下的预算还可以顺手拿两盒便携护手霜或护发胶囊，自用送人两相宜。结账前不妨再在文具包装区花 1000 韩元买一包透明分装自封袋，回酒店后就能把工具和小样整齐分装成五六份高颜值伴手礼，轻松搞定所有人情往来，也不用担心行李箱空间不够放。如果还想增加实用度，再挑两支 2000 韩元的迷你润唇膏或压缩湿敷棉片，整体搭配就更加完整丰富了，无论送闺蜜还是送同事都很体面，真正做到花小钱办大事，难怪成为游客必逛一站，每次去首尔都值得再来补货，怎么买都不心疼预算，性价比确实无可挑剔，新手也能轻松上手。',
        },
      ],
      'zh-TW': [
        {
          heading: '1. 適合隨身登機的輕巧包裝與低門檻體驗',
          body: '大創美妝主打 10ml～30ml 迷你瓶、保濕棒與單次獨立包裝，非常適合短期旅遊使用，也能輕鬆符合機場 100ml 液體隨身攜帶規範。只要約 3,000 韓元就能搶先試用話題品牌聯名的積雪草、PDRN 或 A 醇系列，不必擔心買了大瓶不合膚質造成浪費。對於只帶登機箱快閃首爾的旅客來說，既能在飯店維持完整保養儀式，回程也不用煩惱瓶罐超重。特別是容易敏感的肌膚，先趁旅途中用小包裝試擦幾天確認穩定不致敏，再決定要不要去免稅店帶正貨回家，是最聰明又省錢的採購節奏，也能大幅降低盲買踩雷的風險，讓每次開箱都有驚喜感。',
        },
        {
          heading: '2. 建議優先鎖定的熱賣品項與工具區',
          body: '進店後可先拿 1,000 韓元水滴潔面海綿、矽膠面膜刮棒與超薄隱形痘痘貼，實用度極高。接著再逛保養專區的積雪草、A 醇、胜肽及膠原蛋白小安瓶與眼膜，這些高 CP 值單品經常是旅客整籃掃貨的目標，看到架上有貨建議直接先放入購物籃。另外像米萃泥膜潔顏乳與吸盤洗臉刷也是回購率極高的銅板好物，體積輕巧好收納。美髮區還有免沖洗護髮膠囊與便攜髮捲可挑選，價格同樣落在 1,000 至 3,000 韓元之間，非常適合補齊日常旅行裝備，是韓國在地女生每個月都會固定補貨的人氣日用品，送給同事也相當實用不失禮。',
        },
        {
          heading: '3. 貨源最齊全的推薦分店與補貨時段',
          body: '社區小型大創的彩妝保養品項較少，建議直接鎖定明洞站 12 層旗艦店、弘大入口站店或江南站大型門市，這幾間大型店通常設有完整美妝專區。熱門聯名精華到了下午往往會被掃空，安排在上午 10 點剛營業時前往，最容易買齊清單上的缺貨商品。大型分店陳列架上常見中英文熱銷標示，第一次造訪也能快速找到話題新品。此外這些旗艦門市多配有自助結帳機台並支援信用卡與海外行動支付，避開傍晚尖峰時段的話，從挑選到結帳離開往往不到二十分鐘就能完成，買滿規定金額還能依門市規定辦理退稅。若是搭乘首爾地鐵前往，明洞站出口直達的旗艦店動線最順，逛完還能順路把戰利品先放回飯店再繼續跑行程，省力又有效率，同時建議自備環保購物袋以減少塑膠袋費用。',
        },
        {
          heading: '4. 為何大牌聯名系列能壓在 5,000 韓元以內',
          body: '知名韓系品牌與大創合作的關鍵在於拿掉繁複紙盒與玻璃瓶成本、將容量濃縮為 15～30ml 輕巧規格，並透過大創高週轉門市直接銷售，省去專櫃抽成與廣告費用。成分配方仍由韓國正規美妝廠把關生產，既能大幅降低價格門檻，也讓旅客能用銅板價一次體驗多種熱門功能成分，確認適合自己後再到專櫃或免稅店回購正貨。就連韓國在地學生與上班族也常在大創補貨日常保養，部分熱銷聯名款甚至會成為品牌推出大容量正貨的起點，品質與口碑都相當有保障，絕對值得排進行程細細挖掘。而且對預算有限的學生族群或背包客而言，這類平價聯名款更是兼顧質感與荷包的最佳選擇，用來當作旅途應急保養也不心疼。',
        },
        {
          heading: '5. 3 萬韓元就能裝滿的必買清單組合範例',
          body: '預算控制在 3 萬韓元內，可以搭配兩包隱形痘痘貼（2,000 韓元）、水滴洗臉海綿（1,000 韓元）、矽膠潔顏刷（2,000 韓元）、三包袋裝面膜潔顏乳（3,000 韓元）、積雪草與 PDRN 迷你精華各一（6,000 韓元）以及一支隨身保濕棒（5,000 韓元），自用送禮都划算。剩餘預算還能補進護手霜與獨立包裝護髮膠囊，輕鬆打包十多件實用小物回家。離開前順手在文具包裝區買一組 1,000 韓元的小夾鏈袋或禮物紙袋，回飯店就能馬上分裝成多份精緻又實用的同事伴手禮，省錢又有面子。如果想讓禮袋內容更豐富，再加購幾片單價 1,000 韓元的舒緩面膜或壓縮濕敷棉，就能輕鬆打造高滿足度的首爾美妝伴手禮組，連不太懂韓妝的親友收到也會覺得非常貼心實用，回購率與好評度都非常高，完全不輸專櫃小禮盒的體面程度，是自由行旅客公認 CP 值最高的採購清單，輕鬆買齊所有必備美妝小物，絕對值得一逛再逛、滿載而歸，下次來首爾肯定還會再回訪補貨，同時也非常適合分享給同行旅伴一起採買。',
        },
      ],
    },
  },
  {
    slug: 'kbeauty-skincare-ingredients-guide',
    publishedAt: '2026-11-10',
    category: 'Ingredient Guide',
    readingMinutes: 8,
    title: {
      en: 'Korean Skincare Ingredients Explained: Cica, Mugwort & Low-Molecular Hyaluronic Acid',
      ja: '韓国コスメ成分ガイド：シカ（CICA）・ヨモギ・低分子ヒアルロン酸の選び方',
      'zh-CN': '韩系护肤核心成分全解析：积雪草、艾草与低分子玻尿酸',
      'zh-TW': '韓系護膚核心成分全解析：積雪草、艾草與低分子玻尿酸',
    },
    summary: {
      en: 'Decode Korean product labels quickly so you can pick the right serum or cream for sensitive, dry, or combination skin.',
      ja: '韓国語のパッケージでも迷わない！肌タイプ別に注目すべき3大成分の特徴を分かりやすく解説します。',
      'zh-CN': '看懂韩文包装上的热门成分，根据敏感肌、干皮或混油皮快速选对精华与面霜。',
      'zh-TW': '看懂韓文包裝上的熱門成分，依照敏感肌、乾肌或混合肌快速選對精華與乳霜。',
    },
    sections: {
      en: [
        {
          heading: '1. Cica (Centella Asiatica) & Mugwort (Artemisia) for Calming',
          body: 'Both ingredients are staples in Korean calming skincare—ideal for redness, travel fatigue, dry airplane air, and post-sun exposure. Look for Korean keywords like 병풀추출물 (Centella extract), 마데카소사이드 (Madecassoside), or 쑥 (Mugwort) near the top of the ingredient list if your skin reacts easily to temperature changes.',
        },
        {
          heading: '2. Low-Molecular Hyaluronic Acid & Ceramides for Barrier Repair',
          body: 'Found in best-selling Korean barrier creams and watery serums, low-molecular hyaluronic acid (저분자 히알루론산) penetrates outer skin layers quickly without leaving a heavy film. When paired with ceramides (세라마이드) and panthenol (판테놀), it locks moisture in for 24+ hours—making it a winter essential for dry and sensitive skin types.',
        },
        {
          heading: '3. Fermentation Filtrates & Brightening Actives',
          body: 'Iconic Korean essences rely on fermented yeast filtrates alongside gentle brighteners such as niacinamide (나이아신아마이드) and glutathione (글루타치온). Unlike harsh acid peels, Korean formulations emphasize daily layering with lightweight textures so you can hydrate and brighten simultaneously without compromising your skin barrier.',
        },
        {
          heading: '4. Matching Ingredients to Your Skin Type in One Glance',
          body: 'If you have oily or acne-prone skin, prioritize watery Mugwort or Centella toners paired with lightweight panthenol gel creams instead of heavy shea butter balms. Dry or mature skin benefits most from layering low-molecular hyaluronic serum underneath ceramide-capsule creams, while combination skin thrives with targeted hydration on the cheeks and mild BHA/rice cleansers on the T-zone.',
        },
        {
          heading: '5. Ingredient Combinations to Use Carefully During Travel',
          body: 'When your skin is already stressed by dry hotel air or cold Seoul winds, avoid stacking high-strength exfoliating acids (AHA/BHA) with strong retinol on the very same night. Instead, alternate active nights with barrier-recovery nights focused on Cica, ceramides, and panthenol so you return home with calm, glowing skin rather than unexpected peeling.',
        },
      ],
      ja: [
        {
          heading: '1. シカ（ツボクサエキス）＆ ヨモギ：ゆらぎ肌の鎮静ケア',
          body: '赤みや肌荒れを落ち着かせる鎮静ケアの代表成分です。旅行中の乾燥した機内環境や気温差、外食続きの生活リズムでゆらぎやすい肌に最適で、パッケージに「병풀（ツボクサ）」「마데카소사이드（マデカッソシド）」「쑥（ヨモギ）」と書かれた化粧水やシートマスクは敏感肌でも毎日使いやすい処方が多く揃っています。特に韓国産の江華島ヨモギを使ったエッセンスは、肌表面の熱感を穏やかに抑えながら水分バランスを整えてくれるため、観光で歩き回った日の夜ケアに重宝します。紫外線や摩擦による軽い赤みが気になる時も、アルコールフリーの鎮静トナーをコットンに含ませて頬に乗せるだけで心地よくクールダウンでき、翌朝のメイク崩れ防止にも役立ちます。',
        },
        {
          heading: '2. 低分子ヒアルロン酸 ＆ セラミド：角質層の水分保持とバリア補修',
          body: '乾燥が気になる季節には、肌表面でベタつきにくい低分子ヒアルロン酸（저분자 히알루론산）と、細胞間脂質の主成分であるセラミド（세라마이드）の組み合わせが人気です。さらにパンテノール（판테놀）が配合されたクリームを重ねることで、暖房の効いた室内でも長時間うるおいを逃しません。韓国の皮膚科発ブランドではセラミドを微細カプセル化して浸透性を高めた処方も多く、朝のメイク前に薄く塗ってもファンデーションがヨレにくい点が支持されています。また肌表面の水分蒸発を防ぐだけでなく、乾燥による小じわや粉吹きが起きやすい口元・目元の保護膜としても優秀で、季節を問わず一本持っておくと安心です。',
        },
        {
          heading: '3. 発酵エキス ＆ ナイアシンアミド：透明感を引き出す重ねづけ設計',
          body: 'MISSHAなどに代表される定番エッセンスには、発酵ろ過物に加えてナイアシンアミドやグルタチオンといった整肌・ブライトニング成分がよく使われます。刺激の強いピーリングよりも「軽い水分を重ねて肌負担なく整える」設計が韓国スキンケアの特徴なので、他の保湿アイテムとも併用しやすいのが魅力です。コットンパックで3分ほど頬に乗せてから手でハンドプレスすると、くすみがちな肌にもみずみずしいツヤが生まれます。朝晩のルーティンに取り入れやすく、旅行中の睡眠不足で顔色が冴えない朝でも、ファンデーションのノリを格段に引き上げてくれる頼もしい存在です。',
        },
        {
          heading: '4. 肌タイプ別・韓国コスメ成分の選び分けガイド',
          body: '脂性肌やニキビができやすい肌には、ヨモギやCICAのさっぱり系トナーとパンテノール配合の軽いジェルクリームが相性抜群です。一方、乾燥肌やエイジングケア重視の方は、低分子ヒアルロン酸美容液の後にセラミドカプセルクリームを重ねる二段階保湿が効果的です。混合肌の方はTゾーンを米ぬか系クレンザーでさっぱり洗い、乾燥しやすいUゾーンや目元だけに保湿クリームを重ね塗りすると一日中テカリと乾燥を同時に防げます。同じシリーズでも化粧水・美容液・クリームでテクスチャーが異なるため、店頭のテスターでベタつき具合を確かめてから組み合わせるのが失敗しないコツです。季節や体調によって肌質は変化するため、旅行用に軽い鎮静タイプと濃厚な保湿タイプの2種類を使い分けるのもおすすめです。',
        },
        {
          heading: '5. 旅行中に気をつけたい成分の組み合わせルール',
          body: '環境が変わる旅行中は肌のバリアが一時的に不安定になりやすいため、高濃度のレチノールと強い角質ケア酸（AHA・BHA）を同じ晩に重ねるのは避けましょう。攻めの成分を使う日は翌日を鎮静・保湿ケアの日にするなど交互に取り入れることで、赤みや皮むけを防ぎながらツヤ肌を維持できます。また日中はどんな機能性成分を使う場合でも、SPF50+ PA++++の日焼け止めを丁寧に塗り直すことが仕上がりを保つ最大のポイントです。さらに新しい成分を試す際は、いきなり全顔に塗らず顎下などで一晩様子を見ると旅先での急な肌トラブルを防げます。帰国後の季節の変わり目にもこの基本ルールを意識しておくと、買ったばかりの韓国コスメを最後まで心地よく使い切ることができます。',
        },
      ],
      'zh-CN': [
        {
          heading: '1. 积雪草 (Cica) 与艾草 (Mugwort)：泛红敏感的急救核心',
          body: '这是韩国舒缓修护产品中最常见的两大植物成分，特别适合缓解长途飞行干燥、日晒泛红与换季敏感。选购时可以留意包装上的“병풀（积雪草）”、“마데카소사이드（羟基积雪草苷）”或“쑥（艾草）”标识，通常质地清爽不黏腻，油敏肌也能放心湿敷。尤其是江华岛发酵艾草精华在韩国口碑极佳，能在熬夜逛街或空调房久待后迅速安抚面部燥热感，让皮肤恢复平稳水润。如果旅途中不小心晒后泛红或因更换水质出现小闭口，用无酒精积雪草爽肤水局部湿敷五分钟就能明显退红降温。很多韩国皮肤科诊所也会建议患者在日常护理中常备一瓶积雪草精华水，作为换季与长途出差时的基础维稳单品，温和安全几乎不挑肤质，而且早晚都能安心使用。此外，搭配同系列低敏舒缓面膜更能加倍提升退红修护速度。',
        },
        {
          heading: '2. 低分子透明质酸与神经酰胺：深层补水兼顾锁水屏障',
          body: '低分子玻尿酸（저분자 히알루론산）分子量更小、吸收更快，不易在皮肤表面搓泥；而神经酰胺（세라마이드）与泛醇（판테놀）则负责修护受损角质层、减少水分流失。这两类成分的组合在乐天免税店冬季面霜榜单中常年稳居前列。不少韩国院线级修护霜还会把神经酰胺做成微囊胶囊，涂抹时融化渗透，既能提供长效保湿又不会像传统厚重膏体那样糊住毛孔，妆前打底同样服帖。对于秋冬季节容易在鼻翼与嘴角起皮的干性肌来说，先水润打底再锁水封层能显著减少卡粉尴尬。即使回到干燥的北方城市或长期处于暖气空调环境中，这套经典保湿公式依然能持续发挥稳定保护作用，减少换季干痒。想要提升吸收效率，建议在洗完脸后趁皮肤微湿时先涂玻尿酸精华，再薄涂一层神经酰胺面霜锁水。',
        },
        {
          heading: '3. 酵母发酵滤液与温和提亮成分的叠加逻辑',
          body: '韩系经典精华水普遍采用酵母发酵产物滤液搭配烟酰胺（나이아신아마이드）或谷胱甘肽，主打温和提亮与改善暗沉。与高浓度猛药型酸类不同，韩系配方更注重通过轻薄质地逐层叠加保湿，在稳住肌肤屏障的前提下实现透亮光泽感。日常可以用化妆棉浸湿精华水轻敷两颊三分钟，再用手掌温热按压吸收，长期坚持能明显感受到肤色均匀度提升。即使在韩国旅游期间睡眠时间偏少、饮食偏辣偏咸，早晚坚持使用发酵精华水也能让面色保持通透饱满，不上浓妆也有好气色。此外，发酵类精华还能帮助软化老废角质、提升后续精华与乳霜的吸收效率，是性价比极高的抗初老入门选择，深受各年龄段喜爱。',
        },
        {
          heading: '4. 按肤质快速匹配的成分选品公式',
          body: '油皮和痘肌可优先选择艾草或积雪草清爽型爽肤水搭配泛醇凝霜，控油同时不易闷闭口；干皮和熟龄肌建议采用“低分子玻尿酸精华 + 神经酰胺修护霜”的双重锁水组合；混合肌则可以在 T 区用温和洁面控油、两颊重点叠加保湿面霜。看懂核心成分表后，无论是在大创挑平价小样还是在免税店买正装礼盒，都能精准避开不适合自己的质地。此外选购时也可以关注产品是否通过皮肤科低刺激测试，这在韩文标签上通常会有明确标注，适合敏弱人群参考。记住“先补水、再修护、最后按需美白”的顺序，就能用最精简的步骤养出健康好皮肤，不用盲目叠加七八层产品反而增加肌肤负担。',
        },
        {
          heading: '5. 旅途护肤需要注意的成分避雷搭配',
          body: '外出旅游作息与气候变化大，不建议同一晚叠加高浓度果酸、水杨酸和强效视黄醇（A 醇），以免刺激受损角质导致脱皮泛红。更稳妥的做法是把刷酸或 A 醇与积雪草、B5、神经酰胺修护夜交替安排，让皮肤在稳定状态中越养越透亮。同时白天无论搭配哪种美白或抗老精华，都别忘了足量涂抹高倍防晒霜，避免紫外线抵消修护成果。若在首尔新买了从未用过的功效型精华，建议先在耳后或下颌线小范围试用一晚，确认无刺痛发痒再全脸使用更稳妥。只要避开过度清洁和猛药叠加，绝大多数敏感问题都能在几天内平稳恢复，回国后也能无缝衔接日常保养节奏，让每一样战利品都发挥最大护肤价值，真正做到科学温和地养出健康好肤质，告别盲目跟风踩雷，轻松拥有韩剧女主般的透亮水光肌与细腻好肤触，让每次韩国美妆之旅都满载而归、不留遗憾，日常护肤也更省心高效。',
        },
      ],
      'zh-TW': [
        {
          heading: '1. 積雪草 (Cica) 與艾草 (Mugwort)：舒緩泛紅與換季不適',
          body: '韓系舒緩修護產品最經典的兩大植萃成分，特別適合緩解長途搭機乾燥、日曬泛紅與水土不服。選購時可留意韓文包裝上的「병풀（積雪草）」、「마데카소사이드（積雪草苷）」或「쑥（艾草）」字樣，質地多半清爽好吸收，敏弱肌也能安心使用。特別是韓國江華島發酵艾草精華口碑極佳，在夜間逛街吹風或長時間待在冷氣房後濕敷，能迅速安撫肌膚不適並穩定水油平衡。若因水土不服或戴口罩悶熱導致雙頰微紅，取無酒精積雪草化妝水濕敷五分鐘即可感受到舒緩降溫。許多韓國皮膚科診所也常推薦在換季時準備一瓶積雪草精華作為基礎打底，溫和不刺激且適合全家大小日常使用，幾乎不會與其他保養品起衝突，也不易致痘。',
        },
        {
          heading: '2. 低分子玻尿酸與神經醯胺：深層補水同時修護屏障',
          body: '低分子玻尿酸（저분자 히알루론산）能迅速滲透補水而不易黏膩起屑，搭配神經醯胺（세라마이드）與維他命原 B5（판테놀）則能強化角質屏障、鎖住水分。這組黃金保濕配方在韓國免稅店與藥妝通路長年名列前茅。許多韓系醫美修護霜更採用微囊膠囊包裹神經醯胺，推開即化且不悶痘，無論當作夜間修護或日間妝前保濕都很服貼。對於秋冬容易在鼻翼與嘴角脫皮起屑的乾燥肌膚而言，先補水再鎖水能大幅提升底妝的持久度與平滑感。回到台灣濕冷冬天或長期待在辦公室冷氣房時，這套補水鎖水組合同樣能持續維持肌膚穩定不緊繃，是換季最值得投資的基礎組合，建議早晚規律使用效果更明顯，也是免稅店回購率極高的明星組合。',
        },
        {
          heading: '3. 發酵精華與溫和亮白成分的日常疊擦哲學',
          body: '以經典神仙水為代表的韓系精華多結合酵母發酵萃取與菸鹼醯胺（나이아신아마이드），強調溫和改善暗沉與粗糙感。相較高刺激性的高濃度酸類，韓系保養更重視輕盈質地的分層補水，讓肌膚在穩定狀態下自然透亮。建議洗完臉後以化妝棉輕拍或濕敷三分鐘，再搭配掌心溫度按壓吸收，能讓後續乳液或氣墊底妝更貼合有光澤。即使旅遊期間早出晚歸、飲食偏重口味，早晚規律使用發酵精華也能幫助維持明亮好氣色，減少蠟黃疲憊感。此外發酵精華也有助於調理角質代謝並提升後續精華吸收度，是非常受歡迎的抗初老入門選擇，搭配保濕乳霜使用效果更佳，長期下來能讓膚觸更加細緻柔嫩有彈性。',
        },
        {
          heading: '4. 依不同膚質快速對照的成分挑選指南',
          body: '油性肌與痘痘肌建議鎖定艾草或積雪草水感化妝水搭配 B5 輕乳霜，清爽舒緩不易堵塞毛孔；乾性肌與熟齡肌最適合「低分子玻尿酸精華 + 神經醯胺乳霜」雙層鎖水；混合肌則可於 T 字區維持溫和清潔、兩頰加強神經醯胺保濕。只要學會辨識這幾個韓文關鍵字，無論是大創平價好物或免稅店專櫃組都能精準選對不踩雷。購買前也可順道確認包裝上是否有低刺激性測試完成標章，讓敏感肌在挑選新品時多一層安心依據。掌握「先舒緩補水、再修護鎖水、最後視需求提亮」的原則，就能事半功倍，不必盲目疊擦過多瓶瓶罐罐反而造成毛孔負擔，也能省下不少冤枉錢與行李空間，對新手旅客特別友善，買回家送給不同年齡層的親友也更能精準命中需求，輕鬆建立專屬於自己的韓系保養清單。',
        },
        {
          heading: '5. 旅途中應避免同時疊加的刺激性成分組合',
          body: '出國旅遊時環境溫濕度變化大，切忌在同一晚同時使用高濃度果酸、水楊酸與高濃度 A 醇，容易引發乾燥脫皮或刺痛泛紅。建議將功能型煥膚夜與積雪草、B5 舒緩修護夜交錯安排，維持屏障健康才是亮白好氣色的基礎。此外白天務必搭配足量高係數防曬乳，才能真正保護修護中的脆弱角質。如果在韓國剛入手全新高機能安瓶，建議先在耳後或下顎邊緣局部試擦一晚，確定沒有刺激反應再全臉使用，更能安心享受血拼樂趣。只要避開過度去角質與成分衝突，肌膚就能在整趟旅程中維持水嫩透亮，回國後也能繼續沿用這套溫和高效的保養邏輯，無論春夏秋冬都能輕鬆養出穩定不泛紅的好膚質與自然水光感，讓每次韓國購物都物超所值、安心滿意，再也不怕換季敏感找上門，輕鬆維持透亮好氣色，同時也讓後續上妝更加服貼持久不卡粉，由內而外散發健康光采與自信魅力，天天都能擁有好氣色與水潤光澤。',
        },
      ],
    },
  },
];

export const GUIDE_ARTICLES: GuideArticle[] = [...BASE_GUIDE_ARTICLES, ...EXTRA_GUIDE_ARTICLES];

const GUIDE_COVER_IMAGES: Record<string, string> = {
  'seoul-kbeauty-shopping-channels-compared':
    'https://images.unsplash.com/photo-1554310603-d39d43033735?auto=format&fit=crop&w=1200&h=630&q=80',
  'daiso-korea-beauty-under-5-dollars':
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&h=630&q=80',
  'kbeauty-skincare-ingredients-guide':
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&h=630&q=80',
  'seoul-beauty-districts-myeongdong-hongdae-seongsu':
    'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&h=630&q=80',
  'korea-duty-free-and-tax-refund-tips':
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&h=630&q=80',
  'missha-bestsellers-bb-cream-vs-artemisia':
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&h=630&q=80',
  'lotte-duty-free-top-skincare-duo-sets':
    'https://images.unsplash.com/photo-1640958903443-1e49d720650d?auto=format&fit=crop&w=1200&h=630&q=80',
  'winter-barrier-creams-aestura-larocheposay-kiehls':
    'https://images.unsplash.com/photo-1748543668699-a8a9398e9161?auto=format&fit=crop&w=1200&h=630&q=80',
  'daiso-cleansing-tools-and-rice-cleansers':
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&h=630&q=80',
  'how-to-read-korean-cosmetic-labels':
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&h=630&q=80',
  'kbeauty-souvenir-bundle-under-100000-krw':
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&h=630&q=80',
  'airport-liquid-rules-and-packing-kbeauty':
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&h=630&q=80',
  'collagen-hydrogel-masks-trend-2026':
    'https://images.unsplash.com/photo-1621151927841-ac2ee62f0333?auto=format&fit=crop&w=1200&h=630&q=80',
  'pdrn-and-peptide-skincare-guide':
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&h=630&q=80',
  'cleansing-balm-vs-foam-for-travelers':
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&h=630&q=80',
  'seoul-in-flight-and-post-trip-skincare':
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1200&h=630&q=80',
  'kbeauty-eye-cream-and-neck-care-picks':
    'https://images.unsplash.com/photo-1706821722700-842cb7329a08?auto=format&fit=crop&w=1200&h=630&q=80',
  'kbeauty-gift-etiquette-and-korean-makeup-trends':
    'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&h=630&q=80',
};

const DEFAULT_GUIDE_COVER =
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&h=630&q=80';

const CATEGORY_LABELS: Record<string, Record<PublicLocale, string>> = {
  'Shopping Guide': {
    en: 'Shopping Guide',
    ja: '買い物ガイド',
    'zh-CN': '购物指南',
    'zh-TW': '購物指南',
  },
  'Product Review': {
    en: 'Product Review',
    ja: '商品レビュー',
    'zh-CN': '单品测评',
    'zh-TW': '單品評測',
  },
  'Ingredient Guide': {
    en: 'Ingredient Guide',
    ja: '成分ガイド',
    'zh-CN': '成分指南',
    'zh-TW': '成分指南',
  },
  'Travel Guide': {
    en: 'Travel Guide',
    ja: '旅行ガイド',
    'zh-CN': '出行指南',
    'zh-TW': '旅遊指南',
  },
  'Skin Concern': {
    en: 'Skin Concern',
    ja: '肌悩み別ケア',
    'zh-CN': '肤质护肤',
    'zh-TW': '膚質保養',
  },
  'Trend Report': {
    en: 'Trend Report',
    ja: 'トレンド解説',
    'zh-CN': '趋势报告',
    'zh-TW': '趨勢報告',
  },
};

export function getGuideCoverImage(slug: string): string {
  return GUIDE_COVER_IMAGES[slug] ?? DEFAULT_GUIDE_COVER;
}

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((article) => article.slug === slug);
}

/**
 * Returns the localized label for a guide category.
 */
export function getLocalizedCategory(category: string, locale: PublicLocale): string {
  return CATEGORY_LABELS[category]?.[locale] ?? category;
}

/**
 * Formats estimated guide reading duration in the requested locale.
 */
export function formatReadingTime(minutes: number, locale: PublicLocale): string {
  switch (locale) {
    case 'ja':
      return `約${minutes}分で読める`;
    case 'zh-CN':
      return `约 ${minutes} 分钟阅读`;
    case 'zh-TW':
      return `約 ${minutes} 分鐘閱讀`;
    case 'en':
    default:
      return `${minutes} min read`;
  }
}

/**
 * Selects related guide articles excluding the current slug, prioritizing shared category.
 */
export function getRelatedGuides(currentSlug: string, limit = 3): GuideArticle[] {
  const current = getGuideBySlug(currentSlug);
  const candidates = GUIDE_ARTICLES.filter((article) => article.slug !== currentSlug);
  if (!current) {
    return candidates.slice(0, limit);
  }
  const sameCategory = candidates.filter((article) => article.category === current.category);
  const others = candidates.filter((article) => article.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
