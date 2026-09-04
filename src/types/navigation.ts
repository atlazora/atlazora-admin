export type Capability = string;

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  requiredCapability?: Capability;
}

export interface AdminNavigationContext {
  capabilities: ReadonlySet<Capability>;
}
