import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";
import { Sparkles, Users, Smile } from "lucide-react";
import { ToothMark } from "./Logo";

export function Features() {
  const { t } = useTranslation();
  const items: { Icon: LucideIcon | typeof ToothMark; t: string; d: string }[] = [
    { Icon: ToothMark, t: t("features.f1_t"), d: t("features.f1_d") },
    { Icon: Sparkles, t: t("features.f2_t"), d: t("features.f2_d") },
    { Icon: Users, t: t("features.f3_t"), d: t("features.f3_d") },
    { Icon: Smile, t: t("features.f4_t"), d: t("features.f4_d") },
  ];

  return (
    <section className="relative border-y border-border/80 bg-white py-20 md:py-24 overflow-hidden">
      {/* Decorative luxury mesh glow in background */}
      <div className="absolute -left-48 top-0 h-96 w-96 rounded-full bg-brand-accent/5 blur-[120px]" />
      <div className="absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, t: title, d }, idx) => (
            <article
              key={title}
              className="group relative flex flex-col items-start rounded-2xl rounded-tr-none border border-border/60 bg-secondary/30 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/50 hover:bg-secondary/60 hover:shadow-[0_12px_30px_-10px_rgba(12,35,64,0.06)] animate-fade-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Circular Icon Wrapper with Adaptive Hover Ring */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm border border-border/50 text-primary transition-all duration-300 group-hover:scale-[1.05] group-hover:border-brand-accent/40 group-hover:text-brand-accent">
                <Icon className="h-7 w-7 transition duration-300" strokeWidth={1.5} />
              </div>

              {/* Gold card-number display in top right */}
              <span className="absolute top-6 end-8 font-display text-sm font-bold text-brand-accent/30 select-none">
                0{idx + 1}
              </span>

              <h3 className="mt-6 font-display text-lg font-bold text-primary tracking-tight transition duration-200 group-hover:text-primary">
                {title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
                {d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

