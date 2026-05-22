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
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const { pathname } = useLocation();
  const contactLabel = t("nav.contact");

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

  const toggleMobileDropdown = (to: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [to]: !prev[to],
    }));
  };

  const links = [
    { to: "/", label: t("nav.home"), hasDropdown: false, dropdownItems: [] },
    {
      to: "/behandelingen",
      label: t("nav.behandelingen"),
      hasDropdown: true,
      dropdownItems: [
        { hash: "algemene-mondzorg", label: t("svc.mondzorg") },
        { hash: "implantologie", label: t("svc.implant") },
        { hash: "protheses", label: t("svc.prothese") },
        { hash: "esthetische-tandheelkunde", label: t("svc.esth") },
        { hash: "wortelkanaalbehandeling", label: t("svc.wortel") },
        { hash: "kindertandheelkunde", label: t("svc.kinder") },
      ],
    },
    {
      to: "/protheses",
      label: t("nav.protheses"),
      hasDropdown: true,
      dropdownItems: [
        { hash: "gedeeltelijke-prothese", label: t("protheses.p1_t") },
        { hash: "volledige-prothese", label: t("protheses.p2_t") },
        { hash: "implantaat-prothese", label: t("protheses.p3_t") },
        { hash: "reparatie", label: t("protheses.p4_t") },
      ],
    },
    { to: "/spoed", label: t("nav.spoed"), hasDropdown: false, dropdownItems: [] },
    { to: "/declaraties", label: t("nav.declaraties"), hasDropdown: false, dropdownItems: [] },
    { to: "/reviews", label: t("nav.reviews"), hasDropdown: false, dropdownItems: [] },
    { to: "/over-ons", label: t("nav.over"), hasDropdown: false, dropdownItems: [] },
    { to: "/contact", label: contactLabel, hasDropdown: false, dropdownItems: [] },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white/97 backdrop-blur-lg border-b border-border/60 shadow-[0_2px_12px_rgba(12,35,64,0.04)] ${
        scrolled
          ? "h-14"
          : "h-16"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 transition-all duration-300">
        <Link to="/" aria-label="MondVita home" className="flex-shrink-0 transition-transform duration-200 hover:scale-[0.98]">
          <Logo className="text-primary" isNavbar={true} />
        </Link>

        {/* Desktop Menu links */}
        <div className="hidden desktop-nav:flex items-center gap-2 xl:gap-3 2xl:gap-5 h-full">
          {links.map((l) => (
            <div key={l.to} className="relative group flex items-center h-full">
              <Link
                to={l.to}
                className="flex items-center gap-1 text-[13px] 2xl:text-sm font-medium transition duration-250 relative py-1.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-brand-accent after:transition-all hover:after:w-full text-foreground/75 hover:text-primary whitespace-nowrap"
                activeProps={{
                  className: "text-primary font-bold after:w-full!",
                }}
                activeOptions={{ exact: l.to === "/" }}
              >
                <span>{l.label}</span>
                {l.hasDropdown && (
                  <ChevronDown
                    className="h-3.5 w-3.5 opacity-60 transition-transform duration-250 group-hover:rotate-180"
                  />
                )}
              </Link>

              {l.hasDropdown && (
                <div className="absolute top-[80%] left-1/2 -translate-x-1/2 hidden group-hover:block w-64 pt-3.5 z-50 transition-all duration-300">
                  <div className="bg-white/98 backdrop-blur-md rounded-xl border border-border/80 shadow-[0_10px_35px_rgba(12,35,64,0.08)] py-2.5 overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-primary to-brand-accent" />
                    {l.dropdownItems.map((item) => (
                      <Link
                        key={item.hash}
                        to={l.to}
                        hash={item.hash}
                        className="block px-5 py-2.5 text-xs text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors duration-150 font-medium"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Blocks & LangSwitcher */}
        <div className="flex items-center gap-4">
          <LangSwitcher scrolled={true} />

          <Link
            to="/afspraak"
            className="hidden md:inline-flex items-center gap-2 rounded-lg bg-[#0c2340] px-3.5 py-2 text-xs xl:px-5 xl:py-2.5 xl:text-sm font-semibold text-white transition duration-300 shadow-sm hover:bg-[#0c2340]/90 whitespace-nowrap"
          >
            {t("nav.book")}
            <CalendarDays className="h-4 w-4" />
          </Link>

          <button
            className="desktop-nav:hidden p-2 rounded-lg transition text-foreground hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="desktop-nav:hidden border-t border-border bg-white px-6 py-6 space-y-2 shadow-2xl absolute top-full inset-x-0 z-50 animate-fade-up">
          {links.map((l) => (
            <div key={l.to} className="space-y-1">
              <div className="flex items-center justify-between py-1 text-sm font-semibold text-foreground/80 rounded-lg hover:bg-secondary/40 transition">
                <Link
                  to={l.to}
                  className="flex-grow py-2.5 px-3 hover:text-primary transition"
                  activeProps={{ className: "text-primary font-bold" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
                {l.hasDropdown && (
                  <button
                    onClick={() => toggleMobileDropdown(l.to)}
                    className="p-3.5 text-foreground/60 hover:text-primary transition shrink-0"
                    aria-label={`Toggle ${l.label} options`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileDropdowns[l.to] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              {l.hasDropdown && mobileDropdowns[l.to] && (
                <div className="pl-6 pr-3 py-1.5 space-y-2 border-l-2 border-primary/20 ml-5 animate-fade-in">
                  {l.dropdownItems.map((item) => (
                    <Link
                      key={item.hash}
                      to={l.to}
                      hash={item.hash}
                      className="block py-1.5 text-xs text-foreground/75 hover:text-primary transition font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-border mt-4">
            <Link
              to="/afspraak"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#0c2340] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0c2340]/90"
            >
              {t("nav.book")}
              <CalendarDays className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

