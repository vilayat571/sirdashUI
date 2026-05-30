import { useState } from 'react';
import { useInView } from '../useInView';
import { securityFeatures } from '../../data';

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
        @keyframes sec-shield { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes sec-pulse-ring { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(1.8);opacity:0} }
      `}</style>

      <section className="bg-white py-28">
        <div ref={sectionRef} className="max-w-6xl mx-auto px-6">

          {/* Heading */}
          <div className={`text-center mb-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="relative inline-flex mb-5">
              <div className="absolute -inset-2 rounded-full" style={{
                border: '2px solid rgba(99,102,241,0.2)',
                animation: inView ? 'sec-pulse-ring 2s ease-out infinite' : 'none',
              }} />
              <div className="w-14 h-14 rounded-[18px] flex items-center justify-center text-[26px]" style={{
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)',
                animation: inView ? 'sec-shield 3s ease-in-out infinite' : 'none',
              }}>
                🛡️
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Enterprise-Grade Security
            </h2>
            <p className="text-gray-500 text-[17px] max-w-[480px] mx-auto">
              Your data stays protected with our comprehensive security framework
            </p>
          </div>

          {/* Security cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {securityFeatures.map((f, i) => {
              const colors = colorMap[f.color] ?? colorMap.indigo;
              const isHov = hoveredCard === f.category;
              return (
                <div
                  key={f.category}
                  onMouseEnter={() => setHoveredCard(f.category)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="rounded-2xl p-6 cursor-default"
                  style={{
                    background: isHov ? colors.bg : '#fafafa',
                    border: `1px solid ${isHov ? colors.border : '#f3f4f6'}`,
                    boxShadow: isHov ? `0 8px 32px ${colors.glow}20` : '0 1px 4px rgba(0,0,0,0.04)',
                    transform: inView ? (isHov ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(24px)',
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.5s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s, border-color 0.3s, background 0.3s`,
                  }}
                >
                  <div
                    className="inline-flex items-center gap-1.5 rounded-[10px] px-3 py-[5px] text-[12px] font-bold mb-4"
                    style={{
                      background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text,
                      transform: isHov ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.3s',
                    }}
                  >
                    <span>{f.icon}</span>{f.category}
                  </div>

                  <ul className="flex flex-col gap-2 list-none p-0 m-0">
                    {f.items.map((item) => {
                      const checked = checkedItems.has(item);
                      return (
                        <li key={item} onClick={() => toggleCheck(item)} className="flex items-start gap-2 cursor-pointer py-0.5">
                          <span className="flex-shrink-0 mt-0.5 font-bold text-[13px] transition-colors duration-200"
                            style={{ color: checked ? colors.glow : '#22c55e' }}>✓</span>
                          <span className="text-gray-500 text-[13px] leading-relaxed transition-all duration-200"
                            style={{ textDecoration: checked ? 'line-through' : 'none', opacity: checked ? 0.5 : 1 }}>
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
          <div
            className={`relative overflow-hidden rounded-2xl p-8 flex items-start gap-6 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.15)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#6366f1)', backgroundSize: '200% auto' }} />
            <div className="w-14 h-14 rounded-[18px] flex items-center justify-center text-[26px] flex-shrink-0"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              🔒
            </div>
            <div>
              <h3 className="text-gray-900 font-extrabold text-xl mb-2">
                Your data never leaves your environment
              </h3>
              <p className="text-gray-500 leading-[1.8] text-sm">
                SirDash never copies or stores raw customer tables—queries run where your data lives, and only aggregated results are cached. Your sensitive information stays within your security perimeter at all times.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}