'use client';

import { useState } from 'react';

/**
 * Renders a product image with graceful fallback UI when the external CDN fails or is missing.
 */
export function ProductImage({
  src,
  alt,
  fallbackLabel,
  loading = 'lazy',
  className = 'absolute inset-0 h-full w-full object-cover',
}: {
  src?: string | null;
  alt: string;
  fallbackLabel: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f1f4f7] to-[#e4e9ef] p-2 text-center"
      >
        <span className="line-clamp-2 text-[11px] font-bold tracking-tight text-[#5d6c7b]">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
