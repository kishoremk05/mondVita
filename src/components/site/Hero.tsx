import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { CalendarDays, ArrowRight } from "lucide-react";
import clinicInterior from "@/assets/clinic-interior.jpg";
import { useSiteImage } from "@/hooks/useSiteImage";

export function Hero() {
  const { t } = useTranslation();
  const heroBg = useSiteImage("images.hero_bg", clinicInterior);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary pt-20">
      {/* Full-bleed Background Image with Premium Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="MondVita dental clinic interior"
          loading="eager"
          className="h-full w-full object-cover object-center scale-102 animate-scale-reveal"
        />

        {/* Navy Editorial Gradient Tint (Horizontal Overlay for Left Text Readability) */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/98 via-primary/85 to-primary/10 mix-blend-multiply rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-primary/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="max-w-2xl space-y-6 md:space-y-8 animate-fade-up">
          {/* Micro-badge accent */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-accent backdrop-blur-sm">
            Praktijk in Amsterdam-West
          </div>

          {/* Heading using Outfit Display typography */}
          <h1 className="font-display text-5xl font-extrabold leading-[1.08] text-white sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase">
            <span className="text-white">{t("hero.title_1")}</span>
            <br />
            <span className="text-brand-accent drop-shadow-[0_2px_10px_rgba(197,168,128,0.15)]">
              {t("hero.title_2")}
            </span>
          </h1>

          {/* Luxury font-light description */}
          <p className="max-w-lg text-base text-white/85 sm:text-lg md:text-xl font-light leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <Link
              to="/afspraak"
              className="inline-flex items-center gap-2.5 rounded-lg bg-brand-accent px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-brand-accent/15 transition-all duration-300 hover:bg-brand-accent/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <CalendarDays className="h-4.5 w-4.5" />
              {t("nav.book")}
            </Link>
            <Link
              to="/over-ons"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition duration-200"
            >
              <span className="relative py-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-white after:transition-all group-hover:after:w-full">
                {t("hero.cta_more")}
              </span>
              <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Elegant bottom hair-line */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-brand-accent/30 z-10" />
    </section>
  );
}

