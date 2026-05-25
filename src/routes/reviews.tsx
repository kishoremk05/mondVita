import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Star, MessageSquare, X, Loader2 } from "lucide-react";
import imgSetupPlace from "@/assets/new client images/dental setup place.png";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews MondVita | Tandartspraktijk Rotterdam" },
      { name: "description", content: "Lees de ervaringen en reviews van onze patiënten over MondVita Rotterdam. Uw betrouwbare tandarts voor persoonlijke mondzorg." },
      { property: "og:title", content: "Reviews MondVita | Tandartspraktijk Rotterdam" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Page,
});

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1 text-brand-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i} 
          className={`h-4.5 w-4.5 ${i < count ? "fill-current" : "text-border"}`} 
          strokeWidth={1.5} 
        />
      ))}
    </div>
  );
}

function Page() {
  const { t } = useTranslation();
  const { c } = useSiteContent();
  const reviewsBg = useSiteImage("images.reviews_bg", imgSetupPlace);
  
  // Modal states
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reviews = [
    { q: c("reviews.r1_q"), n: c("reviews.r1_n") },
    { q: c("reviews.r2_q"), n: c("reviews.r2_n") },
    { q: c("reviews.r3_q"), n: c("reviews.r3_n") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast.error("Vul aub alle verplichte velden in.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      setName("");
      setRating(5);
      setText("");
      toast.success("Bedankt! Uw review is ontvangen en wordt na controle zo snel mogelijk geplaatst.");
    }, 1200);
  };

  return (
    <SiteShell>
      <PageHeader
        title={c("reviews.title")}
        intro={c("reviews.intro")}
        bgImage={reviewsBg}
      />

      <section className="bg-secondary/40 py-20 relative">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section info tag */}
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// {t("reviews.badge")}
            </div>
            <h2 className="font-display text-2xl font-extrabold text-primary uppercase mt-1 tracking-tight">
              {t("reviews.sub")}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r, idx) => (
              <article
                key={r.n}
                className="group relative flex flex-col items-start rounded-2xl rounded-tr-none border border-border/70 bg-white p-8 transition-[border-color,box-shadow] duration-300 hover:border-brand-accent/50 hover:shadow-[0_16px_40px_-16px_rgba(12,35,64,0.08)] animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Decorative floating quote icon */}
                <div className="absolute bottom-6 end-8 text-secondary/30 select-none pointer-events-none transition-colors duration-300 group-hover:text-secondary/20">
                  <MessageSquare className="h-10 w-10 text-brand-accent/10" strokeWidth={1} />
                </div>

                <Stars count={5} />
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
            <button 
              onClick={() => setOpen(true)}
              className="rounded-lg bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow transition duration-200 hover:bg-primary/95 active:scale-[0.98] cursor-pointer"
            >
              {t("reviews.write")}
            </button>
          </div>
        </div>
      </section>

      {/* Review Submission Modal Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-reveal border border-border">
            <button 
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-secondary transition shrink-0 cursor-pointer"
              aria-label="Sluiten"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4">
              <h3 className="font-display text-lg font-bold text-primary uppercase">
                Schrijf een review
              </h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed mt-1">
                Deel uw ervaringen bij tandartspraktijk MondVita. Uw feedback helpt ons om onze mondzorg constant te verbeteren.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selectors */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/85 block">
                  Beoordeling (1 tot 5 sterren)
                </label>
                <div className="flex gap-1.5 py-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starIndex = i + 1;
                    const isActive = hoverRating !== null ? starIndex <= hoverRating : starIndex <= rating;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(starIndex)}
                        onMouseEnter={() => setHoverRating(starIndex)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="text-brand-accent p-0.5 hover:scale-110 transition cursor-pointer"
                      >
                        <Star className={`h-7 w-7 ${isActive ? "fill-current" : "text-border"}`} strokeWidth={1.5} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/85 block">
                  Uw Naam <span className="text-destructive">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Bijv. Lisa de Jong"
                  className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Text Area */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/85 block">
                  Uw Review / Ervaring <span className="text-destructive">*</span>
                </label>
                <textarea 
                  required
                  rows={4}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Schrijf hier uw ervaring met onze behandelingen of ons team..."
                  className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-secondary transition cursor-pointer"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow transition hover:bg-primary/95 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {submitting ? "Versturen..." : "Versturen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
