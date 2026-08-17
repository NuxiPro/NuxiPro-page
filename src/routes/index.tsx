import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import FadeIn from "../components/FadeIn";
import { Footer } from "../components/Footer";
import KanbanDemo from "../components/KanbanDemo";
import { Navbar } from "../components/Navbar";
import { trackClick, useSectionTracking } from "../hooks/useSectionTracking";
import { useTranslation } from "../i18n/index.tsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NuxiPro - Your workspace cleans itself" },
      {
        name: "description",
        content:
          "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "NuxiPro - Your workspace cleans itself" },
      {
        property: "og:description",
        content:
          "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.",
      },
      { property: "og:image", content: "https://nuxipro.com/og-image.png" },
      { property: "og:url", content: "https://nuxipro.com/" },
      { property: "og:site_name", content: "NuxiPro" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NuxiPro - Your workspace cleans itself" },
      {
        name: "twitter:description",
        content:
          "Stop wasting time manually archiving your tasks. With NuxiPro, your workspace cleans itself automatically.",
      },
      { name: "twitter:image", content: "https://nuxipro.com/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://nuxipro.com/" },
      {
        rel: "alternate",
        hreflang: "fr",
        href: "https://nuxipro.com/fr",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://nuxipro.com/en",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://nuxipro.com/",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { t } = useTranslation();
  const pourquoiRef = useRef<HTMLElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const el = pourquoiRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTooltip(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    setShowTooltip(true);

    return () => observer.disconnect();
  }, []);

  useSectionTracking({ sectionId: "hero" });
  useSectionTracking({ sectionId: "pourquoi" });
  useSectionTracking({ sectionId: "benefits" });
  useSectionTracking({ sectionId: "cta-final" });
  useSectionTracking({ sectionId: "footer" });

  const scrollToPourquoi = () => {
    pourquoiRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col antialiased overflow-x-hidden selection:bg-teal selection:text-white relative">
      {/* ─── Background Grid ─── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(to right, #e6dfd8 1px, transparent 1px), linear-gradient(to bottom, #e6dfd8 1px, transparent 1px)`,
          backgroundSize: "3.5rem 3.5rem",
        }}
      />

      {/* ─── Header ─── */}
      <Navbar />

      {/* ─── Hero ─── */}
      <main
        id="hero"
        className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center relative z-10"
      >
        <div className="flex flex-col justify-center items-start space-y-6">
          <h1 className="font-heading text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-normal tracking-[-0.02em] leading-[1.05] text-[#141413]">
            {t("hero.title")}
          </h1>

          <p className="text-lg sm:text-[19px] text-[#6c6a64] max-w-lg leading-[1.7]">
            {t("hero.subtitle")}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://demo.nuxipro.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("hero")}
              className="bg-teal text-white font-medium px-8 py-3 rounded-lg shadow-[0_2px_12px_rgba(13,148,136,0.2)] hover:shadow-[0_6px_24px_rgba(13,148,136,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 text-sm text-center inline-block"
            >
              {t("hero.cta")}
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center relative w-full">
          <div className="kanban-wrapper relative w-full h-[420px] rounded-xl p-[1px]">
            <div className="w-full h-full rounded-xl kanban-inner relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <KanbanDemo className="flex items-center justify-center h-full" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── Scroll indicator ─── */}
      <div className="w-full flex flex-col items-center pb-6 sm:pb-8 relative z-10">
        {/* Tooltip */}
        <button
          type="button"
          onClick={() => {
            trackClick("scroll-indicator");
            scrollToPourquoi();
          }}
          className={`scroll-tooltip relative mb-3 px-4 py-2 bg-[#efe9de] border border-[#e6dfd8] rounded-lg text-sm text-[#6c6a64] transition-all duration-150 cursor-pointer hover:bg-[#e8e0d2] hover:border-[#d6cec3] ${
            showTooltip
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <span>{t("scroll.tooltip")}</span>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-[#efe9de] border-r border-b border-[#e6dfd8] rotate-45" />
        </button>

        <button
          type="button"
          onClick={() => {
            trackClick("scroll-indicator");
            scrollToPourquoi();
          }}
          onMouseDown={(e) => {
            e.currentTarget.classList.add("scroll-indicator-pressed");
          }}
          onMouseUp={(e) => {
            e.currentTarget.classList.remove("scroll-indicator-pressed");
          }}
          onMouseLeave={(e) => {
            e.currentTarget.classList.remove("scroll-indicator-pressed");
          }}
          onTouchStart={(e) => {
            e.currentTarget.classList.add("scroll-indicator-pressed");
          }}
          onTouchEnd={(e) => {
            e.currentTarget.classList.remove("scroll-indicator-pressed");
          }}
          aria-label={t("scroll.tooltip")}
          className="scroll-indicator w-10 h-10 rounded-full border border-[#e6dfd8] flex items-center justify-center text-[#8e8b82] hover:text-[#6c6a64] hover:border-[#d6cec3] transition-colors cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label={t("scroll.tooltip")}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* ─── Pourquoi ─── */}
      <section
        ref={pourquoiRef}
        id="pourquoi"
        className="w-full pt-6 sm:pt-8 pb-8 sm:pb-10 relative z-10"
      >
        <FadeIn>
          <div className="w-full max-w-[760px] mx-auto px-6">
            <div className="bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-8 sm:p-10">
              <p className="font-heading text-[13px] uppercase tracking-[0.08em] font-medium text-teal mb-5">
                {t("pourquoi.label")}
              </p>
              <div className="space-y-5 text-[19px] leading-[1.75] text-[#3d3d3a] max-w-[680px]">
                <p>{t("pourquoi.p1")}</p>
                <p>{t("pourquoi.p2")}</p>
              </div>
              <p className="mt-7 text-[20px] leading-[1.75] font-medium text-[#141413] max-w-[680px]">
                {t("pourquoi.p3")}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Bénéfice ─── */}
      <section id="benefits" className="w-full py-10 sm:py-12 relative z-10">
        <FadeIn delay={100}>
          <div className="w-full max-w-4xl mx-auto px-6">
            <h2 className="font-heading text-[1.75rem] sm:text-[2rem] font-normal tracking-[-0.02em] text-[#141413] mb-10 text-center">
              {t("benefits.title")}
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-label={t("svg.workflow")}
                    >
                      <path d="M 2 12 C 3 8, 4 8, 5 12 C 6 16, 7 16, 8 12 C 9 10, 10 10, 11 12 C 12 13, 13 13, 14 12 L 22 12" />
                      <path d="M 19 9 L 22 12 L 19 15" />
                    </svg>
                  ),
                  titleKey: "benefits.1.title",
                  textKey: "benefits.1.text",
                },
                {
                  icon: (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-label={t("svg.target")}
                    >
                      <path d="M 2 12 C 5 5, 19 5, 22 12 C 19 19, 5 19, 2 12 Z" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="12" cy="12" r="1.5" fill="#0d9488" />
                    </svg>
                  ),
                  titleKey: "benefits.2.title",
                  textKey: "benefits.2.text",
                },
                {
                  icon: (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-label={t("svg.metrics")}
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ),
                  titleKey: "benefits.3.title",
                  textKey: "benefits.3.text",
                },
                {
                  icon: (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-label={t("svg.noUseless")}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                  ),
                  titleKey: "benefits.4.title",
                  textKey: "benefits.4.text",
                },
                {
                  icon: (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-label={t("svg.quickStart")}
                    >
                      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                      <path d="m21 3 1 11h-2" />
                      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                      <path d="M3 4h8" />
                    </svg>
                  ),
                  titleKey: "benefits.5.title",
                  textKey: "benefits.5.text",
                },
              ].map((b) => (
                <div
                  key={b.titleKey}
                  className="bg-white border border-[#e6dfd8] rounded-xl p-8 flex flex-col items-start gap-5 w-full sm:w-[calc(33.333%-1rem)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f5f0e8] flex items-center justify-center">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#141413] text-[15px] mb-2">
                      {t(b.titleKey)}
                    </h3>
                    <p className="text-[#6c6a64] text-[14px] leading-[1.65]">
                      {t(b.textKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── CTA ─── */}
      <section
        id="cta-final"
        className="w-full max-w-6xl mx-auto px-6 py-16 sm:py-24 relative z-10"
      >
        <FadeIn>
          <div className="rounded-xl border border-[#e6dfd8] bg-[#efe9de] px-8 py-12 sm:px-16 sm:py-16 text-center">
            <h2 className="font-heading text-3xl sm:text-[2.5rem] font-normal tracking-[-0.01em] text-[#141413] mb-5">
              {t("cta.title")}
            </h2>
            <p className="text-[#6c6a64] max-w-lg mx-auto mb-10 text-[17px] leading-relaxed">
              {t("cta.subtitle")}
            </p>
            <a
              href="https://demo.nuxipro.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("cta-final")}
              className="bg-teal text-white font-medium px-10 py-3.5 rounded-lg shadow-[0_2px_12px_rgba(13,148,136,0.2)] hover:shadow-[0_6px_24px_rgba(13,148,136,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 text-sm inline-block"
            >
              {t("cta.button")}
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}
