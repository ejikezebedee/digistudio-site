'use client';

import { useState } from 'react';

export function ContactForm() {
  const [message, setMessage] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (response.ok) e.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <input name="name" required placeholder="Name" className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
      <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
      <textarea name="message" required rows={6} placeholder="Message" className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
      <button className="rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950">Send Message</button>
      {message ? <p className="text-sm text-amber-200">{message}</p> : null}
    </form>
  );
}
