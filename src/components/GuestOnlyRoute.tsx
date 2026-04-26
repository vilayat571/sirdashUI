import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { subscribeSupabaseAuth } from "../lib/authUtils";

type GuestOnlyRouteProps = Readonly<{
  children: React.ReactNode;
}>;

export default function GuestOnlyRoute({ children }: GuestOnlyRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { unsubscribe } = subscribeSupabaseAuth((u) => {
      setUser(u);
      setReady(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div
          className="h-8 w-8 border-2 border-brand border-t-transparent rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
