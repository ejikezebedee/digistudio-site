import { supabase } from './db';

export async function getHomepageSettings() {
  const { data, error } = await supabase.from('homepage_settings').select('*').eq('id', 1).single();
  if (error || !data) {
    throw new Error(`Failed to load homepage settings: ${error?.message}`);
  }
  return data;
}

export async function listServices() {
  const { data, error } = await supabase.from('service_categories').select('*');
  if (error) throw new Error(`Failed to list services: ${error.message}`);
  const services = (data || []) as any[];
  return services.sort((a, b) => a.id - b.id);
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `item-${Date.now()}`;
}

export function todayIso() {
  return new Date().toISOString();
}
