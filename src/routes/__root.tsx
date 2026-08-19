import { PostHogProvider } from "@posthog/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  createPageHead,
  FONTS_LINKS,
  HREFLANG_DEFAULT,
  OG_BASE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_BASE,
} from "../config/seo";
import { I18nProvider, useTranslation } from "../i18n";
import appCss from "../styles.css?url";
import { CookieBanner } from "#/components/Banner";

const posthogKey = //import.meta.env.DEV
  //? undefined

  /*:*/ (import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN as string | undefined);
const posthogHost = // import.meta.env.DEV
// ? undefined
  /* :*/ (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined);

export const Route = createRootRoute({
  head: () =>
    createPageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      extraMeta: [
        { name: "theme-color", content: "#000000" },
        { name: "application-name", content: SITE_NAME },
        ...OG_BASE,
        ...TWITTER_BASE,
      ],
      links: [
        { rel: "manifest", href: "/manifest.json" },
        ...HREFLANG_DEFAULT,
        ...FONTS_LINKS,
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/svg+xml", href: "/icon.svg" },
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

  const content = <Outlet />;

  return (
    <>
      {posthogKey ? (
        <PostHogProvider
          apiKey={posthogKey}
          options={{
            api_host: "/nuxi-data/x",
            ui_host: posthogHost || "https://eu.posthog.com",
            defaults: "2026-01-30",
            capture_exceptions: true,
            debug: false,
            opt_out_capturing_by_default: true,
            session_recording: {
              maskAllInputs: true,
            },
          }}
        >
          {content}
        </PostHogProvider>
      ) : (
        content
      )}
      <CookieBanner />
    </>
  );
}
