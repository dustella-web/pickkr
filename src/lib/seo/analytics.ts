/**
 * Read the Google Analytics 4 measurement ID from NEXT_PUBLIC_GA_ID.
 */
export function getGoogleAnalyticsId(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return raw ? raw : undefined;
}

/**
 * Build the external gtag.js script URL for the given GA4 measurement ID.
 */
export function buildGoogleAnalyticsScriptSrc(gaId: string): string {
  return `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
}

/**
 * Build the inline gtag.js initialization snippet for the given GA4 measurement ID.
 */
export function buildGoogleAnalyticsInitScript(gaId: string): string {
  return [
    'window.dataLayer = window.dataLayer || [];',
    'function gtag(){dataLayer.push(arguments);}',
    "gtag('js', new Date());",
    `gtag('config', ${JSON.stringify(gaId)});`,
  ].join('\n');
}
