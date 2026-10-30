import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { SPECTRUM, SPECTRUM_ORDER, VEIL } from "../src/lib/brandTokens.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");

const CANONICAL_ORDER = ["#01ABE8", "#AEB932", "#F4E412", "#E97635", "#DA0082"];

const LEGACY_COLORS = [
  /#(00aeef|abba2a|f7e614|f0793a|de0388|0d0f14|07080c|050608|eef3f9)\b/i,
  /rgba\(\s*(0,\s*174,\s*239|171,\s*186,\s*42|247,\s*230,\s*20|240,\s*121,\s*58|222,\s*3,\s*136|13,\s*15,\s*20),/,
];

const BANNED_TERMS = [
  /disrup/i,
  /revolucion/i,
  /sinergi/i,
  /solução 360/i,
  /ecossistema integrado/i,
  /líder de mercado/i,
  /estado da arte/i,
  /mais aguardado/i,
  /imperdível/i,
  /última geração/i,
  /\bhype\b/i,
  /mergulh/i,
  /tapeçaria/i,
  /\bfarol\b/i,
  /testamento/i,
  /\bcrucial\b/i,
  /melhor jogo/i,
];

const RETIRED_NAMES = [/Dark Room Labs/, /\bstealth\b/i, /\b\d{3}nm\b/];

const DARK_ROOM_SURFACES = [
  "src/components/DarkRoomPortal.tsx",
  "src/components/ChamberProvider.tsx",
  "src/components/logos/DarkRoomLogo.tsx",
  "src/lib/chamberTimeline.ts",
  "src/app/dark-room/",
];

const PRISM_MARKS = /\b(PrismMonogram|PrismSymbol|PrismLockup|SpectrumRule|SPECTRUM_ORDER)\b/;

const HEX = /#[0-9a-f]{6}\b|#[0-9a-f]{3}\b(?![\w-])/i;
const HEX_ALLOWED = ["src/lib/brandTokens.ts"];

const violations = [];
const report = (file, line, rule, text) =>
  violations.push(`${file}:${line}  [${rule}]  ${text.trim().slice(0, 100)}`);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

for (const path of walk(SRC)) {
  if (!/\.(tsx?|css)$/.test(path)) continue;
  const file = relative(ROOT, path);
  const isCode = /\.tsx?$/.test(path);
  const isDarkRoom = DARK_ROOM_SURFACES.some((p) => file.startsWith(p));
  readFileSync(path, "utf8")
    .split("\n")
    .forEach((text, i) => {
      const line = i + 1;
      if (LEGACY_COLORS.some((re) => re.test(text))) report(file, line, "cor legada", text);
      if (!isCode) return;
      if (!HEX_ALLOWED.includes(file) && HEX.test(text)) report(file, line, "hex fora de brandTokens", text);
      if (BANNED_TERMS.some((re) => re.test(text))) report(file, line, "termo vetado §2.2", text);
      if (RETIRED_NAMES.some((re) => re.test(text))) report(file, line, "nome aposentado", text);
      if (isDarkRoom && PRISM_MARKS.test(text)) report(file, line, "marca Prism na superfície Dark Room", text);
    });
}

const order = SPECTRUM_ORDER.map((c) => c.toUpperCase());
if (order.join() !== CANONICAL_ORDER.join()) {
  report("src/lib/brandTokens.ts", 0, "ordem espectral", order.join(" → "));
}

const css = readFileSync(join(SRC, "app/globals.css"), "utf8");
const cssVar = (name) =>
  css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1].toUpperCase();
for (const [name, value] of Object.entries(SPECTRUM)) {
  if (cssVar(`spectrum-${name}`) !== value) {
    report("src/app/globals.css", 0, "espelho CSS ≠ brandTokens", `--spectrum-${name}: ${cssVar(`spectrum-${name}`)} ≠ ${value}`);
  }
}
for (const [name, value] of Object.entries(VEIL)) {
  if (cssVar(`veil-${name}`) !== value) {
    report("src/app/globals.css", 0, "espelho CSS ≠ brandTokens", `--veil-${name}: ${cssVar(`veil-${name}`)} ≠ ${value}`);
  }
}

if (violations.length) {
  console.error(`lint:brand: ${violations.length} violação(ões)\n`);
  console.error(violations.join("\n"));
  process.exit(1);
}
console.log("lint:brand: ok");
