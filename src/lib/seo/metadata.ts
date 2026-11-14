import type { Metadata } from 'next';
import { PUBLIC_LOCALES, type PublicLocale } from '@/lib/i18n/messages';

const DEFAULT_BASE_URL = 'https://pickkr.vercel.app';

export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80';

const OG_LOCALE_MAP: Record<PublicLocale, string> = {
  en: 'en_US',
  ja: 'ja_JP',
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
};

/**
 * Maps public route locale codes to standard OpenGraph locale identifiers.
 */
export function toOpenGraphLocale(locale: PublicLocale): string {
  return OG_LOCALE_MAP[locale];
}

export function getSiteBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE_URL;
  return raw.replace(/\/+$/, '');
}

/**
 * Builds canonical URL and hreflang alternates for all 4 public locales + x-default (/en).
 */
export function buildLocaleAlternates(locale: PublicLocale, subPath: string) {
  const baseUrl = getSiteBaseUrl();
  const normalizedSubPath = subPath
    ? subPath.startsWith('/')
      ? subPath
      : `/${subPath}`
    : '';

  const languages: Record<string, string> = {};
  for (const loc of PUBLIC_LOCALES) {
    languages[loc] = `${baseUrl}/${loc}${normalizedSubPath}`;
  }
  languages['x-default'] = `${baseUrl}/en${normalizedSubPath}`;

  return {
    canonical: `${baseUrl}/${locale}${normalizedSubPath}`,
    languages,
  };
}

/**
 * Builds page-level Metadata including OpenGraph fields, Twitter cards, and hreflang alternates.
 */
export function buildPageMetadata({
  locale,
  subPath,
  title,
  description,
  type = 'website',
  image,
}: {
  locale: PublicLocale;
  subPath: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
  image?: string;
}): Metadata {
  const alternates = buildLocaleAlternates(locale, subPath);
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: 'PickKR',
      locale: toOpenGraphLocale(locale),
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Builds a schema.org BreadcrumbList JSON-LD payload with 1-based positions and absolute URLs.
 */
export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  const baseUrl = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${baseUrl}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}
