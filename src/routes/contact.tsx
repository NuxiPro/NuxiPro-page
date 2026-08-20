import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { createPageHead, SITE_NAME, SITE_URL } from "../config/seo";
import { useTranslation } from "../i18n";

const TITLE = "Contact - NuxiPro";
const DESCRIPTION =
  "Get in touch with the NuxiPro team. Questions, feedback, or support — we're here to help.";
const URL = `${SITE_URL}/contact`;

export const Route = createFileRoute("/contact")({
  head: () =>
    createPageHead({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      links: [
        { rel: "alternate", hreflang: "fr", href: `${SITE_URL}/fr/contact` },
        { rel: "alternate", hreflang: "en", href: `${SITE_URL}/en/contact` },
        { rel: "alternate", hreflang: "x-default", href: URL },
      ],
    }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@nuxipro.com",
      availableLanguage: ["English", "French"],
    },
    sameAs: ["https://github.com/NuxiPro", "https://x.com/Tybass450"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: URL,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#141413] font-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <div className="max-w-lg mx-auto py-16 px-4">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-heading font-semibold tracking-tight mb-2">
            {t("contact.title")}
          </h1>
          <p className="text-[15px] text-muted">{t("contact.subtitle")}</p>
        </div>

        <div className="space-y-4">
          <a
            href={`mailto:${t("contact.emailValue")}`}
            className="flex items-center gap-3 p-4 rounded-xl border border-hairline bg-surface-card hover:bg-[#e8e2d8] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <div className="text-[14px] font-medium text-ink">{t("contact.email")}</div>
              <div className="text-[13px] text-muted-soft">{t("contact.emailValue")}</div>
            </div>
          </a>

          <a
            href={`https://${t("contact.githubValue")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-hairline bg-surface-card hover:bg-[#e8e2d8] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <div className="text-[14px] font-medium text-ink">{t("contact.github")}</div>
              <div className="text-[13px] text-muted-soft">{t("contact.githubValue")}</div>
            </div>
          </a>

          <a
            href="https://x.com/Tybass450"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-hairline bg-surface-card hover:bg-[#e8e2d8] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div>
              <div className="text-[14px] font-medium text-ink">{t("contact.twitter")}</div>
              <div className="text-[13px] text-muted-soft">{t("contact.twitterValue")}</div>
            </div>
          </a>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="text-[13px] text-muted hover:text-ink transition-colors">
            {t("contact.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
