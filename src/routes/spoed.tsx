import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Globe, Phone, Clock } from "lucide-react";
import imgSpoe1 from "@/assets/new client images/spoe 1.png";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/spoed")({
  head: () => ({
    meta: [
      { title: "Spoedtandarts Rotterdam | MondVita" },
      { name: "description", content: "Heeft u met spoed een tandarts nodig in Rotterdam? Neem direct contact op met MondVita of Dental365 voor snelle spoedtandheelkunde." },
      { property: "og:title", content: "Spoedtandarts Rotterdam | MondVita" },
    ],
    links: [{ rel: "canonical", href: "/spoed" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const { c } = useSiteContent();
  const spoedBg = useSiteImage("images.spoed_bg", imgSpoe1);
  return (
    <SiteShell>
      <PageHeader
        title={c("spoed.title")}
        intro={c("spoed.intro")}
        bgImage={spoedBg}
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-start lg:gap-16">
          {/* Left Column: Guidelines & Dental365 callout */}
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-destructive">
              /// {t("spoed.badge")}
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary uppercase tracking-tight">
              {t("spoed.emergency_q")}
            </h2>
            <div className="space-y-4 text-sm text-foreground/80 leading-relaxed font-light">
              <p className="border-l-2 border-brand-accent pl-4 py-0.5">{c("spoed.p1")}</p>
              <p className="border-l-2 border-brand-accent pl-4 py-0.5">{c("spoed.p2")}</p>
              <p className="border-l-2 border-brand-accent pl-4 py-0.5">{c("spoed.p3")}</p>
            </div>

            {/* Dental365 Bold Callout Card */}
            <div className="rounded-2xl rounded-tr-none border border-destructive/20 bg-destructive/5 p-8 shadow-[0_12px_40px_-16px_rgba(239,68,68,0.08)] mt-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive shadow-sm">
                  <Phone className="h-5.5 w-5.5 animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <p className="font-display text-sm font-bold text-primary uppercase tracking-wider">
                    {c("spoed.card_title")}
                  </p>
                  <a
                    href="tel:09001515"
                    className="block text-3xl font-black text-destructive tracking-tight select-all my-1 hover:underline"
                  >
                    0900 - 1515
                  </a>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    {c("spoed.card_sub")}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-destructive/10 flex items-center">
                <a
                  href="https://www.dental365.nl"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow transition hover:bg-primary/95"
                >
                  <Globe className="h-4 w-4 text-brand-accent" />
                  {c("spoed.card_btn")}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Schedule & Emergency Hours panel */}
          <div className="relative flex items-center justify-center animate-fade-up md:sticky md:top-28">
            <div className="relative w-full max-w-md rounded-2xl rounded-tr-none border border-border/80 bg-secondary/40 p-8 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-accent/10 rounded-bl-full" />
              
              <div className="flex items-center gap-3">
                <Clock className="h-5.5 w-5.5 text-brand-accent" />
                <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wider">
                  {t("spoed.hours_title")}
                </h3>
              </div>
              
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light">
                {t("spoed.hours_desc")}
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between border-b border-border/55 pb-2 text-sm">
                  <span className="font-medium text-foreground/80">{t("spoed.hours_wd")}</span>
                  <span className="font-bold text-primary">08:00 - 22:00</span>
                </div>
                <div className="flex justify-between border-b border-border/55 pb-2 text-sm">
                  <span className="font-medium text-foreground/80">{t("spoed.hours_we")}</span>
                  <span className="font-bold text-primary">{t("spoed.hours_24")}</span>
                </div>
                <div className="flex justify-between border-b border-border/55 pb-2 text-sm">
                  <span className="font-medium text-foreground/80">{t("spoed.hours_h")}</span>
                  <span className="font-bold text-primary">{t("spoed.hours_24")}</span>
                </div>
              </div>
              
              <div className="mt-8 rounded-xl bg-primary text-primary-foreground p-5 text-center shadow-md">
                <p className="text-xs uppercase tracking-widest opacity-70">{t("spoed.call_now")}</p>
                <a
                  href="tel:09001515"
                  className="block text-2xl font-black text-white hover:text-brand-accent transition mt-1 tracking-wider"
                >
                  0900 - 1515
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

