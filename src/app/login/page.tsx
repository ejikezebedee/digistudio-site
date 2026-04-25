'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: form.get('password') }),
    });
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Login failed');
      setLoading(false);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <main>
      <SiteHeader />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Admin access</p>
          <h1 className="mt-3 text-3xl font-bold">Sign in to the dashboard</h1>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <input name="password" type="password" required placeholder="Admin password" className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
            <button disabled={loading} className="w-full rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950">{loading ? 'Signing in...' : 'Login'}</button>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
