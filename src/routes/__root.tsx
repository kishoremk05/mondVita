import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

import "@/i18n";

import appCss from "../styles.css?url";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } } });

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MondVita — Premium tandheelkunde in Rotterdam" },
      { name: "description", content: "MondVita biedt premium tandheelkundige zorg met persoonlijke aandacht in een moderne omgeving in Rotterdam." },
      { property: "og:title", content: "MondVita — Premium tandheelkunde in Rotterdam" },
      { property: "og:description", content: "Premium tandheelkundige zorg met persoonlijke aandacht in Rotterdam." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cairo:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is needed because lang/dir attributes
    // are updated client-side after hydration based on stored locale.
    <html lang="nl" suppressHydrationWarning>
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Helper to convert flat dot-separated keys to a deep nested object structure for i18next
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nestBundle(flat: Record<string, string>): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nested: Record<string, any> = {};
  Object.entries(flat).forEach(([key, val]) => {
    const parts = key.split(".");
    let current = nested;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        current[part] = val;
      } else {
        if (!current[part] || typeof current[part] !== "object") {
          current[part] = {};
        }
        current = current[part];
      }
    }
  });
  return nested;
}

function RootComponent() {
  const { i18n } = useTranslation();
  const [hydrated, setHydrated] = useState(false);

  // Phase 1: Mark hydration complete after the first client-side commit.
  // useEffect never runs during SSR or during the synchronous hydration pass,
  // so this is the earliest safe moment to diverge from the server output.
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Phase 2: Once hydrated, restore the user's saved locale from localStorage.
  // This triggers a second render with the correct language, but AFTER hydration
  // has already committed with the server-matching "nl" strings.
  useEffect(() => {
    if (!hydrated) return;
    if (typeof window !== "undefined") {
      const savedLocale = window.localStorage.getItem("mondvita-locale");
      if (savedLocale && savedLocale !== i18n.language) {
        i18n.changeLanguage(savedLocale);
      }
    }
  }, [hydrated, i18n]);

  // Sync the HTML lang and dir attributes when the user explicitly changes language.
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // Load A-to-Z Dynamic Text overrides from Supabase
  useEffect(() => {
    async function loadDynamicContent() {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("key, locale, value");
        if (error) throw error;

        if (data && data.length > 0) {
          const bundles: Record<string, Record<string, string>> = { nl: {}, en: {}, ar: {} };
          data.forEach(r => {
            if (bundles[r.locale]) {
              bundles[r.locale][r.key] = r.value.replace(/Amsterdam/g, "Rotterdam");
            }
          });
          
          // Merge dynamic values into active i18n translation namespaces.
          Object.entries(bundles).forEach(([loc, bundle]) => {
            if (Object.keys(bundle).length > 0) {
              const nested = nestBundle(bundle);
              i18n.addResourceBundle(loc, "translation", nested, true, true);
            }
          });
          
          // Re-trigger rendering so components pick up the new resource bundles.
          i18n.changeLanguage(i18n.language);
        }
      } catch (e) {
        console.error("Error loading dynamic site translations:", e);
      }
    }
    loadDynamicContent();
  }, [i18n]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}


