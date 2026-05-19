import { useState } from 'react';
import { useInView } from './useInView';
import { technologyFeatures } from '../data';

export default function Technology() {
  const [sectionRef, inView] = useInView(0.1);
  const [activeFeature, setActiveFeature] = useState(0);
  const [typedMsg, setTypedMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleFeatureClick = (i: number) => {
    setActiveFeature(i);
    const msg = 'Show me subscriptions from last quarter grouped by status';
    setTypedMsg('');
    setIsTyping(true);
    let idx = 0;
    const id = setInterval(() => {
      setTypedMsg(msg.slice(0, ++idx));
      if (idx >= msg.length) { clearInterval(id); setIsTyping(false); }
    }, 30);
  };

  return (
    <>
      <style>{`
        @keyframes tech-pulse { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes tech-bar { from{height:0} to{height:var(--h)} }
        @keyframes tech-slide-right { from{transform:translateX(-12px);opacity:0} to{transform:translateX(0);opacity:1} }
      `}</style>

      <section id="technology" style={{ background: 'white', padding: '112px 0' }}>
        <div ref={sectionRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 999, padding: '6px 16px', marginBottom: 16,
                 fontSize: 12, fontWeight: 700,
                color: '#6366f1', letterSpacing: '0.08em',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block', boxShadow: '0 0 6px rgba(99,102,241,0.5)' }} />
                OUR TECHNOLOGY
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, color: '#111827', marginBottom: 12,  letterSpacing: '-0.025em' }}>
                Our Technology
              </h2>
              <p style={{ color: '#6b7280', fontSize: 18, maxWidth: 480, margin: '0 auto' }}>
                Cutting-edge AI that adapts to your domain and speaks your data's language.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>

            {/* Feature list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {technologyFeatures.map((f, i) => {
                const isActive = activeFeature === i;
                return (
                  <div
                    key={f.title}
                    onClick={() => handleFeatureClick(i)}
                    style={{
                      display: 'flex', gap: 20,
                      padding: '20px 24px',
                      borderRadius: 18,
                      border: `1px solid ${isActive ? 'rgba(99,102,241,0.35)' : '#f3f4f6'}`,
                      background: isActive ? 'linear-gradient(135deg,rgba(99,102,241,0.05),rgba(139,92,246,0.03))' : '#fafafa',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 8px 28px rgba(99,102,241,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
                      transform: inView ? 'translateX(0)' : 'translateX(-24px)',
                      opacity: inView ? 1 : 0,
                      transitionDelay: `${i * 0.1}s`,
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {/* Active indicator bar */}
                    <div style={{
                      position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3,
                      borderRadius: 2,
                      background: 'linear-gradient(to bottom,#6366f1,#8b5cf6)',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }} />

                    <div style={{
                      flexShrink: 0, width: 44, height: 44, borderRadius: 14,
                      background: isActive ? 'rgba(99,102,241,0.12)' : 'white',
                      border: `1px solid ${isActive ? 'rgba(99,102,241,0.3)' : '#e5e7eb'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                      boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
                      transition: 'all 0.3s',
                      transform: isActive ? 'scale(1.08) rotate(-4deg)' : 'scale(1)',
                    }}>
                      {f.icon}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{
                          color: isActive ? '#6366f1' : '#d1d5db',
                          fontSize: 11, fontFamily: 'monospace', fontWeight: 700,
                          transition: 'color 0.3s',
                        }}>
                          0{i + 1}
                        </span>
                        <h3 style={{
                          color: isActive ? '#111827' : '#374151',
                          fontWeight: 700, fontSize: 15,
                          
                          transition: 'color 0.3s',
                        }}>
                          {f.title}
                        </h3>
                      </div>
                      <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.75 }}>{f.description}</p>
                    </div>
                  </div>
                );
              })}

              <a href="#demo" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg,#6366f1,#818cf8)',
                color: 'white', fontWeight: 700,
                padding: '14px 28px', borderRadius: 14, fontSize: 14,
                textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(99,102,241,0.3)',
                transition: 'all 0.25s',
                
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: '0.45s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 36px rgba(99,102,241,0.45)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 8px 28px rgba(99,102,241,0.3)'; }}
              >
                See it in action →
              </a>
            </div>

            {/* Mockup */}
            <div style={{
              background: 'white', borderRadius: 20,
              border: '1px solid #e5e7eb',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}>
              {/* Header */}
              <div style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>S</span>
                  </div>
                  <span style={{ color: '#374151', fontSize: 13, fontWeight: 700 }}>SirDash.ai</span>
                  <span style={{ color: '#9ca3af', fontSize: 12 }}>· Workspace</span>
                </div>
                <div style={{ background: '#6366f1', color: 'white', fontSize: 11, padding: '4px 12px', borderRadius: 999, fontWeight: 600 }}>+ New Chat</div>
              </div>

              <div style={{ display: 'flex', height: 290 }}>
                {/* Sidebar */}
                <div style={{ width: 140, background: '#f9fafb', borderRight: '1px solid #f3f4f6', padding: 10 }}>
                  {['Chats', 'Updates & FAQ', 'Data Profile', 'Settings'].map((item, i) => (
                    <div key={item} style={{
                      fontSize: 12, padding: '7px 10px', borderRadius: 10, marginBottom: 2, cursor: 'pointer',
                      background: i === 0 ? 'rgba(99,102,241,0.1)' : 'transparent',
                      color: i === 0 ? '#6366f1' : '#9ca3af',
                      fontWeight: i === 0 ? 600 : 400,
                    }}>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Chat area */}
                <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* User message */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)',
                      color: '#6366f1', fontSize: 12, padding: '8px 12px', borderRadius: '12px 12px 4px 12px',
                      maxWidth: '75%', lineHeight: 1.5,
                    }}>
                      {typedMsg || 'Show me subscriptions from last quarter grouped by status'}
                      {isTyping && <span style={{ animation: 'tech-pulse 0.7s infinite', marginLeft: 2 }}>|</span>}
                    </div>
                  </div>

                  {/* AI message */}
                  {!isTyping && (
                    <div style={{ display: 'flex', gap: 8, animation: 'tech-slide-right 0.4s ease' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: '#6366f1', fontSize: 10, fontWeight: 700 }}>S</span>
                      </div>
                      <div style={{ background: '#f9fafb', border: '1px solid #f3f4f6', color: '#4b5563', fontSize: 12, padding: '8px 12px', borderRadius: '12px 12px 12px 4px', maxWidth: '75%', lineHeight: 1.6 }}>
                        Found 284 subscriptions. Breakdown: 42% Active, 31% Expired, 27% Pending. Generating chart...
                      </div>
                    </div>
                  )}

                  {/* Chart */}
                  {!isTyping && (
                    <div style={{ marginLeft: 32, background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: 14, padding: 12, animation: 'tech-slide-right 0.5s ease 0.1s both' }}>
                      <div style={{ color: '#9ca3af', fontSize: 10, marginBottom: 8 }}>Subscriptions by Status · Q3 2024</div>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 44 }}>
                        {[70, 45, 85, 30, 60, 90, 50, 40, 75].map((h, i) => (
                          <div key={i} style={{
                            flex: 1, background: '#6366f1', borderRadius: 3,
                            height: `${h}%`, opacity: 0.5 + h / 300,
                            animation: `tech-bar 0.6s ease ${i * 0.05}s both`,
                          } as React.CSSProperties} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
                    <span style={{ flex: 1, color: '#9ca3af', fontSize: 12 }}>Ask another question...</span>
                    <span style={{ color: '#6366f1', fontSize: 11, fontWeight: 600 }}>Enter</span>
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