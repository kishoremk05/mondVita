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
  const list = (data ?? []) as unknown as ServiceRow[];
  return list.filter((s) => {
    const enTitle = s.translations?.en?.title?.toLowerCase();
    const nlTitle = s.translations?.nl?.title?.toLowerCase();
    return enTitle !== "orthodontics" && nlTitle !== "orthodontie";
  });
}

export async function fetchGallery(): Promise<GalleryRow[]> {
  const { data } = await supabase.from("gallery_images").select("*").order("sort_order");
  return (data ?? []) as GalleryRow[];
}

export async function fetchContact(): Promise<ContactRow | null> {
  const { data } = await supabase.from("contact_info").select("*").eq("id", 1).maybeSingle();
  if (!data) return null;
  const isAmsterdamSeed = data.address?.includes("Amsterdam") || data.phone?.includes("+31 20");
  if (isAmsterdamSeed) {
    return {
      id: 1,
      address: "Marinus Bolkplein 39, 3067 AK Rotterdam",
      phone: "010-3602998",
      email: "info@mondvita.nl",
      hours: {
        morning: "09:00 - 12:00",
        lunch: "12:00 - 13:00",
        afternoon: "13:00 - 17:00",
      },
      map_embed: data.map_embed || "",
      socials: (data.socials as Record<string, string>) ?? {},
    };
  }
  return data as ContactRow | null;
}

export function publicUrl(path: string): string {
  const { data } = supabase.storage.from("clinic-media").getPublicUrl(path);
  return data.publicUrl;
}
