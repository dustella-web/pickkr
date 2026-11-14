import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ChannelId } from '@/types/ranking';
import { readChannelSnapshot } from '@/lib/storage/json-store';
import { PUBLIC_LOCALES, getUiMessages, isPublicLocale } from '@/lib/i18n/messages';
import { getChannelEditorial } from '@/lib/content/channel-editorial';
import {
  getGuideBySlug,
  getGuideCoverImage,
  getLocalizedCategory,
} from '@/lib/content/guides';
import { buildBreadcrumbJsonLd, buildPageMetadata, getSiteBaseUrl } from '@/lib/seo/metadata';
import { PublicShell, RankingGrid } from '@/components/ranking-view';

const VALID_CHANNELS: ChannelId[] = ['lottedfs', 'missha', 'daisomall'];

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
  const snapshot = await readChannelSnapshot('published', ch);
  const topItems = snapshot?.items.slice(0, 20) ?? [];
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

      {snapshot && snapshot.items.length > 0 ? (
        <section>
          <h2 className="sr-only">
            {t.channels[ch]} {t.weeklyTop20Badge}
          </h2>
          <RankingGrid items={snapshot.items.slice(0, 20)} locale={locale} />
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
