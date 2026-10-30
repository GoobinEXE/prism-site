# Plano de execução — Dark Room Descent

## Objetivo

Entregar a descent Prism → Dark Room com visual de nível demo GreenSock: SVG do logo original, scroll com pin/scrub, desenho/abertura da porta, zoom no vão até blackout, handoff para labs e paridade no overlay de rota — sem trocar de stack de motion.

## Premissas

- Stack fixa: **GSAP 3.15 + ScrollTrigger** já em `src/lib/motion.ts`; pin + scrub em `src/components/DarkRoomPortal.tsx`; timeline de rota em `src/lib/chamberTimeline.ts` / `src/components/ChamberProvider.tsx`.
- Base gráfica: arquivo exato de Downloads `image.svg` (Recraft, viewBox `0 0 1344 768`, paths preenchidos + gradients chrome). Cópia imutável em `public/assets/brand/originals/image.svg`; geometria **não** reescrita do zero.
- Cópia de trabalho anotada: `public/assets/brand/dark-room-logo.work.svg` com `data-dr-*` (não editar `originals/`).
- Zoom de câmera no vão: `transformOrigin` ~**82% 50%** no lockup.
- Sync: `data-phase` → `dark-room` em progress ≥ 0.8 (`PHASE_AT` em `DarkRoomPortal.tsx`).
- Critério absoluto: aceite visual por cena antes de avançar.

### Estrutura observada do `image.svg` (mapeamento)

| Papel | Como aparece no SVG | `data-dr-*` |
|--------|---------------------|-------------|
| Fundo preto | primeiro `<path>` retangular full viewBox | `data-dr-bg` |
| Bloco porta | path com `gradient_0` | `data-dr-frame` |
| Folha aberta | path em perspectiva | `data-dr-leaf` |
| Maçaneta | dois círculos | `data-dr-knob` |
| Contorno moldura | paths `#3C3B3A` / outline | `data-dr-frame-edge` |
| Wordmark | paths `gradient_1`…`gradient_7` | `data-dr-wordmark` |
| Soleira (stroke auxiliar) | linha horizontal tipografia→vão | `data-dr-sill` |
| Strokes de draw | overlays fill=none | `data-dr-frame-stroke`, `data-dr-leaf-stroke` |

Nota: o original é majoritariamente **fill**. Draw usa strokes auxiliares; wordmark anima com opacity/transform.

## O que NÃO fazer

- Não trocar ScrollTrigger por Framer Motion / Motion.
- Não introduzir Locomotive Scroll, Vivus, AOS.
- Não depender de DrawSVG Club se couber `getTotalLength` + `strokeDashoffset`.
- Não usar MotionPath para “entrar na porta” (câmera = scale no lockup).
- Não reescrever o logo do zero; não editar `originals/image.svg`.
- Não avançar cena sem aceite visual.

## Ordem de execução global

1. Plano MD (`docs/dark-room-descent-plan.md`).
2. Cópia imutável `originals/image.svg`.
3. Mapa `data-dr-*` na cópia de trabalho.
4. Roteiro refinado com timings nos nós reais.
5. Build cena a cena com validação visual.
6. Alinhar `chamberTimeline`.

## Sequência de etapas (dono = modelo)

| # | Etapa | Dono | Aceite visual |
|---|--------|------|---------------|
| P0 | Plano MD | Composer | Premissas e “não fazer” explícitos |
| P1 | Cópia imutável | Composer | Diff zero vs Downloads |
| P2 | Mapa `data-dr-*` | Muse + GPT Codex | Nós endereçáveis; geometria = original |
| R0 | Hold | Muse | Logo legível, sem flash |
| R1 | Aproximação | Claude Opus | Aproximar da porta, não zoom genérico |
| R2 | Draw traços | GPT Codex + Opus + Muse | Traço contínuo scrub-reversível |
| R3 | Abertura folha + knob | Opus + Muse | Vão legível; ida/volta no scrub |
| R4 | Fade wordmark | Muse + Composer | Sem fantasma; phase estável |
| R5 | Zoom → blackout | Opus + Muse + Sonnet/Grok | Entrar pelo vão; ~60fps |
| R6 | Handoff + overlay | Opus + Codex + Sonnet | Mesma linguagem na rota; RM OK |

## Riscos

- Fill-heavy Recraft: draw via stroke auxiliar.
- Metadata C2PA no original: ok na cópia imutável.
- Pin + transform no `PageTransition`: manter `clearProps` e `pinType: "transform"`.
- Overlay vs descent: validar origins iguais.

## Referências no repo

- Original: `public/assets/brand/originals/image.svg`
- Trabalho: `public/assets/brand/dark-room-logo.work.svg`
- Roteiro: `docs/dark-room-descent-storyboard.md`
