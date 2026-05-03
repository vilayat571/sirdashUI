import { useState } from 'react';
import { useInView } from './useInView';

 function Demo() {
  const [sectionRef, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes demo-ripple { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(3);opacity:0} }
        @keyframes demo-scan { 0%{top:0%} 100%{top:100%} }
        @keyframes demo-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes demo-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>

      <section style={{ background: 'white', padding: '112px 0' }}>
        <div ref={sectionRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

          <div style={{
            textAlign: 'center', marginBottom: 64,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, color: '#111827', marginBottom: 12, fontFamily: "'Syne',sans-serif", letterSpacing: '-0.025em' }}>
              See SirDash in Action
            </h2>
            <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
              Watch how SirDash transforms natural language into powerful data insights in real-time
            </p>
          </div>

          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* Video frame */}
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setPlaying(!playing)}
              style={{
                position: 'relative', borderRadius: 22,
                overflow: 'hidden',
                boxShadow: hovered
                  ? '0 32px 80px rgba(99,102,241,0.25), 0 8px 32px rgba(0,0,0,0.2)'
                  : '0 20px 60px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                aspectRatio: '16/9',
                cursor: 'pointer',
                transform: inView ? (hovered ? 'scale(1.015)' : 'scale(1)') : 'scale(0.97)',
                opacity: inView ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.34,1.2,0.64,1)',
              }}
            >
              {/* Background */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#06071a,#0f1127)' }} />

              {/* Animated grid */}
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.15,
                backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.3) 1px,transparent 1px)',
                backgroundSize: '40px 40px',
              }} />

              {/* Scanning line effect */}
              <div style={{
                position: 'absolute', left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)',
                animation: 'demo-scan 4s linear infinite',
                pointerEvents: 'none',
              }} />

              {/* App mockup overlay */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', opacity: 0.35 }}>
                <div style={{ width: 160, background: 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.06)', padding: 12 }}>
                  {['Home', 'Chats', 'Updates & FAQ', 'Data Profile', 'Settings'].map((item, i) => (
                    <div key={item} style={{
                      fontSize: 11, padding: '6px 8px', borderRadius: 6, color: i === 4 ? '#818cf8' : 'rgba(255,255,255,0.3)',
                      background: i === 4 ? 'rgba(99,102,241,0.2)' : 'transparent', marginBottom: 2,
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, padding: 16 }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>User Management</div>
                  {[['Username', 'testuser2'], ['Email', 'test@test.de'], ['First Name', ''], ['Password', '']].map(([l, v]) => (
                    <div key={l} style={{ marginBottom: 8 }}>
                      <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, marginBottom: 2 }}>{l}</div>
                      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '4px 8px', color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>{v}</div>
                    </div>
                  ))}
                  <div style={{ background: '#6366f1', color: 'white', fontSize: 11, padding: '6px 14px', borderRadius: 6, width: 'fit-content', marginTop: 4 }}>Create</div>
                </div>
              </div>

              {/* Play button */}
              <div style={{
                position: 'relative', zIndex: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: '100%',
              }}>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  {/* Ripple rings */}
                  {hovered && [0, 0.4, 0.8].map((delay) => (
                    <div key={delay} style={{
                      position: 'absolute', inset: -16, borderRadius: '50%',
                      border: '2px solid rgba(239,68,68,0.4)',
                      animation: `demo-ripple 1.6s ease-out ${delay}s infinite`,
                    }} />
                  ))}

                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: playing ? 'rgba(239,68,68,0.8)' : '#dc2626',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: hovered ? '0 0 40px rgba(239,68,68,0.5)' : '0 8px 32px rgba(0,0,0,0.4)',
                    transform: hovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s',
                    animation: hovered ? 'none' : 'demo-float 3s ease-in-out infinite',
                  }}>
                    {playing ? (
                      <div style={{ display: 'flex', gap: 5 }}>
                        <div style={{ width: 4, height: 18, background: 'white', borderRadius: 2 }} />
                        <div style={{ width: 4, height: 18, background: 'white', borderRadius: 2 }} />
                      </div>
                    ) : (
                      <div style={{ width: 0, height: 0, borderLeft: '22px solid white', borderTop: '13px solid transparent', borderBottom: '13px solid transparent', marginLeft: 5 }} />
                    )}
                  </div>
                </div>

                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 500 }}>
                  {playing ? 'Playing...' : 'Watch Demo · 2 min'}
                </span>
              </div>

              {/* YouTube badge */}
              <div style={{
                position: 'absolute', bottom: 16, right: 16, zIndex: 10,
                background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.8)',
                fontSize: 12, padding: '6px 14px', borderRadius: 10,
                display: 'flex', alignItems: 'center', gap: 6,
                backdropFilter: 'blur(8px)',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'transform 0.3s',
              }}>
                ▶ Watch on YouTube
              </div>
            </div>

            <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 14, margin: '24px 0 32px' }}>
              Ready to experience the power of conversational data intelligence?
            </p>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a href="#demo" style={{
                background: 'linear-gradient(135deg,#6366f1,#818cf8)',
                color: 'white', fontWeight: 700,
                padding: '16px 36px', borderRadius: 16, fontSize: 15,
                textDecoration: 'none', fontFamily: "'Syne',sans-serif",
                boxShadow: '0 8px 28px rgba(99,102,241,0.35)',
                transition: 'all 0.25s',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 36px rgba(99,102,241,0.5)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 8px 28px rgba(99,102,241,0.35)'; }}
              >
                Book a Personalized Demo →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Pricing.tsx ───────────────────────────────────────────────────────────────
import { Check, X } from 'lucide-react';
import { pricingPlans } from '../data';

export function Pricing() {
  const [sectionRef, inView] = useInView(0.1);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @keyframes price-pop { 0%{transform:scale(0.9);opacity:0} 60%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
        @keyframes price-glow { 0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.3)} 50%{box-shadow:0 0 40px rgba(99,102,241,0.5)} }
      `}</style>

      <section id="pricing" style={{ background: '#f9fafb', padding: '112px 0' }}>
        <div ref={sectionRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

          <div style={{
            textAlign: 'center', marginBottom: 64,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, color: '#111827', marginBottom: 12, fontFamily: "'Syne',sans-serif", letterSpacing: '-0.025em' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ color: '#6b7280', fontSize: 17 }}>Choose the plan that best fits your needs</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 32 }}>
            {pricingPlans.map((plan, i) => {
              const isPopular = plan.isPopular;
              const isHov = hoveredPlan === plan.name;

              return (
                <div
                  key={plan.name}
                  onMouseEnter={() => setHoveredPlan(plan.name)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  style={{
                    position: 'relative',
                    borderRadius: 22,
                    padding: '28px',
                    display: 'flex', flexDirection: 'column',
                    background: isPopular ? '#06071a' : 'white',
                    border: `${isPopular ? '2px' : '1px'} solid ${isPopular ? '#6366f1' : isHov ? 'rgba(99,102,241,0.3)' : '#f3f4f6'}`,
                    boxShadow: isPopular
                      ? (isHov ? '0 24px 60px rgba(99,102,241,0.4)' : '0 16px 48px rgba(99,102,241,0.25)')
                      : (isHov ? '0 12px 36px rgba(99,102,241,0.1)' : '0 2px 8px rgba(0,0,0,0.05)'),
                    transform: inView
                      ? (isHov ? 'translateY(-8px)' : 'translateY(0)')
                      : 'translateY(28px)',
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.5s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.3s, border-color 0.3s`,
                    animation: isPopular && inView ? 'price-glow 3s ease-in-out infinite' : 'none',
                  }}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div style={{
                      position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                      background: '#6366f1', color: 'white', fontSize: 12, fontWeight: 700,
                      padding: '6px 18px', borderRadius: 999,
                      boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
                      whiteSpace: 'nowrap', fontFamily: "'Syne',sans-serif",
                    }}>
                      ⭐ Most Popular
                    </div>
                  )}

                  {/* Background glow for popular */}
                  {isPopular && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 160,
                      background: 'radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.2),transparent 70%)',
                      borderRadius: '22px 22px 0 0', pointerEvents: 'none',
                    }} />
                  )}

                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 4, color: isPopular ? 'white' : '#111827', fontFamily: "'Syne',sans-serif" }}>
                      {plan.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 12, marginBottom: 8 }}>
                      <span style={{
                        fontWeight: 800, fontSize: 40, lineHeight: 1,
                        color: isPopular ? 'white' : '#111827',
                        fontFamily: "'Syne',sans-serif",
                        animation: inView ? `price-pop 0.5s ease ${0.3 + i * 0.15}s both` : 'none',
                      }}>
                        {plan.price}
                      </span>
                      {plan.price !== 'Custom' && (
                        <span style={{ fontSize: 13, color: isPopular ? 'rgba(255,255,255,0.4)' : '#9ca3af' }}>{plan.period}</span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: isPopular ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>{plan.description}</p>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: isPopular ? 'rgba(255,255,255,0.08)' : '#f3f4f6', marginBottom: 20 }} />

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: isPopular ? 'rgba(255,255,255,0.75)' : '#4b5563' }}>
                        <Check size={14} style={{ color: '#4ade80', marginTop: 2, flexShrink: 0 }} />{f}
                      </li>
                    ))}
                    {plan.notIncluded?.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: isPopular ? 'rgba(255,255,255,0.2)' : '#d1d5db', textDecoration: 'line-through' }}>
                        <X size={14} style={{ color: isPopular ? 'rgba(255,255,255,0.2)' : '#fca5a5', marginTop: 2, flexShrink: 0 }} />{f}
                      </li>
                    ))}
                  </ul>

                  <a href="#demo" style={{
                    display: 'block', textAlign: 'center',
                    padding: '13px', borderRadius: 14,
                    fontWeight: 700, fontSize: 14,
                    textDecoration: 'none',
                    fontFamily: "'Syne',sans-serif",
                    background: isPopular ? 'white' : 'linear-gradient(135deg,#6366f1,#818cf8)',
                    color: isPopular ? '#6366f1' : 'white',
                    boxShadow: isPopular ? 'none' : '0 4px 16px rgba(99,102,241,0.3)',
                    transition: 'all 0.25s',
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget;
                      el.style.transform = 'translateY(-2px)';
                      el.style.boxShadow = isPopular ? '0 4px 16px rgba(0,0,0,0.2)' : '0 8px 24px rgba(99,102,241,0.45)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget;
                      el.style.transform = 'translateY(0)';
                      el.style.boxShadow = isPopular ? 'none' : '0 4px 16px rgba(99,102,241,0.3)';
                    }}
                  >
                    {plan.cta}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Custom plan */}
          <div style={{
            textAlign: 'center', background: 'white', borderRadius: 20,
            border: '1px solid #f3f4f6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            padding: '36px',
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
          }}>
            <h3 style={{ color: '#111827', fontWeight: 800, fontSize: 20, marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>
              Need a custom solution?
            </h3>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>
              Contact our sales team for a tailored pricing plan that fits your specific needs.
            </p>
            <a href="#demo" style={{
              display: 'inline-block',
              border: '1px solid #e5e7eb', color: '#374151',
              fontWeight: 700, padding: '12px 32px', borderRadius: 14,
              textDecoration: 'none', fontSize: 14, fontFamily: "'Syne',sans-serif",
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(99,102,241,0.4)'; el.style.color = '#6366f1'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#e5e7eb'; el.style.color = '#374151'; el.style.transform = 'translateY(0)'; }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}


export default Demo;