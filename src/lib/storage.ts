import fs from 'node:fs';
import path from 'node:path';

export async function saveUpload(file: File, folder: string) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), 'public', 'uploads', folder);
  fs.mkdirSync(dir, { recursive: true });
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
  const target = path.join(dir, safeName);
  fs.writeFileSync(target, bytes);
  return `/uploads/${folder}/${safeName}`;
}
