import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Tracker } from '@/components/tracker';
import { listServices } from '@/lib/db';

export default async function ServicesPage() {
  const services = await listServices();
  return (
    <main>
      <Tracker path="/services" />
      <SiteHeader />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Services</p>
          <h1 className="mt-3 text-4xl font-bold">Professional digital and automation services</h1>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">{service.name}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
