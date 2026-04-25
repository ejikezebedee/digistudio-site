import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Tracker } from '@/components/tracker';
import { listProducts } from '@/lib/db';
import { formatPrice } from '@/lib/utils';

export default async function StorePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';
  const category = typeof params.category === 'string' ? params.category : '';
  const products = await listProducts(query, category);
  const categories = [...new Set((await listProducts()).map((item) => item.category))];

  return (
    <main>
      <Tracker path="/store" />
      <SiteHeader />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Store</p>
          <h1 className="mt-3 text-4xl font-bold">Digital products and storybooks</h1>
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <form className="space-y-4">
                <input name="q" defaultValue={query} placeholder="Search products" className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm" />
                <select name="category" defaultValue={category} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm">
                  <option value="">All categories</option>
                  {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <button className="w-full rounded-xl bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950">Filter</button>
              </form>
            </aside>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <div key={product.slug} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                  <img src={product.image_url} alt={product.title} className="h-56 w-full rounded-2xl object-cover" />
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-amber-200">{product.category}</p>
                    <p className="text-sm font-semibold text-white">{formatPrice(product.price_cents)}</p>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold">{product.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{product.short_description}</p>
                  {product.audio_url ? <audio className="mt-4 w-full" controls src={product.audio_url} /> : null}
                  <div className="mt-5 flex gap-3">
                    <Link href={`/store/${product.slug}`} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium">View</Link>
                    <Link href={`/store/${product.slug}`} className="rounded-xl bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950">Buy Now</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
