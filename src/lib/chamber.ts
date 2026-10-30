export type ChamberDirection = "enter" | "exit";
export type Phase = "prism" | "dark-room";

export function phaseFromPath(pathname: string): Phase {
  return pathname === "/dark-room" || pathname.startsWith("/dark-room/")
    ? "dark-room"
    : "prism";
}

export function directionForNav(
  from: Phase,
  toHref: string
): ChamberDirection | null {
  const to = phaseFromPath(toHref);
  if (from === to) return null;
  return to === "dark-room" ? "enter" : "exit";
}

export const CHAMBER_DURATION_MS = 1450;
export const CHAMBER_REDUCED_MS = 240;
export const CHAMBER_MIDPOINT_RATIO = 0.52;
