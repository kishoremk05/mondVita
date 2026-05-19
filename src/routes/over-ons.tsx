import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { CalendarDays } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";

// Import client images
import imgSetupPlace from "@/assets/new client images/dental setup place.png";
import imgDesktopTable from "@/assets/new client images/doctor desktop table with some components.png";

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    meta: [
      { title: "Over MondVita" },
      { name: "description", content: "Persoonlijke aandacht en professionele tandheelkundige zorg in Rotterdam. Leer ons team kennen." },
      { property: "og:title", content: "Over MondVita" },
    ],
    links: [{ rel: "canonical", href: "/over-ons" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const aboutBg = useSiteImage("images.about_bg", imgSetupPlace);
  const aboutFloating = useSiteImage("images.about_floating", imgDesktopTable);

  return (
    <SiteShell>
      <PageHeader
        title={t("over.title")}
        intro={t("over.intro")}
        bgImage={aboutBg}
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16">
          {/* Left: Content */}
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// {t("over.badge")}
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary uppercase tracking-tight">
              {t("over.sub")}
            </h2>
            <div className="space-y-4 text-sm text-foreground/80 leading-relaxed font-light">
              <p>{t("over.p1")}</p>
              <p>{t("over.p2")}</p>
            </div>
            <div className="pt-4">
              <Link
                to="/afspraak"
                className="inline-flex items-center gap-2.5 rounded-lg bg-brand-accent px-8 py-4 text-sm font-bold text-primary-foreground shadow transition duration-200 hover:bg-brand-accent/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                <CalendarDays className="h-4.5 w-4.5" />
                {t("nav.book")}
              </Link>
            </div>
          </div>

          {/* Right: Floating Clinic Frame Collage */}
          <div className="relative group animate-fade-up">
            {/* Layered brand champagne backing block */}
            <div className="absolute -inset-3 rounded-2xl rounded-tr-none border border-brand-accent/20 bg-secondary/50 -rotate-1 transition-all duration-300 group-hover:rotate-0" />
            
            {/* Main Picture Frame */}
            <div className="relative overflow-hidden rounded-2xl rounded-tr-none border border-border shadow-xl aspect-[4/3] bg-primary/5">
              <img
                src={aboutFloating}
                alt="MondVita modern dental clinic room"
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </div>
          </div>
        </div>
      </section>

    </SiteShell>
  );
}


