import type { Ref } from "react";
import { SPECTRUM } from "@/lib/brandTokens";

export const PRISM_MONOGRAM_VIEWBOX = { w: 492.4, h: 409.16 } as const;

export const PRISM_BANDS = [
  { color: SPECTRUM.cyan, x: 297.4, y: 0, w: 195, h: 81.78, points: "223.02 0 297.4 74.85 297.37 81.78 492.4 81.78 492.4 0 223.02 0" },
  { color: SPECTRUM.olive, x: 297.37, y: 81.78, w: 195.03, h: 81.54, points: "297.01 163.32 492.4 163.32 492.4 81.78 297.37 81.78 297.01 163.32" },
  { color: SPECTRUM.yellow, x: 297.01, y: 163.32, w: 195.39, h: 81.78, points: "296.89 190.02 297.37 190.05 242.14 245.1 492.4 245.1 492.4 163.57 492.4 163.32 297.01 163.32 296.89 190.02" },
  { color: SPECTRUM.orange, x: 102.9, y: 245.35, w: 389.5, h: 81.78, points: "209.34 277.91 102.9 277.91 102.9 327.13 492.4 327.13 492.4 245.35 241.9 245.35 209.34 277.8 209.34 277.91" },
  { color: SPECTRUM.magenta, x: 102.9, y: 327.38, w: 389.49, h: 81.78, points: "102.9 327.38 492.39 327.38 492.39 409.16 102.9 409.16" },
] as const;

const GLYPH =
  "M205.31,0H.08s-.08,409.15-.08,409.15h89.18v-141.59h116.52s79.7-81.74,79.7-81.74l.04-104.52L205.31,0ZM167.94,183.93h-78.76v-102h78.37l27.19,27.22v44.8l-26.81,29.99Z";

type PrismMonogramProps = {
  className?: string;
  glyph?: string;
  title?: string;
  ref?: Ref<SVGSVGElement>;
};

export function PrismMonogram({
  className = "",
  glyph = "currentColor",
  title,
  ref,
}: PrismMonogramProps) {
  const { w, h } = PRISM_MONOGRAM_VIEWBOX;
  return (
    <svg
      ref={ref}
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path data-p-glyph="" d={GLYPH} fill={glyph} />
      <g data-p-bands="">
        {PRISM_BANDS.map((band) => (
          <polygon key={band.color} points={band.points} fill={band.color} />
        ))}
      </g>
    </svg>
  );
}
