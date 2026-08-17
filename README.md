# Structure 

app/lauding-page/web/
├── index.html                          # HTML entry point (contains Umami analytics script)
├── package.json                        # Dependencies & scripts
├── vite.config.ts                      # Vite config (Tailwind, TanStack Router, React plugins)
├── vercel.json                         # Vercel SPA rewrites
├── tsconfig.json
├── tsr.config.json
├── public/
│   ├── icon.svg
│   ├── manifest.json
│   ├── robots.txt
│   └── text23.svg
└── src/
    ├── main.tsx                        # React entry point
    ├── router.tsx                      # TanStack Router setup
    ├── routeTree.gen.ts                # Auto-generated route tree
    ├── styles.css                      # Global styles (Tailwind + custom theme)
    ├── kanban.css                      # Kanban demo component styles
    ├── components/
    │   ├── FadeIn.tsx                  # Scroll-triggered fade-in animation wrapper
    │   ├── KanbanDemo.tsx              # Interactive Kanban board demo with animated cursor
    │   └── ThemeProvider.tsx            # Light theme provider (currently light-only)
    ├── i18n/
    │   ├── index.tsx                   # I18n context, provider, and useTranslation hook
    │   ├── en.json                     # English translations (56 keys)
    │   └── fr.json                     # French translations (56 keys)
    └── routes/
        ├── __root.tsx                  # Root layout (head meta, Google Fonts, ThemeProvider wrapper)
        ├── index.tsx                   # Main landing page (the "/" route)
        └── mentions-legales.tsx        # Legal notices page (the "/mentions-legales" route)

---
