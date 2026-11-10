"use client";

import Link from "next/link";
import { RedirectTo } from "@/components/RedirectTo";
import { useLocale } from "@/components/LocaleProvider";
import { withBase } from "@/lib/site";

type LegacyRedirectProps = {
  href: string;
  labelKey: "work" | "about" | "behindPrism" | "contact";
};

export function LegacyRedirect({ href, labelKey }: LegacyRedirectProps) {
  const { t } = useLocale();

  return (
    <div className="pt-(--header-h)">
      <meta httpEquiv="refresh" content={`0; url=${withBase(href)}`} />
      <RedirectTo href={href} />
      <section className="section">
        <div className="container px-(--margin)">
          <p className="section-lead">
            {t.legacy.moved}{" "}
            <Link href={href} className="font-semibold text-(--ink-cyan) underline">
              {t.nav[labelKey]}
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
