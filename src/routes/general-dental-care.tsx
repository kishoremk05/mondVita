import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { OpeningHoursCard } from "@/components/site/OpeningHoursCard";
import { PartnerBand } from "@/components/site/PartnerBand";
import { fetchContact } from "@/lib/site-data";
import imgGeneralCare from "@/assets/new client images/doctor explaining teeth to patient.png";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useSiteContent } from "@/hooks/useSiteContent";

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
  const { c } = useSiteContent();
  const generalCareBg = useSiteImage("images.general_care_bg", imgGeneralCare);
  const { data: contact } = useQuery({ queryKey: ["contact"], queryFn: fetchContact });
  const hours = normalizeHours(contact?.hours);

  return (
    <SiteShell>
      <PageHeader title={c("generalCare.title")} intro={c("generalCare.intro")} bgImage={generalCareBg} />

      <section className="bg-secondary/35 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-4 rounded-3xl border border-border/80 bg-white p-8 shadow-sm">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                /// {c("generalCare.title")}
              </div>
              <p className="text-base leading-relaxed text-muted-foreground font-light">{c("generalCare.body1")}</p>
              <p className="text-base leading-relaxed text-muted-foreground font-light">{c("generalCare.body2")}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: c("generalCare.item1_t"), desc: c("generalCare.item1_d") },
                { title: c("generalCare.item2_t"), desc: c("generalCare.item2_d") },
                { title: c("generalCare.item3_t"), desc: c("generalCare.item3_d") },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">{item.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-light">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/declaraties" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                {c("generalCare.cta_declaraties")}
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-secondary/50">
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <OpeningHoursCard
              title={c("generalCare.hours_title")}
              dayLabel={c("generalCare.hours_day")}
              morning={hours.morning}
              breakLabel={hours.lunch}
              afternoon={hours.afternoon}
            />
            <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">{c("generalCare.map_title")}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-light">
                {t("contact.address_v")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground font-light">
                {c("generalCare.map_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <PartnerBand title={c("generalCare.partner_title")} />
    </SiteShell>
  );
}
