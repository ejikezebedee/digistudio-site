import { NextResponse } from 'next/server';
import { createJobRequest } from '@/lib/db';
import { saveUpload } from '@/lib/storage';
import { jobRequestSchema } from '@/lib/validators';

export async function POST(request: Request) {
  const form = await request.formData();
  const attachment = form.get('attachment');
  let fileUrl: string | null = null;
  if (attachment instanceof File && attachment.size > 0) {
    fileUrl = await saveUpload(attachment, 'requests');
  }
  const parsed = jobRequestSchema.safeParse({
    name: form.get('name'),
    email: form.get('email'),
    phone: form.get('phone'),
    company_name: form.get('company_name'),
    service_category: form.get('service_category'),
    project_description: form.get('project_description'),
    budget_range: form.get('budget_range'),
    deadline: form.get('deadline'),
    consent: form.get('consent') ? 1 : 0,
    file_url: fileUrl ?? null as string | null | undefined,
  });
  if (!parsed.success) return NextResponse.json({ error: 'Please complete the form correctly.' }, { status: 400 });
  createJobRequest({ ...parsed.data, file_url: parsed.data.file_url ?? null });
  return NextResponse.json({ message: 'Request submitted successfully.' });
}
