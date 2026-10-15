import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { SITE_URL } from "../src/config/seo";

const ROOT = resolve(import.meta.dirname ?? ".", "..");
const ROUTES_DIR = join(ROOT, "src", "routes");

type Page = { loc: string; lastmod: string; changefreq: string; priority: string };

function toISODate(mtimeMs: number): string {
  return new Date(mtimeMs).toISOString().slice(0, 10);
}

function priorityFor(depth: number): string {
  return Math.max(0.3, 1 - depth * 0.3).toFixed(1);
}

// Lit le chemin declare dans createFileRoute('...').
// Retourne null si le fichier n'est pas une URL : __root (createRootRoute
// sans argument), helper/test colocalise, layout pathless (_...) ou
// route dynamique ($...) non enumerable dans un sitemap.
function routePathOf(file: string): string | null {
  const src = readFileSync(file, "utf-8");
  const match = src.match(/createFileRoute\(\s*["'`]([^"'`]+)["'`]\s*\)/);
  if (!match) return null;
  const segments = match[1].split("/").filter(Boolean);
  if (segments.some((s) => s.startsWith("_") || s.startsWith("$"))) return null;
  return `/${segments.join("/")}`;
}

// Toutes les URLs de src/routes, sans exception ni intervention :
// chaque fichier avec createFileRoute('...') apparait automatiquement.
// Les doublons (layout + index sur le meme chemin) sont fusionnes en
// gardant le lastmod le plus recent.
export function collectPages(): Page[] {
  const mtimes = new Map<string, number>();
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.name.endsWith(".tsx")) continue;
      const urlPath = routePathOf(full);
      if (!urlPath) continue;
      const mtime = statSync(full).mtimeMs;
      if (!mtimes.has(urlPath) || mtimes.get(urlPath)! < mtime) mtimes.set(urlPath, mtime);
    }
  };
  walk(ROUTES_DIR);
  return [...mtimes.entries()]
    .map(([urlPath, mtime]) => {
      const depth = urlPath === "/" ? 0 : urlPath.split("/").length - 1;
      // Forme canonique : AVEC trailing slash (sauf "/"), identique aux
      // balises canonical/og:url emises par createPageHead.
      const canonicalPath = urlPath === "/" ? "/" : `${urlPath}/`;
      return {
        loc: `${SITE_URL}${canonicalPath}`,
        lastmod: toISODate(mtime),
        changefreq: "monthly",
        priority: priorityFor(depth),
      };
    })
    .sort((a, b) => a.loc.localeCompare(b.loc));
}

export function buildSitemapXml(): string {
  const urls = collectPages()
    .map(
      (p) =>
        `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// Genere public/sitemap.xml avant le build (voir script "prebuild").
// Vite le copie ensuite dans dist/client. Une seule source de verite :
// les routes. Ajouter une page = elle apparait au prochain deploy,
// sans edition manuelle, sans risque d'URL 404 dans le sitemap.
if (import.meta.main) {
  mkdirSync(join(ROOT, "public"), { recursive: true });
  writeFileSync(join(ROOT, "public", "sitemap.xml"), buildSitemapXml());
  console.log(`[sitemap] public/sitemap.xml genere (${collectPages().length} URLs)`);
}
