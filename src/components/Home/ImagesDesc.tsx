"use client";
import { useEffect, useRef, useState } from "react";
import booth1 from "../../assets/images/image.jpeg";
import booth2 from "../../assets/images/image1.jpeg";

export const STATS = [
  { value: "70%", label: "Less reporting time", icon: "⚡" },
  { value: "<30s", label: "Time to first insight", icon: "⏱" },
  { value: "3×", label: "Analyst productivity", icon: "📈" },
  { value: "3k+", label: "Databases supported", icon: "🗄" },
];

const MILESTONES = [
  { year: "2022", title: "Founded in Berlin", desc: "Born out of frustration with traditional BI tools — we set out to make data accessible to everyone.", color: "#a78bfa" },
  { year: "2023", title: "First Enterprise Clients", desc: "Onboarded first enterprise customers in telecom and finance, validating product-market fit.", color: "#60a5fa" },
  { year: "2024", title: "Agentic RAG v2", desc: "Shipped our proprietary Agentic RAG engine — domain-aware, schema-aware, conversationally refineable.", color: "#34d399" },
  { year: "2025", title: "Global Stage", desc: "Presented at leading tech conferences worldwide, recognized in the AI & Machine Learning category.", color: "#f472b6" },
];

function useInViewOnce(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

export default function ImagesDesc() {
  const [heroRef, heroVisible] = useInViewOnce();
  const [statsRef, statsVisible] = useInViewOnce();
  const [photosRef, photosVisible] = useInViewOnce();
  const [timelineRef, timelineVisible] = useInViewOnce();

  return (
    <section id="about" style={{ background: "#07080f", overflow: "hidden" }}>
      <style>{`
        /* ── Nickel chrome token system ── */
        :root {
          --ni-bg: #07080f;
          --ni-surface: #0e0f1a;
          --ni-border: rgba(255,255,255,0.07);
          --ni-border-hi: rgba(255,255,255,0.13);
          --ni-chrome: linear-gradient(135deg, #c8cdd8 0%, #e8eaf0 40%, #9ea5b8 100%);
          --ni-glow: rgba(148,163,184,0.12);
          --ni-accent: #818cf8;
          --ni-accent2: #a78bfa;
          --ni-text: rgba(255,255,255,0.85);
          --ni-muted: rgba(255,255,255,0.35);
        }

        /* Nickel plate card */
        .ni-card {
          background: linear-gradient(145deg, #12131f 0%, #0e0f1a 60%, #131420 100%);
          border: 1px solid var(--ni-border-hi);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .ni-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg,
            rgba(255,255,255,0.06) 0%,
            rgba(255,255,255,0.01) 40%,
            transparent 100%);
          border-radius: inherit;
          pointer-events: none;
        }
        .ni-card:hover {
          transform: translateY(-3px);
          border-color: rgba(129,140,248,0.25);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(129,140,248,0.1), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* Chrome text */
        .ni-chrome-text {
          background: linear-gradient(135deg, #c8cdd8 0%, #ffffff 45%, #9ea5b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Accent gradient text */
        .ni-accent-text {
          background: linear-gradient(135deg, var(--ni-accent), var(--ni-accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Pill badge */
        .ni-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--ni-border-hi);
          border-radius: 999px;
          padding: 5px 14px 5px 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .ni-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--ni-accent);
          box-shadow: 0 0 8px var(--ni-accent);
          animation: ni-pulse 2s ease-in-out infinite;
        }
        @keyframes ni-pulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:0.5;transform:scale(0.75)}
        }

        /* Horizontal rule */
        .ni-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--ni-border-hi), transparent);
        }

        /* Stat value */
        .ni-stat-val {
          font-size: clamp(2rem,4vw,2.8rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        /* Timeline dot ring */
        .ni-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          background: var(--ni-accent);
          box-shadow: 0 0 0 4px rgba(129,140,248,0.15), 0 0 16px rgba(129,140,248,0.4);
          position: absolute;
          left: 50%; top: 20px;
          transform: translate(-50%,-50%);
          z-index: 2;
        }

        /* Photo frame */
        .ni-photo-frame {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--ni-border-hi);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 32px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08);
          position: relative;
        }
        .ni-photo-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%);
          pointer-events: none;
        }

        /* CTA button */
        .ni-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #6366f1, #818cf8);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 28px;
          border-radius: 12px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.01em;
        }
        .ni-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        /* Checklist row */
        .ni-check {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }
        .ni-check-icon {
          flex-shrink: 0;
          width: 20px; height: 20px;
          border-radius: 6px;
          background: rgba(129,140,248,0.12);
          border: 1px solid rgba(129,140,248,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          color: var(--ni-accent);
          margin-top: 1px;
        }

        @media(max-width:768px){
          .ni-two-col { grid-template-columns: 1fr !important; }
          .ni-tl-card { width: 80% !important; margin: 0 auto !important; }
          .ni-tl-label { display: none; }
          .ni-timeline-line { left: 20px !important; }
          .ni-dot { left: 20px !important; }
          .ni-tl-row { justify-content: flex-end !important; padding-left: 48px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div style={{
        padding: "130px 24px 110px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black, transparent)",
        }} />

        <div ref={heroRef} style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
          }}>
            <div className="ni-badge">
              <span className="ni-badge-dot" />
              Our Story
            </div>

            <h2 style={{
              fontSize: "clamp(2.8rem, 6vw, 4.4rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              margin: 0,
            }}>
              <span className="ni-chrome-text">We're Building the </span>
              <span className="ni-accent-text">Future</span>
              <span className="ni-chrome-text"> of Data Access</span>
            </h2>

            <p style={{
              color: "var(--ni-muted)",
              fontSize: 17,
              lineHeight: 1.8,
              maxWidth: 520,
              margin: 0,
              fontWeight: 300,
            }}>
              SirDash AI was founded in Berlin with a single conviction: every
              person in a company deserves direct access to their data —
              no SQL, no tickets, no waiting.
            </p>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div ref={statsRef} style={{ padding: "0 24px" }}>
        <div style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 1,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: "52px 24px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
            }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
              <div className="ni-stat-val ni-accent-text">{s.value}</div>
              <div style={{ color: "var(--ni-muted)", fontSize: 12, fontWeight: 500, marginTop: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PHOTOS + TEXT ── */}
      <div ref={photosRef} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="ni-two-col" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
        }}>
          {/* Photos */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 16,
            opacity: photosVisible ? 1 : 0,
            transform: photosVisible ? "translateX(0)" : "translateX(-32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            {/* Big */}
            <div className="ni-photo-frame" style={{ height: 340 }}>
              <img src={booth1} alt="SirDash at tech conference" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", bottom: 14, left: 14,
                background: "rgba(7,8,15,0.82)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: "7px 12px",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", flexShrink: 0, boxShadow: "0 0 8px #4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600 }}>AI & Machine Learning · Berlin</span>
              </div>
            </div>

            {/* Small — offset */}
            <div style={{ marginLeft: 40, position: "relative" }}>
              <div className="ni-photo-frame" style={{ height: 240 }}>
                <img src={booth2} alt="SirDash at analytics conference" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{
                  position: "absolute", bottom: 14, left: 14,
                  background: "rgba(7,8,15,0.82)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "7px 12px",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f472b6", flexShrink: 0, boxShadow: "0 0 8px #f472b6" }} />
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600 }}>Data & Analytics · Global Stage</span>
                </div>
              </div>
              {/* Floating chip */}
              <div style={{
                position: "absolute", top: -16, right: -16,
                background: "linear-gradient(135deg,#6366f1,#a78bfa)",
                borderRadius: 12,
                padding: "10px 16px",
                boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
                opacity: photosVisible ? 1 : 0,
                transform: photosVisible ? "scale(1)" : "scale(0.85)",
                transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
              }}>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 800, lineHeight: 1 }}>Data Intensive</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, fontWeight: 600, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>Enterprises & Teams</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div style={{
            opacity: photosVisible ? 1 : 0,
            transform: photosVisible ? "translateX(0)" : "translateX(32px)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
            display: "flex", flexDirection: "column", gap: 20,
          }}>
            <div className="ni-badge" style={{ alignSelf: "flex-start" }}>
              <span>🌍</span> Based in Berlin, Germany
            </div>

            <h3 style={{
              fontSize: "clamp(1.9rem,3vw,2.8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}>
              <span className="ni-chrome-text">From a Berlin startup to the</span>
              <br />
              <span className="ni-accent-text">global AI stage</span>
            </h3>

            <p style={{ color: "var(--ni-muted)", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
              SirDash started as a two-person team who believed SQL was a barrier, not a superpower.
              Today we present at international tech conferences and are trusted by data-intensive
              organizations across telecom, finance, and manufacturing.
            </p>

            <div className="ni-rule" />

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Enterprise-grade AI with GDPR-compliant infrastructure",
                "On-prem, private VPC, or air-gapped deployment",
                "PostgreSQL, MSSQL, Oracle — more databases coming",
              ].map((point, i) => (
                <div key={i} className="ni-check" style={{
                  opacity: photosVisible ? 1 : 0,
                  transform: photosVisible ? "none" : "translateX(12px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                }}>
                  <div className="ni-check-icon">✓</div>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "100px 24px" }}>
        <div ref={timelineRef} style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>

          <div style={{ textAlign: "center", marginBottom: 64,
            opacity: timelineVisible ? 1 : 0,
            transform: timelineVisible ? "none" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div className="ni-badge" style={{ marginBottom: 20 }}>
              <span className="ni-badge-dot" />
              Milestones
            </div>
            <h3 style={{
              fontSize: "clamp(1.8rem,4vw,2.6rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: 0,
            }}>
              <span className="ni-chrome-text">How We Got Here</span>
            </h3>
          </div>

          {/* Centre line */}
          <div className="ni-timeline-line" style={{
            position: "absolute", left: "50%", top: 160, bottom: 0,
            width: 1,
            background: "linear-gradient(to bottom, rgba(129,140,248,0.4), rgba(129,140,248,0.04))",
            transform: "translateX(-50%)",
          }} />

          {MILESTONES.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={m.year} className="ni-tl-row" style={{
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                paddingBottom: 40,
                position: "relative",
                opacity: timelineVisible ? 1 : 0,
                transform: timelineVisible ? "none" : "translateY(16px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}>
                {/* Dot */}
                <div className="ni-dot" style={{ background: m.color, boxShadow: `0 0 0 4px ${m.color}22, 0 0 16px ${m.color}55` }} />

                {/* Year on opposite side */}
                <div className="ni-tl-label" style={{
                  position: "absolute", top: 8,
                  ...(isLeft ? { right: "calc(56% - 16px)", textAlign: "right" as const } : { left: "calc(56% - 16px)", textAlign: "left" as const }),
                  fontSize: 12, fontWeight: 700, color: m.color,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {m.year}
                </div>

                {/* Card */}
                <div className="ni-card ni-tl-card" style={{
                  width: "44%",
                  padding: "20px 22px",
                }}>
                  <div style={{
                    display: "inline-block",
                    fontSize: 10, fontWeight: 800,
                    color: m.color,
                    letterSpacing: "0.1em",
                    marginBottom: 10,
                    background: `${m.color}18`,
                    border: `1px solid ${m.color}30`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    textTransform: "uppercase",
                  }}>
                    {m.year}
                  </div>
                  <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", fontSize: 15, marginBottom: 6 }}>
                    {m.title}
                  </div>
                  <div style={{ color: "var(--ni-muted)", fontSize: 13, lineHeight: 1.7 }}>
                    {m.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        padding: "80px 24px",
        textAlign: "center",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative" }}>
          <p style={{ color: "var(--ni-muted)", fontSize: 15, marginBottom: 28 }}>
            See SirDash in action with a personalized demo for your team.
          </p>
          <a href="#demo" className="ni-btn">
            Book a Demo <span style={{ fontSize: 16 }}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}