"use client";

import Link from "next/link";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { useLocale } from "@/components/LocaleProvider";
import { NEUTRAL, SPECTRUM_ROLES, VEIL } from "@/lib/brandTokens";
import { withBase } from "@/lib/site";

const DARK_ROOM_SPECTRUM = [
  { name: "Abyssal Cyan", hex: VEIL.cyan, role: "Isolamento estéril e estados dormentes" },
  { name: "Corrosive Olive", hex: VEIL.olive, role: "Estagnação e registros legados" },
  { name: "Tarnished Amber", hex: VEIL.yellow, role: "Vigilância e atenção latente" },
  { name: "Burnt Oxide Orange", hex: VEIL.orange, role: "Desgaste mecânico e hardware sob carga" },
  { name: "Coagulated Magenta", hex: VEIL.magenta, role: "Luz inactínica e ruptura narrativa" },
] as const;

export function AboutView() {
  const { t } = useLocale();
  const a = t.about;

  return (
    <div className="pt-(--header-h)">
      <section className="section pb-12" aria-labelledby="about-title">
        <div className="container px-(--margin)">
          <h1 id="about-title" className="section-title">
            {a.title}
          </h1>
          <SpectrumRule className="mt-5" />
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="why-prism">
        <div className="container px-(--margin)">
          <article className="glass-spectrum vhs-label max-w-3xl p-6 pt-9 md:p-10 md:pt-12">
            <h2 id="why-prism" className="title-main text-2xl font-bold md:text-3xl">
              {a.why}
            </h2>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              {a.whyP1}
            </p>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              {a.whyP2}
            </p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="what-about-dark-room">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-3xl p-6 md:p-10">
            <h2 id="what-about-dark-room" className="title-main text-2xl font-bold md:text-3xl">
              {a.dark}
            </h2>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              {a.darkP}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dark-room" className="btn btn-magenta">
                {a.visit}
              </Link>
              <Link href="/work" className="btn btn-ghost">
                {a.seeWork}
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="brand-manual-title">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-3xl p-6 md:p-10">
            <h2 id="brand-manual-title" className="title-main text-2xl font-bold md:text-3xl">
              {a.manualTitle}
            </h2>
            <p className="mt-4 max-w-[58ch] text-base text-(--text-secondary)">
              {a.manualLead}
            </p>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-(--text-muted)">
              {a.manualSubstrates}
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-(--radius) border border-(--rule-soft) p-3">
                <span
                  className="h-8 w-8 shrink-0 rounded-(--radius) border border-(--rule-soft)"
                  style={{ background: NEUTRAL.marfim }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="font-mono text-xs text-(--text-primary)">{NEUTRAL.marfim}</div>
                  <div className="text-xs text-(--text-secondary)">{a.manualPrismSubstrate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-(--radius) border border-(--rule-soft) p-3">
                <span
                  className="h-8 w-8 shrink-0 rounded-(--radius) border border-(--rule-soft)"
                  style={{ background: NEUTRAL.tape }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="font-mono text-xs text-(--text-primary)">{NEUTRAL.tape}</div>
                  <div className="text-xs text-(--text-secondary)">{a.manualDarkSubstrate}</div>
                </div>
              </div>
            </div>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-(--text-muted)">
              {a.manualSpectrumTitle}
            </h3>
            <SpectrumRule className="mt-3" />
            <ul className="mt-4 divide-y divide-(--rule-soft)">
              {SPECTRUM_ROLES.map((item) => (
                <li key={item.hex} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full"
                      style={{ background: item.hex }}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-(--text-primary)">{item.name}</span>
                    <span className="font-mono text-xs text-(--text-muted)">{item.hex}</span>
                  </div>
                  <span className="text-right text-xs text-(--text-secondary)">{item.role}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-(--text-muted)">
              {a.manualDarkSpectrumTitle}
            </h3>
            <ul className="mt-3 divide-y divide-(--rule-soft)">
              {DARK_ROOM_SPECTRUM.map((item) => (
                <li key={item.hex} className="flex items-center justify-between gap-4 py-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-(--rule-soft)"
                      style={{ background: item.hex }}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-(--text-primary)">{item.name}</span>
                    <span className="font-mono text-xs text-(--text-muted)">{item.hex}</span>
                  </div>
                  <span className="text-right text-xs text-(--text-secondary)">{item.role}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-(--radius) border border-(--rule-soft) p-4">
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-(--text-muted)">
                  {a.manualLogosTitle}
                </div>
                <p className="mt-2 text-xs text-(--text-secondary)">{a.manualLogosSummary}</p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4">
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-(--text-muted)">
                  {a.manualTypeTitle}
                </div>
                <p className="mt-2 text-xs text-(--text-secondary)">{a.manualTypeSummary}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/brand-manual" className="btn btn-primary">
                {a.manualOpenSite}
              </Link>
              <a
                href={withBase("/prism-darkroom-brand-manual.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                {a.manualOpenPdf}
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
