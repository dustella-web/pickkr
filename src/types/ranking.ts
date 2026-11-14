export type ChannelId = 'missha' | 'daisomall' | 'lottedfs';

export const SUPPORTED_LOCALES = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type Currency = 'KRW' | 'USD';

export type LocalizedText = Record<Locale, string>;

export interface RankingItem {
  rank: number;
  rank_delta: number | null;
  source_product_id: string;
  product_url: string;
  image_url: string;
  currency: Currency;
  price: number;
  sale_price: number | null;
  brand: LocalizedText;
  name: LocalizedText;
  category: string;
  editorial_summary: LocalizedText;
}

export interface ChannelSnapshot {
  snapshot_id: string;
  channel: ChannelId;
  status: 'PENDING_REVIEW' | 'PUBLISHED';
  collected_at: string;
  published_at: string | null;
  items: RankingItem[];
}
