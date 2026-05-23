"use client";
import { useEffect, useRef, useState } from "react";

 import booth1 from '../assets/image.jpeg';
import booth2 from '../assets/image1.jpeg';


const STATS = [
  { value: "500+", label: "Enterprises Trust SirDash" },
  { value: "5K+",  label: "Tables Supported per DB" },
  { value: "0",    label: "SQL Knowledge Required" },
  { value: "99.9%",label: "Uptime SLA" },
];

const MILESTONES = [
  { year: "2022", title: "Founded in Berlin", desc: "Born out of frustration with traditional BI tools — we set out to make data accessible to everyone, not just engineers." },
  { year: "2023", title: "First Enterprise Clients", desc: "Onboarded our first wave of enterprise customers in telecom and finance, validating the product-market fit." },
  { year: "2024", title: "Agentic RAG v2", desc: "Shipped our proprietary Agentic RAG engine — domain-aware, schema-aware, and conversationally refineable." },
  { year: "2025", title: "Global Stage", desc: "Presented at leading tech conferences worldwide, recognized in the AI & Machine Learning category." },
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
  const [timelineRef, timelineVisible] = useInViewOnce();
  const [photosRef, photosVisible] = useInViewOnce();

  return (
    <section id="about" style={{ background: "#fff", overflow: "hidden" }}>

      {/* ── Hero banner ──────────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #06071a 0%, #0d0e2e 50%, #1a0a2e 100%)",
        padding: "120px 24px 100px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.22) 0%, transparent 70%)",
        }} />
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.15,
          backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        <div ref={heroRef} style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 999, padding: "6px 16px", marginBottom: 28,
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1", display: "block" }} />
            <span style={{ color: "rgba(99,102,241,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Our Story
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(2.6rem, 6vw, 4.2rem)", fontWeight: 900,
            color: "#fff", lineHeight: 1.05, letterSpacing: "-0.03em",
            marginBottom: 24,
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}>
            We're Building the{" "}
            <span style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Future
            </span>{" "}
            of Data Access
          </h2>

          <p style={{
            color: "rgba(255,255,255,0.55)", fontSize: 18, lineHeight: 1.8,
            maxWidth: 600, margin: "0 auto",
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}>
            SirDash AI was founded in Berlin with a single conviction: every person in a company
            deserves direct access to their data — no SQL, no tickets, no waiting.
          </p>
        </div>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────────── */}
      <div ref={statsRef} style={{
        background: "#f9fafb", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6",
        padding: "56px 24px",
      }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 2,
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              textAlign: "center", padding: "24px 16px",
              borderRight: i < STATS.length - 1 ? "1px solid #e5e7eb" : "none",
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
            }}>
              <div style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900,
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: "-0.03em", lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{ color: "#6b7280", fontSize: 13, fontWeight: 500, marginTop: 6 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Conference photos ─────────────────────────────────────────────────── */}
      <div ref={photosRef} style={{ padding: "100px 24px", maxWidth: 1152, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28,
          alignItems: "center",
        }}>
          {/* Left: photos */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Big photo */}
            <div style={{
              borderRadius: 20, overflow: "hidden",
              boxShadow: "0 24px 60px rgba(99,102,241,0.14)",
              transform: photosVisible ? "translateX(0) rotate(-1deg)" : "translateX(-40px) rotate(-1deg)",
              opacity: photosVisible ? 1 : 0,
              transition: "opacity 0.7s ease, transform 0.7s ease",
              position: "relative",
            }}>
              <img
                src={booth1}
                alt="SirDash AI at a tech conference"
                style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }}
              />
              {/* Badge */}
              <div style={{
                position: "absolute", bottom: 16, left: 16,
                background: "rgba(6,7,26,0.85)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12, padding: "8px 14px",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", flexShrink: 0, boxShadow: "0 0 6px rgba(74,222,128,0.5)" }} />
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>AI & Machine Learning · Berlin</span>
              </div>
            </div>

            {/* Small photo */}
            <div style={{
              borderRadius: 20, overflow: "hidden",
              boxShadow: "0 16px 40px rgba(99,102,241,0.10)",
              transform: photosVisible ? "translateX(0) rotate(0.5deg)" : "translateX(-40px) rotate(0.5deg)",
              opacity: photosVisible ? 1 : 0,
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
              position: "relative",
              marginLeft: 40,
            }}>
              <img
                src={booth2}
                alt="SirDash AI at Data & Analytics conference"
                style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", bottom: 16, left: 16,
                background: "rgba(6,7,26,0.85)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12, padding: "8px 14px",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f472b6", flexShrink: 0 }} />
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Data & Analytics · Global Stage</span>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div style={{
            paddingLeft: 32,
            opacity: photosVisible ? 1 : 0,
            transform: photosVisible ? "translateX(0)" : "translateX(40px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.18)",
              borderRadius: 999, padding: "5px 14px", marginBottom: 20,
            }}>
              <span style={{ color: "#6366f1", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                🌍 Based in Berlin, Germany
              </span>
            </div>

            <h3 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900,
              color: "#111827", lineHeight: 1.1, letterSpacing: "-0.025em",
              marginBottom: 20,
            }}>
              From a Berlin startup to the<br />
              <span style={{ color: "#6366f1" }}>global AI stage</span>
            </h3>

            <p style={{ color: "#6b7280", lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>
              SirDash started as a two-person team in Berlin who believed SQL was a barrier — not a
              superpower. Today, we're presenting at international tech conferences and trusted by
              data-intensive organizations across telecom, finance, and manufacturing.
            </p>

            <p style={{ color: "#6b7280", lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
              Our platform handles schemas with 5 to 5,000 tables, translates natural language into
              production-grade SQL, and learns from every interaction. No setup. No training.
              Just answers.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Enterprise-grade AI with GDPR-compliant infrastructure",
                "On-prem, private VPC, or air-gapped deployment",
                "PostgreSQL, MSSQL, Oracle — more databases coming",
              ].map((point) => (
                <div key={point} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                    background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: "#6366f1", fontSize: 10 }}>✓</span>
                  </div>
                  <span style={{ color: "#374151", fontSize: 14, lineHeight: 1.6 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline ──────────────────────────────────────────────────────────── */}
      <div style={{ background: "#f9fafb", padding: "100px 24px" }}>
        <div ref={timelineRef} style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h3 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900,
              color: "#111827", letterSpacing: "-0.025em",
              opacity: timelineVisible ? 1 : 0, transform: timelineVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}>
              How We Got Here
            </h3>
          </div>

          <div style={{ position: "relative" }}>
            {/* Centre line */}
            <div style={{
              position: "absolute", left: "50%", top: 0, bottom: 0,
              width: 2, background: "linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.1))",
              transform: "translateX(-50%)",
            }} />

            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={m.year} style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  paddingBottom: 48,
                  position: "relative",
                  opacity: timelineVisible ? 1 : 0,
                  transform: timelineVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
                }}>
                  {/* Dot */}
                  <div style={{
                    position: "absolute", left: "50%", top: 24, transform: "translate(-50%, -50%)",
                    width: 14, height: 14, borderRadius: "50%",
                    background: "#6366f1", border: "3px solid #fff",
                    boxShadow: "0 0 0 3px rgba(99,102,241,0.3)",
                    zIndex: 1,
                  }} />

                  {/* Card */}
                  <div style={{
                    width: "44%",
                    background: "#fff", borderRadius: 16,
                    border: "1px solid #e5e7eb",
                    padding: "20px 24px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    marginLeft: isLeft ? 0 : "auto",
                    marginRight: isLeft ? "auto" : 0,
                  }}>
                    <div style={{
                      fontSize: 12, fontWeight: 800, color: "#6366f1",
                      letterSpacing: "0.08em", marginBottom: 6,
                    }}>
                      {m.year}
                    </div>
                    <div style={{ fontWeight: 700, color: "#111827", fontSize: 16, marginBottom: 6 }}>{m.title}</div>
                    <div style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.7 }}>{m.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #06071a 0%, #0d0e2e 100%)",
        padding: "80px 24px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative" }}>
          <h3 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            color: "#fff", letterSpacing: "-0.025em", marginBottom: 16,
          }}>
            Ready to join 500+ enterprises?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 36 }}>
            See SirDash in action with a personalized demo for your team.
          </p>
          <a
            href="#demo"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#6366f1", color: "#fff",
              fontWeight: 700, fontSize: 15,
              padding: "14px 32px", borderRadius: 14,
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 40px rgba(99,102,241,0.45)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(99,102,241,0.35)"; }}
          >
            Book a Demo
            <span style={{ fontSize: 18 }}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}