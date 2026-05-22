import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, type Locale } from "./locales";

const STORAGE_KEY = "mondvita-locale";

// Always start with 'nl' to match SSR-rendered HTML.
// On fresh load, i18n isn't initialized yet so we set lng to "nl".
// During Vite HMR the singleton persists, so we force the language
// back to "nl" to prevent hydration mismatches.
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "nl",
    fallbackLng: "nl",
    interpolation: { escapeValue: false },
  });
} else {
  i18n.changeLanguage("nl");
}

export function setLocale(locale: Locale) {
  i18n.changeLanguage(locale);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }
}

export function getLocale(): Locale {
  return (i18n.language as Locale) || "nl";
}

export default i18n;
