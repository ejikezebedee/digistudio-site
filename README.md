# DIGISTUDIO

Premium digital production studio and marketplace.

## Tech Stack

- Next.js 16 (React 19, TypeScript, Tailwind 4)
- Supabase (PostgreSQL database)
- Zod (form validation)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Supabase:**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   DIGISTUDIO_ADMIN_PASSWORD=your-secure-password
   ```

3. **Database tables required:**
   Run the following in your Supabase SQL Editor to create the necessary tables:

   ```sql
   -- Homepage settings
   CREATE TABLE homepage_settings (
     id integer PRIMARY KEY CHECK (id = 1),
     hero_headline text NOT NULL,
     hero_subheading text NOT NULL,
     brand_intro text NOT NULL
   );

   INSERT INTO homepage_settings (id, hero_headline, hero_subheading, brand_intro)
   VALUES (1, 'Build and sell premium digital productions with confidence.', 'A modern digital studio and marketplace for storybooks, creative products, and client project delivery.', 'This platform is designed for premium digital production businesses that need a storefront, a request system, and a secure operations backend in one place.')
   ON CONFLICT (id) DO UPDATE SET id = 1;

   -- Products
   CREATE TABLE products (
     id integer PRIMARY KEY AUTOINCREMENT,
     slug text NOT NULL UNIQUE,
     title text NOT NULL,
     short_description text NOT NULL,
     long_description text NOT NULL,
     price_cents integer NOT NULL,
     category text NOT NULL,
     image_url text NOT NULL,
     audio_url text,
     featured integer NOT NULL DEFAULT 0,
     created_at text NOT NULL
   );

   -- Service categories
   CREATE TABLE service_categories (
     id integer PRIMARY KEY AUTOINCREMENT,
     name text NOT NULL UNIQUE,
     description text NOT NULL
   );

   -- Testimonials
   CREATE TABLE testimonials (
     id integer PRIMARY KEY AUTOINCREMENT,
     name text NOT NULL,
     role text NOT NULL,
     quote text NOT NULL
   );

   -- Newsletter subscribers
   CREATE TABLE newsletter_subscribers (
     id integer PRIMARY KEY AUTOINCREMENT,
     email text NOT NULL UNIQUE,
     created_at text NOT NULL
   );

   -- Job requests
   CREATE TABLE job_requests (
     id integer PRIMARY KEY AUTOINCREMENT,
     name text NOT NULL,
     email text NOT NULL,
     phone text DEFAULT '',
     company_name text DEFAULT '',
     service_category text NOT NULL,
     project_description text NOT NULL,
     budget_range text DEFAULT '',
     deadline text DEFAULT '',
     file_url text DEFAULT '',
     consent integer NOT NULL DEFAULT 0,
     status text NOT NULL DEFAULT 'New',
     created_at text NOT NULL
   );

   -- Contact messages
   CREATE TABLE contact_messages (
     id integer PRIMARY KEY AUTOINCREMENT,
     name text NOT NULL,
     email text NOT NULL,
     message text NOT NULL,
     created_at text NOT NULL
   );

   -- Orders
   CREATE TABLE orders (
     id integer PRIMARY KEY AUTOINCREMENT,
     product_slug text NOT NULL,
     buyer_email text,
     status text NOT NULL DEFAULT 'Checkout Ready',
     total_cents integer NOT NULL,
     payment_provider text,
     checkout_reference text,
     created_at text NOT NULL
   );

   -- Analytics events
   CREATE TABLE analytics_events (
     id integer PRIMARY KEY AUTOINCREMENT,
     event_type text NOT NULL,
     path text NOT NULL,
     product_slug text,
     visitor_id text,
     source text,
     created_at text NOT NULL
   );

   -- Insert demo services
   INSERT INTO service_categories (name, description) VALUES
     ('Website Design & Development', 'Premium business websites, landing pages, portals, and custom web applications.'),
     ('AI Automation Systems', 'Workflow automation, internal AI systems, and operational automation solutions.'),
     ('Opportunity Intelligence Services', 'Structured lead discovery, market monitoring, and client-ready intelligence delivery.'),
     ('Business Operations Automation', 'Approval flows, reporting systems, task routing, and operational dashboards.'),
     ('Outreach & Sales Support', 'Lead pipeline preparation, outreach systems, and sales-support workflows.'),
     ('Content & Prompt Products', 'Digital prompt packs, frameworks, templates, and creative digital assets.'),
     ('Document & Report Generation', 'Professional reports, proposals, summaries, and structured deliverables.'),
     ('Research & Market Analysis', 'Competitor scans, pricing research, industry analysis, and opportunity reports.'),
     ('Custom Portals & Internal Tools', 'Secure portals, dashboards, review systems, and internal workflow tools.'),
     ('Email / Client Communication Systems', 'Client notification systems, digests, email workflow, and communication automation.'),
     ('Cybersecurity & Infrastructure Support', 'Security review, hardening guidance, infrastructure checks, and controlled diagnostics.'),
     ('Data Collection & Structuring', 'Compliant source monitoring, normalization, and structured business datasets.');
   ```

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Option 1: Static Export (No Node runtime)

```bash
npm run build
```

The build outputs to `.next/`. To deploy statically:

1. Set `output: 'export'` in `next.config.ts`
2. Run build
3. Upload `.next/out/` to any static hosting (Netlify Vercel)

### Option 2: Server Deployment (VPS)

1. Set environment variables on your server (`.env.local` or systemd service)
2. Build:
   ```bash
   npm run build
   ```
3. Serve with any Node server (PM2, systemd, Docker, etc.)

## Admin Access

- **URL:** `/admin`
- **Password:** `DIGISTUDIO_ADMIN_PASSWORD` from `.env.local`

## Data Seeding

Run the following API calls to populate initial data:

### Products:
```bash
curl -X POST http://localhost:3000/api/admin/products \
  -F "title=Midnight Lantern Storybook" \
  -F "short_description=A premium illustrated digital storybook..." \
  -F "long_description=Midnight Lantern Storybook is crafted..." \
  -F "price_cents=1900" \
  -F "category=Storybooks" \
  -F "image_url=/covers/storybook-1.svg" \
  -F "audio_url=/audio/sample-preview.wav" \
  -F "featured=1"
```

## Features

- Product store with search and filtering
- Featured products on homepage
- Admin dashboard for managing products, orders, requests
- Analytics tracking
- Contact and job request forms
- Newsletter subscription
- Responsive design with dark theme

## License

Internal use only.