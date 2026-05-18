import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ToothMark } from "@/components/site/Logo";
import { Users, Sparkles, ArrowRight, Layers, Smile, Wrench } from "lucide-react";
import prothese from "@/assets/svc-prothese.jpg";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/protheses")({
  head: () => ({
    meta: [
      { title: "Protheses — MondVita" },
      { name: "description", content: "Protheses op maat bij MondVita: gedeeltelijke en volledige kunstgebitten, implantaat gedragen prothese en vakkundige reparatie." },
      { property: "og:title", content: "Protheses — MondVita" },
    ],
    links: [{ rel: "canonical", href: "/protheses" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const prothesesBg = useSiteImage("images.protheses_bg", prothese);
  const items = [
    { t: t("protheses.p1_t"), d: t("protheses.p1_d"), Icon: Layers },
    { t: t("protheses.p2_t"), d: t("protheses.p2_d"), Icon: Smile },
    { t: t("protheses.p3_t"), d: t("protheses.p3_d"), Icon: Sparkles },
    { t: t("protheses.p4_t"), d: t("protheses.p4_d"), Icon: Wrench },
  ];
  return (
    <SiteShell>
      <PageHeader
        title={t("protheses.title")}
        intro={t("protheses.intro")}
        bgImage={prothesesBg}
      >

        {/* Floating Glassmorphic Repair Card on Header Right */}
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-xl max-w-sm md:ml-auto animate-fade-up">
          <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider">
            Snelle Reparatie
          </h4>
          <p className="mt-2 text-sm text-white/80 leading-relaxed font-light">
            Kunstgebit of prothese gebroken? Wij verzorgen vakkundige en snelle reparaties in ons eigen lab in Amsterdam.
          </p>
          <Link
            to="/contact"
            className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-white transition duration-200"
          >
            <span>Neem contact op</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </PageHeader>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1.8fr_1fr] md:items-start">
          {/* Left Column: Asymmetric Vertical List */}
          <div className="space-y-6">
            {items.map((it, idx) => (
              <article
                key={it.t}
                className="group flex gap-6 rounded-2xl rounded-tr-none border border-border/40 bg-white p-6 transition-all duration-300 hover:border-brand-accent/40 hover:shadow-[0_12px_24px_-8px_rgba(12,35,64,0.05)] animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:scale-[1.05] group-hover:bg-brand-accent/15 group-hover:text-brand-accent">
                  {it.Icon === ToothMark ? (
                    <ToothMark className="h-6 w-6" />
                  ) : (
                    <it.Icon className="h-6 w-6" strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-primary tracking-tight transition duration-200 group-hover:text-primary">
                    {it.t}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed font-light">
                    {it.d}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Right Column: Floating Crisp White Card */}
          <aside className="relative overflow-hidden rounded-2xl rounded-tr-none border border-border/80 bg-white p-8 shadow-[0_16px_40px_-16px_rgba(12,35,64,0.06)] animate-fade-up">
            {/* Elegant champagne vertical focus line */}
            <div className="absolute top-0 start-0 w-[4px] h-full bg-brand-accent" />

            <h3 className="font-display text-xl font-bold text-primary tracking-tight uppercase">
              {t("protheses.side_title")}
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-light">
              {t("protheses.side_text")}
            </p>
            <Link
              to="/afspraak"
              className="mt-8 block rounded-lg bg-primary py-3.5 text-center text-xs font-bold uppercase tracking-widest text-primary-foreground shadow transition duration-250 hover:bg-primary/95 active:scale-[0.98]"
            >
              {t("nav.book")}
            </Link>
          </aside>
        </div>
      </section>

      {/* Trust Values Banner */}
      <section className="bg-primary py-12 text-primary-foreground border-t border-brand-accent/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-3">
          {[
            { Icon: ToothMark, t: t("protheses.b1_t"), d: t("protheses.b1_d") },
            { Icon: Sparkles, t: t("protheses.b2_t"), d: t("protheses.b2_d") },
            { Icon: Users, t: t("protheses.b3_t"), d: t("protheses.b3_d") },
          ].map(({ Icon, t: title, d }) => (
            <div key={title} className="flex items-center gap-4 animate-fade-up">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-brand-accent border border-white/10">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-white tracking-tight uppercase">
                  {title}
                </p>
                <p className="text-xs text-white/70 mt-1 font-light leading-relaxed">
                  {d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}


