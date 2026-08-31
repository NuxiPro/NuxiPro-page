# NuxiPro — Documentation

## Table of Contents
1. [Presentation](#presentation)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Routing](#routing)
6. [Legal Center — Maintenance](#legal-center--maintenance)
7. [SEO / AEO / GEO](#seo--aeo--geo)
8. [Blog & Documentation Hub](#blog--documentation-hub)
9. [i18n](#i18n)
10. [Cookie Consent](#cookie-consent)
11. [Worker & Analytics Proxy](#worker--analytics-proxy)
12. [Public Assets](#public-assets)
13. [Installation](#installation)
14. [Configuration](#configuration)
15. [Deployment](#deployment)
16. [Testing](#testing)
17. [Maintenance Guide](#maintenance-guide)
18. [Contribution](#contribution)

---

## Presentation

Minimalist personal Kanban. Principle: **completed tasks auto-archive**. Demo archives instantly (`localStorage`); Cloud (future) = instant or after X days (choice at sign-up).

This repo = **landing page** only: showcase + marketing + legal + contact. Rendered server-side (SSR) via TanStack Start.

| Resource | URL |
|---|---|
| Website | https://nuxipro.com |
| Demo | https://demo.nuxipro.com |
| Cloud (dev) | https://app.nuxipro.com |
| Blog & Docs | https://center.nuxipro.com |
| GitHub | https://github.com/NuxiPro |

---

## Features

- **SSR** — TanStack Start renders full HTML server-side, crawlers/IA read without JS
- **Kanban Demo** `src/components/KanbanDemo.tsx:1` — `requestAnimationFrame` + refs, Bezier drag, auto-archive, respects `prefers-reduced-motion`
- **Bilingual FR/EN** — `navigator.languages` + `localStorage nuxipro-locale` + manual toggle, no `/fr` routing (SPA fallback)
- **SEO/AEO/GEO** — `createPageHead()` + full `@graph` JSON-LD per route + global, hreflang `en/fr/x-default`, `llms.txt`/`llms-full.txt`
- **Cookie GDPR** — `src/components/Banner.tsx:1` opt-in analytics + session recording, 12-month expiry
- **PWA** — `public/manifest.json`
- **Analytics** — PostHog EU, opt-in only, anonymized, via Worker proxy
- **Responsive** — 540/768/1024px, mobile-first

---

## Architecture

```
┌─────────────────────────────────────┐
│      Cloudflare Workers Assets      │  wrangler.jsonc: assets ./dist/client
│  ┌─────────────────────────────┐    │  SSR: dist/server/server.js
│  │  SSR Server (server.ts)     │    │  → renders full HTML per request
│  │  __root.tsx → <html> shell  │    │  → HeadContent + Scripts
│  │  /nuxi-data/x/* → PostHog   │    │  → proxy eu.i.posthog.com
│  │  /api/subscribe → backend   │    │  → email subscription
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Static Assets (dist/client)│    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
           │              │
     ┌─────▼────┐   ┌────▼────┐
     │ React 19 │   │ PostHog │
     │ SSR Start│   │ EU host │
     └──────────┘   └─────────┘
```

Stack: `Bun 1.3.13` (`.bun-version`), `React 19.2`, `Vite 8.2`, `TanStack Start 1.168`, `TanStack Router 1.17` file-based, `Tailwind v4` (`@theme` in `styles.css`), `Biome 2.5`, `Vitest 4.1 + jsdom`.

---

## Project Structure

```
src/
├ main.tsx               # StartClient → hydrateRoot (SSR entry)
├ router.tsx             # createTanStackRouter({routeTree, scrollRestoration, preload:intent})
├ routeTree.gen.ts       # AUTO-GENERATED — DO NOT EDIT
├ styles.css             # Tailwind @theme (teal #0d9488, canvas, hairline) + global
├ kanban.css             # Kanban window/board/cursor
├ cookie.css             # Banner modal/FAB
├ server.ts              # SSR + PostHog proxy + subscribe endpoint
├ config/seo.ts          # SITE_URL, SITE_TITLE, TWITTER_CREATOR, createPageHead(title, desc, url, links, extraMeta)
├ hooks/useSectionTracking.ts # IntersectionObserver → posthog.capture(section_view/cta_click)
├ i18n/index.tsx         # SSR-safe: useState("en") + useEffect reads localStorage/navigator
├ i18n/en.json + fr.json # 285L each, strict parity (tested)
├ components/
│  ├── Navbar.tsx        # sticky: logo icon.svg+text23.svg, FAQ/Contact, Cloud→app.nuxipro.com
│  ├── Footer.tsx        # dark #0c0c0c, Project + Legal Center + Blog + Docs
│  ├── Banner.tsx        # GDPR consent, CONSENT_VERSION 1.0, keys nuxipro_cookie_*
│  ├── KanbanDemo.tsx    # 482L anim engine
│  ├── FadeIn.tsx        # threshold 0.15
│  ├── legal-section.tsx # USED — section + dot teal + border-hairline
│  ├── legal.tsx         # UNUSED — dead code, prefer legal-section.tsx
│  └── svg-icon.tsx      # all SVGs centralized (287L)
├ routes/
│  ├── __root.tsx        # SSR shell: <html><head><HeadContent/></head><body> + @graph JSON-LD global
│  ├── index.tsx         # / Hero + Pourquoi + Benefits(5) + CTA, head: hrefLang + keywords
│  ├── faq.tsx           # /faq accordion + FAQPage + BreadcrumbList JSON-LD
│  ├── contact.tsx       # /contact ContactPage+Organization+BreadcrumbList
│  ├── legal-center.tsx  # /legal-center layout (header+sidebar+Outlet) + BreadcrumbList
│  └── legal-center/
│     ├── index.tsx      # /legal-center/ hub 3 cards + BreadcrumbList
│     ├── privacy.tsx    # /legal-center/privacy PrivacyPolicy+BreadcrumbList (3 levels)
│     ├── cgu.tsx        # /legal-center/cgu TermsOfService+BreadcrumbList (3 levels)
│     └── notices.tsx    # /legal-center/notices LegalService+BreadcrumbList (3 levels)
└ test/
   ├── setup.ts
   ├── seo.test.ts       # unique titles/descriptions, length 20-160
   └── i18n.test.ts      # EN/FR parity
```

---

## Routing

File-based, `routeTree.gen.ts` auto-generated. SSR renders each route server-side.

| URL | File | Head | JSON-LD |
|---|---|---|---|
| `/` | `routes/index.tsx` | SITE_TITLE + hrefLang + keywords | (global @graph) |
| `/faq` | `routes/faq.tsx` | FAQ + hrefLang + keywords | FAQPage + BreadcrumbList |
| `/contact` | `routes/contact.tsx` | Contact + hrefLang + keywords | ContactPage + Organization + BreadcrumbList |
| `/legal-center` | `routes/legal-center.tsx` | Layout + hrefLang + keywords | BreadcrumbList + WebPage |
| `/legal-center/` | `routes/legal-center/index.tsx` | Hub + hrefLang + keywords | BreadcrumbList |
| `/legal-center/privacy` | `routes/legal-center/privacy.tsx` | Privacy + hrefLang + keywords | PrivacyPolicy + BreadcrumbList (3) |
| `/legal-center/cgu` | `routes/legal-center/cgu.tsx` | CGU + hrefLang + keywords | TermsOfService + BreadcrumbList (3) |
| `/legal-center/notices` | `routes/legal-center/notices.tsx` | Notices + hrefLang + keywords | LegalService + BreadcrumbList (3) |

Add route = create file in `src/routes/` + `bun run build` regenerates `routeTree.gen.ts` + update `sitemap.xml`.

---

## Legal Center — Maintenance

**Layout** `legal-center.tsx:11` = header + sidebar (`sections:30-34`) + `Outlet`. No legal text.

**Hub** `legal-center/index.tsx:16` = 3 cards → privacy/cgu/notices.

| File | Role | Schema Type | When to edit |
|---|---|---|---|
| `privacy.tsx` | **RGPD** privacy policy | PrivacyPolicy | tracker/cookie/storage change |
| `cgu.tsx` | **CGU** terms of use | TermsOfService | feature/liability change |
| `notices.tsx` | **Mentions légales** LCEN | LegalService | publisher/email/hosting change |

Template: `TITLE/DESCRIPTION/URL` → `createFileRoute` → `head()` → `PrivacyPage` → `max-w-2xl` → header back + `h1` + `lastUpdated` → intro → `LegalSection`.

Text visible = `src/i18n/en.json` + `fr.json` (`legal.*`), not `.tsx`. Add section = duplicate `LegalSection` + add i18n keys.

Source légale vérité = `docs/legal-actuel.md` (demo `localStorage`, PostHog anon). `docs/legal.md` = aspirational Cloud future (Aiven PG/Redis/Sentry/Better Auth) — not implemented.

---

## SEO / AEO / GEO

### Config

`src/config/seo.ts` :
- `SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_IMAGE`, `TWITTER_CREATOR`
- `createPageHead({title, description, url, links?, extraMeta?})` → canonical + og + twitter + author + robots

### Global JSON-LD (`__root.tsx`)

Rendu server-side sur **toutes les pages** :

| Type | Description |
|---|---|
| `WebSite` | Site name, URL, description, publisher |
| `Organization` | Name, founder, sameAs (Twitter, GitHub, ProductHunt, center.nuxipro.com) |
| `SoftwareApplication` | Category, version, features, offers, audience, comparison |
| `Blog` | center.nuxipro.com, 2 BlogPosting (Sovereignty & Compliance, Introducing NuxiPro) |
| `WebPage` | Documentation (center.nuxipro.com/guides/first-page/) |

### Per-route schemas

| Route | Schema |
|---|---|
| `/faq` | FAQPage (7 questions) + BreadcrumbList |
| `/contact` | ContactPage + Organization + BreadcrumbList |
| `/legal-center` | BreadcrumbList + WebPage |
| `/legal-center/privacy` | PrivacyPolicy + BreadcrumbList (3 levels) |
| `/legal-center/cgu` | TermsOfService + BreadcrumbList (3 levels) |
| `/legal-center/notices` | LegalService + BreadcrumbList (3 levels) |

### Meta tags (per route `head()`)

- `<title>`, `<meta description>`, `<meta keywords>`, `<meta author>`
- `og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`, `og:locale`
- `twitter:card`, `twitter:creator`, `twitter:title`, `twitter:description`, `twitter:image`
- `<link canonical>`, `<link hrefLang>` (fr, en, x-default)

### Fallback

`index.html` contains the same `@graph` + `<noscript>` HTML content as fallback if SSR fails.

### AI Context

- `public/llms.txt` — lightweight index for AI crawlers
- `public/llms-full.txt` — verbatim dump with i18n excerpts
- `public/sitemap.xml` — 7 URLs with hreflang

---

## Blog & Documentation Hub

**URL:** https://center.nuxipro.com (Astro/Starlight)

### Blog Posts

| Post | Date | URL |
|---|---|---|
| Sovereignty & Compliance | Aug 28, 2026 | `center.nuxipro.com/blog/sovereignty-and-compliance/` |
| Introducing NuxiPro | Aug 19, 2026 | `center.nuxipro.com/blog/introducing-nuxipro/` |

**Sovereignty & Compliance** — GDPR compliance roadmap: document data storage and sub-processors, centralize legal hub on landing page, implement consent traceability.

**Introducing NuxiPro** — What NuxiPro is, the problem it solves, how automatic archiving works, demo vs cloud comparison, what NuxiPro Cloud will offer.

### Documentation

- **NuxiPro Cloud Docs** — Under construction, following Diátaxis framework
- URL: `center.nuxipro.com/guides/first-page/`

### RSS

- `center.nuxipro.com/blog/rss.xml`

### Adding a new blog post

1. Write the post on `center.nuxipro.com` (Astro/Starlight)
2. Update `src/routes/__root.tsx` → `blogPost[]` in the `@graph` JSON-LD
3. Update `index.html` → `@graph` → `Blog` → `blogPost[]` (fallback)
4. Update `public/llms.txt` and `public/llms-full.txt`

---

## i18n

`src/i18n/index.tsx`: SSR-safe — `useState("en")` default + `useEffect` reads `localStorage`/`navigator` client-side only. `detectBrowserLocale()` guarded with `typeof navigator`. Dynamic `<html lang>` in `__root.tsx`.

Add key = add to **both** `en.json` and `fr.json` (tested `i18n.test.ts:78` parity).

---

## Cookie Consent

`src/components/Banner.tsx`: `CONSENT_VERSION 1.0`, keys `nuxipro_cookie_analytics/recording/consent`, expiry 12 months (`isConsentExpired` — var `sixMonthsLater` misnamed). Toggles 3, FAB gear emits `reopen-cookie-banner`. Opt-in only, `localStorage` only.

---

## Worker & Analytics Proxy

`src/server.ts` — unified entry for SSR + PostHog proxy + subscribe endpoint:

| Route | Handler |
|---|---|
| `/nuxi-data/x/*` | PostHog EU proxy → `eu.i.posthog.com` / `eu-assets.i.posthog.com` (if `static/`) + strip CSP/X-Frame |
| `/api/subscribe` | Email subscription → backend (if configured) or 503 |
| `*` | SSR fallback → TanStack Start renders full HTML |

`__root.tsx` `posthog.init({api_host:"/nuxi-data/x"})` — aligns with production proxy path.

---

## Public Assets

| File | Notes |
|---|---|
| `public/sitemap.xml` | 7 URLs with hreflang `en/fr/x-default`, `lastmod` 2026-08-31 |
| `public/robots.txt` | Allow all + `Sitemap: /sitemap.xml` |
| `public/llms.txt` | 141L summary with blog + docs sections |
| `public/llms-full.txt` | 188L verbatim dump with blog posts + i18n excerpts |
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
| `build` | `vite build` | prod → `dist/client/` + `dist/server/` |
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
{ "name":"nuxipro-page", "compatibility_date":"2026-08-01", "assets":{"directory":"./dist/client"} }
```

```bash
bun run build
bun x wrangler deploy # not `wrangler pages deploy`
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
| Legal SEO title/desc | `src/routes/legal-center/*.tsx` → `head()` |
| New legal section | duplicate `LegalSection` in `privacy/terms/notices.tsx` + add i18n keys |
| Update `lastUpdated` | `privacy/terms/notices.tsx` (3 files) |
| Add page/route | new file `src/routes/*.tsx` → auto `routeTree.gen.ts` + update `sitemap.xml` + `llms.txt` + `seo.test.ts` |
| Translate | add key to both `en.json`+`fr.json` then `t("key")` |
| Icons | `src/components/svg-icon.tsx` |
| Styles section | `src/components/legal-section.tsx` |
| Analytics | `src/server.ts` (PostHog proxy route) + `__root.tsx` (posthog.init) |
| Sitemap | `public/sitemap.xml` — add URL + hreflang + bump `lastmod` |
| Global JSON-LD | `src/routes/__root.tsx` → `@graph` + `index.html` → `@graph` (keep in sync) |
| Blog posts | `src/routes/__root.tsx` → `blogPost[]` + `index.html` → `blogPost[]` + `llms.txt` |
| SEO meta | `src/config/seo.ts` → `createPageHead()` |
| Check before PR | `bun run check && bun run test` |

**Critical TODOs:**
- P1: rename `sixMonthsLater`→`twelveMonthsLater`, remove dead `src/components/legal.tsx`
- P2: fix `manifest.json`/`index.html`/`__root.tsx` lang triple source

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

**SSR?** TanStack Start renders full HTML server-side. Crawlers/IA read without JS. `index.html` is fallback only.

---

## Author

**Sebastien Babas** — [@Tybass450](https://twitter.com/Tybass450)

## License

BSD 2-Clause — [LICENSE](../LICENSE)
