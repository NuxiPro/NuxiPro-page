import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LegalCenterBack, LegalCenterTitle } from "../components/svg-icon";
import { useTranslation } from "../i18n";

export const Route = createFileRoute("/legal-center")({
  component: LegalCenterLayout,
});

const LINK_BASE = "text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-150";
const LINK_INACTIVE = "text-muted hover:text-ink hover:bg-surface-card";
const LINK_ACTIVE = "bg-surface-card text-ink font-medium";

const sections = [
  { to: "/legal-center/privacy" as const, key: "privacy" },
  { to: "/legal-center/cgu" as const, key: "cgu" },
  { to: "/legal-center/notices" as const, key: "notices" },
  { to: "/legal-center/cookies" as const, key: "cookies" },
] as const;

function LegalCenterLayout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-canvas text-ink font-body">
      <header className="border-b border-hairline">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted hover:text-ink text-sm transition-colors duration-150"
          >
            <LegalCenterBack />
            {t("legal.center.back")}
          </Link>
          <div className="flex items-center gap-3">
            <LegalCenterTitle />
            <span className="text-sm font-medium">{t("legal.center.title")}</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          <aside className="w-48 flex-shrink-0 hidden md:block">
            <nav className="sticky top-12 flex flex-col gap-1">
              <Link
                to="/legal-center"
                className={`${LINK_BASE} ${LINK_INACTIVE}`}
                activeProps={{ className: `${LINK_BASE} ${LINK_ACTIVE}` }}
              >
                {t("legal.center.title")}
              </Link>
              {sections.map(({ to, key }) => (
                <Link
                  key={key}
                  to={to}
                  className={`${LINK_BASE} ${LINK_INACTIVE}`}
                  activeProps={{ className: `${LINK_BASE} ${LINK_ACTIVE}` }}
                >
                  {t(`legal.${key}.title`)}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
