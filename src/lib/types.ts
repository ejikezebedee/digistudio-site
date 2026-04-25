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
  id: number;
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

export type AnalyticsSummary = {
  totalVisitors: number;
  pageViews: number;
  productViews: number;
  mostViewedProducts: Array<{ slug: string; views: number }>;
  storeConversionRate: number;
  jobRequestSubmissions: number;
  trafficSources: Array<{ source: string; visits: number }>;
  dailyViews: Array<{ day: string; views: number }>;
};
