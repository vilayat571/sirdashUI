import type { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  profileInitials,
} from "../lib/authUtils";

type NavbarMobileUserCardProps = Readonly<{
  user: User;
  onLogout: () => void | Promise<void>;
}>;

export default function NavbarMobileUserCard({ user, onLogout }: NavbarMobileUserCardProps) {
  const avatarUrl = getUserAvatarUrl(user);
  const displayName = getUserDisplayName(user);
  const initials = profileInitials(user);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt=""
          className="h-11 w-11 shrink-0 rounded-xl object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-sm font-bold text-brand">
          {initials}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900">{displayName}</p>
        <button
          type="button"
          onClick={() => void onLogout()}
          className="mt-1 flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900"
        >
          <LogOut size={14} />
          Log out
        </button>
      </div>
    </div>
  );
}
