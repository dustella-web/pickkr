import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ChannelId } from '@/types/ranking';
import { readChannelSnapshot } from '@/lib/storage/json-store';
import { PUBLIC_LOCALES, getUiMessages, isPublicLocale, type PublicLocale } from '@/lib/i18n/messages';
import { getExchangeRates, LOCALE_CURRENCY } from '@/lib/i18n/exchange-rates';
import { formatByCurrency } from '@/lib/i18n/format-price';
import {
  computeChannelInsights,
  INSIGHT_CATEGORY_LABELS,
} from '@/lib/content/channel-insights';
import { getChannelEditorial } from '@/lib/content/channel-editorial';
import {
  getGuideBySlug,
  getGuideCoverImage,
  getLocalizedCategory,
} from '@/lib/content/guides';
import { buildBreadcrumbJsonLd, buildPageMetadata, getSiteBaseUrl } from '@/lib/seo/metadata';
import { PublicShell } from '@/components/ranking-view';
import { InteractiveRankingExplorer } from '@/components/interactive-ranking';

const VALID_CHANNELS: ChannelId[] = ['lottedfs', 'missha', 'daisomall'];

const INSIGHT_LABELS: Record<
  PublicLocale,
  { avgPrice: string; onSale: string; maxOff: string; topTrends: string }
> = {
  en: { avgPrice: 'Avg. Top 20 Price', onSale: 'Items on Sale', maxOff: 'Up to', topTrends: 'Leading Categories' },
  ja: { avgPrice: 'Top 20 平均価格', onSale: 'セール対象品', maxOff: '最大', topTrends: '人気カテゴリー' },
  'zh-CN': { avgPrice: 'Top 20 均价', onSale: '折扣商品数', maxOff: '最高', topTrends: '热门品类分布' },
  'zh-TW': { avgPrice: 'Top 20 均價', onSale: '折扣商品數', maxOff: '最高', topTrends: '熱門品類分佈' },
};

export const revalidate = 43200; // 12 hours (2 updates per day)

export function generateStaticParams() {
  return PUBLIC_LOCALES.flatMap((locale) =>
    VALID_CHANNELS.map((channel) => ({ locale, channel }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; channel: string }>;
}): Promise<Metadata> {
  const { locale, channel } = await params;
  if (!isPublicLocale(locale) || !VALID_CHANNELS.includes(channel as ChannelId)) {
    return {};
  }
  const ch = channel as ChannelId;
  const t = getUiMessages(locale);
  const editorialCopy = getChannelEditorial(ch).copy[locale];
  return buildPageMetadata({
    locale,
    subPath: `/channel/${ch}`,
    title: `${t.channels[ch]} Top 20 | ${t.siteTitle}`,
    description: editorialCopy.intro,
  });
}

export default async function ChannelTop20Page({
  params,
}: {
  params: Promise<{ locale: string; channel: string }>;
}) {
  const { locale, channel } = await params;
  if (!isPublicLocale(locale) || !VALID_CHANNELS.includes(channel as ChannelId)) {
    notFound();
  }

  const ch = channel as ChannelId;
  const t = getUiMessages(locale);
  const editorial = getChannelEditorial(ch);
  const editorialCopy = editorial.copy[locale];
  const relatedGuides = editorial.relatedGuideSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));
  const [exchangeSnapshot, snapshot] = await Promise.all([
    getExchangeRates(),
    readChannelSnapshot('published', ch),
  ]);
  const topItems = snapshot?.items.slice(0, 20) ?? [];
  const targetCurrency = LOCALE_CURRENCY[locale];
  const insights = computeChannelInsights(topItems, exchangeSnapshot.rates, targetCurrency);
  const insightLabels = INSIGHT_LABELS[locale];
  const baseUrl = getSiteBaseUrl();
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${t.channels[ch]} Top 20`,
    description: editorialCopy.intro,
    url: `${baseUrl}/${locale}/channel/${ch}`,
    inLanguage: locale,
    numberOfItems: topItems.length,
    itemListElement: topItems.map((item) => ({
      '@type': 'ListItem',
      position: item.rank,
      name: item.name[locale]?.trim() || item.name.ko,
      url: `${baseUrl}/${locale}/channel/${ch}#rank-${item.rank}`,
      ...(item.image_url ? { image: item.image_url } : {}),
    })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: t.siteTitle, path: `/${locale}` },
    { name: `${t.channels[ch]} Top 20`, path: `/${locale}/channel/${ch}` },
  ]);

  return (
    <PublicShell locale={locale} activeChannel={ch}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#dee3e9] pb-6">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-[#f1f4f7] px-3 py-1 text-xs font-bold text-[#4b4c4f]">
            {t.weeklyTop20Badge}
          </span>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-[#0a1317] md:text-4xl">
            {t.channels[ch]} Top 20
          </h1>
          <p className="mt-2.5 text-sm leading-6 text-[#4b4c4f] md:text-base">
            {editorialCopy.intro}
          </p>
        </div>
        {snapshot && (
          <span className="rounded-full border border-[#dee3e9] px-4 py-1.5 text-xs font-bold tabular-nums text-[#5d6c7b]">
            {t.weeklyUpdate}: {snapshot.snapshot_id}
          </span>
        )}
      </div>

      {snapshot && topItems.length > 0 ? (
        <section className="space-y-6">
          <h2 className="sr-only">
            {t.channels[ch]} {t.weeklyTop20Badge}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-[20px] border border-[#dee3e9] bg-white p-4">
              <span className="text-xs font-bold text-[#5d6c7b]">{insightLabels.avgPrice}</span>
              <p className="mt-1 text-2xl font-bold tabular-nums text-[#0a1317]">
                {formatByCurrency(insights.averagePrice, targetCurrency)}
              </p>
            </div>
            <div className="rounded-[20px] border border-[#dee3e9] bg-white p-4">
              <span className="text-xs font-bold text-[#5d6c7b]">{insightLabels.onSale}</span>
              <p className="mt-1 text-2xl font-bold tabular-nums text-[#0a1317]">
                {insights.saleCount} / {insights.itemCount}
                {insights.maxDiscountPct > 0 && (
                  <span className="ml-2 text-xs font-bold text-[#0064e0]">
                    ({insightLabels.maxOff} -{insights.maxDiscountPct}%)
                  </span>
                )}
              </p>
            </div>
            <div className="rounded-[20px] border border-[#dee3e9] bg-white p-4">
              <span className="text-xs font-bold text-[#5d6c7b]">{insightLabels.topTrends}</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {insights.topCategories.map((cat) => (
                  <span
                    key={cat.key}
                    className="rounded-full bg-[#f1f4f7] px-2.5 py-0.5 text-xs font-bold text-[#0a1317]"
                  >
                    {INSIGHT_CATEGORY_LABELS[cat.key][locale]} ({cat.count})
                  </span>
                ))}
              </div>
            </div>
          </div>
          <InteractiveRankingExplorer
            channel={ch}
            items={topItems}
            locale={locale}
            exchangeRates={exchangeSnapshot.rates}
            exchangeUpdatedAt={exchangeSnapshot.updatedAt}
          />
        </section>
      ) : (
        <div className="rounded-[24px] border border-dashed border-[#ced0d4] bg-white p-12 text-center text-sm text-[#8595a4]">
          {t.emptyChannel}
        </div>
      )}

      <section className="mt-14 rounded-[32px] border border-[#dee3e9] bg-[#f1f4f7] p-6 md:p-10">
        <h2 className="text-xl font-bold tracking-tight text-[#0a1317] md:text-2xl">
          {editorialCopy.heading}
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-[#4b4c4f] md:text-base">
          {editorialCopy.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {relatedGuides.length > 0 && (
          <div className="mt-8 border-t border-[#dee3e9] pt-6">
            <h3 className="text-sm font-bold text-[#0a1317]">
              {editorialCopy.relatedGuidesHeading}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${locale}/guides/${guide.slug}`}
                  className="flex flex-col overflow-hidden rounded-[24px] border border-[#dee3e9] bg-white transition-colors hover:border-[#ced0d4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
                >
                  <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[#f1f4f7]">
                    <img
                      src={getGuideCoverImage(guide.slug)}
                      alt={guide.title[locale]}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-xs font-bold text-[#5d6c7b]">
                      {getLocalizedCategory(guide.category, locale)}
                    </span>
                    <p className="mt-1.5 line-clamp-2 text-sm font-bold leading-5 text-[#0a1317]">
                      {guide.title[locale]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </PublicShell>
  );
}
