"use client";

import Link from "next/link";
import { ChamberLink } from "@/components/ChamberLink";
import { SpectrumBands } from "@/components/about/SpectrumBands";
import { DarkRoomLogo } from "@/components/logos/DarkRoomLogo";
import { PrismMonogram } from "@/components/logos/PrismMonogram";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { useLocale } from "@/components/LocaleProvider";
import { getBrandManualPdf } from "@/lib/brandManualPdf";
import { METAL, NEUTRAL } from "@/lib/brandTokens";

export function AboutView() {
  const { locale, t } = useLocale();
  const a = t.about;
  const { pdfUrl, coverUrl, metaLabel } = getBrandManualPdf(locale);

  return (
    <div className="pt-(--header-h)">
      <section className="section" aria-labelledby="about-title">
        <div className="container grid items-center gap-10 px-(--margin) lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-12">
          <div>
            <p className="label-caps text-(--text-muted)">{a.eyebrow}</p>
            <h1 id="about-title" className="section-title">
              {a.title}
            </h1>
            <SpectrumRule className="mt-5" />
            <p className="section-lead">{a.lead}</p>
          </div>

          <SpectrumBands labels={a.bands} />
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="about-principles-title">
        <div className="container px-(--margin)">
          <h2
            id="about-principles-title"
            className="title-main text-2xl font-bold md:text-3xl"
          >
            {a.principlesTitle}
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {a.principles.map((item) => (
              <article
                key={item.code}
                className="glass-spectrum vhs-label flex flex-col p-6 pt-9 md:p-7 md:pt-10"
              >
                <span className="catalog-code">{item.code}</span>
                <h3 className="title-main mt-3 text-lg leading-snug font-bold text-(--text-primary)">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-(--text-secondary)">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="about-rooms-title">
        <div className="container px-(--margin)">
          <h2
            id="about-rooms-title"
            className="title-main text-2xl font-bold md:text-3xl"
          >
            {a.roomsTitle}
          </h2>

          <div className="mt-8 grid overflow-hidden rounded-(--radius-lg) md:grid-cols-2">
            <article className="glass-strong flex flex-col justify-between p-6 md:p-10">
              <div>
                <div className="mb-6">
                  <PrismMonogram
                    glyph={NEUTRAL.graphic}
                    className="h-12 w-auto md:h-14"
                  />
                </div>
                <h3 className="title-main text-xl font-bold text-(--text-primary) md:text-2xl">
                  {a.prismTitle}
                </h3>
                <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-(--text-secondary)">
                  {a.prismBody}
                </p>
              </div>
              <div className="mt-8">
                <Link href="/work" className="btn btn-primary">
                  {a.seeWork}
                </Link>
              </div>
            </article>

            <article
              className="flex flex-col justify-between p-6 md:p-10"
              style={{ background: NEUTRAL.tape, color: METAL.highlight }}
            >
              <div>
                <div className="clear-dark-room">
                  <DarkRoomLogo door={0.5} title={a.darkTitle} />
                </div>
                <h3 className="sr-only">{a.darkTitle}</h3>
                <p
                  className="max-w-[46ch] text-base leading-relaxed"
                  style={{ color: METAL.core }}
                >
                  {a.darkBody}
                </p>
              </div>
              <div className="mt-8">
                <ChamberLink href="/dark-room" className="btn btn-magenta">
                  {a.visit}
                </ChamberLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="about-manual-title">
        <div className="container px-(--margin)">
          <article className="glass-spectrum grid items-center gap-8 p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:p-10">
            <div className="aspect-4/3 overflow-hidden rounded-(--radius) bg-(--glass-elevated)">
              <img
                src={coverUrl}
                alt={a.manualCoverAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h2
                id="about-manual-title"
                className="title-main text-2xl font-bold md:text-3xl"
              >
                {a.manualTitle}
              </h2>
              <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-(--text-secondary)">
                {a.manualLead}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-(--text-muted)">
                {metaLabel}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/brand-manual" className="btn btn-primary">
                  {a.manualRead}
                </Link>
                <a
                  href={pdfUrl}
                  download
                  className="btn btn-ghost bg-(--glass-elevated)!"
                >
                  {a.manualDownload}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
