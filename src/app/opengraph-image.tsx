import { ImageResponse } from "next/og";
import { prismSymbolMarkup } from "@/components/logos/PrismSymbol";
import { NEUTRAL } from "@/lib/brandTokens";

export const dynamic = "force-static";
export const alt =
  "Símbolo Prism: prisma em aramado refratando um feixe em cinco faixas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VIEW = { x: -720, y: -10, w: 2667, h: 1400 };

const SYMBOL = `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}"><rect x="${VIEW.x}" y="${VIEW.y}" width="${VIEW.w}" height="${VIEW.h}" fill="${NEUTRAL.marfim}"/>${prismSymbolMarkup(1600)}</svg>`;

const SRC = `data:image/svg+xml;base64,${Buffer.from(SYMBOL).toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: NEUTRAL.marfim,
        }}
      >
        <img
          src={SRC}
          width={size.width}
          height={size.height}
          alt=""
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 64,
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.08em",
            color: NEUTRAL.lead,
          }}
        >
          PRISM · APPS, DESKTOP E WEB
        </div>
      </div>
    ),
    size
  );
}
