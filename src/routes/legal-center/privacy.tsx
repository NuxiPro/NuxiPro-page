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

      <div className="space-y-10">
        <LegalSection title={t("legal.privacy.data.title")}>
          <p>{t("legal.privacy.data.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.privacy.noSell.title")}>
          <p>{t("legal.privacy.noSell.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.privacy.storage.title")}>
          <p>{t("legal.privacy.storage.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.privacy.cookies.title")}>
          <p>{t("legal.privacy.cookies.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.privacy.analytics.title")}>
          <p>{t("legal.privacy.analytics.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.privacy.session.title")}>
          <p>{t("legal.privacy.session.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.privacy.rights.title")}>
          <p>{t("legal.privacy.rights.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.privacy.disclaimer.title")}>
          <p>{t("legal.privacy.disclaimer.text")}</p>
        </LegalSection>
      </div>
    </div>
  );
}
