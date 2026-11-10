"use client";

import { LOCALES } from "@/lib/i18n/locale";
import { useLocale } from "@/components/LocaleProvider";
import { track } from "@/lib/analytics";

type LocaleSwitcherProps = {
  className?: string;
};

export function LocaleSwitcher({ className = "" }: LocaleSwitcherProps) {
  const { locale, t, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.locale.group}
      className={`flex items-center gap-0.5 ${className}`}
    >
      {LOCALES.map((code) => {
        const active = locale === code;
        const label = code === "en" ? t.locale.en : t.locale.pt;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            aria-label={label}
            onClick={() => {
              if (!active) track("locale_change", { locale: code });
              setLocale(code);
            }}
            className={`label-caps min-h-9 min-w-9 rounded-(--radius) px-2.5 transition-colors ${
              active
                ? "bg-(--surface-high) text-foreground"
                : "text-(--text-muted) hover:text-foreground"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
