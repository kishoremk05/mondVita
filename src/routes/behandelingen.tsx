import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ToothMark } from "@/components/site/Logo";
import { ArrowRight, Layers, Smile, Sparkles, Activity, Heart } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useSiteContent } from "@/hooks/useSiteContent";

// Import client images
import imgDoctorExplaining from "@/assets/new client images/doctor explaining teeth to patient.png";
import imgTeeth from "@/assets/new client images/teeth.png";
import imgTeethCap from "@/assets/new client images/teeth cap.png";
import imgUvLight from "@/assets/new client images/doctor fixing the teeth using uv light.png";
import imgTools from "@/assets/new client images/doctor fixing the teeth using tools.png";
import imgChild from "@/assets/new client images/child in dental office.png";
import imgDesktopTable from "@/assets/new client images/doctor desktop table with some components.png";

export const Route = createFileRoute("/behandelingen")({
  head: () => ({
    meta: [
      { title: "Tandarts Behandelingen Rotterdam | MondVita" },
      { name: "description", content: "Ontdek de mondzorgbehandelingen van MondVita Rotterdam: algemene mondzorg, implantaten, klikgebitten, protheses, wortelkanaalbehandeling en kindertandheelkunde." },
      { property: "og:title", content: "Tandarts Behandelingen Rotterdam | MondVita" },
    ],
    links: [{ rel: "canonical", href: "/behandelingen" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const { c } = useSiteContent();
  const treatmentsBg = useSiteImage("images.treatments_bg", imgDesktopTable);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scroll = () => {
        const elementId = hash.replace("#", "");
        const element = document.getElementById(elementId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      };

      scroll();
      const timer = setTimeout(scroll, 100);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  const getDetails = (key: string): string[] => {
    const res = t(key, { returnObjects: true });
    return Array.isArray(res) ? (res.filter(item => typeof item === "string") as string[]) : [];
  };

  const dynMondzorg = useSiteImage("images.shared_doctor_explaining", imgDoctorExplaining);
  const dynImplant = useSiteImage("images.implant_bg", imgTeeth);
  const dynProthese = useSiteImage("images.shared_teeth_cap", imgTeethCap);
  const dynEsth = useSiteImage("images.esth_bg", imgUvLight);
  const dynWortel = useSiteImage("images.shared_tools", imgTools);
  const dynKinder = useSiteImage("images.kinder_bg", imgChild);

  const items = [
    {
      t: c("svc.mondzorg"),
      d: c("svc.mondzorg_d"),
      Icon: ToothMark,
      img: dynMondzorg,
      note: c("svc.mondzorg_n"),
      details: getDetails("svc.mondzorg_det"),
      link: "/general-dental-care",
      id: "algemene-mondzorg",
    },
    {
      t: c("svc.implant"),
      d: c("svc.implant_d"),
      Icon: Layers,
      img: dynImplant,
      note: c("svc.implant_n"),
      details: getDetails("svc.implant_det"),
      link: "/implantologie",
      id: "implantologie",
    },
    {
      t: c("svc.prothese"),
      d: c("svc.prothese_d"),
      Icon: Smile,
      img: dynProthese,
      note: c("svc.prothese_n"),
      details: getDetails("svc.prothese_det"),
      link: "/protheses",
      id: "protheses",
    },
    {
      t: c("svc.esth"),
      d: c("svc.esth_d"),
      Icon: Sparkles,
      img: dynEsth,
      note: c("svc.esth_n"),
      details: getDetails("svc.esth_det"),
      link: "/esthetische-tandheelkunde",
      id: "esthetische-tandheelkunde",
    },
    {
      t: c("svc.wortel"),
      d: c("svc.wortel_d"),
      Icon: Activity,
      img: dynWortel,
      note: c("svc.wortel_n"),
      details: getDetails("svc.wortel_det"),
      link: "/wortelkanaalbehandeling",
      id: "wortelkanaalbehandeling",
    },
    {
      t: c("svc.kinder"),
      d: c("svc.kinder_d"),
      Icon: Heart,
      img: dynKinder,
      note: c("svc.kinder_n"),
      details: getDetails("svc.kinder_det"),
      link: "/kindertandheelkunde",
      id: "kindertandheelkunde",
    },
  ];

  return (
    <SiteShell>
      <PageHeader
        title={c("behandelingen.title")}
        intro={c("behandelingen.intro")}
        bgImage={treatmentsBg}
      />

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-5xl px-6 space-y-12">
          {items.map((it, idx) => (
            <article
              key={it.id}
              id={it.id}
              className="group flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white rounded-2xl rounded-tr-none border border-border/80 p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.06)] md:even:flex-row-reverse animate-fade-in"
            >
              {/* Image beside the text box */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden bg-secondary/50 border border-border/50 relative">
                <img
                  src={it.img}
                  alt={it.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-opacity duration-300 ease-out"
                />
              </div>

              {/* Text / service information box */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  {it.Icon === ToothMark ? (
                    <ToothMark className="h-6 w-6" />
                  ) : (
                    <it.Icon className="h-6 w-6" strokeWidth={1.5} />
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-primary tracking-tight">
                  {it.t}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {it.d}
                </p>

                <p className="rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-foreground/80">
                  {it.note}
                </p>

                <ul className="grid gap-2 pt-1 sm:grid-cols-2">
                  {it.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 rounded-xl border border-border/50 bg-secondary/30 px-3 py-2 text-xs leading-relaxed text-foreground/75">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-accent shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Link
                    to={it.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-colors duration-200 hover:underline"
                  >
                    <span>{t("help.more")}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-colors duration-300" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
