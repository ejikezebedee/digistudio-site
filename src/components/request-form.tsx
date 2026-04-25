'use client';

import { useState } from 'react';

export function RequestForm({ categories }: { categories: string[] }) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const response = await fetch('/api/request-job', { method: 'POST', body: form });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (response.ok) e.currentTarget.reset();
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 md:grid-cols-2">
      <input name="name" required placeholder="Name" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
      <input name="email" type="email" required placeholder="Email" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
      <input name="phone" placeholder="Phone / WhatsApp" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
      <input name="company_name" placeholder="Company name" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
      <select name="service_category" required className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm md:col-span-2">
        <option value="">Select service category</option>
        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
      </select>
      <input name="budget_range" placeholder="Budget range" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
      <input name="deadline" type="date" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
      <textarea name="project_description" required placeholder="Describe your project" rows={6} className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm md:col-span-2" />
      <input name="attachment" type="file" className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm md:col-span-2" />
      <label className="flex items-center gap-3 text-sm text-slate-300 md:col-span-2">
        <input name="consent" type="checkbox" value="1" required className="h-4 w-4" />
        I consent to being contacted about this request.
      </label>
      <button disabled={loading} className="rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 md:col-span-2">{loading ? 'Submitting...' : 'Submit Request'}</button>
      {message ? <p className="text-sm text-amber-200 md:col-span-2">{message}</p> : null}
    </form>
  );
}
