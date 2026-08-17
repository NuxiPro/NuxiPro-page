import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useTranslation } from "../i18n/index.tsx";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FAQ - NuxiPro" },
      {
        name: "description",
        content:
          "Frequently asked questions about NuxiPro, the minimalist personal task manager with automatic archiving.",
      },
      { name: "robots", content: "index, follow" },
      { name: "og:title", content: "FAQ - NuxiPro" },
      {
        name: "og:description",
        content:
          "Frequently asked questions about NuxiPro, the minimalist personal task manager with automatic archiving.",
      },
      { name: "og:url", content: "https://nuxipro.com/faq" },
    ],
    links: [
      { rel: "canonical", href: "https://nuxipro.com/faq" },
      {
        rel: "alternate",
        hreflang: "fr",
        href: "https://nuxipro.com/fr/faq",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://nuxipro.com/en/faq",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://nuxipro.com/faq",
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

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#141413] font-body">
      <script
        type="application/ld+json"
        // biome-ignore lint: JSON-LD schema is safe static content
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

        <h1 className="font-heading text-[28px] font-normal mt-[60px] mb-10">
          {t("faq.title")}
        </h1>

        <section aria-label={t("nav.faq")}>
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              open={openIndex === i}
              className="group border-b border-[#e6dfd8]"
            >
              {/* biome-ignore lint/a11y/noStaticElementInteractions: summary is inherently interactive */}
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === i ? null : i);
                }}
                className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-[15px] font-medium text-[#141413] hover:text-[#0d9488] transition-all duration-300 ease-out active:scale-[0.98]"
              >
                <span className="transition-transform duration-300 ease-out group-open:translate-x-1">
                  {faq.q}
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 text-[#6c6a64] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${openIndex === i ? "rotate-180 scale-110" : "scale-100"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
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
