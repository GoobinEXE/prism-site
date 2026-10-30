# Plano de aplicação do manual de marca no site

**Fontes:** `prism-darkroom-brand-manual.pdf` (Edição Canônica 2026, 20 páginas) e `brand-manual.md` (Diretrizes Criativas). Onde os dois divergem, vale o PDF, conforme o próprio Markdown declara. As referências entre parênteses usam a numeração do PDF (Seção NN, Mockup NN) ou do Markdown (§N.N).

**Base auditada:** repositório `prism-site` em 2026-10-29, depois da rodada que colocou o símbolo master no hero e refez o portal Dark Room.

**Escopo:** o site (Next.js 16, rotas `/`, `/solucoes`, `/dark-room`, `/sobre`, `/curriculo`, `/contato`). Papelaria, embalagens VHS, cassetes e contratos (Seções 10 e 11, Mockups 01, 03, 04 e 05) ficam fora, exceto quando definem uma regra que também vale na tela.

---

## 1. O que já está aplicado

| Item | Onde | Regra do manual |
|---|---|---|
| Símbolo master (prisma em aramado) no hero, vetorial, com as cinco faixas sangrando à direita | `PrismSymbol`, `HeroPrism`, `public/assets/brand/prism-symbol.svg` | Seção 04; nível master acima de 120px (§3.5) |
| Feixe incidente do símbolo em `#8F9397` | `PRISM_BEAM` em `PrismSymbol.tsx` | Exceção pedida pelo autor: o branco da Seção 04 tem contraste de 1,1:1 sobre fundo claro |
| Hero sem foto de atmosfera e sem parallax com rotação das faixas | `HeroPrism.tsx`, `globals.css` | Vetos a textura raster (§6.2) e a rotação de marca (§3.7) |
| Monograma P no header, no footer e no favicon squircle Marfim | `PrismMonogram`, `src/app/icon.svg` | Seção 07; Mockup 02 |
| Valores canônicos da fita nos três vetores (`#01ABE8`, `#AEB932`, `#F4E412`, `#E97635`, `#DA0082`) | `PrismSymbol`, `PrismMonogram`, `icon.svg`, SVGs em `public/assets/brand/` | Seção 09 |
| Logo Dark Room só sobre Preto Fita Magnética, porta presa ao M, três estados do vetor oficial | `DarkRoomLogo`, `darkRoomDoor.ts` | Seções 05 e 08; Seção 13 (vetor oficial) |
| Transição de scroll da home usando só o logo Dark Room, sem feixe espectral e com o header (monograma P) fora de cena durante o pin | `DarkRoomPortal`, `html[data-portal-active]` | Seção 06 (veto ao feixe sem chancela); Mockup 05 (marcas não se fundem na mesma peça) |
| Safelight do vão em Coagulated Magenta com núcleo vivo | gradiente `dr-safelight` | §4.3 (espectro velado; LED vivo só no núcleo) |
| Termo "Câmara de Maturação" | seção interna do portal | Seção 03 (terminologia homologada) |

---

## 2. Divergências entre o site e o manual

A severidade segue um critério simples. **Alta** é violação direta de um veto do manual. **Média** é desvio de especificação (cor, tipografia, substrato) visível ao usuário. **Baixa** é inconsistência interna sem impacto imediato na leitura da marca.

| # | Área | Estado atual | Regra | Severidade |
|---|---|---|---|---|
| D1 | Overlay de rota | `.chamber-ribbon` desenha um gradiente com as cinco cores ao lado do logo Dark Room no retorno para Prism; o carimbo `.chamber-stamp` mostra "680nm" / "Prism" com `text-shadow` amarelo | Feixe espectral proibido junto ao logo Dark Room sem chancela (Seção 06); sem brilho artificial nas cores (§4.3) | Alta |
| D2 | Lockup do header | Monograma P + "PRISM" + rótulo "Dark Room Div." / "Dark Room · Online" (`Header.tsx`) | Marcas não se fundem no mesmo item (Mockup 05); lockup horizontal com divisória vertical de 1px a 60% (§3.4) | Alta |
| D3 | Substrato Prism | `--bg-base: #eef3f9`, corpo com gradientes radiais ciano, magenta e amarelo, vidro com `backdrop-filter` em cards, header e botões (`globals.css`, blocos `:root, [data-phase="prism"]` e `[data-phase="prism"] body`) | Marfim Vintage `#F2ECE1`, sem ornamentos e sem textura (Seções 01 e 09, §6.2) | Média |
| D4 | Paleta legada | `#00AEEF`, `#ABBA2A`, `#F7E614`, `#F0793A`, `#DE0388` em `globals.css` (23 hex + 50 `rgba`), `navigation.ts` (objeto `spectrum`), `dark-room/page.tsx`, `sobre/page.tsx`, `layout.tsx` | Tabela canônica da Seção 09 | Média |
| D5 | Substrato Dark Room | `--bg-base: #07080c` e `--footer-bg: #050608` | Preto Fita Magnética `#090A0C`; `#000000` só em terminal (Seções 05, 09 e 12) | Média |
| D6 | Cores na fase Dark Room | Tintas neon (`--ink-cyan: #7dd3fc`, `--ink-magenta: #f5409f`), borda de vidro magenta, `box-shadow` de LED em `currentColor` com halo vivo | Espectro velado (Abyssal Cyan `#083B52` a Coagulated Magenta `#4A012B`); cor viva só no núcleo do LED (§4.3) | Média |
| D7 | Monograma P na fase Dark Room | O glifo herda `currentColor` e fica claro sobre fundo escuro | Glifo `#0D0F13` sobre Marfim, legível nos temas claro e escuro (Seção 07, Mockup 02) | Média |
| D8 | Tipografia de títulos | Títulos Prism em caixa mista com `tracking-tight`; títulos Dark Room sem tratamento próprio | Prism: caixa-alta, tracking +0,04em a +0,08em, peso 700 a 800. Dark Room: caixa-alta compacta, −0,01em (§5.1) | Média |
| D9 | Imagem de compartilhamento | `og:image` é `hero-prism-atmosphere.jpg`, foto de prisma de vidro (`layout.tsx`); `themeColor` `#eef3f9` / `#07080c` | Prism estritamente vetorial 2D (Seção 12); substratos canônicos | Média |
| D10 | Nomenclatura | "Dark Room Labs" (nav, footer, `/dark-room`, `/sobre`, `/contato`), chip "STEALTH", rótulos "450nm…680nm", "Dark Room Div." | Monomarca pura "DARK ROOM" em superfícies públicas (§1.2, §3.4, Seção 02) | Média, depende de decisão (P1) |
| D11 | Catálogo Dark Room | Códigos `DR-01` a `DR-04`; LimboOS aparece em segundo; "Route 1 · pokeheartgold" | Código `DR-XXX` em JetBrains Mono `#8F9397` (Seção 11, Mockup 03); LimboOS é o carro-chefe (§1.2, §7); produto homologado "Route1 Kit" (Seção 02) | Baixa |
| D12 | Portfólio Prism | `/solucoes` lista Lumen, RPGYM, Prism Translate e plataformas web | A Seção 02 homologa Prism Translate e Lumen | Baixa, depende de decisão (P5) |
| D13 | Ícone Dark Room | Não existe; `/dark-room` usa o favicon Prism | Monograma "DR" em placa com raio 22% sobre `#090A0C`, micro-borda metálica (§3.5) | Baixa, bloqueada pelo vetor |
| D14 | Zonas de respiro | Nenhuma regra codificada | P: altura do P em volta. Dark Room: largura do D em volta (§3.6) | Baixa |
| D15 | Código e assets sem uso | `DispersionBench.tsx` (sem import, 11 hex legados), `dark-room-logo.work.svg`, `door-chamber-gate.jpg` | Fonte única de verdade (§6.7) | Baixa |

**Contraste medido (WCAG 2.1, razão sobre o substrato):** as cores canônicas da fita reprovam como texto sobre Marfim (amarelo 1,12; oliva 1,83; ciano 2,23; laranja 2,51; magenta 4,15). Preto Gráfico tem 16,31, Ardósia 13,39 e Cinza Chumbo Quente 6,79. Sobre Preto Fita Magnética, `#F0F0F2` tem 17,4, `#DADADA` 14,17 e `#8F9397` 6,4; as cores veladas da Dark Room ficam entre 1,25 e 1,66 e só servem para fundo e halo. Daí a regra de manter tintas escuras dedicadas para texto colorido (`--ink-*`) e usar a fita pura só em superfícies gráficas.

---

## 3. Conflitos dentro do próprio manual

Estes pontos precisam de uma decisão registrada antes da fase correspondente, porque o código vai cristalizar uma das leituras.

- **Folha da porta:** a Seção 05 descreve batente `#EAEAEA`, folha cinza chumbo (`#2A2D34` a `#43454A`) e abertura de 25°. O vetor oficial (`originals/dark-room-logo-states.svg`, citado na Seção 13 como "Vetor Oficial Dark Room") tem folha clara `#EDEEF1` e, na projeção ajustada em `darkRoomDoor.ts`, abertura de 50°. A recomendação é tratar o vetor como canônico para a web e registrar a versão metálica como variante de display, só se o autor fornecer o arquivo.
- **Acabamento metálico do wordmark:** o manual pede aço acetinado com gradiente `#F0F0F2` → `#DADADA` → `#8F9397` → `#1A1C1F`; o vetor é chapado. Um `linearGradient` em SVG resolve, mas muda a leitura do logo em tamanhos pequenos. Proposta: gradiente só acima de 120px de altura, chapado abaixo disso.
- **Feixe incidente branco:** §3.1 e Seção 04 pedem `#FFFFFF`. Sobre Marfim o branco some (1,1:1). O site usa `#8F9397` a pedido do autor; o manual precisa registrar essa exceção para superfícies claras.
- **Direção das faixas:** a Seção 04 descreve faixas que "dobram em ângulo reto para o solo"; o vetor do autor tem faixas horizontais saindo à direita. O site segue o vetor.
- **Valores das cores nos exports:** os SVGs do autor usam valores próximos aos canônicos (`#08a5dc`, `#03a7e1`, `#d90476`…). O site normalizou para a Seção 09; os exports em `originals/` seguem intactos.
- **Funções de cor:** a Seção 09 atribui função a cada cor (ciano para links e primário, oliva para status estável, amarelo para avisos, laranja para versões, magenta para ação). O site usa as cores como categoria (móvel, desktop, web, Dark Room). As duas leituras convivem mal: um badge magenta de "Dark Room" compete com o botão magenta de ação.
- **Marfim:** `#F2ECE1` é o substrato; `#F6F2EB` aparece só no papel vergê do Mockup 04. A web usa `#F2ECE1`.

---

## 4. Arquitetura de tokens alvo

Esta seção registra o alvo de planejamento; os valores aplicados ao fim das fases estão em `AGENTS.md`, seção "Tokens finais", que prevalece onde houver diferença. A migração mantém os nomes de variáveis que os componentes já consomem (`--bg-base`, `--text-primary`, `--spectrum-*`, `--ink-*`, `--cta-primary`) e troca os valores. Tokens marcados como **derivado** não estão no manual; foram calculados a partir de uma cor homologada e precisam de aprovação.

### 4.1 Fase Prism

| Token | Valor | Origem |
|---|---|---|
| `--bg-base`, `--surface` | `#F2ECE1` | Marfim Vintage (Seção 09) |
| `--surface-container` | `#EAE3D6` | derivado: Marfim com 8% a menos de luminância relativa, para painéis |
| `--text-primary` | `#0D0F13` | Preto Gráfico |
| `--text-secondary` | `#1F232B` | Ardósia Gráfico (corpo de texto) |
| `--text-muted` | `#4A515E` | Cinza Chumbo Quente (metadados, 6,79:1) |
| `--rule` | `rgba(74, 81, 94, 0.6)` | divisória do lockup horizontal (§3.4) |
| `--spectrum-cyan` … `--spectrum-magenta` | `#01ABE8`, `#AEB932`, `#F4E412`, `#E97635`, `#DA0082` | Seção 09 |
| `--ink-*` | ciano `#005F85`, oliva `#545C10`, amarelo `#6B5E00`, laranja `#963D0A`, magenta `#A3005F` | derivados; AA sobre card `#EAE3D6` + tinta de 10–12% (4,97 a 5,31:1) |
| `--cta-primary` | fundo `#01ABE8`, texto `#0D0F13` (7,3:1) | ciano = botão primário sobre claro (Seção 09) |

### 4.2 Fase Dark Room

| Token | Valor | Origem |
|---|---|---|
| `--bg-base`, `--surface` | `#090A0C` | Preto Fita Magnética |
| `--surface-container` | `#141820` | Cinza Carvão Fosco (§4.5) |
| `--text-primary` | `#F0F0F2` | Highlight metálico (§4.4) |
| `--text-secondary` | `#DADADA` | Aço satinado |
| `--text-muted` | `#8F9397` | Cinza Chumbo de Transição (6,4:1) |
| `--edge` | `#1A1C1F` | Grafite Fumê, bordas e base |
| `--veil-cyan` … `--veil-magenta` | `#083B52`, `#3A3F0E`, `#5C4E08`, `#52240D`, `#4A012B` | espectro velado (§4.3); só fundo e halo |
| `--led-*` | fita canônica no núcleo, halo na cor velada correspondente | §4.3, acentuação pontual |
| `--cta-primary` | fundo `#DA0082`, texto `#FFFFFF` (4,88:1) | magenta = ação (Seção 09) |

### 4.3 Fonte única em TypeScript

Hoje `navigation.ts` exporta um objeto `spectrum` com os valores legados, e `darkRoomDoor.ts`, `PrismSymbol.tsx` e `PrismMonogram.tsx` carregam hex próprios. A proposta é um módulo `src/lib/brandTokens.ts` com a fita canônica, o espectro velado e os neutros, importado pelos componentes e espelhado nas variáveis CSS. Um teste de lint (seção 7) impede hex fora desse módulo e do `globals.css`.

---

## 5. Fases de execução

Cada fase termina com `npx tsc --noEmit`, `npm run lint`, `npm run build` e uma rodada visual nas rotas afetadas em 1440×900 e 375×812.

### Fase 1: conformidade sem decisão pendente

**Status (2026-10-29):** concluída. Overlay sem faixa espectral e com carimbo `ENTRANDO` / `SAINDO` em `#8F9397`; cores em `src/lib/brandTokens.ts`; zero hex legado em `src/`; Dark Room em `#090A0C`; `DispersionBench.tsx` e `dark-room-logo.work.svg` removidos. `door-chamber-gate.jpg` ficou em `public/` até o autor dizer se há uso previsto. `tsc`, `lint` e `next build` passaram.

- **Overlay de rota (D1):** remover `.chamber-ribbon` do `ChamberProvider` e do CSS, tirar o `text-shadow` do carimbo e trocar o texto "680nm" / "Prism" por rótulos neutros em JetBrains Mono (por exemplo `ENTRANDO` / `SAINDO`), sem nenhuma cor da fita enquanto o logo Dark Room estiver na tela.
- **Paleta (D4):** substituir os hex e `rgba` legados pelos canônicos, consolidar em `brandTokens.ts` e apagar o objeto `spectrum` de `navigation.ts`.
- **Substrato Dark Room (D5):** `#07080c` e `#050608` passam a `#090A0C`, incluindo `themeColor` escuro em `layout.tsx`.
- **Limpeza (D15):** apagar `DispersionBench.tsx` e `dark-room-logo.work.svg`; mover `door-chamber-gate.jpg` para fora de `public/` se não houver uso previsto. Requer confirmação do autor, porque apaga arquivos.

**Aceite:** `grep -riE "00AEEF|ABBA2A|F7E614|F0793A|DE0388|07080c"` em `src/` retorna zero; o overlay de ida e de volta não mostra nenhuma das cinco cores.

### Fase 2: substrato Prism em Marfim

**Status (2026-10-29):** concluída com painéis chapados (P2). Fundo `#F2ECE1` sem gradientes; `glass-spectrum` em `#EAE3D6` e `glass-strong` em `#F6F2EB`, ambos com filete `--rule-soft`; header a 92% com filete inferior; botões sem halo; LEDs sem brilho no Prism. Blur, sombra e brilho viraram tokens por fase, então a Dark Room segue com vidro até a Fase 5. Classes sem uso removidas: `.glass`, `.glass-prism`, `.accent-bar`, `.spectrum-ribbon`, `.theme-veil`. Auditoria de contraste no browser (build de produção): 251 elementos de texto em seis rotas, zero abaixo de AA; para isso as tintas `--ink-*` ficaram mais escuras que a primeira proposta.

- **Tokens (D3):** aplicar a tabela 4.1 no bloco `:root, [data-phase="prism"]`.
- **Atmosfera:** remover os três gradientes radiais e o gradiente linear azulado de `[data-phase="prism"] body`; o fundo fica chapado em Marfim.
- **Vidro:** `.glass`, `.glass-strong`, `.glass-elevated` e `.glass-spectrum` deixam de usar `backdrop-filter` e borda em gradiente espectral. Painéis passam a `--surface-container` com filete de 1px em `--rule`, coerente com o minimalismo editorial da Seção 01. O header vira faixa Marfim a 92% com filete inferior.
- **Botões e badges:** remover os `box-shadow` com brilho (`.btn-primary` tem halo ciano); badges usam tinta escura sobre fundo da cor a 10%, com contraste medido.

**Aceite:** nenhuma regra com `backdrop-filter` ou gradiente radial colorido na fase Prism; todo texto com contraste AA medido sobre `#F2ECE1`.

### Fase 3: lockups, ícones e imagens de compartilhamento

**Status (2026-10-29):** concluída, exceto o ícone Dark Room (D13), que segue bloqueado pelo vetor do monograma DR. Header e footer usam `PrismLockup`; o rótulo "Dark Room Div." / "Dark Room · Online" saiu; na fase Dark Room o P fica numa placa Marfim. Footer com a chancela em texto. `/dark-room` abre com o logo, a zona de respiro de 0,223 × altura e a frase de perfil, que também virou a `description`. As duas `opengraph-image` geram PNG 1200×630 no build e substituem a foto; as meta `og:image` e `twitter:image` de `/` e `/dark-room` apontam para elas. Verificado no build de produção em 1440 e 375 px, sem scroll horizontal.

- **Header (D2, D7):** lockup horizontal com monograma P, divisória vertical de 1px em `--rule` e o wordmark "PRISM" em Geist 700, caixa-alta, tracking 0,06em. O rótulo "Dark Room Div." / "Dark Room · Online" sai. Na fase Dark Room, o P fica sobre uma placa squircle Marfim (mesmo desenho de `icon.svg`) para manter o glifo `#0D0F13`.
- **Footer:** lockup Prism e, na linha legal, a chancela "Dark Room · Um Estúdio Prism". O §7.1 admite o endosso em "rodapés de governança"; o logo Dark Room não entra no footer, só o texto.
- **Página `/dark-room`:** abrir com a monomarca pura e a frase de perfil homologada no §7.1 ("Dark Room é o estúdio autoral de jogos, sistemas diegéticos e softwares experimentais da Prism."), que também vira a `description` da rota.
- **Zonas de respiro (D14):** utilitários `.clear-prism-p` (padding igual à altura do P) e `.clear-dark-room` (padding igual à largura do D, cerca de 14% da largura útil do logo), aplicados no header, no hero de `/dark-room` e no overlay.
- **Imagens de compartilhamento (D9):** `src/app/opengraph-image.tsx` com o símbolo master sobre Marfim e `src/app/dark-room/opengraph-image.tsx` com o logo Dark Room sobre `#090A0C`, via `ImageResponse` de `next/og` (convenção em `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md`). `hero-prism-atmosphere.jpg` deixa de ser referenciada. `themeColor` claro passa a `#F2ECE1`.
- **Ícone Dark Room (D13):** `src/app/dark-room/icon.svg` com o monograma DR em placa de raio 22%, quando o autor entregar o vetor; a convenção `icon` aceita arquivo por segmento (`app-icons.md`, mesma pasta da doc acima).

**Aceite:** nenhuma tela mostra P e logo Dark Room no mesmo bloco visual; previews de link (validador do LinkedIn ou `curl` nas meta tags) apontam para as imagens novas.

### Fase 4: tipografia e identidade verbal

**Status (2026-10-29):** concluída com as recomendações de P1, P3 e P5. Títulos principais em caixa-alta com tracking por fase; corpo a 1,5; tags neutras em JetBrains Mono no lugar dos badges coloridos; bullets neutros no lugar dos LEDs nas páginas Prism. "Dark Room" substitui "Dark Room Labs" em nav, footer, `/dark-room` (o `h1` agora é o próprio logo e a aba mostra só "Dark Room"), `/sobre`, `/contato` e no portal; saíram o chip STEALTH, a pílula de LEDs "Calibrado" do header e os rótulos em nanômetros do formulário. A fita canônica (`SpectrumRule`) entrou sob "Quatro frentes" e no footer; `/sobre` mostra as cinco cores com a função de cada uma. Catálogo `DR-001` a `DR-004` com LimboOS primeiro e link para terminalhubrpg.web.app. Uma frase de `/solucoes` com contraste retórico foi reescrita. "Route 1 · pokeheartgold" manteve o nome até o autor confirmar "Route1 Kit". Contraste AA mantido (rotas Prism auditadas de novo no build de produção) e nenhuma rota rola na horizontal a 375px.

**P5, texto sugerido para o manual (§7, tabela de produtos):** `| **RPGYM** | Prism | Aplicativo iOS de acompanhamento de treinos com sistema de atributos inspirado em RPG. Aplica o Monograma "P" V1. |`. O site não edita o manual; a linha fica para o autor incorporar ao PDF e ao `brand-manual.md`.

- **Títulos (D8):** criar `.title-prism` (caixa-alta, 700 a 800, tracking 0,04em a 0,08em) e `.title-dark-room` (caixa-alta, −0,01em) e aplicar em `section-title`, no hero e nos `h1`/`h2` de cada rota conforme a fase. Corpo Prism com entrelinha 1,4 a 1,5.
- **Micro-rótulos:** `.label-caps` já segue a §5.2 (JetBrains Mono, 11px, 0,08em, caixa-alta); padronizar `chip` e `badge` com os mesmos valores.
- **Catálogo (D11):** códigos `DR-001` a `DR-004` em `#8F9397`; LimboOS primeiro, com link para `terminalhubrpg.web.app`; renomear para "Route1 Kit" se o autor confirmar.
- **Nomenclatura (D10):** aplicar a decisão P1 em nav, footer, títulos de rota, `metadata` e `sitemap`.
- **Vocabulário:** a busca pelas três listas vetadas da §2.2 (clichês corporativos, gatilhos populistas da indústria de jogos e vícios linguísticos) não acha nada hoje em `src/`; o script da Fase 6 mantém isso com uma cópia da lista da §2.2 em `scripts/lint-brand.mjs`, porque o manual fica fora do repositório.

### Fase 5: atmosfera Dark Room

**Status (2026-10-29):** concluída. Tokens da tabela 4.2 aplicados (superfícies `#090A0C` / `#141820` / `#1A1C1F` / `#2A2D34`, texto metálico, bordas e scrollbar em `#8F9397` translúcido). As `--ink-*` neon foram trocadas por tintas derivadas da fita misturada 50% com `#DADADA`, todas acima de 5,7:1 sobre `#141820`. LEDs com núcleo na cor da fita e halo na cor velada (`--veil-*`); barras dos cards de `/dark-room`, fundo da fase, véu e scanlines do overlay, halo do botão primário e hover de `.btn-tactical` passaram para Coagulated Magenta e Tarnished Amber. Classes sem uso removidas: `.section-kicker`, `.btn-obsidian`, `.grunge-stamp`, `.btn-tactical-magenta`. O bloco `.terminal` segue a Seção 12 (branco sobre `#000`). Leitura do critério de aceite: botões de ação, anel de foco e núcleos de LED e da safelight mantêm a cor viva, como o §4.3 admite para pontos focais. Auditoria AA no modo Dark Room (build de produção): 51 textos em `/dark-room` e 74 na home em fase escura, zero falhas. O PNG de grão (`overlays/grain-film.png`) continua pendente no pipeline Nano Banana; o ruído SVG inline do fundo cobre a textura até lá.

- **Cores (D6):** aplicar a tabela 4.2. Bordas de card em `#1A1C1F` ou `#8F9397` a baixa opacidade no lugar do magenta; `--ink-*` neon saem.
- **LEDs:** núcleo na cor canônica, halo na cor velada correspondente, sem `box-shadow` em `currentColor`.
- **Textura:** grão de película 35mm e scanlines sutis são homologados (§6.2). `.grunge-scanlines` a 4% está dentro da regra. O overlay de grão (`overlays/grain-film.png`) ainda não existe em disco; o prompt está em `docs/nano-banana-prompts.md`.
- **Brilho:** remover `text-shadow` luminoso e halos neon do carimbo do overlay e de títulos.

**Aceite:** nenhuma cor da fita canônica em área maior que um LED na fase Dark Room; nenhum `text-shadow` colorido.

### Fase 6: governança

**Status (2026-10-30):** concluída. `npm run lint:brand` (`scripts/lint-brand.mjs`) cobre cor legada, hex fora de `brandTokens.ts`, termos vetados da §2.2, nomes aposentados, marca Prism nas superfícies Dark Room, ordem espectral e espelho entre `globals.css` e `brandTokens.ts`; cada regra foi testada com um arquivo de prova que depois saiu do repositório. O checklist humano está em `docs/brand-qa.md`. A tabela de tokens aplicados ficou só no `AGENTS.md` (seção "Tokens finais"), e o README da pasta de marca e a seção 4 deste plano apontam para ela, para não haver duas fontes. O script roda à parte do `npm run lint`.

- **Checklist de PR:** `docs/brand-qa.md`, versão web do §8 e da Seção 13 (ordem espectral, substrato, tipografia, segregação de marca, feixe condicionado à chancela, SVG em toda marca na web).
- **Script `npm run lint:brand`:** falha se encontrar hex legados, termos vetados da §2.2 em `src/`, ou `PrismMonogram`/`PrismSymbol` importados em componentes da fase Dark Room (`DarkRoomPortal`, `/dark-room`).
- **Docs:** `AGENTS.md` e `public/assets/brand/README.md` ganham a tabela de tokens final.

---

## 6. Decisões pendentes

| # | Decisão | Opções | Recomendação |
|---|---|---|---|
| P1 | Nome público da divisão no site | manter "Dark Room Labs" · usar só "Dark Room" | **decidido:** "Dark Room" |
| P2 | Vidro na fase Prism | manter glass com blur · painéis chapados em Marfim | **decidido:** chapados |
| P3 | Cor como categoria das quatro frentes | manter cores por frente · usar cor por função (Seção 09) | **decidido:** cor por função; frentes identificadas por texto e pela fita completa |
| P4 | Acabamento metálico do logo Dark Room | chapado · gradiente acima de 120px | gradiente acima de 120px, se o autor aprovar uma prova |
| P5 | RPGYM no portfólio Prism | manter · atualizar o manual · remover do site | **decidido:** manter no site; linha para o manual sugerida na Fase 4 |
| P6 | Ângulo canônico da porta | 25° (texto da Seção 05) · ângulo do vetor | vetor, por ser o arquivo oficial da Seção 13 |
| P7 | Página de marca (`/marca`) com download dos SVGs | criar · não criar | criar só se houver demanda de imprensa ou parceiros; a §6.7 já define os arquivos canônicos |

---

## 7. Sequência e esforço

**Situação em 2026-10-30:** as seis fases estão concluídas. Seguem abertos o ícone Dark Room (D13, depende do vetor do monograma DR), o nome "Route1 Kit" (confirmação do autor), a linha de RPGYM no manual (P5), o PNG de grão no pipeline Nano Banana e as decisões P4, P6 e P7.

| Fase | Arquivos principais | Esforço | Depende de |
|---|---|---|---|
| 1. Conformidade | `ChamberProvider.tsx`, `globals.css`, `navigation.ts`, `layout.tsx`, páginas com hex | 0,5 dia | confirmação para apagar arquivos |
| 2. Marfim | `globals.css` (tokens, glass, botões, badges) | 1 dia | P2 |
| 3. Lockups e OG | `Header.tsx`, `Footer.tsx`, `dark-room/page.tsx`, `opengraph-image.tsx` (2), `icon.svg` DR | 1 dia | vetor DR para o ícone |
| 4. Tipografia e texto | `globals.css`, todas as rotas, `projects.ts`, `navigation.ts` | 1 dia | P1, P3, P5 |
| 5. Atmosfera Dark Room | `globals.css` (fase dark-room, LED, overlay), assets de grão | 0,5 dia | prompt Nano Banana de grão |
| 6. Governança | `docs/brand-qa.md`, `package.json`, script de lint | 0,5 dia | fases 1 a 5 |

A Fase 1 pode começar já. As Fases 2 e 4 mexem nos mesmos blocos do `globals.css` e devem rodar em sequência, não em paralelo.
