import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ToothMark } from "@/components/site/Logo";
import { Users, Sparkles, ArrowRight, Layers, Smile, Wrench } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";

// Import client images
import imgAdultMatch from "@/assets/new client images/adult with teeth  match checking.png";
import imgTeethCap from "@/assets/new client images/teeth cap.png";
import imgMenVisual from "@/assets/new client images/men with teeth fixing seeing visual.png";
import imgClientXray from "@/assets/new client images/client with teeth xray.png";
import imgTeethCap1 from "@/assets/new client images/teeth cap 1.png";

export const Route = createFileRoute("/protheses")({
  head: () => ({
    meta: [
      { title: "Kunstgebit & Klikgebit Rotterdam | MondVita Protheses" },
      { name: "description", content: "Specialist in kunstgebit en klikgebit in Rotterdam. Laat uw protheses op maat maken bij MondVita Rotterdam. Ook voor spoed reparaties." },
      { property: "og:title", content: "Kunstgebit & Klikgebit Rotterdam | MondVita Protheses" },
    ],
    links: [{ rel: "canonical", href: "/protheses" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const prothesesBg = useSiteImage("images.protheses_bg", imgTeethCap1);

  const items = [
    { t: t("protheses.p1_t"), d: t("protheses.p1_d"), Icon: Layers, img: imgAdultMatch },
    { t: t("protheses.p2_t"), d: t("protheses.p2_d"), Icon: Smile, img: imgTeethCap },
    { t: t("protheses.p3_t"), d: t("protheses.p3_d"), Icon: Sparkles, img: imgMenVisual },
    { t: t("protheses.p4_t"), d: t("protheses.p4_d"), Icon: Wrench, img: imgClientXray },
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
            Kunstgebit of prothese gebroken? Wij verzorgen vakkundige en snelle reparaties in ons eigen lab in Rotterdam.
          </p>
          <Link
            to="/contact"
            className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 transition duration-200"
          >
            <span>Neem contact op</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </PageHeader>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1.8fr_1fr] md:items-start">
          {/* Left Column: Horizontal list of service boxes with images beside them */}
          <div className="space-y-6">
            {items.map((it, idx) => (
              <article
                key={it.t}
                className="group flex flex-col sm:flex-row gap-6 rounded-2xl rounded-tr-none border border-border/40 bg-white p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image beside the service box info */}
                <div className="w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-secondary border border-border/50 shrink-0">
                  <img
                    src={it.img}
                    alt={it.t}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text content */}
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white mb-3">
                      {it.Icon === ToothMark ? (
                        <ToothMark className="h-5 w-5" />
                      ) : (
                        <it.Icon className="h-5 w-5" strokeWidth={1.5} />
                      )}
                    </div>
                    <h3 className="font-display text-base font-bold text-primary tracking-tight">
                      {it.t}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed font-light">
                      {it.d}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Column: Floating Crisp White Card */}
          <aside className="relative overflow-hidden rounded-2xl rounded-tr-none border border-border/80 bg-white p-8 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.06)] animate-fade-up md:sticky md:top-28">
            {/* Elegant vertical focus line */}
            <div className="absolute top-0 start-0 w-[4px] h-full bg-primary" />

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
      <section className="bg-primary py-12 text-primary-foreground border-t border-border/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-3">
          {[
            { Icon: ToothMark, t: t("protheses.b1_t"), d: t("protheses.b1_d") },
            { Icon: Sparkles, t: t("protheses.b2_t"), d: t("protheses.b2_d") },
            { Icon: Users, t: t("protheses.b3_t"), d: t("protheses.b3_d") },
          ].map(({ Icon, t: title, d }) => (
            <div key={title} className="flex items-center gap-4 animate-fade-up">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-white border border-white/10">
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
