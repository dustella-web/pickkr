import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  buildBreadcrumbJsonLd,
  buildLocaleAlternates,
  buildPageMetadata,
  DEFAULT_OG_IMAGE,
  getSiteBaseUrl,
  toOpenGraphLocale,
} from '../metadata';
import { buildAdSenseMetaOther, buildAdsTxtContent } from '@/lib/seo/adsense';
import { metadata as adminMetadata } from '@/app/admin/layout';
import { metadata as rootLayoutMetadata } from '@/app/layout';
import { metadata as rootPageMetadata } from '@/app/page';
import { generateMetadata as generateHomeMetadata } from '@/app/[locale]/page';
import nextConfig from '../../../../next.config';
import { getUiMessages } from '@/lib/i18n/messages';
import { LEGAL_LAST_UPDATED } from '@/lib/content/legal-pages';
import sitemap from '@/app/sitemap';

describe('seo metadata helpers', () => {
  it('should build hreflang alternates for all 4 public locales plus x-default', () => {
    const baseUrl = getSiteBaseUrl();
    const alternates = buildLocaleAlternates('en', '/channel/lottedfs');

    expect(alternates.canonical).toBe(`${baseUrl}/en/channel/lottedfs`);
    expect(alternates.languages).toEqual({
      en: `${baseUrl}/en/channel/lottedfs`,
      ja: `${baseUrl}/ja/channel/lottedfs`,
      'zh-CN': `${baseUrl}/zh-CN/channel/lottedfs`,
      'zh-TW': `${baseUrl}/zh-TW/channel/lottedfs`,
      'x-default': `${baseUrl}/en/channel/lottedfs`,
    });
  });

  it('should handle root locale path without trailing slash', () => {
    const baseUrl = getSiteBaseUrl();
    const alternates = buildLocaleAlternates('ja', '');

    expect(alternates.canonical).toBe(`${baseUrl}/ja`);
    expect(alternates.languages['x-default']).toBe(`${baseUrl}/en`);
  });

  it('should configure noindex and nofollow on /admin layout metadata', () => {
    expect(adminMetadata.robots).toEqual({ index: false, follow: false });
  });

  it('should format ads.txt record from AdSense client ID', () => {
    expect(buildAdsTxtContent('ca-pub-1234567890123456')).toBe(
      'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n'
    );
    expect(buildAdsTxtContent('pub-1234567890123456')).toBe(
      'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n'
    );
    expect(buildAdsTxtContent(undefined)).toMatch(/^# PickKR ads\.txt/);
    expect(buildAdsTxtContent('')).toMatch(/^# PickKR ads\.txt/);
  });

  it('should default site base URL to PickKR and build AdSense metadata.other', () => {
    const prev = process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    try {
      expect(getSiteBaseUrl()).toBe('https://pickkr.vercel.app');
    } finally {
      if (prev !== undefined) process.env.NEXT_PUBLIC_SITE_URL = prev;
    }

    expect(buildAdSenseMetaOther('ca-pub-1234567890123456')).toEqual({
      'google-adsense-account': 'ca-pub-1234567890123456',
    });
    expect(buildAdSenseMetaOther(undefined)).toBeUndefined();
    expect(buildAdSenseMetaOther('  ')).toBeUndefined();
  });

  it('should generate deterministic sitemap timestamps and exclude /admin', async () => {
    const first = await sitemap();
    await new Promise((r) => setTimeout(r, 15));
    const second = await sitemap();

    expect(first.length).toBe(second.length);
    expect(first.some((entry) => entry.url.includes('/admin'))).toBe(false);

    const serialize = (entries: typeof first) =>
      entries.map((e) => ({
        url: e.url,
        lastModified:
          e.lastModified instanceof Date ? e.lastModified.toISOString() : e.lastModified,
      }));
    expect(serialize(first)).toEqual(serialize(second));

    const legalEntry = first.find((entry) => entry.url.endsWith('/en/legal/privacy'));
    expect(legalEntry).toBeDefined();
    const legalLastMod =
      legalEntry?.lastModified instanceof Date
        ? legalEntry.lastModified.toISOString()
        : String(legalEntry?.lastModified);
    expect(legalLastMod.startsWith(LEGAL_LAST_UPDATED)).toBe(true);

    for (const entry of first) {
      expect(Object.keys(entry.alternates?.languages ?? {}).sort()).toEqual([
        'en',
        'ja',
        'x-default',
        'zh-CN',
        'zh-TW',
      ]);
    }
  });

  it('should build OpenGraph metadata and descriptive home page title', async () => {
    expect(toOpenGraphLocale('en')).toBe('en_US');
    expect(toOpenGraphLocale('ja')).toBe('ja_JP');
    expect(toOpenGraphLocale('zh-CN')).toBe('zh_CN');
    expect(toOpenGraphLocale('zh-TW')).toBe('zh_TW');

    const meta = buildPageMetadata({
      locale: 'en',
      subPath: '/guides',
      title: 'Shopping Guides | PickKR',
      description: 'Guide summary',
    });
    expect(meta.openGraph).toEqual({
      title: 'Shopping Guides | PickKR',
      description: 'Guide summary',
      url: `${getSiteBaseUrl()}/en/guides`,
      siteName: 'PickKR',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Shopping Guides | PickKR',
        },
      ],
    });
    expect(meta.twitter).toEqual({
      card: 'summary_large_image',
      title: 'Shopping Guides | PickKR',
      description: 'Guide summary',
      images: [DEFAULT_OG_IMAGE],
    });

    const t = getUiMessages('en');
    const homeMeta = await generateHomeMetadata({
      params: Promise.resolve({ locale: 'en' }),
    });
    expect(String(homeMeta.title).length).toBeGreaterThan(15);
    expect(String(homeMeta.title)).toContain('PickKR');
    expect(String(homeMeta.title)).toContain(t.siteSubtitle);
    expect(homeMeta.openGraph).toBeDefined();
  });

  it('should build BreadcrumbList JSON-LD with 1-based positions and absolute URLs', () => {
    const baseUrl = getSiteBaseUrl();
    const jsonLd = buildBreadcrumbJsonLd([
      { name: 'PickKR', path: '/en' },
      { name: 'Shopping Guides', path: '/en/guides' },
    ]);

    expect(jsonLd).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'PickKR',
          item: `${baseUrl}/en`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Shopping Guides',
          item: `${baseUrl}/en/guides`,
        },
      ],
    });
  });

  it('should configure root redirect and canonical metadata on root page', async () => {
    const redirects = await nextConfig.redirects?.();
    expect(redirects).toContainEqual({
      source: '/',
      destination: '/en',
      permanent: false,
    });
    expect(rootPageMetadata?.alternates?.canonical).toBe(`${getSiteBaseUrl()}/en`);
  });

  it('should include naver-site-verification meta tag in root layout metadata', () => {
    expect(rootLayoutMetadata.verification).toEqual({
      other: {
        'naver-site-verification': '19d4de2d66d200a2d4acd246a441afc7506d7ef1',
      },
    });
  });

  it('should serve the Google Search Console verification HTML file from public/', () => {
    const filePath = join(process.cwd(), 'public', 'googlea554b8885522e5b6.html');
    const content = readFileSync(filePath, 'utf8');
    expect(content).toBe('google-site-verification: googlea554b8885522e5b6.html');
  });
});
