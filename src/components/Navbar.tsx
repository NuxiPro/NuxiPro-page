import { Link } from "@tanstack/react-router";
import { useTranslation } from "../i18n";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e6dfd8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center">
        {/* Logo — left */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/icon.svg" alt="" className="h-7 w-auto block" />
          <img src="/text23.svg" alt="NuxiPro" className="h-4.5 w-auto block" />
          <span className="text-[10px] font-semibold text-[#0d9488] bg-[#0d9488]/8 px-2 py-0.5 rounded-full tracking-wide uppercase">
            {t("nav.beta")}
          </span>
        </Link>

        {/* Center links */}
        <div className="flex-1 flex justify-center items-center gap-1">
          <Link
            to="/contact"
            className="text-[13px] font-medium text-[#6c6a64] hover:text-[#141413] hover:bg-[#f5f0e8] border border-[#d6cec3] transition-colors duration-150 px-3 py-1.5 rounded-lg"
          >
            {t("nav.contact")}
          </Link>

          <Link
            to="/faq"
            className="text-[13px] font-medium text-[#6c6a64] hover:text-[#141413] hover:bg-[#f5f0e8] border border-[#d6cec3] transition-colors duration-150 px-3 py-1.5 rounded-lg"
          >
            {t("nav.faq")}
          </Link>
        </div>

        {/* Cloud button — right */}
        <a
          href="https://app.nuxipro.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-medium text-[#6c6a64] hover:text-[#141413] hover:bg-[#f5f0e8] border border-[#d6cec3] transition-colors duration-150 px-3 py-1.5 rounded-lg"
        >
          {t("nav.cloud")}
          <span className="ml-1.5 text-[9px] font-semibold text-[#d97706] bg-[#d97706]/10 px-1.5 py-0.5 rounded-full tracking-wide uppercase align-middle">
            {t("nav.dev")}
          </span>
        </a>
      </div>
    </nav>
  );
}
