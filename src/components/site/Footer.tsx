import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useTranslation();
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
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
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
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-6 text-center text-xs text-white/40 font-light">
        © {new Date().getFullYear()} MondVita. {t("footer.rights")}.
      </div>
    </footer>
  );
}

