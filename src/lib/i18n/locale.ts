export const LOCALES = ["en", "pt"] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_STORAGE_KEY = "prism-locale";
export const LOCALE_EVENT = "prism-locale-change";

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "pt";
}

export function detectDeviceLocale(): Locale {
  const hints =
    typeof navigator === "undefined"
      ? []
      : [...(navigator.languages ?? []), navigator.language];
  for (const hint of hints) {
    if (String(hint).toLowerCase().startsWith("pt")) return "pt";
  }
  return "en";
}

export function readStoredLocale(): Locale | null {
  try {
    const value = localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

export function resolveLocale(): Locale {
  const stored = readStoredLocale();
  if (stored) return stored;
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-locale");
    if (isLocale(attr)) return attr;
  }
  return detectDeviceLocale();
}

export function applyLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-locale", locale);
  document.documentElement.setAttribute("lang", localeHtmlLang[locale]);
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore quota / private mode */
  }
  window.dispatchEvent(new Event(LOCALE_EVENT));
}

export const localeBootScript = `(function(){var k=${JSON.stringify(LOCALE_STORAGE_KEY)};var s=null;try{s=localStorage.getItem(k);}catch(e){}var lang=(s==="pt"||s==="en")?s:((((navigator.languages&&navigator.languages[0])||navigator.language||"en")+"").toLowerCase().indexOf("pt")===0?"pt":"en");if(s!==lang){try{localStorage.setItem(k,lang);}catch(e){}}var h=document.documentElement;h.setAttribute("data-locale",lang);h.setAttribute("lang",lang==="pt"?"pt-BR":"en");})();`;
