import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import svcMondzorg from "@/assets/svc-mondzorg.jpg";
import svcImplant from "@/assets/svc-implant.jpg";
import svcProthese from "@/assets/svc-prothese.jpg";
import svcSpoed from "@/assets/svc-spoed.jpg";
import { useSiteImage } from "@/hooks/useSiteImage";

export function Services() {
  const { t } = useTranslation();
  const imgMondzorg = useSiteImage("images.services_mondzorg", svcMondzorg);
  const imgImplant = useSiteImage("images.services_implant", svcImplant);
  const imgProthese = useSiteImage("images.services_prothese", svcProthese);
  const imgSpoed = useSiteImage("images.services_spoed", svcSpoed);

  const cards = [
    { img: imgMondzorg, label: t("svc.mondzorg"), to: "/behandelingen" as const },
    { img: imgImplant, label: t("svc.implant"), to: "/behandelingen" as const },
    { img: imgProthese, label: t("svc.prothese"), to: "/protheses" as const },
    { img: imgSpoed, label: t("svc.spoed"), to: "/spoed" as const },
  ];


  return (
    <section id="services" className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Decorative blurred glow in background */}
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-brand-accent/5 blur-[120px] select-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.8fr] lg:items-start lg:gap-16">
          {/* Section Header Left */}
          <div className="space-y-4 lg:sticky lg:top-28 animate-fade-up">
            <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// Mondzorg & specialismen
            </div>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-primary md:text-5xl uppercase tracking-tight">
              {t("help.title")}
            </h2>
            <div className="h-[2px] w-16 bg-brand-accent/60 mt-4" />
          </div>

          {/* Cards Grid Right */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {cards.map((c, idx) => (
              <Link
                key={c.label}
                to={c.to}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/50 hover:shadow-[0_16px_36px_-12px_rgba(12,35,64,0.12)] animate-fade-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Image Container with Hover Zoom */}
                <div className="aspect-square w-full overflow-hidden bg-primary/5 relative">
                  <img
                    src={c.img}
                    alt={c.label}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle vignette layer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content Overlay/Tag at bottom */}
                <div className="flex items-center justify-between bg-white px-5 py-4 border-t border-border/50 transition-colors duration-300 group-hover:bg-secondary/40">
                  <p className="font-display text-xs sm:text-sm font-bold text-primary tracking-tight transition duration-200 group-hover:text-primary">
                    {c.label}
                  </p>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-primary transition-all duration-300 group-hover:bg-brand-accent group-hover:text-primary-foreground">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

