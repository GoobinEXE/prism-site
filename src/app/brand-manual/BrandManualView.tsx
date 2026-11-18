"use client";

import Link from "next/link";
import { PrismSymbol } from "@/components/logos/PrismSymbol";
import { PrismMonogram } from "@/components/logos/PrismMonogram";
import { PrismLockup } from "@/components/logos/PrismLockup";
import { DarkRoomLogo } from "@/components/logos/DarkRoomLogo";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { METAL, NEUTRAL, SPECTRUM, SPECTRUM_ROLES, VEIL } from "@/lib/brandTokens";
import { useLocale } from "@/components/LocaleProvider";
import { withBase } from "@/lib/site";

const DARK_ROOM_COLORS = [
  { name: "Abyssal Cyan", hex: VEIL.cyan, role: "Isolamento estéril, ambiente frio e estados dormentes" },
  { name: "Corrosive Olive", hex: VEIL.olive, role: "Estagnação, matéria oxidada e registros legados" },
  { name: "Tarnished Amber", hex: VEIL.yellow, role: "Vigilância, filamento fraco e atenção latente" },
  { name: "Burnt Oxide Orange", hex: VEIL.orange, role: "Desgaste mecânico, calor retido e hardware sob carga" },
  { name: "Coagulated Magenta", hex: VEIL.magenta, role: "Luz inactínica de câmara escura e ruptura narrativa" },
] as const;

export function BrandManualView() {
  const { locale } = useLocale();
  const isEn = locale === "en";

  return (
    <div className="pt-(--header-h)">
      <section className="section pb-10" aria-labelledby="bm-title">
        <div className="container px-(--margin)">
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-(--text-muted)">
            {isEn ? "Canonical Edition 2026" : "Edição Canônica 2026"}
          </div>
          <h1 id="bm-title" className="section-title mt-2">
            {isEn ? "Prism & Dark Room Brand Manual" : "Manual da Marca — Prism & Dark Room"}
          </h1>
          <SpectrumRule className="mt-5" />
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={withBase("/prism-darkroom-brand-manual.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {isEn ? "Open official PDF" : "Abrir PDF oficial"}
            </a>
            <Link href="/about" className="btn btn-ghost">
              {isEn ? "Back to About" : "Voltar para Sobre"}
            </Link>
          </div>
        </div>
      </section>

      {/* 1. Substratos */}
      <section className="section pt-0" aria-labelledby="bm-arch">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-arch" className="title-main text-2xl font-bold">
              {isEn ? "Brand Architecture & Substrates" : "Arquitetura da Marca e Substratos"}
            </h2>
            <p className="mt-3 text-sm text-(--text-secondary)">
              {isEn
                ? "Prism is the parent software and engineering studio; Dark Room is its game and experimental division. Both share one spectral DNA across opposite luminous polarities."
                : "A Prism é a marca-mãe de engenharia e software; a Dark Room é a divisão de jogos autorais e experimentos. As duas compartilham o mesmo DNA espectral em polaridades luminosas opostas."}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-(--radius) border border-(--rule-soft) p-5"
                style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}
              >
                <div className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: NEUTRAL.lead }}>
                  PRISM · {NEUTRAL.marfim}
                </div>
                <div className="mt-1 font-bold">Marfim Vintage</div>
                <p className="mt-2 text-xs" style={{ color: NEUTRAL.slate }}>
                  {isEn
                    ? "Clean-room editorial clarity for documentation, B2B, and desktop/mobile utilities. Avoids harsh pure white."
                    : "Clareza editorial de sala limpa para documentação, B2B e utilitários. Evita o branco puro ofuscante."}
                </p>
              </div>
              <div
                className="rounded-(--radius) border border-(--rule-soft) p-5"
                style={{ background: NEUTRAL.tape, color: METAL.highlight }}
              >
                <div className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: METAL.transition }}>
                  DARK ROOM · {NEUTRAL.tape}
                </div>
                <div className="mt-1 font-bold">Preto Magnético</div>
                <p className="mt-2 text-xs" style={{ color: METAL.core }}>
                  {isEn
                    ? "Deep magnetic-tape black floor. Pure 100% black is forbidden outside terminal emulators."
                    : "Piso escuro profundo de fita magnética. Preto 100% puro é vetado fora de emuladores de terminal."}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 2. Logotipos, Modo Claro/Noturno e Variações */}
      <section className="section pt-0" aria-labelledby="bm-logos">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-logos" className="title-main text-2xl font-bold">
              {isEn ? "Logos, Night Mode & Variations" : "Logotipos, Modo Noturno e Variações"}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="flex flex-col justify-between rounded-(--radius) border border-(--rule-soft) p-5" style={{ background: NEUTRAL.marfim }}>
                <div className="flex items-center gap-4">
                  <PrismSymbol className="h-20 w-auto shrink-0" />
                  <PrismLockup />
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold" style={{ color: NEUTRAL.graphic }}>
                    Prism Master (&gt; 120px)
                  </div>
                  <div className="mt-1 text-xs" style={{ color: NEUTRAL.lead }}>
                    {isEn ? "Clear space: 1X (prism base width)" : "Respiro mínimo: 1X (base do prisma)"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-(--radius) border border-(--rule-soft) p-5" style={{ background: NEUTRAL.marfim }}>
                <div className="flex items-center justify-center py-3">
                  <PrismMonogram className="h-14 w-14" glyph={NEUTRAL.graphic} />
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold" style={{ color: NEUTRAL.graphic }}>
                    Monograma P — Modo Claro
                  </div>
                  <div className="mt-1 text-xs" style={{ color: NEUTRAL.lead }}>
                    Glifo {NEUTRAL.graphic} sobre Marfim ({NEUTRAL.marfim}). Respiro: altura do P.
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-(--radius) border border-(--rule-soft) p-5" style={{ background: NEUTRAL.tape }}>
                <div className="flex items-center justify-center py-3">
                  <PrismMonogram className="h-14 w-14" glyph={NEUTRAL.marfim} />
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold" style={{ color: METAL.highlight }}>
                    Monograma P — Modo Noturno
                  </div>
                  <div className="mt-1 text-xs" style={{ color: METAL.transition }}>
                    Glifo Marfim ({NEUTRAL.marfim}) direto sobre {NEUTRAL.tape}, sem placa clara.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="flex flex-col justify-between rounded-(--radius) border border-(--rule-soft) p-6" style={{ background: NEUTRAL.tape }}>
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <DarkRoomLogo className="aspect-[1203/756] w-full" door={0} />
                    <span className="font-mono text-[10px]" style={{ color: METAL.transition }}>Fechada</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <DarkRoomLogo className="aspect-[1203/756] w-full" door={0.5} />
                    <span className="font-mono text-[10px]" style={{ color: METAL.highlight }}>Entreaberta</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <DarkRoomLogo className="aspect-[1203/756] w-full" door={1} />
                    <span className="font-mono text-[10px]" style={{ color: METAL.transition }}>Aberta</span>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-sm font-semibold" style={{ color: METAL.highlight }}>
                    Dark Room — SVG Oficial (3 Estados)
                  </div>
                  <div className="mt-1 text-xs" style={{ color: METAL.transition }}>
                    {isEn
                      ? `Only on Magnetic Black (${NEUTRAL.tape}). Clear space: width of letter D.`
                      : `Exclusivo sobre Preto Magnético (${NEUTRAL.tape}). Respiro: largura da letra D.`}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-(--radius) border border-(--rule-soft) p-6" style={{ background: NEUTRAL.tape }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase("/assets/brand/dark-room-logo-spectral-v1.jpg")}
                  alt="Dark Room Variante Espectral B2B"
                  className="h-36 w-full rounded-(--radius) object-cover"
                />
                <div className="mt-4">
                  <div className="text-sm font-semibold" style={{ color: METAL.highlight }}>
                    Dark Room — Variante Espectral B2B
                  </div>
                  <div className="mt-1 text-xs" style={{ color: METAL.transition }}>
                    Exclusiva para contratos e peças institucionais com a chancela A PRISM STUDIO.
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 3. Sistema Cromático & Exemplos Práticos */}
      <section className="section pt-0" aria-labelledby="bm-colors">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-colors" className="title-main text-2xl font-bold">
              {isEn ? "Chromatic System & Practical Examples" : "Sistema Cromático e Exemplos de Aplicação"}
            </h2>
            <SpectrumRule className="mt-5" />
            <div className="mt-5 grid gap-3">
              {SPECTRUM_ROLES.map((item, idx) => (
                <div
                  key={item.hex}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-(--radius) border border-(--rule-soft) px-4 py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: item.hex }} aria-hidden="true" />
                    <span className="font-mono text-xs text-(--text-muted)">0{idx + 1}</span>
                    <span className="font-semibold text-(--text-primary)">{item.name}</span>
                    <span className="font-mono text-xs text-(--text-muted)">{item.hex}</span>
                  </div>
                  <span className="text-xs text-(--text-secondary)">{item.role}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-(--text-muted)">
              {isEn ? "Dark Room Veiled Spectrum" : "Espectro Sombrio Dark Room"}
            </h3>
            <div className="mt-3 grid gap-2">
              {DARK_ROOM_COLORS.map((item) => (
                <div
                  key={item.hex}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-(--radius) border border-(--rule-soft) px-4 py-2.5 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-4 shrink-0 rounded-full border border-(--rule-soft)" style={{ background: item.hex }} aria-hidden="true" />
                    <span className="font-medium text-(--text-primary)">{item.name}</span>
                    <span className="font-mono text-xs text-(--text-muted)">{item.hex}</span>
                  </div>
                  <span className="text-xs text-(--text-secondary)">{item.role}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-(--text-muted)">
              {isEn ? "Sample Posts & UI States" : "Exemplos Práticos (Posts e Estados de UI)"}
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-(--radius) border border-(--rule-soft) p-4" style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}>
                <div className="font-mono text-[11px] font-semibold" style={{ color: SPECTRUM.cyan }}>COMUNICADO · PRISM CYAN</div>
                <div className="mt-1.5 font-bold">Cartograph v1.4</div>
                <p className="mt-1 text-xs" style={{ color: NEUTRAL.slate }}>Metabusca científica em 27 bases abertas.</p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4" style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}>
                <span className="inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold" style={{ background: SPECTRUM.olive, color: NEUTRAL.graphic }}>
                  FINALIZADO · CITRUS OLIVE
                </span>
                <div className="mt-1.5 font-bold">Prism Translate</div>
                <p className="mt-1 text-xs" style={{ color: NEUTRAL.slate }}>Substitui o verde genérico em entregas concluídas.</p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4" style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}>
                <span className="inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold" style={{ background: SPECTRUM.yellow, color: NEUTRAL.graphic }}>
                  EM CURSO · SOLAR YELLOW
                </span>
                <div className="mt-1.5 font-bold">Pokéwalker Companion</div>
                <p className="mt-1 text-xs" style={{ color: NEUTRAL.slate }}>Prévia beta e telemetria experimental.</p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4" style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}>
                <span className="inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold" style={{ background: SPECTRUM.orange, color: NEUTRAL.graphic }}>
                  RELEASE v2.4 · WARM ORANGE
                </span>
                <div className="mt-1.5 font-bold">Changelog &amp; Hardware</div>
                <p className="mt-1 text-xs" style={{ color: NEUTRAL.slate }}>Build nativo e marcos de versão.</p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4" style={{ background: NEUTRAL.tape, color: METAL.highlight }}>
                <div className="font-mono text-[11px] font-semibold" style={{ color: SPECTRUM.magenta }}>LANÇAMENTO · INTENSE MAGENTA</div>
                <div className="mt-1.5 font-bold">Novo Portal Prism</div>
                <p className="mt-1 text-xs" style={{ color: METAL.core }}>Post de impacto com monograma noturno.</p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4" style={{ background: NEUTRAL.tape, color: METAL.highlight }}>
                <div className="font-mono text-[11px]" style={{ color: METAL.transition }}>DARK ROOM · DR-001</div>
                <div className="mt-1.5 font-bold">LimboOS Archive</div>
                <p className="mt-1 text-xs" style={{ color: METAL.core }}>Atmosfera com espectro sombrio velado.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 4. Tipografia Aplicada & Mídia Física */}
      <section className="section pt-0" aria-labelledby="bm-type">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-type" className="title-main text-2xl font-bold">
              {isEn ? "Applied Typography & Physical Media" : "Tipografia Aplicada e Mídia Física"}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-(--radius) border border-(--rule-soft) p-5" style={{ background: NEUTRAL.marfim, color: NEUTRAL.graphic }}>
                <div className="text-xl font-extrabold uppercase tracking-[0.06em]">
                  PRISM TÍTULO 800
                </div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: NEUTRAL.slate }}>
                  Geist / Inter Regular 400: leitura corrida sobre Marfim Vintage com contraste editorial.
                </p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-5" style={{ background: NEUTRAL.tape, color: METAL.highlight }}>
                <div className="text-xl font-bold uppercase tracking-[-0.01em]">
                  DARK ROOM -0.01EM
                </div>
                <div className="mt-3 font-mono text-sm" style={{ color: SPECTRUM.cyan }}>
                  JetBrains Mono: DR-001 · {SPECTRUM.cyan} · {NEUTRAL.tape}
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-(--text-secondary)">
              <span className="rounded-(--radius) border border-(--rule-soft) px-3 py-1.5">
                Papelaria Prism: Algodão 350g–600g Marfim Vintage
              </span>
              <span className="rounded-(--radius) border border-(--rule-soft) px-3 py-1.5">
                Big Box VHS Dark Room: 190 × 105 × 30 mm (Preto Magnético)
              </span>
              <span className="rounded-(--radius) border border-(--rule-soft) px-3 py-1.5">
                Selo de Projeto Finalizado: Citrus Olive ({SPECTRUM.olive})
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* 5. Comunicação Externa e Interna */}
      <section className="section pt-0" aria-labelledby="bm-comms">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-comms" className="title-main text-2xl font-bold">
              {isEn ? "External & Internal Communication" : "Comunicação Externa e Interna"}
            </h2>
            <p className="mt-3 text-sm text-(--text-secondary)">
              {isEn
                ? "Color roles extend beyond the website to social media, press kits, B2B client proposals, and internal team workflows."
                : "Os papéis cromáticos estendem-se para além do site: redes sociais, campanhas, relacionamento com clientes B2B e operação interna da equipe."}
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-(--radius) border border-(--rule-soft) p-5">
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-(--text-muted)">
                  {isEn ? "External · Social & Campaigns" : "Externa · Redes Sociais e Campanhas"}
                </div>
                <ul className="mt-3 space-y-2 text-xs text-(--text-secondary)">
                  <li><strong>Prism Cyan:</strong> comunicados técnicos, links e dados em posts institucionais.</li>
                  <li><strong>Intense Magenta:</strong> lançamentos, capas de vídeo e CTAs de alto impacto.</li>
                  <li><strong>Warm Orange:</strong> changelogs, tags de versão e bastidores de hardware.</li>
                  <li><strong>Citrus Olive:</strong> projetos finalizados, entregas e selos de maturidade.</li>
                  <li><strong>Solar Yellow:</strong> teasers, prévias beta e avisos rápidos de agenda.</li>
                  <li><strong>Espectro Dark Room:</strong> trailers, Discord e comunidade de jogos.</li>
                </ul>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-5">
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-(--text-muted)">
                  {isEn ? "Internal · Clients & Team" : "Interna · Clientes e Equipe"}
                </div>
                <ul className="mt-3 space-y-2 text-xs text-(--text-secondary)">
                  <li><strong>Contratos e Propostas B2B:</strong> monocromia sobre Marfim com acento mínimo em Prism Cyan (sem Magenta).</li>
                  <li><strong>Fluxo de Sprint / Docs:</strong> Prism Cyan (ativo) e Citrus Olive (homologado).</li>
                  <li><strong>Pendências e Releases:</strong> Solar Yellow (revisão) e Warm Orange (deploy/build).</li>
                  <li><strong>Decisões Críticas e Incidentes:</strong> Intense Magenta (diretoria) e Signal Crimson (falha severa).</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 6. Módulo Dark Room — Aplicativos e Produtos */}
      <section className="section pt-0" aria-labelledby="bm-dr-apps">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-dr-apps" className="title-main text-2xl font-bold">
              {isEn ? "Dark Room Module & Applications" : "Módulo Dark Room — Aplicativos e Produtos"}
            </h2>
            <p className="mt-3 text-sm text-(--text-secondary)">
              {isEn
                ? "Public Dark Room releases use the monochrome mark on Magnetic Black without the Prism beam; B2B agreements add the Prism endorsement."
                : "Os aplicativos e jogos da Dark Room operam em monomarca monocromática sem feixe espectral; apenas contratos B2B recebem a chancela Prism."}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-(--radius) border border-(--rule-soft) p-4">
                <div className="flex items-center justify-between font-mono text-xs text-(--text-muted)">
                  <span>DR-001</span>
                  <span className="led led-olive" aria-hidden="true" />
                </div>
                <div className="mt-1 font-semibold text-(--text-primary)">LimboOS</div>
                <p className="mt-1 text-xs text-(--text-secondary)">
                  Sistema diegético em terminal e carro-chefe da divisão Dark Room.
                </p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4">
                <div className="flex items-center justify-between font-mono text-xs text-(--text-muted)">
                  <span>DR-002</span>
                  <span className="led led-olive" aria-hidden="true" />
                </div>
                <div className="mt-1 font-semibold text-(--text-primary)">Route 1 Kit</div>
                <p className="mt-1 text-xs text-(--text-secondary)">
                  Ferramenta técnica e kit de desenvolvimento para romhacking clássico.
                </p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4">
                <div className="flex items-center justify-between font-mono text-xs text-(--text-muted)">
                  <span>DR-003</span>
                  <span className="led led-yellow" aria-hidden="true" />
                </div>
                <div className="mt-1 font-semibold text-(--text-primary)">Pokéwalker Companion</div>
                <p className="mt-1 text-xs text-(--text-secondary)">
                  Aplicativo utilitário para hardware portátil e telemetria dedicada.
                </p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4">
                <div className="flex items-center justify-between font-mono text-xs text-(--text-muted)">
                  <span>DR-004</span>
                  <span className="led led-olive" aria-hidden="true" />
                </div>
                <div className="mt-1 font-semibold text-(--text-primary)">VidelBOT</div>
                <p className="mt-1 text-xs text-(--text-secondary)">
                  Automação e interface conversacional para operação em comunidade.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/dark-room" className="btn btn-magenta">
                {isEn ? "Open Dark Room module" : "Abrir módulo Dark Room"}
              </Link>
              <Link href="/work" className="btn btn-ghost">
                {isEn ? "View Prism applications" : "Ver aplicativos Prism"}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
