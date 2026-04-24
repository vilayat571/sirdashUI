import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { EmailOtpType } from "@supabase/supabase-js";
import { CheckCircle, LoaderCircle, XCircle, Zap } from "lucide-react";
import { handleEmailVerification } from "../lib/authUtils";

type VerificationStatus = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const navigate = useNavigate();

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    async function verifyEmailFromLink() {
      const result = await handleEmailVerification(token_hash, type, code);

      if (result.success) {
        setStatus("success");
        setMessage(
          "Your email has been successfully verified. You can now sign in to your account."
        );
      } else {
        setStatus("error");
        setMessage(
          result.errorMessage ??
            "There was a problem verifying your email. The link may have expired or is invalid."
        );
      }
    }

    void verifyEmailFromLink();
  }, [token_hash, type, code]);

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
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand shadow-sm shadow-brand/20">
                <Zap className="h-5 w-5 text-white" fill="white" aria-hidden />
              </span>
              <span className="text-lg font-bold tracking-tight text-gray-900">
                sirdash.ai
              </span>
            </Link>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-[1.75rem]">
              Email verification
            </h1>
          </div>

          <div className="mt-8 text-center">
            {status === "loading" && (
              <div className="flex flex-col items-center">
                <LoaderCircle
                  className="h-12 w-12 animate-spin text-brand"
                  aria-hidden
                />
                <p className="mt-4 text-sm text-gray-600">{message}</p>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center">
                <CheckCircle
                  className="h-14 w-14 text-green-500"
                  aria-hidden
                />
                <p className="mt-4 text-sm text-gray-600">{message}</p>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2"
                >
                  Go to sign in
                </button>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center">
                <XCircle className="h-14 w-14 text-red-500" aria-hidden />
                <p className="mt-4 text-sm text-gray-600">{message}</p>
                <div className="mt-6 w-full space-y-3">
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="flex w-full items-center justify-center rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2"
                  >
                    Back to registration
                  </button>
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-brand hover:text-brand-dark"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
