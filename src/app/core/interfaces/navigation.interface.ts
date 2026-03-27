export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  order: number;
  isActive?: boolean;
  children?: NavigationItem[];
}

export interface NavigationConfig {
  showSidebar: boolean;
  sidebarCollapsed: boolean;
  showHeader: boolean;
  showFooter: boolean;
  items: NavigationItem[];
}
