import { ExternalLink } from "lucide-react";
import { trackClick } from "../hooks/useSectionTracking";
import { useTranslation } from "../i18n";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[#e6dfd8] bg-[#f5f5f7] relative z-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-10 md:gap-16">
          {/* ─── Brand : logo + nom + sous-titre + organisation ─── */}
          <div className="flex flex-col items-start">
            <span className="text-[17px] font-medium tracking-[-0.01em] text-[#141413]">
              NuxiPro
            </span>
            <p className="text-[14px] text-[#3d3d3a] leading-[1.6] max-w-[280px] mt-4">
              {t("footer.tagline")}
            </p>
            <a
              href="https://codeberg.org/NuxiPro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("footer-codeberg-org")}
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border border-[#e6dfd8] bg-white text-[13px] font-medium text-[#141413] hover:bg-[#efe9de] active:scale-[0.97] transition-all duration-150"
            >
              <span>{t("footer.orgButton")}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
            <p className="text-[12px] text-[#6c6a64] mt-5">{t("footer.author")}</p>
          </div>

          {/* ─── Liens découpés par domaine ─── */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10"
          >
            <div className="flex flex-col gap-3">
              <h2 className="text-[11px] font-semibold text-[#6c6a64] tracking-[0.12em] uppercase">
                {t("footer.project")}
              </h2>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="https://codeberg.org/NuxiPro/Core"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-core")}
                    className="group inline-flex items-center gap-2 text-[14px] text-[#3d3d3a] hover:text-[#141413] transition-colors duration-150"
                  >
                    <span>{t("footer.core")}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://codeberg.org/NuxiPro/NuxiPro-page"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-landing")}
                    className="group inline-flex items-center gap-2 text-[14px] text-[#3d3d3a] hover:text-[#141413] transition-colors duration-150"
                  >
                    <span>{t("footer.landing")}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://codeberg.org/NuxiPro/center"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-center-repo")}
                    className="group inline-flex items-center gap-2 text-[14px] text-[#3d3d3a] hover:text-[#141413] transition-colors duration-150"
                  >
                    <span>{t("footer.centerRepo")}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>

              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[11px] font-semibold text-[#6c6a64] tracking-[0.12em] uppercase">
                {t("footer.resources")}
              </h2>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="https://center.nuxipro.com/blog/introducing-nuxipro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-blog")}
                    className="group inline-flex items-center gap-2 text-[14px] text-[#3d3d3a] hover:text-[#141413] transition-colors duration-150"
                  >
                    <span>{t("footer.blog")}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://center.nuxipro.com/guides/first-page/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-docs")}
                    className="group inline-flex items-center gap-2 text-[14px] text-[#3d3d3a] hover:text-[#141413] transition-colors duration-150"
                  >
                    <span>{t("footer.docs")}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.producthunt.com/products/nuxipro"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-ph")}
                    className="group inline-flex items-center gap-2 text-[14px] text-[#3d3d3a] hover:text-[#141413] transition-colors duration-150"
                  >
                    <span>Product Hunt</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[11px] font-semibold text-[#6c6a64] tracking-[0.12em] uppercase">
                {t("footer.legal.title")}
              </h2>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="/legal-center"
                    onClick={() => trackClick("footer-legal-center")}
                    className="inline-flex items-center gap-2 text-[14px] text-[#3d3d3a] hover:text-[#141413] transition-colors duration-150"
                  >
                    <span>{t("footer.legalCenter")}</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
