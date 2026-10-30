import type { Metadata } from "next";
import { ChamberLink } from "@/components/ChamberLink";
import { DarkRoomLogo } from "@/components/logos/DarkRoomLogo";
import { ProjectLinks } from "@/components/ProjectLinks";
import type { ProjectKey } from "@/lib/projects";

const PROFILE =
  "Dark Room é o estúdio autoral de jogos, sistemas diegéticos e softwares experimentais da Prism.";

export const metadata: Metadata = {
  title: { absolute: "Dark Room" },
  description: PROFILE,
};

type Entry = {
  code: string;
  kind: string;
  title: string;
  lead: string;
  led: string;
  project: ProjectKey;
};

const ENTRIES: Entry[] = [
  {
    code: "DR-001",
    kind: "Jogo",
    title: "LimboOS",
    lead: "Um companheiro para RPG de mesa e ARG disfarçado de sistema operacional antigo. Você abre as pastas, lê os arquivos e joga dentro dele.",
    led: "led-cyan",
    project: "limboOS",
  },
  {
    code: "DR-002",
    kind: "Ferramenta",
    title: "Route 1 Kit",
    lead: "Prepara cartões SD e firmwares do Nintendo DSi e de flashcards sem dor de cabeça, no Windows, no Mac ou no Linux.",
    led: "led-olive",
    project: "route1",
  },
  {
    code: "DR-003",
    kind: "App",
    title: "Pokéwalker Companion",
    lead: "O Pokéwalker de volta, agora no celular. Você caminha, junta Watts e leva tudo para HeartGold e SoulSilver no DSi.",
    led: "led-magenta",
    project: "pokewalker",
  },
  {
    code: "DR-004",
    kind: "Bot",
    title: "VidelBOT",
    lead: "Um bot para Discord que cuida da moderação, responde a comandos e deixa a música tocando o dia todo.",
    led: "led-yellow",
    project: "videlBot",
  },
];

export default function DarkRoomPage() {
  return (
    <div className="pt-(--header-h)">
      <section className="section pb-10" aria-labelledby="dr-hero">
        <div className="container px-(--margin)">
          <h1 id="dr-hero" className="clear-dark-room">
            <DarkRoomLogo />
          </h1>
          <p className="section-lead">{PROFILE}</p>
        </div>
      </section>

      <section className="section pt-2" aria-labelledby="projetos-title">
        <div className="container px-(--margin)">
          <h2 id="projetos-title" className="section-title dr-rule">
            Projetos
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {ENTRIES.map((entry) => (
              <article key={entry.code} className="dr-entry">
                <div className="dr-entry__label">
                  <span>{entry.code}</span>
                  <span className="flex items-center gap-2">
                    {entry.kind}
                    <span className={`led ${entry.led}`} />
                  </span>
                </div>
                <div className="dr-entry__body">
                  <h3 className="title-main text-xl font-bold">
                    {entry.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-(--text-secondary)">
                    {entry.lead}
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
          Voltar à Prism
        </ChamberLink>
      </div>
    </div>
  );
}
