import type { PublicLocale } from '@/lib/i18n/messages';
import type { RankingItem } from '@/types/ranking';

type ProductKind =
  | 'duo'
  | 'mask'
  | 'serum'
  | 'cream'
  | 'makeup'
  | 'cleansing'
  | 'lipEye'
  | 'skincare';

type ChannelCue = 'dutyFreeSale' | 'dutyFree' | 'budgetPick' | 'roadshopSale' | 'standard';

const PRODUCT_KIND_RULES: Array<{ kind: ProductKind; pattern: RegExp }> = [
  { kind: 'lipEye', pattern: /\b(lip|eye)\b|립|아이|입술|눈가/i },
  { kind: 'mask', pattern: /\b(mask|pad|pads|patch|patches|sheet)\b|마스크|패드|패치|팩/i },
  { kind: 'cleansing', pattern: /\b(cleans|foam|wash|peel|sponge|puff|brush|scrub|exfoliat)\b|클렌징|폼|스펀지|퍼프|브러시|필링/i },
  { kind: 'makeup', pattern: /\b(bb|cc|cushion|sun|sunscreen|spf|foundation|concealer|tint|blush|powder|primer)\b|비비|쿠션|선크림|파운데이션|틴트|파우더/i },
  { kind: 'serum', pattern: /\b(serum|essence|ampoule|concentrate|toner|mist|treatment)\b|세럼|에센스|앰플|토너|미스트/i },
  { kind: 'cream', pattern: /\b(cream|balm|lotion|emulsion|moisturizer|gel|ointment)\b|크림|밤|로션|에멀전/i },
  { kind: 'duo', pattern: /\b(duo|set|sets|twin|double|kit|pack|2\+|3\+)\b|듀오|세트|기획|2개/i },
];

const KIND_NOTES: Record<ProductKind, Record<PublicLocale, string>> = {
  duo: {
    en: 'Multi-pack format favored for value gifting and bulk restocking.',
    ja: '大容量・セット構成でお土産やまとめ買いに選ばれる定番。',
    'zh-CN': '多支套装规格兼顾性价比，适合送礼或年度囤货。',
    'zh-TW': '多入組合規格兼顧高 CP 值，適合送禮或旅途囤貨。',
  },
  mask: {
    en: 'Targeted sheet or patch care packed flat for easy suitcase space.',
    ja: '薄型で持ち帰りやすく、集中鎮静・保湿ケアに人気のアイテム。',
    'zh-CN': '轻薄易打包的贴片护理单品，适合旅途中急救保湿或舒缓。',
    'zh-TW': '輕薄不佔行李空間的敷膜護理，適合旅途急救保濕與修護。',
  },
  serum: {
    en: 'Concentrated essence step prized for hydration and barrier glow.',
    ja: '角質層へなじみやすい集中美容液で、旅行前後の肌調整に好評。',
    'zh-CN': '主打吸收感与水润修护的精华步骤，适合提升日常护肤质感。',
    'zh-TW': '主打滲透感與水潤修護的精華步驟，能迅速穩定換季膚況。',
  },
  cream: {
    en: 'Daily moisture-lock formula suited for dry flights and cold weather.',
    ja: '乾燥した機内や冬の保湿仕上げに重宝される高密着クリーム。',
    'zh-CN': '专为机舱干燥与秋冬锁水设计，质地贴合不黏腻。',
    'zh-TW': '專為乾燥機艙與秋冬鎖水設計，潤澤服貼不易黏膩。',
  },
  makeup: {
    en: 'Natural tone coverage and UV prep tested frequently in Seoul shops.',
    ja: '韓国路面店で色味を試しながら選ばれる定番ベース＆UVケア。',
    'zh-CN': '韩系清透底妆与防晒口碑款，门店试色挑选更直观安心。',
    'zh-TW': '韓系清透底妝與防曬熱銷款，建議依膚色挑選自然服貼色調。',
  },
  cleansing: {
    en: 'Gentle daily wash or prep tool built for low-irritation routines.',
    ja: '摩擦を抑えて汚れを落とせる日常ケア用の実用アイテム。',
    'zh-CN': '注重温和净颜与实用手感的清洁好物，减少换季搓洗刺激。',
    'zh-TW': '兼顧溫和淨顏與實用觸感的清潔單品，降低旅途洗卸刺激。',
  },
  lipEye: {
    en: 'Focused care for delicate lip and under-eye areas in compact size.',
    ja: '目元や唇の乾燥ポイントを集中的に守る携帯しやすいケア品。',
    'zh-CN': '针对眼周与唇部干燥细节的便携护理，小巧随身补涂方便。',
    'zh-TW': '針對眼周與唇部乾燥的精巧護理，尺寸輕巧方便隨身攜帶。',
  },
  skincare: {
    en: 'Core Korean routine staple balancing gentle ingredients and daily wear.',
    ja: '成分バランスと使い心地に定評のある韓国日常スキンケア定番。',
    'zh-CN': '兼顾温和配方与日常耐受度的韩系热门护肤单品。',
    'zh-TW': '兼顧溫和配方與日常舒適膚感的韓系人氣保養單品。',
  },
};

const COMPACT_KIND_NOTES: Record<ProductKind, Record<PublicLocale, string>> = {
  duo: {
    en: 'Gift-ready bundle for Korea trip packing.',
    ja: '旅行のまとめ買いに人気のセット品。',
    'zh-CN': '适合一次囤货与送礼的套装款。',
    'zh-TW': '適合旅途囤貨與送禮的組合款。',
  },
  mask: {
    en: 'Lightweight flat pack for travel recovery.',
    ja: '旅先での集中保湿に便利なシート型。',
    'zh-CN': '轻巧不占空间的贴片急救单品。',
    'zh-TW': '輕巧好攜帶的旅途急救敷膜。',
  },
  serum: {
    en: 'Travel-favorite hydration & radiance booster.',
    ja: 'ツヤとうるおいを整える人気美容液。',
    'zh-CN': '兼顾吸收与水润感的热门精华。',
    'zh-TW': '清爽滲透、提亮膚況的人氣精華。',
  },
  cream: {
    en: 'Rich daily cream built for dry cabin air.',
    ja: '移動中や季節の乾燥対策に心強いクリーム。',
    'zh-CN': '贴合锁水、应对换季干燥的面霜。',
    'zh-TW': '溫和鎖水、適應換季乾肌的乳霜。',
  },
  makeup: {
    en: 'Popular Seoul counter shade & base staple.',
    ja: '韓国店舗で色選びを楽しむ定番ベースメイク。',
    'zh-CN': '韩国专柜高人气清透底妆防晒。',
    'zh-TW': '韓國門市熱銷的自然服貼底妝防曬。',
  },
  cleansing: {
    en: 'Practical low-friction cleansing essential.',
    ja: '毎日使いやすい低刺激の洗顔・ケア小物。',
    'zh-CN': '温和洁净日常可用的口碑洁面好物。',
    'zh-TW': '溫和淨膚且實用的日常清潔好物。',
  },
  lipEye: {
    en: 'Compact targeted lip & eye moisture care.',
    ja: '目元・口元をピンポイントで潤すミニケア。',
    'zh-CN': '便于随身补涂的眼唇修护单品。',
    'zh-TW': '方便隨身補擦的眼唇局部護理。',
  },
  skincare: {
    en: 'Top-rated daily K-Beauty skincare essential.',
    ja: '現地でもリピート率の高い毎日用ケア。',
    'zh-CN': '回购率高的韩系日常护肤优选。',
    'zh-TW': '回購率高且口碑穩定的韓系保養。',
  },
};

function formatCompactLead(item: RankingItem, locale: PublicLocale): string {
  const brand =
    item.brand?.[locale]?.trim() ||
    item.brand?.en?.trim() ||
    item.brand?.ko?.trim() ||
    'PickKR';
  switch (locale) {
    case 'ja':
      return `#${item.rank}・${brand}:`;
    case 'zh-CN':
      return `#${item.rank} ${brand}｜`;
    case 'zh-TW':
      return `#${item.rank} ${brand}｜`;
    case 'en':
    default:
      return `#${item.rank} by ${brand} —`;
  }
}

function formatRankAndBrandLead(item: RankingItem, locale: PublicLocale): string {
  const brand =
    item.brand?.[locale]?.trim() ||
    item.brand?.en?.trim() ||
    item.brand?.ko?.trim() ||
    'PickKR';
  switch (locale) {
    case 'ja':
      return `${brand}の週間${item.rank}位アイテム。`;
    case 'zh-CN':
      return `${brand} 本周第 ${item.rank} 名人气单品。`;
    case 'zh-TW':
      return `${brand} 本週第 ${item.rank} 名熱銷單品。`;
    case 'en':
    default:
      return `No. ${item.rank} pick by ${brand}.`;
  }
}

function getChannelCueNote(
  cue: ChannelCue,
  locale: PublicLocale,
  discountPct: number | null
): string {
  switch (cue) {
    case 'dutyFreeSale': {
      const pctText = discountPct ? `${discountPct}% ` : '';
      const map: Record<PublicLocale, string> = {
        en: `${pctText}duty-free markdown with airport pickup.`,
        ja: `空港受取対応・${pctText}免税セール対象。`,
        'zh-CN': `机场提货免重，享 ${pctText}免税优惠。`,
        'zh-TW': `機場提貨不佔重量，享 ${pctText}免稅優惠。`,
      };
      return map[locale];
    }
    case 'dutyFree': {
      const map: Record<PublicLocale, string> = {
        en: 'Tax-free USD pricing for airport counter pickup.',
        ja: '免税価格＆出国後カウンター受取対応。',
        'zh-CN': '享免税美元价并支持出境柜台提货。',
        'zh-TW': '享免稅美金價並支援出境櫃檯取貨。',
      };
      return map[locale];
    }
    case 'budgetPick': {
      const map: Record<PublicLocale, string> = {
        en: 'Under 5,000 KRW travel-friendly pick.',
        ja: '5,000ウォン以下の高コスパ品。',
        'zh-CN': '5,000 韩元以内平价随手礼首选。',
        'zh-TW': '5,000 韓元以內高 CP 值伴手禮。',
      };
      return map[locale];
    }
    case 'roadshopSale': {
      const pctText = discountPct ? `${discountPct}% ` : '';
      const map: Record<PublicLocale, string> = {
        en: `Promotional ${pctText}savings plus instant tax refund eligibility.`,
        ja: `${pctText}割引中＆パスポート即時免税対象。`,
        'zh-CN': `享 ${pctText}限时优惠且满额可即时退税。`,
        'zh-TW': `享 ${pctText}限時優惠且滿額可即時退稅。`,
      };
      return map[locale];
    }
    case 'standard': {
      const map: Record<PublicLocale, string> = {
        en: 'Eligible for instant road-shop tax refund.',
        ja: '対象店舗で即時免税手続きが可能。',
        'zh-CN': '支持贴标门店满额即时退税。',
        'zh-TW': '支援貼標門市滿額即時退稅。',
      };
      return map[locale];
    }
  }
}

function detectProductKind(item: RankingItem): ProductKind {
  const haystack = `${item.name.en} ${item.name.ko}`;
  for (const rule of PRODUCT_KIND_RULES) {
    if (rule.pattern.test(haystack)) {
      return rule.kind;
    }
  }
  return 'skincare';
}

function detectChannelCue(item: RankingItem): { cue: ChannelCue; discountPct: number | null } {
  const hasSale =
    item.sale_price !== null && item.sale_price > 0 && item.sale_price < item.price;
  const discountPct = hasSale
    ? Math.max(1, Math.round(((item.price - (item.sale_price as number)) / item.price) * 100))
    : null;
  const effectivePrice = hasSale ? (item.sale_price as number) : item.price;

  if (item.currency === 'USD') {
    return { cue: hasSale ? 'dutyFreeSale' : 'dutyFree', discountPct };
  }
  if (effectivePrice > 0 && effectivePrice <= 5000) {
    return { cue: 'budgetPick', discountPct };
  }
  if (hasSale) {
    return { cue: 'roadshopSale', discountPct };
  }
  return { cue: 'standard', discountPct: null };
}

/**
 * Returns a localized product curation note, falling back to structured category,
 * rank tier, and channel cues when item.editorial_summary[locale] is blank.
 * Supports a distinct 'compact' variant for homepage summaries to avoid duplication.
 */
type IngredientFocus =
  | 'collagen'
  | 'cica'
  | 'pdrn'
  | 'retinol'
  | 'vitamin'
  | 'peptide'
  | 'hyaluronic'
  | 'ceramide'
  | 'honey'
  | 'rice'
  | 'artemisia'
  | 'teaTree';

const INGREDIENT_RULES: Array<{ focus: IngredientFocus; pattern: RegExp }> = [
  { focus: 'pdrn', pattern: /\bpdrn\b/i },
  { focus: 'collagen', pattern: /\bcollagen\b|콜라겐/i },
  { focus: 'cica', pattern: /\bcica\b|madecass|centella|시카|병풀|마데카/i },
  { focus: 'retinol', pattern: /\bretinol\b|레티놀/i },
  { focus: 'vitamin', pattern: /\bvitamin\b|vita\b|niacinamide|비타민|나이아신/i },
  { focus: 'peptide', pattern: /\bpeptide\b|펩타이드/i },
  { focus: 'hyaluronic', pattern: /\bhyaluron|히알루론/i },
  { focus: 'ceramide', pattern: /\bceramide\b|barrier|세라마이드|장벽|아토베리어/i },
  { focus: 'honey', pattern: /\bhoney\b|propolis|허니|꿀|프로폴리스/i },
  { focus: 'rice', pattern: /\brice\b|쌀|라이스/i },
  { focus: 'artemisia', pattern: /\bartemisia\b|mugwort|개똥쑥|쑥/i },
  { focus: 'teaTree', pattern: /\btea\s*tree\b|티트리/i },
];

const INGREDIENT_NOTES: Record<IngredientFocus, Record<PublicLocale, string>> = {
  pdrn: {
    en: 'Formulated with PDRN for elasticity and post-travel skin recovery.',
    ja: 'PDRN配合でハリと旅行後の肌コンディションケアに人気。',
    'zh-CN': '蕴含 PDRN 修护成分，适合提升弹润度与旅后修护。',
    'zh-TW': '蘊含 PDRN 修護成分，適合提升彈潤感與旅後修護。',
  },
  collagen: {
    en: 'Collagen-focused care targeting firming and plump hydration.',
    ja: 'コラーゲン配合でハリ・弾力ケアを重視する方に定番。',
    'zh-CN': '主打胶原蛋白紧致保湿，提升肌肤饱满质感。',
    'zh-TW': '主打膠原蛋白緊緻保濕，提升肌膚澎潤彈性。',
  },
  cica: {
    en: 'Calming Cica formula suited for sensitive or redness-prone skin.',
    ja: 'シカ（ツボクサ）成分でゆらぎ肌や赤みを穏やかに鎮静。',
    'zh-CN': '积雪草舒缓配方，适合敏感泛红或换季维稳。',
    'zh-TW': '積雪草舒緩配方，適合敏弱泛紅或換季維穩修護。',
  },
  retinol: {
    en: 'Retinol night-care pick for texture smoothing and pore refinement.',
    ja: 'レチノール配合でキメ整え・夜間の集中エイジングケア向け。',
    'zh-CN': '含视黄醇成分，主打夜间细腻肤质与毛孔护理。',
    'zh-TW': '含視黃醇成分，適合夜間細緻膚質與毛孔保養。',
  },
  vitamin: {
    en: 'Brightening vitamin blend for dullness and uneven tone care.',
    ja: 'ビタミン配合でくすみ・トーンアップケアに選ばれる人気品。',
    'zh-CN': '维他命提亮配方，改善暗沉与肤色不均困扰。',
    'zh-TW': '維他命提亮配方，有助改善暗沉與膚色不均。',
  },
  peptide: {
    en: 'Peptide complex supporting firmness and fine-line care.',
    ja: 'ペプチド複合成分でハリ不足や目元・口元ケアに好評。',
    'zh-CN': '多重胜肽加持，兼顾紧致轮廓与抗初老需求。',
    'zh-TW': '多重胜肽加持，兼顧緊緻輪廓與細紋撫平。',
  },
  hyaluronic: {
    en: 'Multi-weight hyaluronic hydration for dehydrated skin.',
    ja: 'ヒアルロン酸の濃密保湿でインナードライ対策に好適。',
    'zh-CN': '玻尿酸深层补水，快速缓解干燥紧绷感。',
    'zh-TW': '玻尿酸深層補水，快速緩解乾燥緊繃不適。',
  },
  ceramide: {
    en: 'Ceramide barrier support ideal for dry climates and recovery.',
    ja: 'セラミド配合で乾燥環境でも肌のバリア機能をしっかり保護。',
    'zh-CN': '神经酰胺强化肌肤屏障，干燥气候下持久锁水。',
    'zh-TW': '神經醯胺強化肌膚屏障，乾燥氣候也能長效鎖水。',
  },
  honey: {
    en: 'Nourishing honey extract for overnight softness and glow.',
    ja: 'ハチミツ由来成分でしっとりツヤ感のある仕上がりを実現。',
    'zh-CN': '蜂蜜滋养精粹，令肌肤呈现柔润光泽感。',
    'zh-TW': '蜂蜜滋養精粹，賦予肌膚柔嫩水亮光澤。',
  },
  rice: {
    en: 'Gentle rice-derived care for soft brightening and daily polish.',
    ja: 'お米由来成分でつるんと透明感のある肌へ導く定番ケア。',
    'zh-CN': '大米温和精粹，日常清洁同时提亮肤色。',
    'zh-TW': '大米溫和精粹，日常清潔同時柔嫩提亮。',
  },
  artemisia: {
    en: 'Korean artemisia extract prized for soothing reactive skin.',
    ja: '韓国産ヨモギエキスが敏感になった肌を穏やかに整えます。',
    'zh-CN': '韩国艾草精粹舒缓修护，缓解肌肤燥热敏感。',
    'zh-TW': '韓國艾草精粹溫和舒緩，安撫敏弱不適膚況。',
  },
  teaTree: {
    en: 'Tea tree clarifying care tailored for blemish-prone routines.',
    ja: 'ティーツリー配合で皮脂バランスや肌荒れ予防に人気。',
    'zh-CN': '茶树净颜配方，帮助平衡油脂与痘肌护理。',
    'zh-TW': '茶樹淨顏配方，協助平衡油脂與調理痘肌。',
  },
};

function extractSizeToken(item: RankingItem): string | null {
  const haystack = `${item.name.en} ${item.name.ko}`;
  const match = haystack.match(/\b(\d+(?:\.\d+)?\s?(?:ml|g|mg|ea|sheets?|pcs|매|개))\b/i);
  return match ? match[1].replace(/\s+/g, '') : null;
}

function detectIngredientFocus(item: RankingItem): IngredientFocus | null {
  const haystack = `${item.name.en} ${item.name.ko}`;
  for (const rule of INGREDIENT_RULES) {
    if (rule.pattern.test(haystack)) {
      return rule.focus;
    }
  }
  return null;
}

function formatSizeBadge(sizeToken: string | null, locale: PublicLocale): string {
  if (!sizeToken) return '';
  switch (locale) {
    case 'ja':
      return `（${sizeToken}仕様）`;
    case 'zh-CN':
      return `（${sizeToken} 规格）`;
    case 'zh-TW':
      return `（${sizeToken} 規格）`;
    case 'en':
    default:
      return ` (${sizeToken} size)`;
  }
}

export function getProductEditorialNote(
  item: RankingItem,
  locale: PublicLocale,
  variant: 'full' | 'compact' = 'full'
): string {
  const kind = detectProductKind(item);
  if (variant === 'compact') {
    return `${formatCompactLead(item, locale)} ${COMPACT_KIND_NOTES[kind][locale]}`;
  }

  const custom = item.editorial_summary?.[locale]?.trim();
  if (custom) {
    return custom;
  }

  const { cue, discountPct } = detectChannelCue(item);
  const ingredient = detectIngredientFocus(item);
  const sizeBadge = formatSizeBadge(extractSizeToken(item), locale);
  const focusNote = ingredient ? INGREDIENT_NOTES[ingredient][locale] : KIND_NOTES[kind][locale];

  return `${formatRankAndBrandLead(item, locale)}${sizeBadge} ${focusNote} ${getChannelCueNote(cue, locale, discountPct)}`;
}
