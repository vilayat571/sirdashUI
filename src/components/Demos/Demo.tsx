import { useState } from "react";
import { useInView } from "../useInView";
import { Play } from "lucide-react";

export function Demo() {
  const [sectionRef, inView] = useInView(0.1);
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <style>{`
        @keyframes demo-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes demo-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
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
      `}</style>

      <section className="demo-section bg-[#05060f] py-[140px] relative overflow-hidden">
        <div className="demo-grid-lines" />

        <div ref={sectionRef} className="max-w-[1100px] mx-auto px-6">

          {/* Header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="inline-flex items-center gap-2 bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.25)] text-[#818cf8] text-[11px] font-medium tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6">
              <span
                className="w-1.5 h-1.5 bg-[#6366f1] rounded-full shrink-0"
                style={{
                  boxShadow: "0 0 8px #6366f1",
                  animation: "demo-pulse 2s ease-in-out infinite",
                }}
              />
              Live Demo
            </div>

            <h2 className="text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-4">
              See SirDash{" "}
              <span className="bg-gradient-to-br from-[#818cf8] to-[#c4b5fd] bg-clip-text text-transparent">
                in Action
              </span>
            </h2>

            <p className="text-white/40 text-base font-light max-w-[440px] mx-auto leading-[1.7]">
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
              className="relative rounded-[24px] overflow-hidden aspect-video max-w-[900px] mx-auto cursor-pointer"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(99,102,241,0.2), 0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(99,102,241,0.08)",
              }}
              onClick={() => setPlaying(true)}
            >
              {/* Thumbnail bg */}
              <div className="absolute inset-0 bg-[#0a0b1e] flex items-center justify-center">
                <div className="w-[85%] h-[75%] bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
                  <div className="h-9 bg-white/[0.04] border-b border-white/[0.05] flex items-center px-4 gap-2">
                    {(["#ef4444", "#f59e0b", "#22c55e"] as const).map((color, i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background: color }} />
                    ))}
                  </div>
                  <div className="flex-1 p-5 grid grid-cols-2 gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-[rgba(99,102,241,0.06)] border border-[rgba(99,102,241,0.12)] rounded-[10px] p-3.5 flex flex-col gap-2"
                      >
                        <div className="h-1.5 rounded-[3px] bg-[rgba(99,102,241,0.3)] w-[60%]" />
                        <div className="h-1.5 rounded-[3px] bg-white/[0.08]" />
                        <div className="h-1.5 rounded-[3px] bg-white/[0.08] w-[60%]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Play overlay */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-5 backdrop-blur-[4px] transition-opacity duration-[400ms] ${
                  playing ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                style={{
                  background: "linear-gradient(135deg, rgba(6,7,26,0.85) 0%, rgba(6,7,26,0.6) 100%)",
                }}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute w-20 h-20 rounded-full border-2 border-white/30"
                    style={{ animation: "demo-ring 2s ease-in-out infinite" }}
                  />
                  <div
                    className="absolute w-20 h-20 rounded-full border-2 border-white/30"
                    style={{ animation: "demo-ring 2s ease-in-out infinite", animationDelay: "0.7s" }}
                  />
                  <button
                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center cursor-pointer border-none transition-all duration-300 hover:scale-110"
                    style={{
                      boxShadow: "0 8px 40px rgba(99,102,241,0.4)",
                    }}
                  >
                    <Play size={28} color="#6366f1" style={{ marginLeft: 3 }} />
                  </button>
                </div>
                <span className="text-white/70 text-[13px] font-light tracking-[0.05em]">
                  Watch 2-min demo
                </span>
              </div>

              {playing && (
                <iframe
                  src="https://www.youtube.com/embed/MLAG4v7Aa7g?si=5W5b8pB_uBJIOB_i&autoplay=1"
                  title="SirDash Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-none"
                />
              )}
            </div>
          </div>

          {/* Bottom stats */}
          <div
            className="flex items-center justify-center gap-10 mt-10 flex-wrap"
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.7s ease 0.5s",
            }}
          >
            {[
              "No SQL knowledge needed",
              "Works with any database",
              "Results in under 2 seconds",
              "Enterprise-grade security",
            ].map((s) => (
              <div key={s} className="flex items-center gap-2.5 text-white/35 text-[13px] font-light">
                <div className="w-1 h-1 rounded-full bg-[#6366f1]" />
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