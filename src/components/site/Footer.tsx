import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { fetchContact, fetchCustomPages } from "@/lib/site-data";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useSiteContent } from "@/hooks/useSiteContent";
import imgAddress from "@/assets/new client images/address.png";

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function Footer() {
  const { t, i18n } = useTranslation();
  const { c } = useSiteContent();
  const { data: contact } = useQuery({ queryKey: ["contact"], queryFn: fetchContact });
  const { data: customPages = [] } = useQuery({ queryKey: ["custom_pages"], queryFn: fetchCustomPages });

  const getLocale = (lng: string): "nl" | "en" | "ar" => {
    const loc = lng.slice(0, 2);
    return loc === "nl" || loc === "en" || loc === "ar" ? loc : "en";
  };
  const activeLocale = getLocale(i18n.language);

  const footerLocationImg = useSiteImage("images.footer_location", imgAddress);
  const socials = contact?.socials ?? {};
  const declarationsLabel = t("footer.declarations");
  const hours = contact?.hours ?? {};  const morning = hours.morning ?? "09:00 - 12:00";
  const lunch = hours.lunch ?? "12:00 - 13:00";
  const afternoon = hours.afternoon ?? "13:00 - 17:00";
  return (
    <footer className="border-t border-brand-accent/20 bg-primary pt-16 pb-8 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Left Column: Brand & Socials */}
        <div className="space-y-4">
          <Logo className="text-white" />
          <p className="max-w-xs text-sm text-white/60 font-light leading-relaxed">
            {c("footer.tagline")}
          </p>
          <div className="flex gap-2 pt-2">
            {[
              { Icon: Instagram, href: socials.instagram ?? "#", label: "Instagram" },
              { Icon: TiktokIcon, href: socials.tiktok ?? "#", label: "TikTok" },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                aria-label={label}
                target={href === "#" ? undefined : "_blank"}
                rel={href === "#" ? undefined : "noreferrer"}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition duration-200 hover:border-brand-accent hover:bg-white/10 hover:text-brand-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Middle Column: Navigation */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent">
            {t("footer.quick")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70 font-light">
            <li><Link to="/behandelingen" className="inline-flex transition duration-150 hover:text-white hover:underline hover:underline-offset-4 focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">{t("nav.behandelingen")}</Link></li>
            <li><Link to="/protheses" className="inline-flex transition duration-150 hover:text-white hover:underline hover:underline-offset-4 focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">{t("nav.protheses")}</Link></li>
            <li><Link to="/spoed" className="inline-flex transition duration-150 hover:text-white hover:underline hover:underline-offset-4 focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">{t("nav.spoed")}</Link></li>
            <li><Link to="/declaraties" className="inline-flex transition duration-150 hover:text-white hover:underline hover:underline-offset-4 focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">{declarationsLabel}</Link></li>
            <li><Link to="/reviews" className="inline-flex transition duration-150 hover:text-white hover:underline hover:underline-offset-4 focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">{t("nav.reviews")}</Link></li>
            <li><Link to="/over-ons" className="inline-flex transition duration-150 hover:text-white hover:underline hover:underline-offset-4 focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">{t("nav.over")}</Link></li>
            {customPages.map(p => {
              const label = p.translations?.[activeLocale]?.title || p.translations?.nl?.title || p.slug;
              return (
                <li key={p.id}>
                  <Link
                    to="/p/$slug"
                    params={{ slug: p.slug }}
                    className="inline-flex transition duration-150 hover:text-white hover:underline hover:underline-offset-4 focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>        </div>

        {/* Third Column: Contact info & Location Map */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              {t("footer.contact_h")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-brand-accent shrink-0" strokeWidth={1.5} />
                <span className="leading-snug">{t("contact.address_v")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-accent shrink-0" strokeWidth={1.5} />
                <span>{t("contact.phone_v")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-accent shrink-0" strokeWidth={1.5} />
                <span>{t("contact.email_v")}</span>
              </li>
            </ul>
          </div>
          {/* User Requested Static Location Image instead of live Google Map - smaller & cleaner */}
          <div className="overflow-hidden rounded-xl border border-white/10 shadow-sm bg-white/5 max-w-[220px]">
            <img 
              src={footerLocationImg} 
              alt="MondVita Rotterdam Locatie" 
              className="w-full h-28 object-cover hover:scale-105 transition-transform duration-300" 
            />
          </div>
        </div>

        {/* Fourth Column: Opening Hours */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent">
            {t("generalCare.hours_title")}
          </h4>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 font-light">
            <p className="text-xs font-bold uppercase tracking-wider text-white">{t("generalCare.hours_day")}</p>
            <div className="mt-2.5 space-y-1 text-xs">
              <p className="font-medium text-white">{morning}</p>
              <p className="text-white/60">{t("generalCare.hours_break_label")}: {lunch}</p>
              <p className="font-medium text-white">{afternoon}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-6 text-center text-xs text-white/40 font-light">
        © {new Date().getFullYear()} MondVita. {c("footer.rights")}.
      </div>
    </footer>
  );
}

