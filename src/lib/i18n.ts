import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_STORAGE_KEY = "prism-locale";

export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" };
export const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function localeFromLang(lang: string): Locale {
  return /^pt/i.test(lang) ? "pt" : "en";
}

export const pageKeys = [
  "home",
  "work",
  "darkRoom",
  "about",
  "behindPrism",
  "contact",
] as const;
export type PageKey = (typeof pageKeys)[number];
export type SlugKey = Exclude<PageKey, "home">;

export const slugs: Record<Locale, Record<SlugKey, string>> = {
  pt: {
    work: "solucoes",
    darkRoom: "dark-room",
    about: "sobre",
    behindPrism: "por-tras-do-prism",
    contact: "contato",
  },
  en: {
    work: "work",
    darkRoom: "dark-room",
    about: "about",
    behindPrism: "behind-prism",
    contact: "contact",
  },
};

export const legacyRoutes: Record<string, { key: PageKey; hash?: string }> = {
  "/": { key: "home" },
  "/solucoes": { key: "work" },
  "/sobre": { key: "about" },
  "/por-tras-do-prism": { key: "behindPrism" },
  "/curriculo": { key: "behindPrism", hash: "#cv" },
  "/contato": { key: "contact" },
  "/dark-room": { key: "darkRoom" },
};

export function localeHref(locale: Locale, key: PageKey, hash = "") {
  const path = key === "home" ? `/${locale}` : `/${locale}/${slugs[locale][key]}`;
  return `${path}${hash}`;
}

export function pageKeyFromSlug(locale: Locale, slug: string): SlugKey | null {
  const entry = (Object.entries(slugs[locale]) as [SlugKey, string][]).find(
    ([, value]) => value === slug
  );
  return entry ? entry[0] : null;
}

export function parseLocalePath(pathname: string): {
  locale: Locale | null;
  key: PageKey | null;
} {
  const [, first = "", second = ""] = pathname.split(/[?#]/)[0].split("/");
  if (!isLocale(first)) return { locale: null, key: null };
  if (!second) return { locale: first, key: "home" };
  return { locale: first, key: pageKeyFromSlug(first, second) };
}

export function switchLocalePath(pathname: string, target: Locale) {
  const { key } = parseLocalePath(pathname);
  return localeHref(target, key ?? "home");
}

export function detectLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {}
  const preferred = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const lang of preferred) {
    if (/^pt/i.test(lang)) return "pt";
    if (/^en/i.test(lang)) return "en";
  }
  return defaultLocale;
}

export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {}
}

export async function localeParam(
  params: Promise<{ locale: string }>
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

export function pageMetadata(
  locale: Locale,
  key: PageKey,
  meta: Pick<Metadata, "title" | "description"> = {}
): Metadata {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((item) => [htmlLang[item], localeHref(item, key)])
  );
  if (key === "home") languages["x-default"] = "/";
  return {
    ...meta,
    alternates: { canonical: localeHref(locale, key), languages },
  };
}
