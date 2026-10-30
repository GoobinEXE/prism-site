import type { Metadata } from "next";
import { CopyTerminal } from "@/components/CopyTerminal";
import { ChamberLink } from "@/components/ChamberLink";
import { ProjectLinks } from "@/components/ProjectLinks";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Apps mobile, softwares para desktop, web apps e os projetos da Dark Room.",
};

export default function SolucoesPage() {
  return (
    <div className="pt-(--header-h)">
      <section className="section pb-8" aria-labelledby="solucoes-hero">
        <div className="container px-(--margin)">
          <h1 id="solucoes-hero" className="section-title">
            Soluções
          </h1>
        </div>
      </section>

      <section
        id="mobile"
        className="section pt-4"
        aria-labelledby="frente-mobile"
      >
        <div className="container px-(--margin)">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <h2 id="frente-mobile" className="title-main text-2xl font-bold md:text-3xl">
              Apps mobile
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="glass-spectrum rounded-lg p-6 md:p-8">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Lumen
                </h3>
                <span className="tag">iOS · Android</span>
              </div>
              <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
                Um app para organizar a rotina: blocos de foco, diário de sono e
                relatórios fáceis de compartilhar com quem te acompanha.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-(--text-secondary)">
                <li className="flex gap-2">
                  <span className="bullet mt-1.5" />
                  Rotina e foco com lembretes visuais
                </li>
                <li className="flex gap-2">
                  <span className="bullet mt-1.5" />
                  Diário de sono com relatórios
                </li>
                <li className="flex gap-2">
                  <span className="bullet mt-1.5" />
                  Funciona no iPhone e no Android
                </li>
              </ul>
              <ProjectLinks project="lumen" className="mt-6" />
            </article>

            <article className="glass-spectrum rounded-lg p-6 md:p-8">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-foreground">
                  RPGYM
                </h3>
                <span className="tag">iPhone</span>
              </div>
              <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
                Seus treinos viram um RPG. Cada sessão sobe seus atributos e você
                vê a evolução acontecendo.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-(--text-secondary)">
                <li className="flex gap-2">
                  <span className="bullet mt-1.5" />
                  Atributos que sobem a cada treino
                </li>
                <li className="flex gap-2">
                  <span className="bullet mt-1.5" />
                  Histórico de treinos e carga
                </li>
                <li className="flex gap-2">
                  <span className="bullet mt-1.5" />
                  Feito para iPhone
                </li>
              </ul>
              <ProjectLinks project="rpgym" className="mt-6" />
            </article>
          </div>
        </div>
      </section>

      <section
        id="desktop"
        className="section pt-4"
        aria-labelledby="frente-desktop"
      >
        <div className="container px-(--margin)">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <h2 id="frente-desktop" className="title-main text-2xl font-bold md:text-3xl">
              Softwares para desktop
            </h2>
          </div>

          <article className="glass-spectrum max-w-3xl rounded-lg p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-display text-xl font-bold text-foreground">
                Prism Translate
              </h3>
              <span className="tag">Mac</span>
            </div>
            <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
              Traduza o texto onde você está digitando, sem trocar de janela. Ele
              fica na barra de menus e aparece com um atalho.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold tracking-wide text-(--text-muted) uppercase">
                Instale pelo Homebrew
              </p>
              <CopyTerminal command="brew tap goobinexe/tap && brew trust --tap goobinexe/tap && brew install --cask prism-translate" />
            </div>
            <ProjectLinks project="prismTranslate" className="mt-6" />
          </article>
        </div>
      </section>

      <section
        id="web"
        className="section pt-4"
        aria-labelledby="frente-web"
      >
        <div className="container px-(--margin)">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <h2 id="frente-web" className="title-main text-2xl font-bold md:text-3xl">
              Web apps
            </h2>
          </div>

          <article className="glass-spectrum max-w-3xl rounded-lg p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-foreground">
              Sistemas sob medida
            </h3>
            <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
              Web apps que atualizam na hora para todo mundo e deixam claro quem
              pode ver e editar cada coisa.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-(--text-secondary)">
              <li className="flex gap-2">
                <span className="bullet mt-1.5" />
                Atualização em tempo real
              </li>
              <li className="flex gap-2">
                <span className="bullet mt-1.5" />
                Permissões por pessoa e por equipe
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section
        id="dark-room"
        className="section pt-4"
        aria-labelledby="frente-dark-room"
      >
        <div className="container px-(--margin)">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <h2 id="frente-dark-room" className="title-main text-2xl font-bold md:text-3xl">
              Dark Room
            </h2>
          </div>

          <article className="glass-spectrum max-w-3xl rounded-lg p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-display text-xl font-bold text-foreground">
                Jogos e projetos experimentais
              </h3>
            </div>
            <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
              Jogos, bots para comunidades e ferramentas para consoles antigos.
              Tudo isso mora na Dark Room.
            </p>
            <div className="mt-6">
              <ChamberLink href="/dark-room" className="btn btn-magenta">
                Entrar na Dark Room
              </ChamberLink>
            </div>
          </article>
        </div>
      </section>

    </div>
  );
}
