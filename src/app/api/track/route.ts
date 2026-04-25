import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  trackEvent(body.productSlug ? 'product_view' : 'page_view', String(body.path || '/'), {
    productSlug: body.productSlug || null,
    visitorId: body.visitorId || null,
    source: body.source || 'direct',
  });
  return NextResponse.json({ ok: true });
}
