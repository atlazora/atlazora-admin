import type { NavigationItem } from "../types/navigation";

export const adminNavigation: readonly NavigationItem[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/",
  },
];

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
