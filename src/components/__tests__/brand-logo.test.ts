import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { PUBLIC_LOCALES, getUiMessages } from '@/lib/i18n/messages';
import { BRAND_NAME, BrandLogo } from '@/components/brand-logo';

describe('PickKR brand identity', () => {
  it('uses PickKR consistently across all locale siteTitle messages', () => {
    expect(BRAND_NAME).toBe('PickKR');
    for (const locale of [...PUBLIC_LOCALES, 'ko'] as const) {
      expect(getUiMessages(locale).siteTitle).toBe('PickKR');
    }
  });

  it('renders SVG brand mark and PickKR wordmark', () => {
    const html = renderToStaticMarkup(createElement(BrandLogo, { size: 'lg' }));
    expect(html).toContain('<svg');
    expect(html).toContain('Pick');
    expect(html).toContain('KR');
  });
});
