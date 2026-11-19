"use client";

import Link from "next/link";
import { ChamberLink } from "@/components/ChamberLink";
import { PrismSymbol } from "@/components/logos/PrismSymbol";
import { METAL, NEUTRAL, SPECTRUM } from "@/lib/brandTokens";

type BandKey = "cyan" | "olive" | "yellow" | "orange" | "magenta";

export type SpectrumBandsProps = {
  labels: Record<BandKey, string>;
  className?: string;
};

const BANDS: readonly {
  key: BandKey;
  center: string;
  href: string;
  swatch: string;
  textColor: string;
  chamber?: boolean;
}[] = [
  {
    key: "cyan",
    center: "38.4%",
    href: "/work#mobile",
    swatch: SPECTRUM.cyan,
    textColor: NEUTRAL.graphic,
  },
  {
    key: "olive",
    center: "44.4%",
    href: "/work#desktop",
    swatch: SPECTRUM.olive,
    textColor: NEUTRAL.graphic,
  },
  {
    key: "yellow",
    center: "50.4%",
    href: "/work#web",
    swatch: SPECTRUM.yellow,
    textColor: NEUTRAL.graphic,
  },
  {
    key: "orange",
    center: "56.4%",
    href: "/dark-room",
    swatch: SPECTRUM.orange,
    textColor: NEUTRAL.graphic,
    chamber: true,
  },
  {
    key: "magenta",
    center: "62.4%",
    href: "/contact",
    swatch: SPECTRUM.magenta,
    textColor: METAL.highlight,
  },
];

export function SpectrumBands({ labels, className = "" }: SpectrumBandsProps) {
  return (
    <div className={className}>
      <div className="relative w-full motion-safe:[&_[data-ps-beam]]:animate-[prism-reveal_0.65s_cubic-bezier(0.33,0,0.2,1)_0.15s_both] motion-safe:[&_[data-ps-bands]]:animate-[prism-reveal_0.9s_cubic-bezier(0.16,1,0.3,1)_0.7s_both]">
        <PrismSymbol beam={METAL.transition} className="block h-auto w-full" />

        <div className="hidden md:block">
          {BANDS.map((band) => {
            const label = labels[band.key];
            const linkProps = {
              href: band.href,
              className:
                "group absolute left-[75%] flex h-[6%] w-[25%] -translate-y-1/2 items-center pl-2 pr-1.5 xl:pl-3 xl:pr-2 text-[10px] leading-none font-semibold tracking-[0.01em] transition-opacity hover:opacity-85 focus-visible:z-10 xl:text-[11px]",
              style: { top: band.center, color: band.textColor },
            };
            const content = (
              <span className="truncate motion-safe:animate-[prism-reveal_0.45s_cubic-bezier(0.16,1,0.3,1)_1.1s_both] group-hover:underline group-hover:underline-offset-2">
                {label}
              </span>
            );

            return band.chamber ? (
              <ChamberLink key={band.key} {...linkProps}>
                {content}
              </ChamberLink>
            ) : (
              <Link key={band.key} {...linkProps}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-2 md:hidden">
        {BANDS.map((band) => {
          const label = labels[band.key];
          const rowClass =
            "flex min-h-11 items-center justify-between gap-3 rounded-(--radius) bg-(--glass) px-4 py-2.5 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--glass-elevated)";
          const inner = (
            <>
              <span className="flex items-center gap-3">
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-[2px]"
                  style={{ background: band.swatch }}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </span>
              <span
                className="font-mono text-xs text-(--text-muted)"
                aria-hidden="true"
              >
                →
              </span>
            </>
          );

          return (
            <li key={band.key}>
              {band.chamber ? (
                <ChamberLink href={band.href} className={rowClass}>
                  {inner}
                </ChamberLink>
              ) : (
                <Link href={band.href} className={rowClass}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
