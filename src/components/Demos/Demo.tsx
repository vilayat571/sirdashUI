import { useState } from "react";
import { useInView } from "../useInView";
import { Play } from "lucide-react";

export function Demo() {
  const [sectionRef, inView] = useInView(0.1);
  const [playing, setPlaying] = useState(false);

  const STATS = [
    "No SQL knowledge needed",
    "Works with any database",
    "Results in under 2 seconds",
    "Enterprise-grade security",
  ];

  const MOCK_DOTS = [
    { bg: "#ef4444" },
    { bg: "#f59e0b" },
    { bg: "#22c55e" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 px-6 py-36 border-t border-gray-100"
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top center glow */}
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl">

        {/* ── Header ── */}
        <div
          className="mb-16 text-center transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-500">
            <span
              className="h-1.5 w-1.5 rounded-full bg-indigo-500"
              style={{ boxShadow: "0 0 8px #6366f1", animation: "dpulse 2s ease-in-out infinite" }}
            />
            Live Demo
          </div>

          <h2
            className="mb-4 text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-gray-900"
          >
            See SirDash{" "}
            <span className="bg-gradient-to-br from-indigo-500 to-violet-400 bg-clip-text text-transparent">
              in Action
            </span>
          </h2>

          <p className="mx-auto max-w-md text-base font-light leading-relaxed text-gray-400">
            Watch how natural language transforms into powerful data insights — in seconds, not hours.
          </p>
        </div>

        {/* ── Video ── */}
        <div
          className="transition-all duration-[800ms]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
            transitionDelay: "150ms",
          }}
        >
          <div
            className="relative mx-auto aspect-video max-w-4xl cursor-pointer overflow-hidden rounded-3xl shadow-[0_0_0_1px_rgba(99,102,241,0.15),0_40px_100px_rgba(0,0,0,0.12),0_0_80px_rgba(99,102,241,0.06)]"
            onClick={() => setPlaying(true)}
          >
            {/* Mockup thumbnail bg */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#f4f5fb]">
              <div className="flex h-3/4 w-10/12 flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
                {/* Mac-style bar */}
                <div className="flex h-9 flex-shrink-0 items-center gap-2 border-b border-gray-100 bg-gray-50 px-4">
                  {MOCK_DOTS.map((d, i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: d.bg }} />
                  ))}
                </div>
                {/* Mock cards grid */}
                <div className="grid flex-1 grid-cols-2 gap-3 p-5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2 rounded-xl border border-indigo-50 bg-indigo-50/60 p-3">
                      <div className="h-1.5 w-3/5 rounded-full bg-indigo-200/70" />
                      <div className="h-1.5 rounded-full bg-gray-200/80" />
                      <div className="h-1.5 w-3/5 rounded-full bg-gray-200/60" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Play overlay */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-5 backdrop-blur-[3px] transition-opacity duration-400 ${
                playing ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
              style={{ background: "linear-gradient(135deg, rgba(248,249,255,0.88) 0%, rgba(240,242,255,0.75) 100%)" }}
            >
              {/* Rings + play button */}
              <div className="relative flex items-center justify-center">
                {/* Ring 1 */}
                <span
                  className="absolute h-20 w-20 rounded-full border-2 border-indigo-300/50"
                  style={{ animation: "dring 2s ease-in-out infinite" }}
                />
                {/* Ring 2 */}
                <span
                  className="absolute h-20 w-20 rounded-full border-2 border-indigo-300/30"
                  style={{ animation: "dring 2s ease-in-out infinite", animationDelay: "0.7s" }}
                />
                {/* Button */}
                <button
                  aria-label="Play demo video"
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_8px_40px_rgba(99,102,241,0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_50px_rgba(99,102,241,0.4)]"
                >
                  <Play size={28} color="#6366f1" style={{ marginLeft: 3 }} />
                </button>
              </div>
              <span className="text-[13px] font-medium tracking-wide text-gray-400">
                Watch 2-min demo
              </span>
            </div>

            {/* Iframe */}
            {playing && (
              <iframe
                className="absolute inset-0 h-full w-full border-none"
                src="https://www.youtube.com/embed/MLAG4v7Aa7g?si=5W5b8pB_uBJIOB_i&autoplay=1"
                title="SirDash Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* ── Bottom stats ── */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-8 transition-opacity duration-700"
          style={{ opacity: inView ? 1 : 0, transitionDelay: "500ms" }}
        >
          {STATS.map((s) => (
            <div key={s} className="flex items-center gap-2.5 text-[13px] text-gray-400">
              <span className="h-1 w-1 rounded-full bg-indigo-400 flex-shrink-0" />
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes dpulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(0.8); }
        }
        @keyframes dring {
          0%   { transform:scale(1); opacity:0.6; }
          100% { transform:scale(2.2); opacity:0; }
        }
      `}</style>
    </section>
  );
}

export default Demo;