export const SITE_URL = "https://nuxipro.com";
export const SITE_NAME = "NuxiPro";
export const SITE_TITLE = "NuxiPro - Your workspace cleans itself";
export const SITE_DESCRIPTION =
  "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.";
export const SITE_IMAGE = `${SITE_URL}/og-image.png`;
export const TWITTER_CREATOR = "@Tybass450";

export function createPageHead({
  title,
  description,
  url,
  links = [],
  extraMeta = [],
}: {
  title: string;
  description: string;
  url: string;
  links?: readonly object[];
  extraMeta?: readonly object[];
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
    links: [{ rel: "canonical", href: url }, ...links],
  };
}
