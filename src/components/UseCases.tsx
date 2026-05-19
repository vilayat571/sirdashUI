import { useState, useEffect } from 'react';
import { useInView } from './useInView';
import { useCases } from '../data';

export default function UseCases() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [sectionRef, inView] = useInView(0.1);
  const current = useCases[active];

  const switchTab = (i: number) => {
    if (i === active || animating) return;
    setPrev(active);
    setAnimating(true);
    setTimeout(() => { setActive(i); setAnimating(false); }, 220);
  };

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActive(a => (a + 1) % useCases.length);
    }, 5000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <>
      <style>{`
        @keyframes uc-fade-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes uc-bar     { from{height:0;opacity:0} to{opacity:1} }
        @keyframes uc-dot     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.5)} }
        @keyframes uc-progress { from{width:0} to{width:100%} }
      `}</style>

      <section id="use-cases" className="bg-gray-50 py-[112px]">
        <div ref={sectionRef} className="max-w-[1152px] mx-auto px-6">

          {/* Heading */}
          <div
            className="text-center mb-16"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <h2 className="text-[clamp(2.2rem,5vw,3.2rem)] font-extrabold text-gray-900 mb-3 tracking-[-0.025em]">
              Use Cases
            </h2>
            <p className="text-gray-500 text-[17px] max-w-[480px] mx-auto">
              Empowering every data professional with AI-powered insights tailored to their needs.
            </p>
          </div>

          {/* Tab switcher */}
          <div
            className="flex gap-2 bg-white border border-gray-200 p-1.5 rounded-[18px] w-fit mx-auto mb-8"
            style={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.6s ease 0.15s',
            }}
          >
            {useCases.map((uc, i) => (
              <button
                key={uc.role}
                onClick={() => switchTab(i)}
                className="px-5 py-2.5 rounded-[13px] font-bold text-[13px] border-none cursor-pointer relative overflow-hidden transition-all duration-300"
                style={{
                  background: active === i ? '#6366f1' : 'transparent',
                  color: active === i ? 'white' : '#6b7280',
                  boxShadow: active === i ? '0 4px 16px rgba(99,102,241,0.3)' : 'none',
                }}
              >
                {active === i && inView && (
                  <div
                    className="absolute bottom-0 left-0 h-0.5 bg-white/50 rounded-[1px]"
                    style={{ animation: 'uc-progress 5s linear' }}
                  />
                )}
                {uc.icon} {uc.role}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            className="bg-white rounded-[22px] border border-gray-100 px-12 py-10"
            style={{
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.6s ease 0.2s',
            }}
          >
            <div
              className="grid grid-cols-2 gap-12"
              style={{
                animation: animating ? 'none' : 'uc-fade-in 0.35s ease',
                opacity: animating ? 0 : 1,
                transition: 'opacity 0.22s ease',
              }}
            >
              {/* Left */}
              <div>
                <div className="text-[44px] mb-3">{current.icon}</div>
                <h3 className="text-gray-900 font-extrabold text-[26px] mb-3">{current.role}</h3>
                <p className="text-gray-500 leading-[1.8] mb-6 text-[15px]">{current.description}</p>

                <div className="flex flex-col gap-2.5">
                  {current.queries.map((q, i) => (
                    <div
                      key={q}
                      className="flex gap-2.5 bg-gray-50 border border-gray-100 rounded-[14px] px-4 py-3 cursor-default transition-all duration-200"
                      style={{ animation: `uc-fade-in 0.4s ease ${i * 0.08}s both` }}
                      onMouseEnter={e => {
                        const el = e.currentTarget;
                        el.style.borderColor = 'rgba(99,102,241,0.3)';
                        el.style.background = 'rgba(99,102,241,0.03)';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget;
                        el.style.borderColor = '#f3f4f6';
                        el.style.background = '#f9fafb';
                      }}
                    >
                      <span className="text-[#6366f1] shrink-0 mt-[1px]">💬</span>
                      <p className="text-gray-600 text-[14px] italic leading-[1.65] m-0">{q}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div>
                <h4 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
                  Key Benefits
                </h4>

                <div className="flex flex-col gap-3 mb-7">
                  {current.benefits.map((b, i) => (
                    <div
                      key={b}
                      className="flex items-center gap-3"
                      style={{ animation: `uc-fade-in 0.4s ease ${i * 0.07}s both` }}
                    >
                      <div
                        className="w-[22px] h-[22px] rounded-full bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] flex items-center justify-center shrink-0"
                      >
                        <span className="text-[#6366f1] text-[11px]">✓</span>
                      </div>
                      <span className="text-gray-700 text-[14px] font-medium">{b}</span>
                    </div>
                  ))}
                </div>

                {/* Live preview */}
                <div className="bg-gray-50 border border-gray-100 rounded-[18px] p-4">
                  <div className="text-gray-400 text-[11px] mb-2.5 tracking-[0.04em] font-semibold uppercase">
                    LIVE QUERY PREVIEW
                  </div>
                  <div
                    className="rounded-[10px] px-3 py-2 mb-3"
                    style={{
                      background: 'rgba(99,102,241,0.07)',
                      border: '1px solid rgba(99,102,241,0.15)',
                    }}
                  >
                    <div className="text-[#6366f1] text-[12px] font-mono leading-[1.5]">
                      {current.queries[0].replace(/"/g, '')}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span
                      className="w-[7px] h-[7px] rounded-full bg-green-400 inline-block"
                      style={{
                        animation: 'uc-dot 1.4s ease-in-out infinite',
                        boxShadow: '0 0 5px rgba(74,222,128,0.5)',
                      }}
                    />
                    <span className="text-gray-400 text-[12px]">Generating insight...</span>
                  </div>
                  <div className="flex items-end gap-[3px] h-10">
                    {[55, 80, 40, 70, 90, 55, 75, 60, 85].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#6366f1] rounded-[3px]"
                        style={{
                          height: `${h}%`,
                          opacity: 0.5 + h / 200,
                          animation: `uc-bar 0.5s ease ${i * 0.05}s both`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}