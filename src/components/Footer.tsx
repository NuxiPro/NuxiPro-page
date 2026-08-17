import { ExternalLink } from "lucide-react";
import { trackClick } from "../hooks/useSectionTracking";
import { useTranslation } from "../i18n";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/[0.06] bg-[#0c0c0c] relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-12">
        {/* ─── Top row: Brand left, Links right ─── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-white tracking-[0.14em] uppercase">
              NuxiPro
            </span>
            <p className="text-[13px] text-[#F0F0F0] leading-relaxed max-w-[260px] mt-2">
              {t("footer.copyright")}
            </p>
            <p className="text-[12px] text-[#F0F0F0]/70 mt-1">{t("footer.author")}</p>
          </div>

          {/* Links grouped right */}
          <div className="flex gap-x-10 gap-y-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-[11px] font-semibold text-[#F0F0F0]/80 tracking-[0.12em] uppercase">
                {t("footer.project")}
              </h4>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <a
                    href="https://github.com/NuxiPro"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-github")}
                    className="group inline-flex items-center gap-2 text-[13px] text-[#F0F0F0] hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.producthunt.com/products/nuxipro"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-ph")}
                    className="group inline-flex items-center gap-2 text-[13px] text-[#F0F0F0] hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.801 0-.993-.806-1.799-1.801-1.799zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804c2.319 0 4.2 1.88 4.2 4.199 0 2.321-1.881 4.201-4.201 4.201z" />
                    </svg>
                    <span>Product Hunt</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[11px] font-semibold text-[#F0F0F0]/80 tracking-[0.12em] uppercase">
                {t("footer.legal.title")}
              </h4>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <a
                    href="/mentions-legales"
                    onClick={() => trackClick("footer-legal")}
                    className="group inline-flex items-center gap-2 text-[13px] text-[#F0F0F0] hover:text-white transition-colors duration-200"
                  >
                    <span>{t("footer.terms")}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
