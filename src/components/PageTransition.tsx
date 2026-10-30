"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (first.current) {
      first.current = false;
      gsap.set(el, { clearProps: "transform,opacity" });
      return;
    }

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: "transform,opacity" });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0.35, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: EASE.cinematic,
        overwrite: "auto",
        onComplete: () => {
          gsap.set(el, { clearProps: "transform" });
        },
      }
    );
  }, [pathname]);

  return (
    <div ref={ref} className="page-transition flex flex-1 flex-col">
      {children}
    </div>
  );
}
