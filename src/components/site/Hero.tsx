import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { CalendarDays, ArrowRight } from "lucide-react";
import imgInterior from "@/assets/new client images/dental setup place.png";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useSiteContent } from "@/hooks/useSiteContent";

export function Hero() {
  const { t } = useTranslation();
  const { c } = useSiteContent();
  const heroBg = useSiteImage("images.hero_bg", imgInterior);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Full-bleed Background Image with Soft Fading Gradients */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="h-full w-full overflow-hidden">
          <img
            src={heroBg}
            alt="MondVita dental clinic interior"
            loading="eager"
            className="h-full w-full object-cover object-[80%_center] md:object-[right_center] scale-102 animate-scale-reveal"
          />
        </div>

        {/* Soft white gradient overlay on the left 50% of the screen, fading to transparent on the right (mirrored for RTL) */}
        <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 w-full md:w-[50%] bg-gradient-to-r rtl:bg-gradient-to-l from-white via-white/65 to-transparent hidden md:block" />
        
        {/* Mobile-only overlay to ensure text is fully readable on small screens */}
        <div className="absolute inset-0 bg-white/35 block md:hidden" />

        {/* Bottom fading gradient to blend with features section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-8 pb-16">
        <div className="max-w-2xl space-y-6 md:space-y-8 animate-fade-up">
          {/* Micro-badge accent */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            {c("hero.badge")}
          </div>

          {/* Heading using Outfit Display typography */}
          <h1 className="font-display text-5xl font-extrabold leading-[1.08] text-primary sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase">
            <span>{c("hero.title_1")}</span>
            <br />
            <span className="text-brand-accent drop-shadow-[0_2px_10px_rgba(12,35,64,0.05)]">
              {c("hero.title_2")}
            </span>
          </h1>

          {/* Luxury font-light description */}
          <p className="max-w-lg text-base text-primary/80 sm:text-lg md:text-xl font-light leading-relaxed">
            {c("hero.subtitle")}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <Link
              to="/afspraak"
              className="inline-flex items-center gap-2.5 rounded-lg bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <CalendarDays className="h-4.5 w-4.5" />
              {t("nav.book")}
            </Link>
            <Link
              to="/over-ons"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition duration-200"
            >
              <span className="relative py-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all group-hover:after:w-full">
                {c("hero.cta_more")}
              </span>
              <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Elegant bottom hair-line */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-primary/10 z-10" />
    </section>
  );
}
