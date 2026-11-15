import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@/components/google-analytics';
import { PUBLIC_LOCALES, isPublicLocale } from '@/lib/i18n/messages';
import { buildAdSenseMetaOther, getAdSenseClientId } from '@/lib/seo/adsense';
import { getGoogleAnalyticsId } from '@/lib/seo/analytics';

export function generateStaticParams() {
  return PUBLIC_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata(): Metadata {
  const other = buildAdSenseMetaOther(getAdSenseClientId());
  return other ? { other } : {};
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isPublicLocale(locale)) {
    notFound();
  }

  const adsenseId = getAdSenseClientId();
  const gaId = getGoogleAnalyticsId();

  return (
    <html lang={locale}>
      <body className="min-h-screen antialiased">
        {adsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Analytics />
      </body>
    </html>
  );
}
