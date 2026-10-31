import type { Metadata } from "next";
import Link from "next/link";
import { ChamberLink } from "@/components/ChamberLink";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { cv, cvEducation, cvExperience } from "@/lib/cv";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Por trás do Prism",
  description:
    "Marcelo Pessoa de Aguiar Lopes: designer de formação, desenvolvedor de jogos e quem assina o Prism e a Dark Room. História e currículo.",
};

const limboUrl = projects.limboOS.links[0].href;

const sheet = "vhs-label rounded-(--radius-lg) bg-(--glass-elevated) p-6 pt-10 md:p-10 md:pt-12";
const heading = "title-main text-xl font-bold md:text-2xl";
const body = "mt-3 max-w-[60ch] text-base text-(--text-secondary)";
const textLink = "font-semibold text-(--text-primary)! underline! underline-offset-4";

export default function PorTrasDoPrismPage() {
  return (
    <div className="pt-(--header-h)">
      <section className="section" aria-labelledby="quem-title">
        <div className="container grid gap-10 px-(--margin) lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:self-start">
            <h1 id="quem-title" className="section-title">
              Quem está por trás do Prism
            </h1>
            <SpectrumRule className="mt-5" />
            <p className="section-lead">
              Oi, eu sou o Marcelo Pessoa de Aguiar Lopes. Moro em Curitiba e
              sou quem desenha, programa e assina tudo o que sai com a marca
              Prism.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cv.pdf} download={cv.fileName} className="btn btn-primary">
                Baixar currículo
              </a>
              <a
                href={cv.html}
                target="_blank"
                rel="noopener"
                className="btn bg-(--glass-elevated) text-(--text-primary)"
              >
                Versão para impressão
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </aside>

          <div className="space-y-8">
            <article className={sheet}>
              <h2 className={heading}>Comecei pelo design</h2>
              <p className={body}>
                Entrei em Design na PUCPR querendo ser artista 3D para jogos. Lá
                dentro percebi que o 3D era um hobby que eu amava, mas que meu
                objetivo de verdade era UX/UI e game design: pensar em quem vai
                usar, no que a pessoa vê primeiro, onde ela trava e no que dá pra
                tirar do caminho, até a coisa ficar o mais intuitiva possível.
              </p>
              <p className={body}>
                Depois de dois anos troquei Design por Jogos Digitais. Mas nunca
                larguei o design. Ele está em toda interface que eu monto,
                inclusive nesta página.
              </p>

              <h2 className={`${heading} mt-10`}>Dos jogos para o software</h2>
              <p className={body}>
                Me formei em Tecnologia em Jogos Digitais pela Universidade
                Positivo em junho de 2026. Fazer jogo me ensinou uma regra que eu
                levo pra qualquer projeto: se a pessoa não entende o que fazer
                nos primeiros segundos, ela desiste.
              </p>

              <h2 className={`${heading} mt-10`}>Onde eu trabalhei</h2>
              <p className={body}>
                Comecei como estagiário de motion e vídeo na Celepar. Passei dois
                anos lá fazendo animações e vídeos que explicavam os sistemas
                digitais do Estado. Depois fui para a comunicação do BRDE,
                cuidando do fluxo de documentos dos acordos de parceria. Na
                Secretaria da Inovação e Inteligência Artificial, fui assessor
                técnico de projetos: avaliava soluções de IA junto com
                fornecedores e apresentava propostas para outras secretarias.
              </p>
              <p className={body}>
                Hoje estou na Superintendência-Geral de Governança de Serviços e
                Dados. Passei por BI e suporte de TI e agora sou pesquisador em
                inteligência artificial, testando onde IA generativa e automação
                de documentos fazem sentido nos serviços públicos do Paraná.
              </p>

              <h2 className={`${heading} mt-10`}>Prism e Dark Room</h2>
              <p className={body}>
                Fora do expediente, eu construo coisas. O Prism é a casa dos
                softwares: o Lumen, app para acompanhar TDAH, sono e rotina; o
                Prism Translate, que traduz texto direto da barra de menus do
                Mac; e sites feitos sob medida.{" "}
                <Link href="/solucoes" className={textLink}>
                  Ver soluções
                </Link>
              </p>
              <p className={body}>
                A Dark Room é o meu canto de jogos e da comunidade gamer. O
                carro-chefe é o LimboOS, um companion para campanhas de RPG de
                mesa que já está no ar. Durante a sessão, ele entrega aos
                jogadores intel, fitas, dossiês e conquistas, então a história
                continua fora da mesa e o mestre ganha mais ferramentas para
                contar ela. Junto dele ficam o Route 1 Kit, o Pokéwalker
                Companion e o VidelBOT, um bot para servidores de Discord.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={limboUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-magenta"
                >
                  Conhecer o LimboOS
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
                <ChamberLink href="/dark-room" className={textLink}>
                  Entrar na Dark Room
                </ChamberLink>
              </div>

              <h2 className={`${heading} mt-10`}>Gente em volta da mesa</h2>
              <p className={body}>
                Também gosto de juntar gente. Já organizei comunidades gamer e
                eventos e sou mestre de RPG, e quase tudo o que eu sei sobre
                ouvir quem joga veio daí.
              </p>

              <h2 className={`${heading} mt-10`}>Bora conversar?</h2>
              <p className={body}>
                Se você tem uma ideia e quer tirar do papel,{" "}
                <Link href="/contato" className={textLink}>
                  me chama
                </Link>
                .
              </p>
            </article>

            <article
              id="curriculo"
              className={`${sheet} scroll-mt-[calc(var(--header-h)+1.5rem)]`}
              aria-labelledby="curriculo-title"
            >
              <h2 id="curriculo-title" className={heading}>
                Currículo
              </h2>

              <h3 className="mt-8 font-display text-lg font-bold text-(--text-primary)">
                Experiência
              </h3>
              <ul className="mt-4 space-y-5">
                {cvExperience.map((job) => (
                  <li key={job.org}>
                    <p className="text-base font-semibold text-(--text-primary)">
                      {job.org}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {job.roles.map((role) => (
                        <li
                          key={role.title}
                          className="text-sm text-(--text-secondary)"
                        >
                          {role.title}, {role.time}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-display text-lg font-bold text-(--text-primary)">
                Formação
              </h3>
              <ul className="mt-4 space-y-4">
                {cvEducation.map((item) => (
                  <li key={item.title}>
                    <p className="text-base font-semibold text-(--text-primary)">
                      {item.title}
                    </p>
                    <p className="text-sm text-(--text-secondary)">
                      {item.place}
                      {"href" in item && (
                        <>
                          {" · "}
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={textLink}
                          >
                            {item.linkLabel}
                            <span className="sr-only"> (abre em nova aba)</span>
                          </a>
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
