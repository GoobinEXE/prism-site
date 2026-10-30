# SPEC — Autenticação (greenfield)

Status: proposta · 2026-10-29 · nenhum código escrito ainda.

## 1. Contexto

- O repo não tem nenhum código de auth: sem sessão, cookie, `proxy.ts`, rota `/api` ou banco de dados.
- O site é público, de dono único, e quase todo estático. `next.config.ts` já liga `cacheComponents: true` e `partialPrefetching: true`.
- O `ContactForm` envia no client (`onSubmit`), sem Server Action e sem backend.
- Referências desta versão: `node_modules/next/dist/docs/01-app/02-guides/authentication.md`, `authentication-with-cache-components.md`, `01-getting-started/16-proxy.md`, `03-api-reference/01-directives/use-cache-private.md`.

## 2. Objetivo e escopo

**Fase 1: área do dono.** Um único usuário (Marcelo) entra numa área privada `/painel`. Ela serve de base para o que vier depois: caixa de mensagens do contato, rascunho do CV e gestão de conteúdo.

**Fase 2 (opcional): CV com acesso por convite.** A rota `/cv` fica liberada por um link assinado com expiração, enviado a recrutadores. Não há conta nem senha para o visitante.

Fora de escopo: cadastro público, OAuth/social login, MFA, RBAC com vários papéis e banco de usuários.

### Invariantes

1. **O site público não lê sessão.** `layout.tsx` raiz, `Header`, `Footer`, `ContactFab`, `ThemeSync` e `ChamberProvider` continuam sem saber de auth, o que preserva o static shell do Cache Components.
2. Toda leitura de sessão fica dentro de `/painel` (e `/cv` na fase 2), atrás de `<Suspense>`.
3. A segurança real fica na DAL, perto do dado. O `proxy.ts` é só uma checagem otimista.
4. Fase e tema não mudam: `/painel` e `/entrar` caem em `prism` via `phaseFromPath`, sem câmara.

## 3. Decisões de arquitetura

| Tema | Decisão | Motivo |
|------|---------|--------|
| Sessão | Cookie selado stateless com `iron-session` (`sealData`/`unsealData`) | Sem banco. É o padrão que o guia de Cache Components usa. |
| Credencial | `OWNER_EMAIL` + `OWNER_PASSWORD_HASH` (argon2id) em env | Dono único dispensa tabela de usuários. |
| Hash | `@node-rs/argon2` (alternativa pura JS: `bcryptjs`) | argon2id é o padrão atual. Proxy e actions rodam em Node. |
| Validação | `zod` | O guia oficial usa. `FormState` tipado para o `useActionState`. |
| Login/logout | Server Actions + `useActionState` | Checagem de origem nativa (CSRF). Nenhum endpoint `/api` exposto. |
| Guarda de rota | `proxy.ts` otimista + `verifySession()` na DAL | Segue o guia: o proxy só pré-filtra. |
| Leitura do usuário | `"use cache: private"` no componente que lê a sessão | Pode chamar `cookies()` e permite prefetch sem cache no servidor. |
| Fronteira | `import "server-only"` em todo `src/lib/auth/*` | Impede vazar segredo para bundle client. |

### Cookie

```
nome      prism_session
httpOnly  true
secure    true (produção)
sameSite  lax
path      /
maxAge    7 dias, rolling (renova a cada request autenticado em /painel)
payload   { sub: "owner", iat, exp, v }   v = versão da sessão
```

`SESSION_VERSION` em env: incrementar invalida todas as sessões sem precisar de banco.

## 4. Mapa de arquivos

```
src/proxy.ts                         matcher /painel/:path*, /entrar; redirect otimista
src/lib/auth/session.ts              server-only; seal/unseal, createSession, refreshSession, destroySession
src/lib/auth/dal.ts                  server-only; verifySession = cache(...), requireOwner()
src/lib/auth/credentials.ts          server-only; verifyOwner(email, senha), argon2 verify
src/lib/auth/definitions.ts          LoginSchema (zod), LoginState
src/lib/auth/rateLimit.ts            limite por IP+email (ver §6)
src/app/actions/auth.ts              "use server"; login, logout
src/app/entrar/page.tsx              página de login, noindex
src/components/auth/LoginForm.tsx    "use client"; useActionState, estilo glass-spectrum
src/app/painel/layout.tsx            Suspense + requireOwner, noindex
src/app/painel/page.tsx              placeholder do painel
src/components/auth/OwnerBadge.tsx   "use cache: private"; mostra dono + botão sair
```

Alterações em arquivos existentes:

| Arquivo | Mudança |
|---------|---------|
| `src/app/robots.ts` | `disallow: ["/painel", "/entrar"]` |
| `src/lib/site.ts` | nada: `/painel` e `/entrar` ficam fora de `siteRoutes`/sitemap |
| `src/lib/navigation.ts` | nada: sem link público para o painel |
| `package.json` | + `iron-session`, `zod`, `@node-rs/argon2`, `server-only` |
| `.env.example` (novo) | `SESSION_PASSWORD`, `SESSION_VERSION`, `OWNER_EMAIL`, `OWNER_PASSWORD_HASH` |
| `scripts/hash-password.mjs` (novo) | gera o `OWNER_PASSWORD_HASH` localmente |

## 5. Fluxos

**Login**

1. `GET /entrar`: o proxy vê o cookie e, se já houver sessão, faz redirect para `/painel`. Isso é otimista e não valida o selo.
2. Submit do formulário chama a action `login(state, formData)`.
3. `LoginSchema.safeParse`. Se falhar, devolve `errors`.
4. `rateLimit.check(ip, email)`. Se bloquear, devolve uma mensagem genérica.
5. `verifyOwner` compara o email em tempo constante e roda `argon2.verify`. Se o email não bater, roda um verify falso para igualar o tempo.
6. Em caso de sucesso, `createSession()` e depois `redirect("/painel")`.
7. A mensagem de falha é sempre "Credenciais inválidas", sem dizer qual campo errou.

**Acesso a `/painel`**

1. Proxy: sem cookie, redirect para `/entrar?next=/painel...`. `next` só aceita path interno que começa com `/painel`.
2. `painel/layout.tsx` chama `requireOwner()` dentro de `<Suspense>`. `verifySession()` faz o `unsealData`, checa `exp` e `v`, e redireciona para `/entrar` se falhar.
3. `refreshSession()` estende o `maxAge`.

**Logout:** a action `logout()` chama `destroySession()` e depois `redirect("/")`. Só via `<form action>`, nunca por GET.

**Fase 2, `/cv?t=<token>`:** o token é um `sealData({ scope: "cv", exp }, { ttl })` gerado no painel. A página valida o token e então grava um cookie `prism_cv` com escopo `/cv`. Fica sem índice e sem cache compartilhado.

## 6. Segurança

- `SESSION_PASSWORD` com ≥ 32 caracteres. Nenhum segredo com prefixo `NEXT_PUBLIC_`. Se faltar env obrigatória, o boot falha com erro (`session.ts` valida no import).
- **Rate limit:** sem store compartilhado, um limite em memória vale só por instância e é fraco em serverless. Decisão pendente (§9).
- CSRF: Server Actions já checam `Origin` contra `Host`. Atrás de proxy reverso, configurar `serverActions.allowedOrigins`.
- `redirect` do `next` só para paths internos (whitelist de prefixo).
- Nada da sessão vai para Client Components além de um DTO mínimo (`{ owner: true }`).
- Metadata `robots: { index: false }` em `/entrar` e `/painel`.
- Headers: avaliar CSP depois (`02-guides/content-security-policy.md`). O inline script de `data-phase` vai exigir nonce ou hash.

## 7. Cache Components

- `painel/layout.tsx` não pode bloquear o shell. Leitura de sessão sempre dentro de `<Suspense>`, com fallback no estilo glass.
- `OwnerBadge` usa `"use cache: private"` com `cacheLife` curto. Dado derivado do usuário vai para `"use cache"` recebendo `userId` por argumento, com `cacheTag("owner")`.
- Se a validação de instant navigation reclamar durante a migração, usar `export const instant = false` só nas rotas do painel, de forma temporária.

## 8. Plano de entrega

1. Deps, `.env.example`, `scripts/hash-password.mjs`.
2. `src/lib/auth/*` (session, credentials, definitions, dal).
3. Actions `login`/`logout` e `/entrar` com `LoginForm`.
4. `/painel` com layout protegido e `OwnerBadge`.
5. `proxy.ts` e ajustes em `robots`/metadata.
6. Rate limit (depende da decisão em §9).
7. Fase 2: `/cv` com token de convite.

### Critérios de aceite

- `npm run build` sem erro e sem rota pública virando dinâmica (conferir o output de rotas: `/`, `/solucoes`, `/dark-room`, `/sobre`, `/contato` continuam estáticas/PPR).
- Sem cookie, `/painel` redireciona para `/entrar`. Cookie adulterado ou expirado também redireciona, mesmo passando pelo proxy.
- O cookie sai com `HttpOnly; Secure; SameSite=Lax`.
- Senha errada devolve mensagem genérica, com tempo de resposta equivalente ao de email errado.
- Logout apaga o cookie. Voltar com o botão "voltar" não reabre o painel.
- Trocar `SESSION_VERSION` derruba sessões ativas.
- `robots.txt` contém `Disallow: /painel` e `/entrar`, e o sitemap não lista nenhum dos dois.

## 9. Decisões em aberto

1. **Senha × magic link.** O magic link elimina senha e rate limit de credencial, mas exige provedor de email (Resend etc.). O mesmo provedor resolveria o `ContactForm`, que hoje não envia nada.
2. **Store para rate limit:** Upstash Redis / Vercel KV, ou limite em memória aceitando a fraqueza.
3. **Hosting:** Vercel ou Node próprio. Afeta `allowedOrigins`, a escolha do store e o argon2 nativo vs `bcryptjs`.
4. **Fase 2 entra agora ou fica para quando a rota de CV existir?**
5. Nome das rotas: `/painel` + `/entrar`, ou algo mais discreto.
