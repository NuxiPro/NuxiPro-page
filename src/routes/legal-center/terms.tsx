import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalSection } from "../../components/legal-section";
import { LegalCenterBack } from "../../components/svg-icon";
import { createPageHead, SITE_URL } from "../../config/seo";
import { useTranslation } from "../../i18n";

const TITLE = "Terms of Use - NuxiPro";
const DESCRIPTION = "Terms and conditions for using NuxiPro.";
const URL = `${SITE_URL}/legal-center/terms`;

export const Route = createFileRoute("/legal-center/terms")({
  head: () =>
    createPageHead({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
    }),
  component: TermsPage,
});

function TermsPage() {
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
          {t("legal.terms.title")}
        </h1>
        <p className="text-[13px] text-muted-soft">{t("legal.center.lastUpdated")} : août 2026</p>
      </div>

      <p className="text-[15px] text-body leading-relaxed mb-10">{t("legal.terms.intro")}</p>

      <div className="space-y-10">
        <LegalSection title={t("legal.terms.demo.title")}>
          <p>{t("legal.terms.demo.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.terms.storage.title")}>
          <p>{t("legal.terms.storage.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.terms.responsability.title")}>
          <p>{t("legal.terms.responsability.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.terms.ip.title")}>
          <p>{t("legal.terms.ip.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.terms.availability.title")}>
          <p>{t("legal.terms.availability.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.terms.jurisdiction.title")}>
          <p>{t("legal.terms.jurisdiction.text")}</p>
        </LegalSection>
      </div>
    </div>
  );
}
