import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getUiMessages, PUBLIC_LOCALES } from '@/lib/i18n/messages';
import { getAdSenseClientId } from '@/lib/seo/adsense';
import { buildPageMetadata } from '@/lib/seo/metadata';

const enMessages = getUiMessages('en');

export const metadata: Metadata = buildPageMetadata({
  locale: 'en',
  subPath: '',
  title: `${enMessages.siteTitle} — ${enMessages.siteSubtitle}`,
  description: enMessages.siteSubtitle,
});

export default function RootPage() {
  const adsenseId = getAdSenseClientId();

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en" />
      </head>
      <body className="min-h-screen bg-[#f8f9fa] text-[#0a1317] antialiased">
        {adsenseId && (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
        <main className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-2xl font-bold tracking-tight text-[#0a1317]">
            {enMessages.siteTitle} — {enMessages.siteSubtitle}
          </h1>
          <p className="mt-4 text-sm text-[#4b4c4f]">
            Redirecting to the English edition. Select your preferred language below:
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {PUBLIC_LOCALES.map((loc) => (
              <li key={loc}>
                <Link
                  href={`/${loc}`}
                  className="inline-block rounded-full border border-[#dee3e9] bg-white px-4 py-2 text-sm font-bold text-[#0a1317] hover:border-[#0a1317]"
                >
                  {getUiMessages(loc).siteTitle} ({loc})
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
