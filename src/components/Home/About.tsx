import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
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

// ── Animated typing cursor for the badge ──────────────────────────────────
function TypingBadge({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [ref, inView] = useInView(0.4);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <div ref={ref} style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 999,
      padding: "6px 16px",
      fontSize: 13,
      fontWeight: 700,
      color: "#6366f1",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      marginBottom: 24,
      letterSpacing: "0.04em",
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%",
        background: "#6366f1",
        display: "inline-block",
        boxShadow: "0 0 6px rgba(99,102,241,0.5)",
        flexShrink: 0,
      }} />
      {displayed}
      <span style={{
        display: "inline-block",
        width: 2, height: 14,
        background: "#6366f1",
        borderRadius: 1,
        marginLeft: 1,
        opacity: displayed.length < text.length ? 1 : 0,
        transition: "opacity 0.2s",
      }} />
    </div>
  );
}

// ── Feature card ───────────────────────────────────────────────────────────
interface CardProps {
  badge: string;
  badgeColor: string;
  glowColor: string;
  title: string;
  desc: string;
  icon: string;
  delay: number;
  active: boolean;
}

function FeatureCard({ badge, badgeColor, glowColor, title, desc, icon, delay, active }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "white",
        borderRadius: 20,
        border: `1px solid ${hovered ? glowColor + "55" : "#f3f4f6"}`,
        padding: "28px 24px",
        boxShadow: hovered
          ? `0 16px 48px ${glowColor}22, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 2px 8px rgba(0,0,0,0.04)",
        transform: active
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(24px)",
        opacity: active ? 1 : 0,
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.34,1.4,0.64,1) ${delay}s, box-shadow 0.3s ease, border-color 0.3s ease`,
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Top glow blob */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 120,
        background: `radial-gradient(ellipse at 50% 0%, ${glowColor}18, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
        pointerEvents: "none",
      }} />

      {/* Animated icon */}
      <div style={{
        width: 44, height: 44,
        borderRadius: 14,
        background: glowColor + "15",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22,
        marginBottom: 16,
        transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered ? `0 4px 16px ${glowColor}30` : "none",
      }}>
        {icon}
      </div>

      <div
        className={badgeColor}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 999,
          padding: "3px 10px",
          fontSize: 11,
          fontWeight: 700,
          marginBottom: 14,
          letterSpacing: "0.04em",
        }}
      >
        {badge}
      </div>

      <h3 style={{
        color: "#111827",
        fontWeight: 800,
        fontSize: 18,
        marginBottom: 10,
        letterSpacing: "-0.01em",
        lineHeight: 1.3,
      }}>
        {title}
      </h3>

      <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{desc}</p>

      {/* Animated "Learn more" */}
      <button style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "#6366f1",
        fontSize: 13,
        fontWeight: 700,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        transition: "gap 0.2s",
      }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.gap = "10px")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.gap = "6px")}
      >
        Learn More
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22, height: 22,
          borderRadius: "50%",
          background: "rgba(99,102,241,0.1)",
          fontSize: 13,
          transition: "background 0.2s",
        }}>→</span>
      </button>

      {/* Bottom shimmer bar */}
      <div style={{
        position: "absolute", bottom: 0, left: "15%", right: "15%", height: 2,
        borderRadius: 2,
        background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />
    </div>
  );
}

// ── Connect banner ─────────────────────────────────────────────────────────
function ConnectBanner({ active }: { active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "white",
        borderRadius: 20,
        border: `1px solid ${hovered ? "rgba(99,102,241,0.35)" : "#f3f4f6"}`,
        padding: "32px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
        boxShadow: hovered
          ? "0 12px 40px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.65s ease 0.45s, transform 0.65s ease 0.45s, box-shadow 0.3s, border-color 0.3s",
        overflow: "hidden",
        flexWrap: "wrap",
      }}
    >
      {/* Background shimmer on hover */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 0% 50%, rgba(99,102,241,0.05), transparent 60%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Icon */}
      <div style={{
        flexShrink: 0,
        width: 52, height: 52,
        borderRadius: 16,
        background: "rgba(99,102,241,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26,
        transform: hovered ? "rotate(-8deg) scale(1.08)" : "rotate(0) scale(1)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered ? "0 4px 16px rgba(99,102,241,0.2)" : "none",
      }}>
        🔗
      </div>

      <div style={{ flex: 1, minWidth: 200 }}>
        <h3 style={{ color: "#111827", fontWeight: 800, fontSize: 20, marginBottom: 6, }}>
          Connect SirDash To Your Stack
        </h3>
        <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
          Connect in minutes with PostgreSQL, Microsoft SQL Server, or Oracle Database. We'll jump on a call to onboard you and configure your semantic data layer from day one.
        </p>
      </div>

      <a
        href="#demo"
        style={{
          flexShrink: 0,
          background: hovered
            ? "linear-gradient(135deg,#6366f1,#7c3aed)"
            : "linear-gradient(135deg,#6366f1,#818cf8)",
          color: "white",
          fontWeight: 700,
          padding: "13px 24px",
          borderRadius: 14,
          fontSize: 14,
          textDecoration: "none",
          whiteSpace: "nowrap",
          transition: "all 0.3s",
          boxShadow: hovered ? "0 6px 24px rgba(99,102,241,0.4)" : "0 4px 16px rgba(99,102,241,0.25)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          display: "inline-block",
        }}
      >
        Book A Demo ↗
      </a>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────

const CARDS = [
  {
    badge: "+ REAL-TIME ANALYTICS",
    badgeColor: "text-red-500 bg-red-50 border-red-200",
    glowColor: "#ef4444",
    icon: "📊",
    title: "Dashboards In Seconds",
    desc: "Plan, collaborate, and query your data in seconds. No SQL knowledge needed—our AI translates your questions into powerful database queries automatically.",
  },
  {
    badge: "+ BETTER INSIGHTS",
    badgeColor: "text-green-600 bg-green-50 border-green-200",
    glowColor: "#22c55e",
    icon: "🧠",
    title: "AI-Driven Insights",
    desc: "Our Agentic RAG Intelligence actively shapes responses based on your specific domain knowledge. Get insights tailored to your business context every time.",
  },
  {
    badge: "+ NO MORE SQL",
    badgeColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
    glowColor: "#6366f1",
    icon: "✍️",
    title: "Write Queries In English",
    desc: "Natural language queries are transformed into precise SQL statements. Ask anything in plain English and get perfectly structured results instantly.",
  },
];

export default function About() {
  const [sectionRef, inView] = useInView(0.1);
  const [headingRef, headingVisible] = useInView(0.3);

  return (
    <>
      <style>{`

        @keyframes about-float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes about-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <section id="about" style={{ background: "#f9fafb", padding: "112px 0 96px", position: "relative", overflow: "hidden" }}>

        {/* Decorative background shapes */}
        <div style={{
          position: "absolute", top: -80, right: -80, width: 320, height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 40, left: -60, width: 240, height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.05), transparent 70%)",
          pointerEvents: "none",
        }} />

        <div ref={sectionRef} style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>

          {/* ── Heading block ── */}
          <div ref={headingRef} style={{ textAlign: "center", marginBottom: 64 }}>

            <TypingBadge text="+ NATURAL LANGUAGE DATA ACCESS" />

            <h2 style={{
              fontSize: "clamp(2.2rem,5vw,3.2rem)",
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              marginBottom: 16,
             
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}>
              Connect Instantly With<br />All Your Data Sources
            </h2>

            <p style={{
              color: "#6b7280",
              fontSize: 18,
              maxWidth: 480,
              margin: "0 auto 32px",
              lineHeight: 1.75,
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.32s, transform 0.6s ease 0.32s",
            }}>
              No SQL, no complicated setup—just ask your data questions in plain English and get instant answers.
            </p>

            {/* CTA */}
            <div style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease 0.42s, transform 0.6s ease 0.42s",
            }}>
              <a
                href="#demo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "linear-gradient(135deg,#6366f1,#818cf8)",
                  color: "white",
                  fontWeight: 700,
                  padding: "14px 28px",
                  borderRadius: 14,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 8px 28px rgba(99,102,241,0.3)",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = "0 12px 36px rgba(99,102,241,0.45)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 8px 28px rgba(99,102,241,0.3)";
                }}
              >
                Book A Demo
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 24, height: 24, borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  fontSize: 15,
                }}>↗</span>
              </a>
            </div>
          </div>

          {/* ── Feature cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
            marginBottom: 20,
          }}>
            {CARDS.map((card, i) => (
              <FeatureCard
                key={card.title}
                {...card}
                delay={0.1 + i * 0.12}
                active={inView}
              />
            ))}
          </div>

          {/* ── Connect banner ── */}
          <ConnectBanner active={inView} />
        </div>
      </section>
    </>
  );
}