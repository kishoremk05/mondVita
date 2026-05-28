import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSiteContent } from "@/hooks/useSiteContent";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { OpeningHoursCard } from "@/components/site/OpeningHoursCard";
import { fetchContact } from "@/lib/site-data";
import imgAddress from "@/assets/new client images/address image.png";

function normalizeHours(hours: Record<string, string> | undefined) {
  return {
    morning: hours?.morning ?? hours?.mon_fri ?? "09:00 - 12:00",
    lunch: hours?.lunch ?? hours?.sat ?? "12:00 - 13:00",
    afternoon: hours?.afternoon ?? hours?.sun ?? "13:00 - 17:00",
  };
}

export const Route = createFileRoute("/declaraties")({
  head: () => ({
    meta: [
      { title: "Declaraties & KNMT tarieven — MondVita" },
      { name: "description", content: "Declaraties, verzekeringsinformatie en de nieuwste KNMT-prijslijst van MondVita." },
      { property: "og:title", content: "Declaraties & KNMT tarieven — MondVita" },
    ],
    links: [{ rel: "canonical", href: "/declaraties" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const { c } = useSiteContent();
  const { data: contact } = useQuery({ queryKey: ["contact"], queryFn: fetchContact });
  const hours = normalizeHours(contact?.hours);

  return (
    <SiteShell>
      <PageHeader title={c("declaraties.title")} intro={c("declaraties.intro")} bgImage={imgAddress} />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6 rounded-3xl border border-border/80 bg-secondary/30 p-8 shadow-sm">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// {c("declaraties.title")}
            </div>
            <p className="text-base leading-relaxed text-muted-foreground font-light">{c("declaraties.body1")}</p>
            <p className="text-base leading-relaxed text-muted-foreground font-light">{c("declaraties.body2")}</p>

            <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">{c("declaraties.knmt_label")}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-light">
                {t("declaraties.knmt_desc")}
              </p>
              <a
                href={c("declaraties.knmt_url")}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                {c("declaraties.knmt_cta")}
              </a>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-secondary/50"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <OpeningHoursCard
              title={t("generalCare.hours_title")}
              dayLabel={t("generalCare.hours_day")}
              morning={hours.morning}
              breakLabel={hours.lunch}
              afternoon={hours.afternoon}
              hours={contact?.hours}
            />
            <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">{t("declaraties.title")}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-light">
                {t("declaraties.page_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
