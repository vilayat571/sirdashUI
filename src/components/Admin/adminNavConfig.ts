import { LayoutDashboard, List, PlusCircle, type LucideIcon } from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  Icon: LucideIcon;
  end?: boolean;
};

export const adminNavItems: NavItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", Icon: LayoutDashboard, end: true },
  { to: "/admin/dashboard/updates/create", label: "Create New Update", Icon: PlusCircle },
  { to: "/admin/dashboard/updates", label: "List Updates", Icon: List, end: true },
];

export const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ${
    isActive
      ? "bg-brand text-white shadow-sm shadow-brand/20"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  }`;