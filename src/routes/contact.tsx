import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { IconGitHub, MailIcon, XTwitterIcon } from "../components/svg-icon";
import { createPageHead, SITE_NAME, SITE_URL } from "../config/seo";
import { useTranslation } from "../i18n";

const TITLE = "Contact NuxiPro — Support & Feedback";
const DESCRIPTION =
  "Contact the NuxiPro team for questions, feedback, or support. Reach us by email, GitHub, or X — we reply quickly and are here to help you succeed.";
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
    address: { "@type": "PostalAddress", addressCountry: "FR" },
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
      <script type="application/ld+json">
        {JSON.stringify(contactPageSchema).replace(/</g, "\\u003c")}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema).replace(/</g, "\\u003c")}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c")}
      </script>

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
              <MailIcon />
            </div>
            <div>
              <div className="text-[14px] font-medium text-ink">
                {t("contact.email")}
              </div>
              <div className="text-[13px] text-muted-soft">
                {t("contact.emailValue")}
              </div>
            </div>
          </a>

          <a
            href={`https://${t("contact.githubValue")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-hairline bg-surface-card hover:bg-[#e8e2d8] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0">
              <IconGitHub />
            </div>
            <div>
              <div className="text-[14px] font-medium text-ink">
                {t("contact.github")}
              </div>
              <div className="text-[13px] text-muted-soft">
                {t("contact.githubValue")}
              </div>
            </div>
          </a>

          <a
            href="https://x.com/Tybass450"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-hairline bg-surface-card hover:bg-[#e8e2d8] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0">
              <XTwitterIcon />
            </div>
            <div>
              <div className="text-[14px] font-medium text-ink">
                {t("contact.twitter")}
              </div>
              <div className="text-[13px] text-muted-soft">
                {t("contact.twitterValue")}
              </div>
            </div>
          </a>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-[13px] text-muted hover:text-ink transition-colors"
          >
            {t("contact.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
