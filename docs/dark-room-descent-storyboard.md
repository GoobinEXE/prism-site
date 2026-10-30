# Roteiro refinado — Dark Room Descent

Premissas: timeline única, `scrub: 0.9`, `ease: "none"`, duração relativa **1.0**, origin lockup **82% 50%**, `data-phase=dark-room` em progress ≥ **0.8** (`PHASE_AT`). Nós: `dark-room-logo.work.svg`.

Regra anti-sobreposição: `data-dr-bg` e `data-dr-sill` ficam `autoAlpha: 0` o tempo todo. Strokes e fills da porta nunca ficam visíveis juntos — handoff stroke → fill.

## R0 — Hold (0.00 → 0.10)

- Lockup scale 1; só wordmark (+ void da porta). Fills frame/leaf e knob em 0.
- Strokes ocultos (dashoffset = length + autoAlpha 0).
- Bloom 0.
- Aceite: chrome estável no pin.

## R1 — Aproximação (0.10 → 0.22)

- Lockup: scale 1 → 1.22, xPercent 0 → -3.
- Bloom: opacity 0 → 0.22 (só no vão da porta, left ~72%).
- Aceite: caminhada até a porta; phase ainda prism.

## R2 — Draw (0.22 → 0.52)

- 0.22: strokes autoAlpha 1.
- 0.22–0.34: `frame-stroke` dashoffset → 0.
- 0.34–0.44: `leaf-stroke` dashoffset → 0.
- 0.44–0.52: fills entram; strokes saem; knob entra; bloom → 0.
- Aceite: um traço limpo, sem contorno duplo.

## R3 — Abertura (0.54 → 0.62)

- Leaf: scaleX 1 → 1.08, x leve (origin left).
- Knob: scale 1 → 1.1 → 1.
- Aceite: vão claro; scrub reversível.

## R4 — Fade wordmark (0.62 → 0.70)

- Wordmark: autoAlpha 1 → 0, x 0 → -28.
- Phase ainda prism; troca em ≥ 0.8 (`PHASE_AT`).
- Aceite: sem fantasma de stroke/sill sobre o texto.

## R5 — Zoom → blackout (0.70 → 0.95)

- Lockup: scale 1.22 → 4.2 (0.70–0.80) → 12 (0.80–0.90); xPercent → -14.
- Veil autoAlpha 0 → 1 (0.80–0.90).
- Lockup autoAlpha → 0 (0.90–0.95).
- Aceite: entrada pelo vão; blackout limpo; sem retângulo preto do `data-dr-bg`.

## R6 — Handoff (0.95 → 1.0 + pós-pin)

- Cards inside: scrub `top 78%` → `top 35%`, stagger 0.1.
- Overlay rota: mesma origem 82%/50%, mesmo handoff stroke→fill, navigateAt ~0.55.
- Aceite: gate sumiu antes do lab; reduced-motion pula para lab.
