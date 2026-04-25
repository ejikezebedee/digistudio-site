import { NextResponse } from 'next/server';
import { verifyPassword, getSessionCookieName } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  if (!verifyPassword(String(body.password || ''))) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(getSessionCookieName(), 'authenticated', { httpOnly: true, sameSite: 'lax', path: '/' });
  return response;
}
