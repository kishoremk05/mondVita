import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Star, MessageSquare } from "lucide-react";
import waitingRoom from "@/assets/waiting-room.jpg";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — MondVita" },
      { name: "description", content: "Lees ervaringen van patiënten van MondVita en deel uw eigen review." },
      { property: "og:title", content: "Reviews — MondVita" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Page,
});

function Stars() {
  return (
    <div className="flex gap-1 text-brand-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4.5 w-4.5 fill-current" strokeWidth={1.5} />
      ))}
    </div>
  );
}

function Page() {
  const { t } = useTranslation();
  const reviews = [
    { q: t("reviews.r1_q"), n: t("reviews.r1_n") },
    { q: t("reviews.r2_q"), n: t("reviews.r2_n") },
    { q: t("reviews.r3_q"), n: t("reviews.r3_n") },
  ];
  return (
    <SiteShell>
      <PageHeader
        title={t("reviews.title")}
        intro={t("reviews.intro")}
        bgImage={waitingRoom}
      />

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section info tag */}
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// Patiëntentevredenheid
            </div>
            <h2 className="font-display text-2xl font-extrabold text-primary uppercase mt-1 tracking-tight">
              Wat onze patiënten ervaren
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r, idx) => (
              <article
                key={r.n}
                className="group relative flex flex-col items-start rounded-2xl rounded-tr-none border border-border/70 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/50 hover:shadow-[0_16px_40px_-16px_rgba(12,35,64,0.08)] animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Decorative floating quote icon */}
                <div className="absolute bottom-6 end-8 text-secondary/30 select-none pointer-events-none transition-transform duration-300 group-hover:scale-110">
                  <MessageSquare className="h-10 w-10 text-brand-accent/10" strokeWidth={1} />
                </div>

                <Stars />
                <p className="mt-5 text-sm leading-relaxed text-foreground/80 font-light italic">
                  "{r.q}"
                </p>
                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-primary/60">
                  — {r.n}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-start animate-fade-up">
            <button className="rounded-lg bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow transition duration-200 hover:bg-primary/95 active:scale-[0.98]">
              {t("reviews.write")}
            </button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

