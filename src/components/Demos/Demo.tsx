import { useState } from "react";
import { useInView } from "../useInView";
import { Play } from "lucide-react";

export function Demo() {
  const [sectionRef, inView] = useInView(0.1);
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <style>{`
        .demo-section {
          background: #05060f;
          padding: 140px 0;
          position: relative;
          overflow: hidden;
        }

        .demo-section::before {
          content: '';
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .demo-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .demo-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          color: #818cf8;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 24px;
        }

        .demo-label::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #6366f1;
          border-radius: 50%;
          box-shadow: 0 0 8px #6366f1;
          animation: demo-pulse 2s ease-in-out infinite;
        }

        @keyframes demo-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .demo-title {
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .demo-title span {
          background: linear-gradient(135deg, #818cf8, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .demo-subtitle {
          color: rgba(255,255,255,0.4);
          font-size: 16px;
          font-weight: 300;
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .demo-video-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.2),
            0 40px 100px rgba(0,0,0,0.6),
            0 0 80px rgba(99,102,241,0.08);
          aspect-ratio: 16 / 9;
          max-width: 900px;
          margin: 0 auto;
          cursor: pointer;
        }

        .demo-video-wrapper iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .demo-thumbnail-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(6,7,26,0.85) 0%, rgba(6,7,26,0.6) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          transition: opacity 0.4s;
          backdrop-filter: blur(4px);
        }

        .demo-thumbnail-overlay.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .demo-play-btn {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34,1.5,0.64,1), box-shadow 0.3s;
          box-shadow: 0 8px 40px rgba(99,102,241,0.4);
        }

        .demo-play-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 50px rgba(99,102,241,0.6);
        }

        .demo-play-ring {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          animation: demo-ring 2s ease-in-out infinite;
        }

        @keyframes demo-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .demo-play-label {
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.05em;
        }

        .demo-thumbnail-bg {
          position: absolute;
          inset: 0;
          background: #0a0b1e;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .demo-thumbnail-mockup {
          width: 85%;
          height: 75%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .demo-mock-bar {
          height: 36px;
          background: rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          padding: 0 16px;
          gap: 8px;
        }

        .demo-mock-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
        }

        .demo-mock-content {
          flex: 1;
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .demo-mock-card {
          background: rgba(99,102,241,0.06);
          border: 1px solid rgba(99,102,241,0.12);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .demo-mock-line {
          height: 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.08);
        }

        .demo-mock-line.short { width: 60%; }
        .demo-mock-line.accent { background: rgba(99,102,241,0.3); }

        .demo-bottom-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .demo-stat {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.35);
          font-size: 13px;
          font-weight: 400;
        }

        .demo-stat-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #6366f1;
        }
      `}</style>

      <section className="demo-section">
        <div className="demo-grid-lines" />

        <div
          ref={sectionRef}
          style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 64,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="demo-label">Live Demo</div>
            <h2 className="demo-title">
              See SirDash <span>in Action</span>
            </h2>
            <p className="demo-subtitle">
              Watch how natural language transforms into powerful data insights—in seconds, not hours.
            </p>
          </div>

          {/* Video */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
              transition: "opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.34,1.2,0.64,1) 0.15s",
            }}
          >
            <div
              className="demo-video-wrapper"
              onClick={() => setPlaying(true)}
            >
              {/* Thumbnail / mockup bg */}
              <div className="demo-thumbnail-bg">
                <div className="demo-thumbnail-mockup">
                  <div className="demo-mock-bar">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="demo-mock-dot" style={{ background: i === 0 ? "#ef4444" : i === 1 ? "#f59e0b" : "#22c55e" }} />
                    ))}
                  </div>
                  <div className="demo-mock-content">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="demo-mock-card">
                        <div className="demo-mock-line accent short" />
                        <div className="demo-mock-line" />
                        <div className="demo-mock-line short" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Play overlay */}
              <div className={`demo-thumbnail-overlay${playing ? " hidden" : ""}`}>
                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div className="demo-play-ring" />
                  <div className="demo-play-ring" style={{ animationDelay: "0.7s" }} />
                  <button className="demo-play-btn">
                    <Play size={28} color="#6366f1" style={{ marginLeft: 3 }} />
                  </button>
                </div>
                <span className="demo-play-label">Watch 2-min demo</span>
              </div>

              {playing && (
                <iframe
                  src="https://www.youtube.com/embed/MLAG4v7Aa7g?si=5W5b8pB_uBJIOB_i&autoplay=1"
                  title="SirDash Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                />
              )}
            </div>
          </div>

          {/* Bottom stats */}
          <div
            className="demo-bottom-row"
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.7s ease 0.5s",
            }}
          >
            {["No SQL knowledge needed", "Works with any database", "Results in under 2 seconds", "Enterprise-grade security"].map((s) => (
              <div key={s} className="demo-stat">
                <div className="demo-stat-dot" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Demo;