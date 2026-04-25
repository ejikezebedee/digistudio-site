import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { updateJobRequestStatus } from '@/lib/db';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const form = await request.formData();
  updateJobRequestStatus(Number(id), String(form.get('status') || 'New'));
  return NextResponse.redirect(new URL('/admin', request.url));
}
