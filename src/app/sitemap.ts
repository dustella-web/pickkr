import type { MetadataRoute } from 'next';
import { PUBLIC_LOCALES, type PublicLocale } from '@/lib/i18n/messages';
import { buildLocaleAlternates } from '@/lib/seo/metadata';
import { GUIDE_ARTICLES } from '@/lib/content/guides';
import { LEGAL_LAST_UPDATED, LEGAL_SLUGS } from '@/lib/content/legal-pages';
import { readChannelSnapshot } from '@/lib/storage/json-store';

const CHANNELS = ['lottedfs', 'missha', 'daisomall'] as const;
const FIXED_SITE_MODIFIED = new Date('2026-11-14T00:00:00.000Z');
const LEGAL_MODIFIED = new Date(`${LEGAL_LAST_UPDATED}T00:00:00.000Z`);

function buildSitemapEntry(
  locale: PublicLocale,
  subPath: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number
): MetadataRoute.Sitemap[number] {
  const alternates = buildLocaleAlternates(locale, subPath);
  return {
    url: alternates.canonical,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: alternates.languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const channelDates = new Map<(typeof CHANNELS)[number], Date>();
  for (const channel of CHANNELS) {
    const snapshot = await readChannelSnapshot('published', channel);
    const modified = snapshot?.published_at
      ? new Date(snapshot.published_at)
      : FIXED_SITE_MODIFIED;
    channelDates.set(channel, modified);
  }

  const latestChannelDate = Array.from(channelDates.values()).reduce(
    (latest, cur) => (cur.getTime() > latest.getTime() ? cur : latest),
    FIXED_SITE_MODIFIED
  );

  const latestGuideDate = GUIDE_ARTICLES.reduce((latest, article) => {
    const dt = new Date(article.publishedAt);
    return dt.getTime() > latest.getTime() ? dt : latest;
  }, FIXED_SITE_MODIFIED);

  for (const locale of PUBLIC_LOCALES) {
    entries.push(buildSitemapEntry(locale, '', latestChannelDate, 'weekly', 1.0));

    for (const channel of CHANNELS) {
      entries.push(
        buildSitemapEntry(
          locale,
          `/channel/${channel}`,
          channelDates.get(channel) ?? FIXED_SITE_MODIFIED,
          'weekly',
          0.9
        )
      );
    }

    entries.push(buildSitemapEntry(locale, '/guides', latestGuideDate, 'weekly', 0.8));

    for (const guide of GUIDE_ARTICLES) {
      entries.push(
        buildSitemapEntry(
          locale,
          `/guides/${guide.slug}`,
          new Date(guide.publishedAt),
          'monthly',
          0.7
        )
      );
    }

    for (const legal of LEGAL_SLUGS) {
      entries.push(buildSitemapEntry(locale, `/legal/${legal}`, LEGAL_MODIFIED, 'yearly', 0.3));
    }
  }

  return entries;
}
