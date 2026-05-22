import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import imgAddress from "@/assets/new client images/address image.png";
import { useSiteImage } from "@/hooks/useSiteImage";
import { fetchContact } from "@/lib/site-data";

function normalizeHours(hours: Record<string, string> | undefined) {
  return {
    morning: hours?.morning ?? hours?.mon_fri ?? "09:00 - 12:00",
    lunch: hours?.lunch ?? hours?.sat ?? "12:00 - 13:00",
    afternoon: hours?.afternoon ?? hours?.sun ?? "13:00 - 17:00",
  };
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact/Klachten — MondVita" },
      { name: "description", content: "Neem contact op met MondVita voor vragen of een afspraak. Adres, telefoon, e-mail en openingstijden." },
      { property: "og:title", content: "Contact/Klachten — MondVita" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const { data: contact } = useQuery({ queryKey: ["contact"], queryFn: fetchContact });
  const contactBg = useSiteImage("images.contact_bg", imgAddress);
  const mapImg = useSiteImage("images.map_bg", imgAddress);
  const hours = normalizeHours(contact?.hours);


  return (
    <SiteShell>
      <PageHeader
        title={t("contact.title")}
        intro={t("contact.intro")}
        bgImage={contactBg}
      />


      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:gap-16">
          {/* Left Column: Coordinates */}
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// {t("contact.badge")}
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary uppercase tracking-tight">
              {t("contact.sub")}
            </h2>
            <ul className="space-y-6 pt-2">
              {[
                { Icon: MapPin, label: t("contact.address"), v: contact?.address ?? t("contact.address_v") },
                { Icon: Phone, label: t("contact.phone"), v: contact?.phone ?? t("contact.phone_v") },
                { Icon: Mail, label: t("contact.email"), v: contact?.email ?? t("contact.email_v") },
                { Icon: Clock, label: t("contact.hours"), v: `${t("generalCare.hours_day")}\n${hours.morning}\n${hours.lunch}\n${hours.afternoon}` },
              ].map(({ Icon, label, v }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-border shadow-sm text-primary">
                    <Icon className="h-5 w-5 text-brand-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-primary mt-0.5 leading-relaxed">
                      <span className="whitespace-pre-line">{v}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Form */}
          <form
            className="rounded-2xl rounded-tr-none border border-border/80 bg-white p-8 shadow-[0_16px_40px_-16px_rgba(12,35,64,0.06)] animate-fade-up"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder={t("contact.first")}
                required
                className="w-full rounded-lg border border-border/80 bg-white px-4 py-3 text-sm font-light transition-all duration-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 focus:outline-none placeholder:text-muted-foreground/60"
              />
              <input
                placeholder={t("contact.last")}
                required
                className="w-full rounded-lg border border-border/80 bg-white px-4 py-3 text-sm font-light transition-all duration-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 focus:outline-none placeholder:text-muted-foreground/60"
              />
              <input
                placeholder={t("contact.email")}
                type="email"
                required
                className="w-full rounded-lg border border-border/80 bg-white px-4 py-3 text-sm font-light transition-all duration-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 focus:outline-none placeholder:text-muted-foreground/60 sm:col-span-2"
              />
              <select
                required
                className="w-full rounded-lg border border-border/80 bg-white px-4 py-3 text-sm font-light transition-all duration-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 focus:outline-none text-foreground/80"
                defaultValue=""
              >
                <option value="" disabled>
                  {t("contact.subject_p")}
                </option>
                <option>{t("nav.behandelingen")}</option>
                <option>{t("nav.protheses")}</option>
                <option>{t("nav.spoed")}</option>
                <option>{t("nav.book")}</option>
              </select>
              <textarea
                placeholder={t("contact.message")}
                rows={5}
                required
                className="w-full resize-none rounded-lg border border-border/80 bg-white px-4 py-3 text-sm font-light transition-all duration-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 focus:outline-none placeholder:text-muted-foreground/60 sm:col-span-2"
              />
              <button
                type="submit"
                className="sm:col-span-2 mt-4 w-full rounded-lg bg-primary py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-md transition-all duration-250 hover:bg-primary/95 active:scale-[0.98]"
              >
                {t("contact.submit")}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div className="space-y-4">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(contact?.address ?? t("contact.address_v"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-3xl border border-border/80 shadow-[0_16px_40px_-20px_rgba(12,35,64,0.12)]"
            >
              <img
                src={mapImg}
                alt={contact?.address ?? t("contact.address_v")}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary shadow-lg border border-border flex items-center gap-2 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                  <MapPin className="h-4 w-4 text-brand-accent animate-bounce" />
                  {t("contact.open_in_google_maps")}
                </span>
              </div>
            </a>
          </div>

          <div className="space-y-4 rounded-3xl border border-border/80 bg-white p-8 shadow-sm">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// {t("contact.sub")}
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary uppercase tracking-tight">
              {t("contact.title")}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground font-light">
              {t("contact.intro")}
            </p>
            <div className="rounded-2xl bg-secondary/40 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{t("contact.hours")}</p>
              <p className="mt-2 text-sm text-foreground/80 whitespace-pre-line">
                {t("generalCare.hours_day")}
                {"\n"}{hours.morning}
                {"\n"}{hours.lunch}
                {"\n"}{hours.afternoon}
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}


