import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionCookieName, isAuthenticated } from '@/lib/auth';
import { getAnalyticsSummary, getHomepageSettings, listJobRequests, listNewsletterSubscribers, listProducts, listServices, listTestimonials } from '@/lib/db';
import { formatPrice } from '@/lib/utils';

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!(await isAuthenticated())) redirect('/login');
  const params = await searchParams;
  const status = typeof params.status === 'string' ? params.status : '';
  const category = typeof params.category === 'string' ? params.category : '';
  const products = await listProducts();
  const requests = await listJobRequests({ status: status || undefined, category: category || undefined });
  const analytics = await getAnalyticsSummary();
  const testimonials = await listTestimonials();
  const services = await listServices();
  const homepage = await getHomepageSettings();
  const subscribers = await listNewsletterSubscribers() as Array<{ id: number; email: string; created_at: string }>;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Admin dashboard</p>
            <h1 className="mt-2 text-4xl font-bold">DIGISTUDIO control center</h1>
          </div>
          <form action="/api/auth/logout" method="post">
            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm">Logout</button>
          </form>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total visitors" value={String(analytics.totalVisitors)} />
          <MetricCard label="Page views" value={String(analytics.pageViews)} />
          <MetricCard label="Product views" value={String(analytics.productViews)} />
          <MetricCard label="Job requests" value={String(analytics.jobRequestSubmissions)} />
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Panel title="Product management" subtitle="Add, edit, feature, and delete products.">
              <form action="/api/admin/products" method="post" encType="multipart/form-data" className="grid gap-4 md:grid-cols-2">
                <input name="title" required placeholder="Title" className="field" />
                <input name="category" required placeholder="Category" className="field" />
                <input name="price_cents" type="number" required placeholder="Price in cents" className="field" />
                <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm"><input type="checkbox" name="featured" value="1" /> Featured on homepage</label>
                <textarea name="short_description" required placeholder="Short description" className="field md:col-span-2" rows={3} />
                <textarea name="long_description" required placeholder="Long description" className="field md:col-span-2" rows={5} />
                <input name="image_url" placeholder="Image URL (optional if uploading cover)" className="field md:col-span-2" />
                <input type="file" name="image_file" className="field md:col-span-2" />
                <input name="audio_url" placeholder="Audio URL (optional if uploading preview)" className="field md:col-span-2" />
                <input type="file" name="audio_file" className="field md:col-span-2" />
                <button className="rounded-xl bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950 md:col-span-2">Add product</button>
              </form>
              <div className="mt-6 space-y-4">
                {products.map((product) => (
                  <form key={product.id} action="/api/admin/products" method="post" className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <input type="hidden" name="id" value={product.id} />
                    <div className="grid gap-3 md:grid-cols-2">
                      <input name="title" defaultValue={product.title} className="field" />
                      <input name="category" defaultValue={product.category} className="field" />
                      <input name="price_cents" defaultValue={product.price_cents} className="field" />
                      <input name="image_url" defaultValue={product.image_url} className="field" />
                      <input name="audio_url" defaultValue={product.audio_url ?? ''} className="field md:col-span-2" />
                      <textarea name="short_description" defaultValue={product.short_description} rows={2} className="field md:col-span-2" />
                      <textarea name="long_description" defaultValue={product.long_description} rows={4} className="field md:col-span-2" />
                      <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="featured" value="1" defaultChecked={product.featured === 1} /> Featured</label>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button className="rounded-lg bg-white/10 px-4 py-2 text-sm">Save</button>
                      <button formAction={`/api/admin/products?id=${product.id}`} formMethod="post" name="_method" value="delete" className="rounded-lg border border-rose-400/40 px-4 py-2 text-sm text-rose-200">Delete</button>
                      <span className="text-sm text-slate-400">{formatPrice(product.price_cents)} · {product.slug}</span>
                    </div>
                  </form>
                ))}
              </div>
            </Panel>

            <Panel title="Storybook / production listening area" subtitle="Listen to all uploaded productions with preview audio.">
              <div className="space-y-4">
                {products.filter((p) => p.audio_url).map((product) => (
                  <div key={product.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{product.title}</p>
                        <p className="text-sm text-slate-400">{product.category}</p>
                      </div>
                      <p className="text-sm text-slate-500">Preview player</p>
                    </div>
                    <audio className="mt-4 w-full" controls src={product.audio_url ?? undefined} />
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Order / request management" subtitle="Review client submissions and update status.">
              <form className="mb-4 grid gap-3 md:grid-cols-3">
                <input name="category" defaultValue={category} placeholder="Filter by service category" className="field" />
                <select name="status" defaultValue={status} className="field">
                  <option value="">All statuses</option>
                  {['New', 'In Review', 'Quoted', 'In Progress', 'Completed'].map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <button className="rounded-xl border border-white/10 px-4 py-3 text-sm">Apply filters</button>
              </form>
              <div className="space-y-4">
                {requests.map((request) => (
                  <form key={request.id} action={`/api/admin/requests/${request.id}`} method="post" className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{request.name} · {request.service_category}</p>
                        <p className="text-sm text-slate-400">{request.email} · {request.phone || 'No phone'} · {request.company_name || 'No company'}</p>
                      </div>
                      <select name="status" defaultValue={request.status} className="rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm">
                        {['New', 'In Review', 'Quoted', 'In Progress', 'Completed'].map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{request.project_description}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                      <span>Budget: {request.budget_range || 'N/A'}</span>
                      <span>Deadline: {request.deadline || 'N/A'}</span>
                      <span>Created: {request.created_at.slice(0, 10)}</span>
                      {request.file_url ? <Link href={request.file_url} className="text-amber-200">Attachment</Link> : null}
                    </div>
                    <button className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm">Update status</button>
                  </form>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-8">
            <Panel title="Analytics dashboard" subtitle="Traffic, products, and conversion signals.">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-white">Most viewed products</p>
                  <ul className="mt-2 space-y-2 text-slate-300">
                    {analytics.mostViewedProducts.map((item) => <li key={item.slug}>{item.slug} — {item.views} views</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">Traffic sources</p>
                  <ul className="mt-2 space-y-2 text-slate-300">
                    {analytics.trafficSources.map((item) => <li key={item.source}>{item.source} — {item.visits}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">Daily / weekly / monthly trend sample</p>
                  <ul className="mt-2 space-y-2 text-slate-300">
                    {analytics.dailyViews.map((item) => <li key={item.day}>{item.day} — {item.views} views</li>)}
                  </ul>
                  <p className="mt-3 text-slate-400">Store conversion rate: {analytics.storeConversionRate}%</p>
                </div>
              </div>
            </Panel>

            <Panel title="Admin content controls" subtitle="Homepage copy, service descriptions, testimonials, and subscribers.">
              <form action="/api/admin/homepage" method="post" className="space-y-3">
                <input name="hero_headline" defaultValue={homepage.hero_headline} className="field" />
                <textarea name="hero_subheading" defaultValue={homepage.hero_subheading} rows={4} className="field" />
                <textarea name="brand_intro" defaultValue={homepage.brand_intro} rows={4} className="field" />
                <button className="rounded-lg bg-white/10 px-4 py-2 text-sm">Save homepage copy</button>
              </form>
              <div className="mt-6 space-y-3">
                {services.map((service) => (
                  <form key={service.id} action={`/api/admin/services/${service.id}`} method="post" className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="font-semibold">{service.name}</p>
                    <textarea name="description" defaultValue={service.description} rows={3} className="field" />
                    <button className="rounded-lg bg-white/10 px-4 py-2 text-sm">Save service</button>
                  </form>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="font-semibold">Add testimonial</p>
                <form action="/api/admin/testimonials" method="post" className="mt-3 space-y-3">
                  <input name="name" placeholder="Client name" className="field" />
                  <input name="role" placeholder="Role" className="field" />
                  <textarea name="quote" placeholder="Quote" rows={3} className="field" />
                  <button className="rounded-lg bg-white/10 px-4 py-2 text-sm">Add testimonial</button>
                </form>
                <div className="mt-4 space-y-2 text-sm text-slate-300">
                  {testimonials.map((item) => (
                    <form key={item.id} action="/api/admin/testimonials" method="post" className="flex items-center justify-between gap-3 rounded-xl border border-white/10 p-3">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="_method" value="delete" />
                      <span>{item.name} — {item.role}</span>
                      <button className="text-rose-200">Delete</button>
                    </form>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="font-semibold">Newsletter subscribers</p>
                <div className="mt-3 space-y-2 text-sm text-slate-300">
                  {subscribers.map((item) => <p key={item.id}>{item.email} — {item.created_at.slice(0, 10)}</p>)}
                </div>
              </div>
            </Panel>
          </div>
        </section>
      </div>
      <style>{`.field{width:100%;border-radius:0.9rem;border:1px solid rgba(255,255,255,.1);background:rgba(2,6,23,.8);padding:.85rem 1rem;font-size:.9rem;color:#e2e8f0}`}</style>
    </main>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm uppercase tracking-[0.24em] text-amber-200">{label}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}
