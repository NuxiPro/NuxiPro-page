import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { useSectionTracking } from "../hooks/useSectionTracking";
import { useTranslation } from "../i18n/index.tsx";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Legal Notice - NuxiPro" },
      {
        name: "description",
        content:
          "Legal notice and terms of service for NuxiPro, the minimalist personal task manager with automatic archiving.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "og:title", content: "Legal Notice - NuxiPro" },
      {
        name: "og:description",
        content:
          "Legal notice and terms of service for NuxiPro, the minimalist personal task manager with automatic archiving.",
      },
      { name: "og:url", content: "https://nuxipro.com/mentions-legales" },
    ],
    links: [
      { rel: "canonical", href: "https://nuxipro.com/mentions-legales" },
    ],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  const { t } = useTranslation();

  useSectionTracking({ sectionId: "legal-content", threshold: 0.3 });

  return (
    <div className="min-h-screen bg-canvas text-ink font-body">
      <Navbar />
      <div
        id="legal-content"
        className="max-w-[640px] mx-auto px-6 pt-10 pb-16"
      >
        <a
          href="/"
          className="text-muted hover:text-ink text-sm transition-colors duration-150"
        >
          &larr; {t("legal.back")}
        </a>

        <h1 className="font-heading text-[28px] font-normal mt-[60px] mb-10">
          {t("legal.title")}
        </h1>

        <div className="bg-[#fef3cd] border border-[#ffc107] rounded-lg p-4 mb-10">
          <p className="text-[14px] leading-[1.7] text-[#856404]">
            {t("legal.important")}
          </p>
        </div>

        <section className="mb-8">
          <h2 className="font-heading text-[20px] font-medium text-ink mb-4">
            {t("legal.editor.title")}
          </h2>
          <p className="text-[15px] leading-[1.8] text-body mb-4">
            {t("legal.editor.p1")}
          </p>
          <ul className="list-none space-y-2 text-[15px] leading-[1.8] text-body mb-4">
            <li>
              <strong>{t("legal.editor.name")}</strong>{" "}
              {t("legal.editor.nameValue")}
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
          </ul>
          <p className="text-[14px] leading-[1.8] text-muted italic">
            {t("legal.editor.note")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-[20px] font-medium text-ink mb-4">
            {t("legal.host.title")}
          </h2>
          <p className="text-[15px] leading-[1.8] text-body mb-4">
            {t("legal.host.p1")}
          </p>
          <ul className="list-none space-y-2 text-[15px] leading-[1.8] text-body mb-4">
            <li>
              <strong>{t("legal.host.name")}</strong>{" "}
              {t("legal.host.nameValue")}
            </li>
            <li>
              <strong>{t("legal.host.address")}</strong>{" "}
              {t("legal.host.addressValue")}
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
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-[20px] font-medium text-ink mb-4">
            {t("legal.ip.title")}
          </h2>
          <p className="text-[15px] leading-[1.8] text-body">
            {t("legal.ip.text")}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-[20px] font-medium text-ink mb-4">
            {t("legal.responsability.title")}
          </h2>
          <p className="text-[15px] leading-[1.8] text-body mb-4">
            {t("legal.responsability.intro")}
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-ink text-[15px] mb-1">
                {t("legal.responsability.storage.title")}
              </h3>
              <p className="text-[15px] leading-[1.8] text-body">
                {t("legal.responsability.storage.text")}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-ink text-[15px] mb-1">
                {t("legal.responsability.guarantee.title")}
              </h3>
              <p className="text-[15px] leading-[1.8] text-body">
                {t("legal.responsability.guarantee.text")}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-ink text-[15px] mb-1">
                {t("legal.responsability.usage.title")}
              </h3>
              <p className="text-[15px] leading-[1.8] text-body">
                {t("legal.responsability.usage.text")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-[20px] font-medium text-ink mb-4">
            {t("legal.privacy.title")}
          </h2>
          <p className="text-[15px] leading-[1.8] text-body mb-4">
            {t("legal.privacy.intro")}
          </p>
          <ul className="list-none space-y-2 text-[15px] leading-[1.8] text-body">
            <li className="flex items-start gap-2">
              <span className="text-teal mt-1">•</span>
              {t("legal.privacy.tracking")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal mt-1">•</span>
              {t("legal.privacy.data")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal mt-1">•</span>
              {t("legal.privacy.local")}
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-[20px] font-medium text-ink mb-4">
            {t("legal.dataProtection.title")}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-ink text-[15px] mb-2">
                {t("legal.dataProtection.analytics.title")}
              </h3>
              <p className="text-[15px] leading-[1.8] text-body mb-2">
                {t("legal.dataProtection.analytics.intro")}
              </p>
              <ul className="list-none space-y-2 text-[15px] leading-[1.8] text-body mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  {t("legal.dataProtection.analytics.privacy")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  {t("legal.dataProtection.analytics.retention")}
                </li>
              </ul>
              <h4 className="font-medium text-ink text-[14px] mb-2">
                {t("legal.dataProtection.session.title")}
              </h4>
              <p className="text-[15px] leading-[1.8] text-body mb-2">
                {t("legal.dataProtection.session.intro")}
              </p>
              <ul className="list-none space-y-2 text-[15px] leading-[1.8] text-body">
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  {t("legal.dataProtection.session.masking")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  {t("legal.dataProtection.session.retention")}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-ink text-[15px] mb-2">
                {t("legal.dataProtection.newsletter.title")}
              </h3>
              <p className="text-[15px] leading-[1.8] text-body mb-2">
                {t("legal.dataProtection.newsletter.intro")}
              </p>
              <ul className="list-none space-y-2 text-[15px] leading-[1.8] text-body">
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  {t("legal.dataProtection.newsletter.tool")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  {t("legal.dataProtection.newsletter.noresale")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
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
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-ink text-[15px] mb-2">
                {t("legal.dataProtection.rights.title")}
              </h3>
              <p className="text-[15px] leading-[1.8] text-body">
                {t("legal.dataProtection.rights.text")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
