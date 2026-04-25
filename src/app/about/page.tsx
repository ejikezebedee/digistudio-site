import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Tracker } from '@/components/tracker';
import { BRAND_NAME } from '@/lib/config';

export default function AboutPage() {
  return (
    <main>
      <Tracker path="/about" />
      <SiteHeader />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">About</p>
          <h1 className="mt-3 text-4xl font-bold">{BRAND_NAME} builds premium digital products and serious client deliverables.</h1>
          <div className="mt-6 space-y-5 text-base leading-8 text-slate-300">
            <p>
              The brand exists to produce elegant story-led digital products while also serving clients who need premium websites, automation systems, market intelligence, structured documents, and modern digital business tools.
            </p>
            <p>
              The business combines creative production with operational capability. That means the site is not only a storefront for digital products; it is also a conversion-ready platform for custom project requests and service delivery.
            </p>
            <p>
              Clients should work with the brand because it is positioned as a serious digital studio: modern presentation, structured execution, premium delivery quality, and the ability to handle both creative and technical work in one place.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
