# Turma+ — Landing Page Premium

Landing page institucional de lançamento do aplicativo educacional **Turma+**.

As screenshots reais do app (Feriados, Feed, Estudo, Perfil) estão em
`public/screenshots/` e são usadas dentro dos mockups de iPhone em todo o site.

Instagram oficial: [@turmamore](https://www.instagram.com/turmamore) (botão no rodapé).

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** · **Framer Motion** · **GSAP + ScrollTrigger** · **Lenis** (smooth scroll)
- **Three.js / React Three Fiber / Drei** (fundo 3D ambiente, lazy, só desktop)
- **Lucide Icons**

## Rodar localmente

```bash
npm install
npm run dev      # desenvolvimento (0.0.0.0:3000)
npm run build    # build de produção
npm run start    # servidor de produção
```

## Deploy no Vercel

O projeto já está pronto para o Vercel (`vercel.json` com framework `nextjs` incluído):

1. Suba o projeto para um repositório no GitHub/GitLab/Bitbucket.
2. Em [vercel.com](https://vercel.com) → **Add New… → Project** → importe o repositório.
3. O Vercel detecta Next.js automaticamente (build `next build`, output `.next`).
   Basta clicar em **Deploy**.

Ou via CLI, dentro da pasta do projeto:

```bash
npx vercel          # preview
npx vercel --prod   # produção
```

## Estrutura

```
src/
  app/            layout (fonts, meta, favicon) + página
  config/site.ts  ⭐ nome do app, Instagram, nav, stats, copy central
  components/     Header, Footer, Logo, PhoneMockup, HeroPhone, Preloader,
                  Cursor, Magnetic, SmoothScroll, three/Scene
  sections/       Hero, Modules, AIStudy, Community, Organization,
                  ProfileSection, HowItWorks, Stats, FAQ, FinalCTA
  lib/            scroll (Lenis singleton), motion (variants), cn
```

## Personalização rápida

- **Nome do app:** `src/config/site.ts` → `site.name`
- **Instagram:** `src/config/site.ts` → `site.instagram`
- **Números animados:** `site.stats`
- **Screenshots:** troque os arquivos em `public/screenshots/*.png`
- **Cores:** `tailwind.config.ts` → `brand` / `navy` / `accent`

## Mobile & performance

- Totalmente responsivo; 3D/partículas desligados no mobile
- `viewport-fit=cover` + safe areas, `scroll-padding-top`, tap-highlight removido
- `prefers-reduced-motion` respeitado em cursor, Lenis, GSAP, Framer e CSS
- Cenas 3D carregadas sob demanda (`next/dynamic`, `ssr: false`)
- Imagens com `loading="lazy"` e Next.js servindo AVIF/WebP
