import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import {
  getSupabaseSessionUser,
  isAdmin,
  subscribeSupabaseAuth,
} from "../../lib/authUtils";

type AdminRouteProps = Readonly<{
  children: ReactNode;
}>;

export default function AdminRoute({ children }: AdminRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialUser() {
      const nextUser = await getSupabaseSessionUser();
      // Prevent state update if component unmounted before the async call resolved
      if (!cancelled) {
        setUser(nextUser);
        setAuthReady(true);
      }
    }

    void loadInitialUser();

    const { unsubscribe } = subscribeSupabaseAuth((nextUser) => {
      setUser(nextUser);
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  if (!authReady) {
    return (
      // role="status" announces loading state to screen readers
      <div
        className="flex min-h-screen items-center justify-center bg-[#F9FAFB]"
        role="status"
        aria-label="Checking authentication…"
      >
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (!isAdmin(user)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}