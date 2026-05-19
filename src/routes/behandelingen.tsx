import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ToothMark } from "@/components/site/Logo";
import { ArrowRight, Layers, Smile, Sparkles, Activity, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSiteImage } from "@/hooks/useSiteImage";

// Import client images
import imgDoctorExplaining from "@/assets/new client images/doctor explaining teeth to patient.png";
import imgTeeth from "@/assets/new client images/teeth.png";
import imgTeethCap from "@/assets/new client images/teeth cap.png";
import imgUvLight from "@/assets/new client images/doctor fixing the teeth using uv light.png";
import imgTools from "@/assets/new client images/doctor fixing the teeth using tools.png";
import imgChild from "@/assets/new client images/child in dental office.png";
import imgDesktopTable from "@/assets/new client images/doctor desktop table with some components.png";

export const Route = createFileRoute("/behandelingen")({
  head: () => ({
    meta: [
      { title: "Tandarts Behandelingen Rotterdam | MondVita" },
      { name: "description", content: "Ontdek de mondzorgbehandelingen van MondVita Rotterdam: algemene mondzorg, implantaten, klikgebitten, protheses, wortelkanaalbehandeling en kindertandheelkunde." },
      { property: "og:title", content: "Tandarts Behandelingen Rotterdam | MondVita" },
    ],
    links: [{ rel: "canonical", href: "/behandelingen" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const treatmentsBg = useSiteImage("images.treatments_bg", imgDesktopTable);

  const items = [
    { t: t("svc.mondzorg"), d: t("svc.mondzorg_d"), Icon: ToothMark, img: imgDoctorExplaining },
    { t: t("svc.implant"), d: t("svc.implant_d"), Icon: Layers, img: imgTeeth },
    { t: t("svc.prothese"), d: t("svc.prothese_d"), Icon: Smile, img: imgTeethCap },
    { t: t("svc.esth"), d: t("svc.esth_d"), Icon: Sparkles, img: imgUvLight },
    { t: t("svc.wortel"), d: t("svc.wortel_d"), Icon: Activity, img: imgTools },
    { t: t("svc.kinder"), d: t("svc.kinder_d"), Icon: Heart, img: imgChild },
  ];

  return (
    <SiteShell>
      <PageHeader
        title={t("behandelingen.title")}
        intro={t("behandelingen.intro")}
        bgImage={treatmentsBg}
      />

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-5xl px-6 space-y-12">
          {items.map((it, idx) => (
            <article
              key={it.t}
              className="group flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white rounded-2xl rounded-tr-none border border-border/80 p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-primary/45 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.06)] md:even:flex-row-reverse animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Image beside the text box */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden bg-secondary/50 border border-border/50 relative">
                <img
                  src={it.img}
                  alt={it.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Text / service information box */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  {it.Icon === ToothMark ? (
                    <ToothMark className="h-6 w-6" />
                  ) : (
                    <it.Icon className="h-6 w-6" strokeWidth={1.5} />
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-primary tracking-tight">
                  {it.t}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {it.d}
                </p>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary transition duration-200 hover:underline"
                  >
                    <span>{t("help.more")}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
