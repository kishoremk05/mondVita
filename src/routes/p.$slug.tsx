import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { PartnerBand } from "@/components/site/PartnerBand";
import { supabase } from "@/integrations/supabase/client";
import { publicUrl, type CustomPageRow, type CustomSectionRow } from "@/lib/site-data";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/p/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `MondVita — ${params.slug}` },
      { name: "description", content: `Bekijk informatie over ${params.slug} op MondVita.` },
    ],
    links: [{ rel: "canonical", href: `/p/${params.slug}` }],
  }),
  component: CustomPageComponent,
});

function getLocale(language: string): "nl" | "en" | "ar" {
  const loc = language.slice(0, 2);
  return loc === "nl" || loc === "en" || loc === "ar" ? loc : "en";
}

function CustomPageComponent() {
  const { slug } = Route.useParams();
  const { i18n } = useTranslation();
  const locale = getLocale(i18n.language);

  // Fetch Page Metadata
  const { data: page, isLoading: pageLoading, error: pageErr } = useQuery<CustomPageRow | null>({
    queryKey: ["custom_page", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as CustomPageRow | null;
    },
  });

  // Fetch Page Sections
  const { data: sections = [], isLoading: sectionsLoading } = useQuery<CustomSectionRow[]>({
    queryKey: ["custom_page_sections", page?.id],
    queryFn: async () => {
      if (!page?.id) return [];
      const { data, error } = await supabase
        .from("custom_sections")
        .select("*")
        .eq("page_id", page.id)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as CustomSectionRow[];
    },
    enabled: !!page?.id,
  });

  if (pageLoading) {
    return (
      <SiteShell>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SiteShell>
    );
  }

  if (pageErr || !page) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold text-primary">Pagina niet gevonden</h1>
          <p className="mt-4 text-muted-foreground">Excuus, de opgevraagde pagina kan niet worden gevonden.</p>
        </div>
      </SiteShell>
    );
  }

  const pageTitle = page.translations?.[locale]?.title || page.translations?.nl?.title || page.slug;
  const pageIntro = page.translations?.[locale]?.intro || page.translations?.nl?.intro || "";
  const bannerBg = page.banner_image ? publicUrl(page.banner_image) : "/src/assets/svc-mondzorg.jpg";

  return (
    <SiteShell>
      <PageHeader title={pageTitle} intro={pageIntro} bgImage={bannerBg} />

      {sectionsLoading ? (
        <div className="flex py-16 justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : sections.length === 0 ? (
        <section className="bg-secondary/35 py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-muted-foreground">Deze pagina is succesvol aangemaakt. Voeg inhoud toe in het beheerpaneel.</p>
          </div>
        </section>
      ) : (
        <section className="bg-secondary/35 py-20 space-y-16">
          <div className="mx-auto max-w-5xl px-6 space-y-16">
            {sections.map((s, idx) => {
              const secTitle = s.translations?.[locale]?.title || s.translations?.nl?.title || "";
              const secContent = s.translations?.[locale]?.content || s.translations?.nl?.content || "";
              const hasImage = s.layout !== "full-width" && s.image_url;
              const imageUrl = s.image_url ? publicUrl(s.image_url) : "/src/assets/svc-mondzorg.jpg";

              if (s.layout === "full-width") {
                return (
                  <article
                    key={s.id}
                    className="bg-white rounded-2xl rounded-tr-none border border-border/80 p-8 shadow-sm space-y-4 animate-fade-in"
                  >
                    {secTitle && (
                      <h3 className="font-display text-2xl font-bold text-primary tracking-tight">
                        {secTitle}
                      </h3>
                    )}
                    <div className="text-base text-muted-foreground font-light leading-relaxed whitespace-pre-line">
                      {secContent}
                    </div>
                  </article>
                );
              }

              // Column layout
              const isImageLeft = s.layout === "text-right";

              return (
                <article
                  key={s.id}
                  className={`group flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white rounded-2xl rounded-tr-none border border-border/80 p-6 md:p-8 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] animate-fade-in ${
                    isImageLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Column */}
                  {hasImage ? (
                    <div className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden bg-secondary/50 border border-border/50 shrink-0">
                      <img
                        src={imageUrl}
                        alt={secTitle}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-102"
                      />
                    </div>
                  ) : (
                    <div className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden bg-secondary/50 border border-dashed border-border/60 shrink-0 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-light">Geen afbeelding geüpload</span>
                    </div>
                  )}

                  {/* Text Column */}
                  <div className="w-full md:w-1/2 space-y-4">
                    {secTitle && (
                      <h3 className="font-display text-2xl font-bold text-primary tracking-tight">
                        {secTitle}
                      </h3>
                    )}
                    <div className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed whitespace-pre-line">
                      {secContent}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <PartnerBand />
    </SiteShell>
  );
}
