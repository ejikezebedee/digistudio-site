import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Tracker } from '@/components/tracker';
import { getProductBySlug, getRelatedProducts } from '@/lib/db';
import { formatPrice } from '@/lib/utils';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product.category, product.slug);

  return (
    <main>
      <Tracker path={`/store/${slug}`} productSlug={slug} />
      <SiteHeader />
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <img src={product.image_url} alt={product.title} className="w-full rounded-[2rem] border border-white/10 object-cover" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">{product.category}</p>
            <h1 className="mt-3 text-5xl font-bold">{product.title}</h1>
            <p className="mt-4 text-xl font-semibold text-white">{formatPrice(product.price_cents)}</p>
            <p className="mt-6 text-base leading-8 text-slate-300">{product.long_description}</p>
            {product.audio_url ? <audio className="mt-6 w-full" controls src={product.audio_url} /> : null}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950">Add to Cart</button>
              <button className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-white">Buy Now</button>
            </div>
            <p className="mt-4 text-sm text-slate-500">Payment-ready structure included. Live gateway can be connected during deployment.</p>
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Related products</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/store/${item.slug}`} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <img src={item.image_url} alt={item.title} className="h-48 w-full rounded-2xl object-cover" />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.short_description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
