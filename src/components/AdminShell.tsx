import { useEffect, type ReactNode } from "react";

import {
  filterNavigationByCapabilities,
  getAdminNavigation,
} from "../config/navigation";
import { catalog, type Locale } from "../i18n/catalog";
import { applyDocumentLocale, DEFAULT_LOCALE } from "../i18n/locale";
import type { Capability, NavigationItem } from "../types/navigation";

interface AdminShellProps {
  children: ReactNode;
  capabilities?: ReadonlySet<Capability>;
  navigationItems?: readonly NavigationItem[];
  locale?: Locale;
}

export function AdminShell({
  children,
  capabilities = new Set<Capability>(),
  navigationItems,
  locale = DEFAULT_LOCALE,
}: AdminShellProps) {
  const copy = catalog[locale];
  const resolvedNavigationItems = navigationItems ?? getAdminNavigation(locale);

  const visibleNavigation = filterNavigationByCapabilities(
    resolvedNavigationItems,
    capabilities,
  );

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand__product">Atlazora</span>
          <span className="admin-brand__surface">{copy.brand.admin}</span>
        </div>

        <nav aria-label={copy.navigation.primaryLabel}>
          <ul className="admin-navigation">
            {visibleNavigation.map((item) => (
              <li key={item.id}>
                <a className="admin-navigation__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="admin-main" id="main-content">
        {children}
      </main>
    </div>
  );
}
