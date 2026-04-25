import { NextResponse } from 'next/server';
import { addNewsletterSubscriber } from '@/lib/db';
import { newsletterSchema } from '@/lib/validators';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  addNewsletterSubscriber(parsed.data.email);
  return NextResponse.json({ message: 'You are subscribed.' });
}
