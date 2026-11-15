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
  verification: {
    other: {
      'naver-site-verification': '19d4de2d66d200a2d4acd246a441afc7506d7ef1',
    },
  },
  ...(adsenseOther ? { other: adsenseOther } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
