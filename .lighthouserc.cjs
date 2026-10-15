// Audit Lighthouse des pages prerendues (dist/client), sans serveur :
// LHCI sert le dossier en statique et audite les 8 URLs du sitemap.
// Stockage local uniquement (filesystem) : aucun envoi vers des serveurs
// tiers, sortie ignoree par git (.lighthouseci/).
const PATHS = [
  "",
  "faq",
  "contact",
  "legal-center",
  "legal-center/privacy",
  "legal-center/cgu",
  "legal-center/notices",
  "legal-center/cookies",
];

module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist/client",
      url: PATHS.map((p) => `http://localhost/${p}`),
      numberOfRuns: 1,
      settings: { chromeFlags: ["--no-sandbox", "--headless"] },
    },
    assert: {
      assertions: {
        // Indexation : bloque le build si une page est non-200 ou mal referecencee SEO.
        "http-status-code": ["error", {}],
        "categories:seo": ["error", { minScore: 0.9 }],
        // Qualite : avertit sans bloquer (scores variables en local).
        "categories:accessibility": ["warn", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:performance": ["warn", { minScore: 0.7 }],
      },
    },
    upload: { target: "filesystem", outputDir: "./.lighthouseci" },
  },
};
