export const SITE_URL = "https://nuxipro.com";
export const SITE_NAME = "NuxiPro";
export const SITE_TITLE = "NuxiPro - Your workspace cleans itself";
export const SITE_DESCRIPTION =
  "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.";
export const SITE_IMAGE = `${SITE_URL}/og-image.png`;

export function createPageHead({
  title,
  description,
  url,
  links = [],
}: {
  title: string;
  description: string;
  url: string;
  links?: readonly object[];
}) {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }, ...links],
  };
}
