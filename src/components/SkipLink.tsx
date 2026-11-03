"use client";

import { useLocale } from "@/components/LocaleProvider";

export function SkipLink() {
  const { t } = useLocale();
  return (
    <a href="#content" className="skip-link">
      {t.skip}
    </a>
  );
}
