# Turma+ — Landing Page Premium

Landing page institucional de lançamento do aplicativo educacional **Turma+**.

As screenshots reais do app (Feriados, Feed, Estudo, Perfil) estão em
`public/screenshots/` e são usadas dentro dos mockups de iPhone em todo o site.

Instagram oficial: [@turmamore](https://www.instagram.com/turmamore) (botão no rodapé).

## Stack

- **Next.js 15.5** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** · **Framer Motion 12** · **GSAP + ScrollTrigger** · **Lenis** (smooth scroll)
- **Three.js / React Three Fiber 9 / Drei 10** (fundo 3D ambiente, lazy, só desktop)
- **Lucide Icons** (+ `BrandIcons.tsx` p/ ícones de marca) · fontes **Inter/Sora self-hosted**

## Rodar localmente

```bash
npm install
npm run dev      # desenvolvimento (0.0.0.0:3000)
npm run build    # build de produção
npm run start    # servidor de produção
```

## Deploy no Vercel

O projeto já está pronto (`vercel.json` com framework `nextjs`):

1. Suba o repositório para GitHub/GitLab/Bitbucket.
2. Em [vercel.com](https://vercel.com) → **Add New… → Project** → importe.
3. O Vercel detecta Next.js automaticamente → **Deploy**.

Ou via CLI: `npx vercel --prod`.

Em produção (`VERCEL_ENV=production`) o middleware ativa automaticamente as
proteções anti-clickjacking (`frame-ancestors 'none'`, `X-Frame-Options: DENY`,
`Cross-Origin-Resource-Policy: same-origin`).

---

## 🔐 Segurança (nível empresarial)

### Dependências
- `npm audit`: **0 vulnerabilidades conhecidas** (Next 15, drei 9.122, postcss 8.5.28 via `overrides`).
- Versões pinadas no `package.json`; `.env*` e `.vercel` no `.gitignore` (segredos nunca sobem).

### Headers de segurança (via `src/middleware.ts`, por resposta)
| Header | Valor / efeito |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'`; sem CDNs/terceiros; `object-src 'none'`; `base-uri`/`form-action 'self'`; `upgrade-insecure-requests` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (HSTS 2 anos) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `no-referrer` (não vaza URL/origem p/ terceiros, incl. Instagram) |
| `Permissions-Policy` | câmera, microfone, geolocalização, pagamento, usb, sensores e topics **negados** |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `X-Permitted-Cross-Domain-Policies` | `none` |
| `X-DNS-Prefetch-Control` | `off` |
| `Origin-Agent-Cluster` | `?1` |
| Somente em produção | `frame-ancestors 'none'` + `X-Frame-Options: DENY` + `CORP: same-origin` |

### Anti-vazamento / superfície de ataque
- **Zero requisições a terceiros**: fontes self-hosted (`scripts/fetch-fonts.py` regera os woff2), favicon inline, sem analytics/cookies → nenhum IP/dado de visitante sai do domínio; LGPD/GDPR-friendly.
- `poweredByHeader: false` e sem source maps de produção (`next.config.mjs`).
- Sem formulários, sem coleta de dados, sem storage → nada para vazar no cliente.
- Links externos com `rel="noopener noreferrer"`.
- `public/.well-known/security.txt` para responsible disclosure.

### Nota de arquitetura (script-src)
O Next.js (App Router, páginas estáticas) emite scripts inline de hidratação sem
suporte a nonce, então `script-src` mantém `'unsafe-inline'` como dívida
documentada. O risco residual é mínimo porque **não existe nenhum script de
terceiro** no site (CSP bloqueia qualquer injeção externa) e não há input de
usuário. Se um dia houver rotas dinâmicas, adicione nonce via middleware.

### Verificação rápida
```bash
curl -sI https://SEU-DOMINIO/ | grep -iE "content-security|strict-transport|referrer"
```
Para auditoria externa: [Mozilla Observatory](https://observatory.mozilla.org) e
[securityheaders.com](https://securityheaders.com).

---

## Estrutura

```
src/
  middleware.ts   ⭐ headers de segurança por resposta
  app/            layout (fonts self-hosted, meta, favicon) + página + fonts.css
  config/site.ts  ⭐ nome do app, Instagram, nav, stats, copy central
  components/     Header, Footer, Logo, PhoneMockup, HeroPhone, Preloader,
                  Cursor, Magnetic, SmoothScroll, three/Scene
  sections/       Hero, Modules, AIStudy, Community, Organization,
                  ProfileSection, HowItWorks, Stats, FAQ, FinalCTA
  lib/            scroll (Lenis singleton), motion (variants), cn
scripts/
  fetch-fonts.py  baixa Inter/Sora e gera @font-face locais
```

## Personalização rápida

- **Nome do app:** `src/config/site.ts` → `site.name`
- **Instagram:** `src/config/site.ts` → `site.instagram`
- **Números animados:** `site.stats`
- **Screenshots:** troque os arquivos em `public/screenshots/*.png`
- **Cores:** `tailwind.config.ts` → `brand` / `navy` / `accent`

## Mobile & performance

- Totalmente responsivo; 3D/partículas desligados no mobile
- `viewport-fit=cover`, `scroll-padding-top`, tap-highlight removido
- `prefers-reduced-motion` respeitado em cursor, Lenis, GSAP, Framer e CSS
- Cenas 3D sob demanda (`next/dynamic`, `ssr: false`)
- Imagens com `loading="lazy"`; fontes variáveis únicas por família (2 arquivos)
