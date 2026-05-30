import { useEffect, useRef, useState } from "react";

const useInView = (threshold = 0.12) => {
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

// ── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { num: "10%",    label: "Founding Equity" },
  { num: "Big",  label: "Market Opportunity" },
  { num: "Massive",  label: "Potential Clients" },
  { num: "Berlin",label: "Headquarters" },
];

const perks = [
  { symbol: "⬡", title: "Founding Equity",  desc: "10% equity stake — genuine co-founder-level ownership from day one." },
  { symbol: "⬢", title: "Remote-Friendly",  desc: "Berlin-based with flexibility for the right candidate globally." },
  { symbol: "⬣", title: "Learning Budget",  desc: "Continuous learning & conference budget to keep you sharp." },
  { symbol: "⬤", title: "Health Insurance", desc: "Comprehensive health coverage starting from your first day." },
  { symbol: "◈", title: "Strong Backing",   desc: "Well-funded and laser-focused on becoming the category leader." },
  { symbol: "◉", title: "Elite Team",       desc: "Veterans from Mercedes-Benz CARIAD, SumUp, and ServiceNow." },
];

const responsibilities = [
  "Design stateless, scalable platform architecture for thousands of concurrent users",
  "Build multi-database connectors: PostgreSQL, MySQL, SQL Server, Snowflake, BigQuery, Databricks, Redshift, Azure",
  "Architect cloud-agnostic CI/CD & DevOps infrastructure for on-prem and cloud deployments",
  "Implement performance optimisation across query execution, caching, and resource management",
  "Design RBAC, audit trails, and GDPR-compliant security & compliance frameworks",
  "Build monitoring & observability systems with granular platform visibility",
  "Partner with the CTO to set technical direction and mentor future engineers",
];

const required = [
  "5+ years in backend development, DevOps, or platform engineering",
  "Strong Python expertise — async patterns, performance optimisation",
  "C / systems programming for performance-critical components",
  "Production experience with AWS, GCP, or Azure",
  "Deep knowledge of PostgreSQL, MySQL, SQL Server, and modern data warehouses",
  "Docker, Kubernetes, or equivalent containerisation & orchestration",
  "Experience building robust CI/CD pipelines and infrastructure automation",
];

const niceToHave = [
  "Multi-database architectures or data virtualisation",
  "Background in data engineering, analytics platforms, or BI tools",
  "LLM integrations or AI/ML infrastructure",
  "On-premise enterprise deployment experience",
  "Startup or scale-up environment exposure",
];

// ── Sub-components ─────────────────────────────────────────────────────────

function RoleCard() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.25)" }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-6 py-6"
        style={{
          background: "transparent",
          cursor: "pointer",
          borderBottom: open ? "1px solid rgba(99,102,241,0.2)" : "none",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.05)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className=" font-bold" style={{ color: "#e2e8f0", fontSize: 20 }}>
                Founding Engineer
              </span>
              <span
                className=" px-3 py-1 rounded-full"
                style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc", fontSize: 11, letterSpacing: "0.04em" }}
              >
                Platform & DevOps
              </span>
              <span
                className=" px-3 py-1 rounded-full"
                style={{ background: "rgba(52,211,153,0.12)", color: "#6ee7b7", fontSize: 11, letterSpacing: "0.04em" }}
              >
                10% Equity
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-5">
              <span style={{ color: "#64748b", fontSize: 14 }}>📍 Berlin, Germany (Remote-friendly)</span>
              <span style={{ color: "#64748b", fontSize: 14 }}>⏱ Full-time · Founding role</span>
            </div>
          </div>

          {/* Arrow */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#818cf8",
              fontSize: 18,
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            →
          </div>
        </div>
      </button>

      {/* Expandable body */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 2400 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
        }}
      >
        <div className="px-6 pb-8 pt-6 space-y-8">

          {/* About */}
          <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.85 }}>
            You'll own the platform architecture, infrastructure, and backend systems that power our multi-database
            querying engine, semantic layer, and enterprise security controls. This is a true founding engineer
            role — your decisions will shape SirDash.ai for years.
          </p>

          {/* Responsibilities */}
          <Section heading="WHAT YOU'LL BUILD">
            {responsibilities.map((r, i) => (
              <ListItem key={i} bullet="▸" color="#6366f1">{r}</ListItem>
            ))}
          </Section>

          {/* Required */}
          <Section heading="REQUIRED EXPERIENCE">
            {required.map((r, i) => (
              <ListItem key={i} bullet="✓" color="#34d399">{r}</ListItem>
            ))}
          </Section>

          {/* Nice to have */}
          <Section heading="NICE TO HAVE">
            {niceToHave.map((r, i) => (
              <ListItem key={i} bullet="◦" color="#6366f1" muted>{r}</ListItem>
            ))}
          </Section>

          {/* Compensation */}
          <div className="rounded-xl p-5" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <h3 className="" style={{ color: "#a5b4fc", fontSize: 12, letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>
              COMPENSATION
            </h3>
            <p style={{ color: "#cbd5e1", fontSize: 14 }}>
              Competitive salary · 10% equity · Health insurance · Continuous learning budget
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:careers@sirdash.ai?subject=Founding Engineer Application"
              className="car-apply-btn "
              style={{
                display: "inline-block",
                padding: "13px 28px",
                borderRadius: 999,
                background: "rgba(99,102,241,0.85)",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(99,102,241,1)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 30px rgba(99,102,241,0.4)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(99,102,241,0.85)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              Apply Now →
            </a>

            <a
              href="https://www.sirdash.ai"
              target="_blank"
              rel="noreferrer"
              className=""
              style={{
                display: "inline-block",
                padding: "13px 28px",
                borderRadius: 999,
                border: "1px solid rgba(99,102,241,0.4)",
                color: "#a5b4fc",
                fontSize: 14,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(99,102,241,0.1)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
            >
              View Website ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className=""
        style={{ color: "#a5b4fc", fontSize: 12, letterSpacing: "0.08em", fontWeight: 600, marginBottom: 12 }}
      >
        {heading}
      </h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function ListItem({
  children,
  bullet,
  color,
  muted = false,
}: {
  children: React.ReactNode;
  bullet: string;
  color: string;
  muted?: boolean;
}) {
  return (
    <li className="flex items-start gap-3" style={{ color: muted ? "#94a3b8" : "#cbd5e1", fontSize: 14, lineHeight: 1.75 }}>
      <span style={{ color, marginTop: 3, flexShrink: 0 }}>{bullet}</span>
      {children}
    </li>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function CareersPage() {
  return (
    <>
      <style>{`

        @keyframes car-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .car-shimmer {
          background: linear-gradient(90deg, #a5b4fc, #818cf8, #c4b5fd, #818cf8, #a5b4fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: car-shimmer 4s linear infinite;
        }

        .car-stat:hover  { transform: translateY(-4px); border-color: rgba(99,102,241,0.5) !important; }
        .car-perk:hover  { transform: translateY(-3px); background: rgba(99,102,241,0.1) !important; }
        .car-badge-glow  { box-shadow: 0 0 12px rgba(99,102,241,0.4); }

        .car-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
      `}</style>

      <div className="car-dm relative overflow-hidden" style={{ background: "transparent" }}>

        {/* Orbs */}
        <div className="car-orb" style={{ width: 600, height: 600, background: "rgba(99,102,241,0.09)", top: -200, left: -120 }} />
        <div className="car-orb" style={{ width: 400, height: 400, background: "rgba(139,92,246,0.07)", bottom: 80, right: -80 }} />

        {/* ── Hero ── */}
        <section className="relative z-10 pt-32 pb-20 px-6 text-center">
          <FadeIn>
            <div
              className=" inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 car-badge-glow"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)" }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block", boxShadow: "0 0 6px #34d399" }} />
              <span style={{ color: "#a5b4fc", fontSize: 12, letterSpacing: "0.09em" }}>WE'RE HIRING · BERLIN</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className=" car-shimmer"
              style={{ fontSize: "clamp(2.8rem,6.5vw,4.75rem)", fontWeight: 800, lineHeight: 1.07, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}
            >
              Shape the Future<br />of Data Intelligence
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 540, margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
              Join a well-funded team building the category-defining AI data layer for enterprises.
              Founding-level equity, serious technical challenges, real impact.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <a
              href="#open-roles"
              className=" inline-block px-8 py-4 rounded-full font-semibold"
              style={{
                background: "rgba(99,102,241,0.85)",
                color: "white",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(99,102,241,1)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 28px rgba(99,102,241,0.4)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(99,102,241,0.85)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              See Open Roles ↓
            </a>
          </FadeIn>
        </section>

        {/* ── Stats ── */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ num, label }, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  className="car-stat rounded-2xl p-6 text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.18)", transition: "all 0.3s" }}
                >
                  <div className=" car-shimmer" style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{num}</div>
                  <div className="" style={{ color: "#64748b", fontSize: 12, marginTop: 7, letterSpacing: "0.05em" }}>{label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Open Roles ── */}
        <section id="open-roles" className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
          <FadeIn>
            <h2 className=" text-center font-bold mb-10" style={{ color: "#e2e8f0", fontSize: 32 }}>
              Open Positions
            </h2>
          </FadeIn>

          <FadeIn delay={0.08}>
            <RoleCard />
          </FadeIn>
        </section>

        {/* ── Perks ── */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
          <FadeIn>
            <h2 className=" text-center font-bold mb-10" style={{ color: "#e2e8f0", fontSize: 32 }}>
              Why SirDash.ai
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map(({ symbol, title, desc }, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  className="car-perk rounded-2xl p-6 h-full"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.18)", transition: "all 0.3s" }}
                >
                  <div style={{ color: "#818cf8", fontSize: 22, marginBottom: 12 }}>{symbol}</div>
                  <div className=" font-semibold" style={{ color: "#e2e8f0", fontSize: 15, marginBottom: 8 }}>{title}</div>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="relative z-10 max-w-3xl mx-auto px-6 pb-32">
          <FadeIn>
            <div
              className="rounded-2xl p-10 text-center"
              style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.22)" }}
            >
              <h3 className=" font-bold mb-3" style={{ color: "#e2e8f0", fontSize: 26 }}>
                Don't see the right role?
              </h3>
              <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 24 }}>
                We're always looking for exceptional people. Reach out and tell us how you'd contribute.
              </p>
              <a
                href="mailto:careers@sirdash.ai"
                className=" inline-block px-7 py-3.5 rounded-full font-semibold"
                style={{
                  background: "rgba(99,102,241,0.85)",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(99,102,241,1)";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 8px 28px rgba(99,102,241,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(99,102,241,0.85)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                Get In Touch →
              </a>
            </div>
          </FadeIn>
        </section>

      </div>
    </>
  );
}