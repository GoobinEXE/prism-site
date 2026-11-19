# Rebrand do About e do Manual da Marca

Plano de execução para `/about` e `/brand-manual`, com a direção **A · Espectro** no About e o PDF do manual **gerado a partir da própria rota** do site. Nada deste plano está aplicado; a árvore está no commit `9787436`.

## 1. Diagnóstico

### 1.1 `/about`

A página tem título, dois cards de texto e um bloco "Brand Manual" que ocupa mais da metade da altura com listas de hex, papéis cromáticos e resumos técnicos. Esse bloco repete o que já existe em `/brand-manual`, o que viola a fonte única, e usa vocabulário de manual ("polaridades luminosas opostas", "Substrates") que contradiz o tom casual definido no `AGENTS.md`. Nenhum asset da marca aparece na página: o símbolo master, o monograma e o logo Dark Room ficam de fora justamente na página que apresenta a marca.

Os cards de substrato e as listas usam `border border-(--rule-soft)`, contra a regra "sem contorno em caixas, separação só por cor de fundo". A constante `DARK_ROOM_SPECTRUM` em `src/app/about/AboutView.tsx` e `SPECTRUM_ROLES` em `src/lib/brandTokens.ts` guardam os papéis das cores só em português, então o visitante em inglês lê "Isolamento estéril e estados dormentes".

### 1.2 `/brand-manual`

Cerca de 70% do texto está fixo em português mesmo com o locale `en` ativo: as listas de escala do logo, os rótulos "Fechada / Entreaberta / Aberta", a seção de tipografia, os chips de mídia física, toda a seção de comunicação e as descrições do catálogo. O site é publicado em inglês, então o manual em inglês sai misturado.

A página tem seis `article.glass-strong` idênticos em sequência, cerca de 4400 px de altura, sem índice e sem âncora navegável. Todos os cards internos, chips e linhas de tabela têm contorno. O título da seção 6 e o `<h1>` em pt usam travessão (`Manual da Marca — Prism & Dark Room`).

O conteúdo expõe operação interna que não cabe num portfólio público: fluxo de sprint, "diretoria" e "Signal Crimson", um vermelho que não existe em `brandTokens.ts` nem em `globals.css`. A seção de tipografia anuncia "Geist / Inter", mas o site carrega só Geist e JetBrains Mono (`src/app/layout.tsx`).

### 1.3 PDF

O arquivo `public/prism-darkroom-brand-manual.pdf` (8 páginas, A4 paisagem, 600 KB) sai de `~/Documents/antigravity/intelligent-hopper/brand-manual-print.html`, que fica fora do repositório. O PDF existe só em português, e suas 8 páginas não correspondem às 6 seções do site. Ele traz conteúdo que o site não tem (Pantone, tabela de produtos Prism, proibições normativas, checklist de QA) e o site traz conteúdo que ele não tem.

Os valores também já divergem. O PDF lista `--ink-cyan #006B94` e `--ink-olive #4B520E`, enquanto `globals.css` usa `#005F85` e `#545C10`. As porcentagens de contraste impressas no PDF foram calculadas para valores que o site não usa.

### 1.4 SEO

`/brand-manual` não está em `siteRoutes` (`src/lib/site.ts`), então fica fora do `sitemap.xml`. `meta.routes` em `src/lib/i18n/messages.ts` não tem entrada para `/brand-manual`, então `LocaleDocument` cai no título padrão ao trocar de idioma. Nenhuma das duas páginas tem JSON-LD próprio.

## 2. Decisões

**About, direção A · Espectro.** O símbolo master vira o hero, com as cinco faixas rotuladas como portas de entrada para o resto do site. O bloco de tokens sai do About e fica só no manual. A página passa a ter quatro blocos: hero espectral, princípios, os dois ambientes (Prism e Dark Room) e um teaser do manual com a capa real do PDF.

**PDF gerado do site.** `/brand-manual` ganha CSS de impressão A4 paisagem, onde cada seção ocupa exatamente uma página. Um script imprime a rota com Chrome headless nos dois idiomas e grava os PDFs, as capas e um JSON de metadados dentro do repositório. A seção N do site é a página N+1 do PDF (a página 1 é a capa), e o índice da página mostra esse número.

**Conteúdo do manual em arquivo próprio.** O texto bilíngue do manual sai do `.tsx` e vai para `src/lib/brandManual.ts`, tipado por `Record<Locale, ManualCopy>`. Hex e valores numéricos vêm sempre de `brandTokens.ts`; contrastes WCAG são calculados em tempo de build com `src/lib/contrast.ts` (já existe no repo), o que impede a divergência descrita em 1.3.

**Conteúdo interno sai.** Fluxo de sprint, "diretoria", incidentes e "Signal Crimson" saem do manual público. A linha de propostas B2B fica, porque é comunicação com cliente.

## 3. Arquitetura dos arquivos

| Arquivo | Mudança |
|---|---|
| `src/lib/brandTokens.ts` | Remove `SPECTRUM_ROLES` (papéis só em pt). Adiciona `INK.prism`, `INK.darkRoom` e `SURFACE` espelhando `globals.css`. |
| `scripts/lint-brand.mjs` | Passa a conferir o espelho `--ink-*` dos dois blocos de fase contra `INK`. |
| `src/lib/brandManual.ts` | Novo. Lista ordenada de seções (`id`, número, página do PDF) e cópia `en`/`pt` de cada uma, com Pantone e papéis cromáticos. |
| `src/lib/brandManualPdf.json` | Novo, gerado pelo script. Por locale: caminho do PDF, caminho da capa, número de páginas e bytes. |
| `src/lib/brandManualPdf.ts` | Novo. Lê o JSON, aplica `withBase` e formata "PDF · 9 páginas · 0,6 MB" por locale. |
| `src/lib/i18n/messages.ts` | Reescreve o bloco `about` (ver seção 4). Adiciona `/brand-manual` em `meta.routes` nos dois idiomas. |
| `src/lib/i18n/locale.ts` | `localeBootScript` aceita `?lang=en` ou `?lang=pt` antes de `localStorage` e grava a escolha. Serve ao script de PDF e a links compartilháveis por idioma. |
| `src/app/about/AboutView.tsx` | Reescrito na direção A. |
| `src/components/about/SpectrumBands.tsx` | Novo. Símbolo master com cinco links sobrepostos às faixas. |
| `src/app/brand-manual/BrandManualView.tsx` | Reescrito: capa, índice, oito seções, rodapé de página para impressão. |
| `src/components/brand-manual/*` | Novos: `ManualSection`, `ManualToc`, `ColorTable`, `InkTable`, `DoorStates`. |
| `src/app/globals.css` | Classes `.bm-*` para tela e bloco `@media print` com página nomeada. |
| `src/components/Footer.tsx` | Adiciona a classe `site-footer` para o CSS de impressão esconder o rodapé. |
| `src/lib/site.ts` | Adiciona `/brand-manual` a `siteRoutes`. |
| `src/lib/structuredData.ts` | Adiciona `aboutGraph` e `brandManualGraph`. |
| `scripts/build-brand-pdf.mjs` | Novo. Gera PDFs, capas e JSON. |
| `package.json` | Script `pdf:brand`. |
| `public/assets/brand/manual/` | Novo diretório com `prism-dark-room-brand-manual-{en,pt}.pdf` e `cover-{en,pt}.jpg`. |
| `public/prism-darkroom-brand-manual.pdf` | Removido (ver risco 8.4). |
| `AGENTS.md` | Documenta a rota, o script e a regra "editar o manual só em `brandManual.ts`". |

## 4. About · direção Espectro

### 4.1 Estrutura

O hero tem grade de duas colunas a partir de `lg`. À esquerda ficam o sobretítulo em `.label-caps`, o `<h1>` `section-title`, a `SpectrumRule` e o parágrafo de abertura. À direita fica `SpectrumBands`: o `PrismSymbol` com o feixe em `#8F9397` e cinco `<a>` posicionados sobre as faixas. O centro vertical de cada faixa, em porcentagem da altura do viewBox, é 38,4%, 44,4%, 50,4%, 56,4% e 62,4%, e cada link começa em 75% da largura. Abaixo de `md` a faixa fica pequena demais para rótulo legível (cerca de 12 px de altura), então os rótulos saem do símbolo e viram uma lista de cinco linhas, cada uma com o quadrado da cor correspondente.

| Faixa | Rótulo en | Rótulo pt | Destino | Cor do texto |
|---|---|---|---|---|
| Cyan | Mobile apps | Apps mobile | `/work#mobile` | `NEUTRAL.graphic` |
| Olive | Desktop software | Software para desktop | `/work#desktop` | `NEUTRAL.graphic` |
| Yellow | Web apps | Apps web | `/work#web` | `NEUTRAL.graphic` |
| Orange | Dark Room | Dark Room | `/dark-room` | `NEUTRAL.graphic` |
| Magenta | Start a project | Começar um projeto | `/contact` | branco |

A faixa magenta leva à ação de contato, o que segue o papel "ação decisiva" da seção 09. Os links usam `ChamberLink` quando o destino é `/dark-room`, para manter a travessia de fase. A animação `prism-reveal` do hero da home é reaproveitada, com o mesmo corte em `prefers-reduced-motion`.

Os princípios ficam numa grade de três `glass-spectrum vhs-label`, cada um com código `01`, `02`, `03` em `.catalog-code`, título `title-main` e uma frase.

Os dois ambientes ficam num bloco dividido ao meio. A metade Prism usa `glass-strong` com `PrismMonogram`, título, uma frase e o botão "See our work". A metade Dark Room usa fundo `NEUTRAL.tape`, texto em `METAL`, `DarkRoomLogo door={0.5}` dentro de `.clear-dark-room`, o parágrafo atual sobre a câmara escura e o botão `btn-magenta`. A Dark Room fica sem feixe espectral, conforme a regra de monomarca. No mobile as metades empilham.

O teaser do manual é um `glass-spectrum` com a capa gerada (`cover-{locale}.jpg`, 4:3 aproximado, `loading="lazy"`, `alt` descritivo) à esquerda, e à direita o título, a frase de apresentação, a linha de metadados vinda de `brandManualPdf.ts` e dois botões: "Read online" (`btn-primary`, `/brand-manual`) e "Download PDF" (`btn-ghost`, atributo `download`).

### 4.2 Cópia

| Chave | en | pt |
|---|---|---|
| `eyebrow` | Independent studio · Curitiba, Brazil | Estúdio independente · Curitiba |
| `title` | About Prism | Sobre a Prism |
| `lead` | A prism takes in one beam of light and sends out many colors. We work the same way: a problem and an idea go in, and the same mind comes out with several solutions. | (texto atual de `whyP1` em pt) |
| `principlesTitle` | How we work | Como a gente trabalha |
| `p1` | Same hands, start to finish. The person who designs it is the one who builds it and ships it, so nothing gets lost between handoffs. | Do rascunho ao lançamento, as mesmas mãos. Quem desenha é quem constrói e publica, então nada se perde no caminho. |
| `p2` | Less to learn. We keep taking things out until what's left feels obvious. If it needs a tutorial, it isn't done yet. | Menos para aprender. A gente tira coisa até o que sobra parecer óbvio. Se precisa de tutorial, ainda não está pronto. |
| `p3` | Each one has its own face. Lumen and Cartograph look nothing alike. What they share is the care that went into them. | Cada projeto com a sua cara. Lumen e Cartograph não se parecem em nada. O que eles têm em comum é o cuidado com que foram feitos. |
| `roomsTitle` | Two rooms, one studio | Dois ambientes, um estúdio |
| `prismBody` | Mobile apps, desktop software and web apps. Clear, bright and made for everyday use. | Apps mobile, softwares para desktop e apps web. Claros, iluminados e feitos para o uso de todo dia. |
| `darkBody` | (texto atual de `darkP`) | (texto atual de `darkP` em pt) |
| `manualTitle` | Brand manual | Manual da marca |
| `manualLead` | Logos, colors, type and the rules that keep Prism and Dark Room recognizable. Read it here or take the PDF with you. | Logos, cores, tipografia e as regras que deixam a Prism e a Dark Room reconhecíveis. Leia aqui ou leve o PDF. |
| `manualRead` | Read online | Ler online |
| `manualDownload` | Download PDF | Baixar PDF |

As chaves `manualSubstrates`, `manualPrismSubstrate`, `manualDarkSubstrate`, `manualSpectrumTitle`, `manualDarkSpectrumTitle`, `manualLogosTitle`, `manualLogosSummary`, `manualTypeTitle`, `manualTypeSummary`, `manualOpenSite`, `manualOpenPdf`, `why`, `whyP1` e `whyP2` saem do tipo `Messages`.

## 5. Manual web

### 5.1 Mapa de seções e páginas

| Página PDF | Âncora | en | pt | Conteúdo |
|---|---|---|---|---|
| 1 | `#cover` | Cover | Capa | Título, edição 2026, faixa dividida Marfim com `PrismSymbol` e Preto Fita Magnética com `DarkRoomLogo`. Na tela, os botões de download e a linha de metadados. |
| 2 | `#architecture` | Architecture | Arquitetura | Prism como estúdio-mãe e Dark Room como divisão; os dois substratos com nome, hex e uso; a regra de segregação e a chancela "Dark Room · Um Estúdio Prism". |
| 3 | `#prism-logo` | Prism logo | Logo Prism | Símbolo master (acima de 120 px, respiro 1X), monograma P (16 a 119 px, respiro igual à altura do P), lockup com filete de 1 px a 60%; nota do feixe `#8F9397`. |
| 4 | `#dark-room-logo` | Dark Room logo | Logo Dark Room | Os três estados da porta em fundo `NEUTRAL.tape`; respiro igual à largura do D; versão metálica; ícone DR em placa de 22%. |
| 5 | `#color` | Color system | Sistema cromático | Tabela do espectro Prism (nome, hex, Pantone, papel), tabela do espectro velado Dark Room, neutros Prism e escala metálica. |
| 6 | `#color-use` | Using color | Uso das cores | Tabela quando usar / quando evitar e tabela das tintas `--ink-*` com contraste calculado sobre o fundo de cada fase. |
| 7 | `#type` | Typography | Tipografia | Espécime Geist e JetBrains Mono com tracking real de cada fase; papelaria Prism, Big Box VHS e selo de projeto finalizado. |
| 8 | `#applications` | Applications | Aplicações | Produtos Prism a partir de `projects.ts`, catálogo Dark Room com LED (oliva com link público, amarelo sem), tabela de canais externos e propostas B2B. |
| 9 | `#integrity` | Integrity and QA | Integridade e QA | Proibições e checklist de aprovação. |

Pantone vem do PDF atual: Prism 299 C, 382 C, 108 C, 1585 C e Process Magenta; Dark Room 303 C, 574 C, 112 C, 1685 C e 229 C.

### 5.2 Layout de tela

A partir de `lg` a página usa grade `14rem / 1fr`. A coluna esquerda é `ManualToc`, um `<nav aria-label>` fixo com `position: sticky` abaixo do header, com o número, o título e "p. N" de cada seção. Um `IntersectionObserver` marca a seção visível com `aria-current="location"` e a cor `--ink-cyan`. No fim do índice ficam os dois downloads, um por idioma. Abaixo de `lg` o índice vira uma linha de chips com rolagem horizontal logo depois da capa.

Cada `ManualSection` tem cabeçalho com o código em `.catalog-code`, o título `title-main` e, à direita, o link "PDF · p. N" para `pdfUrl#page=N`, que abre o PDF na página certa nos visualizadores do Chrome, Firefox e Safari. O corpo usa `glass-strong` como painel e `--glass` (`#EAE3D6`) nos blocos internos. Tabelas separam linhas por fundo alternado, sem `border`. Painéis da Dark Room usam `NEUTRAL.tape` com `--hard-shadow`.

### 5.3 Texto do manual

Todo o texto fica em `src/lib/brandManual.ts`. A cópia segue o tom do site, sem jargão de manual corporativo. Exemplos que fixam o registro:

| Trecho | en | pt |
|---|---|---|
| Arquitetura | Prism is the parent studio: software, data and design. Dark Room is its division for games and experiments. They share the same five colors and sit on opposite sides of the light. | A Prism é o estúdio-mãe: software, dados e design. A Dark Room é a divisão de jogos e experimentos. As duas têm as mesmas cinco cores e ficam em lados opostos da luz. |
| Uso das cores | The bright spectrum colors fail contrast as text on ivory. For text, use the ink tokens and keep the bright ones for dots, bars and buttons. | As cores vivas da fita reprovam em contraste como texto sobre Marfim. Para texto, use as tintas `--ink-*` e guarde as vivas para pontos, barras e botões. |
| Proibição | Don't reverse, reorder or drop any of the five bands. | Não inverta, reordene nem omita nenhuma das cinco faixas. |

O rodapé de cada página impressa diz `PRISM / DARK ROOM · BRAND MANUAL · PAGE 05 / 09` em inglês e `PRISM / DARK ROOM · MANUAL DA MARCA · PÁGINA 05 / 09` em português.

## 6. Impressão e geração do PDF

### 6.1 CSS de impressão

O contêiner raiz recebe `.bm-root` com `page: manual`, e o `@page manual` define `size: A4 landscape; margin: 0`. A página nomeada limita o formato paisagem ao manual, então imprimir `/behind-prism` pelo navegador continua em retrato.

Dentro de `@media print`:

1. Header, `.site-footer`, `.contact-fab`, `.skip-link`, `.grain`, o índice e qualquer elemento `.bm-screen-only` recebem `display: none`.
2. `html` cai para `font-size: 10.5px`, o que reduz em proporção tudo que está em `rem`.
3. Cada `.bm-page` ocupa `297mm × 210mm`, com `padding: 12mm 14mm`, `break-after: page`, `overflow: hidden` e `print-color-adjust: exact` para manter fundos.
4. Painéis `.glass-*` perdem a imagem de grão e ficam só com a cor chapada; o `::before` da `vhs-label` continua, porque é a fita.
5. `max-width` dos contêineres internos é anulado para usar a largura da folha.
6. A capa e a página do logo Dark Room têm fundo `#090A0C` na metade escura; as demais páginas têm fundo Marfim.

### 6.2 Script `scripts/build-brand-pdf.mjs`

O comando `npm run pdf:brand` executa estes passos:

1. Roda `next build` com `PAGES_BASE_PATH=""`, para que o `out/` funcione na raiz. A flag `--skip-build` reaproveita um `out/` existente.
2. Sobe um servidor HTTP mínimo em Node sobre `out/`, numa porta livre, resolvendo `/brand-manual` para `brand-manual.html`.
3. Para cada locale, chama o Chrome (`CHROME_PATH` ou o caminho padrão do macOS) com `--headless=new --no-pdf-header-footer --virtual-time-budget=10000 --user-data-dir=<tmp> --print-to-pdf=<destino>` na URL `/brand-manual?lang=<locale>`. O perfil temporário garante que nenhum `localStorage` anterior interfira.
4. Gera a capa com `pdftoppm -f 1 -l 1 -r 72 -jpeg`, com `sips` como alternativa no macOS.
5. Conta páginas com `pdfinfo` e compara com o número de seções mais a capa. Se divergir, o script falha e mostra qual seção transbordou.
6. Grava `src/lib/brandManualPdf.json` e encerra o servidor.

Os PDFs e capas ficam versionados. O deploy no GitHub Actions continua igual e só publica o que está em `public/`; gerar o PDF no CI exigiria Chrome e poppler no runner, o que pode entrar depois.

## 7. SEO e dados estruturados

`/brand-manual` entra em `siteRoutes`, então aparece no sitemap. `meta.routes` ganha "Brand Manual · Prism" e "Manual da Marca · Prism". A descrição do `pageMeta` do manual muda para algo legível por pessoas: "How the Prism and Dark Room brands work: logos, colors, type and usage rules. Read online or download the PDF."

O `aboutGraph` usa `@type: AboutPage` com `mainEntity` apontando para a `Organization` Prism já declarada em `siteGraph`. O `brandManualGraph` usa `@type: CreativeWork` com `name`, `inLanguage: ["en", "pt-BR"]`, `publisher` igual à Organization e `encoding` com dois `MediaObject` (`encodingFormat: "application/pdf"`, `contentUrl` absoluto, `contentSize` vindo do JSON). Os dois entram via `JsonLd` nas respectivas páginas.

## 8. Riscos e limites

**8.1 Transbordo de página.** Se uma seção crescer além de 210 mm, o `overflow: hidden` corta o conteúdo em silêncio. A checagem de contagem de páginas do script não detecta esse corte. A mitigação é o script também abrir a rota com `emulateMedia print` e comparar `scrollHeight` de cada `.bm-page` com 210 mm, falhando quando passar.

**8.2 Hidratação e idioma.** A página é client component; o HTML estático sai em inglês e o português aparece após a hidratação. O `--virtual-time-budget` cobre isso, e o script confirma o idioma lendo o texto do PDF com `pdftotext` e procurando o título esperado.

**8.3 Fontes.** Geist e JetBrains Mono vêm de `next/font` e são servidas pelo próprio `out/`. Se o orçamento de tempo acabar antes do carregamento, o PDF sai com fonte de sistema. O mesmo `pdftotext` não detecta isso; a verificação é `pdffonts` listar Geist.

**8.4 Link antigo do PDF.** `/prism-darkroom-brand-manual.pdf` está no ar desde 18/11/2026. Removê-lo quebra links externos, se houver. A alternativa é manter o arquivo como cópia do PDF em português por um ciclo e removê-lo depois.

**8.5 Fonte externa obsoleta.** O `brand-manual-print.html` em `~/Documents/antigravity/intelligent-hopper/` deixa de ser a fonte. Ele fica onde está; o `AGENTS.md` passa a dizer que o manual se edita só em `src/lib/brandManual.ts`.

**8.6 Conteúdo removido.** Pantone, proibições e checklist migram para o site. Saem fluxo de sprint, diretoria, incidentes e Signal Crimson. Se algum desses itens for necessário para uso interno, ele pode ir para `docs/` sem passar pelo site público.

## 9. Ordem de execução

| Passo | Entrega | Verificação |
|---|---|---|
| 1 | Tokens `INK` e `SURFACE`, lint do espelho `--ink-*`, remoção de `SPECTRUM_ROLES` | `npm run lint:brand` |
| 2 | `brandManual.ts`, `brandManualPdf.ts`, JSON inicial | `tsc --noEmit` |
| 3 | `?lang=` no `localeBootScript` | Abrir `/about?lang=pt` com `localStorage` vazio |
| 4 | About reescrito | Preview em 1280 px e 375 px, nos dois idiomas |
| 5 | Manual reescrito com índice e seções | Preview, navegação pelo índice, link `#page=N` |
| 6 | CSS de impressão | Pré-visualização de impressão do Chrome, 9 páginas sem corte |
| 7 | Script de PDF, geração dos arquivos | `pdfinfo`, `pdffonts`, `pdftotext` e as miniaturas das 9 páginas |
| 8 | SEO, sitemap, JSON-LD, `meta.routes` | `out/sitemap.xml`, validação do JSON-LD no HTML gerado |
| 9 | Gate final | `npm run lint`, `npm run lint:brand`, `npm run build`, checklist de `docs/brand-qa.md`, `accesslint` nas duas rotas |
| 10 | `AGENTS.md` | Rota, script e regra de edição documentados |

## 10. Decisões em aberto

**Link antigo do PDF (8.4).** Recomendação: manter a cópia em português por um ciclo de deploy.

**Geração no CI.** Recomendação: deixar fora por agora e gerar localmente com `npm run pdf:brand`, já que o runner precisaria de poppler e de um Chrome fixado.

**Quinta faixa do hero.** A faixa magenta leva a `/contact`. A alternativa é apontar para `/behind-prism`, deixando o contato só com o FAB e o header.
