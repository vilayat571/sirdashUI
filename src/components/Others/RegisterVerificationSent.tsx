import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogoLink from "./BrandLogoLink";

type RegisterVerificationSentProps = Readonly<{
  email: string;
  onBackToRegistration: () => void;
}>;

export default function RegisterVerificationSent({
  email,
  onBackToRegistration,
}: RegisterVerificationSentProps) {
  return (
    <div className="relative min-h-screen bg-[#F9FAFB] text-gray-900">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-brand/[0.06] blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
      </div>

      <Link
        to="/"
        className="absolute left-4 top-6 z-20 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:left-6 lg:left-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Home
      </Link>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-14 sm:px-6">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.04)] sm:p-10">
          <div className="text-center">
            <BrandLogoLink className="inline-flex items-center justify-center gap-2.5 transition-opacity hover:opacity-80 group" />

            <div className="mt-6 flex justify-center">
              <CheckCircle className="h-14 w-14 text-green-500" aria-hidden />
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-[1.75rem]">
              Check your inbox
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {"We sent a verification link to "}
              <span className="font-medium text-gray-700">{email}</span>
              {". Click the link in the email to complete your registration."}
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              to="/login"
              className="flex w-full items-center justify-center rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2"
            >
              Go to sign in
            </Link>
            <button
              type="button"
              onClick={onBackToRegistration}
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              Back to registration
            </button>
            <p className="pt-1 text-center text-xs text-gray-500">
              {"Didn't get the email? Check your spam folder or try again."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
