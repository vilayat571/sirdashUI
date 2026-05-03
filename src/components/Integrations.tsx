import { useState } from 'react';
import { useInView } from './useInView';
import { integrations } from '../data';

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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes int-ping { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.4);opacity:0} }
        @keyframes int-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes int-rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      <section style={{ background: '#f9fafb', padding: '112px 0' }}>
        <div ref={sectionRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

          {/* Heading */}
          <div style={{
            textAlign: 'center', marginBottom: 64,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, color: '#111827', marginBottom: 12, fontFamily: "'Syne',sans-serif", letterSpacing: '-0.02em' }}>
              Connect instantly with all your data sources
            </h2>
            <p style={{ color: '#6b7280', fontSize: 17 }}>No more bottlenecks. Start analyzing right away.</p>
          </div>

          {/* Integration cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 16 }}>
            {integrations.map((db, i) => {
              const isHov = hoveredCard === db.name;
              return (
                <div
                  key={db.name}
                  onMouseEnter={() => setHoveredCard(db.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: 'white', borderRadius: 20,
                    border: `1px solid ${isHov ? 'rgba(99,102,241,0.3)' : '#f3f4f6'}`,
                    padding: '32px 24px', textAlign: 'center',
                    boxShadow: isHov ? '0 16px 48px rgba(99,102,241,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                    transform: inView ? (isHov ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(28px)',
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.5s cubic-bezier(0.34,1.4,0.64,1) ${i * 0.12}s, box-shadow 0.3s, border-color 0.3s`,
                    cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Glow */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 100,
                    background: 'radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.1),transparent 70%)',
                    opacity: isHov ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: 'none',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: 64, height: 64, borderRadius: 20,
                    background: isHov ? 'rgba(99,102,241,0.07)' : '#f9fafb',
                    border: `1px solid ${isHov ? 'rgba(99,102,241,0.2)' : '#f3f4f6'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px', fontSize: 30,
                    transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                    transform: isHov ? 'scale(1.12) rotate(-5deg)' : 'scale(1)',
                    boxShadow: isHov ? '0 6px 20px rgba(99,102,241,0.2)' : 'none',
                    animation: isHov ? 'int-float 2s ease-in-out infinite' : 'none',
                  }}>
                    {db.emoji}
                  </div>

                  <h3 style={{ color: '#111827', fontWeight: 700, fontSize: 17, marginBottom: 6, fontFamily: "'Syne',sans-serif" }}>{db.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 16 }}>{db.description}</p>

                  {/* Status indicator */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, position: 'relative' }}>
                    <span style={{ position: 'relative', display: 'inline-flex' }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block',
                        boxShadow: '0 0 6px rgba(74,222,128,0.5)',
                      }} />
                      {isHov && <span style={{
                        position: 'absolute', inset: 0, borderRadius: '50%', background: '#4ade80',
                        animation: 'int-ping 1s ease-out infinite',
                      }} />}
                    </span>
                    <span style={{ color: '#16a34a', fontSize: 12, fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>Ready to connect</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{
            textAlign: 'center', color: '#9ca3af', fontSize: 13, marginBottom: 64,
            opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 0.4s',
          }}>
            More integrations coming soon. Connect your existing infrastructure seamlessly.
          </p>

          {/* 10x trust block */}
          <div style={{
            background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: 20, padding: '40px 48px',
            display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap',
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Background glow */}
            <div style={{
              position: 'absolute', left: -40, top: -40, width: 200, height: 200,
              borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Animated 10x circle */}
            <div style={{ flexShrink: 0, position: 'relative' }}>
              {/* Rotating ring */}
              <div style={{
                position: 'absolute', inset: -8,
                borderRadius: '50%',
                border: '2px dashed rgba(99,102,241,0.2)',
                animation: 'int-rotate 12s linear infinite',
              }} />
              <div style={{
                width: 100, height: 100, borderRadius: '50%',
                background: 'rgba(99,102,241,0.08)',
                border: '2px solid rgba(99,102,241,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 36,
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {count10x}x
                </span>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={{ color: '#111827', fontWeight: 800, fontSize: 22, marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>
                Trusted by data-intensive industries
              </h3>
              <p style={{ color: '#6b7280', lineHeight: 1.75, fontSize: 15 }}>
                From telecom giants managing customer data to financial institutions analyzing market trends, SirDash.ai empowers teams to make data-driven decisions without the traditional bottlenecks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}