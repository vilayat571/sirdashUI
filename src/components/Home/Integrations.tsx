import { useState } from 'react';
import { useInView } from '../useInView';
import { integrations } from '../../data';

function useCounter(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  if (active && !started) {
    setStarted(true);
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  return count;
}

export default function Integrations() {
  const [sectionRef, inView] = useInView(0.1);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const count10x = useCounter(10, 1400, inView);

  return (
    <>
      <style>{`
        @keyframes int-ping { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.4);opacity:0} }
        @keyframes int-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes int-rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .int-ping { animation: int-ping 1s ease-out infinite; }
        .int-float { animation: int-float 2s ease-in-out infinite; }
        .int-rotate { animation: int-rotate 12s linear infinite; }
      `}</style>

      <section className="bg-gray-50 py-28">
        <div
          ref={sectionRef}
          className="max-w-6xl mx-auto px-6"
        >

          {/* Heading */}
          <div
            className={`text-center mb-16 transition-all duration-700 ease-out ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Connect instantly with all your data sources
            </h2>
            <p className="text-gray-500 text-[17px]">No more bottlenecks. Start analyzing right away.</p>
          </div>

          {/* Integration cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
            {integrations.map((db, i) => {
              const isHov = hoveredCard === db.name;
              return (
                <div
                  key={db.name}
                  onMouseEnter={() => setHoveredCard(db.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-white rounded-2xl p-8 text-center relative overflow-hidden cursor-pointer"
                  style={{
                    border: `1px solid ${isHov ? 'rgba(99,102,241,0.3)' : '#f3f4f6'}`,
                    boxShadow: isHov
                      ? '0 16px 48px rgba(99,102,241,0.12)'
                      : '0 2px 8px rgba(0,0,0,0.04)',
                    opacity: inView ? 1 : 0,
                    transform: inView
                      ? isHov ? 'translateY(-6px)' : 'translateY(0)'
                      : 'translateY(28px)',
                    transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.5s cubic-bezier(0.34,1.4,0.64,1) ${i * 0.12}s, box-shadow 0.3s, border-color 0.3s`,
                  }}
                >
                  {/* Glow */}
                  <div
                    className="absolute top-0 left-0 right-0 h-24 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.1),transparent 70%)',
                      opacity: isHov ? 1 : 0,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl ${
                      isHov ? `${isHov && 'int-float'}` : ''
                    }`}
                    style={{
                      background: isHov ? 'rgba(99,102,241,0.07)' : '#f9fafb',
                      border: `1px solid ${isHov ? 'rgba(99,102,241,0.2)' : '#f3f4f6'}`,
                      transform: isHov ? 'scale(1.12) rotate(-5deg)' : 'scale(1)',
                      boxShadow: isHov ? '0 6px 20px rgba(99,102,241,0.2)' : 'none',
                      transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                      animation: isHov ? 'int-float 2s ease-in-out infinite' : 'none',
                    }}
                  >
                    {db.emoji}
                  </div>

                  <h3 className="text-gray-900 font-bold text-[17px] mb-1.5">{db.name}</h3>
                  <p className="text-gray-400 text-[13px] mb-4">{db.description}</p>

                  {/* Status indicator */}
                  <div className="inline-flex items-center gap-1.5 relative">
                    <span className="relative inline-flex">
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
                      {isHov && (
                        <span className="absolute inset-0 rounded-full bg-green-400 int-ping" />
                      )}
                    </span>
                    <span className="text-green-600 text-[12px] font-bold">Ready to connect</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p
            className={`text-center text-gray-400 text-[13px] mb-16 transition-opacity duration-700 delay-400 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            More integrations coming soon. Connect your existing infrastructure seamlessly.
          </p>

          {/* 10x trust block */}
          <div
            className={`relative overflow-hidden rounded-2xl px-12 py-10 flex items-center gap-10 flex-wrap transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              background: 'rgba(99,102,241,0.04)',
              border: '1px solid rgba(99,102,241,0.15)',
            }}
          >
    

          </div>

        </div>
      </section>
    </>
  );
}