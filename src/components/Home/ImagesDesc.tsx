"use client";
import { useEffect, useRef, useState, useCallback } from "react";

import booth1 from "../../assets/image.jpeg";
import booth2 from "../../assets/image1.jpeg";

export const STATS = [
  { value: "70%", label: "Less reporting time" },

  { value: "<30sec", label: "For first insight" },

  { value: "3x", label: "Analyst productivity" },

  { value: "3k+", label: "Simultaneously databases" },
];

const MILESTONES = [
  {
    year: "2022",
    title: "Founded in Berlin",
    desc: "Born out of frustration with traditional BI tools — we set out to make data accessible to everyone, not just engineers.",
    label: "Founder 2025",
    labelColor: "#818cf8",
  },
  {
    year: "2023",
    title: "First Enterprise Clients",
    desc: "Onboarded our first wave of enterprise customers in telecom and finance, validating the product-market fit.",
    label: "October 2025",
    labelColor: "#f472b6",
  },
  {
    year: "2024",
    title: "Agentic RAG v2",
    desc: "Shipped our proprietary Agentic RAG engine — domain-aware, schema-aware, and conversationally refineable.",
    label: "Semantic Miner release 2026 February",
    labelColor: "#60a5fa",
  },
  {
    year: "2025",
    title: "Global Stage",
    desc: "Presented at leading tech conferences worldwide, recognized in the AI & Machine Learning category.",
    label: "Version 1.0.0 May",
    labelColor: "#34d399",
  },
];

function useInViewOnce(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

/* Parallax hook — tracks scroll offset relative to element center */
function useParallax(speed = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(centerY * speed);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return [ref, offset] as const;
}

/* Mouse-tilt hook for 3-D card effect */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 14;
    const y = ((e.clientY - top) / height - 0.5) * -14;
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);
  return { ref, handleMove, handleLeave };
}

export default function ImagesDesc() {
  const [heroRef, heroVisible] = useInViewOnce();
  const [statsRef, statsVisible] = useInViewOnce();
  const [timelineRef, timelineVisible] = useInViewOnce();
  const [photosRef, photosVisible] = useInViewOnce();

  const [parallax1Ref, parallax1Offset] = useParallax(0.1);
  const [parallax2Ref, parallax2Offset] = useParallax(0.18);

  const tilt1 = useTilt();
  const tilt2 = useTilt();

  /* Floating orb mouse parallax for hero */
  const heroBgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroBgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroBgRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section id="about" style={{ background: "#fff", overflow: "hidden" }}>
      {/* ── Hero banner ──────────────────────────────────────────────────────── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #06071a 0%, #0d0e2e 50%, #1a0a2e 100%)",
          padding: "120px 24px 100px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Mouse-reactive glow orb */}
        <div
          ref={heroBgRef}
          style={{
            position: "absolute",
            inset: "-20%",
            pointerEvents: "none",
            transition: "transform 0.1s linear",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10%",
              left: "20%",
              right: "20%",
              bottom: "30%",
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.28) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "60%",
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
        </div>
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.12,
            backgroundImage:
              "radial-gradient(circle, rgba(99,102,241,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Diagonal accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "15%",
            width: 1,
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(99,102,241,0.2), transparent)",
            transform: "skewX(-20deg)",
            pointerEvents: "none",
          }}
        />

        <div
          ref={heroRef}
          style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: 999,
              padding: "6px 16px",
              marginBottom: 28,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#6366f1",
                display: "block",
                boxShadow: "0 0 8px rgba(99,102,241,0.8)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                color: "rgba(99,102,241,0.9)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Our Story
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            We're Building the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Future
            </span>{" "}
            of Data Access
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 18,
              lineHeight: 1.8,
              maxWidth: 600,
              margin: "0 auto",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            SirDash AI was founded in Berlin with a single conviction: every
            person in a company deserves direct access to their data — no SQL,
            no tickets, no waiting.
          </p>
        </div>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        style={{
          background: "#f9fafb",
          borderTop: "1px solid #f3f4f6",
          borderBottom: "1px solid #f3f4f6",
          padding: "56px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 2,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                padding: "24px 16px",
                borderRight:
                  i < STATS.length - 1 ? "1px solid #e5e7eb" : "none",
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: 13,
                  fontWeight: 500,
                  marginTop: 6,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Conference photos — PARALLAX SECTION ──────────────────────────────── */}
      <div
        ref={photosRef}
        style={{
          padding: "120px 24px",
          maxWidth: 1152,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Decorative background blob */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
            alignItems: "center",
          }}
        >
          {/* Left: photos with parallax */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: "relative",
            }}
          >
            {/* Big photo — parallax + tilt */}
            <div
              ref={parallax1Ref as React.RefObject<HTMLDivElement>}
              style={{ position: "relative" }}
            >
              <div
                ref={tilt1.ref}
                onMouseMove={tilt1.handleMove}
                onMouseLeave={tilt1.handleLeave}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow:
                    "0 32px 80px rgba(99,102,241,0.18), 0 8px 24px rgba(0,0,0,0.12)",
                  transform: photosVisible
                    ? `translateX(0) rotate(-1.5deg) translateY(${parallax1Offset}px)`
                    : "translateX(-60px) rotate(-1.5deg)",
                  opacity: photosVisible ? 1 : 0,
                  transition: photosVisible
                    ? "opacity 0.8s ease, box-shadow 0.3s ease"
                    : "opacity 0.8s ease, transform 0.8s ease",
                  position: "relative",
                  cursor: "default",
                  willChange: "transform",
                }}
              >
                {/* Inner image also moves at different parallax speed for depth */}
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: 20,
                    height: 360,
                  }}
                >
                  <img
                    src={booth1}
                    alt="SirDash AI at a tech conference"
                    style={{
                      width: "100%",
                      height: "calc(100% + 60px)",
                      marginTop: -30,
                      objectFit: "cover",
                      display: "block",
                      transform: `translateY(${parallax1Offset * -0.5}px)`,
                      willChange: "transform",
                    }}
                  />
                </div>

                {/* Glint overlay on hover */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    background: "rgba(6,7,26,0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "8px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#4ade80",
                      flexShrink: 0,
                      boxShadow: "0 0 8px rgba(74,222,128,0.7)",
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}
                  >
                    AI & Machine Learning · Berlin
                  </span>
                </div>
              </div>
            </div>

            {/* Small photo — parallax + tilt, faster speed */}
            <div
              ref={parallax2Ref as React.RefObject<HTMLDivElement>}
              style={{ marginLeft: 48, position: "relative" }}
            >
              <div
                ref={tilt2.ref}
                onMouseMove={tilt2.handleMove}
                onMouseLeave={tilt2.handleLeave}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow:
                    "0 20px 50px rgba(99,102,241,0.14), 0 6px 16px rgba(0,0,0,0.10)",
                  transform: photosVisible
                    ? `translateX(0) rotate(1deg) translateY(${parallax2Offset}px)`
                    : "translateX(-60px) rotate(1deg)",
                  opacity: photosVisible ? 1 : 0,
                  transition: photosVisible
                    ? "opacity 0.9s ease 0.15s, box-shadow 0.3s ease"
                    : "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
                  position: "relative",
                  cursor: "default",
                  willChange: "transform",
                }}
              >
                <div
                  style={{ overflow: "hidden", borderRadius: 20, height: 280 }}
                >
                  <img
                    src={booth2}
                    alt="SirDash AI at Data & Analytics conference"
                    style={{
                      width: "100%",
                      height: "calc(100% + 60px)",
                      marginTop: -30,
                      objectFit: "cover",
                      display: "block",
                      transform: `translateY(${parallax2Offset * -0.5}px)`,
                      willChange: "transform",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    background: "rgba(6,7,26,0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "8px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#f472b6",
                      flexShrink: 0,
                      boxShadow: "0 0 8px rgba(244,114,182,0.6)",
                    }}
                  />
                  <span
                    style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}
                  >
                    Data & Analytics · Global Stage
                  </span>
                </div>
              </div>

              {/* Floating stat chip */}
              <div
                style={{
                  position: "absolute",
                  top: -18,
                  right: -24,
                  background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                  borderRadius: 14,
                  padding: "10px 16px",
                  boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
                  opacity: photosVisible ? 1 : 0,
                  transform: photosVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(10px) scale(0.9)",
                  transition:
                    "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  Data Intensive
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 10,
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  ENTERPRISES & Teams
                </div>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div
            style={{
              paddingLeft: 40,
              opacity: photosVisible ? 1 : 0,
              transform: photosVisible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.18)",
                borderRadius: 999,
                padding: "5px 14px",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  color: "#6366f1",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                🌍 Based in Berlin, Germany
              </span>
            </div>

            <h3
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 900,
                color: "#111827",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                marginBottom: 20,
              }}
            >
              From a Berlin startup to the
              <br />
              <span style={{ color: "#6366f1" }}>global AI stage</span>
            </h3>

            <p
              style={{
                color: "#6b7280",
                lineHeight: 1.8,
                fontSize: 15,
                marginBottom: 20,
              }}
            >
              SirDash started as a two-person team in Berlin who believed SQL
              was a barrier — not a superpower. Today, we're presenting at
              international tech conferences and trusted by data-intensive
              organizations across telecom, finance, and manufacturing.
            </p>

            <p
              style={{
                color: "#6b7280",
                lineHeight: 1.8,
                fontSize: 15,
                marginBottom: 32,
              }}
            >
              Our platform handles schemas with 5 to 5,000 tables, translates
              natural language into production-grade SQL, and learns from every
              interaction. No setup. No training. Just answers.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Enterprise-grade AI with GDPR-compliant infrastructure",
                "On-prem, private VPC, or air-gapped deployment",
                "PostgreSQL, MSSQL, Oracle — more databases coming",
              ].map((point, idx) => (
                <div
                  key={point}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    opacity: photosVisible ? 1 : 0,
                    transform: photosVisible
                      ? "translateX(0)"
                      : "translateX(16px)",
                    transition: `opacity 0.5s ease ${0.3 + idx * 0.1}s, transform 0.5s ease ${0.3 + idx * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      flexShrink: 0,
                      marginTop: 1,
                      background:
                        "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.15))",
                      border: "1px solid rgba(99,102,241,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#6366f1",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <span
                    style={{ color: "#374151", fontSize: 14, lineHeight: 1.7 }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#f9fafb",
          padding: "100px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          ref={timelineRef}
          style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}
        >
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h3
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "#111827",
                letterSpacing: "-0.025em",
                opacity: timelineVisible ? 1 : 0,
                transform: timelineVisible
                  ? "translateY(0)"
                  : "translateY(16px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              How We Got Here
            </h3>
          </div>

          <div style={{ position: "relative" }}>
            {/* Centre line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 2,
                background:
                  "linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.08))",
                transform: "translateX(-50%)",
              }}
            />

            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  style={{
                    display: "flex",
                    justifyContent: isLeft ? "flex-start" : "flex-end",
                    paddingBottom: 52,
                    position: "relative",
                    opacity: timelineVisible ? 1 : 0,
                    transform: timelineVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 24,
                      transform: "translate(-50%, -50%)",
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "#6366f1",
                      border: "3px solid #f9fafb",
                      boxShadow: "0 0 0 4px rgba(99,102,241,0.2)",
                      zIndex: 1,
                    }}
                  />

                  {/* Floating label on the opposite side of the card */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      ...(isLeft
                        ? {
                            right: "calc(57% - 24px)",
                            textAlign: "right" as const,
                          }
                        : {
                            left: "calc(57% - 24px)",
                            textAlign: "left" as const,
                          }),
                      fontSize: 12,
                      fontWeight: 600,
                      color: m.labelColor,
                      whiteSpace: "nowrap",
                      letterSpacing: "0.01em",
                      opacity: 0.9,
                    }}
                  >
                    {m.label}
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      width: "43%",
                      background: "#fff",
                      borderRadius: 18,
                      border: "1px solid #e5e7eb",
                      padding: "20px 24px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                      marginLeft: isLeft ? 0 : "auto",
                      marginRight: isLeft ? "auto" : 0,
                      position: "relative",
                      transition: "box-shadow 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 12px 40px rgba(99,102,241,0.15)";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.05)";
                      (e.currentTarget as HTMLDivElement).style.transform = "";
                    }}
                  >
                    {/* Year tag */}
                    <div
                      style={{
                        display: "inline-block",
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#6366f1",
                        letterSpacing: "0.1em",
                        marginBottom: 8,
                        background: "rgba(99,102,241,0.08)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        borderRadius: 6,
                        padding: "2px 8px",
                      }}
                    >
                      {m.year}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#111827",
                        fontSize: 15,
                        marginBottom: 6,
                      }}
                    >
                      {m.title}
                    </div>
                    <div
                      style={{
                        color: "#6b7280",
                        fontSize: 13,
                        lineHeight: 1.7,
                      }}
                    >
                      {m.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #06071a 0%, #0d0e2e 100%)",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />
        <div style={{ position: "relative" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 16,
              marginBottom: 36,
            }}
          >
            See SirDash in action with a personalized demo for your team.
          </p>
          <a
            href="#demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#6366f1",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 32px",
              borderRadius: 14,
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 12px 40px rgba(99,102,241,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 32px rgba(99,102,241,0.35)";
            }}
          >
            Book a Demo
            <span style={{ fontSize: 18 }}>↗</span>
          </a>
        </div>
      </div>

      {/* Global keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}
