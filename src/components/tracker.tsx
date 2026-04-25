'use client';

import { useEffect } from 'react';

function getVisitorId() {
  const key = 'digistudio_visitor_id';
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const created = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(key, created);
  return created;
}

export function Tracker({ path, productSlug }: { path: string; productSlug?: string }) {
  useEffect(() => {
    const visitorId = getVisitorId();
    void fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, productSlug, visitorId, source: document.referrer ? 'referral' : 'direct' }),
    });
  }, [path, productSlug]);

  return null;
}
