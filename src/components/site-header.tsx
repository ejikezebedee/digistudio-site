import Link from 'next/link';
import { BRAND_NAME } from '@/lib/config';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/store', label: 'Store' },
  { href: '/services', label: 'Services' },
  { href: '/request-job', label: 'Request a Job' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-sm font-bold tracking-[0.25em] text-amber-200">DS</span>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200">{BRAND_NAME}</p>
            <p className="text-xs text-slate-400">Digital production studio</p>
          </div>
        </Link>
        <nav className="hidden flex-wrap gap-2 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5">Admin</Link>
          <Link href="/request-job" className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">Start a Project</Link>
        </div>
      </div>
    </header>
  );
}
