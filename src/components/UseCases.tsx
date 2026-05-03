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

  // Auto-rotate tabs
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes uc-fade-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes uc-bar { from{height:0;opacity:0} to{opacity:1} }
        @keyframes uc-dot { 0%,100%{transform:scale(1)} 50%{transform:scale(1.5)} }
      `}</style>

      <section id="use-cases" style={{ background: '#f9fafb', padding: '112px 0' }}>
        <div ref={sectionRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

          {/* Heading */}
          <div style={{
            textAlign: 'center', marginBottom: 64,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, color: '#111827', marginBottom: 12, fontFamily: "'Syne',sans-serif", letterSpacing: '-0.025em' }}>
              Use Cases
            </h2>
            <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
              Empowering every data professional with AI-powered insights tailored to their needs.
            </p>
          </div>

          {/* Tab switcher with progress bars */}
          <div style={{
            display: 'flex', gap: 8, background: 'white', border: '1px solid #e5e7eb',
            padding: 6, borderRadius: 18, width: 'fit-content', margin: '0 auto 32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 0.15s',
          }}>
            {useCases.map((uc, i) => (
              <button
                key={uc.role}
                onClick={() => switchTab(i)}
                style={{
                  padding: '10px 20px', borderRadius: 13,
                  background: active === i ? '#6366f1' : 'transparent',
                  color: active === i ? 'white' : '#6b7280',
                  fontWeight: 700, fontSize: 13,
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: "'Syne',sans-serif",
                  boxShadow: active === i ? '0 4px 16px rgba(99,102,241,0.3)' : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Auto-progress bar */}
                {active === i && inView && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, height: 2,
                    background: 'rgba(255,255,255,0.5)',
                    animation: 'uc-progress 5s linear',
                    borderRadius: 1,
                  }} />
                )}
                {uc.icon} {uc.role}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div style={{
            background: 'white', borderRadius: 22, border: '1px solid #f3f4f6',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            padding: '40px 48px',
            opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 0.2s',
          }}>
            <div
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
                animation: animating ? 'none' : 'uc-fade-in 0.35s ease',
                opacity: animating ? 0 : 1,
                transition: 'opacity 0.22s ease',
              }}
            >
              {/* Left */}
              <div>
                <div style={{ fontSize: 44, marginBottom: 12 }}>{current.icon}</div>
                <h3 style={{ color: '#111827', fontWeight: 800, fontSize: 26, marginBottom: 12, fontFamily: "'Syne',sans-serif" }}>
                  {current.role}
                </h3>
                <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>{current.description}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {current.queries.map((q, i) => (
                    <div key={q} style={{
                      display: 'flex', gap: 10,
                      background: '#f9fafb', border: '1px solid #f3f4f6',
                      borderRadius: 14, padding: '12px 16px',
                      animation: `uc-fade-in 0.4s ease ${i * 0.08}s both`,
                      transition: 'border-color 0.2s, background 0.2s',
                      cursor: 'default',
                    }}
                      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(99,102,241,0.3)'; el.style.background = 'rgba(99,102,241,0.03)'; }}
                      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#f3f4f6'; el.style.background = '#f9fafb'; }}
                    >
                      <span style={{ color: '#6366f1', flexShrink: 0, marginTop: 1 }}>💬</span>
                      <p style={{ color: '#4b5563', fontSize: 14, fontStyle: 'italic', lineHeight: 1.65, margin: 0 }}>{q}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div>
                <h4 style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontFamily: "'Syne',sans-serif" }}>
                  Key Benefits
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                  {current.benefits.map((b, i) => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 12, animation: `uc-fade-in 0.4s ease ${i * 0.07}s both` }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <span style={{ color: '#6366f1', fontSize: 11 }}>✓</span>
                      </div>
                      <span style={{ color: '#374151', fontSize: 14, fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Live preview */}
                <div style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: 18, padding: 16 }}>
                  <div style={{ color: '#9ca3af', fontSize: 11, marginBottom: 10, fontFamily: "'Syne',sans-serif", letterSpacing: '0.04em', fontWeight: 600 }}>
                    LIVE QUERY PREVIEW
                  </div>
                  <div style={{
                    background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)',
                    borderRadius: 10, padding: '8px 12px', marginBottom: 12,
                  }}>
                    <div style={{ color: '#6366f1', fontSize: 12, fontFamily: 'monospace', lineHeight: 1.5 }}>
                      {current.queries[0].replace(/"/g, '')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'uc-dot 1.4s ease-in-out infinite', boxShadow: '0 0 5px rgba(74,222,128,0.5)' }} />
                    <span style={{ color: '#9ca3af', fontSize: 12 }}>Generating insight...</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 40 }}>
                    {[55, 80, 40, 70, 90, 55, 75, 60, 85].map((h, i) => (
                      <div key={i} style={{
                        flex: 1, background: '#6366f1', borderRadius: 3,
                        height: `${h}%`, opacity: 0.5 + h / 200,
                        animation: `uc-bar 0.5s ease ${i * 0.05}s both`,
                      }} />
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