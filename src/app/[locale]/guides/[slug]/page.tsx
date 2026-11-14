import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PUBLIC_LOCALES, getUiMessages, isPublicLocale, type PublicLocale } from '@/lib/i18n/messages';
import {
  GUIDE_ARTICLES,
  formatReadingTime,
  getGuideBySlug,
  getGuideCoverImage,
  getLocalizedCategory,
  getRelatedGuides,
} from '@/lib/content/guides';
import { buildBreadcrumbJsonLd, buildPageMetadata, getSiteBaseUrl } from '@/lib/seo/metadata';
import { PublicShell } from '@/components/ranking-view';

export function generateStaticParams() {
  return PUBLIC_LOCALES.flatMap((locale) =>
    GUIDE_ARTICLES.map((article) => ({ locale, slug: article.slug }))
  );
}

const RELATED_HEADING: Record<PublicLocale, string> = {
  en: 'Recommended K-Beauty Guides',
  ja: 'あわせて読みたいショッピングガイド',
  'zh-CN': '相关韩国美妆购物指南推荐',
  'zh-TW': '相關韓國美妝購物攻略推薦',
};

const EDITORIAL_BYLINE: Record<PublicLocale, { authorLabel: string; note: string }> = {
  en: {
    authorLabel: 'By PickKR Editorial Team',
    note: 'Independently researched & cross-checked against Korean storefront snapshots and traveler regulations.',
  },
  ja: {
    authorLabel: '執筆・監修: PickKR Editorial Team',
    note: '韓国主要ストアの週間ランキングおよび最新の免税・渡航ルールをもとに独自調査・検証しています。',
  },
  'zh-CN': {
    authorLabel: '撰稿与核验：PickKR Editorial Team',
    note: '由 PickKR 编辑团队基于韩国官方渠道榜单快照与现行退税、航空携带规范独立整理核对。',
  },
  'zh-TW': {
    authorLabel: '撰稿與校對：PickKR Editorial Team',
    note: '由 PickKR 編輯團隊依據韓國官方通路熱銷快照與最新退稅、機場隨身規範獨立查核編寫。',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPublicLocale(locale)) return {};
  const article = getGuideBySlug(slug);
  if (!article) return {};
  const t = getUiMessages(locale);

  return buildPageMetadata({
    locale,
    subPath: `/guides/${slug}`,
    title: `${article.title[locale]} | ${t.siteTitle}`,
    description: article.summary[locale],
    type: 'article',
    image: getGuideCoverImage(slug),
  });
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isPublicLocale(locale)) {
    notFound();
  }

  const article = getGuideBySlug(slug);
  if (!article) {
    notFound();
  }

  const t = getUiMessages(locale);
  const coverImage = getGuideCoverImage(slug);
  const relatedGuides = getRelatedGuides(slug, 3);
  const baseUrl = getSiteBaseUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[locale],
    description: article.summary[locale],
    image: coverImage,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: locale,
    mainEntityOfPage: `${baseUrl}/${locale}/guides/${slug}`,
    author: {
      '@type': 'Organization',
      name: 'PickKR Editorial Team',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: t.siteTitle,
      url: baseUrl,
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: t.siteTitle, path: `/${locale}` },
    { name: t.guidesTitle, path: `/${locale}/guides` },
    { name: article.title[locale], path: `/${locale}/guides/${slug}` },
  ]);

  return (
    <PublicShell locale={locale} activeSection="guides" subPath={`/guides/${slug}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-[#dee3e9] bg-white">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#f1f4f7]">
          <img
            src={coverImage}
            alt={article.title[locale]}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="p-6 md:p-10">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs tabular-nums text-[#5d6c7b]">
            <Link
              href={`/${locale}/guides`}
              className="rounded-full bg-[#f1f4f7] px-3 py-1 font-bold text-[#0a1317] transition-colors hover:bg-[#dee3e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
            >
              {t.guidesTitle}
            </Link>
            <span className="text-[#8595a4]">/</span>
            <span className="font-bold text-[#4b4c4f]">
              {getLocalizedCategory(article.category, locale)}
            </span>
            <span className="text-[#8595a4]">· {article.publishedAt}</span>
            <span className="text-[#8595a4]">
              · {formatReadingTime(article.readingMinutes, locale)}
            </span>
          </div>

          <h1 className="text-2xl font-medium leading-[1.2] tracking-tight text-[#0a1317] md:text-4xl">
            {article.title[locale]}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4b4c4f] md:text-lg">
            {article.summary[locale]}
          </p>

          <div className="mt-6 rounded-[20px] border border-[#dee3e9] bg-[#f1f4f7] px-5 py-4 text-xs leading-5 text-[#4b4c4f]">
            <p className="font-bold text-[#0a1317]">{EDITORIAL_BYLINE[locale].authorLabel}</p>
            <p className="mt-1">{EDITORIAL_BYLINE[locale].note}</p>
          </div>

          <div className="mt-8 space-y-8 border-t border-[#dee3e9] pt-8">
            {article.sections[locale].map((sec) => (
              <section key={sec.heading}>
                <h2 className="text-xl font-bold text-[#0a1317]">{sec.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-[#1c1e21]">{sec.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#dee3e9] pt-8">
            <Link
              href={`/${locale}/guides`}
              className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#444950] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
            >
              {t.guidesTitle}
            </Link>
            <Link
              href={`/${locale}`}
              className="rounded-full border-2 border-[#0a1317] px-6 py-2.5 text-sm font-bold text-[#0a1317] transition-colors hover:bg-[#f1f4f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
            >
              {t.allSummary}
            </Link>
            {(['lottedfs', 'missha', 'daisomall'] as const).map((ch) => (
              <Link
                key={ch}
                href={`/${locale}/channel/${ch}`}
                className="rounded-full border border-[#ced0d4] bg-[#f1f4f7] px-4 py-2 text-xs font-bold text-[#1c1e21] transition-colors hover:border-[#0a1317] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
              >
                {t.channels[ch]} Top 20
              </Link>
            ))}
          </div>
        </div>
      </article>

      {relatedGuides.length > 0 && (
        <section className="mx-auto mt-12 max-w-4xl rounded-[32px] border border-[#dee3e9] bg-[#f1f4f7] p-6 md:p-8">
          <h2 className="text-lg font-bold tracking-tight text-[#0a1317] md:text-xl">
            {RELATED_HEADING[locale]}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </section>
      )}
    </PublicShell>
  );
}
