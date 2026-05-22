import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchSiteContent, type Locale } from "@/lib/site-data";

/**
 * Hook that resolves site content from Supabase with i18n fallback.
 *
 * Usage:
 *   const { c } = useSiteContent();
 *   c("hero.title_1")  // returns Supabase value if set, else i18n translation
 *
 * The hook fetches all site_content rows once and caches them.
 * Admin changes are reflected after the 5-minute stale window or
 * when the query is explicitly invalidated.
 */
export function useSiteContent() {
  const { i18n, t } = useTranslation();
  const locale = i18n.language as Locale;

  const { data: siteContent } = useQuery({
    queryKey: ["site_content"],
    queryFn: fetchSiteContent,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  /**
   * Resolve a content key.
   * Priority: Supabase value (for current locale) → i18n translation
   */
  const c = (key: string): string => {
    const supaVal = siteContent?.[key]?.[locale];
    if (supaVal && supaVal.trim() !== "") return supaVal;
    return t(key);
  };

  return { c };
}
