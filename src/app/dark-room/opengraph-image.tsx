import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { NEUTRAL } from "@/lib/brandTokens";

export const dynamic = "force-static";
export const alt = "Logo Dark Room com a porta entreaberta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO = await readFile(
  join(process.cwd(), "public/assets/brand/dark-room-logo.svg")
);

const SRC = `data:image/svg+xml;base64,${LOGO.toString("base64")}`;
const LOGO_W = 640;
const LOGO_H = Math.round((LOGO_W * 756) / 1203);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: NEUTRAL.tape,
        }}
      >
        <img src={SRC} width={LOGO_W} height={LOGO_H} alt="" />
      </div>
    ),
    size
  );
}
