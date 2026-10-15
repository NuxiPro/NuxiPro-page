export const SITE_URL = "https://nuxipro.com";
export const SITE_NAME = "NuxiPro";
// IMPORTANT: must stay 1:1 with <title> in index.html to avoid JS hydration overwriting SEO title (anti-overwriting)
export const SITE_TITLE = "NuxiPro – Automated task archiving for your Kanban workspace";
export const SITE_DESCRIPTION =
  "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.";
export const SITE_IMAGE = `${SITE_URL}/og-image.png`;
export const TWITTER_CREATOR = "@Tybass450";

// Demo — single source of truth for JSON-LD (Offer/hasPart/sameAs/relatedLink)
export const DEMO_URL = "https://demo.nuxipro.com/";
export const DEMO_URL_CANONICAL = "https://demo.nuxipro.com";
export const SOFTWARE_VERSION = "1.0.0";
export const ORG_EMAIL = "contact@nuxipro.com";
export const ORG_LOGO = `${SITE_URL}/logo.png`;

// Disambiguation — critical for Google/Bing brand understanding (GEO/AEO)
export const SOFTWARE_DISAMBIGUATING_DESCRIPTION =
  "NuxiPro is a SaaS software application for personal Kanban task management with automatic archiving of completed tasks. Not affiliated with Nuxt, Nuxt Pro, Nexi, or any chemical or industrial product. NuxiPro runs in any modern web browser as a BusinessApplication.";

export function createPageHead({
  title,
  description,
  url,
  links = [],
  extraMeta = [],
  canonical = true,
}: {
  title: string;
  description: string;
  url: string;
  links?: readonly object[];
  extraMeta?: readonly object[];
  canonical?: boolean;
}) {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Sebastien Babas" },
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: SITE_IMAGE },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: TWITTER_CREATOR },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: SITE_IMAGE },
      ...extraMeta,
    ],
    links: [...(canonical ? [{ rel: "canonical", href: url }] : []), ...links],
  };
}
