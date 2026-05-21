import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, type Locale } from "./locales";

const STORAGE_KEY = "mondvita-locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "nl";
  const documentLocale = document.documentElement.lang as Locale | null;
  if (documentLocale && ["nl", "en", "ar"].includes(documentLocale)) return documentLocale;
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && ["nl", "en", "ar"].includes(stored)) return stored;
  return "nl";
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLocale(),
    fallbackLng: "nl",
    interpolation: { escapeValue: false },
  });
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
