export const SPECTRUM = {
  cyan: "#01ABE8",
  olive: "#AEB932",
  yellow: "#F4E412",
  orange: "#E97635",
  magenta: "#DA0082",
} as const;

export const SPECTRUM_ORDER = [
  SPECTRUM.cyan,
  SPECTRUM.olive,
  SPECTRUM.yellow,
  SPECTRUM.orange,
  SPECTRUM.magenta,
] as const;

export const VEIL = {
  cyan: "#083B52",
  olive: "#3A3F0E",
  yellow: "#5C4E08",
  orange: "#52240D",
  magenta: "#4A012B",
} as const;

export const NEUTRAL = {
  marfim: "#F2ECE1",
  tape: "#090A0C",
  black: "#000000",
  graphic: "#0D0F13",
  slate: "#1F232B",
  lead: "#4A515E",
  charcoal: "#141820",
} as const;

export const METAL = {
  highlight: "#F0F0F2",
  core: "#DADADA",
  transition: "#8F9397",
  base: "#1A1C1F",
  vectorInk: "#EDEEF1",
} as const;

export const INK = {
  prism: {
    cyan: "#005F85",
    olive: "#545C10",
    yellow: "#6B5E00",
    orange: "#963D0A",
    magenta: "#A3005F",
  },
  darkRoom: {
    cyan: "#6EC2E1",
    olive: "#C4CA86",
    yellow: "#E7DF76",
    orange: "#E2A888",
    magenta: "#DA6DAE",
  },
} as const;

export const SURFACE = {
  prismGlass: "#EAE3D6",
  prismElevated: "#F6F2EB",
} as const;
