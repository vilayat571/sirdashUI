import { useEffect, useRef, useState } from "react";
import { companyFields, contactFields } from "../data/constants";

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
};

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};


export default function ImpressumPage() {
  return (
    <>
      <style>{`

        @keyframes imp-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .imp-shimmer {
          background: linear-gradient(90deg, #a5b4fc, #818cf8, #c4b5fd, #818cf8, #a5b4fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: imp-shimmer 4s linear infinite;
        }

        .imp-row:hover { background: rgba(99,102,241,0.06); }
        .imp-badge-glow { box-shadow: 0 0 12px rgba(99,102,241,0.4); }

        .imp-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
      `}</style>

      <div className="imp-dm relative overflow-hidden" style={{ background: "transparent" }}>

        {/* Decorative orbs */}
        <div className="imp-orb" style={{ width: 520, height: 520, background: "rgba(99,102,241,0.10)", top: -160, right: -80 }} />
        <div className="imp-orb" style={{ width: 360, height: 360, background: "rgba(139,92,246,0.07)", bottom: 120, left: -80 }} />

        {/* ── Hero ── */}
        <section className="relative z-10 pt-32 pb-20 px-6 text-center">
          <FadeIn>
            <div
              className=" inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 imp-badge-glow"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)" }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />
              <span style={{ color: "#a5b4fc", fontSize: 12, letterSpacing: "0.09em" }}>LEGAL INFORMATION</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className=" imp-shimmer"
              style={{ fontSize: "clamp(3rem,7vw,5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}
            >
              Impressum
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
              Legal disclosure and company information for SirDash.ai, as required by applicable regulations.
            </p>
          </FadeIn>
        </section>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 pb-32 space-y-6">

          {/* Company Details */}
          <FadeIn delay={0.05}>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div
                className=" px-6 py-4"
                style={{ borderBottom: "1px solid rgba(99,102,241,0.15)", background: "rgba(99,102,241,0.08)", color: "#e2e8f0", fontSize: 13, letterSpacing: "0.06em", fontWeight: 600 }}
              >
                COMPANY REGISTRATION DETAILS
              </div>

              <div>
                {companyFields.map(({ label, value }, i) => (
                  <div
                    key={i}
                    className="imp-row flex items-start gap-4 px-6 py-4"
                    style={{ borderBottom: i < companyFields.length - 1 ? "1px solid rgba(99,102,241,0.08)" : "none", transition: "background 0.2s" }}
                  >
                    <span className=" shrink-0" style={{ color: "#64748b", fontSize: 13, letterSpacing: "0.03em", width: 200, paddingTop: 2 }}>
                      {label}
                    </span>
                    <span style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.6 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.12}>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div
                className=" px-6 py-4"
                style={{ borderBottom: "1px solid rgba(99,102,241,0.15)", background: "rgba(99,102,241,0.08)", color: "#e2e8f0", fontSize: 13, letterSpacing: "0.06em", fontWeight: 600 }}
              >
                CONTACT INFORMATION
              </div>

              <div>
                {contactFields.map(({ label, value, href }, i) => (
                  <div
                    key={i}
                    className="imp-row flex items-center gap-4 px-6 py-4"
                    style={{ borderBottom: i < contactFields.length - 1 ? "1px solid rgba(99,102,241,0.08)" : "none", transition: "background 0.2s" }}
                  >
                    <span className=" shrink-0" style={{ color: "#64748b", fontSize: 13, letterSpacing: "0.03em", width: 200 }}>
                      {label}
                    </span>
                    <a
                      href={href ?? `mailto:${value}`}
                      target={href ? "_blank" : undefined}
                      rel="noreferrer"
                      style={{ color: "#818cf8", fontSize: 15, textDecoration: "none" }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = "underline")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = "none")}
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Disclaimer */}
          <FadeIn delay={0.2}>
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}
            >
              <h3 className="" style={{ color: "#a5b4fc", fontSize: 13, letterSpacing: "0.07em", fontWeight: 600, marginBottom: 12 }}>
                DISCLAIMER
              </h3>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.85 }}>
                The information contained on this website is for general informational purposes only. SirDash.ai makes
                no warranties regarding the completeness, accuracy, or suitability of this information. SirDash.ai
                shall not be liable for any losses or damages arising from the use of this website or its services.
                All content is subject to change without notice.
              </p>
            </div>
          </FadeIn>

          {/* Register source note */}
          <FadeIn delay={0.26}>
            <p className="text-center" style={{ color: "#334155", fontSize: 13 }}>
              Data sourced from{" "}
              <a
                href="https://ariregister.rik.ee/est/company/17473197"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#475569", textDecoration: "underline" }}
              >
                e-äriregister
              </a>
              {" "}· Valid as of 1 April 2026
            </p>
          </FadeIn>
        </div>
      </div>
    </>
  );
}