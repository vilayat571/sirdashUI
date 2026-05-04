import { LayoutDashboard, List, PlusCircle } from "lucide-react";

export const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    Icon: LayoutDashboard,
  },
  {
    title: "Create New Update",
    href: "/admin/dashboard/updates/create",
    Icon: PlusCircle,
  },
  {
    title: "List Updates",
    href: "/admin/dashboard/updates",
    Icon: List,
  },
];

export const dashboardActions = [
  {
    title: "Create New Update",
    description: "Publish a product update to the public changelog.",
    href: "/admin/dashboard/updates/create",
    Icon: PlusCircle,
    cta: "Create update",
  },
  {
    title: "Manage Updates",
    description: "Review, edit, or delete existing changelog entries.",
    href: "/admin/dashboard/updates",
    Icon: List,
    cta: "View updates",
  },
];
