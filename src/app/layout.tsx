import type { Metadata } from 'next';
import { buildAdSenseMetaOther, getAdSenseClientId } from '@/lib/seo/adsense';
import { getSiteBaseUrl } from '@/lib/seo/metadata';
import './globals.css';

const adsenseOther = buildAdSenseMetaOther(getAdSenseClientId());

export const metadata: Metadata = {
  metadataBase: new URL(getSiteBaseUrl()),
  title: 'PickKR',
  description:
    'Korea Travel Beauty Guide & Weekly Top 20 Best Sellers from Lotte Duty Free, MISSHA, and DAISO Korea.',
  ...(adsenseOther ? { other: adsenseOther } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
