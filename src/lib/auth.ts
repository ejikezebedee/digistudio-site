import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_PASSWORD, SESSION_COOKIE } from './config';

export async function isAuthenticated() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === 'authenticated';
}

export async function requireAuth() {
  if (!(await isAuthenticated())) redirect('/login');
}

export function verifyPassword(password: string) {
  return password === ADMIN_PASSWORD;
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}
