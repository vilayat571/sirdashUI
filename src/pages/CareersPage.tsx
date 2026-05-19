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

const stats = [
  { num: "10%",    label: "Founding Equity" },
  { num: "€1B+",  label: "Market Opportunity" },
  { num: "500+",  label: "Enterprise Clients" },
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

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[#a5b4fc] text-[12px] tracking-[0.08em] font-semibold mb-3 uppercase">
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
    <li
      className="flex items-start gap-3 text-[14px] leading-[1.75]"
      style={{ color: muted ? "#94a3b8" : "#cbd5e1" }}
    >
      <span style={{ color, marginTop: 3, flexShrink: 0 }}>{bullet}</span>
      {children}
    </li>
  );
}

function RoleCard() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.25)" }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-6 py-6 bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[rgba(99,102,241,0.05)]"
        style={{ borderBottom: open ? "1px solid rgba(99,102,241,0.2)" : "none" }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[#e2e8f0] font-bold text-[20px]">Founding Engineer</span>
              <span
                className="px-3 py-1 rounded-full text-[11px] tracking-[0.04em]"
                style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}
              >
                Platform & DevOps
              </span>
              <span
                className="px-3 py-1 rounded-full text-[11px] tracking-[0.04em]"
                style={{ background: "rgba(52,211,153,0.12)", color: "#6ee7b7" }}
              >
                10% Equity
              </span>
            </div>
            <div className="flex flex-wrap gap-5">
              <span className="text-[#64748b] text-[14px]">📍 Berlin, Germany (Remote-friendly)</span>
              <span className="text-[#64748b] text-[14px]">⏱ Full-time · Founding role</span>
            </div>
          </div>

          {/* Arrow */}
          <div
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-[#818cf8] text-[18px] transition-transform duration-300"
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
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
          <p className="text-[#94a3b8] text-[15px] leading-[1.85]">
            You'll own the platform architecture, infrastructure, and backend systems that power our multi-database
            querying engine, semantic layer, and enterprise security controls. This is a true founding engineer
            role — your decisions will shape SirDash.ai for years.
          </p>

          <Section heading="WHAT YOU'LL BUILD">
            {responsibilities.map((r, i) => (
              <ListItem key={i} bullet="▸" color="#6366f1">{r}</ListItem>
            ))}
          </Section>

          <Section heading="REQUIRED EXPERIENCE">
            {required.map((r, i) => (
              <ListItem key={i} bullet="✓" color="#34d399">{r}</ListItem>
            ))}
          </Section>

          <Section heading="NICE TO HAVE">
            {niceToHave.map((r, i) => (
              <ListItem key={i} bullet="◦" color="#6366f1" muted>{r}</ListItem>
            ))}
          </Section>

          {/* Compensation */}
          <div
            className="rounded-xl p-5"
            style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <h3 className="text-[#a5b4fc] text-[12px] tracking-[0.08em] font-semibold mb-2 uppercase">
              COMPENSATION
            </h3>
            <p className="text-[#cbd5e1] text-[14px]">
              Competitive salary · 10% equity · Health insurance · Continuous learning budget
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:careers@sirdash.ai?subject=Founding Engineer Application"
              className="inline-block px-7 py-3.5 rounded-full text-white text-[14px] font-semibold no-underline transition-all duration-[250ms]"
              style={{ background: "rgba(99,102,241,0.85)" }}
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
              className="inline-block px-7 py-3.5 rounded-full text-[#a5b4fc] text-[14px] no-underline transition-colors duration-200 hover:bg-[rgba(99,102,241,0.1)]"
              style={{ border: "1px solid rgba(99,102,241,0.4)" }}
            >
              View Website ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      `}</style>

      <div className="relative overflow-hidden" style={{ background: "transparent" }}>

        {/* Orbs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 600, height: 600,
            background: "rgba(99,102,241,0.09)",
            top: -200, left: -120,
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 400, height: 400,
            background: "rgba(139,92,246,0.07)",
            bottom: 80, right: -80,
            filter: "blur(90px)",
          }}
        />

        {/* Hero */}
        <section className="relative z-10 pt-32 pb-20 px-6 text-center">
          <FadeIn>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.4)",
                boxShadow: "0 0 12px rgba(99,102,241,0.4)",
              }}
            >
              <span
                className="w-[7px] h-[7px] rounded-full bg-green-400 inline-block"
                style={{ boxShadow: "0 0 6px #34d399" }}
              />
              <span className="text-[#a5b4fc] text-[12px] tracking-[0.09em]">WE'RE HIRING · BERLIN</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className="car-shimmer text-[clamp(2.8rem,6.5vw,4.75rem)] font-extrabold leading-[1.07] tracking-[-0.02em] mb-5"
            >
              Shape the Future<br />of Data Intelligence
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[#94a3b8] text-[18px] max-w-[540px] mx-auto mb-10 leading-[1.75]">
              Join a well-funded team building the category-defining AI data layer for enterprises.
              Founding-level equity, serious technical challenges, real impact.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <a
              href="#open-roles"
              className="inline-block px-8 py-4 rounded-full text-white text-[15px] font-semibold no-underline tracking-[0.04em] transition-all duration-[250ms]"
              style={{ background: "rgba(99,102,241,0.85)" }}
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

        {/* Stats */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ num, label }, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(99,102,241,0.18)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.18)")}
                >
                  <div className="car-shimmer text-[28px] font-extrabold leading-none">{num}</div>
                  <div className="text-[#64748b] text-[12px] mt-[7px] tracking-[0.05em]">{label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Open Roles */}
        <section id="open-roles" className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
          <FadeIn>
            <h2 className="text-center font-bold mb-10 text-[#e2e8f0] text-[32px]">
              Open Positions
            </h2>
          </FadeIn>

          <FadeIn delay={0.08}>
            <RoleCard />
          </FadeIn>
        </section>

        {/* Perks */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
          <FadeIn>
            <h2 className="text-center font-bold mb-10 text-[#e2e8f0] text-[32px]">
              Why SirDash.ai
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map(({ symbol, title, desc }, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  className="rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-[3px]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(99,102,241,0.18)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.1)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                >
                  <div className="text-[#818cf8] text-[22px] mb-3">{symbol}</div>
                  <div className="text-[#e2e8f0] font-semibold text-[15px] mb-2">{title}</div>
                  <p className="text-[#64748b] text-[13px] leading-[1.75]">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative z-10 max-w-3xl mx-auto px-6 pb-32">
          <FadeIn>
            <div
              className="rounded-2xl p-10 text-center"
              style={{
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.22)",
              }}
            >
              <h3 className="font-bold mb-3 text-[#e2e8f0] text-[26px]">
                Don't see the right role?
              </h3>
              <p className="text-[#94a3b8] text-[15px] mb-6">
                We're always looking for exceptional people. Reach out and tell us how you'd contribute.
              </p>
              <a
                href="mailto:careers@sirdash.ai"
                className="inline-block px-7 py-3.5 rounded-full text-white text-[14px] font-semibold no-underline transition-all duration-[250ms]"
                style={{ background: "rgba(99,102,241,0.85)" }}
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