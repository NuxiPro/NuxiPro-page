# NuxiPro — Documentation

## Table of Contents
1. [Presentation](#presentation)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Routing](#routing)
6. [Legal Center — Maintenance](#legal-center--maintenance)
7. [SEO / AEO / GEO](#seo--aeo--geo)
8. [i18n](#i18n)
9. [Cookie Consent](#cookie-consent)
10. [Worker & Analytics Proxy](#worker--analytics-proxy)
11. [Public Assets](#public-assets)
12. [Installation](#installation)
13. [Configuration](#configuration)
14. [Deployment](#deployment)
15. [Testing](#testing)
16. [Maintenance Guide](#maintenance-guide)
17. [Contribution](#contribution)

---

## Presentation

Minimalist personal Kanban. Principle: **completed tasks auto-archive**. Demo archives instantly (`localStorage`); Cloud (future) = instant or after X days (choice at sign-up).

This repo = **landing page** only: showcase + marketing + legal + contact.

| Resource | URL |
|---|---|
| Website | https://nuxipro.com |
| Demo | https://demo.nuxipro.com |
| Cloud (dev) | https://app.nuxipro.com |
| Blog & Docs | https://center.nuxipro.com |
| GitHub | https://github.com/NuxiPro |

---

## Features

- **Kanban Demo** `src/components/KanbanDemo.tsx:1` — `requestAnimationFrame` + refs, Bezier drag, auto-archive, respects `prefers-reduced-motion`
- **Bilingual FR/EN** — `navigator.languages` + `localStorage nuxipro-locale` + manual toggle, no `/fr` routing (SPA fallback)
- **SEO/AEO** — `createPageHead()` + JSON-LD per route, hreflang `en/fr/x-default`
- **Cookie GDPR** — `src/components/Banner.tsx:1` opt-in analytics + session recording, 12-month expiry
- **PWA** — `public/manifest.json`
- **Analytics** — PostHog EU, opt-in only, anonymized, via Worker proxy
- **Responsive** — 540/768/1024px, mobile-first

---

## Architecture

```
┌─────────────────────────────────────┐
│      Cloudflare Workers Assets      │  wrangler.jsonc: assets ./dist
│  ┌─────────────────────────────┐    │  not_found_handling: single-page-application
│  │  Worker src/worker.ts       │    │  → /nuxi-data/x/* → PostHog EU
│  └─────────────────────────────┘    │  → else → ASSETS.fetch (SPA)
│  ┌─────────────────────────────┐    │
│  │  Static Assets (dist/)      │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
           │              │
     ┌─────▼────┐   ┌────▼────┐
     │ React 19 │   │ PostHog │
     │ SPA Vite │   │ EU host │
     └──────────┘   └─────────┘
```

Stack: `Bun 1.3.13` (`.bun-version`), `React 19.2`, `Vite 8.2`, `TanStack Router 1.17` file-based, `Tailwind v4` (`@theme` in `styles.css`), `Biome 2.5`, `Vitest 4.1 + jsdom`.

---

## Project Structure

```
src/
├ main.tsx               # createRoot → RouterProvider
├ router.tsx             # createTanStackRouter({routeTree, scrollRestoration, preload:intent})
├ routeTree.gen.ts       # AUTO-GENERATED — DO NOT EDIT
├ styles.css             # Tailwind @theme (teal #0d9488, canvas, hairline) + global
├ kanban.css             # Kanban window/board/cursor
├ cookie.css             # Banner modal/FAB
├ worker.ts              # Edge proxy /nuxi-data/x/*
├ config/seo.ts          # SITE_URL, SITE_TITLE, createPageHead()
├ hooks/useSectionTracking.ts # IntersectionObserver → posthog.capture(section_view/cta_click)
├ i18n/index.tsx         # Locale en|fr, detectBrowserLocale, localStorage
├ i18n/en.json + fr.json # 285L each, strict parity (tested)
├ components/
│  ├── Navbar.tsx        # sticky: logo icon.svg+text23.svg, FAQ/Contact, Cloud→app.nuxipro.com
│  ├── Footer.tsx        # dark #0c0c0c, Project + Legal Center
│  ├── Banner.tsx        # GDPR consent, CONSENT_VERSION 1.0, keys nuxipro_cookie_*
│  ├── KanbanDemo.tsx    # 482L anim engine
│  ├── FadeIn.tsx        # threshold 0.15
│  ├── legal-section.tsx # USED — section + dot teal + border-hairline
│  ├── legal.tsx         # UNUSED — dead code, prefer legal-section.tsx
│  └── svg-icon.tsx      # all SVGs centralized (287L)
├ routes/
│  ├── __root.tsx        # I18nProvider, PostHog init (opt-in), <html lang>, head global
│  ├── index.tsx         # / Hero + Pourquoi + Benefits(5) + CTA
│  ├── faq.tsx           # /faq accordion + FAQPage JSON-LD
│  ├── contact.tsx       # /contact ContactPage+Organization+BreadcrumbList
│  ├── legal-center.tsx  # /legal-center layout (header+sidebar+Outlet)
│  └── legal-center/
│     ├── index.tsx      # /legal-center/ hub 3 cards
│     ├── privacy.tsx    # /legal-center/privacy 8 sections
│     ├── cgu.tsx        # /legal-center/cgu 6 sections
│     └── notices.tsx    # /legal-center/notices publisher/hosting (InfoRow)
└ test/
   ├── setup.ts
   ├── seo.test.ts       # unique titles/descriptions, length 20-160
   └── i18n.test.ts      # EN/FR parity
```

---

## Routing

File-based, `routeTree.gen.ts` auto-generated.

| URL | File | Head |
|---|---|---|
| `/` | `routes/index.tsx` | `SITE_TITLE` |
| `/faq` | `routes/faq.tsx` | FAQ + FAQPage |
| `/contact` | `routes/contact.tsx` | ContactPage+Organization+Breadcrumb |
| `/legal-center` | `routes/legal-center.tsx` | Layout Breadcrumb+WebPage + `Outlet` |
| `/legal-center/` | `routes/legal-center/index.tsx` | Hub |
| `/legal-center/privacy` | `routes/legal-center/privacy.tsx` | Privacy |
| `/legal-center/cgu` | `routes/legal-center/cgu.tsx` | CGU |
| `/legal-center/notices` | `routes/legal-center/notices.tsx` | Notices |

Add route = create file in `src/routes/` + `bun run build` regenerates `routeTree.gen.ts`.

---

## Legal Center — Maintenance

**Layout** `legal-center.tsx:11` = header `99-113` + sidebar `117-137` (`sections:30-34`) + `Outlet:140`. No legal text.

**Hub** `legal-center/index.tsx:16` = 3 cards `26-30` → privacy/cgu/notices.

| File | Role | Sections | When to edit |
|---|---|---|---|
| `privacy.tsx:7` | **RGPD** privacy policy | 8× `LegalSection` `privacy.tsx:43-73` : data/noSell/storage/cookies/analytics/session/rights/disclaimer | tracker/cookie/storage change |
| `cgu.tsx:7` | **CGU** terms of use | 6× `LegalSection` `cgu.tsx:43-65` : demo/storage/responsability/ip/availability/jurisdiction | feature/liability change |
| `notices.tsx:7` | **Mentions légales** LCEN | 4× `LegalSection` + `InfoRow:87` publisher/hosting/ip/contact | publisher `S. Babas` / email / hosting `Cloudflare` change |

Template identique: `TITLE/DESCRIPTION/URL:7-9` (SEO) → `createFileRoute:11` → `PrivacyPage:21` → `max-w-2xl:25` → header back `27-33` + `h1 t("legal.*.title"):35` + `lastUpdated:37` (hardcoded `août 2026` — centralize) → `intro:40` → `space-y-10:42` + `LegalSection`.

Text visible = `src/i18n/en.json` + `fr.json` (`legal.*`), not `.tsx`. Add section = duplicate `LegalSection` + add i18n keys.

Source légale vérité = `docs/legal-actuel.md` (demo `localStorage`, PostHog anon). `docs/legal.md` = aspirational Cloud future (Aiven PG/Redis/Sentry/Better Auth) — not implemented.

---

## SEO / AEO / GEO

`src/config/seo.ts` : `SITE_URL=https://nuxipro.com`, `SITE_TITLE`, `createPageHead()` → canonical + og.

Per route `head: () => createPageHead({title, description, url, links})` + JSON-LD:
- `__root.tsx` : WebSite
- `legal-center.tsx:39-86` : BreadcrumbList + WebPage
- `contact.tsx` : ContactPage + Organization + Breadcrumb
- `faq.tsx` : FAQPage
- `index.html` : fallback `@graph` (WebSite/Organization/Breadcrumb/SoftwareApplication/FAQPage)

`hreflang` `en/fr/x-default` set but `/en` `/fr` are SPA fallback (200, not real routes) — GEO imperfect.

OG/Twitter + fonts `Fraunces/Inter` in `__root.tsx` + `index.html` `noscript` fallback.

---

## i18n

`src/i18n/index.tsx`: `detectBrowserLocale()` → `navigator.languages`, store `nuxipro-locale`, `t(key)` via `resolveNested`. No URL routing. Dynamic `<html lang>` in `__root.tsx`, but `index.html lang="en"` + `manifest.json lang:"fr"` — triple source.

Add key = add to **both** `en.json` and `fr.json` (tested `i18n.test.ts:78` parity).

---

## Cookie Consent

`src/components/Banner.tsx`: `CONSENT_VERSION 1.0`, keys `nuxipro_cookie_analytics/recording/consent`, expiry 12 months (`isConsentExpired` — var `sixMonthsLater` misnamed), modal `30j` vs `12mois` incoherence. Toggles 3, FAB gear emits `reopen-cookie-banner`. Opt-in only, `localStorage` only.

---

## Worker & Analytics Proxy

`src/worker.ts:1` (prod) vs `vite.config.ts` (dev) — **divergent paths** (P0):

| Env | Request | Target |
|---|---|---|
| Dev | `/ingest/*`, `/ingest/static/*`, `/ingest/array/*` | Vite proxy → `eu-assets.i.posthog.com` / `VITE_PUBLIC_POSTHOG_HOST\|\|eu.i.posthog.com` |
| Prod | `/nuxi-data/x/*` | Worker → `eu.i.posthog.com` / `eu-assets.i.posthog.com` (if `static/`) + strip CSP/X-Frame |

`__root.tsx` `posthog.init({api_host:"/ingest"})` — broken in prod if not rewritten. Keep both proxies aligned or unify to `/ingest`.

---

## Public Assets

| File | Notes |
|---|---|
| `public/sitemap.xml` | **TODO P0**: currently 4 URLs (`/`, `/faq`, `/legal-center`, `/contact`) — must be 7 (+ `/privacy`, `/cgu`, `/notices`). `lastmod` update on legal change. hreflang `en/fr/x-default` per URL. |
| `public/robots.txt` | Allow all + 11 bots, `Sitemap: /sitemap.xml` OK but `Sitemap: /llms.txt` invalid (not XML) |
| `public/llms.txt` | 94L summary, contains dead link `/mentions-legales` → `/legal-center` |
| `public/manifest.json` | `name NuxiPro`, icons `logo.png 192/512`, `lang fr`, `start_url .` |
| `public/security.txt` | `Contact security@nuxipro.com`, `Expires 2027-12-31` |
| `public/icon.svg`, `logo.png`, `text23.svg`, `text23-light.svg` | Navbar/Footer logos |
| `public/og-image.png` | OG image |
| `public/demo.gif` | Unreferenced (docs only) |

---

## Installation

Prereq: `Bun >=1.3.13` (`.bun-version`)

```bash
git clone https://github.com/NuxiPro/NuxiPro-page.git
cd NuxiPro-page
bun install
bun dev # http://localhost:3000
```

Scripts:

| Script | Command | Desc |
|---|---|---|
| `dev` | `vite dev --port 3000` | dev |
| `build` | `vite build` | prod → `dist/` |
| `preview` | `vite preview` | preview |
| `test` | `vitest run` | once |
| `test:watch` | `vitest` | watch |
| `format/lint/check` | `biome ...` | code quality |

---

## Configuration

`.env` (not committed, gitignored):

```env
VITE_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_...
VITE_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com # optional, fallback eu.i.posthog.com
```

`tsconfig.json` aliases `#/*` + `@/*` → `./src/*` (strict, `ES2022`).
`biome.json` includes `src/** public/**`, ignores `kanban.css/styles.css/cookie.css` + `routeTree.gen.ts` disabled.
Tailwind v4 `@theme` in `styles.css` — no `tailwind.config.js`.

---

## Deployment

**Cloudflare Workers Assets** (not Pages). `wrangler.jsonc`:

```jsonc
{ "name":"nuxipro-page", "compatibility_date":"2026-08-01", "main":"src/worker.ts", "assets":{"directory":"./dist","not_found_handling":"single-page-application"} }
```

```bash
bun run build
npx wrangler deploy # not `wrangler pages deploy`
```

Domains: `nuxipro.com` (prod), `demo.nuxipro.com`, `center.nuxipro.com`, `app.nuxipro.com` (dev).

---

## Testing

```bash
bun run test       # 11 tests
bun run test:watch
```

| File | Tests | Checks |
|---|---|---|
| `seo.test.ts` | 5 | 7 pages unique titles/descriptions, 20-160 chars, "NuxiPro" in titles |
| `i18n.test.ts` | 6 | EN/FR parity, required legal/contact keys |

Add test = `src/test/*.test.ts` (jsdom, `setup.ts`).

---

## Maintenance Guide

**Where to edit what:**

| Change | File(s) |
|---|---|
| Legal text | `src/i18n/en.json` + `fr.json` |
| Legal SEO title/desc | `src/routes/legal-center/*.tsx:7-9` + `seo.ts` |
| New legal section | duplicate `LegalSection` in `privacy/terms/notices.tsx` + add i18n keys |
| Update `lastUpdated` | `privacy/terms/notices.tsx:37` (3 files) — centralize to constant |
| Add page/route | new file `src/routes/*.tsx` → auto `routeTree.gen.ts` + update `sitemap.xml` + `llms.txt` + `seo.test.ts` |
| Translate | add key to both `en.json`+`fr.json` then `t("key")` |
| Icons | `src/components/svg-icon.tsx` |
| Styles section | `src/components/legal-section.tsx` |
| Analytics | `src/worker.ts` + `vite.config.ts` + `__root.tsx` (keep `/ingest` ≡ `/nuxi-data/x` in sync) |
| Sitemap | `public/sitemap.xml` — add URL + hreflang + bump `lastmod` |
| Check before PR | `bun run check && bun run test` |

**Critical TODOs:**
- P0: sitemap 4→7 URLs, unify analytics proxy paths
- P1: fix `llms.txt` `/mentions-legales` → `/legal-center`, remove `Sitemap: /llms.txt` from `robots.txt`, rename `sixMonthsLater`→`twelveMonthsLater`
- P2: remove dead `src/components/legal.tsx`, fix `manifest.json`/`index.html`/`__root.tsx` lang triple source, `localStorage` SSR guard in `i18n/index.tsx`

---

## Contribution

- Biome: `bun run check` before commit, TS strict, functional components + hooks
- Commits: `feat:|fix:|docs:|style:|refactor:|test:`
- Workflow: branch `main` → change → `check` + `test` → PR
- Do not edit: `routeTree.gen.ts`, `dist/`, `public/sitemap.xml` lastmod without reason

---

## FAQ

**No dark mode?** Light-only by design, hardcoded `light`.

**Bun vs npm?** Faster, pinned `1.3.13`.

**PostHog vs GA?** EU host, GDPR opt-in, session recording + feature flags.

**KanbanDemo?** `KanbanDemo.tsx` `requestAnimationFrame` + refs, no React re-renders.

**Data where?** Demo `localStorage` only. Cloud future `Aiven PG + Redis` (see `docs/legal.md` aspirational).

---

## Author

**Sebastien Babas** — [@Tybass450](https://twitter.com/Tybass450)

## License

BSD 2-Clause — [LICENSE](../LICENSE)
