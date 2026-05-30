import { useState, useEffect } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function detectSource(): "popup" | "footer" | "landing" | "other" {
  if (typeof window === "undefined") return "popup";
  const path = window.location.pathname;
  if (path === "/" || path === "/home") return "landing";
  return "popup";
}

export function SubscribePopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isResubscribe, setIsResubscribe] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setClosing(true);
    setTimeout(() => { setVisible(false); setClosing(false); }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source: detectSource(),
        }),
      });
      const data = await res.json();
      if (res.status === 409) { setError("This email is already subscribed."); return; }
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setIsResubscribe(res.status === 200);
      setSubmitted(true);
      setTimeout(close, 3200);
    } catch (err: any) {
      setError(err.message || "Unable to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes sp-in   { from{opacity:0;transform:translateY(18px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes sp-out  { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(12px) scale(0.96)} }
        @keyframes bd-in   { from{opacity:0} to{opacity:1} }
        @keyframes bd-out  { from{opacity:1} to{opacity:0} }
        @keyframes success { 0%{opacity:0;transform:scale(0.8)} 65%{transform:scale(1.06)} 100%{opacity:1;transform:scale(1)} }
        @keyframes check   { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes prog    { from{width:0%} to{width:100%} }

        .anim-sp-in    { animation: sp-in  0.4s cubic-bezier(0.34,1.3,0.64,1) forwards; }
        .anim-sp-out   { animation: sp-out 0.3s ease forwards; }
        .anim-bd-in    { animation: bd-in  0.3s ease forwards; }
        .anim-bd-out   { animation: bd-out 0.3s ease forwards; }
        .anim-success  { animation: success 0.5s cubic-bezier(0.34,1.3,0.64,1) forwards; }
        .anim-check    { stroke-dasharray:60; stroke-dashoffset:60; animation: check 0.5s ease 0.15s forwards; }
        .anim-spinner  { animation: spin 0.65s linear infinite; }
        .anim-prog     { animation: prog 3.2s linear forwards; }
      `}</style>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-black/25 backdrop-blur-[5px] ${closing ? "anim-bd-out" : "anim-bd-in"}`}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        {/* Card */}
        <div className={`relative w-full max-w-[400px] bg-white rounded-[22px] border border-black/[0.07] shadow-[0_8px_50px_rgba(0,0,0,0.13)] overflow-hidden ${closing ? "anim-sp-out" : "anim-sp-in"}`}>

          {/* Top accent bar */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#5b5bd6] via-[#818cf8] to-[#5b5bd6]" />

          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-3.5 right-3.5 w-[28px] h-[28px] flex items-center justify-center rounded-full border border-black/10 text-[#999] hover:bg-black/[0.06] hover:text-[#111] transition-all duration-200"
          >
            <X size={13} />
          </button>

          <div className="px-8 pt-9 pb-7">
            {!submitted ? (
              /* ── Form ── */
              <>
                {/* Tag */}
                <span className="inline-flex items-center gap-1.5 mb-[18px] px-2.5 py-[5px] rounded-full bg-[#f0efff] border border-[#dddcff]">
                  <Sparkles size={10} className="text-[#5b5bd6]" />
                  <span className="text-[10px] font-semibold tracking-[0.09em] uppercase text-[#5b5bd6]">
                    Early access
                  </span>
                </span>

                <h2 className="text-[21px] font-bold text-[#0f0f0f] tracking-[-0.02em] leading-snug mb-2">
                  Stay in the loop
                </h2>
                <p className="text-[13.5px] text-[#6b7280] leading-[1.7] mb-6">
                  Get product updates, feature releases, and occasional tips — no noise.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      disabled={loading}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      style={{
                        borderColor: focused ? "#5b5bd6" : "rgba(0,0,0,0.14)",
                        boxShadow: focused ? "0 0 0 3px rgba(91,91,214,0.14)" : "none",
                      }}
                      className="flex-1 min-w-0 px-3.5 py-[10px] text-[13.5px] text-[#111] font-[inherit] bg-[#fafafa] rounded-xl border outline-none placeholder:text-[#ccc] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-1.5 px-4 py-[10px] text-white text-[13px] font-semibold font-[inherit] rounded-xl border-none cursor-pointer whitespace-nowrap flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-px"
                      style={{
                        background: "linear-gradient(135deg, #5b5bd6, #7c7cec)",
                        boxShadow: "0 4px 16px rgba(91,91,214,0.38)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 22px rgba(91,91,214,0.5)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(91,91,214,0.38)")}
                    >
                      {loading
                        ? <span className="anim-spinner inline-block w-[15px] h-[15px] rounded-full border-2 border-white/30 border-t-white flex-shrink-0" />
                        : <><span>Subscribe</span><ArrowRight size={13} /></>
                      }
                    </button>
                  </div>

                  {error && (
                    <p className="mt-2 text-[12px] text-red-500 leading-snug">{error}</p>
                  )}
                </form>

                <p className="mt-4 text-center text-[11px] text-[#c0c0c0]">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              /* ── Success ── */
              <div className="anim-success flex flex-col items-center text-center gap-3 py-5">
                {/* Animated check ring */}
                <div
                  className="w-[58px] h-[58px] flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 mb-1"
                  style={{ boxShadow: "0 0 22px rgba(34,197,94,0.14)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      className="anim-check"
                      d="M6 14 L11.5 20 L22 9"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="text-[20px] font-bold text-[#0f0f0f] tracking-[-0.02em]">
                  {isResubscribe ? "Welcome back!" : "You're in!"}
                </p>

                <p className="text-[13.5px] text-[#6b7280] leading-[1.65] max-w-[258px]">
                  {isResubscribe
                    ? "Great to have you back. You're all caught up on our latest updates."
                    : "Thanks for subscribing. We'll be in touch with updates and early access."}
                </p>

                {/* Auto-close progress bar */}
                <div className="w-full mt-2 h-[3px] rounded-full bg-emerald-100 overflow-hidden">
                  <div className="anim-prog h-full bg-emerald-400 rounded-full" style={{ width: 0 }} />
                </div>
                <p className="text-[11px] text-[#c4c4c4]">Closing automatically…</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SubscribePopup;