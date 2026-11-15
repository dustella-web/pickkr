import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ChannelId } from '@/types/ranking';
import { readChannelSnapshot } from '@/lib/storage/json-store';
import { PUBLIC_LOCALES, getUiMessages, isPublicLocale } from '@/lib/i18n/messages';
import { formatProductPrice } from '@/lib/i18n/format-price';
import {
  GUIDE_ARTICLES,
  getGuideCoverImage,
  getLocalizedCategory,
} from '@/lib/content/guides';
import {
  getChannelEditorial,
  getHomeEditorial,
} from '@/lib/content/channel-editorial';
import { buildPageMetadata, buildProductImageAlt, getSiteBaseUrl } from '@/lib/seo/metadata';
import { BrandLogo } from '@/components/brand-logo';
import { PublicShell, RankingGrid } from '@/components/ranking-view';

const CHANNELS: ChannelId[] = ['lottedfs', 'missha', 'daisomall'];

export function generateStaticParams() {
  return PUBLIC_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isPublicLocale(locale)) return {};
  const t = getUiMessages(locale);
  return buildPageMetadata({
    locale,
    subPath: '',
    title: `${t.siteTitle} | ${t.siteSubtitle}`,
    description: t.siteSubtitle,
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isPublicLocale(locale)) {
    notFound();
  }

  const t = getUiMessages(locale);
  const homeEditorial = getHomeEditorial(locale);
  const snapshots = await Promise.all(
    CHANNELS.map(async (ch) => ({
      channel: ch,
      snapshot: await readChannelSnapshot('published', ch),
    }))
  );

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t.siteTitle,
    description: t.siteSubtitle,
    url: `${getSiteBaseUrl()}/${locale}`,
    inLanguage: locale,
  };

  return (
    <PublicShell locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="space-y-16 md:space-y-20">
        {/* Asymmetric Split Hero (unslop: text left + real #1 product highlights right) */}
        <section className="rounded-[32px] border border-[#dee3e9] bg-[#f1f4f7] p-6 md:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-block rounded-full bg-[#0a1317] px-3.5 py-1 text-xs font-bold text-white">
                {t.heroBadge}
              </span>
              <div className="mt-5">
                <BrandLogo size="lg" />
              </div>
              <h1 className="mt-4 max-w-xl text-base font-medium text-[#4b4c4f] md:text-lg">
                <span className="sr-only">{t.siteTitle} — </span>
                {t.siteSubtitle}
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}/channel/lottedfs`}
                  className="rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#444950] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
                >
                  {t.viewTop20}
                </Link>
                <Link
                  href={`/${locale}/guides`}
                  className="rounded-full border-2 border-[#0a1317] bg-transparent px-7 py-3 text-sm font-bold text-[#0a1317] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
                >
                  {t.guidesTitle}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[24px] border border-[#dee3e9] bg-white p-5">
                <h2 className="text-xs font-bold text-[#5d6c7b]">{t.heroHighlightTitle}</h2>
                <div className="mt-3 divide-y divide-[#dee3e9]">
                  {snapshots.map(({ channel, snapshot }) => {
                    const topItem = snapshot?.items?.[0];
                    if (!topItem) return null;
                    const itemBrand = topItem.brand[locale]?.trim() || topItem.brand.ko;
                    const itemName = topItem.name[locale]?.trim() || topItem.name.ko;
                    return (
                      <Link
                        key={channel}
                        href={`/${locale}/channel/${channel}`}
                        className="flex items-center gap-3.5 py-3 transition-colors first:pt-1 last:pb-1 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[12px] bg-[#f1f4f7]">
                          {topItem.image_url && (
                            <img
                              src={topItem.image_url}
                              alt={buildProductImageAlt(itemBrand, itemName)}
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-bold text-[#5d6c7b]">
                            {t.channels[channel]}
                          </span>
                          <span className="mt-0.5 block truncate text-sm font-bold text-[#0a1317]">
                            {itemName}
                          </span>
                        </div>
                        <span className="shrink-0 text-sm font-bold tabular-nums text-[#0a1317]">
                          {formatProductPrice(topItem, locale)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {snapshots.map(({ channel, snapshot }) => (
          <section key={channel}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-medium tracking-tight text-[#0a1317] md:text-3xl">
                  {t.channels[channel]}
                </h2>
                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#4b4c4f]">
                  {getChannelEditorial(channel).copy[locale].homeSummary}
                </p>
                {snapshot && (
                  <p className="mt-1 text-xs font-bold tabular-nums text-[#5d6c7b]">
                    {t.weeklyUpdate}: {snapshot.snapshot_id}
                  </p>
                )}
              </div>
              <Link
                href={`/${locale}/channel/${channel}`}
                className="rounded-full border-2 border-[#0a1317]/15 px-5 py-2 text-xs font-bold text-[#0a1317] transition-colors hover:border-[#0a1317] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
              >
                {t.viewTop20}
              </Link>
            </div>

            {snapshot && snapshot.items.length > 0 ? (
              <RankingGrid items={snapshot.items.slice(0, 8)} locale={locale} variant="compact" />
            ) : (
              <div className="rounded-[24px] border border-dashed border-[#ced0d4] bg-white p-10 text-center text-sm text-[#8595a4]">
                {t.emptyChannel}
              </div>
            )}
          </section>
        ))}

        {/* Editorial Shopping Guides (DESIGN.md: 32px rounding, 24px gap, three-tier hierarchy) */}
        <section className="border-t border-[#dee3e9] pt-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-[#0a1317] md:text-3xl">
                {t.guidesTitle}
              </h2>
              <p className="mt-1.5 text-sm text-[#4b4c4f]">{t.guidesSubtitle}</p>
            </div>
            <Link
              href={`/${locale}/guides`}
              className="rounded-full bg-black px-6 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#444950] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
            >
              {t.readGuide}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GUIDE_ARTICLES.slice(0, 6).map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/guides/${article.slug}`}
                className="flex flex-col overflow-hidden rounded-[32px] border border-[#dee3e9] bg-white transition-colors hover:border-[#ced0d4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#f1f4f7]">
                  <img
                    src={getGuideCoverImage(article.slug)}
                    alt={article.title[locale]}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded-full bg-[#f1f4f7] px-3 py-1 text-xs font-bold text-[#4b4c4f]">
                      {getLocalizedCategory(article.category, locale)}
                    </span>
                    <span className="text-xs tabular-nums text-[#8595a4]">
                      {article.publishedAt}
                    </span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 min-h-[3rem] text-base font-bold leading-6 text-[#0a1317]">
                    {article.title[locale]}
                  </h3>
                  <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-[#4b4c4f]">
                    {article.summary[locale]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#dee3e9] bg-[#f1f4f7] p-6 md:p-10">
          <h2 className="text-xl font-bold tracking-tight text-[#0a1317] md:text-2xl">
            {homeEditorial.heading}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[#4b4c4f] md:text-base">
            {homeEditorial.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>
      </div>
    </PublicShell>
  );
}
