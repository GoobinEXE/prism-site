# Google Flow — Nano Banana prompts (Prism × Dark Room)

**Ferramenta:** [Google Flow](https://flow.google)  
**Modelos:** **Nano Banana 2.1** (rápido / exploração) e **Nano Banana Pro** (plate final de produção)  
**Direção visual (não alterar):** Prism = vidro translúcido / refração · Dark Room = grunge underground gamer (metal, grain, magenta `#DE0388` + amarelo CRT `#F7E614`).  
**Evitar:** purple neon genérico, cyberpunk city, anime, texto/logo na imagem.

Fluxo sugerido: rascunhos em **2.1** → plate final em **Pro** com a mesma descrição + 1–3 referências de estilo da plate escolhida.

---

## 1. Hero — atmosfera Prism

**Salvar como:** `public/assets/brand/hero-prism-atmosphere.jpg` (ou `.png` / `.webp`)  
**Modelo final:** Nano Banana Pro · aspect **16:9**

```text
Abstract optical laboratory atmosphere background, soft pale blue-gray frosted glass, translucent panels, subtle volumetric light beams, faint triangular prism silhouette refracting five thin spectral rays in cyan #00AEEF, olive #ABBA2A, yellow #F7E614, orange #F0793A, magenta #DE0388, clean high-end minimal, airy luminous daylight, soft caustics, no darkness, no text, no people, no logos, photoreal glass materials, shallow depth of field
```

---

## 2. Porta / portal — Dark Room gate

**Salvar como:** `public/assets/brand/door-chamber-gate.jpg`  
**Modelo final:** Nano Banana Pro · aspect **4:3**

```text
Front view of a heavy underground metal door slightly ajar in a dark charcoal chamber, scratched brushed steel panels, matte black frame, thin vertical yellow CRT light slit #F7E614 leaking from the open gap, subtle magenta #DE0388 ambient glow in the void behind the door, industrial grunge gamer lab aesthetic, film grain, clear metallic door handle on the door leaf, no text, no logos, no people, cinematic low-key lighting
```

---

## 3. Overlay — film grain (tile)

**Salvar como:** `public/assets/brand/overlays/grain-film.png`  
**Modelo:** Nano Banana 2.1 ou Pro · **1:1**

```text
Seamless tileable fine film grain texture plate, monochrome analog noise, high frequency, flat even lighting, no vignette, no color cast, no objects, suitable for multiply blend overlay
```

---

## 4. Overlay — scanlines CRT (tile)

**Salvar como:** `public/assets/brand/overlays/scanlines.png`  
**Modelo:** Nano Banana 2.1 · **1:1**

```text
Seamless horizontal CRT scanline overlay texture, thin dark horizontal lines, very subtle magenta tint, flat graphic, no perspective, no text, tileable for screen overlay
```

---

## 5. Accent — caustic prismático

**Salvar como:** `public/assets/brand/accents/prism-caustic.png`  
**Modelo:** Nano Banana Pro · **1:1**

```text
Isolated prismatic light caustic splash on pure black background, soft spectral refraction streaks cyan olive yellow orange magenta, optical glass caustics only, no solid objects, no text, high contrast for screen blend mode
```

---

## 6. Accent — spectrum ribbon

**Salvar como:** `public/assets/brand/accents/spectrum-ribbon.png`  
**Modelo:** Nano Banana 2.1 ou Pro · **16:9**

```text
Thin horizontal spectral light ribbon on dark background, smooth gradient from cyan to olive to yellow to orange to magenta, glowing fiber-optic edge, minimal, no text, no logos
```

---

## Style lock (anexar ao final de cada prompt)

```text
Prism optical glass brand world versus Dark Room grunge underground lab, no purple neon, no cyberpunk cityscape, no watermark
```

## Checklist no Flow

1. Gerar 3–4 variações em Nano Banana **2.1**.
2. Escolher a plate → regenerar/refinar em **Pro**.
3. Download → renomear exatamente como na coluna “Salvar como”.
4. Colar em `public/assets/brand/…` (overwrite).
5. Hard refresh no site.
