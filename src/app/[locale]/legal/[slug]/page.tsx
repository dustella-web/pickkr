import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PUBLIC_LOCALES, getUiMessages, isPublicLocale, type PublicLocale } from '@/lib/i18n/messages';
import { LEGAL_LABELS, LEGAL_SLUGS, getLegalPage, isLegalSlug } from '@/lib/content/legal-pages';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo/metadata';
import { PublicShell } from '@/components/ranking-view';

const LAST_UPDATED_LABELS: Record<PublicLocale, string> = {
  en: 'Last Updated',
  ja: '最終更新日',
  'zh-CN': '最后更新',
  'zh-TW': '最後更新',
};

export function generateStaticParams() {
  return PUBLIC_LOCALES.flatMap((locale) =>
    LEGAL_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPublicLocale(locale) || !isLegalSlug(slug)) return {};
  const page = getLegalPage(slug, locale);
  const t = getUiMessages(locale);

  return buildPageMetadata({
    locale,
    subPath: `/legal/${slug}`,
    title: `${page.title} | ${t.siteTitle}`,
    description: page.paragraphs[0],
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isPublicLocale(locale) || !isLegalSlug(slug)) {
    notFound();
  }

  const page = getLegalPage(slug, locale);
  const t = getUiMessages(locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: t.siteTitle, path: `/${locale}` },
    { name: page.title, path: `/${locale}/legal/${slug}` },
  ]);

  return (
    <PublicShell locale={locale} activeSection="legal" subPath={`/legal/${slug}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="mx-auto max-w-3xl rounded-[32px] border border-[#dee3e9] bg-white p-8 md:p-12">
        <nav aria-label="Legal navigation" className="mb-6 flex flex-wrap gap-2">
          {LEGAL_SLUGS.map((legalSlug) => {
            const isActive = legalSlug === slug;
            return (
              <Link
                key={legalSlug}
                href={`/${locale}/legal/${legalSlug}`}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'rounded-full bg-[#0a1317] px-3.5 py-1.5 text-xs font-bold text-white'
                    : 'rounded-full bg-[#f1f4f7] px-3.5 py-1.5 text-xs font-bold text-[#4b4c4f] transition-colors hover:bg-[#dee3e9] hover:text-[#0a1317]'
                }
              >
                {LEGAL_LABELS[locale][legalSlug]}
              </Link>
            );
          })}
        </nav>

        <div className="border-b border-[#dee3e9] pb-6">
          <h1 className="text-3xl font-medium tracking-tight text-[#0a1317]">{page.title}</h1>
          <p className="mt-3 inline-block rounded-full bg-[#f1f4f7] px-3 py-1 text-xs font-bold tabular-nums text-[#5d6c7b]">
            {LAST_UPDATED_LABELS[locale]}: {page.lastUpdated}
          </p>
        </div>

        <div className="mt-8 space-y-7 text-base leading-relaxed text-[#1c1e21]">
          {page.paragraphs.map((text, idx) => (
            <section key={idx}>
              <h2 className="text-lg font-bold text-[#0a1317]">{page.sectionHeadings[idx]}</h2>
              <p className="mt-2">{text}</p>
            </section>
          ))}
        </div>
      </article>
    </PublicShell>
  );
}
