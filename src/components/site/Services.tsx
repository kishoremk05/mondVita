import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import imgDoctorExplaining from "@/assets/new client images/doctor explaining teeth to patient.png";
import imgTeeth from "@/assets/new client images/teeth.png";
import imgTeethCap from "@/assets/new client images/teeth cap.png";
import imgSpoedImg from "@/assets/new client images/spoe.png";
import imgUvLight from "@/assets/new client images/doctor fixing the teeth using uv light.png";
import imgChild from "@/assets/new client images/child in dental office.png";
import { useSiteImage } from "@/hooks/useSiteImage";
import { fetchServices, publicUrl, type ServiceRow } from "@/lib/site-data";

function getLocale(language: string) {
  const locale = language.slice(0, 2);
  return locale === "nl" || locale === "en" || locale === "ar" ? locale : "en";
}

function resolveCardImage(row: ServiceRow, index: number, dynFallbacks: string[]) {
  const imageUrl = row.image_url?.trim();
  if (imageUrl) {
    return imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("/")
      ? imageUrl
      : publicUrl(imageUrl);
  }

  return dynFallbacks[index % dynFallbacks.length];
}

function getCardCopy(row: ServiceRow, locale: ReturnType<typeof getLocale>) {
  const translations = row.translations ?? {};
  const current = translations[locale] ?? translations.en ?? translations.nl ?? translations.ar;
  return {
    title: current?.title ?? "",
    desc: current?.desc ?? "",
  };
}

function normalizeLink(linkPath?: string | null) {
  const value = linkPath?.trim() ?? "";
  if (!value) return "/behandelingen";
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("mailto:") || value.startsWith("tel:")) {
    return value;
  }
  return value.startsWith("/") ? value : `/${value}`;
}

export function Services() {
  const { t, i18n } = useTranslation();
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const locale = getLocale(i18n.language);

  const dynMondzorg = useSiteImage("images.shared_doctor_explaining", imgDoctorExplaining);
  const dynImplant = useSiteImage("images.implant_bg", imgTeeth);
  const dynProthese = useSiteImage("images.shared_teeth_cap", imgTeethCap);
  const dynSpoed = useSiteImage("images.services_spoed", imgSpoedImg);
  const dynEsth = useSiteImage("images.esth_bg", imgUvLight);
  const dynKinder = useSiteImage("images.kinder_bg", imgChild);

  const dynFallbacks = [dynMondzorg, dynImplant, dynProthese, dynSpoed, dynEsth, dynKinder];

  const cards = services.length > 0
    ? services.map((row, index) => ({
        id: row.id,
        image: resolveCardImage(row, index, dynFallbacks),
        link: normalizeLink(row.link_path),
        ...getCardCopy(row, locale),
      }))
    : [
        { id: "esth", image: dynEsth, title: t("svc.esth"), desc: t("svc.esth_d"), link: "/esthetische-tandheelkunde" },
        { id: "mondzorg", image: dynMondzorg, title: t("svc.mondzorg"), desc: t("svc.mondzorg_d"), link: "/general-dental-care" },
        { id: "implant", image: dynImplant, title: t("svc.implant"), desc: t("svc.implant_d"), link: "/implantologie" },
        { id: "prothese", image: dynProthese, title: t("svc.prothese"), desc: t("svc.prothese_d"), link: "/protheses" },
        { id: "kinder", image: dynKinder, title: t("svc.kinder"), desc: t("svc.kinder_d"), link: "/kindertandheelkunde" },
        { id: "spoed", image: dynSpoed, title: t("svc.spoed"), desc: t("svc.spoed_d"), link: "/spoed" },
      ];

  return (
    <section id="services" className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Decorative blurred glow in background */}
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-brand-accent/5 blur-[120px] select-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.8fr] lg:items-start lg:gap-16">
          {/* Section Header Left */}
          <div className="space-y-4 lg:sticky lg:top-28 animate-fade-up">
            <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// {t("help.badge")}
            </div>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-primary md:text-5xl uppercase tracking-tight">
              {t("help.title")}
            </h2>
            <div className="h-[2px] w-16 bg-brand-accent/60 mt-4" />
          </div>

          {/* Cards Grid Right */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-6">
            {cards.map((c, idx) => (
              (() => {
                const link = normalizeLink(c.link);
                const isExternal = link.startsWith("http") || link.startsWith("mailto:") || link.startsWith("tel:");
                return isExternal ? (
                <a
                  key={c.id}
                  href={link}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-accent/50 hover:shadow-[0_16px_36px_-12px_rgba(12,35,64,0.12)] animate-fade-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-primary/5 relative">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="h-full w-full object-cover transition-opacity duration-300 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-col justify-between gap-4 bg-white px-5 py-4 border-t border-border/50 transition-colors duration-300 group-hover:bg-secondary/40 min-h-[125px]">
                    <div className="min-w-0 space-y-1">
                      <p className="font-display text-sm font-bold text-primary tracking-tight leading-snug">{c.title}</p>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground font-light">{c.desc}</p>
                    </div>
                    <div className="flex shrink-0 w-fit self-start items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-primary-foreground">
                      <span>{t("help.more")}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-colors duration-300 rtl:rotate-180" />
                    </div>
                  </div>
                </a>
                ) : (
                <Link
                  key={c.id}
                  to={link as never}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-accent/50 hover:shadow-[0_16px_36px_-12px_rgba(12,35,64,0.12)] animate-fade-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-primary/5 relative">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="h-full w-full object-cover transition-opacity duration-300 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-col justify-between gap-4 bg-white px-5 py-4 border-t border-border/50 transition-colors duration-300 group-hover:bg-secondary/40 min-h-[125px]">
                    <div className="min-w-0 space-y-1">
                      <p className="font-display text-sm font-bold text-primary tracking-tight leading-snug">{c.title}</p>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground font-light">{c.desc}</p>
                    </div>
                    <div className="flex shrink-0 w-fit self-start items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-primary-foreground">
                      <span>{t("help.more")}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-colors duration-300 rtl:rotate-180" />
                    </div>
                  </div>
                </Link>
                );
              })()
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

