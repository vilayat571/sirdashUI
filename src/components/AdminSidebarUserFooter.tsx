import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  getSupabaseSessionUser,
  getUserAvatarUrl,
  getUserDisplayName,
  profileInitials,
  subscribeSupabaseAuth,
} from "../lib/authUtils";

export default function AdminSidebarUserFooter() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    void getSupabaseSessionUser().then(setUser);
    const { unsubscribe } = subscribeSupabaseAuth(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <div
        className="mb-4 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-3"
        aria-hidden
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-200" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3.5 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-40 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  const avatarUrl = getUserAvatarUrl(user);
  const displayName = getUserDisplayName(user);
  const initials = profileInitials(user);
  const email = user.email ?? "";

  return (
    <div className="mb-4 flex min-w-0 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2.5">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-xs font-semibold text-brand"
          aria-hidden
        >
          {initials}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900">
          {displayName}
        </p>
        {email ? (
          <p className="truncate text-xs text-gray-500" title={email}>
            {email}
          </p>
        ) : null}
      </div>
    </div>
  );
}
