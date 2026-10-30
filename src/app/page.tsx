import Link from "next/link";
import { HeroPrism } from "@/components/HeroPrism";
import { DarkRoomPortal } from "@/components/DarkRoomPortal";
import { ContactForm } from "@/components/ContactForm";
import { SpectrumRule } from "@/components/logos/SpectrumRule";

const pillars = [
  {
    accent: "Mobile",
    title: "Apps mobile",
    description:
      "Apps para iPhone e Android que resolvem coisas do dia a dia, do jeito mais simples possível.",
    href: "/solucoes#mobile",
  },
  {
    accent: "Desktop",
    title: "Softwares para desktop",
    description:
      "Programas leves para o seu computador. Abrem rápido, fazem o que prometem e não atrapalham.",
    href: "/solucoes#desktop",
  },
  {
    accent: "Web",
    title: "Web apps",
    description:
      "Sites e sistemas que funcionam em qualquer navegador e crescem junto com o seu projeto.",
    href: "/solucoes#web",
  },
  {
    accent: "Dark Room",
    title: "Jogos e projetos experimentais",
    description:
      "O lado mais livre da Prism: jogos, bots e ideias que a gente testa com calma.",
    href: "/#portal-dark-room",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroPrism />

      <section className="section" aria-labelledby="solucoes-title">
        <div className="container px-(--margin)">
          <h2 id="solucoes-title" className="section-title">
            O que a gente faz
          </h2>
          <SpectrumRule className="mt-5" />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => {
              const className =
                "glass-spectrum vhs-label group flex h-full flex-col p-6 pt-8 transition-colors";
              const body = (
                <>
                  <span className="tag self-start">
                    {pillar.accent}
                  </span>
                  <h3 className="title-main mt-4 text-lg leading-tight font-bold text-balance text-foreground group-hover:text-cyan">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-(--text-secondary)">
                    {pillar.description}
                  </p>
                </>
              );
              return (
                <li key={pillar.accent} className="h-full">
                  <Link href={pillar.href} className={className}>
                    {body}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <DarkRoomPortal />

      <section className="section" aria-labelledby="contato-rapido-title">
        <div className="container px-(--margin)">
          <div className="glass-strong mx-auto max-w-xl rounded-lg p-6 md:p-8">
            <h2 id="contato-rapido-title" className="section-title text-2xl md:text-3xl">
              Fale com a gente
            </h2>
            <div className="mt-6">
              <ContactForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
