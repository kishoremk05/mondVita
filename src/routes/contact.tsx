import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import contactDesk from "@/assets/contact-desk.png";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MondVita" },
      { name: "description", content: "Neem contact op met MondVita voor vragen of een afspraak. Adres, telefoon, e-mail en openingstijden." },
      { property: "og:title", content: "Contact — MondVita" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const contactBg = useSiteImage("images.contact_bg", contactDesk);

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
              /// MondVita Amsterdam
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary uppercase tracking-tight">
              Onze Praktijkgegevens
            </h2>
            <ul className="space-y-6 pt-2">
              {[
                { Icon: MapPin, label: t("contact.address"), v: t("contact.address_v") },
                { Icon: Phone, label: t("contact.phone"), v: t("contact.phone_v") },
                { Icon: Mail, label: t("contact.email"), v: t("contact.email_v") },
                { Icon: Clock, label: t("contact.hours"), v: t("contact.hours_v") },
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
                      {v}
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
    </SiteShell>
  );
}


