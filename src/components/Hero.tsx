"use client";
import { useState, useEffect, useRef } from "react";
import video from '../assets/videos/video.mov';
import video2 from '../assets/videos/video.mov';
import video3 from '../assets/videos/video.mov';

const TABS = ["Sales", "Controlling", "Production"];
const VIDEO_SOURCES = [video, video2, video3];
const TAB_DURATION = 15000;

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);

  // ✅ Properly typed refs — no more `null` inference issues
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const durationRef = useRef<number>(TAB_DURATION);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);

  // ✅ Typed parameter
  const startProgress = (duration: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setProgress(0);
    startRef.current = performance.now();
    durationRef.current = duration;

    // ✅ Typed parameter + null guard on startRef
    const animate = (now: number) => {
      const elapsed = now - (startRef.current ?? now);
      const pct = Math.min((elapsed / durationRef.current) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  // ✅ Typed parameter
  const goToTab = (idx: number) => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setActiveTab(idx);
    setProgress(0);

    const vid = videoRefs.current[idx];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});

      const getDuration = () => {
        const d = vid.duration && isFinite(vid.duration)
          ? vid.duration * 1000
          : TAB_DURATION;
        startProgress(d);
        timerRef.current = setTimeout(() => {
          goToTab((idx + 1) % TABS.length);
        }, d);
      };

      if (vid.readyState >= 1 && isFinite(vid.duration)) {
        getDuration();
      } else {
        vid.addEventListener('loadedmetadata', getDuration, { once: true });
        timerRef.current = setTimeout(() => {
          goToTab((idx + 1) % TABS.length);
        }, TAB_DURATION);
        startProgress(TAB_DURATION);
      }
    } else {
      startProgress(TAB_DURATION);
      timerRef.current = setTimeout(() => {
        goToTab((idx + 1) % TABS.length);
      }, TAB_DURATION);
    }

    videoRefs.current.forEach((v, i) => {
      if (v && i !== idx) v.pause();
    });
  };

  useEffect(() => {
    goToTab(0);
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#faf9fb] pt-28 pb-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.28)_0%,transparent_70%)]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-6">

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {["#818cf8", "#a78bfa", "#60a5fa", "#34d399", "#f472b6"].map((bg, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#06071a]" style={{ background: bg }} />
              ))}
            </div>
            <span className="text-black/55 text-sm">
              <strong className="text-black font-semibold">500+</strong> enterprises trust SirDash
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl">
            <span className="text-black">Your Data,</span>{" "}
            <span className="text-black">Intelligent</span>
            <br />
            <span className="text-black">Conversations</span>
          </h1>

          <p className="text-black/50 text-xl max-w-xl leading-relaxed">
            Enterprise-grade AI that turns natural language into database insights—no SQL required.
          </p>

          <div className="relative w-full flex flex-col items-center mt-4 gap-4">

            <div className="flex bg-[#faf9fb] rounded-2xl p-1.5 gap-1  w-full max-w-lg">
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => goToTab(i)}
                  className={` ${activeTab === i && ' shadow-2xl'} relative flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden`}
                  style={{
                    background: activeTab === i ? "#faf9fb" : "#faf9fb",
                    color: activeTab === i ? "black" : "#6b7280",

                  }}
                >
                  {tab}
                  {activeTab === i && (
                    <span
                      className="absolute bottom-0 left-0 h-[2px]  rounded-full transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="w-full mx-auto rounded-t-2xl relative">

              {VIDEO_SOURCES.map((src, i) => (
                <div
                  key={i}
                  className={`transition-opacity  duration-500 ${activeTab === i ? "block opacity-100" : "hidden opacity-0"}`}
                >
                  <video
                    // ✅ el is HTMLVideoElement | null, array type matches
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={src}
                    muted
                    playsInline
                    className="w-full block"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}