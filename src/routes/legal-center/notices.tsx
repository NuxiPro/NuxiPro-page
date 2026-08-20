import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalSection } from "../../components/legal-section";
import { LegalCenterBack } from "../../components/svg-icon";
import { createPageHead, SITE_URL } from "../../config/seo";
import { useTranslation } from "../../i18n";

const TITLE = "Legal Notices - NuxiPro";
const DESCRIPTION = "Publisher information, hosting, and intellectual property.";
const URL = `${SITE_URL}/legal-center/notices`;

export const Route = createFileRoute("/legal-center/notices")({
  head: () =>
    createPageHead({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
    }),
  component: NoticesPage,
});

function NoticesPage() {
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
          {t("legal.notices.title")}
        </h1>
        <p className="text-[13px] text-muted-soft">{t("legal.center.lastUpdated")} : août 2026</p>
      </div>

      <p className="text-[15px] text-body leading-relaxed mb-10">{t("legal.notices.intro")}</p>

      <div className="space-y-10">
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

        <LegalSection title={t("legal.notices.ip.title")}>
          <p>{t("legal.notices.ip.text")}</p>
        </LegalSection>

        <LegalSection title={t("legal.notices.contact.title")}>
          <p>{t("legal.notices.contact.text")}</p>
        </LegalSection>
      </div>
    </div>
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
