import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { fetchContact } from "@/lib/site-data";

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const { data: contact } = useQuery({ queryKey: ["contact"], queryFn: fetchContact });
  const socials = contact?.socials ?? {};
  const declarationsLabel = "Declaraties";
  const hours = contact?.hours ?? {};
  const morning = hours.morning ?? hours.mon_fri ?? "09:00 - 12:00";
  const lunch = hours.lunch ?? hours.sat ?? "12:00 - 13:00";
  const afternoon = hours.afternoon ?? hours.sun ?? "13:00 - 17:00";
  return (
    <footer className="border-t border-brand-accent/20 bg-primary pt-16 pb-8 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        {/* Left Column: Brand & Socials */}
        <div className="space-y-4">
          <Logo className="text-white" />
          <p className="max-w-xs text-sm text-white/60 font-light leading-relaxed">
            {t("footer.tagline")}
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
            <li><Link to="/behandelingen" className="transition duration-150 hover:text-brand-accent">{t("nav.behandelingen")}</Link></li>
            <li><Link to="/protheses" className="transition duration-150 hover:text-brand-accent">{t("nav.protheses")}</Link></li>
            <li><Link to="/spoed" className="transition duration-150 hover:text-brand-accent">{t("nav.spoed")}</Link></li>
            <li><Link to="/declaraties" className="transition duration-150 hover:text-brand-accent">{declarationsLabel}</Link></li>
            <li><Link to="/reviews" className="transition duration-150 hover:text-brand-accent">{t("nav.reviews")}</Link></li>
            <li><Link to="/over-ons" className="transition duration-150 hover:text-brand-accent">{t("nav.over")}</Link></li>
          </ul>
        </div>

        {/* Right Column: Contact info */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent">
            {t("footer.contact_h")}
          </h4>
          <ul className="mt-4 space-y-3.5 text-sm text-white/70 font-light">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4.5 w-4.5 text-brand-accent shrink-0" strokeWidth={1.5} />
              <span>{t("contact.address_v")}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4.5 w-4.5 text-brand-accent shrink-0" strokeWidth={1.5} />
              <span>{t("contact.phone_v")}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4.5 w-4.5 text-brand-accent shrink-0" strokeWidth={1.5} />
              <span>{t("contact.email_v")}</span>
            </li>
          </ul>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 font-light">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-accent">Opening hours</p>
            <p className="mt-2 font-medium text-white/85">Monday - Saturday</p>
            <p className="mt-1">{morning}</p>
            <p>Lunch break: {lunch}</p>
            <p>{afternoon}</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-6 text-center text-xs text-white/40 font-light">
        © {new Date().getFullYear()} MondVita. {t("footer.rights")}.
      </div>
    </footer>
  );
}

