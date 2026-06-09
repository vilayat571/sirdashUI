import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { signOutSupabase } from "../../lib/authUtils";
import AdminSidebarUserFooter from "./AdminSidebarUserFooter";
import BrandLogoLink from "../Others/BrandLogoLink";
import { adminNavItems, navLinkClass } from "./adminNavConfig";

export default function AdminSidebarMobile() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Ref to restore focus to the toggle button when the menu closes
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Ref to move focus into the menu when it opens
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Trap / release scroll & handle Escape key
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Move focus to the menu panel so keyboard users can navigate it
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      // Restore focus to the button that opened the menu
      toggleRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

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
          ref={toggleRef}
          type="button"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
          // aria-expanded communicates open/closed state to screen readers
          aria-expanded={open}
          // aria-controls links the button to the panel it controls
          aria-controls="admin-mobile-menu"
          aria-label={open ? "Close admin menu" : "Open admin menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Render both icons, toggle visibility with CSS to avoid layout
              shift and keep icon transition smooth */}
          <Menu className={`h-5 w-5 transition-opacity ${open ? "opacity-0" : "opacity-100"} absolute`} aria-hidden="true" />
          <X className={`h-5 w-5 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
          {/* Spacer to maintain button size regardless of which icon shows */}
          <span className="h-5 w-5 invisible" aria-hidden="true" />
        </button>
      </header>

      {/* Overlay: clicking outside closes the menu */}
      {open && (
        <div
          className="fixed inset-0 top-[57px] z-20 bg-black/20"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Menu panel — `inert` attribute would be ideal here but needs a polyfill;
          using aria-hidden on the backdrop and role/label on the panel is a
          reasonable fallback. */}
      <div
        id="admin-mobile-menu"
        ref={menuRef}
        // tabIndex=-1 lets us programmatically focus the panel
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        className={`fixed inset-x-0 top-[57px] z-30 border-b border-gray-200 bg-white p-3 shadow-lg outline-none transition-all duration-200 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Admin navigation">
          {adminNavItems.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6">
          <AdminSidebarUserFooter />
        </div>

        <button
          type="button"
          onClick={() => void handleSignOut()}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  );
}