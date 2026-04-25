import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { addTestimonial, deleteTestimonial } from '@/lib/db';

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const form = await request.formData();
  if (form.get('_method') === 'delete') {
    deleteTestimonial(Number(form.get('id')));
  } else {
    addTestimonial(String(form.get('name') || ''), String(form.get('role') || ''), String(form.get('quote') || ''));
  }
  return NextResponse.redirect(new URL('/admin', request.url));
}
