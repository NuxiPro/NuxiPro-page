export const SITE_URL = "https://nuxipro.com";
export const SITE_NAME = "NuxiPro";
export const SITE_TITLE = "NuxiPro - Your workspace cleans itself";
export const SITE_DESCRIPTION =
  "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.";
export const SITE_IMAGE = `${SITE_URL}/og-image.png`;

export const OG_BASE = [
  { property: "og:type", content: "website" },
  { property: "og:title", content: SITE_TITLE },
  { property: "og:description", content: SITE_DESCRIPTION },
  { property: "og:image", content: SITE_IMAGE },
  { property: "og:url", content: `${SITE_URL}/` },
  { property: "og:site_name", content: SITE_NAME },
  { property: "og:locale", content: "en_US" },
] as const;

export const TWITTER_BASE = [
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: SITE_TITLE },
  { name: "twitter:description", content: SITE_DESCRIPTION },
  { name: "twitter:image", content: SITE_IMAGE },
] as const;

export const HREFLANG_DEFAULT = [
  { rel: "alternate", hreflang: "fr", href: `${SITE_URL}/fr` },
  { rel: "alternate", hreflang: "en", href: `${SITE_URL}/en` },
  { rel: "alternate", hreflang: "x-default", href: `${SITE_URL}/` },
] as const;

export const FONTS_LINKS = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400;500;600&display=swap",
  },
] as const;

export const BASE_META = [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "robots", content: "index, follow" },
] as const;

export function createPageHead({
  title,
  description,
  url,
  extraMeta = [],
  links = [],
}: {
  title: string;
  description: string;
  url: string;
  extraMeta?: readonly object[];
  links?: readonly object[];
}) {
  return {
    meta: [
      ...BASE_META,
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      ...extraMeta,
    ],
    links: [{ rel: "canonical", href: url }, ...links],
  };
}
