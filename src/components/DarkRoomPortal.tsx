"use client";

import { useLayoutEffect, useRef } from "react";
import { DarkRoomLogo } from "@/components/logos/DarkRoomLogo";
import { ChamberLink } from "@/components/ChamberLink";
import { ProjectLinks } from "@/components/ProjectLinks";
import { ScrollTrigger, gsap } from "@/lib/motion";
import {
  DR_DOORWAY,
  DR_DOOR_CENTER,
  DR_DOOR_ORIGIN,
  DR_VIEWBOX,
  doorFromAngle,
  paintDoor,
} from "@/lib/darkRoomDoor";

const LAB = [
  {
    code: "DR-001",
    title: "LimboOS",
    lead: "Um companheiro para RPG de mesa disfarçado de sistema operacional antigo. Você joga dentro dele.",
    led: "led-cyan",
    projects: ["limboOS"],
  },
  {
    code: "DR-002",
    title: "Route 1 Kit",
    lead: "Prepara cartões SD e firmwares do Nintendo DSi sem dor de cabeça.",
    led: "led-olive",
    projects: ["route1"],
  },
  {
    code: "DR-003",
    title: "Pokéwalker Companion",
    lead: "O Pokéwalker de volta, agora no celular. Seus passos viram Watts para HeartGold e SoulSilver.",
    led: "led-magenta",
    projects: ["pokewalker"],
  },
  {
    code: "DR-004",
    title: "VidelBOT",
    lead: "Bot para Discord que modera o servidor e toca música o dia todo.",
    led: "led-yellow",
    projects: ["videlBot"],
  },
] as const;

const SWING = { start: 2.1, end: 4.7 } as const;

const T = {
  dark: 1,
  phase: 1,
  develop: 1.1,
  developed: 1.9,
  dolly: 4.85,
  end: 6.3,
} as const;

type Phase = "prism" | "dark-room";

function setHomePhase(phase: Phase) {
  if (document.querySelector(".chamber-overlay.is-active")) return;
  if (window.location.pathname !== "/") return;
  const root = document.documentElement;
  if (root.getAttribute("data-phase") !== phase) {
    root.setAttribute("data-phase", phase);
  }
}

function setPortalActive(active: boolean) {
  document.documentElement.toggleAttribute("data-portal-active", active);
}

function lockupMap(lockup: HTMLElement) {
  const k = lockup.offsetWidth / DR_VIEWBOX.w;
  return {
    k,
    x: (vx: number) => lockup.offsetLeft + (vx - DR_VIEWBOX.x) * k,
    y: (vy: number) => lockup.offsetTop + (vy - DR_VIEWBOX.y) * k,
  };
}

export function DarkRoomPortal() {
  const stageRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const insideLogoRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const dark = darkRef.current;
    const lockup = lockupRef.current;
    const logo = logoRef.current;
    const inside = insideRef.current;
    const insideLogo = insideLogoRef.current;
    if (!stage || !dark || !lockup || !logo || !inside || !insideLogo) {
      return;
    }

    const interior = logo.querySelector("[data-dr-interior]");
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
        compact: "(max-width: 768px)",
      },
      (context) => {
        const { reduce, compact } = context.conditions as Record<
          string,
          boolean
        >;

        if (reduce) {
          paintDoor(logo, 0.5);
          gsap.set(dark, { autoAlpha: 1 });
          gsap.set(lockup, { autoAlpha: 1 });
          ScrollTrigger.create({
            trigger: stage,
            start: "top 55%",
            onEnter: () => setHomePhase("dark-room"),
            onLeaveBack: () => setHomePhase("prism"),
          });
          return;
        }

        const swing = { deg: 0 };
        const fade = { t: 0 };
        const closing = { p: 0.5 };
        const shade = () => {
          const c = (v: number) => Math.round(v * fade.t);
          interior?.setAttribute("fill", `rgb(${c(9)},${c(10)},${c(12)})`);
        };
        const paint = () => {
          paintDoor(logo, doorFromAngle(swing.deg));
        };

        const dolly = () => {
          const m = lockupMap(lockup);
          const doorW = (DR_DOORWAY.x2 - DR_DOORWAY.x1) * m.k;
          const doorH = (DR_DOORWAY.y2 - DR_DOORWAY.y1) * m.k;
          return {
            x: stage.clientWidth / 2 - m.x(DR_DOOR_CENTER.x),
            y: stage.clientHeight / 2 - m.y(DR_DOOR_CENTER.y),
            s: Math.max(stage.clientWidth / doorW, stage.clientHeight / doorH) * 1.15,
          };
        };

        paint();
        gsap.set(dark, { autoAlpha: 0 });
        gsap.set(lockup, {
          autoAlpha: 0,
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: DR_DOOR_ORIGIN,
          force3D: false,
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * (compact ? 3.2 : 3.8)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
            onToggle: (self) => setPortalActive(self.isActive),
          },
          onUpdate: () => {
            setHomePhase(tl.time() >= T.phase ? "dark-room" : "prism");
          },
        });

        tl.to(dark, { autoAlpha: 1, duration: T.dark, ease: "power1.in" }, 0)
          .to(
            lockup,
            { autoAlpha: 1, duration: T.developed - T.develop, ease: "power1.out" },
            T.develop
          )
          .to(
            swing,
            {
              deg: 180,
              duration: SWING.end - SWING.start,
              ease: "sine.inOut",
              onUpdate: paint,
            },
            SWING.start
          )
          .to(
            lockup,
            {
              x: () => dolly().x,
              y: () => dolly().y,
              scale: () => dolly().s,
              duration: T.end - T.dolly,
              ease: "power2.in",
            },
            T.dolly
          )
          .to(
            fade,
            {
              t: 1,
              duration: (T.end - T.dolly) * 0.3,
              onUpdate: shade,
            },
            T.end - (T.end - T.dolly) * 0.3
          );

        gsap.to(closing, {
          p: 0,
          ease: "power2.inOut",
          onUpdate: () => paintDoor(insideLogo, closing.p),
          scrollTrigger: {
            trigger: inside,
            start: "top 70%",
            end: "top 20%",
            scrub: 0.8,
          },
        });

        let alive = true;
        document.fonts?.ready.then(() => {
          if (alive) ScrollTrigger.refresh();
        });

        return () => {
          alive = false;
          setPortalActive(false);
        };
      }
    );

    return () => {
      mm.revert();
      setPortalActive(false);
      if (window.location.pathname === "/") setHomePhase("prism");
    };
  }, []);

  return (
    <section
      id="portal-dark-room"
      className="dr-portal"
      aria-label="Dark Room"
    >
      <div ref={stageRef} className="dr-portal__stage">
        <div ref={darkRef} className="dr-portal__dark" aria-hidden="true" />
        <div ref={lockupRef} className="dr-portal__lockup">
          <DarkRoomLogo
            ref={logoRef}
            door={0}
            interior
            className="block h-auto w-full"
          />
        </div>
      </div>

      <div
        ref={insideRef}
        className="dr-portal__inside"
        data-phase="dark-room"
      >
        <div className="container relative z-1 px-(--margin) pt-10 pb-20 md:pt-16 md:pb-28">
          <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="title-main text-[clamp(2rem,5vw,3.1rem)] leading-[1.05] font-bold text-(--text-primary)">
                Câmara de Maturação
              </h2>
            </div>
            <DarkRoomLogo
              ref={insideLogoRef}
              door={0.5}
              className="h-14 w-auto self-start md:h-16 md:self-auto"
            />
          </header>

          <div className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            {LAB.map((item) => (
              <article
                key={item.code}
                className="dr-portal__card relative flex h-full flex-col p-6 md:p-8"
              >
                <div className="flex h-3 items-center justify-between">
                  <span className="catalog-code">
                    {item.code}
                  </span>
                  <span className={`led ${item.led}`} />
                </div>
                <h3 className="font-display mt-4 text-xl leading-tight font-bold tracking-tight text-(--text-primary)">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-(--text-muted)">
                  {item.lead}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.projects.map((key) => (
                    <ProjectLinks
                      key={key}
                      project={key}
                      variant="dark"
                      named={item.projects.length > 1}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <ChamberLink href="/dark-room" className="btn-tactical">
              <span className="led led-magenta" />
              Ver todos os projetos
            </ChamberLink>
          </div>
        </div>
      </div>
    </section>
  );
}
