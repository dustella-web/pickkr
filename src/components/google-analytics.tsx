import Script from 'next/script';
import {
  buildGoogleAnalyticsInitScript,
  buildGoogleAnalyticsScriptSrc,
} from '@/lib/seo/analytics';

/**
 * Render Google Analytics 4 (gtag.js) scripts when a measurement ID is provided.
 */
export function GoogleAnalytics({ gaId }: { gaId?: string }) {
  const trimmed = gaId?.trim();
  if (!trimmed) {
    return null;
  }

  return (
    <>
      <Script
        src={buildGoogleAnalyticsScriptSrc(trimmed)}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {buildGoogleAnalyticsInitScript(trimmed)}
      </Script>
    </>
  );
}
