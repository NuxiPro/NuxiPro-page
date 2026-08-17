# Analyse Concurrentielle — NuxiPro

> Dernière mise à jour : 17 août 2026

## Sommaire

1. [Positionnement NuxiPro](#positionnement-nuxipro)
2. [Concurrents directs](#concurrents-directs)
3. [Concurrents open-source](#concurrents-open-source)
4. [Concurrents émergents](#concurrents-émmergents)
5. [Grands acteurs](#grands-acteurs)
6. [Matrice de positionnement](#matrice-de-positionnement)
7. [Avantages concurrentiels](#avantages-concurrentiels)
8. [Menaces et risques](#menaces-et-risques)
9. [Recommandations](#recommandations)

---

## Positionnement NuxiPro

**Kanban minimaliste, archivage auto, solo-first, cloud SaaS**

- **Cible** : Freelances, indépendants, solo founders
- **Problème résolu** : La colonne "Done" devient un cimetière de cartes. Aucun outil n'archive automatiquement les tâches terminées par défaut.
- **Différenciateur** : Archivage automatique natif (instantané ou basé sur le temps) — aucune configuration complexe requise.

---

## Concurrents directs

### Brisqi

| | Brisqi | NuxiPro |
|---|---|---|
| **Site** | https://brisqi.com | https://nuxipro.com |
| **Type** | Desktop app (offline-first) | Cloud SaaS |
| **Platform** | Windows, macOS, Linux | Web (tous navigateurs) |
| **Solo-first** | ✅ | ✅ |
| **Kanban** | ✅ | ✅ |
| **Archivage auto** | ❌ Manuel | ✅ Natif (instantané ou X jours) |
| **Prix** | Freemium ($5/mo sync mobile) | Freemium |
| **Open-source** | Non (propriétaire) | Non |
| **Data** | Locale (offline) | Cloud persistant |
| **Forces** | Offline, privacy, design élégant | Archivage auto, zero setup, cloud |
| **Faiblesses** | Pas de sync cloud gratuit, pas d'archivage auto | Pas encore de version cloud |

**Verdict** : Concurrent le plus proche en philosophy (minimaliste, solo, kanban) mais sans archivage automatique.

### Kanri

| | Kanri | NuxiPro |
|---|---|---|
| **Site** | https://www.kanriapp.com | https://nuxipro.com |
| **GitHub** | https://github.com/kanriapp/kanri | - |
| **Type** | Desktop app (offline) | Cloud SaaS |
| **Platform** | Windows, macOS, Linux (Tauri) | Web |
| **Solo-first** | ✅ | ✅ |
| **Kanban** | ✅ | ✅ |
| **Archivage auto** | ❌ | ✅ |
| **Prix** | Gratuit + open-source | Freemium |
| **Open-source** | ✅ | Non |
| **Data** | Locale | Cloud |
| **Forces** | Gratuit, offline, open-source | Archivage auto, cloud, simplicity |
| **Faiblesses** | Pas de sync cloud, pas d'archivage auto | Pas encore de version cloud |

**Verdict** : Gratuit et open-source mais manque d'archivage auto et de cloud sync.

### To To-Do

| | To To-Do | NuxiPro |
|---|---|---|
| **Site** | https://totodo.app | https://nuxipro.com |
| **Type** | Todo list minimaliste | Kanban minimaliste |
| **Platform** | Web, Desktop | Web |
| **Solo-first** | ✅ | ✅ |
| **Kanban** | ❌ (listes) | ✅ |
| **Archivage auto** | ❌ | ✅ |
| **Prix** | Freemium | Freemium |
| **Forces** | Ultra-minimaliste, featured XDA | Kanban + archivage auto |
| **Faiblesses** | Pas de Kanban, pas d'archivage | Pas encore de version cloud |

**Verdict** : Minimaliste mais c'est une todo list, pas un Kanban.

### Zero-Friction Tasks

| | Zero-Friction | NuxiPro |
|---|---|---|
| **Site** | https://zerofriction.app | https://nuxipro.com |
| **Type** | Todo app solo | Kanban solo |
| **Platform** | iPhone, Windows | Web |
| **Solo-first** | ✅ Par design | ✅ Par design |
| **Kanban** | ❌ (listes) | ✅ |
| **Archivage auto** | ❌ | ✅ |
| **Prix** | Gratuit | Freemium |
| **Forces** | "For individuals, not teams" | Kanban + archivage auto |
| **Faiblesses** | Pas de Kanban, pas d'archivage | Pas encore de version cloud |

**Verdict** : Même positionnement "solo-first" mais format liste, pas Kanban.

---

## Concurrents open-source

| Outil | GitHub ★ | Kanban | Solo | Archivage auto | Self-hosted | Différenciation vs NuxiPro |
|-------|---------|--------|------|---------------|-------------|---------------------------|
| **Kanboard** | 9.5k+ | ✅ | ⚠️ | ❌ (plugins) | ✅ PHP | Ultra-léger, mais pas d'archivage auto natif |
| **Planka** | 12k+ | ✅ | ⚠️ | ⚠️ (manuel) | ✅ Docker | Pour équipes, pas solo-first |
| **Focalboard** | 26k+ | ✅ | ⚠️ | ❌ | ✅ Docker | Alternative Notion/Trello, trop complet |
| **Wekan** | 12k+ | ✅ | ⚠️ | ❌ | ✅ Docker/Meteor | Classique, pas d'archivage auto |
| **Vikunja** | 5k+ | ✅ | ⚠️ | ❌ | ✅ Docker | Lists + Kanban, pas d'archivage auto |
| **Super Productivity** | 14k+ | ✅ | ✅ | ❌ | ✅ Docker | Desktop app, time tracking, trop complet |
| **Taiga** | 13k+ | ✅ | ❌ | ❌ | ✅ Docker | Pour équipes agile, pas solo |

**Gap** : Aucun open-source n'a d'archivage automatique natif comme NuxiPro.

---

## Concurrents émergents

> Outils non populaires, "dans le silence", mais potentiellement dangereux.

### ⭐ Microban — Menace élevée

| | Microban | NuxiPro |
|---|---|---|
| **Site** | https://microban.app | https://nuxipro.com |
| **Type** | Desktop app (local-first) | Cloud SaaS |
| **Kanban** | ✅ | ✅ |
| **Archivage auto** | ✅ **"Set columns to archive tasks after a number of days, or on a weekly schedule"** | ✅ |
| **Solo-first** | ✅ | ✅ |
| **Minimaliste** | ✅ Ultra | ✅ |
| **Prix** | $9.99 one-time (2 devices) | Freemium |
| **Data** | Locale SQLite | Cloud |
| **Open-source** | ❌ | ❌ |
| **Features** | SQLite local, backups auto, keyboard-friendly | Cloud sync, 2 modes d'archivage |

**⚠️ Menace élevée** : A exactement la même feature d'archivage auto (par jours ou hebdomadaire). Desktop app one-time purchase.

### ⭐ micro-kaiten — Menace élevée

| | micro-kaiten | NuxiPro |
|---|---|---|
| **GitHub** | https://github.com/umag/mk | - |
| **Type** | Self-hosted (Deno + SQLite) | Cloud SaaS |
| **Kanban** | ✅ (canvas spatial) | ✅ |
| **Archivage auto** | ✅ **"cards done ≥ 10 days auto-move to archive"** | ✅ |
| **Solo-first** | ✅ Single-user, no auth | ✅ |
| **Data** | Locale | Cloud |
| **Open-source** | ✅ | ❌ |

**⚠️ Menace** : A l'archivage auto (10 jours), open-source, self-hosted.

### ⭐ Kbn — Kanban pour devs

| | Kbn | NuxiPro |
|---|---|---|
| **Site** | https://kbn.me | https://nuxipro.com |
| **Type** | Web app | Cloud SaaS |
| **Kanban** | ✅ | ✅ |
| **Solo-first** | ✅ | ✅ |
| **Prix** | Freemium ($6-10/mo ou $39 one-time) | Freemium |
| **Features** | VS Code editor, Pomodoro, Vim nav | Archivage auto |

**Profil** : Cible les devs solo, keyboard-first, minimal.

### ⭐ Kaneo — "All you need. Nothing you don't."

| | Kaneo | NuxiPro |
|---|---|---|
| **Site** | https://kaneo.app | https://nuxipro.com |
| **GitHub** | https://github.com/usekaneo/kaneo | - |
| **Type** | Self-hosted / Cloud | Cloud SaaS |
| **Kanban** | ✅ | ✅ |
| **Archivage auto** | ❌ | ✅ |
| **Solo-first** | ⚠️ (pour teams aussi) | ✅ |
| **Prix** | Gratuit (self-hosted) / $40/yr (cloud personal) | Freemium |
| **Open-source** | ✅ MIT | ❌ |
| **Messaging** | "Minimal surface area. Maximum execution clarity" | "Minimalist Kanban with auto-archiving" |

**Profil** : Excellente philosophy "less is more", mais orienté teams et pas d'archivage auto.

### ⭐ Lemin Kanban

| | Lemin Kanban | NuxiPro |
|---|---|---|
| **Site** | https://leminkanban.de | https://nuxipro.com |
| **GitHub** | https://github.com/leminkozey/Lemin-Kanban | - |
| **Type** | Self-hosted (Next.js + SQLite) | Cloud SaaS |
| **Kanban** | ✅ | ✅ |
| **Archivage auto** | ❌ (archive manuelle) | ✅ |
| **Solo-first** | ✅ | ✅ |
| **Prix** | Gratuit | Freemium |
| **Open-source** | ✅ | ❌ |

**Profil** : Personnel, beau design, MCP server intégré, mais archivage manuel.

### ⭐ Signboard

| | Signboard | NuxiPro |
|---|---|---|
| **Site** | https://cdevroe.com/signboard | https://nuxipro.com |
| **Type** | Desktop app (local-first) | Cloud SaaS |
| **Kanban** | ✅ (+ Table + Planner) | ✅ |
| **Archivage auto** | ❌ | ✅ |
| **Solo-first** | ✅ | ✅ |
| **Prix** | Gratuit (personal) / $49 (commercial) | Freemium |
| **Open-source** | ✅ | ❌ |
| **Data** | Markdown files | Cloud |

**Profil** : Open source, local-first, markdown-based, mais pas d'archivage auto.

### ⭐ Zoro — Apple only, solo-first

| | Zoro | NuxiPro |
|---|---|---|
| **Site** | https://www.getzoro.app | https://nuxipro.com |
| **Type** | Mobile/Desktop (Apple only) | Cloud SaaS |
| **Kanban** | ✅ | ✅ |
| **Archivage auto** | ❌ (strikethrough + Done) | ✅ |
| **Solo-first** | ✅ **"Zoro is single-player on purpose"** | ✅ |
| **Prix** | Gratuit / $59.99 one-time | Freemium |
| **Data** | iCloud only | Cloud |

**Profil** : Ultra solo-first, Apple only, pas de Kanban auto-archive.

### ⭐ TaskCanvas

| | TaskCanvas | NuxiPro |
|---|---|---|
| **Site** | https://taskcanvas.app | https://nuxipro.com |
| **Type** | Web app (local-first) | Cloud SaaS |
| **Kanban** | ✅ (sur canvas libre) | ✅ |
| **Archivage auto** | ❌ | ✅ |
| **Solo-first** | ✅ | ✅ |
| **Prix** | Gratuit / $4.99/mo (premium) | Freemium |
| **Data** | IndexedDB local | Cloud |

**Profil** : Concept unique (canvas libre), mais pas d'archivage auto.

### ⭐ Kanbaroo

| | Kanbaroo | NuxiPro |
|---|---|---|
| **Site** | https://kanbaroo.co.uk | https://nuxipro.com |
| **Type** | Web/Mobile app (local-first) | Cloud SaaS |
| **Kanban** | ✅ | ✅ |
| **Archivage auto** | ❌ | ✅ |
| **Solo-first** | ✅ | ✅ |
| **Prix** | Gratuit | Freemium |
| **Data** | IndexedDB / local files | Cloud |

**Profil** : Simple, offline-first, mais pas d'archivage auto.

---

## Grands acteurs

| Outil | Kanban | Solo | Archivage auto | Prix | Problème pour NuxiPro |
|-------|--------|------|---------------|------|----------------------|
| **Trello** | ✅ | ⚠️ | ❌ (Butler = config manuelle) | Freemium | Trop de features, archivage pas natif |
| **Todoist** | ❌ (listes) | ⚠️ | ❌ | Freemium | Pas de Kanban |
| **TickTick** | ✅ | ⚠️ | ❌ | Freemium | Trop de features (pomodoro, habits, etc.) |
| **Things 3** | ❌ (listes) | ✅ | ❌ (log) | ~60€ one-time | Mac only, pas de Kanban, pas d'archivage auto |
| **Asana** | ✅ | ❌ | ❌ | Freemium | Team-first |
| **Notion** | ✅ | ⚠️ | ❌ | Freemium | Trop complet, pas dédié aux tâches |

**Gap** : Les grands acteurs ont l'archivage manuel ou via automatisation complexe (Butler). Aucun n'a l'archivage auto natif par défaut.

---

## Matrice de positionnement

```
                    Minimaliste
                         │
    NuxiPro ★────────────┼─────── Brisqi
         │               │            │
   Archivage auto    Solo-first    Offline-first
         │               │            │
    Microban ★───────────┼─────── Kanri
    micro-kaiten ★       │            │
         │               │            │
                    Complexe        Open-source
```

---

## Avantages concurrentiels

| # | Avantage | Détail |
|---|----------|--------|
| 1 | **Archivage auto natif** | Aucun concurrent cloud n'a ça par défaut |
| 2 | **Solo-first par design** | Pas de features d'équipe qui encombrent |
| 3 | **Cloud SaaS** | Pas de self-hosting requis, multi-device natif |
| 4 | **One-time choice** | 2 modes d'archivage (instantané ou X jours), pas de config complexe |
| 5 | **Pas de features inutiles** | Ni pomodoro, ni habits, ni time tracking |
| 6 | **Pas de vendor lock-in** | Archivées restent accessibles |
| 7 | **Zéro installation** | Accessible depuis n'importe quel navigateur |
| 8 | **Zéro bidouillage** | L'open-source ne veut pas dire gratuit — ça veut dire "bidouiller soi-même". NuxiPro = ça marche, point. |

### L'avantage "SaaS vs Open-source"

> **L'open-source ne veut pas dire gratuit. Ça veut dire bidouiller.**

Les concurrents open-source (Kaneo, micro-kaiten, Lemin Kanban, etc.) sont "gratuits" sur le papier, mais en réalité :

| | Open-source (self-hosted) | NuxiPro (SaaS) |
|---|---|---|
| **Coût initial** | Gratuit | Freemium |
| **Installation** | Docker, CLI, config serveur | Ouvrir un navigateur |
| **Maintenance** | Mises à jour manuelles, sécurité serveur | Tout est géré |
| **Support** | Community Discord, pas de garantie | Email support |
| **Sync multi-device** | À configurer soi-même (WebDAV, etc.) | Natif |
| **Uptime** | Dépend de soi | 99.9% géré |
| **Courbe d'apprentissage** | DevOps basics requis | Aucune |
| **Time-to-value** | Minutes à heures | Secondes |

**Le vrai coût de l'open-source** : Ce n'est pas l'argent, c'est le **temps**. Un freelance qui passe 2h à installer et configurer Kanboard a perdu 2h de facturation. NuxiPro = 0 de setup, il bosse directement.

---

## Menaces et risques

| Menace | Niveau | Détail | Contre-mesure |
|--------|--------|--------|---------------|
| **Microban ajoute le cloud** | 🔴 Élevé | Microban a l'archivage auto mais est desktop-only | NuxiPro = SaaS, zéro installation, cloud natif |
| **micro-kaiten devient SaaS** | 🔴 Élevé | A l'archivage auto, open-source | Self-hosted = bidouiller, pas pour les non-devs |
| **Brisqi ajoute l'archivage auto** | 🟠 Moyen | Concurrent le plus proche en philosophy | Brisqi = desktop only, pas de cloud |
| **Kaneo ajoute l'archivage auto** | 🟠 Moyen | Excellente philosophy, open-source | Kaneo = orienté teams, self-hosted = bidouiller |
| **Trello améliore Butler** | 🟠 Moyen | Butler pourrait devenir natif | Trello = trop complexe, pas solo-first |
| **Kanboard/Planka ajoutent archivage** | 🟡 Faible | Communauté open-source lente | Self-hosted = bidouiller, pas SaaS |

### Le vrai bouclier : SaaS > Open-source pour les non-devs

Les outils open-source sont une menace **sur le papier** seulement. En pratique :

- **Kaneo** : "Gratuit" mais il faut Docker, un serveur, des mises à jour → pas pour un freelance qui veut bosser
- **micro-kaiten** : "Gratuit" mais Deno + SQLite + self-hosted → niche dev
- **Kanboard** : "Gratuit" mais PHP + MySQL + config serveur → archaïque
- **Planka** : "Gratuit" mais Docker + config OAuth → complexe

**NuxiPro = 0 friction**. Ouvrir le navigateur → bosser. C'est l'avantage ultime du SaaS.

---

## Recommandations

1. **Message clé** : "Seul outil Kanban cloud avec archivage automatique natif pour solo"
2. **Distinguer** : Brisqi (offline, pas d'archivage auto) vs NuxiPro (cloud, archivage auto)
3. **Surveiller** : Microban et micro-kaiten (ont déjà l'archivage auto)
4. **Cibler** : Les utilisateurs de Trello qui galèrent avec le "Done" column graveyard
5. **Eviter** : Se comparer aux todo lists (Todoist, Things) — NuxiPro est un Kanban
6. **Positionner** : Cloud SaaS avec archivage auto = pas besoin d'installer quoi que ce soit
7. **Insister** : "L'open-source ne veut pas dire gratuit. Ça veut dire bidouiller." NuxiPro = ça marche, point.
