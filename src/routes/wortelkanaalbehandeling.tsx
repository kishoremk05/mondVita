import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ToothMark } from "@/components/site/Logo";
import { Activity, ArrowRight, Shield, Heart, Sparkles, Smile } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useSiteContent } from "@/hooks/useSiteContent";

// Import client images
import imgTools from "@/assets/new client images/doctor fixing the teeth using tools.png";
import imgDoctorExplaining from "@/assets/new client images/doctor explaining teeth to patient.png";
import imgAdultMatch from "@/assets/new client images/adult with teeth  match checking.png";
import imgSetup from "@/assets/new client images/dental setup place.png";

export const Route = createFileRoute("/wortelkanaalbehandeling")({
  head: () => ({
    meta: [
      { title: "Wortelkanaalbehandeling Rotterdam | MondVita" },
      { name: "description", content: "Professionele wortelkanaalbehandeling in Rotterdam bij MondVita. Pijnloze en zorgvuldige behandeling voor het behoud van uw eigen tanden." },
      { property: "og:title", content: "Wortelkanaalbehandeling Rotterdam | MondVita" },
    ],
    links: [{ rel: "canonical", href: "/wortelkanaalbehandeling" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const { c } = useSiteContent();

  const rootCanalBg = useSiteImage("images.root_canal_bg", imgTools);
  const imgExpl = useSiteImage("images.shared_doctor_explaining", imgDoctorExplaining);
  const imgStp = useSiteImage("images.shared_setup_place", imgSetup);
  const imgMch = useSiteImage("images.shared_adult_match", imgAdultMatch);
  const imgTls = useSiteImage("images.shared_tools", imgTools);

  const items = [
    { id: "p1", t: c("wortelCare.p1_t"), d: c("wortelCare.p1_d"), Icon: Sparkles, img: imgExpl },
    { id: "p2", t: c("wortelCare.p2_t"), d: c("wortelCare.p2_d"), Icon: Shield, img: imgStp },
    { id: "p3", t: c("wortelCare.p3_t"), d: c("wortelCare.p3_d"), Icon: Smile, img: imgMch },
    { id: "p4", t: c("wortelCare.p4_t"), d: c("wortelCare.p4_d"), Icon: Activity, img: imgTls },
  ];

  return (
    <SiteShell>
      <PageHeader
        title={c("wortelCare.title")}
        intro={c("wortelCare.intro")}
        bgImage={rootCanalBg}
      >
        {/* Floating Glassmorphic Card on Header Right */}
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-xl max-w-sm md:ml-auto animate-fade-up">
          <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider">
            {c("wortelCare.side_title")}
          </h4>
          <p className="mt-2 text-sm text-white/80 leading-relaxed font-light">
            {c("wortelCare.side_text")}
          </p>
          <Link
            to="/contact"
            className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 transition duration-200"
          >
            <span>{t("nav.contact")}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-colors duration-200" />
          </Link>
        </div>
      </PageHeader>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1.8fr_1fr] md:items-start">
          {/* Left Column: Horizontal list of procedures with images beside them */}
          <div className="space-y-6">
            {items.map((it, idx) => (
              <article
                key={it.id}
                className="group flex flex-col sm:flex-row gap-6 rounded-2xl rounded-tr-none border border-border/40 bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image beside the service box info */}
                <div className="w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-secondary border border-border/50 shrink-0">
                  <img
                    src={it.img}
                    alt={it.t}
                    loading="lazy"
                    className="h-full w-full object-cover transition-opacity duration-300 ease-out"
                  />
                </div>

                {/* Text content */}
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white mb-3">
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
              {c("wortelCare.title")}
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-light">
              {c("wortelCare.body1")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
              {c("wortelCare.body2")}
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
            { id: "b1", Icon: Heart, t: c("wortelCare.b1_t"), d: c("wortelCare.b1_d") },
            { id: "b2", Icon: Shield, t: c("wortelCare.b2_t"), d: c("wortelCare.b2_d") },
            { id: "b3", Icon: Activity, t: c("wortelCare.b3_t"), d: c("wortelCare.b3_d") },
          ].map(({ id, Icon, t: title, d }) => (
            <div key={id} className="flex items-center gap-4 animate-fade-up">
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
