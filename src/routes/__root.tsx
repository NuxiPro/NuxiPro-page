import { PostHogProvider } from "@posthog/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { CookieBanner } from "#/components/Banner";
import {
  createPageHead,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "../config/seo";
import { I18nProvider, useTranslation } from "../i18n";
import appCss from "../styles.css?url";

import posthog from "posthog-js";

if (typeof window !== "undefined") {
  const token = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN as string | undefined;
  const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined;
  const consent = localStorage.getItem("nuxipro_cookie_consent");
  const analyticsConsent = localStorage.getItem("nuxipro_cookie_analytics");
  const hasConsent = consent === "accepted" || consent === "partial" || analyticsConsent === "true";

  if (!token) {
    if (import.meta.env.DEV) {
      console.error(
        "VITE_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured.",
      );
    }
  } else if (hasConsent) {
    posthog.init(token, {
      api_host: "/ingest",
      ui_host: host || "https://eu.posthog.com",
      defaults: "2026-06-25",
      capture_exceptions: true,
      disable_session_recording: true,
      debug: false,
      session_recording: {
        maskAllInputs: true,
      },
    });
  }
}

export const Route = createRootRoute({
  head: () =>
    createPageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      links: [
        { rel: "manifest", href: "/manifest.json" },
        { rel: "alternate", hreflang: "fr", href: `${SITE_URL}/fr` },
        { rel: "alternate", hreflang: "en", href: `${SITE_URL}/en` },
        { rel: "alternate", hreflang: "x-default", href: `${SITE_URL}/` },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400;500;600&display=swap",
        },
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
      <PostHogProvider client={posthog}>
        {content}
      </PostHogProvider>
      <CookieBanner />

      {/* Global SEO meta (OG + Twitter) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            image: SITE_IMAGE,
          }),
        }}
      />
    </>
  );
}
