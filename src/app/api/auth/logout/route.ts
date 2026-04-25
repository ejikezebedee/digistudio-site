import { NextResponse } from 'next/server';
import { getSessionCookieName } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.redirect(new URL('/login', 'http://localhost'));
  response.cookies.set(getSessionCookieName(), '', { expires: new Date(0), path: '/' });
  return response;
}
