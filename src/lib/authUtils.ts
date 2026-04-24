import type { EmailOtpType, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export function profileInitials(user: User): string {
  const meta = user.user_metadata as
    | Record<string, string | undefined>
    | undefined;
  const fullName = meta?.full_name ?? meta?.name;
  if (fullName?.trim()) {
    return fullName
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  const email = user.email ?? "";
  return (email.slice(0, 2) || "?").toUpperCase();
}

export function getUserAvatarUrl(user: User): string | undefined {
  const meta = user.user_metadata as
    | Record<string, string | undefined>
    | undefined;
  return meta?.avatar_url ?? meta?.picture;
}

export function getUserDisplayName(user: User): string {
  const meta = user.user_metadata as
    | Record<string, string | undefined>
    | undefined;
  const fullName = meta?.full_name ?? meta?.name;
  if (fullName?.trim()) return fullName.trim();
  const email = user.email ?? "";
  const local = email.split("@")[0];
  return local || "Account";
}

export async function getSupabaseSessionUser(): Promise<User | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user ?? null;
}

export function subscribeSupabaseAuth(onUser: (user: User | null) => void): {
  unsubscribe: () => void;
} {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    onUser(session?.user ?? null);
  });
  return { unsubscribe: () => subscription.unsubscribe() };
}

const SESSION_CHECK_DELAY_MS = 500;

export function getHashParams(): URLSearchParams | null {
  const hash = globalThis.location.hash?.slice(1);
  return hash ? new URLSearchParams(hash) : null;
}

export function clearAuthTokensFromUrl(): void {
  globalThis.history.replaceState(
    null,
    "",
    globalThis.location.pathname + globalThis.location.search,
  );
}

export function clearCodeFromUrl(): void {
  globalThis.history.replaceState(null, "", globalThis.location.pathname);
}

export async function verifyPkceFlow(
  token_hash: string,
  type: EmailOtpType,
): Promise<{ success: boolean; errorMessage?: string }> {
  const { error } = await supabase.auth.verifyOtp({ token_hash, type });
  if (error) return { success: false, errorMessage: error.message };
  return { success: true };
}

export async function verifyImplicitFlow(): Promise<boolean> {
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  };

  if (await checkSession()) return true;
  await new Promise((r) => setTimeout(r, SESSION_CHECK_DELAY_MS));
  return checkSession();
}

export type VerifyEmailResult = {
  success: boolean;
  errorMessage?: string;
};

async function verifyEmailWithAuthCode(
  code: string,
): Promise<VerifyEmailResult> {
  const { error: initError } = await supabase.auth.initialize();
  if (initError) {
    return { success: false, errorMessage: initError.message };
  }

  const {
    data: { session: afterInit },
  } = await supabase.auth.getSession();
  if (afterInit) {
    clearCodeFromUrl();
    return { success: true };
  }

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) {
    return { success: false, errorMessage: exchangeError.message };
  }

  const {
    data: { session: afterExchange },
  } = await supabase.auth.getSession();
  if (afterExchange) {
    clearCodeFromUrl();
    return { success: true };
  }

  return {
    success: false,
    errorMessage:
      "There was a problem verifying your email. The link may have expired or is invalid.",
  };
}

export async function handleEmailVerification(
  token_hash: string | null,
  type: EmailOtpType | null,
  code: string | null,
): Promise<VerifyEmailResult> {
  if (code) {
    return verifyEmailWithAuthCode(code);
  }

  const hashParams = getHashParams();
  const hasImplicitFlow = hashParams?.get("access_token");

  if (token_hash && type) {
    const result = await verifyPkceFlow(token_hash, type);
    if (result.success) return { success: true };
    return {
      success: false,
      errorMessage:
        result.errorMessage ??
        "There was a problem verifying your email. The link may have expired or is invalid.",
    };
  }

  if (hasImplicitFlow) {
    const sessionFound = await verifyImplicitFlow();
    if (sessionFound) {
      clearAuthTokensFromUrl();
      return { success: true };
    }
    return {
      success: false,
      errorMessage:
        "There was a problem verifying your email. The link may have expired or is invalid.",
    };
  }

  return {
    success: false,
    errorMessage: "Invalid verification link. No token provided.",
  };
}

export function signOutSupabase() {
  return supabase.auth.signOut();
}

export function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${globalThis.location.origin}/auth/callback`,
    },
  });
}
