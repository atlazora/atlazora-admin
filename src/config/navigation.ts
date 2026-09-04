import { catalog, type Locale } from "../i18n/catalog";
import { DEFAULT_LOCALE } from "../i18n/locale";
import type { NavigationItem } from "../types/navigation";

export function getAdminNavigation(locale: Locale): readonly NavigationItem[] {
  return [
    {
      id: "overview",
      label: catalog[locale].navigation.overview,
      href: "/",
    },
  ];
}

export const adminNavigation = getAdminNavigation(DEFAULT_LOCALE);

export function filterNavigationByCapabilities(
  items: readonly NavigationItem[],
  capabilities: ReadonlySet<string>,
): NavigationItem[] {
  return items.filter(
    (item) =>
      item.requiredCapability === undefined ||
      capabilities.has(item.requiredCapability),
  );
}
