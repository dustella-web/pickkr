import { afterEach, describe, expect, it } from 'vitest';
import LocaleLayout from '@/app/[locale]/layout';
import { GoogleAnalytics } from '@/components/google-analytics';
import {
  buildGoogleAnalyticsInitScript,
  buildGoogleAnalyticsScriptSrc,
  getGoogleAnalyticsId,
} from '@/lib/seo/analytics';

describe('Google Analytics helpers', () => {
  const originalGaId = process.env.NEXT_PUBLIC_GA_ID;

  afterEach(() => {
    if (originalGaId === undefined) {
      delete process.env.NEXT_PUBLIC_GA_ID;
    } else {
      process.env.NEXT_PUBLIC_GA_ID = originalGaId;
    }
  });

  it('should return undefined when NEXT_PUBLIC_GA_ID is missing or blank', () => {
    delete process.env.NEXT_PUBLIC_GA_ID;
    expect(getGoogleAnalyticsId()).toBeUndefined();

    process.env.NEXT_PUBLIC_GA_ID = '   ';
    expect(getGoogleAnalyticsId()).toBeUndefined();
  });

  it('should return trimmed NEXT_PUBLIC_GA_ID when configured', () => {
    process.env.NEXT_PUBLIC_GA_ID = '  G-TEST123456  ';
    expect(getGoogleAnalyticsId()).toBe('G-TEST123456');
  });

  it('should build gtag.js script src URL for the given measurement ID', () => {
    expect(buildGoogleAnalyticsScriptSrc('G-TEST123456')).toBe(
      'https://www.googletagmanager.com/gtag/js?id=G-TEST123456'
    );
  });

  it('should build gtag initialization script with serialized measurement ID', () => {
    const script = buildGoogleAnalyticsInitScript('G-TEST123456');
    expect(script).toContain('window.dataLayer = window.dataLayer || [];');
    expect(script).toContain("gtag('js', new Date());");
    expect(script).toContain('gtag(\'config\', "G-TEST123456");');
  });

  it('should render null from GoogleAnalytics when gaId is missing', () => {
    expect(GoogleAnalytics({ gaId: undefined })).toBeNull();
    expect(GoogleAnalytics({ gaId: '   ' })).toBeNull();
  });

  it('should render GoogleAnalytics inside locale layout body only when NEXT_PUBLIC_GA_ID is set', async () => {
    delete process.env.NEXT_PUBLIC_GA_ID;
    const treeWithoutGa = (await LocaleLayout({
      children: 'test-child',
      params: Promise.resolve({ locale: 'en' }),
    })) as { props: { children: { props: { children: unknown[] } } } };
    const bodyWithoutGa = treeWithoutGa.props.children.props.children;
    const hasGaWhenUnset = bodyWithoutGa.some(
      (child) =>
        typeof child === 'object' &&
        child !== null &&
        'type' in child &&
        (child as { type: unknown }).type === GoogleAnalytics
    );
    expect(hasGaWhenUnset).toBe(false);

    process.env.NEXT_PUBLIC_GA_ID = 'G-TEST123456';
    const treeWithGa = (await LocaleLayout({
      children: 'test-child',
      params: Promise.resolve({ locale: 'en' }),
    })) as { props: { children: { props: { children: unknown[] } } } };
    const bodyWithGa = treeWithGa.props.children.props.children;
    const gaElement = bodyWithGa.find(
      (child) =>
        typeof child === 'object' &&
        child !== null &&
        'type' in child &&
        (child as { type: unknown }).type === GoogleAnalytics
    ) as { props?: { gaId?: string } } | undefined;

    expect(gaElement).toBeDefined();
    expect(gaElement?.props?.gaId).toBe('G-TEST123456');
  });
});
