import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LegalSection } from "../../components/legal-section";
import { LegalCenterBack } from "../../components/svg-icon";
import { createPageHead, SITE_NAME, SITE_URL } from "../../config/seo";
import { useTranslation } from "../../i18n";

const TITLE = "Legal Notices - NuxiPro";
const DESCRIPTION =
  "Legal notices for NuxiPro — publisher Sébastien Babas, hosting by Cloudflare and Infomaniak, sub-processors, and intellectual property details.";
const URL = `${SITE_URL}/legal-center/notices`;

export const Route = createFileRoute("/legal-center/notices")({
  head: () =>
    createPageHead({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      links: [
        { rel: "alternate", hreflang: "fr", href: `${SITE_URL}/fr/legal-center/notices` },
        { rel: "alternate", hreflang: "en", href: `${SITE_URL}/en/legal-center/notices` },
        { rel: "alternate", hreflang: "x-default", href: URL },
      ],
    }),
  component: NoticesPage,
});

function NoticesPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState("publisher");
  useEffect(() => {
    const ids = ["publisher", "hosting"];
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
    "@type": "LegalService",
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    inLanguage: "en",
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
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
              {t("legal.notices.title")}
            </h1>
            <p className="text-[13px] text-muted-soft">
              {t("legal.center.lastUpdated")} : août 2026
            </p>
          </div>

          <p className="text-[15px] text-body leading-relaxed mb-10">{t("legal.notices.intro")}</p>

          {/* Mobile — 2 entrées seulement */}
          <nav className="flex lg:hidden gap-2 mb-8">
            <a
              href="#publisher"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${active === "publisher" ? "bg-ink text-white border-ink shadow-sm font-medium" : "bg-white border-hairline text-muted hover:text-ink"}`}
            >
              {t("legal.notices.publisher.title")}
            </a>
            <a
              href="#hosting"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${active === "hosting" ? "bg-ink text-white border-ink shadow-sm font-medium" : "bg-white border-hairline text-muted hover:text-ink"}`}
            >
              {t("legal.notices.hosting.title")}
            </a>
          </nav>

          <div className="space-y-12">
            {/* Module 1 — Éditeur */}
            <section id="publisher" className="space-y-8 scroll-mt-24">
              <h2 className="text-xl font-heading font-semibold tracking-tight">
                {t("legal.notices.publisher.title")}
              </h2>

              <LegalSection title={t("legal.notices.publisher.title")}>
                <div className="space-y-2">
                  <InfoRow
                    label={t("legal.notices.publisher.name.label")}
                    value={t("legal.notices.publisher.name.value")}
                  />
                  <InfoRow
                    label={t("legal.notices.publisher.contact.label")}
                    value={t("legal.notices.publisher.contact.value")}
                    href={`mailto:${t("legal.notices.publisher.contact.value")}`}
                  />
                </div>
              </LegalSection>
            </section>

            {/* Module 2 — Hébergement */}
            <section id="hosting" className="space-y-8 scroll-mt-24">
              <h2 className="text-xl font-heading font-semibold tracking-tight">
                {t("legal.notices.hosting.title")}
              </h2>

              <LegalSection title={t("legal.notices.hosting.title")}>
                <div className="space-y-2">
                  <InfoRow
                    label={t("legal.notices.hosting.provider.label")}
                    value={t("legal.notices.hosting.provider.value")}
                  />
                  <InfoRow
                    label={t("legal.notices.hosting.address.label")}
                    value={t("legal.notices.hosting.address.value")}
                  />
                  <InfoRow
                    label={t("legal.notices.hosting.contact.label")}
                    value={t("legal.notices.hosting.contact.value")}
                    href={t("legal.notices.hosting.contact.value")}
                  />
                </div>
              </LegalSection>
            </section>

            {/* Hors modules — éléments duplicables */}
            <section className="space-y-8 pt-8 border-t border-hairline">
              <LegalSection title={t("legal.notices.subcontractors.title")}>
                <p className="mb-4">{t("legal.notices.subcontractors.text")}</p>
                <div className="overflow-hidden rounded-xl border border-hairline bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-zinc-50 border-b border-hairline">
                        <tr className="text-muted-soft">
                          <th className="px-4 py-2.5 font-medium whitespace-nowrap">
                            {t("legal.notices.subcontractors.headers.provider")}
                          </th>
                          <th className="px-4 py-2.5 font-medium whitespace-nowrap">
                            {t("legal.notices.subcontractors.headers.service")}
                          </th>
                          <th className="px-4 py-2.5 font-medium whitespace-nowrap">
                            {t("legal.notices.subcontractors.headers.purpose")}
                          </th>
                          <th className="px-4 py-2.5 font-medium whitespace-nowrap">
                            {t("legal.notices.subcontractors.headers.location")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline">
                        <tr>
                          <td className="px-4 py-3 font-medium text-ink">
                            {t("legal.notices.subcontractors.infomaniak.name")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.infomaniak.service")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.infomaniak.purpose")}
                          </td>
                          <td className="px-4 py-3 text-muted whitespace-nowrap">
                            {t("legal.notices.subcontractors.infomaniak.location")}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-ink">
                            {t("legal.notices.subcontractors.cloudflare.name")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.cloudflare.service")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.cloudflare.purpose")}
                          </td>
                          <td className="px-4 py-3 text-muted whitespace-nowrap">
                            {t("legal.notices.subcontractors.cloudflare.location")}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-ink">
                            {t("legal.notices.subcontractors.render.name")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.render.service")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.render.purpose")}
                          </td>
                          <td className="px-4 py-3 text-muted whitespace-nowrap">
                            {t("legal.notices.subcontractors.render.location")}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-ink">
                            {t("legal.notices.subcontractors.posthog.name")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.posthog.service")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.posthog.purpose")}
                          </td>
                          <td className="px-4 py-3 text-muted whitespace-nowrap">
                            {t("legal.notices.subcontractors.posthog.location")}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-ink">
                            {t("legal.notices.subcontractors.plunk.name")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.plunk.service")}
                          </td>
                          <td className="px-4 py-3 text-body">
                            {t("legal.notices.subcontractors.plunk.purpose")}
                          </td>
                          <td className="px-4 py-3 text-muted whitespace-nowrap">
                            {t("legal.notices.subcontractors.plunk.location")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="px-4 py-2.5 text-[11px] text-muted-soft bg-zinc-50 border-t border-hairline">
                    {t("legal.notices.subcontractors.note")}
                  </p>
                </div>
              </LegalSection>

              <LegalSection title={t("legal.notices.ip.title")}>
                <p>{t("legal.notices.ip.text")}</p>
              </LegalSection>

              <LegalSection title={t("legal.notices.contact.title")}>
                <p>
                  {t("legal.notices.contact.text").split("contact@nuxipro.com")[0]}
                  <a
                    href="mailto:contact@nuxipro.com"
                    className="text-teal hover:text-teal-hover underline"
                  >
                    contact@nuxipro.com
                  </a>
                  {t("legal.notices.contact.text").split("contact@nuxipro.com")[1] ?? ""}
                </p>
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
                  href="#publisher"
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors ${active === "publisher" ? "bg-white text-ink font-medium shadow-sm border border-hairline" : "text-muted hover:text-ink"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${active === "publisher" ? "bg-teal" : "bg-teal/50"}`}
                  />
                  {t("legal.notices.publisher.title")}
                </a>
              </li>
              <li>
                <a
                  href="#hosting"
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors ${active === "hosting" ? "bg-white text-ink font-medium shadow-sm border border-hairline" : "text-muted hover:text-ink"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${active === "hosting" ? "bg-teal" : "bg-teal/50"}`}
                  />
                  {t("legal.notices.hosting.title")}
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <span className="text-[13px] text-muted-soft w-20 flex-shrink-0">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] text-teal hover:text-teal-hover transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-[14px] text-ink">{value}</span>
      )}
    </div>
  );
}
