export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `item-${Date.now()}`;
}

export function todayIso() {
  return new Date().toISOString();
}
