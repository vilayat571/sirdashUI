import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, LoaderCircle, Mail, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const forgotSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (_data: ForgotFormValues) => {
    await new Promise((r) => setTimeout(r, 500));
    setIsSuccess(true);
  };

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
        className="absolute left-2 top-6 z-20 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:left-6 lg:left-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Home
      </Link>

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
              {isSuccess ? "Check your email" : "Forgot your password?"}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {isSuccess ? (
                <>
                  If an account exists for{" "}
                  <span className="font-medium text-gray-700">
                    {getValues("email")}
                  </span>
                  {", you'll receive a reset link shortly."}
                </>
              ) : (
                "Enter your email and we'll send you a link to reset your password."
              )}
            </p>
          </div>

          <div className="mt-8">
            {isSuccess ? (
              <div className="space-y-6">
                <p className="text-center text-sm text-gray-600">
                  {
                    "Didn't get the email? Check your spam folder or try again in a few minutes."
                  }
                </p>
                <Link
                  to="/login"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand/20"
                >
                  Back to sign in
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <div>
                  <label
                    htmlFor="forgot-email"
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
                      id="forgot-email"
                      type="email"
                      autoComplete="email"
                      className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/15"
                      placeholder="Enter your mail"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "forgot-email-error" : undefined
                      }
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p
                      id="forgot-email-error"
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <LoaderCircle
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden
                      />
                      Sending link…
                    </span>
                  ) : (
                    "Send reset link"
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  <Link
                    to="/login"
                    className="font-medium text-brand hover:text-brand-dark"
                  >
                    Back to sign in
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
