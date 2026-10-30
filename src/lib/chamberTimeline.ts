import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";
import type { ChamberDirection } from "@/lib/chamber";
import { DR_DOOR_ORIGIN, paintDoor } from "@/lib/darkRoomDoor";

export type ChamberNodes = {
  root: HTMLElement;
  veil: HTMLElement;
  grain: HTMLElement;
  scan: HTMLElement;
  lockup: HTMLElement;
  stamp: HTMLElement;
};

export type ChamberPlayResult = {
  timeline: gsap.core.Timeline;
  navigateAt: number;
  duration: number;
};

export function playChamberTimeline(
  nodes: ChamberNodes,
  direction: ChamberDirection,
  onNavigate: () => void,
  onComplete: () => void
): ChamberPlayResult {
  const reduced = prefersReducedMotion();
  const duration = reduced ? 0.24 : 1.35;
  const navigateAt = reduced ? duration * 0.5 : duration * 0.55;

  const { root, veil, grain, scan, lockup, stamp } = nodes;

  const svg = lockup.querySelector("svg");
  const wordmark = svg?.querySelector("[data-dr-wordmark]") ?? null;
  const door = { p: direction === "enter" ? 0 : 1 };
  const paint = () => paintDoor(svg, door.p);

  gsap.killTweensOf([root, veil, grain, scan, lockup, stamp, wordmark, door]);
  paint();

  gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });
  gsap.set([veil, grain, scan, stamp], { clearProps: "all" });

  const tl = gsap.timeline({
    defaults: { ease: EASE.soft },
    onComplete: () => {
      gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
      onComplete();
    },
  });

  if (reduced) {
    gsap.set(veil, { opacity: 0.9 });
    gsap.set(stamp, { opacity: 1, xPercent: -50 });
    tl.to({}, { duration });
    tl.call(onNavigate, [], navigateAt);
    return { timeline: tl, navigateAt, duration };
  }

  if (direction === "enter") {
    gsap.set(lockup, {
      scale: 0.92,
      autoAlpha: 0,
      transformOrigin: DR_DOOR_ORIGIN,
      filter: "none",
      force3D: false,
    });
    gsap.set(wordmark, { autoAlpha: 1 });
    gsap.set(stamp, { opacity: 0, xPercent: -50, y: 8 });
    gsap.set(veil, { opacity: 0 });
    gsap.set(grain, { opacity: 0 });
    gsap.set(scan, { opacity: 0 });

    tl.to(veil, { opacity: 1, duration: 0.22, ease: EASE.soft }, 0)
      .to(grain, { opacity: 0.22, duration: 0.28 }, 0.04)
      .to(
        lockup,
        { autoAlpha: 1, scale: 1, duration: 0.28, ease: EASE.cinematic },
        0.06
      )
      .to(door, { p: 1, duration: 0.5, ease: EASE.door, onUpdate: paint }, 0.3)
      .to(wordmark, { autoAlpha: 0, duration: 0.2 }, 0.8)
      .to(lockup, { scale: 9, duration: 0.45, ease: "power3.in" }, 0.82)
      .to(stamp, { opacity: 1, y: 0, duration: 0.22, ease: EASE.cinematic }, 1.0)
      .to(stamp, { opacity: 0, duration: 0.18 }, 1.18)
      .to(lockup, { autoAlpha: 0, duration: 0.14 }, 1.15)
      .to(grain, { opacity: 0.08, duration: 0.18 }, 1.18)
      .to(veil, { opacity: 0, duration: 0.22, ease: EASE.soft }, 1.2);
  } else {
    gsap.set(lockup, {
      scale: 9,
      autoAlpha: 0.9,
      transformOrigin: DR_DOOR_ORIGIN,
      filter: "none",
      force3D: false,
    });
    gsap.set(wordmark, { autoAlpha: 0 });
    gsap.set(stamp, { opacity: 0, xPercent: -50, y: 8 });
    gsap.set(veil, { opacity: 0.92 });
    gsap.set(grain, { opacity: 0.3 });
    gsap.set(scan, { opacity: 0.12 });

    tl.to(scan, { opacity: 0.28, duration: 0.18, yoyo: true, repeat: 1 }, 0)
      .to(lockup, { scale: 1, autoAlpha: 1, duration: 0.55, ease: "power3.out" }, 0.1)
      .to(wordmark, { autoAlpha: 1, duration: 0.25 }, 0.4)
      .to(door, { p: 0, duration: 0.4, ease: EASE.door, onUpdate: paint }, 0.55)
      .to(stamp, { opacity: 1, y: 0, duration: 0.28, ease: EASE.cinematic }, 0.25)
      .to(stamp, { opacity: 0, duration: 0.22 }, 0.95)
      .to(lockup, { autoAlpha: 0, duration: 0.28 }, 1.0)
      .to(grain, { opacity: 0, duration: 0.28 }, 1.05)
      .to(veil, { opacity: 0, duration: 0.32, ease: EASE.soft }, 1.05)
      .to(scan, { opacity: 0, duration: 0.22 }, 1.05);
  }

  tl.call(onNavigate, [], navigateAt);

  return { timeline: tl, navigateAt, duration };
}
