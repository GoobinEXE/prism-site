"use client";

import Link from "next/link";
import { PrismLockup } from "@/components/logos/PrismLockup";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { navLinks } from "@/lib/navigation";
import { ChamberLink } from "@/components/ChamberLink";

export function Footer() {
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
            <h2 className="label-caps text-(--text-muted)">Navegação</h2>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <ChamberLink
                    href={link.href}
                    className="text-sm text-(--text-secondary) transition-colors hover:text-cyan"
                  >
                    {link.label}
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
                  Destaques
                </Link>
              </li>
              <li>
                <ChamberLink
                  href="/dark-room"
                  className="transition-colors hover:text-magenta"
                >
                  Todos os projetos
                </ChamberLink>
              </li>
              <li>
                <a
                  href="mailto:contato@prism.dev"
                  className="transition-colors hover:text-cyan"
                >
                  contato@prism.dev
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 pt-6 text-xs text-(--text-muted) sm:flex-row sm:justify-between">
          <p>© 2026 Prism. Todos os direitos reservados.</p>
          <p className="label-caps">Dark Room · Um Estúdio Prism</p>
        </div>
      </div>
    </footer>
  );
}
