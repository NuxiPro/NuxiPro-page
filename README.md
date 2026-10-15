> **⚠️ Read-Only Mirror**
> This repository is an automated public mirror of **NuxiPro Cloud**. 
> The official source of truth, active development, issues, and merge requests are hosted on [Codeberg](https://codeberg.org/NuxiPro/NuxiPro-Page). Contributions and pull requests on GitHub are not monitored.

---

<p align="center">
  <img src="public/icon.svg" alt="NuxiPro" width="80" />
</p>

<h1 align="center">NuxiPro</h1>

<p align="center">
  <strong>Just one tool for solo workers that grows with you, without becoming a graveyard of completed tasks</strong>
</p>

<p align="center">
  <a href="https://codeberg.org/NuxiPro/NuxiPro-page/src/branch/main/LICENSE">
    <img src="https://img.shields.io/badge/license-BSD--2--Clause-blue.svg" alt="BSD 2-Clause License" />
  </a>
  <a href="https://demo.nuxipro.com">
    <img src="https://img.shields.io/badge/demo-live-brightgreen.svg" alt="Live Demo" />
  </a>
</p>

---

## About

As I wanted a sovereign tool that respects my privacy, I created NuxiPro to get a workspace that cleans itself up, without wasting time manually archiving my tasks every time.

This repo simply contains the NuxiPro landing page.

**Links:**

| Resource | URL |
|---|---|
| Website | [nuxipro.com](https://nuxipro.com) |
| Demo | [demo.nuxipro.com](https://demo.nuxipro.com) |
| Blog & Docs | [center.nuxipro.com](https://center.nuxipro.com) |
| GitHub | [github.com/NuxiPro](https://github.com/NuxiPro) |
| Product Hunt | [Page](https://www.producthunt.com/products/nuxipro) |

## Features

- **Automatic archiving** — Demo: instant archiving. Cloud: choose between instant or time-based (X days)
- **Bilingual** — English & French with automatic browser detection
- **Interactive demo** — Animated Kanban board directly on the landing page
- **Legal Center** — Privacy policy, cookie policy, terms of use, legal notices
- **Cookie Consent** — GDPR-compliant banner with analytics opt-in, linking to the dedicated cookie policy page
- **SEO optimized** — Structured data (JSON-LD), Open Graph, canonical URLs
- **AEO/GEO ready** — BreadcrumbList, ContactPage, Organization schemas
- **Analytics** — PostHog integration (opt-in only, anonymized)
- **Contact page** — Email, GitHub, X (Twitter)

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 8](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [TanStack Router](https://tanstack.com/router) | File-based routing |
| [Lucide React](https://lucide.dev) | Icons |
| [Biome](https://biomejs.dev) | Linting & formatting |
| [Vitest](https://vitest.dev) | Testing |
| [Bun](https://bun.sh) | Package manager |
| [Cloudflare Pages](https://pages.cloudflare.com) | Deployment |
| [PostHog](https://posthog.com) | Analytics |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.4.2

### Installation

```bash
git clone https://github.com/NuxiPro/NuxiPro-page.git
cd NuxiPro-page
bun install
```

### Development

```bash
bun dev
```

The dev server starts at `http://localhost:3000`.

### Build

```bash
bun build
```

### Other Commands

| Command | Description |
|---|---|
| `bun dev` | Start dev server (port 3000) |
| `bun build` | Production build |
| `bun preview` | Preview production build |
| `bun run test` | Run tests once |
| `bun run test:watch` | Run tests in watch mode |
| `bun run format` | Format code with Biome |
| `bun run lint` | Lint code with Biome |
| `bun run check` | Run all Biome checks |

## Project Structure

```
NuxiPro-page/
├ src/
│  ├── components/
│  │   ├── Navbar.tsx           # Sticky nav (logo, Contact, FAQ, Cloud)
│  │   ├── Footer.tsx           # Dark footer (GitHub, PostHog, Blog, Docs, Legal)
│  │   ├── Banner.tsx           # Cookie consent banner (GDPR, links to cookie policy)
│  │   ├── KanbanDemo.tsx       # Animated Kanban board demo
│  │   ├── FadeIn.tsx           # Scroll-triggered fade-in animation
│  │   ├── legal-section.tsx    # Shared legal page section
│  │   └── svg-icon.tsx         # Centralized SVG icons
│  ├── config/
│  │   └── seo.ts               # SEO constants + createPageHead()
│  ├── hooks/
│  │   └── useSectionTracking.ts  # PostHog section tracking
│  ├── i18n/
│  │   ├── index.tsx            # i18n context & provider
│  │   ├── useTranslation.ts    # Translation hook & types
│  │   ├── en.json              # English translations
│  │   └── fr.json              # French translations
│  ├── test/
│  │   ├── setup.ts             # Vitest setup (jsdom)
│  │   ├── seo.test.ts          # SEO validation tests
│  │   └── i18n.test.ts         # i18n validation tests
│  ├── routes/
│  │   ├── __root.tsx           # Root layout (SEO, fonts, providers)
│  │   ├── index.tsx            # Main landing page
│  │   ├── faq.tsx              # FAQ page
│  │   ├── contact.tsx          # Contact page
│  │   ├── legal-center.tsx     # Legal center layout
│  │   └── legal-center/
│  │       ├── index.tsx        # Legal hub
│  │       ├── privacy.tsx      # Privacy policy
│  │       ├── cookies.tsx      # Cookie policy
│  │       ├── cgu.tsx          # Terms of use
│  │       └── notices.tsx      # Legal notices
│  ├── main.tsx                 # React entry point
│  ├── router.tsx               # TanStack Router setup
│  ├── worker.ts                # Cloudflare Workers edge middleware
│  ├── styles.css               # Global styles (Tailwind v4)
│  └── kanban.css               # Kanban demo styles
├ public/
│  ├── icon.svg                 # App icon
│  ├── logo.png                 # Logo
│  ├── og-image.png             # Open Graph image
│  ├── demo.gif                 # Demo animation
│  ├── llms.txt                 # AI search engine metadata
│  ├── manifest.json            # PWA manifest
│  ├── robots.txt               # Robots file
│  ├── security.txt             # Security contact info
│  ├── sitemap.xml              # Sitemap (auto-generated at build, git-ignored)
│  ├── text23.svg               # Text logo (dark)
│  └── text23-light.svg         # Text logo (light)
├ docs/
│  ├── index.md                 # Documentation
│  └── legal-actuel.md          # Legal document (current version)
├ index.html                    # HTML entry (SEO, JSON-LD, meta tags)
├ vitest.config.ts              # Vitest configuration
├ vite.config.ts                # Vite configuration
├ tsconfig.json                 # TypeScript configuration
├ biome.json                    # Biome linter/formatter config
├ wrangler.json                 # Cloudflare Pages deployment config
└ package.json
```

## Documentation

For detailed documentation, architecture guide, and contribution instructions, see **[docs/index.md](docs/index.md)**.

## Author

**Sebastien Babas** — [@Tybass450](https://twitter.com/Tybass450)

## License

This project is licensed under the [BSD 2-Clause "Simplified" License](LICENSE).
