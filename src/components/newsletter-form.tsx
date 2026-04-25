'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (response.ok) setEmail('');
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <label className="block text-sm font-medium text-white">Newsletter signup</label>
      <p className="mt-2 text-sm text-slate-400">Get updates on new productions, releases, and service availability.</p>
      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Enter your email" className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm outline-none focus:border-amber-300" />
        <button className="rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950">Subscribe</button>
      </div>
      {message ? <p className="mt-3 text-sm text-amber-200">{message}</p> : null}
    </form>
  );
}
