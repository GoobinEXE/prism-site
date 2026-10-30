"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { phaseFromPath } from "@/lib/chamber";

export function ThemeSync() {
  const pathname = usePathname();
  const skipOnce = useRef(false);

  useEffect(() => {
    const next = phaseFromPath(pathname);
    const current = document.documentElement.getAttribute("data-phase");

    if (document.querySelector(".chamber-overlay.is-active")) {
      skipOnce.current = true;
      return;
    }

    if (skipOnce.current) {
      skipOnce.current = false;
      if (current !== next) {
        document.documentElement.setAttribute("data-phase", next);
      }
      return;
    }

    if (current !== next) {
      document.documentElement.setAttribute("data-phase", next);
    }
  }, [pathname]);

  return null;
}
