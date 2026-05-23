import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  LogOut,
  Menu,
  PlusCircle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { signOutSupabase } from "../../lib/authUtils";
import AdminSidebarUserFooter from "./AdminSidebarUserFooter";
import BrandLogoLink from "../BrandLogoLink";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand text-white shadow-sm shadow-brand/20"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  }`;

export default function AdminSidebarMobile() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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
    <div className="md:hidden">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <BrandLogoLink />
        <button
          type="button"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          aria-label={open ? "Close admin menu" : "Open admin menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-[65px] z-30 border-b border-gray-200 bg-white p-3 shadow-lg">
          <nav className="flex flex-col gap-1" aria-label="Admin">
            <NavLink to="/admin/dashboard" end className={navLinkClass}>
              <LayoutDashboard className="h-4 w-4" aria-hidden />
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/dashboard/updates/create"
              className={navLinkClass}
            >
              <PlusCircle className="h-4 w-4" aria-hidden />
              Create New Update
            </NavLink>
            <NavLink to="/admin/dashboard/updates" end className={navLinkClass}>
              <List className="h-4 w-4" aria-hidden />
              List Updates
            </NavLink>
          </nav>

          <div className="mt-6">
            <AdminSidebarUserFooter />
          </div>

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
      )}
    </div>
  );
}
