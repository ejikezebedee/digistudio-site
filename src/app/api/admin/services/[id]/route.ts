import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { updateService } from '@/lib/db';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const form = await request.formData();
  updateService(Number(id), String(form.get('description') || ''));
  return NextResponse.redirect(new URL('/admin', request.url));
}
