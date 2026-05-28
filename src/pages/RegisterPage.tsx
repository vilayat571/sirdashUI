import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LoaderCircle,
  Mail,
  UserPlus,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import BrandLogoLink from "../components/BrandLogoLink";
import RegisterVerificationSent from "../components/RegisterVerificationSent";
import type { RegisterFormValues } from "../lib/authSchemas";
import { registerSchema } from "../lib/authSchemas";
import { supabase } from "../lib/supabase";
import { signInWithGoogle } from "../lib/authUtils";

export default function RegisterPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
        emailRedirectTo: `${globalThis.location.origin}/verify-email`,
      },
    });

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    setSubmittedEmail(data.email);
    setVerificationSent(true);
    toast.success("Verification email sent");
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message || "Could not sign up with Google");
        setIsGoogleLoading(false);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not sign up with Google";
      toast.error(message);
      setIsGoogleLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <RegisterVerificationSent
        email={submittedEmail}
        onBackToRegistration={() => setVerificationSent(false)}
      />
    );
  }

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
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-[1.75rem]">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-brand hover:text-brand-dark"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => {
                handleGoogleSignUp().catch(() => undefined);
              }}
              disabled={isGoogleLoading}
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              {isGoogleLoading ? "Connecting…" : "Continue with Google"}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs font-medium">
                <span className="bg-white px-3 text-gray-400">
                  or with email
                </span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    aria-hidden
                  />
                  <input
                    id="register-name"
                    type="text"
                    autoComplete="name"
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/15"
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? "register-name-error" : undefined
                    }
                    {...register("fullName")}
                  />
                </div>
                {errors.fullName && (
                  <p
                    id="register-name-error"
                    className="mt-1.5 text-sm text-red-600"
                  >
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    aria-hidden
                  />
                  <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/15"
                    placeholder="Enter your email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "register-email-error" : undefined
                    }
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p
                    id="register-email-error"
                    className="mt-1.5 text-sm text-red-600"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/15"
                    placeholder="Create a password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "register-password-error" : undefined
                    }
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand/20"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="register-password-error"
                    className="mt-1.5 text-sm text-red-600"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="register-confirm"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="register-confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/15"
                    placeholder="Confirm your password"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={
                      errors.confirmPassword
                        ? "register-confirm-error"
                        : undefined
                    }
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand/20"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    id="register-confirm-error"
                    className="mt-1.5 text-sm text-red-600"
                  >
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="pt-1">
                <div className="flex items-start gap-2.5">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-brand focus:ring-2 focus:ring-brand/30"
                    aria-invalid={Boolean(errors.acceptTerms)}
                    aria-describedby={
                      errors.acceptTerms ? "register-terms-error" : undefined
                    }
                    {...register("acceptTerms")}
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm leading-snug text-gray-600"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      className="inline p-0 font-medium text-brand underline-offset-2 hover:text-brand-dark hover:underline"
                    >
                      Terms
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="inline p-0 font-medium text-brand underline-offset-2 hover:text-brand-dark hover:underline"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p
                    id="register-terms-error"
                    className="mt-1.5 text-sm text-red-600"
                  >
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <LoaderCircle
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden
                    />
                    Creating account…
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" aria-hidden />
                    Create account
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
