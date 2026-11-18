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
            {isEn ? "Canonical Edition 2026 · SSOT" : "Edição Canônica 2026 · SSOT"}
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
              {isEn ? "Open 21-page PDF" : "Abrir PDF (21 páginas)"}
            </a>
            <Link href="/about" className="btn btn-ghost">
              {isEn ? "Back to About" : "Voltar para Sobre"}
            </Link>
          </div>
        </div>
      </section>

      {/* 1. Arquitetura & Polaridades */}
      <section className="section pt-0" aria-labelledby="bm-arch">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-arch" className="title-main text-2xl font-bold">
              {isEn ? "1. Brand Architecture & Substrates" : "1. Arquitetura da Marca e Substratos"}
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

      {/* 2. Logotipos, Escalas de Ícone e Zonas de Proteção */}
      <section className="section pt-0" aria-labelledby="bm-logos">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-logos" className="title-main text-2xl font-bold">
              {isEn ? "2. Logos, Icon Scales & Clear Space" : "2. Logotipos, Tamanhos de Ícone e Zonas de Proteção"}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-start justify-between rounded-(--radius) border border-(--rule-soft) p-5" style={{ background: NEUTRAL.marfim }}>
                <PrismSymbol className="h-24 w-auto" />
                <div className="mt-4">
                  <div className="text-sm font-semibold" style={{ color: NEUTRAL.graphic }}>Master Prism (&gt; 120px)</div>
                  <div className="text-xs" style={{ color: NEUTRAL.lead }}>
                    {isEn ? "Clear space: 1X (prism base width)" : "Respiro mínimo: 1X (base do prisma)"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-between rounded-(--radius) border border-(--rule-soft) p-5" style={{ background: NEUTRAL.marfim }}>
                <div className="flex items-center gap-4">
                  <PrismMonogram className="h-12 w-12" />
                  <PrismLockup />
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold" style={{ color: NEUTRAL.graphic }}>Monograma P (16px – 119px)</div>
                  <div className="text-xs" style={{ color: NEUTRAL.lead }}>
                    {isEn ? "Favicons, macOS dock & header. Clear space: height of P" : "Favicons, dock macOS e header. Respiro: altura do P"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-between rounded-(--radius) border border-(--rule-soft) p-5" style={{ background: NEUTRAL.tape }}>
                <DarkRoomLogo className="h-16 w-auto" />
                <div className="mt-4">
                  <div className="text-sm font-semibold" style={{ color: METAL.highlight }}>Dark Room (DR 22% radius)</div>
                  <div className="text-xs" style={{ color: METAL.transition }}>
                    {isEn ? "Only on Magnetic Black. Clear space: width of D" : "Apenas sobre Preto Magnético. Respiro: largura do D"}
                  </div>
                </div>
              </div>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-(--text-secondary)">
              <li>
                <strong>Nível Master (&gt; 120px):</strong> Prisma isométrico em wireframe 3D com refração linear ou wordmark completo Dark Room.
              </li>
              <li>
                <strong>Nível Médio (48px – 119px):</strong> Monograma P Modernista isolado ou `DARK ROOM` sem subtítulo.
              </li>
              <li>
                <strong>Nível Micro / Ícone de Sistema (16px – 47px):</strong> Monograma P sobre Marfim Vintage (Prism) ou monograma DR chanfrado em placa `border-radius: 22%` sobre Preto Magnético (Dark Room).
              </li>
              <li>
                <strong>Regra de Ouro (Mockup 05):</strong> As marcas Prism e Dark Room nunca se fundem no mesmo símbolo; o endosso B2B usa divisória vertical de 1px a 60% de opacidade.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* 3. Sistema Cromático & Psicologia das Cores */}
      <section className="section pt-0" aria-labelledby="bm-colors">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-colors" className="title-main text-2xl font-bold">
              {isEn ? "3. Chromatic System & Color Psychology" : "3. Sistema Cromático e Psicologia das Cores"}
            </h2>
            <p className="mt-3 text-sm text-(--text-secondary)">
              {isEn
                ? "Fixed left-to-right order (20% width each). Saturation and lightness follow Valdez & Mehrabian (PAD) and Elliot & Maier (Color-in-Context), replacing generic traffic-light green with Citrus Olive for finished projects."
                : "Ordem fixa da esquerda para a direita (20% de largura cada). Saturação e luminosidade seguem o modelo PAD (Valdez & Mehrabian) e a Teoria da Cor em Contexto (Elliot & Maier), substituindo o verde genérico por Citrus Olive em projetos finalizados."}
            </p>
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

            <div className="mt-6 rounded-(--radius) border border-(--rule-soft) p-4 text-xs text-(--text-secondary)">
              <strong>{isEn ? "Serious / B2B & Accessibility:" : "Contexto Sério / B2B e Acessibilidade:"}</strong>{" "}
              {isEn
                ? "For contracts and formal pages, use monochrome neutrals with minimal Prism Cyan accents. Because bright spectrum colors fail WCAG AA text contrast on Marfim, use dedicated --ink-* tokens for body links/labels and reserve Intense Magenta for primary CTAs."
                : "Em contratos e páginas formais B2B, priorize monocromia com acento mínimo de Prism Cyan. Como os tons vivos da fita reprovam em contraste WCAG AA sobre Marfim, use os tokens --ink-* para textos e reserve Intense Magenta para CTAs decisivos."}
            </div>
          </article>
        </div>
      </section>

      {/* 4. Tipografia & Mídia Física */}
      <section className="section pt-0" aria-labelledby="bm-type">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-4xl p-6 md:p-10">
            <h2 id="bm-type" className="title-main text-2xl font-bold">
              {isEn ? "4. Typography & Physical Media" : "4. Tipografia e Mídia Física"}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-(--radius) border border-(--rule-soft) p-4">
                <div className="font-mono text-xs text-(--text-muted)">UI &amp; EDITORIAL</div>
                <div className="mt-1 text-lg font-bold tracking-wide text-(--text-primary)">Geist / Inter</div>
                <p className="mt-2 text-xs text-(--text-secondary)">
                  Prism: caixa-alta em títulos (+0.04em a +0.08em, peso 700–800). Dark Room: caixa-alta compacta (-0.01em).
                </p>
              </div>
              <div className="rounded-(--radius) border border-(--rule-soft) p-4">
                <div className="font-mono text-xs text-(--text-muted)">TELEMETRY &amp; CODES</div>
                <div className="mt-1 font-mono text-lg font-semibold text-(--text-primary)">JetBrains Mono</div>
                <p className="mt-2 text-xs text-(--text-secondary)">
                  Códigos `DR-XXX`, versões, coordenadas HEX, registros técnicos e especificações de engenharia.
                </p>
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
              {isEn ? "5. External & Internal Communication" : "5. Comunicação Externa e Interna"}
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
    </div>
  );
}
