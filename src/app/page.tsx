import Link from 'next/link';
import { NewsletterForm } from '@/components/newsletter-form';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Tracker } from '@/components/tracker';
import { BRAND_NAME } from '@/lib/config';
import { featuredProducts, getHomepageSettings, listServices, listTestimonials } from '@/lib/db'
import { formatPrice } from '@/lib/utils';

export default async function HomePage() {
  const homepage = await getHomepageSettings();
  const products = await featuredProducts(3);
  const services = (await listServices()).slice(0, 6);
  const testimonials = await listTestimonials();

  return (
    <main>
      <Tracker path="/" />
      <SiteHeader />
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Premium digital production & marketplace</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">{homepage.hero_headline}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{homepage.hero_subheading}</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">{homepage.brand_intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/store" className="rounded-xl bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">Explore Products</Link>
              <Link href="/request-job" className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:bg-white/5">Request a Digital Job</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl shadow-black/30">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {['Storybooks', 'Digital Productions', 'Client Services'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-amber-200">{item}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">Designed to help {BRAND_NAME} sell products and win serious client work with a premium presentation.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Featured productions</p>
              <h2 className="mt-3 text-3xl font-bold">High-conversion digital products ready to sell</h2>
            </div>
            <Link href="/store" className="text-sm font-semibold text-amber-200">View store →</Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <Link key={product.slug} href={`/store/${product.slug}`} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 transition hover:border-amber-300/40 hover:-translate-y-1">
                <img src={product.image_url} alt={product.title} className="h-64 w-full rounded-2xl object-cover" />
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.24em] text-amber-200">{product.category}</p>
                  <p className="text-sm font-semibold text-white">{formatPrice(product.price_cents)}</p>
                </div>
                <h3 className="mt-3 text-2xl font-semibold">{product.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{product.short_description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Service highlights</p>
          <h2 className="mt-3 text-3xl font-bold">Professional services packaged for serious clients</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Testimonials</p>
          <h2 className="mt-3 text-3xl font-bold">What clients should feel when they work with the brand</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                <p className="text-base leading-7 text-slate-300">“{item.quote}”</p>
                <p className="mt-5 text-sm font-semibold text-white">{item.name}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <NewsletterForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
