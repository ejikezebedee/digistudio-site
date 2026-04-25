import { z } from 'zod';

export const newsletterSchema = z.object({ email: z.string().email() });

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export const jobRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(''),
  company_name: z.string().optional().default(''),
  service_category: z.string().min(2),
  project_description: z.string().min(20),
  budget_range: z.string().optional().default(''),
  deadline: z.string().optional().default(''),
  consent: z.coerce.number().refine((v) => v === 1),
  file_url: z.string().optional().nullable(),
});
