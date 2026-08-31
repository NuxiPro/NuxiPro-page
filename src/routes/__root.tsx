import { PostHogProvider } from "@posthog/react";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { PostHog } from "posthog-js";
import { useEffect, useRef, useState } from "react";
import { CookieBanner } from "#/components/Banner";
import {
  createPageHead,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_CREATOR,
} from "../config/seo";
import { I18nProvider, useTranslation } from "../i18n";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () =>
    createPageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      links: [
        { rel: "manifest", href: "/manifest.json" },
        { rel: "alternate", hrefLang: "fr", href: `${SITE_URL}/fr` },
        { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en` },
        { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400;500;600&display=swap",
        },
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/svg+xml", href: "/icon.svg" },
      ],
    }),
  component: RootComponent,
  notFoundComponent: () => <div>Page not found</div>,
});

// SSR shell - lisible pour crawlers et IA (HeadContent + Scripts obligatoires pour Start)
function RootComponent() {
  return (
    <html lang="en" className="light">
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nProvider>
          <App />
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  const { locale } = useTranslation();
  const [posthogClient, setPosthogClient] = useState<PostHog | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const posthogInitRef = useRef(false);

  useEffect(() => {
    const token = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN as string | undefined;
    const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined;

    if (!token) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(
          "VITE_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured.",
        );
      }
      return;
    }

    const initPostHog = () => {
      if (posthogInitRef.current) return;
      posthogInitRef.current = true;
      import("posthog-js").then((m) => {
        m.default.init(token, {
          api_host: "/ingest",
          ui_host: host || "https://eu.posthog.com",
          defaults: "2026-06-25",
          capture_exceptions: true,
          disable_session_recording: true,
          debug: false,
          session_recording: { maskAllInputs: true },
        });
        setPosthogClient(m.default);
      });
    };

    const consent = localStorage.getItem("nuxipro_cookie_consent");
    const hasConsent =
      consent === "accepted" ||
      consent === "partial" ||
      localStorage.getItem("nuxipro_cookie_analytics") === "true";

    if (hasConsent) {
      initPostHog();
    }

    window.addEventListener("posthog-consent-given", initPostHog);
    return () => window.removeEventListener("posthog-consent-given", initPostHog);
  }, []);

  const content = (
    <>
      <Outlet />
      <CookieBanner />
    </>
  );

  return (
    <>
      {posthogClient ? (
        <PostHogProvider client={posthogClient}>{content}</PostHogProvider>
      ) : (
        content
      )}

      {/* Global structured data — SEO/AEO/GEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
              inLanguage: "en",
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: SITE_NAME,
              alternateName: ["NuxiPro Software", "NuxiPro Kanban"],
              identifier: SITE_URL,
              url: `${SITE_URL}/`,
              logo: `${SITE_URL}/logo.png`,
              email: "contact@nuxipro.com",
              description:
                "NuxiPro is a software company building minimalist productivity tools for personal Kanban task management.",
              founder: { "@type": "Person", name: "Sébastien Babas" },
              sameAs: [
                "https://twitter.com/Tybass450",
                "https://github.com/NuxiPro",
                "https://www.producthunt.com/products/nuxipro",
                "https://center.nuxipro.com",
              ],
            },
            {
              "@type": "SoftwareApplication",
              "@id": `${SITE_URL}/#software`,
              name: SITE_NAME,
              url: `${SITE_URL}/`,
              applicationCategory: "BusinessApplication",
              applicationSubCategory: "Task Management Software",
              operatingSystem: "All (Web Browser)",
              softwareVersion: "1.0",
              description:
                "NuxiPro is a minimalist personal Kanban task manager with automatic archiving. It cleans your board by archiving completed tasks so you never have to.",
              screenshot: SITE_IMAGE,
              keywords:
                "NuxiPro Kanban, NuxiPro task manager, automatic task archiving, minimalist to-do list, personal kanban, single-user productivity",
              datePublished: "2026-01-01",
              dateModified: "2026-08-31",
              isSimilarTo: ["https://todoist.com", "https://trello.com", "https://ticktick.com"],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                url: "https://demo.nuxipro.com",
                description: "Free interactive demo — no account required",
              },
              author: { "@type": "Person", name: "Sébastien Babas" },
              publisher: { "@id": `${SITE_URL}/#organization` },
              audience: {
                "@type": "Audience",
                audienceType: "Developers, Solo Founders, Freelancers, Independent Workers",
              },
              featureList: [
                "Automatic task archiving from Done column",
                "Automated Kanban board cleanup",
                "Single-user and personal focus",
                "Zero visual clutter and zero manual friction",
                "No team or collaboration overhead",
                "No useless features — focus on what matters",
                "Quick start — ready to use from day one",
                "Interactive live demo without registration",
              ],
            },
            {
              "@type": "Blog",
              "@id": "https://center.nuxipro.com/#blog",
              name: "NuxiPro Center — Blog & Documentation",
              description:
                "Founder's journal: building NuxiPro in public. Product updates, sovereignty & compliance, technical decisions, and the solo-founder journey from idea to launch.",
              url: "https://center.nuxipro.com/",
              publisher: { "@id": `${SITE_URL}/#organization` },
              author: {
                "@type": "Person",
                name: "Sébastien Babas",
                url: "https://github.com/sbabas",
              },
              inLanguage: "en",
              blogPost: [
                {
                  "@type": "BlogPosting",
                  headline: "Sovereignty & Compliance",
                  description:
                    "GDPR compliance roadmap before NuxiPro Cloud: document data storage and sub-processors, centralize legal hub on landing page, implement consent traceability — building a sovereign, privacy-respecting minimalist alternative to Trello.",
                  url: "https://center.nuxipro.com/blog/sovereignty-and-compliance/",
                  datePublished: "2026-08-28",
                  author: { "@type": "Person", name: "Sébastien Babas" },
                },
                {
                  "@type": "BlogPosting",
                  headline: "Introducing NuxiPro",
                  description:
                    "What NuxiPro is, the problem it solves, how automatic archiving works, demo vs cloud comparison, and what NuxiPro Cloud will offer.",
                  url: "https://center.nuxipro.com/blog/introducing-nuxipro/",
                  datePublished: "2026-08-19",
                  author: { "@type": "Person", name: "Sébastien Babas" },
                },
              ],
            },
            {
              "@type": "WebPage",
              "@id": "https://center.nuxipro.com/#docs",
              name: "NuxiPro Cloud — Documentation",
              description:
                "Technical documentation and guides for NuxiPro Cloud — the minimalist personal Kanban task manager with automatic archiving. Currently under development.",
              url: "https://center.nuxipro.com/guides/first-page/",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              about: { "@id": `${SITE_URL}/#software` },
              inLanguage: "en",
            },
          ],
        }).replace(/</g, "\\u003c")}
      </script>
    </>
  );
}
