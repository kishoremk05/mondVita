import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { OpeningHoursCard } from "@/components/site/OpeningHoursCard";
import { PartnerBand } from "@/components/site/PartnerBand";
import { fetchContact } from "@/lib/site-data";
import imgGeneralCare from "@/assets/new client images/doctor explaining teeth to patient.png";

function normalizeHours(hours: Record<string, string> | undefined) {
  return {
    morning: hours?.morning ?? hours?.mon_fri ?? "09:00 - 12:00",
    lunch: hours?.lunch ?? hours?.sat ?? "12:00 - 13:00",
    afternoon: hours?.afternoon ?? hours?.sun ?? "13:00 - 17:00",
  };
}

export const Route = createFileRoute("/general-dental-care")({
  head: () => ({
    meta: [
      { title: "General dental care — MondVita" },
      { name: "description", content: "General dental care at MondVita: prevention, check-ups, cleanings and restorative care in Rotterdam." },
      { property: "og:title", content: "General dental care — MondVita" },
    ],
    links: [{ rel: "canonical", href: "/general-dental-care" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const { data: contact } = useQuery({ queryKey: ["contact"], queryFn: fetchContact });
  const hours = normalizeHours(contact?.hours);

  return (
    <SiteShell>
      <PageHeader title={t("generalCare.title")} intro={t("generalCare.intro")} bgImage={imgGeneralCare} />

      <section className="bg-secondary/35 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-4 rounded-3xl border border-border/80 bg-white p-8 shadow-sm">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                /// {t("generalCare.title")}
              </div>
              <p className="text-base leading-relaxed text-muted-foreground font-light">{t("generalCare.body1")}</p>
              <p className="text-base leading-relaxed text-muted-foreground font-light">{t("generalCare.body2")}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: t("generalCare.item1_t"), desc: t("generalCare.item1_d") },
                { title: t("generalCare.item2_t"), desc: t("generalCare.item2_d") },
                { title: t("generalCare.item3_t"), desc: t("generalCare.item3_d") },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">{item.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-light">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/declaraties" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                {t("generalCare.cta_declaraties")}
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-secondary/50">
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
            />
            <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">{t("generalCare.map_title")}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-light">
                {t("contact.address_v")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground font-light">
                {t("generalCare.map_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <PartnerBand title={t("generalCare.partner_title")} />
    </SiteShell>
  );
}
