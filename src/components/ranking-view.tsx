import Link from 'next/link';
import type { ChannelId, RankingItem } from '@/types/ranking';
import {
  LOCALE_META,
  PUBLIC_LOCALES,
  buildLocalizedPath,
  getUiMessages,
  type PublicLocale,
} from '@/lib/i18n/messages';
import { getProductPriceDisplay } from '@/lib/i18n/format-price';
import type { ExchangeRateMap } from '@/lib/i18n/exchange-rates';
import { LanguageSwitcher } from '@/components/language-switcher';
import { BrandLogo } from '@/components/brand-logo';
import { ProductImage } from '@/components/product-image';
import { LEGAL_LABELS, LEGAL_SLUGS } from '@/lib/content/legal-pages';
import { getProductEditorialNote } from '@/lib/content/product-editorial';
import { buildProductImageAlt } from '@/lib/seo/metadata';

const CHANNEL_ORDER: ChannelId[] = ['lottedfs', 'missha', 'daisomall'];

export function PublicShell({
  locale,
  activeChannel,
  activeSection,
  subPath,
  children,
}: {
  locale: PublicLocale;
  activeChannel?: ChannelId;
  activeSection?: 'guides' | 'legal';
  subPath?: string;
  children: React.ReactNode;
}) {
  const t = getUiMessages(locale);
  const legalLabels = LEGAL_LABELS[locale];

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#1c1e21]">
      {/* Promo Banner Strip (DESIGN.md: #0a1317 full-width strip above nav) */}
      <div className="bg-[#0a1317] px-4 py-2.5 text-center text-xs font-bold text-white">
        <span>{t.siteSubtitle}</span>
        <span className="mx-2 text-[#8595a4]">·</span>
        <Link
          href={`/${locale}/guides`}
          className="underline decoration-white/50 underline-offset-4 hover:decoration-white"
        >
          {t.readGuide}
        </Link>
      </div>

      {/* Sticky Top Navigation (DESIGN.md: 64px white bar, hairline-soft bottom, pill tabs) */}
      <header className="sticky top-0 z-30 border-b border-[#dee3e9] bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-3.5 md:px-10">
          <Link
            href={`/${locale}`}
            aria-label={t.siteTitle}
            className="flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
          >
            <BrandLogo size="sm" />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="order-3 flex w-full items-center gap-2 overflow-x-auto pb-1 md:order-2 md:w-auto md:pb-0"
          >
            <Link
              href={`/${locale}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317] ${
                !activeChannel && !activeSection
                  ? 'border-[#0a1317] bg-[#0a1317] text-white'
                  : 'border-[#ced0d4] bg-white text-[#1c1e21] hover:border-[#0a1317] hover:bg-[#f1f4f7]'
              }`}
            >
              {t.allSummary}
            </Link>
            {CHANNEL_ORDER.map((ch) => (
              <Link
                key={ch}
                href={`/${locale}/channel/${ch}`}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317] ${
                  activeChannel === ch
                    ? 'border-[#0a1317] bg-[#0a1317] text-white'
                    : 'border-[#ced0d4] bg-white text-[#1c1e21] hover:border-[#0a1317] hover:bg-[#f1f4f7]'
                }`}
              >
                {t.channels[ch]}
              </Link>
            ))}
            <Link
              href={`/${locale}/guides`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317] ${
                activeSection === 'guides'
                  ? 'border-[#0a1317] bg-[#0a1317] text-white'
                  : 'border-[#ced0d4] bg-white text-[#1c1e21] hover:border-[#0a1317] hover:bg-[#f1f4f7]'
              }`}
            >
              {t.guidesTitle}
            </Link>
          </nav>

          <div className="order-2 md:order-3">
            <LanguageSwitcher
              locale={locale}
              activeChannel={activeChannel}
              subPath={subPath}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 py-10 md:px-10 md:py-12">
        {children}
      </main>

      {/* Footer Region (DESIGN.md: #ffffff, hairline-soft top border, multi-column hierarchy) */}
      <footer className="border-t border-[#dee3e9] bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <BrandLogo size="sm" />
              <p className="mt-2.5 max-w-md text-sm text-[#5d6c7b]">{t.siteSubtitle}</p>
            </div>

            <div>
              <p className="text-sm font-bold text-[#1c1e21]">{t.allSummary}</p>
              <ul className="mt-3 space-y-2 text-sm text-[#5d6c7b]">
                {CHANNEL_ORDER.map((ch) => (
                  <li key={ch}>
                    <Link
                      href={`/${locale}/channel/${ch}`}
                      className="transition hover:text-[#0a1317] hover:underline"
                    >
                      {t.channels[ch]}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/${locale}/guides`}
                    className="transition hover:text-[#0a1317] hover:underline"
                  >
                    {t.guidesTitle}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold text-[#1c1e21]">{t.legalContactHeading}</p>
              <ul className="mt-3 space-y-2 text-sm text-[#5d6c7b]">
                {LEGAL_SLUGS.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${locale}/legal/${slug}`}
                      className="transition-colors hover:text-[#0a1317] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
                    >
                      {legalLabels[slug]}
                    </Link>
                  </li>
                ))}
                <li className="pt-1 text-xs text-[#8595a4]">codenum404@gmail.com</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#dee3e9] pt-6 text-xs text-[#8595a4]">
            <span>© 2026 {t.siteTitle}. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-3">
              {PUBLIC_LOCALES.map((loc) => (
                <Link
                  key={loc}
                  href={buildLocalizedPath(null, loc, activeChannel, subPath)}
                  className={`transition-colors hover:text-[#0a1317] hover:underline ${
                    loc === locale ? 'font-bold text-[#0a1317]' : ''
                  }`}
                >
                  {LOCALE_META[loc].label}
                </Link>
              ))}
            </div>
            <span>Lotte Duty Free · MISSHA · DAISO Korea</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function RankingGrid({
  items,
  locale,
  variant = 'full',
  exchangeRates,
  exchangeUpdatedAt,
}: {
  items: RankingItem[];
  locale: PublicLocale;
  variant?: 'full' | 'compact';
  exchangeRates?: ExchangeRateMap;
  exchangeUpdatedAt?: string;
}) {
  const t = getUiMessages(locale);
  const formattedUpdatedAt = exchangeUpdatedAt
    ? `${exchangeUpdatedAt.slice(0, 16).replace('T', ' ')} UTC`
    : null;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => {
          const displayBrand = item.brand[locale]?.trim() || item.brand.ko;
          const displayName = item.name[locale]?.trim() || item.name.ko;
          const { displayPrice, regularPrice, discountPct, originalPrice } =
            getProductPriceDisplay(item, locale, exchangeRates);
          const editorialNote = getProductEditorialNote(item, locale, variant);

        return (
          <article
            key={`${item.rank}-${item.source_product_id}`}
            id={`rank-${item.rank}`}
            className="flex flex-col rounded-[24px] border border-[#dee3e9] bg-white p-4 transition-colors hover:border-[#ced0d4]"
          >
            <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[16px] bg-[#f1f4f7]">
              <ProductImage
                src={item.image_url}
                alt={buildProductImageAlt(displayBrand, displayName)}
                fallbackLabel={displayBrand}
              />
              <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#0a1317] text-xs font-bold tabular-nums text-white">
                {item.rank}
              </span>
              <div className="absolute right-3 top-3 flex items-center gap-1.5">
                {typeof item.rank_delta === 'number' && item.rank_delta !== 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                      item.rank_delta > 0
                        ? 'bg-[#e6f4ea] text-[#137333]'
                        : 'bg-[#fce8e6] text-[#c5221f]'
                    }`}
                  >
                    {item.rank_delta > 0 ? `▲${item.rank_delta}` : `▼${Math.abs(item.rank_delta)}`}
                  </span>
                )}
                {discountPct !== null && discountPct > 0 && (
                  <span className="rounded-full bg-[#0064e0] px-2 py-0.5 text-[11px] font-bold tabular-nums text-white">
                    -{discountPct}%
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col pt-4">
              <span className="block truncate text-xs font-bold leading-4 text-[#5d6c7b]">
                {displayBrand}
              </span>
              <h3 className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-5 text-[#0a1317]">
                {displayName}
              </h3>
              <p className="mt-1.5 mb-3 line-clamp-2 text-xs leading-5 text-[#4b4c4f]">
                {editorialNote}
              </p>

              <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#dee3e9] pt-3.5">
                <div className="min-w-0">
                  {regularPrice && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium tabular-nums text-[#8595a4] line-through">
                        {regularPrice}
                      </span>
                      {discountPct !== null && (
                        <span className="text-xs font-bold tabular-nums text-[#e11d48]">
                          -{discountPct}%
                        </span>
                      )}
                    </div>
                  )}
                  <span className="block whitespace-nowrap text-base font-bold tabular-nums text-[#0a1317]">
                    {displayPrice}
                  </span>
                  {originalPrice && (
                    <span className="block truncate text-[11px] font-medium tabular-nums text-[#5d6c7b]">
                      ({originalPrice})
                    </span>
                  )}
                </div>
                <a
                  href={item.product_url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="whitespace-nowrap rounded-full bg-[#0064e0] px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#0457cb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0064e0]"
                >
                  {t.buyOfficial}
                </a>
              </div>
            </div>
          </article>
        );
      })}
      </div>
      {exchangeRates && (
        <p className="mt-4 text-xs text-[#5d6c7b]">
          {t.exchangeRateNotice}
          {formattedUpdatedAt ? ` (${formattedUpdatedAt})` : ''}
        </p>
      )}
    </div>
  );
}
