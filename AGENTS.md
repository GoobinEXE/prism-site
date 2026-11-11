<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS — SITE PORTIFOLIO (Prism × Dark Room)

Portfólio do Marcelo. Marcas de superfície: **Prism** (vidro / engenharia) e **Dark Room** (labs / grunge). Página pessoal com currículo em `/behind-prism` (`/curriculo` redireciona; PDF e HTML em `public/cv/`). Site publicado em inglês.

Este repo é o dono de Prism e Dark Room. O projeto **keen-hawking** só carrega regras de letra tipográfica; não editar Dark Room lá.

Package name: `prism-site`.

---

## Stack

| Peça | Versão / nota |
|------|----------------|
| Next.js | 16.4.2 · App Router |
| React | 19.3.0 |
| Tailwind | v4 (`@tailwindcss/turbopack`) |
| GSAP | ^3.15 · ScrollTrigger |
| TypeScript | ^5 |

Tipografia no código: Geist (display/body) + JetBrains Mono. Tokens em `src/app/globals.css`. Títulos principais (`.section-title`, `.title-main`) em caixa-alta com `--title-tracking` (+0,04em no Prism, −0,01em na Dark Room); rótulos, tags e códigos em JetBrains Mono 11px, 0,08em, caixa-alta (`.label-caps`, `.tag`, `.catalog-code`). Corpo com entrelinha 1,5. Docs Next desta versão: `node_modules/next/dist/docs/`.

Scripts: `npm run dev` · `npm run build` · `npm start` · `npm run lint`.

---

## Árvore útil

```
src/app/           rotas App Router + globals.css
src/components/    UI, portal, chamber, hero, logos
src/lib/           chamber, motion, brandAssets, navigation
docs/              motion-stack.md, nano-banana-prompts.md
public/assets/brand/   plates Nano Banana (ver README da pasta)
```

Componentes centrais: `ChamberProvider`, `ChamberLink`, `ThemeSync`, `DarkRoomPortal`, `HeroPrism`, `PageTransition`, `Header`, `Footer`, `ContactForm`, `ContactFab`.

---

## Rotas (shipped)

| Rota | Papel |
|------|--------|
| `/` | Home: HeroPrism, pilares, DarkRoomPortal, contato rápido |
| `/work` | Produtos Prism (Lumen, RPGYM, Translate, web) + Dark Room |
| `/dark-room` | Página dedicada Dark Room (título da aba: "Dark Room", sem sufixo Prism) |
| `/about` | Filosofia / sobre |
| `/behind-prism` | Quem está por trás do Prism: história do Marcelo + currículo nativo (`#cv`), PDF e versão para impressão |
| `/contact` | Formulário |
| `/curriculo`, `/solucoes`, `/sobre`, `/por-tras-do-prism`, `/contato` | Rotas legadas em pt-BR: `LegacyRedirect` (noindex) manda para a rota nova |

Site bilingue (`en` / `pt-BR`). Slugs canônicos em inglês; rotas pt-BR antigas redirecionam. Cópia em `src/lib/i18n/messages.ts`. Locale: `localStorage` `prism-locale`, senão `navigator.languages` (`pt*` → pt). Bootstrap `beforeInteractive` (`localeBootScript`) seta `lang` e `data-locale` antes do paint. Seletor EN/PT no header e no footer (`LocaleSwitcher`). Metadados estáticos em inglês; `document.title` e `html[lang]` acompanham o locale no cliente. Cópia segue o anti-chatbotese (`~/.cursor/skills/anti-chatbotese/SKILL.md`, WP:AISIGNS). Nav: Home/Início · Work/Trabalho · Dark Room · About/Sobre · Behind Prism/Por trás do Prism · Contact/Contato. 404 em `app/not-found.tsx`; `robots.ts` e `sitemap.ts` usam `NEXT_PUBLIC_SITE_URL` (`src/lib/site.ts`).

Links de projetos (GitHub, TestFlight): fonte única em `src/lib/projects.ts`, renderizados por `ProjectLinks`. Paths e dados do CV em `src/lib/cv.ts`, sempre via `withBase` (`src/lib/site.ts`), porque o Next não prefixa `basePath` em arquivos de `public/` no export do GitHub Pages. Fonte do PDF: `public/cv/marcelo-pessoa-cv.html` (en) e `public/cv/marcelo-pessoa-curriculo.html` (pt); ao editar, regenerar o PDF (Chrome headless `--headless=new --no-pdf-header-footer --print-to-pdf`) e a prévia (`qlmanage -t -s 1400` + `sips -s format jpeg`). `cvFor(locale)` em `src/lib/cv.ts`.

SEO e infra (`src/lib/seo.ts`): toda página usa `pageMeta({ title, description, path })`, que define canonical, Open Graph e Twitter; rotas legadas usam `legacyMeta` (noindex, canonical na rota nova) e `LegacyRedirect` emite `<meta http-equiv="refresh">` além do `router.replace`. Imagens de compartilhamento são route handlers estáticos em `src/app/og/prism.png` e `src/app/og/dark-room.png` (a convenção `opengraph-image` sai sem extensão no export e o GitHub Pages serve como octet-stream). JSON-LD em `src/lib/structuredData.ts` (Organization Prism + Dark Room, WebSite no layout; ProfilePage/Person em `/behind-prism`; ItemList do catálogo em `/dark-room`). GA4 (`src/components/Analytics.tsx`) e verificação do Search Console só entram quando as variáveis do repositório `NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` existem; eventos próprios: `generate_lead` (formulário) e `locale_change`; cliques externos e downloads ficam com a medição aprimorada do GA4. GitHub Pages não aceita cabeçalhos HTTP customizados, então a CSP vai em `<meta http-equiv>` (`src/lib/security.ts`, só em produção) e o referrer em `<meta name="referrer">`; `frame-ancestors`, HSTS e `X-Frame-Options` exigem um proxy na frente (Cloudflare) se um dia forem necessários.

Contato: formulário client-side (`ContactForm` + `src/lib/contact.ts`) valida e abre `mailto:` para `CONTACT_MAILTO`; não há server action nem Resend.

---

## Fases (`data-phase`)

Valores: `prism` | `dark-room` no `<html>`.

- `phaseFromPath` em `src/lib/chamber.ts`: path `/dark-room` → dark-room; resto → prism.
- Bootstrap da fase via `next/script` `beforeInteractive` no `layout.tsx` raiz (cobre `/dark-room`); não colocar `<script>` inline em layouts aninhados, o React acusa erro na navegação.
- `ThemeSync` sincroniza fase ao pathname; respeita overlay da câmara ativo.
- Na home, `DarkRoomPortal` troca fase pelo tempo da timeline do scrub (`T.phase`, quando a camada preta cobre a tela).
- Tokens CSS: bloco `[data-phase="prism"]` (Marfim chapado) vs `[data-phase="dark-room"]` (carvão / magenta / CRT). O site inteiro é chapado: sem degradê, blur, vidro, glow, ruído ou scanline (textura fica para depois, por decisão do autor). Sombra só dura e sem desfoque, só na Dark Room (`--hard-shadow: 4px 4px 0 #000`); cantos `--radius` 2–4px no Prism e 0 na Dark Room.

Travessia de fase entre rotas: `ChamberLink` + `ChamberProvider` + `playChamberTimeline` (`src/lib/chamberTimeline.ts`). Overlay de porta com carimbo ENTERING / ENTRANDO e LEAVING / SAINDO em `#8F9397` (~1.45s; reduced motion ~240ms). Nenhuma cor da fita aparece junto do logo Dark Room no overlay.

---

## Portal Dark Room (home)

A seção `#portal-dark-room` (`DarkRoomPortal`) é um stage pinado (GSAP ScrollTrigger, `scrub: 0.5`, ~1.8 viewports desktop / 1.6 mobile, em `SCROLL_VIEWPORTS`). A entrada é scroll. A transição usa **só** o logo Dark Room: nenhum asset Prism aparece no stage, e o header (monograma P) sai de cena enquanto o pin está ativo. Beats (constantes `T` e `SWING` no componente):

1. Luz apaga: camada Preto Fita Magnética entra sobre o fundo da página; a fase vira `dark-room` com a tela já preta
2. Revelação: o logo surge com a porta fechada
3. Porta gira de 0° a 180° (fechada → entreaberta canônica → aberta rente à parede); o vão é preto absoluto `#000`
4. Travessia: dolly pelo vão; o preto do vão vira Preto Fita Magnética no fim para casar com a seção seguinte
5. `Câmara de Maturação` / "Maturation Chamber": cards do lab; o logo do cabeçalho fecha a porta (entreaberta → fechada) conforme o scroll

Monomarca: o feixe espectral nunca aparece sobre o logo Dark Room (manual, seção 06). Reduced motion: sem pin, logo entreaberto estático.

Há também página `/dark-room` com o catálogo completo. Pillar “Dark Room” na home ancora em `/#portal-dark-room`.

---

## Design system

- Prism: Marfim Vintage `#F2ECE1` chapado, linguagem de etiqueta VHS: cards `vhs-label` com a fita de cinco cores no topo, cantos quase retos. Painéis `glass-spectrum` (`#EAE3D6`) e `glass-strong` (`#F6F2EB`) sem contorno (separação só por cor de fundo); texto `#0D0F13` / `#1F232B` / `#4A515E`. Badges e chips usam as tintas `--ink-*`, todas com AA sobre card + tinta (≥4,59:1).
- Dark Room: indie underground chapado. Preto Fita Magnética `#090A0C`, painéis `#141820` / `#1A1C1F` sem contorno, com sombra dura, cantos retos, títulos com régua `dr-rule`, catálogo em etiquetas de fita (`dr-entry`, faixa `#DADADA` com código e tipo em mono) e códigos `catalog-code` carimbados. Texto em escala metálica (`#F0F0F2`, `#DADADA`, `#8F9397`). LED do catálogo marca status pela seção 09: oliva = publicado (link público), amarelo = sem link público ainda. Cor viva da fita só como ponto focal (núcleo de LED, botão de ação, anel de foco, núcleo da safelight); halos, fundos, bordas e barras usam o espectro velado (`--veil-*`, Abyssal Cyan a Coagulated Magenta). Texto colorido usa `--ink-*` derivadas (fita 50% sobre `#DADADA`). Sem `text-shadow` colorido.
- Paleta canônica (manual, seção 09): `#01ABE8` · `#AEB932` · `#F4E412` · `#E97635` · `#DA0082`. Preto Fita Magnética `#090A0C`; Preto Gráfico `#0D0F13`. Fonte única em TS: `src/lib/brandTokens.ts` (`SPECTRUM`, `VEIL`, `NEUTRAL`, `METAL`); no CSS, as variáveis `--spectrum-*` em `globals.css`. Hex de cor fora desses dois arquivos só com motivo.
- Sem contorno em caixas, botões, tags, header e footer: só preenchimento chapado. Contorno só no anel de foco do teclado e no estado de erro dos campos.
- Texto: en e pt-BR, conversa com cliente final, tom casual e direto (referência: Apple). Evitar jargão técnico ("fronts", "cross-platform", "low-level") e os padrões de IA do WP:AISIGNS.
- Home: grid "What we do" (Mobile apps, Desktop software, Web apps, Dark Room) com rótulo neutro e a fita canônica (`SpectrumRule`) sob o título. Cor marca função (Seção 09: ciano link/primário, oliva status estável, amarelo aviso, laranja versão, magenta ação), nunca frente. DSP/áudio e projetos pessoais não entram no portfólio.
- Nome público da divisão: "Dark Room" (sem "Labs", sem chip STEALTH). Catálogo `DR-001` LimboOS (carro-chefe, link para terminalhubrpg.web.app), `DR-002` Route 1 Kit, `DR-003` Pokéwalker Companion (sem link público ainda), `DR-004` VidelBOT.
- Hero (`HeroPrism`): símbolo master vetorial (`PrismSymbol`), faixas sangrando à direita, feixe em `#8F9397`. Sem foto de atmosfera e sem parallax.

Não deslocar a direção visual (evitar purple neon genérico, cyberpunk de prateleira, cream+serif terracotta). Pipeline de imagem: ver abaixo.

### Tokens finais

Fonte de verdade dos valores aplicados. CSS em `src/app/globals.css` (blocos `:root, [data-phase="prism"]` e `[data-phase="dark-room"]`); TS em `src/lib/brandTokens.ts`. `npm run lint:brand` confere o espelho entre os dois para `--spectrum-*` e `--veil-*`. Valores marcados como derivados não estão no manual.

| Token | Prism | Dark Room |
|---|---|---|
| `--bg-base` | `#F2ECE1` Marfim Vintage | `#090A0C` Preto Fita Magnética |
| `--glass` (cards) | `#EAE3D6` derivado | `#141820` sólido (Cinza Carvão Fosco) |
| `--glass-elevated` | `#F6F2EB` (vergê, Mockup 04) | `#1A1C1F` sólido (Grafite Fumê) |
| `--text-primary` | `#0D0F13` Preto Gráfico | `#F0F0F2` Highlight metálico |
| `--text-secondary` | `#1F232B` Ardósia | `#DADADA` Aço satinado |
| `--text-muted` | `#4A515E` Cinza Chumbo Quente | `#8F9397` Cinza Chumbo de Transição |
| `--rule` / `--rule-soft` | `#4A515E` a 60% / 22% | `#8F9397` a 60% / `#2A2D34` |
| `--spectrum-*` | `#01ABE8` `#AEB932` `#F4E412` `#E97635` `#DA0082` | iguais, só em ponto focal |
| `--veil-*` | definidos, sem uso | `#083B52` `#3A3F0E` `#5C4E08` `#52240D` `#4A012B` |
| `--ink-*` (texto colorido) | `#005F85` `#545C10` `#6B5E00` `#963D0A` `#A3005F` derivados | `#6EC2E1` `#C4CA86` `#E7DF76` `#E2A888` `#DA6DAE` derivados |
| `--title-tracking` | `0.04em` | `-0.01em` |
| `--panel-filter` / `--led-glow` | `none` / `none` | `none` / `none` |
| `--hard-shadow` / `--radius` | `none` / 2px | `4px 4px 0 #000` / 0 |
| `--cta-primary` | ciano, texto `#0D0F13` | magenta, texto `#FFFFFF` |

Checklist de PR: `docs/brand-qa.md`.

---

## Motion

- `src/lib/motion.ts` — registro GSAP/ScrollTrigger, `prefersReducedMotion`, `EASE`
- `src/lib/chamberTimeline.ts` — overlay de troca de fase
- `DarkRoomPortal` — scrub da porta
- `PageTransition` — fade curto em troca de rota

Detalhe operacional: `docs/motion-stack.md`. Remotion / Motion Canvas não estão instalados.

---

## Brand assets

Vetores oficiais (manual de marca, `~/Downloads/prism-darkroom-brand-manual.pdf`):

- Símbolo master: `PrismSymbol` (`src/components/logos/`), arquivo `public/assets/brand/prism-symbol.svg`. Hero da home. Feixe incidente recolorido para `#8F9397` (no original é branco e some sobre fundo claro); prop `bleed` estende o feixe para fora do viewBox.
- Monograma P: `PrismMonogram` (`src/components/logos/`), arquivo `public/assets/brand/prism-monogram-p.svg`. Favicon em `src/app/icon.svg` (squircle Marfim `#F2ECE1`).
- Lockup horizontal: `PrismLockup` (P, filete vertical de 1px em `--rule` a 60%, wordmark PRISM em Geist 700 caixa-alta) no header e no footer. Glifo sempre `#0D0F13`; na fase Dark Room o P ganha placa Marfim com raio de 22%.
- Monograma P noturno: em peças gráficas e posts sobre fundo escuro (`#090A0C`), o glifo vai em Marfim `#F2ECE1` direto sobre o fundo, sem placa e nunca em branco puro; a fita de cinco cores permanece nos valores canônicos. Exemplo: `docs/posts/prism-comunicado-dark.png`. O lockup não leva nenhuma menção à Dark Room.
- Chancela: "Dark Room · Um Estúdio Prism" só como texto na linha legal do footer (rodapé de governança, manual §7.1).
- Zonas de respiro: `.brand-lockup` reserva a altura do P (`--prism-mark-h`) antes do próximo elemento; `.clear-dark-room` reserva a largura do D (0,223 × altura do logo) abaixo do logo.
- Imagens de compartilhamento: `src/app/og/prism.png/route.tsx` (símbolo master sobre Marfim) e `src/app/og/dark-room.png/route.tsx` (logo entreaberto sobre `#090A0C`), via `ImageResponse`.
- Dark Room: `DarkRoomLogo` (prop `door` 0 fechada · 0.5 entreaberta canônica · 1 aberta 180°), arquivo `public/assets/brand/dark-room-logo.svg`. Só sobre fundo escuro. Geometria da porta em `src/lib/darkRoomDoor.ts`: projeção em perspectiva ajustada para cair exatamente nos três estados de `originals/dark-room-logo-states.svg`; `doorFromAngle(graus)` converte ângulo físico em `door`.
- Cores da fita: valores canônicos do manual (seção 09) em todos os vetores: `#01ABE8` · `#AEB932` · `#F4E412` · `#E97635` · `#DA0082`.

Paths canônicos de imagem: `src/lib/brandAssets.ts` + `url()` no CSS.

```
public/assets/brand/
  prism-symbol.svg              ← shipped (símbolo master, hero)
  prism-monogram-p.svg          ← shipped
  dark-room-logo.svg            ← shipped (porta entreaberta)
  originals/                    (exports do autor: image.svg, prism-symbol.svg, prism-monogram-p.svg, dark-room-logo-states.svg)
  hero-prism-atmosphere.jpg     ← sem uso no código (og:image agora é gerada)
  door-chamber-gate.jpg         ← archive
  overlays/                     (grain, scanlines — prompts prontos)
  accents/                      (caustic, ribbon — prompts prontos)
```

Fluxo: Google Flow → Nano Banana 2.1 (rascunho) / Pro (plate) → sobrescrever o arquivo canônico. Prompts: `docs/nano-banana-prompts.md`. Não renomear paths sem atualizar `brandAssets` e CSS.

---

## Convenções para o agente

- Responder em **pt-BR**. Tom seco de pair programming.
- Sem comentários explicativos no código (`//`, blocos, docstrings não pedidas).
- Seguir padrão local (nomenclatura, glass/grunge, tokens).
- Antes de inventar API Next: ler `node_modules/next/dist/docs/`.
- Não quebrar o pipeline Nano Banana (nomes e paths canônicos).
- User Rules da conta Cursor (role/tone, frontend, git) valem; não há `.mdc` local neste repo. Só rastros em transcript/DB da sessão.
- Commit só se o usuário pedir.
- Antes de entregar mudança visual: `npm run lint:brand` e o checklist de `docs/brand-qa.md`.

---

## Cursor: voz vs ditado

- **Voice call** (`glass.realtimeVoice`): amarrada ao `agentId` da sessão; não migra entre agents. Só no Agents Window (Glass).
- **Dictation** (mic / Ctrl+M): funciona em qualquer agent com composer. IDE Editor = só dictation.

---

## Planejado vs shipped

| Item | Estado |
|------|--------|
| Home + pilares + portal scroll | shipped |
| `/work`, `/dark-room`, `/about`, `/contact` | shipped |
| Chamber overlay entre fases | shipped |
| Plates hero + porta | shipped |
| Vetores P + Dark Room (3 estados de porta) | shipped |
| Símbolo master Prism no hero | shipped |
| Plano de aplicação do manual | `docs/brand-application-plan.md` |
| Overlays/accents em disco | pastas + prompts; arquivos opcionais ainda vazios |
| Página pessoal + CV | shipped (`/behind-prism`) |
| Nav Filosofia → `/sobre` | corrigido |
| Site em inglês (cópia, slugs, metadados, CV) | shipped; rotas pt-BR redirecionam |
