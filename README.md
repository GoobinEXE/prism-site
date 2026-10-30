# Prism — Site Institucional

Site multi-página da **Prism** e da divisão **Dark Room**, com design system espectral, glass e transição temática entre os modos claro (vidro) e escuro (câmara escura).

## Páginas

| Rota | Conteúdo |
|------|----------|
| `/` | Visão geral, hero do prisma, pilares e portal Dark Room |
| `/solucoes` | Lumen, RPGYM, Prism Translate e web |
| `/dark-room` | Shadows and Sanctity, LimboOS, VidelBOT, Route 1 Kit, pokeheartgold |
| `/sobre` | Filosofia: refração e revelação |
| `/curriculo` | Currículo |
| `/contato` | Formulário (abre o cliente de e-mail) |

## Stack

- Next.js 16 (App Router) + TypeScript — export estático (`output: "export"`)
- Tailwind CSS v4 + tokens CSS
- GSAP + ScrollTrigger
- Tipografia: Geist + JetBrains Mono

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build local

```bash
npm run build
```

O HTML estático sai em `out/`.

## Deploy (GitHub Pages)

Push na branch `main` dispara o workflow [Deploy to GitHub Pages](.github/workflows/deploy.yml):

1. `npm ci`
2. `npm run build` com `PAGES_BASE_PATH` (project site) e `NEXT_PUBLIC_SITE_URL`
3. Upload de `out/` + deploy via `actions/deploy-pages`

### Como disparar e acompanhar

- **Automático:** qualquer push em `main`.
- **Manual:** GitHub → Actions → *Deploy to GitHub Pages* → *Run workflow*.
- **Status:** Actions (lista de runs) ou Environments → `github-pages`.
- **URL:** após o primeiro deploy ok, aparece em Settings → Pages e no summary do job `deploy`.

### Setup manual (uma vez)

1. Settings → Pages → **Source:** GitHub Actions.
2. Se o site for project page (`username.github.io/prism-site`), o `basePath` vem do `configure-pages` — não inventar path à mão.
3. Domínio customizado (opcional): Settings → Pages → Custom domain + DNS (CNAME/ALIAS). Depois liberar *Enforce HTTPS*.
4. Contato no Pages abre `mailto:` — não há backend Resend neste host.

## Design tokens

Paleta: `#00AEEF` · `#ABBA2A` · `#F7E614` · `#F0793A` · `#DE0388`  
Prism: vidro · Dark Room: carvão `#0D0F14` / `#07080C`
