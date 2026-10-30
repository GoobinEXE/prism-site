import type { Metadata } from "next";
import Link from "next/link";
import { ChamberLink } from "@/components/ChamberLink";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { cv, cvEducation, cvExperience, cvSkills } from "@/lib/cv";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Por trás do Prism",
  description:
    "Marcelo Pessoa de Aguiar Lopes: designer de formação, desenvolvedor de jogos e quem assina o Prism e a Dark Room. História e currículo.",
};

const limboUrl = projects.limboOS.links[0].href;

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function PorTrasDoPrismPage() {
  return (
    <div className="pt-(--header-h)">
      <section className="section pb-10" aria-labelledby="quem-title">
        <div className="container px-(--margin)">
          <p className="label-caps text-(--text-muted)">Prazer, Marcelo</p>
          <h1 id="quem-title" className="section-title max-w-3xl">
            Quem está por trás do Prism
          </h1>
          <SpectrumRule className="mt-5" />
          <p className="section-lead max-w-[46ch]! text-lg!">
            Oi, eu sou o Marcelo Pessoa de Aguiar Lopes. Moro em Curitiba e sou
            quem desenha, programa e assina tudo o que sai com a marca Prism.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contato" className="btn btn-primary">
              Falar comigo
            </Link>
            <a href="#curriculo" className="btn btn-ghost">
              Ver currículo
            </a>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="historia-design">
        <div className="container grid gap-6 px-(--margin) lg:grid-cols-2">
          <article className="glass-spectrum vhs-label p-6 pt-9 md:p-10 md:pt-12">
            <h2
              id="historia-design"
              className="title-main text-2xl font-bold md:text-3xl"
            >
              Comecei pelo design
            </h2>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              Entrei em Design na PUCPR querendo ser artista 3D para jogos. Lá
              dentro percebi que o 3D era um hobby que eu amava, mas que meu
              objetivo de verdade era UX/UI e game design: pensar em quem vai
              usar, no que a pessoa vê primeiro, onde ela trava e no que dá pra
              tirar do caminho, até a coisa ficar o mais intuitiva possível.
            </p>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              Depois de dois anos troquei Design por Jogos Digitais. Mas nunca
              larguei o design. Ele está em toda interface que eu monto,
              inclusive nesta página.
            </p>
          </article>

          <article className="glass-strong rounded-(--radius-lg) p-6 md:p-10">
            <h2 className="title-main text-2xl font-bold md:text-3xl">
              Dos jogos para o software
            </h2>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              Me formei em Tecnologia em Jogos Digitais pela Universidade
              Positivo em junho de 2026. Fazer jogo me ensinou uma regra que eu
              levo pra qualquer projeto: se a pessoa não entende o que fazer nos
              primeiros segundos, ela desiste.
            </p>
          </article>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="onde-trabalhei">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-3xl rounded-(--radius-lg) p-6 md:p-10">
            <h2
              id="onde-trabalhei"
              className="title-main text-2xl font-bold md:text-3xl"
            >
              Onde eu trabalhei
            </h2>
            <p className="mt-4 max-w-[60ch] text-base text-(--text-secondary)">
              Comecei como estagiário de motion e vídeo na Celepar. Passei dois
              anos lá fazendo animações e vídeos que explicavam os sistemas
              digitais do Estado. Depois fui para a comunicação do BRDE,
              cuidando do fluxo de documentos dos acordos de parceria. Na
              Secretaria da Inovação e Inteligência Artificial, fui assessor
              técnico de projetos: avaliava soluções de IA junto com
              fornecedores e apresentava propostas para outras secretarias.
            </p>
            <p className="mt-4 max-w-[60ch] text-base text-(--text-secondary)">
              Hoje estou na Superintendência-Geral de Governança de Serviços e
              Dados. Passei por BI e suporte de TI e agora sou pesquisador em
              inteligência artificial, testando onde IA generativa e automação
              de documentos fazem sentido nos serviços públicos do Paraná.
            </p>
          </article>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="prism-e-dark-room">
        <div className="container px-(--margin)">
          <h2
            id="prism-e-dark-room"
            className="title-main text-2xl font-bold md:text-3xl"
          >
            Prism e Dark Room
          </h2>
          <p className="mt-4 max-w-[60ch] text-base text-(--text-secondary)">
            Fora do expediente, eu construo coisas.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="glass-spectrum rounded-(--radius-lg) p-6 md:p-8">
              <span className="tag">Prism · softwares</span>
              <p className="mt-3 max-w-[54ch] text-base text-(--text-secondary)">
                O Prism é a casa dos softwares: o Lumen, app para acompanhar
                TDAH, sono e rotina; o Prism Translate, que traduz texto direto
                da barra de menus do Mac; e sites feitos sob medida.
              </p>
              <Link href="/solucoes" className="btn btn-ghost mt-6 bg-(--glass-elevated)!">
                Ver soluções
              </Link>
            </article>

            <article className="glass-spectrum rounded-(--radius-lg) p-6 md:p-8">
              <span className="tag">Dark Room · jogos e comunidade gamer</span>
              <p className="mt-3 max-w-[54ch] text-base text-(--text-secondary)">
                A Dark Room é o meu canto de jogos e da comunidade gamer. O
                carro-chefe é o LimboOS, um companion para campanhas de RPG de
                mesa que já está no ar. Durante a sessão, ele entrega aos
                jogadores intel, fitas, dossiês e conquistas, então a história
                continua fora da mesa e o mestre ganha mais ferramentas para
                contar ela.
              </p>
              <p className="mt-3 max-w-[54ch] text-base text-(--text-secondary)">
                Junto dele ficam o Route 1 Kit, o Pokéwalker Companion e o
                VidelBOT, um bot para servidores de Discord.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={limboUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-magenta"
                >
                  Conhecer o LimboOS
                  <span className="sr-only"> (abre em nova aba)</span>
                  <ExternalIcon />
                </a>
                <ChamberLink href="/dark-room" className="btn btn-ghost bg-(--glass-elevated)!">
                  Entrar na Dark Room
                </ChamberLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="mesa">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-3xl rounded-(--radius-lg) p-6 md:p-10">
            <h2 id="mesa" className="title-main text-2xl font-bold md:text-3xl">
              Gente em volta da mesa
            </h2>
            <p className="mt-4 max-w-[60ch] text-base text-(--text-secondary)">
              Também gosto de juntar gente. Já organizei comunidades gamer e
              eventos e sou mestre de RPG, e quase tudo o que eu sei sobre ouvir
              quem joga veio daí.
            </p>
          </article>
        </div>
      </section>

      <section
        id="curriculo"
        className="section scroll-mt-(--header-h) pt-0"
        aria-labelledby="curriculo-title"
      >
        <div className="container px-(--margin)">
          <div className="glass-spectrum vhs-label p-6 pt-9 md:p-10 md:pt-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="label-caps text-(--text-muted)">Curriculum vitae</p>
                <h2
                  id="curriculo-title"
                  className="title-main mt-2 text-2xl font-bold md:text-3xl"
                >
                  Currículo
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={cv.pdf} download={cv.fileName} className="btn btn-primary">
                  Baixar PDF
                </a>
                <a
                  href={cv.html}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-ghost bg-(--glass-elevated)!"
                >
                  Versão para impressão
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h3 className="label-caps text-(--text-muted)">Experiência</h3>
                <ol className="mt-4 space-y-6">
                  {cvExperience.map((job) => (
                    <li key={job.org}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="font-display text-lg font-bold text-foreground">
                          {job.org}
                        </p>
                        <span className="tag">{job.period}</span>
                      </div>
                      <ul className="mt-2 space-y-3">
                        {job.roles.map((role) => (
                          <li key={role.title}>
                            <p className="flex flex-wrap items-baseline gap-x-3 text-sm font-semibold text-(--text-primary)">
                              {role.title}
                              {"time" in role && (
                                <span className="tag">{role.time}</span>
                              )}
                            </p>
                            <p className="mt-1 max-w-[60ch] text-sm text-(--text-secondary)">
                              {role.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="label-caps text-(--text-muted)">Formação</h3>
                  <ul className="mt-4 space-y-4">
                    {cvEducation.map((item) => (
                      <li key={item.title}>
                        <p className="text-sm font-semibold text-(--text-primary)">
                          {item.title}
                        </p>
                        <p className="text-sm text-(--text-secondary)">
                          {item.place}
                        </p>
                        {"href" in item && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-(--ink-cyan) underline underline-offset-2"
                          >
                            {item.linkLabel}
                            <span className="sr-only"> (abre em nova aba)</span>
                            <ExternalIcon />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="label-caps text-(--text-muted)">Habilidades</h3>
                  <dl className="mt-4 space-y-3">
                    {cvSkills.map((skill) => (
                      <div key={skill.group}>
                        <dt className="text-sm font-semibold text-(--text-primary)">
                          {skill.group}
                        </dt>
                        <dd className="text-sm text-(--text-secondary)">
                          {skill.items}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="bora">
        <div className="container px-(--margin)">
          <h2 id="bora" className="title-main text-2xl font-bold md:text-3xl">
            Bora conversar?
          </h2>
          <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
            Se você tem uma ideia e quer tirar do papel, me chama.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contato" className="btn btn-primary">
              Falar comigo
            </Link>
            <a href={cv.pdf} download={cv.fileName} className="btn btn-ghost">
              Baixar currículo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
