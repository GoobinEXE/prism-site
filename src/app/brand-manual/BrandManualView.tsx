"use client";

import Link from "next/link";
import { PrismSymbol, PRISM_BEAM } from "@/components/logos/PrismSymbol";
import { PrismMonogram } from "@/components/logos/PrismMonogram";
import { PrismLockup } from "@/components/logos/PrismLockup";
import { DarkRoomLogo } from "@/components/logos/DarkRoomLogo";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { ManualToc } from "@/components/brand-manual/ManualToc";
import { ManualSection } from "@/components/brand-manual/ManualSection";
import { ColorTable } from "@/components/brand-manual/ColorTable";
import { InkTable } from "@/components/brand-manual/InkTable";
import { DoorStates } from "@/components/brand-manual/DoorStates";
import {
  INK,
  METAL,
  NEUTRAL,
  SPECTRUM,
  SURFACE,
} from "@/lib/brandTokens";
import {
  MANUAL_SECTIONS,
  brandManualCopy,
  type ManualSectionId,
} from "@/lib/brandManual";
import { getBrandManualPdf } from "@/lib/brandManualPdf";
import { projects } from "@/lib/projects";
import { useLocale } from "@/components/LocaleProvider";
import { withBase } from "@/lib/site";

const UI_TABLE_LABELS = {
  en: {
    colorHeaders: {
      swatch: "",
      name: "Color",
      hex: "Hex",
      pantone: "Pantone",
      role: "Role",
    },
    channelHeaders: {
      channel: "Channel",
      palette: "Palette",
      rule: "Rule",
    },
    scaleLabel: "Scale",
    clearSpaceLabel: "Clear space",
    ledLive: "Public link",
    ledPending: "In development",
    sampleWord: "Aa",
  },
  pt: {
    colorHeaders: {
      swatch: "",
      name: "Cor",
      hex: "Hex",
      pantone: "Pantone",
      role: "Papel",
    },
    channelHeaders: {
      channel: "Canal",
      palette: "Paleta",
      rule: "Regra",
    },
    scaleLabel: "Escala",
    clearSpaceLabel: "Respiro",
    ledLive: "Link público",
    ledPending: "Em desenvolvimento",
    sampleWord: "Aa",
  },
} as const;

const LIGHT_HEXES = new Set<string>([
  NEUTRAL.marfim,
  SURFACE.prismGlass,
  SURFACE.prismElevated,
  METAL.highlight,
  METAL.core,
  METAL.transition,
]);

export function BrandManualView() {
  const { locale, t } = useLocale();
  const copy = brandManualCopy[locale];
  const labels = UI_TABLE_LABELS[locale];
  const pdf = getBrandManualPdf(locale);
  const enPdf = getBrandManualPdf("en");
  const ptPdf = getBrandManualPdf("pt");

  const sectionMeta = (id: ManualSectionId) =>
    MANUAL_SECTIONS.find((s) => s.id === id)!;

  const tocSections = MANUAL_SECTIONS.map((sec) => ({
    id: sec.id,
    number: sec.number,
    title: copy.sections[sec.id].title,
    pdfPage: sec.pdfPage,
  }));

  const tocDownloads = [
    {
      locale: "en" as const,
      label: copy.downloadEn,
      href: enPdf.pdfUrl,
      meta: enPdf.metaLabel,
    },
    {
      locale: "pt" as const,
      label: copy.downloadPt,
      href: ptPdf.pdfUrl,
      meta: ptPdf.metaLabel,
    },
  ];

  const prismTagFor = (key: "lumen" | "rpgym" | "cartograph" | "prismTranslate") => {
    if (key === "lumen") return t.work.lumenTag;
    if (key === "cartograph") return t.work.cartographTag;
    if (key === "rpgym") return t.work.mobile;
    return t.work.desktop;
  };

  const sCover = copy.sections.cover;
  const sArch = copy.sections.architecture;
  const sPrismLogo = copy.sections["prism-logo"];
  const sDarkLogo = copy.sections["dark-room-logo"];
  const sColor = copy.sections.color;
  const sColorUse = copy.sections["color-use"];
  const sType = copy.sections.type;
  const sApps = copy.sections.applications;
  const sIntegrity = copy.sections.integrity;

  return (
    <div className="bm-root pt-(--header-h)">
      <div className="container px-(--margin) py-8 lg:py-12">
        <div className="bm-layout">
          <ManualToc
            tocLabel={copy.tocLabel}
            sections={tocSections}
            downloadsTitle={copy.downloadLabel}
            downloads={tocDownloads}
          />

          <div className="bm-main">
            {/* 00 · Cover */}
            <section
              id="cover"
              aria-labelledby="cover-title"
              className="bm-page bm-cover glass-strong overflow-hidden !p-0"
            >
              <div className="grid flex-1 md:grid-cols-2">
                <div
                  className="flex flex-col justify-between p-6 md:p-8"
                  style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}
                >
                  <div>
                    <div
                      className="catalog-code"
                      style={{ color: NEUTRAL.lead }}
                    >
                      {`${sectionMeta("cover").number} · ${copy.edition}`}
                    </div>
                    <h1 id="cover-title" className="section-title mt-2">
                      {copy.title}
                    </h1>
                    <SpectrumRule className="mt-4" />
                    <p
                      className="mt-4 max-w-[44ch] text-sm leading-relaxed"
                      style={{ color: NEUTRAL.slate }}
                    >
                      {copy.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.08em]">
                        {sCover.prismTitle}
                      </div>
                      <div className="text-xs" style={{ color: NEUTRAL.lead }}>
                        {sCover.prismCaption}
                      </div>
                    </div>
                    <PrismSymbol
                      className="h-24 w-auto shrink-0 md:h-28"
                      beam={PRISM_BEAM}
                      title={sCover.prismTitle}
                    />
                  </div>
                </div>

                <div
                  className="flex flex-col justify-between p-6 md:p-8"
                  style={{ background: NEUTRAL.tape, color: METAL.highlight }}
                >
                  <div
                    className="catalog-code"
                    style={{ color: METAL.transition }}
                  >
                    {sArch.endorsementValue}
                  </div>
                  <div className="my-6 flex items-center justify-center">
                    <DarkRoomLogo
                      className="aspect-[1203/756] w-full max-w-64"
                      door={0.5}
                      title={sCover.darkRoomTitle}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.08em]">
                      {sCover.darkRoomTitle}
                    </div>
                    <div className="text-xs" style={{ color: METAL.transition }}>
                      {sCover.darkRoomCaption}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="bm-screen-only flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8"
                style={{ background: SURFACE.prismGlass }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <a href={enPdf.pdfUrl} download className="btn btn-primary">
                    {copy.downloadEn}
                  </a>
                  <a href={ptPdf.pdfUrl} download className="btn btn-ghost">
                    {copy.downloadPt}
                  </a>
                  <Link href="/about" className="btn btn-ghost">
                    {sCover.backToAbout}
                  </Link>
                </div>
                <span className="font-mono text-xs text-(--text-muted)">
                  {pdf.metaLabel}
                </span>
              </div>

              <footer
                className="bm-print-footer px-6 pb-4 md:px-8"
                style={{ color: NEUTRAL.lead }}
              >
                <span>{`${copy.pdfFooterPrefix} 01 / 09`}</span>
              </footer>
            </section>

            {/* 01 · Architecture */}
            <ManualSection
              id="architecture"
              number={sectionMeta("architecture").number}
              title={sArch.title}
              pdfPage={sectionMeta("architecture").pdfPage}
              pdfUrl={pdf.pdfUrl}
              footerPrefix={copy.pdfFooterPrefix}
            >
              <div className="grid gap-3">
                {sArch.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[68ch] text-sm leading-relaxed text-(--text-secondary)"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-5">
                <div className="label-caps mb-2 text-(--text-muted)">
                  {sArch.substratesTitle}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {sArch.substrates.map((sub) => {
                    const isDarkSub = sub.hex === NEUTRAL.tape;
                    return (
                      <div
                        key={sub.brand}
                        className="rounded-(--radius) p-5"
                        style={
                          isDarkSub
                            ? {
                                background: NEUTRAL.tape,
                                color: METAL.highlight,
                                boxShadow: "var(--hard-shadow)",
                              }
                            : {
                                background: NEUTRAL.marfim,
                                color: NEUTRAL.graphic,
                              }
                        }
                      >
                        <div
                          className="font-mono text-[11px] uppercase tracking-[0.12em]"
                          style={{
                            color: isDarkSub ? METAL.transition : NEUTRAL.lead,
                          }}
                        >
                          {`${sub.brand} · ${sub.hex}`}
                        </div>
                        <div className="mt-1 text-base font-bold">{sub.name}</div>
                        <p
                          className="mt-2 text-xs leading-relaxed"
                          style={{
                            color: isDarkSub ? METAL.core : NEUTRAL.slate,
                          }}
                        >
                          {sub.use}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="mt-4 grid gap-4 rounded-(--radius) p-5 sm:grid-cols-2"
                style={{ background: SURFACE.prismGlass }}
              >
                <div>
                  <div className="label-caps text-(--text-muted)">
                    {sArch.segregationTitle}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-(--text-secondary)">
                    {sArch.segregationRule}
                  </p>
                </div>
                <div>
                  <div className="label-caps text-(--text-muted)">
                    {sArch.endorsementLabel}
                  </div>
                  <p className="mt-1.5 font-mono text-sm font-semibold text-(--text-primary)">
                    {sArch.endorsementValue}
                  </p>
                </div>
              </div>
            </ManualSection>

            {/* 02 · Prism logo */}
            <ManualSection
              id="prism-logo"
              number={sectionMeta("prism-logo").number}
              title={sPrismLogo.title}
              pdfPage={sectionMeta("prism-logo").pdfPage}
              pdfUrl={pdf.pdfUrl}
              footerPrefix={copy.pdfFooterPrefix}
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div
                  className="flex flex-col justify-between rounded-(--radius) p-5"
                  style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}
                >
                  <div className="flex items-center justify-center py-3">
                    <PrismSymbol
                      className="h-24 w-auto"
                      beam={PRISM_BEAM}
                      title={sPrismLogo.master.name}
                    />
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-semibold">
                      {sPrismLogo.master.name}
                    </div>
                    <div
                      className="mt-1 font-mono text-[11px]"
                      style={{ color: NEUTRAL.lead }}
                    >
                      {`${labels.scaleLabel}: ${sPrismLogo.master.scale}`}
                    </div>
                    <div
                      className="font-mono text-[11px]"
                      style={{ color: NEUTRAL.lead }}
                    >
                      {`${labels.clearSpaceLabel}: ${sPrismLogo.master.clearSpace}`}
                    </div>
                    <p className="mt-1.5 text-xs" style={{ color: NEUTRAL.slate }}>
                      {sPrismLogo.master.note}
                    </p>
                  </div>
                </div>

                <div
                  className="flex flex-col justify-between rounded-(--radius) p-5"
                  style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}
                >
                  <div className="flex items-center justify-center py-4">
                    <PrismMonogram
                      className="h-16 w-16"
                      glyph={NEUTRAL.graphic}
                      title={sPrismLogo.monogram.name}
                    />
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-semibold">
                      {sPrismLogo.monogram.name}
                    </div>
                    <div
                      className="mt-1 font-mono text-[11px]"
                      style={{ color: NEUTRAL.lead }}
                    >
                      {`${sPrismLogo.monogram.scale} · ${sPrismLogo.monogram.glyph} / ${sPrismLogo.monogram.substrate}`}
                    </div>
                    <div
                      className="font-mono text-[11px]"
                      style={{ color: NEUTRAL.lead }}
                    >
                      {`${labels.clearSpaceLabel}: ${sPrismLogo.monogram.clearSpace}`}
                    </div>
                    <p className="mt-1.5 text-xs" style={{ color: NEUTRAL.slate }}>
                      {sPrismLogo.monogram.note}
                    </p>
                  </div>
                </div>

                <div
                  className="flex flex-col justify-between rounded-(--radius) p-5"
                  style={{
                    background: NEUTRAL.tape,
                    color: METAL.highlight,
                    boxShadow: "var(--hard-shadow)",
                  }}
                >
                  <div className="flex items-center justify-center py-4">
                    <PrismMonogram
                      className="h-16 w-16"
                      glyph={NEUTRAL.marfim}
                      title={sPrismLogo.nightMode.name}
                    />
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-semibold">
                      {sPrismLogo.nightMode.name}
                    </div>
                    <div
                      className="mt-1 font-mono text-[11px]"
                      style={{ color: METAL.transition }}
                    >
                      {`${sPrismLogo.nightMode.scale} · ${sPrismLogo.nightMode.glyph} / ${sPrismLogo.nightMode.substrate}`}
                    </div>
                    <div
                      className="font-mono text-[11px]"
                      style={{ color: METAL.transition }}
                    >
                      {`${labels.clearSpaceLabel}: ${sPrismLogo.nightMode.clearSpace}`}
                    </div>
                    <p className="mt-1.5 text-xs" style={{ color: METAL.core }}>
                      {sPrismLogo.nightMode.note}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div
                  className="flex flex-wrap items-center justify-between gap-4 rounded-(--radius) p-5"
                  style={{ background: SURFACE.prismGlass }}
                >
                  <PrismLockup />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-(--text-primary)">
                      {sPrismLogo.lockup.name}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-(--text-secondary)">
                      {`${sPrismLogo.lockup.rule}. ${sPrismLogo.lockup.note}`}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-4 rounded-(--radius) p-5"
                  style={{ background: SURFACE.prismGlass }}
                >
                  <span
                    className="h-8 w-8 shrink-0 rounded-(--radius)"
                    style={{ background: PRISM_BEAM }}
                    aria-hidden="true"
                  />
                  <p className="text-xs leading-relaxed text-(--text-secondary)">
                    {sPrismLogo.beamNote}
                  </p>
                </div>
              </div>
            </ManualSection>

            {/* 03 · Dark Room logo */}
            <ManualSection
              id="dark-room-logo"
              number={sectionMeta("dark-room-logo").number}
              title={sDarkLogo.title}
              pdfPage={sectionMeta("dark-room-logo").pdfPage}
              pdfUrl={pdf.pdfUrl}
              footerPrefix={copy.pdfFooterPrefix}
              dark
            >
              <div>
                <div
                  className="label-caps mb-2"
                  style={{ color: METAL.transition }}
                >
                  {sDarkLogo.statesTitle}
                </div>
                <DoorStates
                  states={sDarkLogo.states}
                  caption={`${sDarkLogo.clearSpace.rule} ${sDarkLogo.clearSpace.substrateNote}`}
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div
                  className="flex items-center gap-4 rounded-(--radius) p-5"
                  style={{ background: NEUTRAL.charcoal }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBase("/assets/brand/dark-room-logo-spectral-v1.jpg")}
                    alt={sDarkLogo.metallic.name}
                    className="h-24 w-36 shrink-0 rounded-(--radius) object-cover"
                  />
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: METAL.highlight }}
                    >
                      {sDarkLogo.metallic.name}
                    </div>
                    <p
                      className="mt-1 text-xs leading-relaxed"
                      style={{ color: METAL.core }}
                    >
                      {sDarkLogo.metallic.note}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-4 rounded-(--radius) p-5"
                  style={{ background: NEUTRAL.charcoal }}
                >
                  <div
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-[22%]"
                    style={{ background: NEUTRAL.tape }}
                  >
                    <span
                      className="font-display text-xl font-bold tracking-tight"
                      style={{ color: METAL.vectorInk }}
                    >
                      DR
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: METAL.highlight }}
                    >
                      {`${sDarkLogo.icon22.name} · ${sDarkLogo.icon22.radius}`}
                    </div>
                    <p
                      className="mt-1 text-xs leading-relaxed"
                      style={{ color: METAL.core }}
                    >
                      {sDarkLogo.icon22.note}
                    </p>
                  </div>
                </div>
              </div>
            </ManualSection>

            {/* 04 · Color system */}
            <ManualSection
              id="color"
              number={sectionMeta("color").number}
              title={sColor.title}
              pdfPage={sectionMeta("color").pdfPage}
              pdfUrl={pdf.pdfUrl}
              footerPrefix={copy.pdfFooterPrefix}
            >
              <SpectrumRule />

              <div className="mt-4 grid gap-4">
                <div>
                  <div className="label-caps mb-1.5 text-(--text-muted)">
                    {sColor.prismTitle}
                  </div>
                  <ColorTable
                    headers={labels.colorHeaders}
                    rows={sColor.prismRows}
                  />
                </div>

                <div>
                  <div className="label-caps mb-1.5 text-(--text-muted)">
                    {sColor.darkRoomTitle}
                  </div>
                  <ColorTable
                    headers={labels.colorHeaders}
                    rows={sColor.darkRoomRows}
                    dark
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div
                    className="rounded-(--radius) p-3.5"
                    style={{ background: SURFACE.prismGlass }}
                  >
                    <div className="label-caps mb-2 text-(--text-muted)">
                      {sColor.neutralsTitle}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {sColor.neutrals.map((item) => {
                        const darkText = LIGHT_HEXES.has(item.hex);
                        return (
                          <div
                            key={item.hex}
                            className="rounded-(--radius) px-2.5 py-2 font-mono text-[10px]"
                            style={{
                              background: item.hex,
                              color: darkText ? NEUTRAL.graphic : METAL.highlight,
                            }}
                          >
                            <div className="font-semibold">{item.name}</div>
                            <div>{item.hex}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className="rounded-(--radius) p-3.5"
                    style={{ background: NEUTRAL.tape, color: METAL.highlight }}
                  >
                    <div
                      className="label-caps mb-2"
                      style={{ color: METAL.transition }}
                    >
                      {sColor.metalTitle}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {sColor.metal.map((item) => {
                        const darkText = LIGHT_HEXES.has(item.hex);
                        return (
                          <div
                            key={item.hex}
                            className="rounded-(--radius) px-2.5 py-2 font-mono text-[10px]"
                            style={{
                              background: item.hex,
                              color: darkText ? NEUTRAL.graphic : METAL.highlight,
                            }}
                          >
                            <div className="font-semibold">{item.name}</div>
                            <div>{item.hex}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </ManualSection>

            {/* 05 · Using color */}
            <ManualSection
              id="color-use"
              number={sectionMeta("color-use").number}
              title={sColorUse.title}
              pdfPage={sectionMeta("color-use").pdfPage}
              pdfUrl={pdf.pdfUrl}
              footerPrefix={copy.pdfFooterPrefix}
            >
              <p className="max-w-[68ch] text-sm leading-relaxed text-(--text-secondary)">
                {sColorUse.intro}
              </p>

              <div className="mt-4 overflow-x-auto rounded-(--radius)">
                <table className="bm-table w-full border-collapse text-left text-xs">
                  <thead>
                    <tr style={{ background: SURFACE.prismGlass, color: NEUTRAL.lead }}>
                      <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
                        {sColorUse.usageHeaders.band}
                      </th>
                      <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
                        {sColorUse.usageHeaders.whenToUse}
                      </th>
                      <th scope="col" className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em]">
                        {sColorUse.usageHeaders.whenToAvoid}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sColorUse.usageRows.map((row, idx) => (
                      <tr
                        key={row.key}
                        style={{
                          background:
                            idx % 2 === 0 ? SURFACE.prismElevated : SURFACE.prismGlass,
                          color: NEUTRAL.graphic,
                        }}
                      >
                        <td className="px-3 py-2 font-semibold whitespace-nowrap">
                          <span className="inline-flex items-center gap-2">
                            <span
                              className="inline-block h-3 w-3 shrink-0 rounded-(--radius)"
                              style={{ background: row.hex }}
                              aria-hidden="true"
                            />
                            <span>{row.name}</span>
                          </span>
                        </td>
                        <td className="px-3 py-2" style={{ color: NEUTRAL.slate }}>
                          {row.whenToUse}
                        </td>
                        <td className="px-3 py-2" style={{ color: NEUTRAL.slate }}>
                          {row.whenToAvoid}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5">
                <div className="label-caps text-(--text-muted)">
                  {sColorUse.inkTitle}
                </div>
                <p className="mt-1 mb-2.5 max-w-[68ch] text-xs text-(--text-secondary)">
                  {sColorUse.inkIntro}
                </p>
                <InkTable
                  headers={sColorUse.inkCols}
                  sampleWord={labels.sampleWord}
                />
              </div>
            </ManualSection>

            {/* 06 · Typography */}
            <ManualSection
              id="type"
              number={sectionMeta("type").number}
              title={sType.title}
              pdfPage={sectionMeta("type").pdfPage}
              pdfUrl={pdf.pdfUrl}
              footerPrefix={copy.pdfFooterPrefix}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div
                  className="rounded-(--radius) p-5"
                  style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.08em]"
                    style={{ color: NEUTRAL.lead }}
                  >
                    {sType.geistSample.label}
                  </div>
                  <div className="mt-2 font-display text-2xl font-bold uppercase tracking-[0.04em]">
                    {sType.geistSample.heading}
                  </div>
                  <div
                    className="mt-1 font-mono text-[11px]"
                    style={{ color: INK.prism.cyan }}
                  >
                    {sType.geistSample.trackingPrism}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: NEUTRAL.slate }}>
                    {sType.geistSample.body}
                  </p>
                  <p className="mt-2 text-[11px]" style={{ color: NEUTRAL.lead }}>
                    {sType.geistSample.note}
                  </p>
                </div>

                <div
                  className="rounded-(--radius) p-5"
                  style={{
                    background: NEUTRAL.tape,
                    color: METAL.highlight,
                    boxShadow: "var(--hard-shadow)",
                  }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.08em]"
                    style={{ color: METAL.transition }}
                  >
                    {sType.darkRoomSample.label}
                  </div>
                  <div className="mt-2 font-display text-2xl font-bold uppercase tracking-[-0.01em]">
                    {sType.darkRoomSample.heading}
                  </div>
                  <div
                    className="mt-1 font-mono text-[11px]"
                    style={{ color: INK.darkRoom.cyan }}
                  >
                    {sType.darkRoomSample.trackingDarkRoom}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: METAL.core }}>
                    {sType.darkRoomSample.body}
                  </p>
                  <p className="mt-2 text-[11px]" style={{ color: METAL.transition }}>
                    {sType.darkRoomSample.note}
                  </p>
                </div>
              </div>

              <div
                className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-(--radius) p-4"
                style={{ background: SURFACE.prismGlass }}
              >
                <div>
                  <div className="label-caps text-(--text-muted)">
                    {sType.monoSample.label}
                  </div>
                  <div className="mt-1 font-mono text-sm font-semibold text-(--text-primary)">
                    {sType.monoSample.sample}
                  </div>
                </div>
                <p className="max-w-[46ch] text-xs text-(--text-secondary)">
                  {sType.monoSample.note}
                </p>
              </div>

              <div className="mt-4">
                <div className="label-caps mb-2 text-(--text-muted)">
                  {sType.physicalMediaTitle}
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {sType.physicalMedia.map((media, idx) => (
                    <div
                      key={media.label}
                      className={`rounded-(--radius) p-4 ${idx === 2 ? "glass-spectrum vhs-label" : ""}`}
                      style={{ background: SURFACE.prismGlass }}
                    >
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-(--text-primary)">
                          {media.label}
                        </span>
                        {idx === 2 ? (
                          <span className="led led-olive" aria-hidden="true" />
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-(--text-secondary)">
                        {media.spec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ManualSection>

            {/* 07 · Applications */}
            <ManualSection
              id="applications"
              number={sectionMeta("applications").number}
              title={sApps.title}
              pdfPage={sectionMeta("applications").pdfPage}
              pdfUrl={pdf.pdfUrl}
              footerPrefix={copy.pdfFooterPrefix}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="label-caps text-(--text-muted)">
                    {sApps.prismTitle}
                  </div>
                  <p className="mt-1 mb-2 text-xs text-(--text-secondary)">
                    {sApps.prismIntro}
                  </p>
                  <div className="grid gap-2">
                    {sApps.prismItems.map((item) => {
                      const project = projects[item.key];
                      return (
                        <div
                          key={item.key}
                          className="rounded-(--radius) p-3"
                          style={{ background: SURFACE.prismGlass }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-(--text-primary)">
                              {project.name}
                            </span>
                            <span className="font-mono text-[10px] uppercase text-(--ink-cyan)">
                              {prismTagFor(item.key)}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] leading-snug text-(--text-secondary)">
                            {item.summary}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="label-caps text-(--text-muted)">
                    {sApps.darkRoomTitle}
                  </div>
                  <p className="mt-1 mb-2 text-xs text-(--text-secondary)">
                    {sApps.darkRoomIntro}
                  </p>
                  <div className="grid gap-2">
                    {sApps.darkRoomItems.map((item) => {
                      const project = projects[item.key];
                      const hasPublicLink = project.links.length > 0;
                      return (
                        <div
                          key={item.code}
                          className="rounded-(--radius) p-3"
                          style={{ background: NEUTRAL.tape, color: METAL.highlight }}
                        >
                          <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                            <span style={{ color: METAL.transition }}>
                              {`${item.code} · ${t.darkRoom.kinds[item.key === "limboOS" ? "game" : item.key === "route1" ? "tool" : item.key === "pokewalker" ? "app" : "bot"]}`}
                            </span>
                            <span
                              className="flex items-center gap-1.5"
                              style={{ color: METAL.core }}
                            >
                              <span>
                                {hasPublicLink
                                  ? labels.ledLive
                                  : labels.ledPending}
                              </span>
                              <span
                                className={`led ${item.led === "olive" ? "led-olive" : "led-yellow"}`}
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-1 text-xs font-bold">{project.name}</div>
                          <p
                            className="mt-0.5 text-[11px] leading-snug"
                            style={{ color: METAL.core }}
                          >
                            {item.summary}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="overflow-x-auto rounded-(--radius) md:col-span-2">
                  <div className="label-caps mb-1.5 text-(--text-muted)">
                    {sApps.externalTitle}
                  </div>
                  <table className="bm-table w-full border-collapse text-left text-xs">
                    <thead>
                      <tr style={{ background: SURFACE.prismGlass, color: NEUTRAL.lead }}>
                        <th scope="col" className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em]">
                          {labels.channelHeaders.channel}
                        </th>
                        <th scope="col" className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em]">
                          {labels.channelHeaders.palette}
                        </th>
                        <th scope="col" className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em]">
                          {labels.channelHeaders.rule}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sApps.externalChannels.map((ch, idx) => (
                        <tr
                          key={ch.channel}
                          style={{
                            background:
                              idx % 2 === 0 ? SURFACE.prismElevated : SURFACE.prismGlass,
                            color: NEUTRAL.graphic,
                          }}
                        >
                          <td className="px-3 py-1.5 font-semibold whitespace-nowrap">
                            {ch.channel}
                          </td>
                          <td className="px-3 py-1.5 font-mono text-[11px]" style={{ color: NEUTRAL.slate }}>
                            {ch.palette}
                          </td>
                          <td className="px-3 py-1.5" style={{ color: NEUTRAL.slate }}>
                            {ch.rule}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  className="rounded-(--radius) p-3.5"
                  style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}
                >
                  <div
                    className="label-caps"
                    style={{ color: INK.prism.cyan }}
                  >
                    {sApps.b2bTitle}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: NEUTRAL.slate }}>
                    {sApps.b2bNote}
                  </p>
                </div>
              </div>
            </ManualSection>

            {/* 08 · Integrity and QA */}
            <ManualSection
              id="integrity"
              number={sectionMeta("integrity").number}
              title={sIntegrity.title}
              pdfPage={sectionMeta("integrity").pdfPage}
              pdfUrl={pdf.pdfUrl}
              footerPrefix={copy.pdfFooterPrefix}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div
                  className="rounded-(--radius) p-5"
                  style={{ background: SURFACE.prismGlass }}
                >
                  <div
                    className="label-caps"
                    style={{ color: INK.prism.magenta }}
                  >
                    {sIntegrity.dontsTitle}
                  </div>
                  <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-(--text-secondary)">
                    {sIntegrity.donts.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0"
                          style={{ background: SPECTRUM.magenta }}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="rounded-(--radius) p-5"
                  style={{ background: SURFACE.prismGlass }}
                >
                  <div
                    className="label-caps"
                    style={{ color: INK.prism.olive }}
                  >
                    {sIntegrity.qaTitle}
                  </div>
                  <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-(--text-secondary)">
                    {sIntegrity.qaChecklist.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0"
                          style={{ background: SPECTRUM.olive }}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ManualSection>
          </div>
        </div>
      </div>
    </div>
  );
}
