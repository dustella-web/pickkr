'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ChannelId } from '@/types/ranking';
import {
  LOCALE_META,
  PUBLIC_LOCALES,
  buildLocalizedPath,
  type PublicLocale,
} from '@/lib/i18n/messages';

export { buildLocalizedPath };

export function LanguageSwitcher({
  locale,
  activeChannel,
  subPath,
}: {
  locale: PublicLocale;
  activeChannel?: ChannelId;
  subPath?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = LOCALE_META[locale];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-[#ced0d4] bg-white px-4 py-2 text-sm font-bold text-[#1c1e21] transition-colors hover:border-[#0a1317] hover:bg-[#f1f4f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span>{current.label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`text-[#5d6c7b] transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 z-40 mt-2 w-44 overflow-hidden rounded-[16px] border border-[#dee3e9] bg-white p-1.5 shadow-[0_1px_4px_rgba(20,22,26,0.18)]"
        >
          {PUBLIC_LOCALES.map((loc) => {
            const meta = LOCALE_META[loc];
            const isSelected = loc === locale;
            return (
              <li key={loc}>
                <Link
                  href={buildLocalizedPath(pathname, loc, activeChannel, subPath)}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => setOpen(false)}
                  className={`flex w-full items-center gap-2.5 rounded-full px-3.5 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317] ${
                    isSelected
                      ? 'bg-[#0a1317] font-bold text-white'
                      : 'font-medium text-[#1c1e21] hover:bg-[#f1f4f7]'
                  }`}
                >
                  <span aria-hidden="true">{meta.flag}</span>
                  <span>{meta.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
