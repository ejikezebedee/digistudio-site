import { RequestForm } from '@/components/request-form';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Tracker } from '@/components/tracker';
import { listServices } from '@/lib/db';

export default async function RequestJobPage() {
  const categories = (await listServices()).map((item) => item.name);
  return (
    <main>
      <Tracker path="/request-job" />
      <SiteHeader />
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Request a digital job</p>
            <h1 className="mt-3 text-4xl font-bold">Tell us what you need built, produced, or delivered.</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Submit your project details, preferred budget, timeline, and files if needed. The admin team can then review, quote, and manage your request from the dashboard.
            </p>
          </div>
          <RequestForm categories={categories} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
