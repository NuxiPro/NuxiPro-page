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
  ChevronLeftIcon,
  ChevronRightIcon,
  ScrollChevron,
} from "../components/svg-icon";
import { Waitlist } from "../components/Waitlist";
import { createPageHead, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../config/seo";
import { trackClick, useSectionTracking } from "../hooks/useSectionTracking";
import { useTranslation } from "../i18n";

const CTA_BASE =
  "bg-teal text-white font-medium rounded-lg shadow-[0_2px_12px_rgba(15,118,110,0.2)] hover:shadow-[0_6px_24px_rgba(15,118,110,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-150 text-sm inline-block";

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
      extraMeta: [
        {
          name: "keywords",
          content:
            "NuxiPro, nuxipro, NuxiPro Kanban, task manager, automatic task archiving, kanban, minimalist productivity, personal kanban, done column cleanup",
        },
        { property: "og:locale", content: "en_US" },
      ],
    }),
  component: LandingPage,
});

type BenefitItem = {
  Icon: typeof BenefitsOne;
  titleKey: string;
  textKey: string;
};

const BENEFIT_ITEMS: BenefitItem[] = [
  { Icon: BenefitsOne, titleKey: "benefits.1.title", textKey: "benefits.1.text" },
  { Icon: BenefitsTwo, titleKey: "benefits.2.title", textKey: "benefits.2.text" },
  { Icon: BenefitsThree, titleKey: "benefits.3.title", textKey: "benefits.3.text" },
  { Icon: BenefitsFour, titleKey: "benefits.4.title", textKey: "benefits.4.text" },
  { Icon: BenefitsFive, titleKey: "benefits.5.title", textKey: "benefits.5.text" },
];

const BENEFIT_DURATION_MS = 3000;

function BenefitsSlider({ t }: { t: (key: string) => string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState<number[]>([0]);
  const resumeRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % BENEFIT_ITEMS.length);
    }, BENEFIT_DURATION_MS);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    setSeen((prev) => (prev.includes(index) ? prev : [...prev, index]));
  }, [index]);

  useEffect(() => () => {
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
  }, []);

  const goTo = (i: number) => {
    const len = BENEFIT_ITEMS.length;
    setIndex(((i % len) + len) % len);
    setPaused(true);
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => setPaused(false), 8000);
  };

  const current = BENEFIT_ITEMS[index];
  const Icon = current.Icon;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-live="polite"
          className="w-full bg-white border border-[#e6dfd8] rounded-xl px-12 sm:px-16 pt-10 pb-6 min-h-[340px] flex flex-col items-center"
        >
          <div
            key={index}
            className="flex flex-col items-center gap-4 flex-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f5f0e8] flex items-center justify-center">
              <Icon />
            </div>
            <h3 className="font-medium text-[#141413] text-[17px] tracking-[-0.01em]">
              {t(current.titleKey)}
            </h3>
            <p className="text-[#3d3d3a] text-[17px] leading-[1.47] tracking-[-0.01em] max-w-md">
              {t(current.textKey)}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-auto pt-6">
            {BENEFIT_ITEMS.map((_, i) => {
              const isActive = i === index;
              const size = isActive ? "w-6 h-2 overflow-hidden" : i < 4 ? "w-2 h-2" : "w-1 h-1";
              const color = isActive
                ? "bg-[#e6dfd8]"
                : seen.includes(i)
                  ? "bg-[#57534e]"
                  : "bg-[#e6dfd8] hover:bg-[#d6cec3]";
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Voir bénéfice ${i + 1}`}
                  className={`${size} rounded-full transition-all duration-150 ${color}`}
                >
                  {isActive && (
                    <div
                      key={index}
                      style={{ animationDuration: `${BENEFIT_DURATION_MS}ms` }}
                      className={`benefit-progress h-full bg-[#141413] rounded-full ${paused ? "paused" : ""}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Bénéfice précédent"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-[#e6dfd8] bg-white/90 backdrop-blur text-[#141413] flex items-center justify-center shadow-sm hover:bg-[#f5f0e8] active:scale-[0.97] transition-all duration-150"
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Bénéfice suivant"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-[#e6dfd8] bg-white/90 backdrop-blur text-[#141413] flex items-center justify-center shadow-sm hover:bg-[#f5f0e8] active:scale-[0.97] transition-all duration-150"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

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
  useSectionTracking({ sectionId: "comparison" });
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
        className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 py-[80px] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center relative z-10 bg-[#faf9f5]"
      >
        <div className="flex flex-col justify-center items-start space-y-6">
          <h1 className="font-body text-[2rem] sm:text-4xl lg:text-[2.5rem] font-medium tracking-[-0.02em] leading-[1.1] text-[#141413]">
            {t("hero.title")}
          </h1>

          <p className="text-[17px] text-[#3d3d3a] max-w-lg leading-[1.47] tracking-[-0.01em]">
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
          className={`scroll-tooltip relative mb-3 px-4 py-2 bg-[#efe9de] border border-[#e6dfd8] rounded-lg text-sm text-[#57534e] transition-all duration-150 cursor-pointer hover:bg-[#e8e0d2] hover:border-[#d6cec3] ${
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
          className="scroll-indicator w-10 h-10 rounded-full border border-[#e6dfd8] flex items-center justify-center text-[#57534e] hover:text-[#44403c] hover:border-[#d6cec3] transition-colors cursor-pointer"
        >
          <ScrollChevron />
        </button>
      </div>

      {/* ─── Zone histoire : Pourquoi + Bénéfices ─── */}
      <section
        ref={pourquoiRef}
        id="histoire"
        className="w-full bg-[#faf9f5] border-y border-[#e6dfd8] py-[80px] relative z-10"
      >
        <FadeIn>
          <div
            id="pourquoi"
            className="w-full max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16"
          >
            <div>
              <h2 className="font-heading text-[34px] font-semibold tracking-[-0.02em] leading-[1.1] text-[#141413] md:sticky md:top-24">
                {t("pourquoi.label")}
              </h2>
            </div>
            <div className="space-y-6 text-[17px] leading-[1.47] tracking-[-0.01em] text-[#3d3d3a] max-w-[720px]">
              <p>{t("pourquoi.p1")}</p>
              <p>{t("pourquoi.p2")}</p>
              <p>{t("pourquoi.p3")}</p>
            </div>
          </div>
        </FadeIn>

        <div aria-hidden="true" className="w-full max-w-6xl mx-auto px-6 sm:px-8">
          <div className="h-px bg-[#e6dfd8] my-[64px]" />
        </div>

        <FadeIn delay={100}>
          <div id="benefits" className="w-full max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16 items-start">
            <div>
              <h2 className="font-body text-[34px] font-medium tracking-[-0.02em] leading-[1.1] text-[#141413] md:sticky md:top-24 text-left">
                {t("benefits.title")}
              </h2>
            </div>
            <BenefitsSlider t={t} />
          </div>
        </FadeIn>

        <div aria-hidden="true" className="w-full max-w-6xl mx-auto px-6 sm:px-8">
          <div className="h-px bg-[#e6dfd8] my-[64px]" />
        </div>

        <FadeIn delay={100}>
          <div id="comparison" className="w-full max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16 items-start">
            <div>
              <h2 className="font-body text-[34px] font-medium tracking-[-0.02em] leading-[1.1] text-[#141413] md:sticky md:top-24 text-left">
                {t("comparison.title")}
              </h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[#e6dfd8] bg-white">
              <table className="w-full min-w-[560px] border-collapse text-left text-[15px] leading-[1.5]">
                <thead>
                  <tr className="border-b border-[#e6dfd8]">
                    <th scope="col" className="px-5 py-4 font-medium text-[#141413]">
                      {t("comparison.columns.0")}
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium text-[#141413]">
                      {t("comparison.columns.1")}
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium text-[#141413]">
                      {t("comparison.columns.2")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6dfd8]">
                  {Array.from({ length: 10 }, (_, i) => (
                    <tr key={t(`comparison.rows.${i}.key`)}>
                      <th scope="row" className="px-5 py-4 font-medium text-[#141413] align-top">
                        {t(`comparison.rows.${i}.label`)}
                      </th>
                      <td className="px-5 py-4 text-[#3d3d3a] align-top">
                        {t(`comparison.rows.${i}.demo`)}
                      </td>
                      <td className="px-5 py-4 text-[#3d3d3a] align-top">
                        {t(`comparison.rows.${i}.cloud`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── CTA + Waitlist — strict Newsletter.astro ─── */}
      <section
        id="cta-final"
        className="w-full max-w-3xl mx-auto px-6 py-16 sm:py-24 relative z-10"
      >
        <FadeIn>
          <Waitlist />
        </FadeIn>
      </section>

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}
