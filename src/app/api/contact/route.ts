import { NextResponse } from 'next/server';
import { addContactMessage } from '@/lib/db';
import { contactSchema } from '@/lib/validators';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid contact form input.' }, { status: 400 });
  addContactMessage(parsed.data.name, parsed.data.email, parsed.data.message);
  return NextResponse.json({ message: 'Your message has been received.' });
}
