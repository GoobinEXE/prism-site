# Manual de Psicologia das Cores, Semiótica e Aplicação Estratégica — Prism & Dark Room

Documento complementar ao [brand-manual.md](./brand-manual.md) (Edição Canônica 2026). Define a fundamentação psicológica, a semiótica de branding e as regras de uso, restrição e expansão cromática para **Prism** (engenharia, software e B2B) e **Dark Room** (jogos autorais e estética diegética).

---

## 1. Fundamentação Científica Aplicada ao Sistema Cromático

A atribuição de significados neste manual apoia-se em dois modelos empíricos da psicologia das cores:

1. **Modelo Dimensional PAD (*Pleasure-Arousal-Dominance*, Valdez & Mehrabian, 1994):**
   Luminosidade ($B$) e saturação ($S$) predizem a resposta emocional com maior estabilidade do que o matiz isolado, segundo as equações de regressão $\text{Prazer} = 0{,}69B + 0{,}22S$, $\text{Excitação} = -0{,}31B + 0{,}60S$ e $\text{Dominância} = -0{,}76B + 0{,}32S$.
   - **Consequência para a Prism:** Substrato claro (**Marfim Vintage `#F2ECE1`**) combinado a faixas saturadas gera valência positiva, clareza cognitiva e baixa sensação de ameaça.
   - **Consequência para a Dark Room:** Substrato escuro (**Preto Magnético `#090A0C`**) combinado a tons dessaturados reduz a valência prazerosa e eleva a dominância ambiental, produzindo distanciamento emocional e hipervigilância.

2. **Teoria da Cor em Contexto (Elliot & Maier, 2007–2014):**
   O significado de um matiz consolida-se pela **consistência entre estímulo e contexto**. Substituir convenções genéricas (como o verde semáforo para "finalizado") exige que cada cor ocupe um papel semântico exclusivo em todas as superfícies da marca.

---

## 2. Matriz de Decisão por Contexto de Branding

Antes de escolher a cor de um componente, peça gráfica ou página, identifique o registro comunicacional:

| Contexto / Intenção | Cor Principal Recomendada | Apoio / Substrato | Racional Psicológico |
|---|---|---|---|
| **Sério, Jurídico, B2B e Contratos** | Monocromia (`#0D0F13` + `#1F232B`) | `#F2ECE1` (Marfim) + acento mínimo de **Prism Cyan** (`#01ABE8`) | Alta seriedade exige baixa excitação cromática. O excesso de cores reduz a percepção de rigor técnico. |
| **Tecnológico, Engenharia e Dados** | **Prism Cyan** (`#01ABE8`) | `#F2ECE1` + `JetBrains Mono` em `#4A515E` | Ciano une a confiança do azul à precisão digital, com menor rigidez corporativa. |
| **Projeto Finalizado / Consolidado / Estável** | **Citrus Olive** (`#AEB932`) | Tag/selo com texto `#0D0F13` ou indicador + texto `#1F232B` | Baixa excitação perceptual; remete a maturação, arquivo consolidado e permanência, substituindo o verde clichê. |
| **Em Andamento / Beta / Atenção Leve** | **Solar Yellow** (`#F4E412`) | Selo com texto `#0D0F13` | Maior luminância para o olho humano; captura atenção imediata para estados transitórios. |
| **Construção, Versões e Hardware** | **Warm Orange** (`#E97635`) | Acentos de build, datas e caixas de código | Energia tátil e urgência controlada sem acionar o reflexo de erro do vermelho puro. |
| **Decisão Crítica, Ruptura e CTA Principal** | **Intense Magenta** (`#DA0082`) | Botões de ação primária, transições e marcos de destaque | Cor extra-espectral (síntese neural de vermelho e azul); gera impacto máximo e diferenciação imediata. |
| **Erro Crítico / Falha Destrutiva** | **Signal Crimson** (`#B81D24`, adicional) | Alertas de sistema e ações irreversíveis | Preserva a semântica universal de falha sem contaminar `Warm Orange` ou `Intense Magenta`. |

---

## 3. Diretrizes Detalhadas — Polaridade Prism (`#F2ECE1`)

### 3.1 Prism Cyan (`#01ABE8` · Pantone 299 C)
- **Perfil PAD:** Alta clareza, excitação moderada-baixa, alta confiança cognitiva.
- **Quando usar:**
  - Links, estados de foco (`:focus-visible`), navegação ativa e acesso direto a projetos ou repositórios.
  - Visualizações de dados, telemetria nominal, diagramas arquiteturais e interfaces de ferramentas técnicas.
  - Como único acento colorido em documentos B2B, propostas e páginas institucionais sérias.
- **Quando NÃO usar:**
  - Como fundo de blocos extensos de texto (causa fadiga ocular em telas).
  - Como texto corrido pequeno sobre Marfim `#F2ECE1` (contraste `2,23:1`, reprova em WCAG AA). Use a tinta derivada `Deep Prism Cyan` (`#006B94`).
  - Para indicar erro, alerta ou estado estático sem ação.

### 3.2 Citrus Olive (`#AEB932` · Pantone 382 C)
- **Perfil PAD:** Baixa excitação, estabilidade orgânica, sensação de obra madura e concluída.
- **Quando usar:**
  - **Substituto oficial do verde genérico** para indicar *Projeto Finalizado*, *Em Produção*, *Versão Estável*, *Auditado* ou *Documentação Consolidada*.
  - Selos de autenticidade, badges de conformidade e indicadores de integridade técnica.
- **Quando NÃO usar:**
  - Em botões de ação principal (sua baixa excitação reduz a taxa de clique esperada para CTAs).
  - Como texto direto sobre Marfim (contraste `1,83:1`). Use como fundo de badge com texto `#0D0F13` ou como marcador visual acompanhado de texto em `#1F232B` / `Deep Olive Ink` (`#4B520E`).

### 3.3 Solar Yellow (`#F4E412` · Pantone 108 C)
- **Perfil PAD:** Luminância máxima, alta visibilidade periférica, caráter transitório.
- **Quando usar:**
  - Estados intermediários: *Em Desenvolvimento*, *Beta*, *Protótipo*, *Aguardando Revisão*.
  - Avisos não bloqueantes, divisores finos de seção e marcações de telemetria.
- **Quando NÃO usar:**
  - Em texto branco ou sobre Marfim (contraste `1,12:1`, ilegível). Exige texto `#0D0F13` quando usado como fundo de etiqueta, ou uso em `Deep Amber Ink` (`#705900`) para texto.
  - Em áreas grandes de fundo (provoca cansaço visual rápido e ansiedade perceptual).

### 3.4 Warm Orange (`#E97635` · Pantone 1585 C)
- **Perfil PAD:** Calor tátil, energia construtiva, urgência moderada sem alarme.
- **Quando usar:**
  - Tags de versão (`v2.4`), carimbos de data, marcos de *changelog* e referências a hardware/mídia física.
  - Ações secundárias de engajamento onde o ciano já ocupa o papel de navegação.
- **Quando NÃO usar:**
  - Para erros destrutivos ou falhas críticas (gera ambiguidade com tags de versão).
  - Em textos longos sobre Marfim (contraste `2,51:1`). Use `Deep Oxide Ink` (`#9E3F0C`) para texto.

### 3.5 Intense Magenta (`#DA0082` · Pantone Process Magenta C)
- **Perfil PAD:** Alta excitação, ruptura perceptual (cor não espectral), inovação e foco absoluto.
- **Quando usar:**
  - Chamadas para ação decisivas (*CTAs* de conversão ou início de fluxo principal).
  - Destaques pontuais de lançamento, transições entre Prism e Dark Room e selos especiais.
- **Quando NÃO usar:**
  - Em contratos jurídicos, currículos formais ou relatórios B2B de tom austero (quebra a sobriedade institucional).
  - Em múltiplos elementos simultâneos na mesma tela: se tudo é magenta, o ponto focal desaparece.
  - Como texto pequeno sobre Marfim (contraste `4,15:1`, abaixo do mínimo `4,5:1` para texto normal). Use `Deep Magenta Ink` (`#99005B`).

---

## 4. Diretrizes Detalhadas — Polaridade Dark Room (`#090A0C`)

### 4.1 Substrato: Rejeição ao Preto 100% (`#000000`) e Preto Magnético (`#090A0C`)
A Dark Room **proíbe o uso de preto 100% puro (`#000000`)** em fundos, cartazes e interfaces (com exceção estrita de emuladores de terminal). O preto absoluto cria um vácuo digital estéril. O substrato oficial é o **Preto Magnético (`#090A0C`, RGB `9, 10, 12`)**:
- **Piso de preto profundo calibrado:** Mantém densidade escura próxima ao preto absoluto sem o apagamento completo de pixels OLED, preservando o tom característico de fita magnética.
- **Separação de camadas:** Para painéis secundários e containers sobre `#090A0C`, utilize **`#141820`** (Cinza Carvão Fosco).

### 4.2 Espectro Sombrio sobre `#090A0C`
As cores da Dark Room operam em baixa reflectância e baixa saturação para manter a adaptação visual à penumbra. **Regra transversal:** nunca aplicar texto colorido desta paleta diretamente sobre `#090A0C` — o contraste medido fica entre `1,25:1` e `1,66:1`. Textos sobre `#090A0C` usam exclusivamente a escala metálica (`#F0F0F2`, `#DADADA`, `#8F9397`).

| Tom Dark Room | HEX | Psicologia & Atmosfera | Quando USAR | Quando NÃO USAR |
|---|---|---|---|---|
| **Abyssal Cyan** | `#083B52` | Frio clínico, isolamento estéril, submersão | Fundos de atmosfera, reflexos CRT desligados, estados dormentes | Iluminação principal de leitura; elementos interativos que exijam clique óbvio |
| **Corrosive Olive** | `#3A3F0E` | Estagnação, matéria oxidada, arquivo antigo | Ambientes de degradação, registros legados ou arquivados | Sinalização de "sucesso" ou "concluído" positivo (soa tóxico/corroído) |
| **Tarnished Amber** | `#5C4E08` | Vigilância, filamento fraco, tensão latente | Frestas de luz, estados de espera/alerta sutil, UI diegética de monitoramento | Blocos de texto corrido ou avisos que exijam leitura rápida |
| **Burnt Oxide Orange** | `#52240D` | Desgaste industrial, calor retido, ruína | Texturas metálicas, hardware sob carga, transições de dano | Botões amigáveis ou destaque de versão comercial |
| **Coagulated Magenta** | `#4A012B` | Luz inactínica de câmara escura, fratura psicológica | Halos de safelight, momentos de ruptura narrativa, bordas de limite crítico | Em excesso em telas de navegação padrão; com brilho neon artificial |

**Exceção de núcleo LED:** Em indicadores pontuais de gravação ou telemetria crítica na Dark Room, apenas o ponto central (2px–4px) pode receber o tom vivo da Prism, mantendo o halo externo ancorado no tom sombrio correspondente.

---

## 5. Cores Adicionais Recomendadas (Expansão Funcional)

A **Fita Espectral Canônica permanece fechada em 5 cores** (20% cada). As cores abaixo não integram a fita nem os logotipos; atuam como **camada funcional de interface** para garantir acessibilidade WCAG 2.1 AA e cobertura semântica completa.

### 5.1 Tintas de Contraste para Texto sobre Marfim (`--ink-*`)
Derivadas por redução controlada de luminância para atingir razão de contraste $\ge 4{,}5:1$ sobre `#F2ECE1`:

| Token Sugerido | HEX | Contraste sobre `#F2ECE1` | Vínculo com a Fita | Uso |
|---|---|---|---|---|
| `--ink-cyan` | `#006B94` | `5,8:1` | Prism Cyan | Texto de links, rótulos interativos e dados clicáveis |
| `--ink-olive` | `#4B520E` | `7,4:1` | Citrus Olive | Texto de status *Finalizado / Estável / Consolidado* |
| `--ink-amber` | `#705900` | `5,9:1` | Solar Yellow | Texto de avisos leves e notas de prévia/beta |
| `--ink-orange` | `#9E3F0C` | `5,3:1` | Warm Orange | Texto de tags de versão e metadados de hardware |
| `--ink-magenta` | `#99005B` | `6,8:1` | Intense Magenta | Texto de destaque crítico e links de ação forte |

### 5.2 Neutros de Superfície e Erro Crítico
| Nome | HEX | Polaridade | Papel |
|---|---|---|---|
| **Marfim Elevado** | `#EAE3D6` | Prism | Fundo de cards, painéis e gavetas sobre `#F2ECE1` sem recorrer a sombras pesadas |
| **Cinza Carvão Fosco** | `#141820` | Dark Room | Painéis secundários e containers sobre `#090A0C` |
| **Signal Crimson** | `#B81D24` (Prism) / `#5E1117` (Dark Room) | Ambas | Reservado exclusivamente para **erros críticos, falhas de validação e ações destrutivas**, evitando sobrecarga semântica sobre `Warm Orange` e `Intense Magenta` |

---

## 6. Regras Rápidas de Não Uso (Anti-Padrões)

1. **Não misturar verde genérico (`#22C55E` / `#10B981`)** com a paleta Prism: use **Citrus Olive (`#AEB932`)** em selos ou `--ink-olive` (`#4B520E`) em texto.
2. **Não usar cor viva da Prism para texto corrido sobre Marfim**: todas as 5 cores da fita reprovam em WCAG AA como texto normal sobre `#F2ECE1`.
3. **Não usar a fita de 5 cores como fundo de texto** nem inverter sua ordem fixa (`Cyan → Olive → Yellow → Orange → Magenta`).
4. **Não aplicar brilho neon (`box-shadow` saturado)** nas cores da Dark Room; preserve a estética analógica de baixa reflectância.
5. **Em páginas ou documentos de alta seriedade**, limite a saturação a **no máximo 1 cor focal** (preferencialmente `Prism Cyan`) sobre os neutros `#F2ECE1`, `#0D0F13` e `#1F232B`.
