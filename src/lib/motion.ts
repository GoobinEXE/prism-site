import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function killMotion(target: gsap.TweenTarget) {
  gsap.killTweensOf(target);
}

export const EASE = {
  door: "power3.inOut",
  weighty: "power4.out",
  soft: "power2.out",
  cinematic: "expo.out",
} as const;
