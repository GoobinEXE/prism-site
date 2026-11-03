"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeHtmlLang } from "@/lib/i18n/locale";
import { useLocale } from "@/components/LocaleProvider";

export function LocaleDocument() {
  const pathname = usePathname();
  const { locale, t } = useLocale();

  useEffect(() => {
    document.documentElement.lang = localeHtmlLang[locale];
    document.documentElement.setAttribute("data-locale", locale);
    const path = (pathname.replace(/\.html$/, "") || "/").replace(/\/$/, "") || "/";
    document.title = t.meta.routes[path] ?? t.meta.defaultTitle;
  }, [locale, pathname, t]);

  return null;
}
