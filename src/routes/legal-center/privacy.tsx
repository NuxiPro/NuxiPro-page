import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LegalSection } from "../../components/legal-section";
import { LegalCenterBack } from "../../components/svg-icon";
import { createPageHead, SITE_NAME, SITE_URL } from "../../config/seo";
import { useTranslation } from "../../i18n";

const TITLE = "Privacy Policy - NuxiPro";
const DESCRIPTION = "How we collect, use, and protect your personal data.";
const URL = `${SITE_URL}/legal-center/privacy`;

export const Route = createFileRoute("/legal-center/privacy")({
  head: () =>
    createPageHead({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      links: [
        { rel: "alternate", hreflang: "fr", href: `${SITE_URL}/fr/legal-center/privacy` },
        { rel: "alternate", hreflang: "en", href: `${SITE_URL}/en/legal-center/privacy` },
        { rel: "alternate", hreflang: "x-default", href: URL },
      ],
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState("landing");
  useEffect(() => {
    const ids = ["landing", "demo"];
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
    "@type": "PrivacyPolicy",
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
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
              {t("legal.privacy.title")}
            </h1>
            <p className="text-[13px] text-muted-soft">
              {t("legal.center.lastUpdated")} : août 2026
            </p>
          </div>

          <p className="text-[15px] text-body leading-relaxed mb-10">{t("legal.privacy.intro")}</p>

          {/* Mobile — 2 entrées seulement */}
          <nav className="flex lg:hidden gap-2 mb-8">
            <a
              href="#landing"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${active === "landing" ? "bg-ink text-white border-ink shadow-sm font-medium" : "bg-white border-hairline text-muted hover:text-ink"}`}
            >
              {t("legal.privacy.landingPage.title")}
            </a>
            <a
              href="#demo"
              className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${active === "demo" ? "bg-ink text-white border-ink shadow-sm font-medium" : "bg-white border-hairline text-muted hover:text-ink"}`}
            >
              {t("legal.privacy.demo.title")}
            </a>
          </nav>

          <div className="space-y-12">
            {/* Module 1 — Landing Page */}
            <section id="landing" className="space-y-8 scroll-mt-24">
              <h2 className="text-xl font-heading font-semibold tracking-tight">
                {t("legal.privacy.landingPage.title")}
              </h2>
              <p className="text-[14px] text-body leading-relaxed">
                {t("legal.privacy.landingPage.intro")}
              </p>

              <LegalSection title={t("legal.privacy.landingPage.tools.title")}>
                <div className="space-y-2">
                  <p>{t("legal.privacy.landingPage.tools.text")}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>{t("legal.privacy.landingPage.tools.survol.title")} :</strong>{" "}
                      {t("legal.privacy.landingPage.tools.survol.text")}
                    </li>
                    <li>
                      <strong>{t("legal.privacy.landingPage.tools.conversion.title")} :</strong>{" "}
                      {t("legal.privacy.landingPage.tools.conversion.text")}
                    </li>
                    <li>
                      <strong>{t("legal.privacy.landingPage.tools.recording.title")} :</strong>{" "}
                      {t("legal.privacy.landingPage.tools.recording.text")}
                    </li>
                  </ul>
                </div>
              </LegalSection>

              <LegalSection title={t("legal.privacy.landingPage.protection.title")}>
                <p>{t("legal.privacy.landingPage.protection.text")}</p>
              </LegalSection>

              <LegalSection title={t("legal.privacy.landingPage.cookies.title")}>
                <p>{t("legal.privacy.landingPage.cookies.text")}</p>
              </LegalSection>
            </section>

            {/* Module 2 — Démo Interactive */}
            <section id="demo" className="space-y-8 scroll-mt-24">
              <h2 className="text-xl font-heading font-semibold tracking-tight">
                {t("legal.privacy.demo.title")}
              </h2>
              <p className="text-[14px] text-body leading-relaxed">
                {t("legal.privacy.demo.intro")}
              </p>

              <div className="space-y-6">
                <h3 className="text-[14px] font-medium text-ink">
                  {t("legal.privacy.demo.storage.title")}
                </h3>
                <LegalSection title={t("legal.privacy.demo.storage.local.title")}>
                  <p>{t("legal.privacy.demo.storage.local.text")}</p>
                </LegalSection>
                <LegalSection title={t("legal.privacy.demo.storage.loss.title")}>
                  <p>{t("legal.privacy.demo.storage.loss.text")}</p>
                </LegalSection>
              </div>

              <div className="space-y-6">
                <h3 className="text-[14px] font-medium text-ink">
                  {t("legal.privacy.demo.warning.title")}
                </h3>
                <LegalSection title={t("legal.privacy.demo.warning.experimental.title")}>
                  <p>{t("legal.privacy.demo.warning.experimental.text")}</p>
                </LegalSection>
                <LegalSection title={t("legal.privacy.demo.warning.professional.title")}>
                  <p>{t("legal.privacy.demo.warning.professional.text")}</p>
                </LegalSection>
              </div>
            </section>

            {/* Hors modules — éléments duplicables */}
            <section className="space-y-8 pt-8 border-t border-hairline">
              <LegalSection title={t("legal.privacy.noSell.title")}>
                <p>{t("legal.privacy.noSell.text")}</p>
              </LegalSection>

              <LegalSection title={t("legal.privacy.rights.title")}>
                <p>{t("legal.privacy.rights.text")}</p>
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
                  href="#landing"
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors ${active === "landing" ? "bg-white text-ink font-medium shadow-sm border border-hairline" : "text-muted hover:text-ink"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${active === "landing" ? "bg-teal" : "bg-teal/50"}`}
                  />
                  {t("legal.privacy.landingPage.title")}
                </a>
              </li>
              <li>
                <a
                  href="#demo"
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors ${active === "demo" ? "bg-white text-ink font-medium shadow-sm border border-hairline" : "text-muted hover:text-ink"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${active === "demo" ? "bg-teal" : "bg-teal/50"}`}
                  />
                  {t("legal.privacy.demo.title")}
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
