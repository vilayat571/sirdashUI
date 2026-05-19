import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ChevronDown, LogOut } from "lucide-react";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  profileInitials,
} from "../../lib/authUtils";

type NavbarProfileDropdownProps = Readonly<{
  user: User;
  scrolled: boolean;
  onLogout: () => void | Promise<void>;
}>;

export default function NavbarProfileDropdown({
  user,
  scrolled,
  onLogout,
}: NavbarProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const avatarUrl = getUserAvatarUrl(user);
  const displayName = getUserDisplayName(user);
  const initials = profileInitials(user);

  async function handleLogout() {
    setOpen(false);
    await onLogout();
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-2 transition-colors ${
          scrolled ? "hover:bg-gray-100/90" : "hover:bg-white/10"
        }`}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="h-9 w-9 rounded-lg object-cover ring-2 ring-white/20"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
              scrolled ? "bg-brand/15 text-brand" : "bg-white/20 text-white"
            }`}
          >
            {initials}
          </span>
        )}
        <span
          className={`max-w-[140px] truncate text-left text-sm font-semibold ${scrolled ? "text-gray-900" : "text-white"}`}
        >
          {displayName}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 opacity-70 ${scrolled ? "text-gray-600" : "text-white/80"}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-gray-100 bg-white py-1 shadow-lg shadow-gray-200/50"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => void handleLogout()}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <LogOut size={16} className="text-gray-500" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
