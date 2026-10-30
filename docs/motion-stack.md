# Motion stack

| Tool | Uso |
|------|-----|
| GSAP core + ScrollTrigger | In-page: porta, chamber overlay, page fade |
| Remotion / Motion Canvas | Não instalado |

```bash
npm install gsap
```

- `src/lib/motion.ts` — `gsap`, `ScrollTrigger`, `prefersReducedMotion`
- `src/lib/chamberTimeline.ts` — overlay ENTERING / RETURNING
- `DarkRoomPortal` — scrub pinado, só com o logo Dark Room: luz apaga → logo revela (porta fechada) → porta gira 0° → 180° (`doorFromAngle` + `paintDoor`) → travessia pelo vão com safelight Coagulated Magenta. Header some enquanto o pin está ativo (`html[data-portal-active]`)
- Hero (`HeroPrism`) — sem JS: entrada em CSS (`prism-reveal`) do feixe e das 5 faixas do símbolo master
- `PageTransition` — fade na troca de rota

```ts
import { gsap, prefersReducedMotion } from "@/lib/motion";

if (!prefersReducedMotion()) {
  gsap.from(".el", { opacity: 0, y: 16, duration: 0.5 });
}
```
