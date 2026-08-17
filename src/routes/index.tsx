import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import FadeIn from "../components/FadeIn";
import { Footer } from "../components/Footer";
import KanbanDemo from "../components/KanbanDemo";
import { Navbar } from "../components/Navbar";
import {
  BenefitsFive,
  BenefitsFour,
  BenefitsOne,
  BenefitsThree,
  BenefitsTwo,
  ScrollChevron,
} from "../components/svg-icon";
import {
  createPageHead,
  HREFLANG_DEFAULT,
  OG_BASE,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  TWITTER_BASE,
} from "../config/seo";
import { trackClick, useSectionTracking } from "../hooks/useSectionTracking";
import { useTranslation } from "../i18n";

const CTA_BASE =
  "bg-teal text-white font-medium rounded-lg shadow-[0_2px_12px_rgba(13,148,136,0.2)] hover:shadow-[0_6px_24px_rgba(13,148,136,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 text-sm inline-block";

function CtaButton({
  href,
  onClick,
  children,
  className = "",
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`${CTA_BASE} ${className}`}
    >
      {children}
    </a>
  );
}

export const Route = createFileRoute("/")({
  head: () =>
    createPageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      extraMeta: [...OG_BASE, ...TWITTER_BASE],
      links: [...HREFLANG_DEFAULT],
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
            <CtaButton
              href="https://demo.nuxipro.com"
              onClick={() => trackClick("hero")}
              className="px-8 py-3"
            >
              {t("hero.cta")}
            </CtaButton>
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
          <ScrollChevron />
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
                  icon: <BenefitsOne />,
                  titleKey: "benefits.1.title",
                  textKey: "benefits.1.text",
                },
                {
                  icon: <BenefitsTwo />,
                  titleKey: "benefits.2.title",
                  textKey: "benefits.2.text",
                },
                {
                  icon: <BenefitsThree />,
                  titleKey: "benefits.3.title",
                  textKey: "benefits.3.text",
                },
                {
                  icon: <BenefitsFour />,
                  titleKey: "benefits.4.title",
                  textKey: "benefits.4.text",
                },
                {
                  icon: <BenefitsFive />,
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
                    <h3 className="font-medium text-[#141413] text-[15px] mb-2">{t(b.titleKey)}</h3>
                    <p className="text-[#6c6a64] text-[14px] leading-[1.65]">{t(b.textKey)}</p>
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
            <CtaButton
              href="https://demo.nuxipro.com"
              onClick={() => trackClick("cta-final")}
              className="px-10 py-3.5"
            >
              {t("cta.button")}
            </CtaButton>
          </div>
        </FadeIn>
      </section>

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}
