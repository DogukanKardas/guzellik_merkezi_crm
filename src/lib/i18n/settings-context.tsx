"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { getTranslation, type Locale } from "./translations";
import { LOCALE_COOKIE } from "./constants";

const LOCALE_KEY = "crm-locale";

interface SettingsContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslation>;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function persistLocale(locale: Locale) {
  localStorage.setItem(LOCALE_KEY, locale);
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
  document.documentElement.lang = locale;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    const initial = stored === "en" || stored === "tr" ? stored : "tr";
    setLocaleState(initial);
    persistLocale(initial);
    setMounted(true);
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      persistLocale(next);
      router.refresh();
    },
    [router]
  );

  const t = getTranslation(locale);

  if (!mounted) {
    return (
      <SettingsContext.Provider
        value={{ locale: "tr", setLocale, t: getTranslation("tr") }}
      >
        {children}
      </SettingsContext.Provider>
    );
  }

  return (
    <SettingsContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
}
