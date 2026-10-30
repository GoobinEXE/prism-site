export const DR_VIEWBOX = { x: 423, y: 645, w: 1203, h: 756 } as const;

export const DR_DOORWAY = { x1: 1329.44, y1: 759.67, x2: 1595.43, y2: 1298.74 } as const;

export const DR_DOOR_CENTER = {
  x: (DR_DOORWAY.x1 + DR_DOORWAY.x2) / 2,
  y: (DR_DOORWAY.y1 + DR_DOORWAY.y2) / 2,
} as const;

export const DR_DOOR_ORIGIN = `${(((DR_DOOR_CENTER.x - DR_VIEWBOX.x) / DR_VIEWBOX.w) * 100).toFixed(2)}% ${(((DR_DOOR_CENTER.y - DR_VIEWBOX.y) / DR_VIEWBOX.h) * 100).toFixed(2)}%`;

type Point = [number, number];

type Key = {
  free: number;
  freeTop: number;
  freeBottom: number;
  hingeTop: number;
  hingeBottom: number;
  corner: number;
  knob: Point;
};

const HINGE = 1595.43;
const LINTEL = { x: 1394.31, gap: 11.11 };
const LINTEL_W = HINGE - LINTEL.x;

const CLOSED: Key = {
  free: 1319.02,
  freeTop: 749.13,
  freeBottom: 1299.18,
  hingeTop: 749.13,
  hingeBottom: 1299.7,
  corner: 9.5,
  knob: [1357.3, 1028.6],
};

const AJAR: Key = {
  free: 1405.42,
  freeTop: 675.25,
  freeBottom: 1374.2,
  hingeTop: 751.03,
  hingeBottom: 1295.51,
  corner: 10,
  knob: [1444.6, 1028.6],
};

const OPEN: Key = {
  free: 1882.08,
  freeTop: 749.13,
  freeBottom: 1298.98,
  hingeTop: 749.13,
  hingeBottom: 1298.98,
  corner: 0,
  knob: [1853.7, 1027.8],
};

const KEYS = [CLOSED, AJAR, OPEN] as const;

const S_AJAR =
  (AJAR.freeBottom - AJAR.freeTop) / (AJAR.hingeBottom - AJAR.hingeTop);
const CX = (CLOSED.free + HINGE) / 2;
const CY = (AJAR.freeTop - AJAR.hingeTop * S_AJAR) / (1 - S_AJAR);
const W_CLOSED = HINGE - CLOSED.free;
const W_OPEN = OPEN.free - HINGE;
const THETA_AJAR = Math.acos(
  (HINGE - CX - (AJAR.free - CX) / S_AJAR) / W_CLOSED
);
const DEPTH = (S_AJAR * W_CLOSED * Math.sin(THETA_AJAR)) / (S_AJAR - 1);

export const DR_KNOB_ORIGIN = { x: AJAR.knob[0], y: AJAR.knob[1] } as const;
export const DR_AJAR_DEG = Math.round((THETA_AJAR * 180) / Math.PI);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function knobUV(key: Key): Point {
  const u = (key.knob[0] - key.free) / (HINGE - key.free);
  const top = lerp(key.freeTop, key.hingeTop, u);
  const bottom = lerp(key.freeBottom, key.hingeBottom, u);
  return [u, (key.knob[1] - top) / (bottom - top)];
}

const UV = KEYS.map(knobUV);

export type DoorShape = {
  leaf: string;
  knob: { dx: number; dy: number; alpha: number };
  lintel: number;
  angle: number;
};

const fmt = ([x, y]: Point) => `${x.toFixed(2)} ${y.toFixed(2)}`;

function leafPath(
  freeTop: Point,
  hingeTop: Point,
  hingeBottom: Point,
  freeBottom: Point,
  corner: number
) {
  const toward = (target: Point): Point => {
    const dx = target[0] - freeBottom[0];
    const dy = target[1] - freeBottom[1];
    const len = Math.hypot(dx, dy) || 1;
    const r = Math.min(corner, len / 2);
    return [freeBottom[0] + (dx / len) * r, freeBottom[1] + (dy / len) * r];
  };
  if (corner < 0.05) {
    return `M${fmt(freeTop)}L${fmt(hingeTop)}L${fmt(hingeBottom)}L${fmt(freeBottom)}Z`;
  }
  return `M${fmt(freeTop)}L${fmt(hingeTop)}L${fmt(hingeBottom)}L${fmt(toward(hingeBottom))}Q${fmt(freeBottom)} ${fmt(toward(freeTop))}Z`;
}

export function doorFromAngle(degrees: number) {
  const theta = (Math.min(180, Math.max(0, degrees)) * Math.PI) / 180;
  return theta <= THETA_AJAR
    ? (theta / THETA_AJAR) * 0.5
    : 0.5 + ((theta - THETA_AJAR) / (Math.PI - THETA_AJAR)) * 0.5;
}

export function doorShape(progress: number): DoorShape {
  const p = clamp01(progress);
  const late = p > 0.5;
  const a = late ? 1 : 0;
  const b = a + 1;
  const t = late ? (p - 0.5) / 0.5 : p / 0.5;

  const theta = late
    ? THETA_AJAR + (Math.PI - THETA_AJAR) * t
    : THETA_AJAR * t;
  const width = late ? lerp(W_CLOSED, W_OPEN, t) : W_CLOSED;
  const s = DEPTH / (DEPTH - width * Math.sin(theta));

  const hingeTop = lerp(KEYS[a].hingeTop, KEYS[b].hingeTop, t);
  const hingeBottom = lerp(KEYS[a].hingeBottom, KEYS[b].hingeBottom, t);
  const free = CX + (HINGE - width * Math.cos(theta) - CX) * s;
  const freeTop = CY + (hingeTop - CY) * s;
  const freeBottom = CY + (hingeBottom - CY) * s;
  const corner = lerp(KEYS[a].corner, KEYS[b].corner, t);

  const u = lerp(UV[a][0], UV[b][0], t);
  const v = lerp(UV[a][1], UV[b][1], t);
  const knobX = lerp(free, HINGE, u);
  const knobY = lerp(
    lerp(freeTop, hingeTop, u),
    lerp(freeBottom, hingeBottom, u),
    v
  );

  let lintel = 0;
  if (late) {
    const gap =
      LINTEL.gap *
      (1 - clamp01((theta - THETA_AJAR) / (Math.PI / 2 - THETA_AJAR)));
    lintel =
      free >= HINGE
        ? LINTEL_W
        : Math.min(LINTEL_W, Math.max(0, free - LINTEL.x - gap));
  }

  return {
    leaf: leafPath(
      [free, freeTop],
      [HINGE, hingeTop],
      [HINGE, hingeBottom],
      [free, freeBottom],
      corner
    ),
    knob: {
      dx: knobX - DR_KNOB_ORIGIN.x,
      dy: knobY - DR_KNOB_ORIGIN.y,
      alpha: clamp01((Math.abs(free - HINGE) - 40) / 60),
    },
    lintel,
    angle: (theta * 180) / Math.PI,
  };
}

export function knobTransform(shape: DoorShape) {
  return `translate(${shape.knob.dx.toFixed(2)} ${shape.knob.dy.toFixed(2)})`;
}

export function paintDoor(svg: SVGSVGElement | null, progress: number) {
  if (!svg) return;
  const shape = doorShape(progress);
  svg.querySelector("[data-dr-leaf]")?.setAttribute("d", shape.leaf);
  const knob = svg.querySelector("[data-dr-knob]");
  knob?.setAttribute("transform", knobTransform(shape));
  knob?.setAttribute("opacity", shape.knob.alpha.toFixed(3));
  svg
    .querySelector("[data-dr-lintel]")
    ?.setAttribute("width", shape.lintel.toFixed(2));
  return shape;
}
