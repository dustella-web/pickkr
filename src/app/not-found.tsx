import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#f1f4f7] p-6 text-[#1c1e21]">
        <div className="w-full max-w-lg rounded-[32px] border border-[#dee3e9] bg-white p-8 text-center md:p-12">
          <div className="flex justify-center">
            <BrandLogo size="md" />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#5d6c7b]">
            404 · Page Not Found
          </p>
          <h1 className="mt-2 text-2xl font-medium tracking-tight text-[#0a1317] md:text-3xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#4b4c4f]">
            The ranking or guide page you requested may have moved. Explore our weekly Top 20 Korean beauty rankings or travel shopping guides below.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/en"
              className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#444950] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
            >
              Go to Home
            </Link>
            <Link
              href="/en/guides"
              className="rounded-full border-2 border-[#0a1317] px-6 py-2.5 text-sm font-bold text-[#0a1317] transition-colors hover:bg-[#f1f4f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a1317]"
            >
              Shopping Guides
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
