import { describe, expect, it } from 'vitest';
import { buildLocalizedPath } from '@/components/language-switcher';

describe('LanguageSwitcher path builder', () => {
  it('preserves guide and legal subpaths when switching locales', () => {
    expect(
      buildLocalizedPath('/en/guides/seoul-kbeauty-shopping-channels-compared', 'ja')
    ).toBe('/ja/guides/seoul-kbeauty-shopping-channels-compared');
    expect(buildLocalizedPath('/zh-CN/legal/privacy', 'zh-TW')).toBe(
      '/zh-TW/legal/privacy'
    );
    expect(buildLocalizedPath('/ja/channel/missha', 'en')).toBe(
      '/en/channel/missha'
    );
    expect(buildLocalizedPath('/en', 'ja')).toBe('/ja');
  });

  it('falls back to activeChannel or locale root when pathname is empty', () => {
    expect(buildLocalizedPath(null, 'ja', 'daisomall')).toBe(
      '/ja/channel/daisomall'
    );
    expect(buildLocalizedPath(undefined, 'zh-CN')).toBe('/zh-CN');
  });

  it('preserves explicit subPath when pathname is unavailable during SSR', () => {
    expect(
      buildLocalizedPath(
        null,
        'ja',
        undefined,
        '/guides/seoul-kbeauty-shopping-channels-compared'
      )
    ).toBe('/ja/guides/seoul-kbeauty-shopping-channels-compared');
    expect(buildLocalizedPath(undefined, 'zh-TW', undefined, '/legal/privacy')).toBe(
      '/zh-TW/legal/privacy'
    );
  });
});
