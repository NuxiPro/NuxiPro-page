import { createContext, type ReactNode, useCallback, useContext, useState } from "react";
import en from "./en.json";
import fr from "./fr.json";

type Locale = "en" | "fr";
type Translations = Record<string, string>;

const translations: Record<Locale, Translations> = { en, fr };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectBrowserLocale(): Locale {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of langs) {
    const code = lang.split("-")[0].toLowerCase();
    if (code === "fr") return "fr";
    if (code === "en") return "en";
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem("nuxipro-locale");
    if (stored === "fr" || stored === "en") return stored;
    return detectBrowserLocale();
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("nuxipro-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[locale][key] ?? key;
    },
    [locale],
  );

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
