import { type ReactNode, useCallback, useEffect, useState } from "react";
import en from "./en.json";
import fr from "./fr.json";
import { I18nContext, type Locale } from "./useTranslation";

export type { I18nContextValue, Locale } from "./useTranslation";
export { useTranslation } from "./useTranslation";

type NestedValue = string | NestedValue[] | { [key: string]: NestedValue };
type Translations = { [key: string]: NestedValue };

const translations: Record<Locale, Translations> = { en, fr };

function resolveNested(obj: NestedValue | Translations, path: string): string | undefined {
  let current: NestedValue | Translations | undefined = obj;
  for (const k of path.split(".")) {
    if (current === undefined || current === null || typeof current !== "object") {
      return undefined;
    }
    if (Array.isArray(current)) {
      const idx = Number(k);
      if (!Number.isInteger(idx)) return undefined;
      current = current[idx];
    } else {
      current = (current as Record<string, NestedValue>)[k];
    }
    if (current === undefined) return undefined;
  }
  return typeof current === "string" ? current : undefined;
}

const DEFAULT_LOCALE: Locale = "fr";

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of langs) {
    const code = lang.split("-")[0].toLowerCase();
    if (code === "fr") return "fr";
    if (code === "en") return "en";
  }
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // FR par défaut (SSR + premier rendu client identiques) :
  // puis rebascule rapide vers EN via useEffect si saved/browser = en.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

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
      return (
        resolveNested(translations[locale], key) ??
        resolveNested(translations[locale === "fr" ? "en" : "fr"], key) ??
        key
      );
    },
    [locale],
  );

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}
