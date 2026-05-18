import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ToothMark } from "@/components/site/Logo";
import { ArrowRight, Layers, Smile, Sparkles, Activity, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import svcMondzorg from "@/assets/svc-mondzorg.jpg";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/behandelingen")({
  head: () => ({
    meta: [
      { title: "Behandelingen — MondVita" },
      { name: "description", content: "Een breed scala aan mondzorgbehandelingen bij MondVita: algemene mondzorg, implantologie, protheses, esthetische tandheelkunde en meer." },
      { property: "og:title", content: "Behandelingen — MondVita" },
    ],
    links: [{ rel: "canonical", href: "/behandelingen" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const treatmentsBg = useSiteImage("images.treatments_bg", svcMondzorg);
  const items = [
    { t: t("svc.mondzorg"), d: t("svc.mondzorg_d"), Icon: ToothMark },
    { t: t("svc.implant"), d: t("svc.implant_d"), Icon: Layers },
    { t: t("svc.prothese"), d: t("svc.prothese_d"), Icon: Smile },
    { t: t("svc.esth"), d: t("svc.esth_d"), Icon: Sparkles },
    { t: t("svc.wortel"), d: t("svc.wortel_d"), Icon: Activity },
    { t: t("svc.kinder"), d: t("svc.kinder_d"), Icon: Heart },
  ];
  return (
    <SiteShell>
      <PageHeader
        title={t("behandelingen.title")}
        intro={t("behandelingen.intro")}
        bgImage={treatmentsBg}
      />

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <article
              key={it.t}
              className="group relative flex flex-col items-start rounded-2xl rounded-tr-none border border-border/70 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/50 hover:shadow-[0_16px_36px_-12px_rgba(12,35,64,0.08)] animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Circular Icon Container */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:scale-[1.05] group-hover:bg-brand-accent/15 group-hover:text-brand-accent">
                {it.Icon === ToothMark ? (
                  <ToothMark className="h-6 w-6" />
                ) : (
                  <it.Icon className="h-6 w-6" strokeWidth={1.5} />
                )}
              </div>

              <h3 className="mt-6 font-display text-lg font-bold text-primary tracking-tight transition duration-200 group-hover:text-primary">
                {it.t}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
                {it.d}
              </p>

              <div className="mt-auto pt-6">
                <Link
                  to="/contact"
                  className="group/link inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary transition duration-200 hover:text-brand-accent"
                >
                  <span>{t("help.more")}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-brand-accent transition-transform duration-300 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}


