import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import en from "./en.json";
import fr from "./fr.json";

type Locale = "en" | "fr";
type NestedValue = string | { [key: string]: NestedValue };
type Translations = { [key: string]: NestedValue };

const translations: Record<Locale, Translations> = { en, fr };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function resolveNested(obj: NestedValue, path: string): string | undefined {
  const keys = path.split(".");
  let current: NestedValue = obj;
  for (const k of keys) {
    if (typeof current !== "object" || current === null) return undefined;
    current = (current as Record<string, NestedValue>)[k];
    if (current === undefined) return undefined;
  }
  return typeof current === "string" ? current : undefined;
}

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of langs) {
    const code = lang.split("-")[0].toLowerCase();
    if (code === "fr") return "fr";
    if (code === "en") return "en";
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("nuxipro-locale");
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved);
    } else {
      setLocaleState(detectBrowserLocale());
    }
  }, []);

  const setLocale = useCallback((value: Locale) => {
    setLocaleState(value);
    localStorage.setItem("nuxipro-locale", value);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return resolveNested(translations[locale], key) ?? key;
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
