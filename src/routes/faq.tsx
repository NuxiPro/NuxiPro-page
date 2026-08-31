import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "../components/Navbar";
import { ChevronDownIcon } from "../components/svg-icon";
import { createPageHead, SITE_URL } from "../config/seo";
import { useTranslation } from "../i18n";

const FAQ_TITLE = "FAQ - NuxiPro";
const FAQ_DESCRIPTION =
  "Frequently asked questions about NuxiPro, the minimalist personal task manager with automatic archiving.";
const FAQ_URL = `${SITE_URL}/faq`;

export const Route = createFileRoute("/faq")({
  head: () =>
    createPageHead({
      title: FAQ_TITLE,
      description: FAQ_DESCRIPTION,
      url: FAQ_URL,
      links: [
        { rel: "alternate", hrefLang: "fr", href: `${SITE_URL}/fr/faq` },
        { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en/faq` },
        { rel: "alternate", hrefLang: "x-default", href: FAQ_URL },
      ],
      extraMeta: [
        {
          name: "keywords",
          content:
            "NuxiPro FAQ, task manager questions, automatic archiving, kanban FAQ, minimalist productivity",
        },
      ],
    }),
  component: FAQPage,
});

function FAQPage() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = useMemo(
    () => [
      { q: t("faq.q1"), a: t("faq.a1") },
      { q: t("faq.q2"), a: t("faq.a2") },
      { q: t("faq.q3"), a: t("faq.a3") },
      { q: t("faq.q4"), a: t("faq.a4") },
      { q: t("faq.q5"), a: t("faq.a5") },
      { q: t("faq.q6"), a: t("faq.a6") },
      { q: t("faq.q7"), a: t("faq.a7") },
    ],
    [t],
  );

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    }),
    [faqs],
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FAQ", item: FAQ_URL },
    ],
  } as const;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#141413] font-body">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema).replace(/</g, "\\u003c")}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c")}
      </script>
      <Navbar />
      <main className="max-w-[640px] mx-auto px-6 pt-10 pb-16">
        <a
          href="/"
          className="inline-flex items-center gap-1 text-[#6c6a64] hover:text-[#141413] text-sm transition-all duration-300 ease-out hover:gap-2 active:scale-95"
        >
          <span className="transition-transform duration-300 ease-out hover:-translate-x-1">
            &larr;
          </span>
          {t("legal.back")}
        </a>

        <h1 className="font-heading text-[28px] font-normal mt-[60px] mb-10">{t("faq.title")}</h1>

        <section aria-label={t("nav.faq")}>
          {faqs.map((faq, i) => (
            <details key={faq.q} open={openIndex === i} className="group border-b border-[#e6dfd8]">
              {/* biome-ignore lint/a11y/noStaticElementInteractions: summary is inherently interactive */}
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === i ? null : i);
                }}
                className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-[15px] font-medium text-[#141413] hover:text-[#0f766e] transition-all duration-300 ease-out active:scale-[0.98]"
              >
                <span className="transition-transform duration-300 ease-out group-open:translate-x-1">
                  {faq.q}
                </span>
                <ChevronDownIcon
                  className={`shrink-0 text-[#6c6a64] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${openIndex === i ? "rotate-180 scale-110" : "scale-100"}`}
                />
              </summary>
              <div className="pb-5 text-[14px] leading-[1.8] text-[#6c6a64] animate-accordion-down">
                {faq.a}
              </div>
            </details>
          ))}
        </section>
      </main>
    </div>
  );
}
