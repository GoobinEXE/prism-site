import type { Metadata } from "next";
import Link from "next/link";
import { SpectrumRule } from "@/components/logos/SpectrumRule";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Por que Prism: a gente pega uma ideia grande e divide em partes que dá para construir uma de cada vez.",
};

export default function SobrePage() {
  return (
    <div className="pt-(--header-h)">
      <section className="section pb-12" aria-labelledby="sobre-title">
        <div className="container px-(--margin)">
          <h1 id="sobre-title" className="section-title">
            Sobre a Prism
          </h1>
          <SpectrumRule className="mt-5" />
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="por-que-prism">
        <div className="container px-(--margin)">
          <article className="glass-spectrum vhs-label max-w-3xl p-6 pt-9 md:p-10 md:pt-12">
            <h2 id="por-que-prism" className="title-main text-2xl font-bold md:text-3xl">
              Por que Prism
            </h2>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              Um prisma pega um feixe de luz e separa em cores. A gente faz o
              mesmo com ideias: pega um problema grande e divide em partes que
              dá para construir uma de cada vez.
            </p>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              É daí que saem os apps, os softwares para desktop, os web apps e
              os projetos da Dark Room. Cada um com o seu jeito, todos vindos do
              mesmo lugar.
            </p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="e-a-dark-room">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-3xl p-6 md:p-10">
            <h2 id="e-a-dark-room" className="title-main text-2xl font-bold md:text-3xl">
              E a Dark Room?
            </h2>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              A Dark Room é onde ficam os jogos e os projetos mais
              experimentais. O nome vem da câmara escura da fotografia: as
              coisas ficam lá dentro sendo reveladas com calma, até estarem
              prontas para sair.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dark-room" className="btn btn-magenta">
                Visitar a Dark Room
              </Link>
              <Link href="/solucoes" className="btn btn-ghost">
                Ver soluções
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
