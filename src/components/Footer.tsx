"use client";

import Link from "next/link";
import { PrismLockup } from "@/components/logos/PrismLockup";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { navLinks } from "@/lib/navigation";
import { ChamberLink } from "@/components/ChamberLink";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { useLocale } from "@/components/LocaleProvider";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer
      className="mt-auto"
      style={{ background: "var(--footer-bg)" }}
    >
      <div className="container px-(--margin) py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="lg:col-span-1">
            <PrismLockup />
            <SpectrumRule className="mt-5" />
          </div>

          <div>
            <h2 className="label-caps text-(--text-muted)">{t.footer.navigation}</h2>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <ChamberLink
                    href={link.href}
                    className="text-sm text-(--text-secondary) transition-colors hover:text-cyan"
                  >
                    {t.nav[link.key]}
                  </ChamberLink>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h2 className="label-caps text-(--text-muted)">Dark Room</h2>
            <ul className="mt-3 space-y-2 text-sm text-(--text-secondary)">
              <li>
                <Link
                  href="/#portal-dark-room"
                  className="transition-colors hover:text-magenta"
                >
                  {t.footer.highlights}
                </Link>
              </li>
              <li>
                <ChamberLink
                  href="/dark-room"
                  className="transition-colors hover:text-magenta"
                >
                  {t.footer.allProjects}
                </ChamberLink>
              </li>
              <li>
                <a
                  href="mailto:marcelop.smile@gmail.com"
                  className="transition-colors hover:text-cyan"
                >
                  marcelop.smile@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 pt-6 text-xs text-(--text-muted) sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights}</p>
          <div className="flex flex-wrap items-center gap-4">
            <LocaleSwitcher />
            <p className="label-caps">{t.footer.seal}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
