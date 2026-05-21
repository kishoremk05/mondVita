import { supabase } from "@/integrations/supabase/client";

export type Locale = "nl" | "en" | "ar";
export type SiteContentRow = { key: string; locale: string; value: string };
export type ServiceRow = {
  id: string;
  icon: string;
  image_url: string;
  link_path: string;
  sort_order: number;
  translations: Record<string, { title: string; desc: string }>;
};
export type GalleryRow = { id: string; storage_path: string; alt: string; sort_order: number };
export type ContactRow = { id: number; address: string; phone: string; email: string; hours: Record<string, string>; map_embed: string; socials: Record<string, string> };

export async function fetchSiteContent(): Promise<Record<string, Record<Locale, string>>> {
  const { data } = await supabase.from("site_content").select("key, locale, value");
  const out: Record<string, Record<Locale, string>> = {};
  for (const r of (data ?? []) as SiteContentRow[]) {
    if (!out[r.key]) out[r.key] = { nl: "", en: "", ar: "" };
    out[r.key][r.locale as Locale] = r.value;
  }
  return out;
}

export async function fetchServices(): Promise<ServiceRow[]> {
  const { data } = await supabase.from("services").select("*").order("sort_order");
  return (data ?? []) as unknown as ServiceRow[];
}

export async function fetchGallery(): Promise<GalleryRow[]> {
  const { data } = await supabase.from("gallery_images").select("*").order("sort_order");
  return (data ?? []) as GalleryRow[];
}

export async function fetchContact(): Promise<ContactRow | null> {
  const { data } = await supabase.from("contact_info").select("*").eq("id", 1).maybeSingle();
  return data as ContactRow | null;
}

export function publicUrl(path: string): string {
  const { data } = supabase.storage.from("clinic-media").getPublicUrl(path);
  return data.publicUrl;
}
