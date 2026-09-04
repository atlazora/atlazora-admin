import type { ReactNode } from "react";

import {
  adminNavigation,
  filterNavigationByCapabilities,
} from "../config/navigation";
import type { Capability, NavigationItem } from "../types/navigation";

interface AdminShellProps {
  children: ReactNode;
  capabilities?: ReadonlySet<Capability>;
  navigationItems?: readonly NavigationItem[];
}

export function AdminShell({
  children,
  capabilities = new Set<Capability>(),
  navigationItems = adminNavigation,
}: AdminShellProps) {
  const visibleNavigation = filterNavigationByCapabilities(
    navigationItems,
    capabilities,
  );

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand__product">Atlazora</span>
          <span className="admin-brand__surface">Admin</span>
        </div>

        <nav aria-label="Primary navigation">
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
