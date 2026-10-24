import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LegalSection } from "../../components/legal-section";
import { LegalCenterBack } from "../../components/svg-icon";
import { createPageHead, SITE_NAME, SITE_URL } from "../../config/seo";
import { useTranslation } from "../../i18n";

const TITLE = "Cookie Policy - NuxiPro";
const DESCRIPTION =
  "Cookie Policy for NuxiPro — cookieless audience measurement (PostHog server hash, Cloudflare Web Analytics), what is stored and what is not, Do Not Track opt-out, and how to manage your preferences.";
const URL = `${SITE_URL}/legal-center/cookies/`;

export const Route = createFileRoute("/legal-center/cookies")({
  head: () =>
    createPageHead({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      extraMeta: [
        {
          name: "keywords",
          content:
            "NuxiPro cookie policy, cookies, PostHog, Cloudflare Web Analytics, cookieless, Do Not Track, localStorage, GDPR",
        },
      ],
    }),
  component: CookiesPage,
});

const COOKIE_TABLE_ROWS = [
  {
    nameKey: "banner.posthog",
    purposeKey: "banner.posthogPurpose",
    durationKey: "banner.posthogDuration",
  },
] as const;

function CookiesPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState("cookies");
  useEffect(() => {
    const ids = ["cookies", "preferences"];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    inLanguage: "en",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Legal Center", item: `${SITE_URL}/legal-center/` },
      { "@type": "ListItem", position: 3, name: "Cookie Policy", item: URL },
    ],
  } as const;

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c")}
      </script>
      <div className="flex gap-12">
        <div className="flex-1 max-w-2xl min-w-0">
          <div className="mb-8">
            <Link
              to="/legal-center"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink mb-4 transition-colors"
            >
              <LegalCenterBack />
              {t("legal.center.title")}
            </Link>
            <h1 className="text-2xl font-heading font-semibold tracking-tight mb-2">
              {t("legal.cookies.title")}
            </h1>
            <p className="text-[13px] text-muted-soft">
              {t("legal.center.lastUpdated")} : October 2026
            </p>
          </div>

          <p className="text-[15px] text-body leading-relaxed mb-10">{t("legal.cookies.p1")}</p>

          {/* Mobile — 2 entrées seulement */}
          <nav className="flex lg:hidden gap-2 mb-8">
            <a
              href="#cookies"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${active === "cookies" ? "bg-ink text-white border-ink shadow-sm font-medium" : "bg-white border-hairline text-muted hover:text-ink"}`}
            >
              {t("banner.cookiesUsed")}
            </a>
            <a
              href="#preferences"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${active === "preferences" ? "bg-ink text-white border-ink shadow-sm font-medium" : "bg-white border-hairline text-muted hover:text-ink"}`}
            >
              {t("legal.cookies.manage.title")}
            </a>
          </nav>

          <div className="space-y-12">
            {/* Module 1 — Cookies utilisés (contenu ex-mini-page) */}
            <section id="cookies" className="space-y-8 scroll-mt-24">
              <h2 className="text-xl font-heading font-semibold tracking-tight">
                {t("banner.cookiesUsed")}
              </h2>

              <LegalSection title={t("banner.cookiesUsed")}>
                <div className="overflow-hidden rounded-xl border border-hairline bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-zinc-50 border-b border-hairline">
                        <tr className="text-muted-soft">
                          <th className="px-4 py-2.5 font-medium whitespace-nowrap">
                            {t("banner.cookieCol")}
                          </th>
                          <th className="px-4 py-2.5 font-medium whitespace-nowrap">
                            {t("banner.purposeCol")}
                          </th>
                          <th className="px-4 py-2.5 font-medium whitespace-nowrap">
                            {t("banner.durationCol")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline">
                        {COOKIE_TABLE_ROWS.map((row) => (
                          <tr key={row.nameKey}>
                            <td className="px-4 py-3 font-medium text-ink">{t(row.nameKey)}</td>
                            <td className="px-4 py-3 text-body">{t(row.purposeKey)}</td>
                            <td className="px-4 py-3 text-muted whitespace-nowrap">
                              {t(row.durationKey)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </LegalSection>

              <LegalSection title={t("banner.dataCollected")}>
                <p>{t("banner.dataCollectedText")}</p>
              </LegalSection>

              <LegalSection title={t("legal.cookies.exempt.title")}>
                <p>{t("legal.cookies.exempt.text")}</p>
              </LegalSection>

              <LegalSection title={t("legal.cookies.types.title")}>
                <div className="space-y-2">
                  <p>
                    <strong>{t("legal.cookies.storage.localStorage.title")} :</strong>{" "}
                    {t("legal.cookies.storage.localStorage.desc")}
                  </p>
                </div>
              </LegalSection>
            </section>

            {/* Module 2 — Préférences */}
            <section id="preferences" className="space-y-8 scroll-mt-24">
              <h2 className="text-xl font-heading font-semibold tracking-tight">
                {t("legal.cookies.manage.title")}
              </h2>
              <p className="text-[14px] text-body leading-relaxed">
                {t("legal.cookies.manage.text")}
              </p>

              <LegalSection title={t("banner.rights")}>
                <p>{t("banner.rightsText")}</p>
              </LegalSection>
            </section>

            {/* Hors modules — démo */}
            <section className="space-y-8 pt-8 border-t border-hairline">
              <LegalSection title={t("legal.cookies.demo.title")}>
                <p>{t("legal.cookies.demo.text")}</p>
              </LegalSection>
            </section>
          </div>
        </div>

        {/* Sidebar droite premium — 2 entrées seulement */}
        <aside className="hidden lg:block w-[200px] shrink-0">
          <nav className="sticky top-24 rounded-2xl border border-hairline bg-white/60 backdrop-blur p-5">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-soft mb-4">
              Sommaire
            </p>
            <ul className="space-y-1 text-[13px] leading-none">
              <li>
                <a
                  href="#cookies"
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors ${active === "cookies" ? "bg-white text-ink font-medium shadow-sm border border-hairline" : "text-muted hover:text-ink"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${active === "cookies" ? "bg-teal" : "bg-teal/50"}`}
                  />
                  {t("banner.cookiesUsed")}
                </a>
              </li>
              <li>
                <a
                  href="#preferences"
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors ${active === "preferences" ? "bg-white text-ink font-medium shadow-sm border border-hairline" : "text-muted hover:text-ink"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${active === "preferences" ? "bg-teal" : "bg-teal/50"}`}
                  />
                  {t("legal.cookies.manage.title")}
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
