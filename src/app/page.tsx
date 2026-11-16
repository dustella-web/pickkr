import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import LocaleHomePage from './[locale]/page';
import { GoogleAnalytics } from '@/components/google-analytics';
import { getUiMessages } from '@/lib/i18n/messages';
import { getAdSenseClientId } from '@/lib/seo/adsense';
import { getGoogleAnalyticsId } from '@/lib/seo/analytics';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 43200; // 12 hours (2 updates per day)

const enMessages = getUiMessages('en');

export const metadata: Metadata = buildPageMetadata({
  locale: 'en',
  subPath: '',
  title: `${enMessages.siteTitle} | ${enMessages.siteSubtitle}`,
  description: enMessages.siteSubtitle,
});

export default async function RootPage() {
  const adsenseId = getAdSenseClientId();
  const gaId = getGoogleAnalyticsId();

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {adsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
        <LocaleHomePage params={Promise.resolve({ locale: 'en' })} />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Analytics />
      </body>
    </html>
  );
}
