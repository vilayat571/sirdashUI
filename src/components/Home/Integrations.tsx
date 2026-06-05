import { useState } from 'react';
import { useInView } from '../useInView';
import { integrations } from '../../data';

export default function Integrations() {
  const [sectionRef, inView] = useInView(0.1);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @keyframes int-ping { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.4);opacity:0} }
        @keyframes int-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .int-ping { animation: int-ping 1s ease-out infinite; }
      `}</style>

      <section style={{ background: '#faf9fb', padding: '112px 0' }}>
        <div ref={sectionRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

          {/* Heading */}
          <div style={{
            textAlign: 'center', marginBottom: 56,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 500, color: '#111', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Connect instantly with all your data sources
            </h2>
            <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>No more bottlenecks. Start analyzing right away.</p>
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12, marginBottom: 12 }}>
            {integrations.map((db, i) => {
              const isHov = hoveredCard === db.name;
              return (
                <div
                  key={db.name}
                  onMouseEnter={() => setHoveredCard(db.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '24px 20px',
                    border: `0.5px solid ${isHov ? '#CECBF6' : '#e5e7eb'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 10,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: inView ? 1 : 0,
                    transform: inView ? (isHov ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(28px)',
                    transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.5s cubic-bezier(0.34,1.4,0.64,1) ${i * 0.1}s, border-color 0.2s`,
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    background: isHov ? '#EEEDFE' : '#f9fafb',
                    border: `0.5px solid ${isHov ? '#CECBF6' : '#e5e7eb'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                    transform: isHov ? 'scale(1.08) rotate(-4deg)' : 'scale(1)',
                    transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                    animation: isHov ? 'int-float 2s ease-in-out infinite' : 'none',
                  }}>
                    {db.emoji}
                  </div>

                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 500, color: '#111', margin: '0 0 3px' }}>{db.name}</h3>
                    <p style={{ fontSize: 12, color: '#9ca3af', margin: 0, lineHeight: 1.5 }}>{db.description}</p>
                  </div>

                  {/* Status */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ position: 'relative', display: 'inline-flex' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1D9E75', display: 'inline-block' }} />
                      {isHov && <span className="int-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#1D9E75' }} />}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: '#0F6E56' }}>Ready to connect</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{
            textAlign: 'center', color: '#9ca3af', fontSize: 12, marginBottom: 40,
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.4s',
          }}>
            More integrations coming soon. Connect your existing infrastructure seamlessly.
          </p>


        </div>
      </section>
    </>
  );
}