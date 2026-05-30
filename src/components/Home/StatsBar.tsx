import { useEffect, useRef, useState } from "react";

// ── Hooks ──────────────────────────────────────────────────────────────────

function useInView(threshold = 0.2) {
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
}

// Animates a numeric value from 0 → target over `duration` ms
function useCounter(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

// ── Stat Card ─────────────────────────────────────────────────────────────

interface StatConfig {
  prefix?: string;
  numericValue?: number;   // if set → count-up animation
  displayValue: string;    // fallback / suffix-only strings like "0 SQL"
  suffix?: string;
  label: string;
  sub: string;
  icon: string;
}

function StatCard({ stat, active }: { stat: StatConfig; active: boolean }) {
  const count = useCounter(stat.numericValue ?? 0, 1800, active && !!stat.numericValue);
  const [hovered, setHovered] = useState(false);

  const displayed = stat.numericValue
    ? `${stat.prefix ?? ""}${count}${stat.suffix ?? ""}`
    : stat.displayValue;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        textAlign: "center",
        padding: "28px 20px",
        borderRadius: 20,
        background: hovered
          ? "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.06))"
          : "linear-gradient(135deg,#fafafa,#f5f5fa)",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.3)" : "#ebebf5"}`,
        boxShadow: hovered
          ? "0 8px 32px rgba(99,102,241,0.15), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Glow blob on hover */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.12),transparent 70%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s",
      }} />

      {/* Icon */}
      <div style={{
        fontSize: 22,
        marginBottom: 10,
        transform: hovered ? "scale(1.18) rotate(-5deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        display: "inline-block",
      }}>
        {stat.icon}
      </div>

      {/* Value */}
      <div style={{
        fontSize: 32,
        fontWeight: 800,
       
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        lineHeight: 1,
        marginBottom: 6,
        letterSpacing: "-0.02em",
        transition: "transform 0.2s",
      }}>
        {displayed}
      </div>

      <div style={{ color: "#374151", fontWeight: 600, fontSize: 14, marginBottom: 3 }}>
        {stat.label}
      </div>
      <div style={{ color: "#9ca3af", fontSize: 12 }}>{stat.sub}</div>

      {/* Bottom shimmer bar */}
      <div style={{
        position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2,
        borderRadius: 2,
        background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s",
      }} />
    </div>
  );
}

// ── Marquee logos ──────────────────────────────────────────────────────────

const LOGOS = [
  "Telecom Corp", "FinanceHub", "DataStream",
  "NovaSoft", "CloudBase", "MetaAnalytics",
  // duplicate for seamless loop
  "Telecom Corp", "FinanceHub", "DataStream",
  "NovaSoft", "CloudBase", "MetaAnalytics",
];

function LogoMarquee() {
  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%", marginBottom: 48 }}>
      {/* Fade masks */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(to right,white,transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(to left,white,transparent)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex",
        gap: 48,
        animation: "marquee 22s linear infinite",
        width: "max-content",
      }}>
        {LOGOS.map((name, i) => (
          <div
            key={i}
            style={{
              color: "#d1d5db",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              userSelect: "none",
              transition: "color 0.2s",
              cursor: "default",
             
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.color = "#6366f1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.color = "#d1d5db")}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

const STATS: StatConfig[] = [
  { icon: "⚡", numericValue: 10, suffix: "x", displayValue: "10x", label: "Faster insights", sub: "than traditional BI" },
  { icon: "💬", displayValue: "0 SQL", label: "Required", sub: "just natural language" },
  { icon: "🛡️", numericValue: 99, prefix: "", suffix: ".9%", displayValue: "99.9%", label: "Uptime SLA", sub: "enterprise-grade" },
  { icon: "🗄️", numericValue: 3, suffix: "+ DBs", displayValue: "3+ DBs", label: "Supported", sub: "more coming soon" },
];

export default function StatsBar() {
  const [sectionRef, inView] = useInView(0.15);

  return (
    <>
      <style>{`

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
          50%       { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
        }
      `}</style>

      <section style={{ background: "white", borderBottom: "1px solid #f3f4f6" }}>
        <div
          ref={sectionRef}
          style={{ maxWidth: 1152, margin: "0 auto", padding: "56px 24px" }}
        >
          {/* ── Headline ── */}
          <div style={{
            textAlign: "center",
            marginBottom: 40,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(99,102,241,0.07)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 999,
              padding: "6px 16px",
              marginBottom: 16,
              animation: inView ? "badgePulse 2.5s ease-in-out infinite" : "none",
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#6366f1",
                display: "inline-block",
                boxShadow: "0 0 6px rgba(99,102,241,0.6)",
              }} />
              <span style={{
                color: "#6366f1",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
               
              }}>
                TRUSTED BY INDUSTRY LEADERS
              </span>
            </div>

            <p style={{ color: "#9ca3af", fontSize: 14, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Helping to grow the next generation of{" "}
              <strong style={{
               
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                data intensive teams
              </strong>
            </p>
          </div>

          {/* ── Marquee ── */}
          <div style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease 0.15s",
          }}>
            <LogoMarquee />
          </div>

          {/* ── Stat cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}>
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
                }}
              >
                <StatCard stat={stat} active={inView} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}