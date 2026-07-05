import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  RefreshCw,
  History,
  Settings,
  Calendar,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  path: string;
  label: string;
  title: string;
  Icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Dashboard", title: "Dashboard", Icon: LayoutDashboard },
  { path: "/projects", label: "Projects", title: "Projects", Icon: FolderOpen },
  { path: "/timeline", label: "Timeline", title: "Timeline", Icon: Calendar },
  { path: "/reports", label: "Reports", title: "Reports", Icon: BarChart3 },
  { path: "/refresh", label: "Data Refresh", title: "Data Refresh", Icon: RefreshCw },
  { path: "/history", label: "Dataset History", title: "Dataset History", Icon: History },
  { path: "/settings", label: "Settings", title: "Settings", Icon: Settings },
];

export function getNavTitle(pathname: string): string {
  const match = NAV_ITEMS.find(
    (item) =>
      item.path === pathname ||
      (item.path !== "/" && pathname.startsWith(item.path)),
  );
  return match?.title ?? "Velera CRM";
}
