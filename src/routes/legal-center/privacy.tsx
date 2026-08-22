import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalSection } from "../../components/legal-section";
import { LegalCenterBack } from "../../components/svg-icon";
import { createPageHead, SITE_URL } from "../../config/seo";
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
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl">
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
        <p className="text-[13px] text-muted-soft">{t("legal.center.lastUpdated")} : août 2026</p>
      </div>

      <p className="text-[15px] text-body leading-relaxed mb-10">{t("legal.privacy.intro")}</p>

      <div className="space-y-12">
        {/* Module 1 — Landing Page */}
        <section className="space-y-8">
          <h2 className="text-xl font-heading font-semibold tracking-tight">
            {t("legal.privacy.landingPage.title")}
          </h2>
          <p className="text-[14px] text-body leading-relaxed">{t("legal.privacy.landingPage.intro")}</p>

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
        <section className="space-y-8">
          <h2 className="text-xl font-heading font-semibold tracking-tight">
            {t("legal.privacy.demo.title")}
          </h2>
          <p className="text-[14px] text-body leading-relaxed">{t("legal.privacy.demo.intro")}</p>

          <div className="space-y-6">
            <h3 className="text-[14px] font-medium text-ink">{t("legal.privacy.demo.storage.title")}</h3>
            <LegalSection title={t("legal.privacy.demo.storage.local.title")}>
              <p>{t("legal.privacy.demo.storage.local.text")}</p>
            </LegalSection>
            <LegalSection title={t("legal.privacy.demo.storage.loss.title")}>
              <p>{t("legal.privacy.demo.storage.loss.text")}</p>
            </LegalSection>
          </div>

          <div className="space-y-6">
            <h3 className="text-[14px] font-medium text-ink">{t("legal.privacy.demo.warning.title")}</h3>
            <LegalSection title={t("legal.privacy.demo.warning.experimental.title")}>
              <p>{t("legal.privacy.demo.warning.experimental.text")}</p>
            </LegalSection>
            <LegalSection title={t("legal.privacy.demo.warning.professional.title")}>
              <p>{t("legal.privacy.demo.warning.professional.text")}</p>
            </LegalSection>
          </div>

          <LegalSection title={t("legal.privacy.demo.clause.title")}>
            <p>{t("legal.privacy.demo.clause.text")}</p>
          </LegalSection>
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
  );
}
