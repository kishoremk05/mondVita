import type { ReactNode } from "react";
import defaultBg from "@/assets/clinic-interior.jpg";

export function PageHeader({
  title,
  intro,
  bgImage = defaultBg,
  children,
}: {
  title: string;
  intro?: string;
  bgImage?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-[320px] md:min-h-[380px] flex items-center pt-32 pb-16 overflow-hidden bg-primary text-white">
      {/* Full-bleed Background Image with Premium Multi-stop Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt=""
          loading="eager"
          className="h-full w-full object-cover object-center scale-102 animate-scale-reveal"
        />
        {/* Navy Editorial Gradient Tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/98 via-primary/85 to-primary/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-primary/10" />
        {/* Fine gold hair-line layout borders */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-brand-accent/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 animate-fade-up">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div className="space-y-4">
            {/* Styled category micro-tag */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-accent backdrop-blur-sm">
              MondVita Amsterdam
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl uppercase leading-tight">
              {title}
            </h1>
            {intro && (
              <p className="max-w-xl text-base text-white/80 md:text-lg leading-relaxed font-light">
                {intro}
              </p>
            )}
          </div>
          {children && (
            <div className="w-full flex justify-end animate-slide-in-right">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

