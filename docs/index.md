# NuxiPro — Documentation

## Table of Contents

1. [Presentation](#presentation)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Deployment](#deployment)
7. [Contribution](#contribution)

---

## Presentation

NuxiPro is a minimalist personal Kanban task manager. The core principle is simple: **completed tasks should disappear automatically**.

Instead of manually cleaning up your "Done" column, NuxiPro archives tasks after they reach completion. No clutter, no wasted time. Just focus on what matters.

This repository contains the **landing page** for NuxiPro. The landing page serves as:

- **Product showcase** — Interactive animated Kanban demo
- **Marketing site** — Features, benefits, FAQ
- **Waitlist** — Beta access for the cloud version

**Links:**

| Resource | URL |
|---|---|
| Live Demo | [demo.nuxipro.com](https://demo.nuxipro.com) |
| Cloud (in dev) | [app.nuxipro.com](https://app.nuxipro.com) |
| GitHub | [github.com/NuxiPro](https://github.com/NuxiPro) |
| Website | [nuxipro.com](https://nuxipro.com) |

---

## Features

### Landing Page Features

- **Interactive Kanban Demo** — Animated board with cursor simulation, card dragging, and auto-archiving
- **Bilingual (FR/EN)** — Automatic browser locale detection with manual toggle
- **SEO Optimized** — Full structured data (JSON-LD), Open Graph, Twitter Cards, hreflang
- **AEO/GEO Ready** — `llms.txt` for AI search engines (ChatGPT, Claude, Perplexity)
- **PWA Support** — Web App Manifest for installability
- **Responsive Design** — Mobile-first with breakpoints at 540px, 768px, 1024px+
- **Analytics** — PostHog integration with section view tracking and CTA click tracking
- **Reduced Motion** — Respects `prefers-reduced-motion` system preference

### Product Features (NuxiPro SaaS)

- **Auto-archiving** — Tasks archive automatically after reaching "Done"
- **Zero configuration** — Works out of the box
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

### Project Architecture

```
src/
├── main.tsx                 # React entry point (creates root, renders App)
├── router.tsx               # TanStack Router initialization
├── routeTree.gen.ts         # Auto-generated route tree (DO NOT EDIT)
├── styles.css               # Global styles (Tailwind v4 + custom theme)
├── kanban.css               # Kanban demo styles (473 lines)
│
├── components/              # Reusable UI components
│   ├── Navbar.tsx           # Sticky nav (logo, links, beta badge)
│   ├── Footer.tsx           # Dark footer (brand, links, legal)
│   ├── KanbanDemo.tsx       # Animated Kanban board (551 lines)
│   └── FadeIn.tsx           # Scroll-triggered fade-in wrapper
│
├── config/                   # Configuration
│   └── seo.ts               # SEO constants (OG, Twitter, hreflang)
│
├── hooks/                   # Custom React hooks
│   └── useSectionTracking.ts  # PostHog IntersectionObserver tracking
│
├── i18n/                    # Internationalization
│   ├── index.tsx            # I18n context, provider, useTranslation()
│   ├── en.json              # English (107 keys)
│   └── fr.json              # French (107 keys)
│
└── routes/                  # Page components (file-based routing)
    ├── __root.tsx           # Root layout (providers, SEO, fonts)
    ├── index.tsx            # Home page (/, Hero + Benefits + CTA)
    ├── faq.tsx              # FAQ page (/faq, accordion + JSON-LD)
    └── mentions-legales.tsx # Legal page (/mentions-legales)
```

### Component Details

#### KanbanDemo (551 lines)

The largest and most complex component. Features:

- **3 columns**: To Do, In Progress, Done
- **Animated cursor**: SVG cursor moving along Bézier curves
- **Flying card**: Clone card following cursor during drag
- **Auto-advancement**: Tasks move through pipeline automatically
- **Archiving animation**: Scale + opacity fade on completion
- **Task pool**: 10 predefined tasks rotating
- **Client-side only**: Prevents SSR hydration mismatch

#### FadeIn

Scroll-triggered animation wrapper using `IntersectionObserver`:

```tsx
<FadeIn delay={100}>
  <div>Content fades in when scrolled into view</div>
</FadeIn>
```

### Routing

TanStack Router with file-based routing:

| Route | File | Description |
|---|---|---|
| `/` | `routes/index.tsx` | Main landing page |
| `/faq` | `routes/faq.tsx` | FAQ with accordion |
| `/mentions-legales` | `routes/mentions-legales.tsx` | Legal notices |

The route tree is auto-generated in `routeTree.gen.ts`. Do not edit manually.

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
| `test` | `vitest run` | Run tests |
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
- **Cloud (In development):** `app.nuxipro.com`

---

## Contribution

### Code Style

- **Formatter/Linter:** Biome (run `bun run check` before committing)
- **TypeScript:** Strict mode enabled
- **Components:** Functional components with hooks
- **Styling:** Tailwind CSS v4 utility classes

### Commit Convention

Follow conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation update
style: formatting change
refactor: code restructuring
```

### Development Workflow

1. Create a branch from `main`
2. Make your changes
3. Run `bun run check` to ensure code quality
4. Run `bun test` to verify tests pass
5. Submit a pull request

### File Guidelines

- **`routeTree.gen.ts`** — Auto-generated by TanStack Router. Do not edit manually.
- **`public/`** — Static assets (images, manifest, robots.txt)
- **`src/routes/`** — Page components (file-based routing)
- **`src/components/`** — Reusable UI components
- **`src/i18n/`** — Translation files (add keys to both `en.json` and `fr.json`)

---

## FAQ

### Why is there no dark mode?

NuxiPro uses a light-only theme by design. The theme is hardcoded to `"light"` in the root layout.

### Why Bun instead of npm/yarn?

Bun is faster for install, build, and dev. The version is pinned in `.bun-version` for consistency.

### Why PostHog instead of Google Analytics?

PostHog provides product analytics (session recording, feature flags) beyond basic page views. It's also GDPR-friendly with EU hosting.

### How does the Kanban demo work?

The `KanbanDemo` component runs a client-side animation engine using `requestAnimationFrame` and mutable refs (no React re-renders). It simulates a cursor dragging cards through columns with auto-archiving.

---

## Author

**Sebastien Babas** — [@Tybass450](https://twitter.com/Tybass450)

## License

This project is licensed under the [BSD 2-Clause "Simplified" License](../LICENSE).
