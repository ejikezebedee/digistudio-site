import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { updateHomepageSettings } from '@/lib/db';

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const form = await request.formData();
  updateHomepageSettings({
    hero_headline: String(form.get('hero_headline') || ''),
    hero_subheading: String(form.get('hero_subheading') || ''),
    brand_intro: String(form.get('brand_intro') || ''),
  });
  return NextResponse.redirect(new URL('/admin', request.url));
}
