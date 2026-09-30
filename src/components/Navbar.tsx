import { Link } from "@tanstack/react-router";
import { CodeXml, ExternalLink } from "lucide-react";
import { useTranslation } from "../i18n";

const DOCS_URL = "https://center.nuxipro.com/guides/first-page/";
const BLOG_URL = "https://center.nuxipro.com/blog/introducing-nuxipro/";
const CODEBERG_URL = "https://codeberg.org/NuxiPro";
const CLOUD_URL = "https://app.nuxipro.com";

const pill =
  "text-[13px] font-medium text-[#6c6a64] hover:text-[#141413] hover:bg-[#f5f0e8] border border-[#d6cec3] transition-colors duration-150 px-3 py-1.5 rounded-lg";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e6dfd8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center">
        {/* Logo — left */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/icon.svg" alt="" width="29" height="28" className="h-7 w-auto block" />
          <img
            src="/text23.svg"
            alt="NuxiPro"
            width="67"
            height="18"
            className="h-4.5 w-auto block"
          />
          <span className="text-[10px] font-semibold text-[#0f766e] bg-[#0f766e]/8 px-2 py-0.5 rounded-full tracking-wide uppercase">
            {t("nav.beta")}
          </span>
        </Link>

        {/* Center links — internal pages, then external resources */}
        <div className="flex-1 flex justify-center items-center gap-1">
          <Link to="/contact" className={pill}>
            {t("nav.contact")}
          </Link>

          <Link to="/faq" className={pill}>
            {t("nav.faq")}
          </Link>

          <span aria-hidden="true" className="hidden md:block w-px h-4 bg-[#e6dfd8] mx-1.5" />

          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${pill} hidden md:inline-flex items-center gap-1`}
          >
            {t("nav.docs")}
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${pill} hidden md:inline-flex items-center gap-1`}
          >
            {t("nav.blog")}
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Right buttons — Codeberg org + Cloud */}
        <div className="flex items-center gap-1">
          <a
            href={CODEBERG_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={t("nav.codeTitle")}
            aria-label={t("nav.codeTitle")}
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#f5f0e8] bg-[#141413] hover:bg-[#0f766e] transition-colors duration-150 px-2.5 py-1.5 rounded-lg"
          >
            <CodeXml className="w-3.5 h-3.5" />
            {t("nav.openSource")}
          </a>

          <a
            href={CLOUD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={pill}
          >
            {t("nav.cloud")}
            <span className="ml-1.5 text-[9px] font-semibold text-[#d97706] bg-[#d97706]/10 px-1.5 py-0.5 rounded-full tracking-wide uppercase align-middle">
              {t("nav.dev")}
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
