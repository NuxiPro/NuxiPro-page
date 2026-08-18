<p align="center">
  <img src="public/icon.svg" alt="NuxiPro" width="80" />
</p>

<h1 align="center">NuxiPro</h1>

<p align="center">
  <strong>Minimalist Kanban task manager with automatic archiving</strong>
</p>

<p align="center">
  <a href="https://github.com/NuxiPro/NuxiPro-page/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-BSD--2--Clause-blue.svg" alt="BSD 2-Clause License" />
  </a>
  <a href="https://demo.nuxipro.com">
    <img src="https://img.shields.io/badge/demo-live-brightgreen.svg" alt="Live Demo" />
  </a>
</p>

---

## About

NuxiPro is a personal Kanban task manager built around one core idea: **completed tasks should disappear**. No manual cleanup, no clutter. When a task reaches "Done", it archives automatically. The demo uses instant archiving (data in localStorage, not for real work). The cloud version lets you choose between instant or time-based archiving (X days) — made for daily use with persistent data.

This repository contains the **landing page** for NuxiPro, built with React and deployed on Cloudflare Pages.

**Live demo:** [demo.nuxipro.com](https://demo.nuxipro.com)

## Features

- **Automatic archiving** — Demo: instant archiving. Cloud: choose between instant or time-based (X days) with minimal setup
- **Bilingual** — English & French with automatic browser detection
- **Interactive demo** — Animated Kanban board directly on the landing page
- **SEO optimized** — Structured data (JSON-LD), Open Graph, hreflang, sitemap
- **AEO/GEO ready** — `llms.txt` for AI search engines
- **Analytics** — PostHog integration via Cloudflare edge proxy
- **Legal pages** — FAQ and mentions légales (legal notices) with bilingual support

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

- [Bun](https://bun.sh) >= 1.3.13

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
| `bun run format` | Format code with Biome |
| `bun run lint` | Lint code with Biome |
| `bun run check` | Run all Biome checks |

## Project Structure

```
NuxiPro-page/
├── src/
│   ├── components/
│   │   ├── FadeIn.tsx         # Scroll-triggered fade-in animation
│   │   ├── Footer.tsx         # Dark footer with links
│   │   ├── KanbanDemo.tsx     # Animated Kanban board demo
│   │   ├── Navbar.tsx         # Sticky navigation bar
│   │   ├── legal.tsx          # Legal page layout components
│   │   └── svg-icon.tsx       # SVG icon components for benefits section
│   ├── config/
│   │   └── seo.ts             # SEO constants (OG, Twitter, hreflang)
│   ├── hooks/
│   │   └── useSectionTracking.ts  # PostHog section tracking
│   ├── i18n/
│   │   ├── index.tsx          # i18n context & provider
│   │   ├── en.json            # English translations
│   │   └── fr.json            # French translations
│   ├── routes/
│   │   ├── __root.tsx         # Root layout (SEO, fonts, providers)
│   │   ├── index.tsx          # Main landing page
│   │   ├── faq.tsx            # FAQ page
│   │   └── mentions-legales.tsx  # Legal notices (mentions légales)
│   ├── main.tsx               # React entry point
│   ├── router.tsx             # TanStack Router setup
│   ├── worker.ts              # Cloudflare Workers edge middleware (PostHog proxy)
│   ├── styles.css             # Global styles (Tailwind v4)
│   └── kanban.css             # Kanban demo styles
├── public/
│   ├── icon.svg               # App icon
│   ├── logo.png               # Logo
│   ├── og-image.png           # Open Graph image
│   ├── demo.gif               # Demo animation
│   ├── llms.txt               # AI search engine metadata
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # Robots file
│   ├── sitemap.xml            # Sitemap
│   ├── text23.svg             # Text logo (dark)
│   └── text23-light.svg       # Text logo (light)
├── docs/
│   └── index.md               # Documentation
├── index.html                 # HTML entry (SEO, JSON-LD, meta tags)
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── biome.json                 # Biome linter/formatter config
├── tsr.config.json            # TanStack Router config
├── wrangler.jsonc             # Cloudflare Pages deployment config
└── package.json
```

## Documentation

For detailed documentation, architecture guide, and contribution instructions, see **[docs/index.md](docs/index.md)**.

## Author

**Sebastien Babas** — [@Tybass450](https://twitter.com/Tybass450)

## License

This project is licensed under the [BSD 2-Clause "Simplified" License](LICENSE).
