"use client";

import { ChamberLink } from "@/components/ChamberLink";
import { DarkRoomLogo } from "@/components/logos/DarkRoomLogo";
import { ProjectLinks } from "@/components/ProjectLinks";
import type { ProjectKey } from "@/lib/projects";
import { useLocale } from "@/components/LocaleProvider";

type Entry = {
  code: string;
  kind: "game" | "tool" | "app" | "bot";
  title: string;
  leadKey: "limboOS" | "route1" | "pokewalker" | "videlBot";
  led: string;
  project: ProjectKey;
};

const ENTRIES: Entry[] = [
  {
    code: "DR-001",
    kind: "game",
    title: "LimboOS",
    leadKey: "limboOS",
    led: "led-cyan",
    project: "limboOS",
  },
  {
    code: "DR-002",
    kind: "tool",
    title: "Route 1 Kit",
    leadKey: "route1",
    led: "led-olive",
    project: "route1",
  },
  {
    code: "DR-003",
    kind: "app",
    title: "Pokéwalker Companion",
    leadKey: "pokewalker",
    led: "led-magenta",
    project: "pokewalker",
  },
  {
    code: "DR-004",
    kind: "bot",
    title: "VidelBOT",
    leadKey: "videlBot",
    led: "led-yellow",
    project: "videlBot",
  },
];

export function DarkRoomView() {
  const { t } = useLocale();
  const d = t.darkRoom;

  return (
    <div className="pt-(--header-h)">
      <section className="section pb-10" aria-labelledby="dr-hero">
        <div className="container px-(--margin)">
          <h1 id="dr-hero" className="clear-dark-room">
            <DarkRoomLogo />
          </h1>
          <p className="section-lead">{d.profile}</p>
        </div>
      </section>

      <section className="section pt-2" aria-labelledby="projetos-title">
        <div className="container px-(--margin)">
          <h2 id="projetos-title" className="section-title dr-rule">
            {d.projects}
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {ENTRIES.map((entry) => (
              <article key={entry.code} className="dr-entry">
                <div className="dr-entry__label">
                  <span>{entry.code}</span>
                  <span className="flex items-center gap-2">
                    {d.kinds[entry.kind]}
                    <span className={`led ${entry.led}`} />
                  </span>
                </div>
                <div className="dr-entry__body">
                  <h3 className="title-main text-xl font-bold">
                    {entry.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-(--text-secondary)">
                    {d.leads[entry.leadKey]}
                  </p>
                  <ProjectLinks
                    project={entry.project}
                    variant="dark"
                    className="mt-6"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="container px-(--margin) pb-20">
        <ChamberLink href="/" direction="exit" className="btn-tactical">
          {d.back}
        </ChamberLink>
      </div>
    </div>
  );
}
