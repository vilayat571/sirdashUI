import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, List, LogOut, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { signOutSupabase } from "../lib/authUtils";
import BrandLogoLink from "./BrandLogoLink";
import AdminSidebarUserFooter from "./AdminSidebarUserFooter";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand text-white shadow-sm shadow-brand/20"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  }`;

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOutSupabase();
    if (error) {
      toast.error(error.message || "Could not sign out");
      return;
    }

    toast.success("Signed out");
    navigate("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col overflow-hidden border-r border-gray-200 bg-white md:flex">
      <div className="border-b border-gray-100 p-5">
        <BrandLogoLink />
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Admin">
        <NavLink to="/admin/dashboard" end className={navLinkClass}>
          <LayoutDashboard className="h-4 w-4" aria-hidden />
          Dashboard
        </NavLink>
        <NavLink to="/admin/dashboard/updates/create" className={navLinkClass}>
          <PlusCircle className="h-4 w-4" aria-hidden />
          Create New Update
        </NavLink>
        <NavLink to="/admin/dashboard/updates" end className={navLinkClass}>
          <List className="h-4 w-4" aria-hidden />
          List Updates
        </NavLink>
      </nav>

      <div className="border-t border-gray-100 p-3">
        <AdminSidebarUserFooter />
        <button
          type="button"
          onClick={() => {
            void handleSignOut();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Log out
        </button>
      </div>
    </aside>
  );
}
