# NuxiPro — Documentation

## Table of Contents

1. [Presentation](#presentation)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Deployment](#deployment)
7. [Testing](#testing)
8. [Contribution](#contribution)

---

## Presentation

NuxiPro is a minimalist personal Kanban task manager. The core principle is simple: **completed tasks should disappear automatically**.

Instead of manually cleaning up your "Done" column, NuxiPro archives tasks after they reach completion. No clutter, no wasted time. Just focus on what matters.

This repository contains the **landing page** for NuxiPro. The landing page serves as:

- **Product showcase** — Interactive animated Kanban demo
- **Marketing site** — Features, benefits, FAQ
- **Legal Center** — Privacy policy, terms, legal notices
- **Contact page** — Quick access to support

**Links:**

| Resource | URL |
|---|---|
| Live Demo | [demo.nuxipro.com](https://demo.nuxipro.com) |
| Cloud (in dev) | [app.nuxipro.com](https://app.nuxipro.com) |
| Blog & Docs | [center.nuxipro.com](https://center.nuxipro.com) |
| GitHub | [github.com/NuxiPro](https://github.com/NuxiPro) |
| Website | [nuxipro.com](https://nuxipro.com) |

---

## Features

### Landing Page Features

- **Interactive Kanban Demo** — Animated board with cursor simulation, card dragging, and auto-archiving
- **Bilingual (FR/EN)** — Automatic browser locale detection with manual toggle
- **SEO Optimized** — Structured data (JSON-LD), Open Graph, Twitter Cards, hreflang, canonical URLs
- **AEO/GEO Ready** — BreadcrumbList, ContactPage, WebPage schemas for answer engines
- **Cookie Consent** — GDPR-compliant banner with analytics + session recording opt-in
- **PWA Support** — Web App Manifest for installability
- **Responsive Design** — Mobile-first with breakpoints at 540px, 768px, 1024px+
- **Analytics** — PostHog integration (opt-in only, anonymized)
- **Reduced Motion** — Respects `prefers-reduced-motion` system preference

### Legal Center

Dedicated section with 3 pages:

| Page | URL | Content |
|------|-----|---------|
| Hub | `/legal-center` | Overview with links to all legal pages |
| Privacy | `/legal-center/privacy` | Data collection, GDPR rights, cookies, "we never sell your data" |
| Terms | `/legal-center/terms` | Demo usage, data risks, liability, IP |
| Notices | `/legal-center/notices` | Publisher info, hosting (Cloudflare), contact |

### Product Features (NuxiPro SaaS)

- **Auto-archiving** — Demo: tasks archive instantly when reaching "Done" (localStorage, not for real work). Cloud: you choose your archiving mode at sign-up — instant or after X days.
- **Minimal configuration** — Demo works out of the box. Cloud requires one simple choice at sign-up.
- **No visual clutter** — Completed tasks disappear from view
- **Simple tracking** — Quick overview of active work

---

## Architecture

### Tech Stack Overview

```
┌─────────────────────────────────────────┐
│              Cloudflare Pages            │
│  ┌─────────────────────────────────┐    │
│  │         Middleware               │    │
│  │    (PostHog proxy /edge)        │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │         Static Assets           │    │
│  │    (index.html, JS, CSS)        │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
   ┌────▼────┐            ┌────▼────┐
   │  React  │            │ PostHog │
   │   SPA   │            │(EU host)│
   └─────────┘            └─────────┘
```

### Project Structure

```
src/
├ main.tsx                 # React entry point
├ router.tsx               # TanStack Router initialization
├ routeTree.gen.ts         # Auto-generated route tree (DO NOT EDIT)
├ styles.css               # Global styles (Tailwind v4 + custom theme)
├ kanban.css               # Kanban demo styles
│
├ components/              # Reusable UI components
│   ├── Navbar.tsx         # Sticky nav (logo, Contact, FAQ, Cloud)
│   ├── Footer.tsx         # Dark footer (GitHub, PH, Blog, Docs, Legal)
│   ├── Banner.tsx         # Cookie consent banner (GDPR)
│   ├── KanbanDemo.tsx     # Animated Kanban board
│   ├── FadeIn.tsx         # Scroll-triggered fade-in wrapper
│   ├── legal-section.tsx  # Shared legal page section
│   └── svg-icon.tsx       # Centralized SVG icons
│
├ config/                  # Configuration
│   └── seo.ts             # SEO constants + createPageHead()
│
├ hooks/                   # Custom React hooks
│   └── useSectionTracking.ts  # PostHog tracking
│
├ i18n/                    # Internationalization
│   ├── index.tsx          # I18n context, provider, useTranslation()
│   ├── en.json            # English translations
│   └── fr.json            # French translations
│
├ test/                    # Unit tests
│   ├── setup.ts           # Vitest setup (jsdom + React Testing Library)
│   ├── seo.test.ts        # SEO validation (unique titles/descriptions)
│   └── i18n.test.ts       # i18n validation (key parity EN/FR)
│
└ routes/                  # Page components (file-based routing)
    ├── __root.tsx         # Root layout (providers, SEO, fonts)
    ├── index.tsx          # Home page (/, Hero + Demo + Benefits + CTA)
    ├── faq.tsx            # FAQ page (/faq, accordion + JSON-LD)
    ├── contact.tsx        # Contact page (/contact, email + GitHub + X)
    ├── legal-center.tsx   # Legal center layout (sidebar + Outlet)
    └── legal-center/      # Legal center pages
        ├── index.tsx      # Hub (/legal-center)
        ├── privacy.tsx    # Privacy policy
        ├── terms.tsx      # Terms of use
        └── notices.tsx    # Legal notices
```

### Routing

TanStack Router with file-based routing:

| Route | File | Description |
|---|---|---|
| `/` | `routes/index.tsx` | Main landing page |
| `/faq` | `routes/faq.tsx` | FAQ with accordion |
| `/contact` | `routes/contact.tsx` | Contact page |
| `/legal-center` | `routes/legal-center.tsx` | Legal center layout |
| `/legal-center/` | `routes/legal-center/index.tsx` | Legal hub |
| `/legal-center/privacy` | `routes/legal-center/privacy.tsx` | Privacy policy |
| `/legal-center/terms` | `routes/legal-center/terms.tsx` | Terms of use |
| `/legal-center/notices` | `routes/legal-center/notices.tsx` | Legal notices |

The route tree is auto-generated in `routeTree.gen.ts`. Do not edit manually.

### SEO / AEO / GEO

Simplified in `src/config/seo.ts`:

- **SEO**: Title, meta description, canonical URL per page
- **AEO**: JSON-LD schemas (BreadcrumbList, ContactPage, Organization, WebPage, FAQPage)
- **GEO**: hreflang tags (fr, en, x-default)
- **OG/Twitter**: Set globally in root layout

### Cookie Consent

GDPR-compliant banner (`src/components/Banner.tsx`):

- **Analytics** (PostHog): Opt-in only, anonymized, never sold
- **Session Recording**: Disabled by default, manual toggle
- **Consent storage**: `localStorage` only, never sent to server
- **Manage**: Gear icon to reopen preferences

### Middleware

Cloudflare Workers edge middleware (`src/worker.ts`) proxies PostHog analytics:

- Intercepts `/nuxi-data/:path*` requests
- Routes to PostHog EU hosts
- Strips CORS/CSP headers
- Hides analytics endpoint behind site domain

---

## Installation

### Prerequisites

- [Bun](https://bun.sh) >= 1.3.13 (pinned in `.bun-version`)

### Setup

```bash
# Clone the repository
git clone https://github.com/NuxiPro/NuxiPro-page.git
cd NuxiPro-page

# Install dependencies
bun install

# Start development server
bun dev
```

Dev server runs at `http://localhost:3000`.

### Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite dev --port 3000` | Start dev server |
| `build` | `vite build` | Production build |
| `preview` | `vite preview` | Preview production build |
| `test` | `vitest run` | Run tests once |
| `test:watch` | `vitest` | Run tests in watch mode |
| `format` | `biome format` | Format code |
| `lint` | `biome lint` | Lint code |
| `check` | `biome check` | Run all Biome checks |

---

## Configuration

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_PUBLIC_POSTHOG_PROJECT_TOKEN=your_posthog_token
VITE_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

| Variable | Description | Required |
|---|---|---|
| `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog project API key | Yes (analytics) |
| `VITE_PUBLIC_POSTHOG_HOST` | PostHog host URL | Yes (analytics) |

### TypeScript

Path aliases are configured in `tsconfig.json`:

```typescript
// Both resolve to ./src/
import something from "#/*"
import something from "@/*"
```

### Tailwind CSS

Uses Tailwind CSS v4 with `@theme` directive in `styles.css`. No `tailwind.config.js` needed.

### Biome

Linting and formatting via Biome (replaces ESLint + Prettier). Configured in `.vscode/settings.json` for VS Code integration.

---

## Deployment

### Cloudflare Pages

The project deploys to Cloudflare Pages via Wrangler.

**Configuration** (`wrangler.jsonc`):

```jsonc
{
  "name": "nuxipro-page",
  "compatibility_date": "2026-08-01",
  "assets": { "directory": "./dist" },
  "routes": [{ "type": "single_page_application" }]
}
```

**Deploy:**

```bash
bun build
npx wrangler pages deploy dist
```

### Domain

- **Production:** `nuxipro.com`
- **Demo:** `demo.nuxipro.com`
- **Blog & Docs:** `center.nuxipro.com`
- **Cloud (In development):** `app.nuxipro.com`

---

## Testing

Unit tests with Vitest + React Testing Library.

### Run Tests

```bash
bun run test        # Run once
bun run test:watch  # Watch mode
```

### Test Files

| File | Tests | What it checks |
|------|-------|----------------|
| `seo.test.ts` | 5 | Unique titles, unique descriptions, length 20-160 chars, "NuxiPro" in titles |
| `i18n.test.ts` | 6 | EN/FR key parity, required legal/contact keys exist |

### Adding Tests

Create `*.test.ts` files in `src/test/`. Vitest is configured with jsdom environment.

---

## Contribution

### Code Style

- **Formatter/Linter:** Biome (run `bun run check` before committing)
- **TypeScript:** Strict mode enabled
- **Components:** Functional components with hooks
- **Styling:** Tailwind CSS v4 utility classes
- **i18n:** Add keys to both `en.json` and `fr.json`

### Commit Convention

Follow conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation update
style: formatting change
refactor: code restructuring
test: add tests
```

### Development Workflow

1. Create a branch from `main`
2. Make your changes
3. Run `bun run check` to ensure code quality
4. Run `bun run test` to verify tests pass
5. Submit a pull request

### File Guidelines

- **`routeTree.gen.ts`** — Auto-generated by TanStack Router. Do not edit manually.
- **`public/`** — Static assets (images, manifest, robots.txt, security.txt)
- **`src/routes/`** — Page components (file-based routing)
- **`src/components/`** — Reusable UI components
- **`src/components/svg-icon.tsx`** — All SVG icons centralized here
- **`src/i18n/`** — Translation files (add keys to both `en.json` and `fr.json`)
- **`src/test/`** — Unit tests (Vitest)

---

## FAQ

### Why is there no dark mode?

NuxiPro uses a light-only theme by design. The theme is hardcoded to `"light"` in the root layout.

### Why Bun instead of npm/yarn?

Bun is faster for install, build, and dev. The version is pinned in `.bun-version` for consistency.

### Why PostHog instead of Google Analytics?

PostHog provides product analytics (session recording, feature flags) beyond basic page views. It's also GDPR-friendly with EU hosting. Analytics are opt-in only.

### How does the Kanban demo work?

The `KanbanDemo` component runs a client-side animation engine using `requestAnimationFrame` and mutable refs (no React re-renders). It simulates a cursor dragging cards through columns with auto-archiving.

### Where is the data stored?

- **Demo:** 100% in browser `localStorage`. No server. Data lost if cache cleared.
- **Cloud (future):** Aiven PostgreSQL + Redis Cloud (EU hosting).

---

## Author

**Sebastien Babas** — [@Tybass450](https://twitter.com/Tybass450)

## License

This project is licensed under the [BSD 2-Clause "Simplified" License](../LICENSE).
