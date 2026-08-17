import { PostHogProvider } from "@posthog/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { I18nProvider, useTranslation } from "../i18n";
import appCss from "../styles.css?url";

const posthogKey = import.meta.env.DEV
  ? undefined
  : (import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN as
      | string
      | undefined);
const posthogHost = import.meta.env.DEV
  ? undefined
  : (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined);



export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NuxiPro - Your workspace cleans itself" },
      {
        name: "description",
        content:
          "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#000000" },
      { name: "application-name", content: "NuxiPro" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "NuxiPro - Your workspace cleans itself" },
      {
        property: "og:description",
        content:
          "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.",
      },
      { property: "og:image", content: "https://nuxipro.com/og-image.png" },
      { property: "og:url", content: "https://nuxipro.com/" },
      { property: "og:site_name", content: "NuxiPro" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NuxiPro - Your workspace cleans itself" },
      {
        name: "twitter:description",
        content:
          "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.",
      },
      { name: "twitter:image", content: "https://nuxipro.com/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://nuxipro.com/" },
      { rel: "manifest", href: "/manifest.json" },
      {
        rel: "alternate",
        hreflang: "fr",
        href: "https://nuxipro.com/fr",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://nuxipro.com/en",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://nuxipro.com/",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/icon.svg",
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: () => <div>Page not found</div>,
});

function RootLayout() {
  return (
    <I18nProvider>
      <RootLayoutInner />
    </I18nProvider>
  );
}

function RootLayoutInner() {
  const { locale } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const content = (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );

  if (!posthogKey) return content;

  return (
    <PostHogProvider
      apiKey={posthogKey}
      options={{
        api_host: "/nuxi-data/x",
        ui_host: posthogHost || "https://eu.posthog.com",
        defaults: "2026-01-30",
        capture_exceptions: true,
        debug: false,
        session_recording: {
          maskAllInputs: true,
        },
      }}
    >
      {content}
    </PostHogProvider>
  );
}
