"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { ChamberDirection, Phase } from "@/lib/chamber";
import { playChamberTimeline } from "@/lib/chamberTimeline";
import { DarkRoomLogo } from "@/components/logos/DarkRoomLogo";
import { gsap } from "@/lib/motion";

type ChamberContextValue = {
  play: (direction: ChamberDirection, href: string) => void;
  isPlaying: boolean;
};

const ChamberContext = createContext<ChamberContextValue | null>(null);

export function useChamber() {
  const ctx = useContext(ChamberContext);
  if (!ctx) {
    throw new Error("useChamber must be used within ChamberProvider");
  }
  return ctx;
}

function setPhase(phase: Phase) {
  document.documentElement.setAttribute("data-phase", phase);
}

export function ChamberProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [direction, setDirection] = useState<ChamberDirection>("enter");
  const busy = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLParagraphElement>(null);

  const play = useCallback(
    (dir: ChamberDirection, href: string) => {
      if (busy.current) return;

      const root = rootRef.current;
      const veil = veilRef.current;
      const grain = grainRef.current;
      const scan = scanRef.current;
      const lockup = lockupRef.current;
      const stamp = stampRef.current;

      if (!root || !veil || !grain || !scan || !lockup || !stamp) {
        return;
      }

      busy.current = true;
      setDirection(dir);
      setActive(true);

      timelineRef.current?.kill();

      const { timeline } = playChamberTimeline(
        {
          root,
          veil,
          grain,
          scan,
          lockup,
          stamp,
        },
        dir,
        () => {
          setPhase(dir === "enter" ? "dark-room" : "prism");
          router.push(href);
        },
        () => {
          setActive(false);
          busy.current = false;
          timelineRef.current = null;
        }
      );

      timelineRef.current = timeline;
    },
    [router]
  );

  const value = useMemo(
    () => ({ play, isPlaying: active }),
    [play, active]
  );

  const stamp = direction === "enter" ? "Entrando" : "Saindo";

  return (
    <ChamberContext.Provider value={value}>
      {children}
      <div
        ref={rootRef}
        className={`chamber-overlay dir-${direction} chamber-overlay--gsap${
          active ? " is-active" : ""
        }`}
        aria-hidden={!active}
        role="presentation"
      >
        <div ref={veilRef} className="chamber-overlay__veil" />
        <div ref={grainRef} className="chamber-overlay__grain" />
        <div ref={scanRef} className="chamber-overlay__scan" />

        <div ref={lockupRef} className="chamber-overlay__lockup">
          <DarkRoomLogo className="chamber-overlay__logo" door={0} />
        </div>

        <p ref={stampRef} className="chamber-stamp">
          {stamp}
        </p>
      </div>
    </ChamberContext.Provider>
  );
}
