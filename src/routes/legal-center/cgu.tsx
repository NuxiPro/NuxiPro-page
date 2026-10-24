import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LegalBrief } from "../../components/legal-brief";
import { LegalSection } from "../../components/legal-section";
import { LegalCenterBack } from "../../components/svg-icon";
import { createPageHead, SITE_NAME, SITE_URL } from "../../config/seo";
import { useTranslation } from "../../i18n";

const TITLE = "Terms of Use - NuxiPro";
const DESCRIPTION =
  "Detailed terms and conditions for using NuxiPro landing page and demo — storage, liability, and intellectual property. Learn more about our service rules.";
const URL = `${SITE_URL}/legal-center/cgu/`;

export const Route = createFileRoute("/legal-center/cgu")({
  head: () =>
    createPageHead({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      extraMeta: [
        {
          name: "keywords",
          content:
            "NuxiPro terms of use, legal terms, storage, liability, intellectual property, disclaimer",
        },
      ],
    }),
  component: CguPage,
});

function CguPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState("demo");
  useEffect(() => {
    const ids = ["demo", "responsabilite", "droit"];
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
    "@type": "TermsOfService",
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    inLanguage: "en",
  } as const;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Legal Center", item: `${SITE_URL}/legal-center/` },
      { "@type": "ListItem", position: 3, name: "Terms of Use", item: URL },
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
              {t("legal.cgu.title")}
            </h1>
            <p className="text-[13px] text-muted-soft">
              {t("legal.center.lastUpdated")} : août 2026
            </p>
          </div>

          <p className="text-[15px] text-body leading-relaxed mb-5">{t("legal.cgu.intro")}</p>

          <LegalBrief
            items={[
              t("legal.cgu.inshort.s1"),
              t("legal.cgu.inshort.s2"),
              t("legal.cgu.inshort.s3"),
              t("legal.cgu.inshort.s4"),
            ]}
          />

          {/* Mobile — 3 entrées */}
          <nav className="flex lg:hidden gap-2 mb-8">
            <a
              href="#demo"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${active === "demo" ? "bg-ink text-white border-ink shadow-sm font-medium" : "bg-white border-hairline text-muted hover:text-ink"}`}
            >
              {t("legal.cgu.demo.title")}
            </a>
            <a
              href="#responsabilite"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${active === "responsabilite" ? "bg-ink text-white border-ink shadow-sm font-medium" : "bg-white border-hairline text-muted hover:text-ink"}`}
            >
              {t("legal.cgu.responsability.title")}
            </a>
            <a
              href="#droit"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${active === "droit" ? "bg-ink text-white border-ink shadow-sm font-medium" : "bg-white border-hairline text-muted hover:text-ink"}`}
            >
              {t("legal.cgu.jurisdiction.title")}
            </a>
          </nav>

          <div className="space-y-12">
            {/* Module 1 — Démo */}
            <section id="demo" className="space-y-8 scroll-mt-24">
              <h2 className="text-xl font-heading font-semibold tracking-tight">
                {t("legal.cgu.demo.title")}
              </h2>
              <p className="text-[14px] text-body leading-relaxed">{t("legal.cgu.demo.text")}</p>

              <div id="storage" className="scroll-mt-24">
                <LegalSection title={t("legal.cgu.storage.title")}>
                  <p>{t("legal.cgu.storage.text")}</p>
                </LegalSection>
              </div>
            </section>

            {/* Module 2 — Responsabilité */}
            <section id="responsabilite" className="space-y-8 scroll-mt-24">
              <h2 className="text-xl font-heading font-semibold tracking-tight">
                {t("legal.cgu.responsability.title")}
              </h2>
              <p className="text-[14px] text-body leading-relaxed">
                {t("legal.cgu.responsability.text")}
              </p>
            </section>

            {/* Module 3 — Licence & droit */}
            <section id="droit" className="space-y-8 pt-8 border-t border-hairline">
              <LegalSection title={t("legal.cgu.ip.title")}>
                <div id="ip" className="scroll-mt-24">
                  <p>{t("legal.cgu.ip.text")}</p>
                </div>
              </LegalSection>

              <LegalSection title={t("legal.cgu.jurisdiction.title")}>
                <div id="jurisdiction" className="scroll-mt-24">
                  <p>{t("legal.cgu.jurisdiction.text")}</p>
                </div>
              </LegalSection>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
