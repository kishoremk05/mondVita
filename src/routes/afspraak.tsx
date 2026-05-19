import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Check } from "lucide-react";
import imgSetupPlace from "@/assets/new client images/dental setup place.png";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/afspraak")({
  head: () => ({
    meta: [
      { title: "Afspraak maken — MondVita" },
      { name: "description", content: "Plan eenvoudig uw afspraak online bij MondVita Rotterdam. Kies een datum en tijdstip dat u uitkomt via ons patiëntenportaal." },
      { property: "og:title", content: "Afspraak maken — MondVita" },
    ],
    links: [{ rel: "canonical", href: "/afspraak" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const appointmentBg = useSiteImage("images.appointment_bg", imgSetupPlace);

  return (
    <SiteShell>
      <PageHeader
        title={t("afspraak.title")}
        intro={t("afspraak.intro")}
        bgImage={appointmentBg}
      />

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:gap-16">
          {/* Left Column - Benefits & Information */}
          <div className="space-y-6 md:sticky md:top-28 animate-fade-up">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// Patiëntgerichte Zorg
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary uppercase tracking-tight">
              Eenvoudig online uw bezoek plannen
            </h2>
            <p className="text-muted-foreground leading-relaxed font-light text-base max-w-lg">
              Met onze online planner plant u binnen een minuut uw periodieke controle of eerste consult. Wij reserveren direct een plekje voor u in onze moderne praktijk in Rotterdam.
            </p>
            <ul className="space-y-4 pt-2">
              {[t("afspraak.b1"), t("afspraak.b2"), t("afspraak.b3")].map((b) => (
                <li key={b} className="flex items-start gap-3.5 text-foreground">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-foreground/80 font-light leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column — two big booking option cards */}
          <div className="space-y-6">
            {/* Option 1: Existing Patients */}
            <div className="rounded-2xl rounded-tr-none border border-border/80 bg-white p-8 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.04)] animate-fade-up">
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Optie 1
              </span>
              <h3 className="font-display text-xl font-bold text-primary uppercase mt-1 tracking-tight">
                Bestaande patiënt
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
                Bent u al patiënt bij MondVita? Maak eenvoudig online uw afspraak voor een periodieke controle of behandeling.
              </p>
              <div className="mt-6">
                <a
                  href="https://internetagenda.vertimart.nl/?id=21117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow transition duration-200 hover:bg-primary/95 active:scale-[0.98]"
                >
                  Afspraak inplannen
                </a>
              </div>
            </div>

            {/* Option 2: New Patients */}
            <div className="rounded-2xl rounded-tr-none border border-border/80 bg-white p-8 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.04)] animate-fade-up">
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Optie 2
              </span>
              <h3 className="font-display text-xl font-bold text-primary uppercase mt-1 tracking-tight">
                Nieuwe patiënt
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
                Wilt u zich inschrijven als nieuwe patiënt bij MondVita? Vul direct het inschrijfformulier in om u aan te melden.
              </p>
              <div className="mt-6">
                <a
                  href="https://internetagenda.vertimart.nl/inschrijven?id=21117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/45 bg-white py-4 text-xs font-bold uppercase tracking-widest text-primary transition duration-200 hover:bg-secondary active:scale-[0.98]"
                >
                  Inschrijven bij praktijk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
