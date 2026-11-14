export const BRAND_NAME = 'PickKR';

type BrandLogoSize = 'sm' | 'md' | 'lg';

const SIZE_STYLES: Record<
  BrandLogoSize,
  { iconClass: string; textClass: string; gapClass: string }
> = {
  sm: {
    iconClass: 'h-7 w-7',
    textClass: 'text-lg leading-none',
    gapClass: 'gap-2',
  },
  md: {
    iconClass: 'h-9 w-9',
    textClass: 'text-2xl leading-none',
    gapClass: 'gap-2.5',
  },
  lg: {
    iconClass: 'h-11 w-11 md:h-12 md:w-12',
    textClass: 'text-3xl md:text-5xl leading-none',
    gapClass: 'gap-3 md:gap-3.5',
  },
};

/**
 * Geometric PickKR brand symbol mark combining a clean 'P' letterform and a cobalt curation check.
 */
export function BrandMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#0a1317" />
      <path
        d="M9 22.5V10H14.8C17.1 10 18.6 11.4 18.6 13.6C18.6 15.8 17.1 17.2 14.8 17.2H9"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 20.4L19.4 23L24.5 16"
        stroke="#0064e0"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * PickKR brand lockup pairing the geometric symbol mark with the two-tone PickKR wordmark.
 */
export function BrandLogo({
  size = 'sm',
  className = '',
}: {
  size?: BrandLogoSize;
  className?: string;
}) {
  const styles = SIZE_STYLES[size];
  return (
    <span className={`inline-flex items-center ${styles.gapClass} ${className}`}>
      <BrandMark className={`shrink-0 ${styles.iconClass}`} />
      <span className={`font-bold tracking-tight ${styles.textClass}`}>
        <span className="text-[#0a1317]">Pick</span>
        <span className="text-[#0064e0]">KR</span>
      </span>
    </span>
  );
}
