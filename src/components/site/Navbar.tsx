import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, CalendarDays, ChevronDown } from "lucide-react";
import { LangSwitcher } from "./LangSwitcher";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { t } = useTranslation();
  const { user, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { to: "/", label: t("nav.home"), hasDropdown: false },
    { to: "/behandelingen", label: t("nav.behandelingen"), hasDropdown: true },
    { to: "/protheses", label: t("nav.protheses"), hasDropdown: true },
    { to: "/spoed", label: t("nav.spoed"), hasDropdown: false },
    { to: "/reviews", label: t("nav.reviews"), hasDropdown: false },
    { to: "/over-ons", label: t("nav.over"), hasDropdown: false },
    { to: "/contact", label: t("nav.contact"), hasDropdown: false },
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg border-b border-border/80 shadow-[0_4px_24px_rgba(12,35,64,0.04)] h-16"
          : "bg-transparent h-20"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 transition-all duration-300">
        <Link to="/" aria-label="MondVita home" className="flex-shrink-0 transition-transform duration-200 hover:scale-[0.98]">
          <Logo className={scrolled ? "text-primary" : "text-white"} />
        </Link>

        {/* Desktop Menu links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-1 text-sm font-medium transition duration-250 relative py-1.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-brand-accent after:transition-all hover:after:w-full ${
                scrolled
                  ? "text-foreground/75 hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
              activeProps={{
                className: scrolled
                  ? "text-primary font-bold after:w-full!"
                  : "text-brand-accent font-bold after:w-full!",
              }}
              activeOptions={{ exact: l.to === "/" }}
            >
              <span>{l.label}</span>
              {l.hasDropdown && (
                <ChevronDown
                  className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180`}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Blocks & LangSwitcher */}
        <div className="flex items-center gap-4">
          <LangSwitcher scrolled={scrolled} />

          <Link
            to="/afspraak"
            className={`hidden md:inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition duration-300 shadow-sm ${
              scrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/95"
                : "bg-white/10 text-white border border-white/20 hover:bg-white hover:text-primary backdrop-blur-sm"
            }`}
          >
            {t("nav.book")}
            <CalendarDays className="h-4 w-4" />
          </Link>

          {user && isAdmin && (
            <Link
              to="/admin"
              className={`hidden md:inline-flex items-center rounded-lg border px-4 py-2 text-xs font-semibold transition duration-200 ${
                scrolled
                  ? "border-border text-primary hover:bg-secondary"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              {t("nav.admin")}
            </Link>
          )}

          <button
            className={`lg:hidden p-2 rounded-lg transition ${
              scrolled
                ? "text-foreground hover:bg-secondary"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-white px-6 py-6 space-y-2 shadow-2xl absolute top-full inset-x-0 z-50 animate-fade-up">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center justify-between py-3 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-secondary/40 px-3 rounded-lg transition"
              activeProps={{ className: "text-primary bg-secondary/60 font-bold" }}
            >
              <span>{l.label}</span>
              {l.hasDropdown && <ChevronDown className="h-4 w-4 opacity-50" />}
            </Link>
          ))}
          <div className="pt-4 border-t border-border mt-4">
            <Link
              to="/afspraak"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm"
            >
              {t("nav.book")}
              <CalendarDays className="h-4 w-4" />
            </Link>
            {user && isAdmin && (
              <Link
                to="/admin"
                className="mt-2 block rounded-lg border border-border py-3 text-center text-xs font-semibold text-primary"
              >
                {t("nav.admin")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

