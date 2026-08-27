import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LegalChevronRight,
  LegalIconNotices,
  LegalIconPrivacy,
  LegalIconTerms,
} from "../../components/svg-icon";
import { createPageHead, SITE_URL } from "../../config/seo";
import { useTranslation } from "../../i18n";

const HUB_TITLE = "Legal Center - NuxiPro";
const HUB_DESCRIPTION =
  "Browse our privacy policy, terms of use, and legal notices for the NuxiPro landing page and demo.";
const HUB_URL = `${SITE_URL}/legal-center`;

export const Route = createFileRoute("/legal-center/")({
  head: () =>
    createPageHead({
      title: HUB_TITLE,
      description: HUB_DESCRIPTION,
      url: HUB_URL,
    }),
  component: LegalCenterHub,
});

const sections = [
  { to: "/legal-center/privacy" as const, key: "privacy", icon: <LegalIconPrivacy /> },
  { to: "/legal-center/cgu" as const, key: "cgu", icon: <LegalIconTerms /> },
  { to: "/legal-center/notices" as const, key: "notices", icon: <LegalIconNotices /> },
] as const;

function LegalCenterHub() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-heading font-semibold tracking-tight mb-3">
          {t("legal.center.title")}
        </h1>
        <p className="text-muted text-base max-w-2xl">{t("legal.center.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map(({ to, key, icon }) => (
          <Link
            key={key}
            to={to}
            className="group text-left p-6 rounded-xl border border-hairline bg-surface-card hover:bg-[#e8e2d8] hover:border-[#d6cec3] transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-hairline text-muted group-hover:text-teal group-hover:bg-teal/10 transition-all duration-200">
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[15px] font-medium text-ink mb-1.5 group-hover:text-ink transition-colors">
                  {t(`legal.${key}.title`)}
                </h2>
                <p className="text-[13px] text-muted-soft leading-relaxed">
                  {t(`legal.${key}.desc`)}
                </p>
              </div>
              <LegalChevronRight />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
