import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import BrandLogoLink from "../components/BrandLogoLink";
import { supabase } from "../lib/supabase";
import { isAdmin } from "../lib/authUtils";

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const completeAuthRedirect = async () => {
      const { error: initError } = await supabase.auth.initialize();

      if (initError) {
        toast.error(initError.message || "Sign-in failed");
        navigate("/login", { replace: true });
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        toast.success("Welcome back!");
        navigate(isAdmin(session.user) ? "/admin/dashboard" : "/", {
          replace: true,
        });
        return;
      }

      toast.error("Could not complete sign-in. Please try again.");
      navigate("/login", { replace: true });
    };

    completeAuthRedirect();
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] text-gray-900">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-brand/[0.06] blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-14 sm:px-6">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.04)] sm:p-10">
          <div className="text-center">
            <BrandLogoLink className="inline-flex items-center justify-center gap-2.5 group" />
          </div>

          <div className="mt-8 flex flex-col items-center text-center">
            <LoaderCircle
              className="h-12 w-12 animate-spin text-brand"
              aria-hidden
            />
            <p className="mt-4 text-sm text-gray-600">Signing you in…</p>
          </div>
        </div>
      </div>
    </div>
  );
}
