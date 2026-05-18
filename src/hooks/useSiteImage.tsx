import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { publicUrl } from "@/lib/site-data";

export function useSiteImage(key: string, defaultAsset: string): string {
  const { data } = useQuery({
    queryKey: ["site_content_images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value")
        .like("key", "images.%");
      if (error) throw error;

      const map: Record<string, string> = {};
      (data ?? []).forEach(r => {
        map[r.key] = r.value;
      });
      return map;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const customPath = data?.[key];
  if (customPath) {
    if (customPath.startsWith("http")) return customPath;
    try {
      return publicUrl(customPath);
    } catch (e) {
      console.error("Error resolving Supabase public URL for:", customPath, e);
    }
  }

  return defaultAsset;
}
