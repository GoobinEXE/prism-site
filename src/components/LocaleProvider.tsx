"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  LOCALE_EVENT,
  applyLocale,
  resolveLocale,
  type Locale,
} from "@/lib/i18n/locale";
import { messages, type Messages } from "@/lib/i18n/messages";

type LocaleContextValue = {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function subscribe(onStoreChange: () => void) {
  window.addEventListener(LOCALE_EVENT, onStoreChange);
  return () => window.removeEventListener(LOCALE_EVENT, onStoreChange);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, resolveLocale, (): Locale => "en");
  const setLocale = useCallback((next: Locale) => {
    applyLocale(next);
  }, []);
  const value = useMemo(
    () => ({ locale, t: messages[locale], setLocale }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
