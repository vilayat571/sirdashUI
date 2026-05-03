import { useState } from 'react';
import { useInView } from './useInView';
import { securityFeatures } from '../data';

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  blue:   { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb', glow: '#3b82f6' },
  purple: { bg: '#f5f3ff', border: '#ddd6fe', text: '#7c3aed', glow: '#8b5cf6' },
  green:  { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a', glow: '#22c55e' },
  yellow: { bg: '#fefce8', border: '#fde68a', text: '#ca8a04', glow: '#eab308' },
  red:    { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', glow: '#ef4444' },
  indigo: { bg: '#eef2ff', border: '#c7d2fe', text: '#4f46e5', glow: '#6366f1' },
};

export default function Security() {
  const [sectionRef, inView] = useInView(0.08);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes sec-shield { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes sec-check { from{stroke-dashoffset:20} to{stroke-dashoffset:0} }
        @keyframes sec-pulse-ring { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(1.8);opacity:0} }
      `}</style>

      <section style={{ background: 'white', padding: '112px 0' }}>
        <div ref={sectionRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

          {/* Heading */}
          <div style={{
            textAlign: 'center', marginBottom: 64,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            {/* Animated shield */}
            <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 20 }}>
              <div style={{
                position: 'absolute', inset: -8, borderRadius: '50%',
                border: '2px solid rgba(99,102,241,0.2)',
                animation: inView ? 'sec-pulse-ring 2s ease-out infinite' : 'none',
              }} />
              <div style={{
                width: 56, height: 56, borderRadius: 18,
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26,
                animation: inView ? 'sec-shield 3s ease-in-out infinite' : 'none',
              }}>
                🛡️
              </div>
            </div>

            <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, color: '#111827', marginBottom: 12, fontFamily: "'Syne',sans-serif", letterSpacing: '-0.025em' }}>
              Enterprise-Grade Security
            </h2>
            <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
              Your data stays protected with our comprehensive security framework
            </p>
          </div>

          {/* Security feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 20 }}>
            {securityFeatures.map((f, i) => {
              const colors = colorMap[f.color] ?? colorMap.indigo;
              const isHov = hoveredCard === f.category;
              return (
                <div
                  key={f.category}
                  onMouseEnter={() => setHoveredCard(f.category)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: isHov ? colors.bg : '#fafafa',
                    borderRadius: 20,
                    border: `1px solid ${isHov ? colors.border : '#f3f4f6'}`,
                    padding: '24px',
                    boxShadow: isHov ? `0 8px 32px ${colors.glow}20` : '0 1px 4px rgba(0,0,0,0.04)',
                    transform: inView ? (isHov ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(24px)',
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.5s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s, border-color 0.3s, background 0.3s`,
                    cursor: 'default',
                  }}
                >
                  {/* Category badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: colors.bg, border: `1px solid ${colors.border}`,
                    borderRadius: 10, padding: '5px 12px',
                    fontSize: 12, fontWeight: 700, color: colors.text,
                    marginBottom: 16,
                    fontFamily: "'Syne',sans-serif",
                    transform: isHov ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 0.3s',
                  }}>
                    <span>{f.icon}</span>{f.category}
                  </div>

                  {/* Items with interactive checkmarks */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {f.items.map((item) => {
                      const checked = checkedItems.has(item);
                      return (
                        <li
                          key={item}
                          onClick={() => toggleCheck(item)}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', padding: '2px 0' }}
                        >
                          <span style={{
                            flexShrink: 0, marginTop: 1,
                            color: checked ? colors.glow : '#22c55e',
                            fontWeight: 700, fontSize: 13,
                            transition: 'color 0.2s',
                          }}>✓</span>
                          <span style={{
                            color: '#6b7280', fontSize: 13, lineHeight: 1.65,
                            textDecoration: checked ? 'line-through' : 'none',
                            opacity: checked ? 0.5 : 1,
                            transition: 'all 0.2s',
                          }}>
                            {item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Bottom banner */}
          <div style={{
            background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: 20, padding: '32px',
            display: 'flex', alignItems: 'flex-start', gap: 24,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#6366f1)',
              backgroundSize: '200% auto',
            }} />
            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, flexShrink: 0,
            }}>
              🔒
            </div>
            <div>
              <h3 style={{ color: '#111827', fontWeight: 800, fontSize: 20, marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>
                Your data never leaves your environment
              </h3>
              <p style={{ color: '#6b7280', lineHeight: 1.8, fontSize: 14 }}>
                SirDash never copies or stores raw customer tables—queries run where your data lives, and only aggregated results are cached. Your sensitive information stays within your security perimeter at all times.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}