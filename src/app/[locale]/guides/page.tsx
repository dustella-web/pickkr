import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PUBLIC_LOCALES, getUiMessages, isPublicLocale } from '@/lib/i18n/messages';
import {
  GUIDE_ARTICLES,
  formatReadingTime,
  getGuideCoverImage,
  getLocalizedCategory,
} from '@/lib/content/guides';
import { getGuidesIndexEditorial } from '@/lib/content/channel-editorial';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo/metadata';
import { PublicShell } from '@/components/ranking-view';

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
    subPath: '/guides',
    title: `${t.guidesTitle} | ${t.siteTitle}`,
    description: t.guidesSubtitle,
  });
}

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isPublicLocale(locale)) {
    notFound();
  }

  const t = getUiMessages(locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: t.siteTitle, path: `/${locale}` },
    { name: t.guidesTitle, path: `/${locale}/guides` },
  ]);

  return (
    <PublicShell locale={locale} activeSection="guides" subPath="/guides">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mb-8 border-b border-[#dee3e9] pb-6">
        <span className="inline-block rounded-full bg-[#f1f4f7] px-3 py-1 text-xs font-bold text-[#4b4c4f]">
          {t.editorialGuidesBadge}
        </span>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-[#0a1317] md:text-4xl">
          {t.guidesTitle}
        </h1>
        <p className="mt-2 text-base text-[#4b4c4f]">{t.guidesSubtitle}</p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5d6c7b]">
          {getGuidesIndexEditorial(locale)}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {GUIDE_ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="flex flex-col justify-between overflow-hidden rounded-[32px] border border-[#dee3e9] bg-white transition-colors hover:border-[#ced0d4]"
          >
            <div>
              <Link
                href={`/${locale}/guides/${article.slug}`}
                className="relative block aspect-[16/9] w-full overflow-hidden bg-[#f1f4f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
              >
                <img
                  src={getGuideCoverImage(article.slug)}
                  alt={article.title[locale]}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </Link>
              <div className="p-6 pb-0">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs tabular-nums text-[#5d6c7b]">
                  <span className="rounded-full bg-[#f1f4f7] px-3 py-1 font-bold text-[#4b4c4f]">
                    {getLocalizedCategory(article.category, locale)}
                  </span>
                  <span>{article.publishedAt}</span>
                  <span>· {formatReadingTime(article.readingMinutes, locale)}</span>
                </div>
                <h2 className="line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-7 text-[#0a1317]">
                  <Link
                    href={`/${locale}/guides/${article.slug}`}
                    className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
                  >
                    {article.title[locale]}
                  </Link>
                </h2>
                <p className="mt-2.5 line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-[#4b4c4f]">
                  {article.summary[locale]}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-[#dee3e9] px-6 py-4">
              <Link
                href={`/${locale}/guides/${article.slug}`}
                className="rounded-full bg-black px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#444950] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
              >
                {t.readGuide}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PublicShell>
  );
}
