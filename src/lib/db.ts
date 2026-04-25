import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  price_cents: number;
  category: string;
  image_url: string;
  audio_url: string | null;
  featured: number;
  created_at: string;
};

export type ServiceCategory = {
  id: number;
  name: string;
  description: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
};

export type JobRequest = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  service_category: string;
  project_description: string;
  budget_range: string;
  deadline: string;
  file_url?: string | null;
  consent: number;
  status: string;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: number;
  email: string;
  created_at: string;
};

export type HomepageSettings = {
  id: number;
  hero_headline: string;
  hero_subheading: string;
  brand_intro: string;
};

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `item-${Date.now()}`;
}

export function todayIso() {
  return new Date().toISOString();
}

export async function getHomepageSettings(): Promise<HomepageSettings> {
  const { data, error } = await supabase.from('homepage_settings').select('*').eq('id', 1).single();
  if (error || !data) {
    throw new Error(`Failed to load homepage settings: ${error?.message}`);
  }
  return data as HomepageSettings;
}

export async function updateHomepageSettings(payload: Omit<HomepageSettings, 'id'>) {
  const { error } = await supabase.from('homepage_settings').upsert({ ...payload, id: 1 });
  if (error) throw new Error(`Failed to update homepage settings: ${error.message}`);
}

export async function listProducts(search = '', category = ''): Promise<Product[]> {
  let query = supabase.from('products').select('*');
  if (search) {
    query = query.or(`title.ilike.%${search}%,short_description.ilike.%${search}%,long_description.ilike.%${search}%`);
  }
  if (category) {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) throw new Error(`Failed to list products: ${error.message}`);
  const products = (data || []) as Product[];
  return products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function featuredProducts(limit = 3): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').eq('featured', 1).limit(limit);
  if (error) throw new Error(`Failed to list featured products: ${error.message}`);
  const products = (data || []) as Product[];
  return products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
  if (error) return undefined;
  return data as Product;
}

export async function getRelatedProducts(category: string, slug: string): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').eq('category', category).neq('slug', slug).limit(3);
  if (error) throw new Error(`Failed to list related products: ${error.message}`);
  const products = (data || []) as Product[];
  return products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function upsertProduct(payload: {
  id?: number;
  title: string;
  short_description: string;
  long_description: string;
  price_cents: number;
  category: string;
  image_url: string;
  audio_url?: string | null;
  featured?: number;
}) {
  const slug = slugify(payload.title);
  if (payload.id) {
    const { error } = await supabase.from('products').update({
      slug,
      title: payload.title,
      short_description: payload.short_description,
      long_description: payload.long_description,
      price_cents: payload.price_cents,
      category: payload.category,
      image_url: payload.image_url,
      audio_url: payload.audio_url || null,
      featured: payload.featured ? 1 : 0,
    }).eq('id', payload.id);
    if (error) throw new Error(`Failed to update product: ${error.message}`);
  } else {
    const { error } = await supabase.from('products').insert({
      slug,
      title: payload.title,
      short_description: payload.short_description,
      long_description: payload.long_description,
      price_cents: payload.price_cents,
      category: payload.category,
      image_url: payload.image_url,
      audio_url: payload.audio_url || null,
      featured: payload.featured ? 1 : 0,
      created_at: todayIso(),
    });
    if (error) throw new Error(`Failed to create product: ${error.message}`);
  }
  return payload.id;
}

export async function deleteProduct(id: number) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete product: ${error.message}`);
}

export async function listServices(): Promise<ServiceCategory[]> {
  const { data, error } = await supabase.from('service_categories').select('*');
  if (error) throw new Error(`Failed to list services: ${error.message}`);
  const services = (data || []) as ServiceCategory[];
  return services.sort((a, b) => a.id - b.id);
}

export async function updateService(id: number, description: string) {
  const { error } = await supabase.from('service_categories').update({ description }).eq('id', id);
  if (error) throw new Error(`Failed to update service: ${error.message}`);
}

export async function listTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase.from('testimonials').select('*');
  if (error) throw new Error(`Failed to list testimonials: ${error.message}`);
  const testimonials = (data || []) as Testimonial[];
  return testimonials.sort((a, b) => b.id - a.id);
}

export async function addTestimonial(name: string, role: string, quote: string) {
  const { error } = await supabase.from('testimonials').insert({ name, role, quote });
  if (error) throw new Error(`Failed to add testimonial: ${error.message}`);
}

export async function deleteTestimonial(id: number) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete testimonial: ${error.message}`);
}

export async function addNewsletterSubscriber(email: string) {
  const { error } = await supabase.from('newsletter_subscribers').upsert({ email, created_at: todayIso() }, { onConflict: 'email' }).select();
  if (error) throw new Error(`Failed to add newsletter subscriber: ${error.message}`);
}

export async function listNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  const { data, error } = await supabase.from('newsletter_subscribers').select('*');
  if (error) throw new Error(`Failed to list newsletter subscribers: ${error.message}`);
  return (data || []) as NewsletterSubscriber[];
}

export async function addContactMessage(name: string, email: string, message: string) {
  const { error } = await supabase.from('contact_messages').insert({ name, email, message, created_at: todayIso() });
  if (error) throw new Error(`Failed to add contact message: ${error.message}`);
}

export async function createJobRequest(payload: Omit<JobRequest, 'id' | 'status' | 'created_at'>) {
  const { error } = await supabase.from('job_requests').insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone || '',
    company_name: payload.company_name || '',
    service_category: payload.service_category,
    project_description: payload.project_description,
    budget_range: payload.budget_range || '',
    deadline: payload.deadline || '',
    file_url: payload.file_url || null,
    consent: payload.consent,
    status: 'New',
    created_at: todayIso(),
  });
  if (error) throw new Error(`Failed to create job request: ${error.message}`);
}

export async function listJobRequests(filters?: { status?: string; category?: string }): Promise<JobRequest[]> {
  let query = supabase.from('job_requests').select('*');
  if (filters?.status) query = query.eq('status', filters.status);
  if (filters?.category) query = query.eq('service_category', filters.category);
  const { data, error } = await query;
  if (error) throw new Error(`Failed to list job requests: ${error.message}`);
  const requests = (data || []) as JobRequest[];
  return requests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function updateJobRequestStatus(id: number, status: string) {
  const { error } = await supabase.from('job_requests').update({ status }).eq('id', id);
  if (error) throw new Error(`Failed to update job request status: ${error.message}`);
}

export async function createOrderIntent(productSlug: string, totalCents: number) {
  const { data, error } = await supabase.from('orders').insert({
    product_slug: productSlug,
    total_cents: totalCents,
    status: 'Checkout Ready',
    created_at: todayIso(),
  }).select();
  if (error) throw new Error(`Failed to create order: ${error.message}`);
  return data?.[0] || null;
}

export async function trackEvent(eventType: string, pathName: string, options?: { productSlug?: string | null; visitorId?: string | null; source?: string | null }) {
  const { error } = await supabase.from('analytics_events').insert({
    event_type: eventType,
    path: pathName,
    product_slug: options?.productSlug || null,
    visitor_id: options?.visitorId || null,
    source: options?.source || 'direct',
    created_at: todayIso(),
  });
  if (error) console.error('Failed to track event:', error.message);
}

export async function getAnalyticsSummary() {
  const { count: totalVisitors } = await supabase.from('analytics_events').select('*', { count: 'exact', head: true }).not('visitor_id', 'is', null);
  const { count: pageViews } = await supabase.from('analytics_events').select('*', { count: 'exact', head: true }).eq('event_type', 'page_view');
  const { count: productViews } = await supabase.from('analytics_events').select('*', { count: 'exact', head: true }).eq('event_type', 'product_view');
  const { count: jobRequestSubmissions } = await supabase.from('job_requests').select('*', { count: 'exact', head: true });
  const { data: mostViewedProducts } = await supabase.from('analytics_events').select('product_slug').eq('event_type', 'product_view').not('product_slug', 'is', null).limit(5);
  const { data: trafficSources } = await supabase.from('analytics_events').select('source').eq('event_type', 'page_view').limit(5);
  const { data: dailyViews } = await supabase.from('analytics_events').select('substr(created_at, 1, 10) as day').eq('event_type', 'page_view').order('created_at', { ascending: false }).limit(7);
  const storeConversionRate = (pageViews ?? 0) > 0 ? Number(((jobRequestSubmissions ?? 0) / (pageViews ?? 1)) * 100).toFixed(2) : 0;
  return { totalVisitors: totalVisitors ?? 0, pageViews: pageViews ?? 0, productViews: productViews ?? 0, mostViewedProducts: (mostViewedProducts || []).map((p: any) => ({ slug: p.product_slug, views: 0 })), storeConversionRate, jobRequestSubmissions: jobRequestSubmissions ?? 0, trafficSources: (trafficSources || []).map((t: any) => ({ source: t.source, visits: t.count })), dailyViews: (dailyViews || []).map((d: any) => ({ day: d.day, views: d.views })) };
}
