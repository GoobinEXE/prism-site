# Brand assets

```
public/assets/brand/
  hero-prism-atmosphere.jpg ← sem uso no código
  door-chamber-gate.jpg
  prism-symbol.svg          ← símbolo master (prisma wireframe), feixe #8F9397
  prism-monogram-p.svg      ← monograma P oficial
  dark-room-logo.svg        ← lockup Dark Room, porta entreaberta
  originals/
    image.svg                    ← IMUTÁVEL (lockup antigo)
    prism-symbol.svg             ← IMUTÁVEL (export do autor, feixe branco)
    prism-monogram-p.svg         ← IMUTÁVEL (export 2026-10-23)
    dark-room-logo-states.svg    ← IMUTÁVEL (revisão 2026-10-29; 3 estados: entreaberta · fechada · aberta 180°)
  overlays/   (opcional)
  accents/    (opcional)
```

Valores de cor aplicados no site: `AGENTS.md`, seção "Tokens finais". Checklist de PR: `docs/brand-qa.md`.

**Não editar** `originals/image.svg`. Qualquer anotação ou stroke auxiliar vai no componente React.

| Arquivo | Onde pluga |
|---------|------------|
| `hero-prism-atmosphere.jpg` | nenhum; `og:image` vem de `src/app/opengraph-image.tsx` |
| `dark-room-logo.svg` (também) | `src/app/dark-room/opengraph-image.tsx` |
| `prism-symbol.svg` | `PrismSymbol`, hero da home |
| `door-chamber-gate.jpg` | referência fotográfica / archive |
| `originals/image.svg` | referência imutável do lockup Dark Room |
| `prism-monogram-p.svg` | `PrismMonogram`, header, footer, `app/icon.svg` |
| `dark-room-logo.svg` | `DarkRoomLogo` (porta animável via `src/lib/darkRoomDoor.ts`) |
