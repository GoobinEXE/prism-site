# Checklist de marca para PR

Versão web do §8 (QA Criativo) e da Seção 13 do manual (`prism-darkroom-brand-manual.pdf`, Edição Canônica 2026). Vale para todo PR que mexe em `src/`, `public/assets/brand/` ou `globals.css`. Valores de token: tabela em `AGENTS.md`, seção "Tokens finais".

## 1. Automático

Rodar antes de abrir o PR:

```bash
npm run lint && npm run lint:brand && npx tsc --noEmit && npm run build
```

`lint:brand` (`scripts/lint-brand.mjs`) reprova o PR quando encontra:

| Regra | O que pega |
|---|---|
| cor legada | hex e `rgba` da paleta anterior (`#00AEEF`, `#DE0388`, `#07080c`, `#eef3f9` e afins) |
| hex fora de brandTokens | cor literal em `.ts`/`.tsx` fora de `src/lib/brandTokens.ts` |
| termo vetado §2.2 | clichês corporativos, gatilhos populistas e vícios linguísticos da §2.2 do manual |
| nome aposentado | "Dark Room Labs", "stealth", rótulos em nanômetros |
| marca Prism na superfície Dark Room | `PrismMonogram`, `PrismSymbol`, `PrismLockup`, `SpectrumRule` ou `SPECTRUM_ORDER` em `DarkRoomPortal`, `ChamberProvider`, `chamberTimeline`, `DarkRoomLogo` ou `src/app/dark-room/` |
| ordem espectral | `SPECTRUM_ORDER` diferente de ciano → oliva → amarelo → laranja → magenta |
| espelho CSS ≠ brandTokens | `--spectrum-*` ou `--veil-*` do `globals.css` divergindo de `brandTokens.ts` |

## 2. Revisão humana

Itens que o script não enxerga. O revisor marca cada um ou explica a exceção no PR.

- [ ] **Substrato:** superfície Prism em Marfim `#F2ECE1`; superfície Dark Room em Preto Fita Magnética `#090A0C`. Nenhuma tela usa `#FFFFFF` como fundo Prism nem `#000000` fora de bloco de terminal.
- [ ] **Logo Dark Room:** aparece só sobre fundo escuro, com a porta presa ao M e sem rotação, distorção ou gradiente não homologado.
- [ ] **Feixe espectral:** a fita de cinco cores nunca encosta no logo Dark Room. A variante espectral só entra com a chancela "Dark Room · Um Estúdio Prism" ou "Dark Room · A Prism Studio", em material B2B.
- [ ] **Segregação:** P e logo Dark Room não dividem o mesmo bloco visual. A chancela aparece só como texto de governança (footer) ou em peça B2B.
- [ ] **Monograma P:** glifo `#0D0F13`, micro-fresta preservada, nunca abaixo de 16px; sobre fundo escuro, dentro da placa Marfim.
- [ ] **Símbolo master:** usado só acima de 120px; abaixo disso, o monograma P.
- [ ] **Zonas de respiro:** altura do P em volta do lockup Prism; largura do D (0,223 × altura do logo) em volta do logo Dark Room.
- [ ] **Cor por função:** ciano para link e ação primária no Prism, oliva para status estável, amarelo para aviso, laranja para versão e hardware, magenta para ação. Cor nunca identifica frente ou produto.
- [ ] **Dark Room velada:** cor viva da fita só em ponto focal (núcleo de LED, botão de ação, anel de foco). Halo, fundo, borda e barra usam `--veil-*`.
- [ ] **Tipografia:** títulos principais com `.section-title` ou `.title-main` (caixa-alta, tracking da fase); rótulos, tags e códigos em JetBrains Mono caixa-alta (`.label-caps`, `.tag`, `.catalog-code`); códigos de catálogo no padrão `DR-XXX`.
- [ ] **Contraste:** texto novo com razão ≥ 4,5:1 (≥ 3:1 acima de 24px ou 18,66px em negrito) sobre o substrato real, medido no build de produção.
- [ ] **Texto:** pt-BR técnico e direto, sem contraste retórico forçado nem promessa promocional. Terminologia homologada quando couber: Refração de Ideias, Câmara de Maturação, Soleira de Luz, Preto Fita Magnética, Marfim Vintage.
- [ ] **Assets:** marcas na web sempre em SVG vetorial; exports do autor intactos em `public/assets/brand/originals/`; caminho novo registrado em `src/lib/brandAssets.ts` e no README da pasta.
- [ ] **Movimento:** nada de rotação de marca, glitch pesado ou scanline que atrapalhe a leitura; `prefers-reduced-motion` respeitado.

## 3. Verificação visual

Para mudança visível, anexar ao PR capturas de 1440×900 e 375×812 das rotas afetadas, nos dois modos quando a rota troca de fase (home inteira, overlay de `/dark-room`). O dev server compartilhado na porta 3000 pode servir CSS antigo; a captura vale quando sai de `npm run build` + `next start -p 3100`.
