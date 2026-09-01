import { ExternalLink } from "lucide-react";
import { trackClick } from "../hooks/useSectionTracking";
import { useTranslation } from "../i18n";
import { IconBlog, IconDocs, IconGitHub, IconProductHunt } from "./svg-icon";

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
              <h2 className="text-[11px] font-semibold text-[#F0F0F0]/80 tracking-[0.12em] uppercase">
                {t("footer.project")}
              </h2>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <a
                    href="https://github.com/NuxiPro/NuxiPro-page"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-github")}
                    className="group inline-flex items-center gap-2 text-[13px] text-[#F0F0F0] hover:text-white transition-colors duration-200"
                  >
                    <IconGitHub className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{t("footer.openSource")}</span>
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
                    <IconProductHunt className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>Product Hunt</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://center.nuxipro.com/blog/introducing-nuxipro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("footer-blog")}
                    className="group inline-flex items-center gap-2 text-[13px] text-[#F0F0F0] hover:text-white transition-colors duration-200"
                  >
                    <IconBlog className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
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
                    className="group inline-flex items-center gap-2 text-[13px] text-[#F0F0F0] hover:text-white transition-colors duration-200"
                  >
                    <IconDocs className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{t("footer.docs")}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[11px] font-semibold text-[#F0F0F0]/80 tracking-[0.12em] uppercase">
                {t("footer.legal.title")}
              </h2>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <a
                    href="/legal-center"
                    onClick={() => trackClick("footer-legal-center")}
                    className="group inline-flex items-center gap-2 text-[13px] text-[#F0F0F0] hover:text-white transition-colors duration-200"
                  >
                    <span>{t("footer.legalCenter")}</span>
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
