import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { signOutSupabase } from "../../lib/authUtils";
import AdminSidebarUserFooter from "./AdminSidebarUserFooter";
import BrandLogoLink from "../Others/BrandLogoLink";
import { adminNavItems, navLinkClass } from "./adminNavConfig";

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
    // `complementary` landmark for the sidebar; label distinguishes it if
    // there are multiple <aside> elements on the page.
    <aside
      className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col overflow-hidden border-r border-gray-200 bg-white md:flex"
      aria-label="Admin sidebar"
    >
      <div className="border-b border-gray-100 p-5">
        <BrandLogoLink />
      </div>

      {/* nav landmark with a descriptive label */}
      <nav
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3"
        aria-label="Admin navigation"
      >
        {adminNavItems.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={navLinkClass}>
            {/* aria-hidden so the icon label isn't double-read with the text */}
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-100 p-3">
        <AdminSidebarUserFooter />
        <button
          type="button"
          onClick={() => void handleSignOut()}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Log out
        </button>
      </div>
    </aside>
  );
}