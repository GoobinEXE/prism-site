import type { Ref } from "react";
import { METAL, NEUTRAL, SPECTRUM } from "@/lib/brandTokens";

export const PRISM_SYMBOL_VIEWBOX = { w: 2003.61, h: 1196.6 } as const;

export const PRISM_BEAM = METAL.transition;

const BEAM = {
  upper: [[0, 0], [781.65, 458.54]],
  lower: [[0, 46.92], [759.71, 495.47]],
} as const;

function beamPoints(bleed: number) {
  const back = ([[x0, y0], [x1, y1]]: readonly (readonly [number, number])[]) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    return `${(x0 - ((x1 - x0) / len) * bleed).toFixed(2)} ${(y0 - ((y1 - y0) / len) * bleed).toFixed(2)}`;
  };
  return `${BEAM.lower[1].join(" ")} ${back(BEAM.lower)} ${back(BEAM.upper)} ${BEAM.upper[1].join(" ")}`;
}

const BANDS = [
  { color: SPECTRUM.cyan, points: "1251.88 495.47 2003.61 495.47 2003.61 423.74 1208.77 423.74 1230.16 459.25 1251.88 495.47" },
  { color: SPECTRUM.olive, points: "2001.93 495.47 1251.88 495.47 1275.96 535.64 1294.97 567.19 2003.61 567.19 2003.61 495.47 2001.93 495.47" },
  { color: SPECTRUM.yellow, points: "1317.83 605.15 1338.4 638.92 2003.61 638.92 2003.61 567.19 1294.97 567.19 1317.83 605.15" },
  { color: SPECTRUM.orange, points: "1361.91 677.51 1381.74 710.64 2003.61 710.64 2003.61 638.92 1338.4 638.92 1361.91 677.51" },
  { color: SPECTRUM.magenta, points: "1404.34 748.4 1424.82 782.37 2003.61 782.37 2003.61 710.64 1381.74 710.64 1404.34 748.4" },
] as const;

const WIREFRAME =
  "M1381.74,710.64l-19.83-33.13-23.51-38.59-20.57-33.77-22.86-37.95-19-31.56-24.09-40.17-21.72-36.22-21.39-35.51-201.35-334.26c-2.03-3.38-3.16-4.75-6.05-4.94-3.57-.23-5.21,1.2-7.54,5.07l-239.61,398.66-22.01,36.59-223.43,370.75c-2.09,3.46-2.91,5.62-1.94,8.87.6,2,2.51,3.89,5.96,5.92l487.5,286.03c.38.22.86.22,1.24,0l489.55-287.32c4.7-2.76,5.39-6.93,3.35-10.98l-44.88-74.74-24.73-41.03-20.48-33.97-22.6-37.75ZM992.72,1173.27c0,.95-1.03,1.54-1.85,1.06l-457.46-268.39c-.94-.55-.75-1.96.3-2.24l457.58-123.63c.78-.21,1.55.38,1.55,1.18l-.12,392.02ZM992.84,762.66c0,.55-.37,1.04-.9,1.18l-460.58,126.36c-1.07.29-1.95-.87-1.37-1.82L991.5,125.43c.64-1.06,2.28-.61,2.28.64l-.93,636.59ZM1467.75,906.35l-457,267.96c-.82.48-1.86-.11-1.85-1.07.5-36.78,0-366.8-.04-392.63,0-.81.77-1.39,1.55-1.18l457.04,124.67c1.05.29,1.23,1.69.3,2.24ZM1470.41,888.45c.57.95-.31,2.11-1.38,1.82l-459.27-126.75c-.53-.15-.9-.63-.9-1.18V126.35c0-1.24,1.64-1.7,2.28-.63l197.24,327.57,25.4,42.19,43.19,71.72,43.19,71.72,43.19,71.72,43.19,71.72,63.87,106.08Z";

export function prismSymbolMarkup(bleed = 0, beam: string = PRISM_BEAM) {
  const bands = BANDS.map(
    (band) => `<polygon points="${band.points}" fill="${band.color}"/>`
  ).join("");
  return `<polygon points="${beamPoints(bleed)}" fill="${beam}"/>${bands}<path d="${WIREFRAME}" fill="${NEUTRAL.graphic}"/>`;
}

type PrismSymbolProps = {
  className?: string;
  beam?: string;
  bleed?: number;
  title?: string;
  ref?: Ref<SVGSVGElement>;
};

export function PrismSymbol({
  className = "",
  beam = PRISM_BEAM,
  bleed = 0,
  title,
  ref,
}: PrismSymbolProps) {
  const { w, h } = PRISM_SYMBOL_VIEWBOX;
  return (
    <svg
      ref={ref}
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      overflow={bleed ? "visible" : undefined}
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <polygon data-ps-beam="" points={beamPoints(bleed)} fill={beam} />
      <g data-ps-bands="">
        {BANDS.map((band) => (
          <polygon key={band.color} points={band.points} fill={band.color} />
        ))}
      </g>
      <path data-ps-wireframe="" d={WIREFRAME} fill={NEUTRAL.graphic} />
    </svg>
  );
}
