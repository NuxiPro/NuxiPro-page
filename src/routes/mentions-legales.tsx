import { createFileRoute } from "@tanstack/react-router";
import {
  BulletItem,
  LegalHeading,
  LegalList,
  LegalSubHeading,
  LegalText,
} from "../components/legal";
import { Navbar } from "../components/Navbar";
import { createPageHead, SITE_URL } from "../config/seo";
import { useSectionTracking } from "../hooks/useSectionTracking";
import { useTranslation } from "../i18n";

const LEGAL_TITLE = "Legal Notice - NuxiPro";
const LEGAL_DESCRIPTION =
  "Legal notice and terms of service for NuxiPro, the minimalist personal task manager with automatic archiving.";
const LEGAL_URL = `${SITE_URL}/mentions-legales`;

export const Route = createFileRoute("/mentions-legales")({
  head: () =>
    createPageHead({
      title: LEGAL_TITLE,
      description: LEGAL_DESCRIPTION,
      url: LEGAL_URL,
      extraMeta: [{ name: "robots", content: "noindex, nofollow" }],
    }),
  component: MentionsLegales,
});

function MentionsLegales() {
  const { t } = useTranslation();

  useSectionTracking({ sectionId: "legal-content", threshold: 0.3 });

  return (
    <div className="min-h-screen bg-canvas text-ink font-body">
      <Navbar />
      <div id="legal-content" className="max-w-[640px] mx-auto px-6 pt-10 pb-16">
        <a href="/" className="text-muted hover:text-ink text-sm transition-colors duration-150">
          &larr; {t("legal.back")}
        </a>

        <h1 className="font-heading text-[28px] font-normal mt-[60px] mb-10">{t("legal.title")}</h1>

        <div className="bg-[#fef3cd] border border-[#ffc107] rounded-lg p-4 mb-10">
          <p className="text-[14px] leading-[1.7] text-[#856404]">{t("legal.important")}</p>
        </div>

        <section className="mb-8">
          <LegalHeading>{t("legal.editor.title")}</LegalHeading>
          <LegalText className="mb-4">{t("legal.editor.p1")}</LegalText>
          <LegalList className="mb-4">
            <li>
              <strong>{t("legal.editor.name")}</strong> {t("legal.editor.nameValue")}
            </li>
            <li>
              <strong>{t("legal.editor.contact")}</strong>{" "}
              <a
                href={`mailto:${t("legal.editor.contactValue")}`}
                className="text-teal hover:underline"
              >
                {t("legal.editor.contactValue")}
              </a>
            </li>
          </LegalList>
          <p className="text-[14px] leading-[1.8] text-muted italic">{t("legal.editor.note")}</p>
        </section>

        <section className="mb-8">
          <LegalHeading>{t("legal.host.title")}</LegalHeading>
          <LegalText className="mb-4">{t("legal.host.p1")}</LegalText>
          <LegalList className="mb-4">
            <li>
              <strong>{t("legal.host.name")}</strong> {t("legal.host.nameValue")}
            </li>
            <li>
              <strong>{t("legal.host.address")}</strong> {t("legal.host.addressValue")}
            </li>
            <li>
              <strong>{t("legal.host.contact")}</strong>{" "}
              <a
                href={t("legal.host.contactValue")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:underline"
              >
                {t("legal.host.contactValue")}
              </a>
            </li>
          </LegalList>
        </section>

        <section className="mb-8">
          <LegalHeading>{t("legal.ip.title")}</LegalHeading>
          <LegalText>{t("legal.ip.text")}</LegalText>
        </section>

        <section className="mb-8">
          <LegalHeading>{t("legal.responsability.title")}</LegalHeading>
          <LegalText className="mb-4">{t("legal.responsability.intro")}</LegalText>
          <div className="space-y-4">
            <div>
              <LegalSubHeading className="mb-1">
                {t("legal.responsability.storage.title")}
              </LegalSubHeading>
              <LegalText>{t("legal.responsability.storage.text")}</LegalText>
            </div>
            <div>
              <LegalSubHeading className="mb-1">
                {t("legal.responsability.guarantee.title")}
              </LegalSubHeading>
              <LegalText>{t("legal.responsability.guarantee.text")}</LegalText>
            </div>
            <div>
              <LegalSubHeading className="mb-1">
                {t("legal.responsability.usage.title")}
              </LegalSubHeading>
              <LegalText>{t("legal.responsability.usage.text")}</LegalText>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <LegalHeading>{t("legal.privacy.title")}</LegalHeading>
          <LegalText className="mb-4">{t("legal.privacy.intro")}</LegalText>
          <LegalList>
            <BulletItem>{t("legal.privacy.tracking")}</BulletItem>
            <BulletItem>{t("legal.privacy.data")}</BulletItem>
            <BulletItem>{t("legal.privacy.local")}</BulletItem>
          </LegalList>
        </section>

        <section className="mb-8">
          <LegalHeading>{t("legal.dataProtection.title")}</LegalHeading>
          <div className="space-y-4">
            <div>
              <LegalSubHeading className="mb-2">
                {t("legal.dataProtection.analytics.title")}
              </LegalSubHeading>
              <LegalText className="mb-2">{t("legal.dataProtection.analytics.intro")}</LegalText>
              <LegalList className="mb-4">
                <BulletItem>{t("legal.dataProtection.analytics.privacy")}</BulletItem>
                <BulletItem>{t("legal.dataProtection.analytics.retention")}</BulletItem>
              </LegalList>
              <h4 className="font-medium text-ink text-[14px] mb-2">
                {t("legal.dataProtection.session.title")}
              </h4>
              <LegalText className="mb-2">{t("legal.dataProtection.session.intro")}</LegalText>
              <LegalList>
                <BulletItem>{t("legal.dataProtection.session.masking")}</BulletItem>
                <BulletItem>{t("legal.dataProtection.session.retention")}</BulletItem>
              </LegalList>
            </div>
            <div>
              <LegalSubHeading className="mb-2">
                {t("legal.dataProtection.newsletter.title")}
              </LegalSubHeading>
              <LegalText className="mb-2">{t("legal.dataProtection.newsletter.intro")}</LegalText>
              <LegalList>
                <BulletItem>{t("legal.dataProtection.newsletter.tool")}</BulletItem>
                <BulletItem>{t("legal.dataProtection.newsletter.noresale")}</BulletItem>
                <BulletItem>
                  <span>
                    {t("legal.dataProtection.newsletter.unsubscribe")}{" "}
                    <a
                      href={`mailto:${t("legal.dataProtection.newsletter.unsubscribe.email")}`}
                      className="text-teal hover:underline"
                    >
                      {t("legal.dataProtection.newsletter.unsubscribe.email")}
                    </a>
                    {t("legal.dataProtection.newsletter.unsubscribe.end")}
                  </span>
                </BulletItem>
              </LegalList>
            </div>
            <div>
              <LegalSubHeading className="mb-2">
                {t("legal.dataProtection.rights.title")}
              </LegalSubHeading>
              <LegalText>{t("legal.dataProtection.rights.text")}</LegalText>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
