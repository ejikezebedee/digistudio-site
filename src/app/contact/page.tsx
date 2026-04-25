import { ContactForm } from '@/components/contact-form';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Tracker } from '@/components/tracker';

export default function ContactPage() {
  return (
    <main>
      <Tracker path="/contact" />
      <SiteHeader />
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Contact</p>
            <h1 className="mt-3 text-4xl font-bold">Start a conversation about a product, commission, or digital service.</h1>
            <div className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
              <p>Email: hello@example.com</p>
              <p>WhatsApp: https://wa.me/491234567890</p>
              <p>Instagram: https://instagram.com/example</p>
              <p>LinkedIn: https://linkedin.com</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
