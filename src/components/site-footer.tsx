import Link from 'next/link';
import { BRAND_NAME } from '@/lib/config';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">{BRAND_NAME}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Premium digital productions, storybooks, creative products, and client-focused service delivery.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <Link href="/store">Store</Link>
            <Link href="/services">Services</Link>
            <Link href="/request-job">Request a Digital Job</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <p className="mt-3 text-sm text-slate-400">Use the contact and request pages to start a conversation or commission a custom project.</p>
        </div>
      </div>
    </footer>
  );
}
