import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import {
  getSupabaseSessionUser,
  isAdmin,
  subscribeSupabaseAuth,
} from "../lib/authUtils";

type AdminRouteProps = Readonly<{
  children: ReactNode;
}>;

export default function AdminRoute({ children }: AdminRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    async function loadInitialUser() {
      const nextUser = await getSupabaseSessionUser();
      setUser(nextUser);
      setAuthReady(true);
    }

    loadInitialUser();

    const { unsubscribe } = subscribeSupabaseAuth((nextUser) => {
      setUser(nextUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin(user)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
