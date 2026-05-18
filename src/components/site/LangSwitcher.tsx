import { useTranslation } from "react-i18next";
import { setLocale } from "@/i18n";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/locales";
import { Languages } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function LangSwitcher({ scrolled = true }: { scrolled?: boolean }) {
  const { i18n } = useTranslation();
  const current = (i18n.language || "nl") as Locale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition duration-200 ${
          scrolled
            ? "border border-border bg-white/70 text-foreground hover:border-primary/40 hover:bg-white"
            : "border border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20 backdrop-blur-sm"
        }`}
        aria-label="Change language"
      >
        <Languages className="h-3.5 w-3.5" />
        {LOCALE_LABELS[current]}
      </button>
      {open && (
        <div className="absolute end-0 mt-2 min-w-[140px] rounded-lg border border-border bg-white shadow-lg overflow-hidden z-50 animate-fade-in">
          {LOCALES.map(loc => (
            <button
              key={loc}
              onClick={() => { setLocale(loc); setOpen(false); }}
              className={`block w-full px-4 py-2.5 text-sm text-start transition-colors duration-200 ${
                current === loc
                  ? "bg-secondary font-semibold text-primary"
                  : "text-foreground hover:bg-secondary/60"
              }`}
            >
              {LOCALE_LABELS[loc]} — {loc === "nl" ? "Nederlands" : loc === "en" ? "English" : "العربية"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

