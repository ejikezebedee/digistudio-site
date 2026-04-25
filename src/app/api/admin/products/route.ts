import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { deleteProduct, upsertProduct } from '@/lib/db';
import { saveUpload } from '@/lib/storage';

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  if (url.searchParams.get('id') && (request.headers.get('content-type') || '').includes('application/x-www-form-urlencoded')) {
    const form = await request.formData();
    if (form.get('_method') === 'delete') {
      deleteProduct(Number(url.searchParams.get('id')));
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  const form = await request.formData();
  if (form.get('_method') === 'delete') {
    deleteProduct(Number(form.get('id')));
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  let imageUrl = String(form.get('image_url') || '');
  let audioUrl = String(form.get('audio_url') || '');
  const imageFile = form.get('image_file');
  const audioFile = form.get('audio_file');
  if (imageFile instanceof File && imageFile.size > 0) imageUrl = await saveUpload(imageFile, 'products');
  if (audioFile instanceof File && audioFile.size > 0) audioUrl = await saveUpload(audioFile, 'audio');

  upsertProduct({
    id: form.get('id') ? Number(form.get('id')) : undefined,
    title: String(form.get('title') || ''),
    short_description: String(form.get('short_description') || ''),
    long_description: String(form.get('long_description') || ''),
    price_cents: Number(form.get('price_cents') || 0),
    category: String(form.get('category') || ''),
    image_url: imageUrl || '/covers/storybook-1.svg',
    audio_url: audioUrl || null,
    featured: form.get('featured') ? 1 : 0,
  });
  return NextResponse.redirect(new URL('/admin', request.url));
}
