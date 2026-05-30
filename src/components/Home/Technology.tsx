import { useState } from 'react';
import { useInView } from '../useInView';

const technologyFeatures = [
  {
    icon: '🧠',
    title: 'Agentic RAG Engine',
    description: 'Multi-step reasoning that decomposes complex questions, retrieves relevant schema context, and refines SQL until the answer is correct.',
  },
  {
    icon: '🗂️',
    title: 'Schema-Aware AI',
    description: 'Understands your full database structure — tables, columns, relationships, and data types — across schemas with up to 5,000 tables.',
  },
  {
    icon: '💬',
    title: 'Conversational Refinement',
    description: 'Follow-up naturally. The AI remembers context across turns, so "break that down by region" just works without repeating yourself.',
  },
  {
    icon: '🔍',
    title: 'Semantic Mining',
    description: 'Extracts business meaning from schema names, column comments, Confluence docs, Jira tickets, and dbt artifacts — so the AI understands your logic, not just table names.',
  },
];

const FEATURE_MESSAGES = [
  'Show me subscriptions from last quarter grouped by status',
  'Which tables relate to the orders schema?',
  'Break that down by region for Q2',
  'What does the arr_snapshot table track and how is it related to contracts?',
];

const AI_RESPONSES: Record<number, string> = {
  0: 'Found 284 subscriptions. Breakdown: 42% Active, 31% Expired, 27% Pending. Generating chart...',
  1: 'Detected 14 tables linked to the orders schema via foreign keys. Key tables: orders, order_items, fulfillment, returns. Showing relationship map...',
  2: 'Q2 breakdown by region: EMEA 38%, AMER 41%, APAC 21%. Revenue up 12% MoM across all regions.',
  3: '"arr_snapshot" tracks annual recurring revenue per contract at month-end. Linked to contracts via contract_id. Sources: dbt model docs + Confluence "Revenue Glossary" page.',
};

export default function Technology() {
  const [sectionRef, inView] = useInView(0.1);
  const [activeFeature, setActiveFeature] = useState(0);
  const [typedMsg, setTypedMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleFeatureClick = (i: number) => {
    setActiveFeature(i);
    const msg = FEATURE_MESSAGES[i] ?? FEATURE_MESSAGES[0];
    setTypedMsg('');
    setIsTyping(true);
    let idx = 0;
    const id = setInterval(() => {
      setTypedMsg(msg.slice(0, ++idx));
      if (idx >= msg.length) { clearInterval(id); setIsTyping(false); }
    }, 30);
  };

  const isSemanticMining = activeFeature === 3;

  return (
    <>
      <style>{`
        @keyframes tech-pulse { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes tech-bar { from{height:0} to{height:var(--h)} }
        @keyframes tech-slide-right { from{transform:translateX(-12px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes tag-pop { from{transform:scale(0.8) translateY(4px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
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
              <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, color: '#111827', marginBottom: 12, letterSpacing: '-0.025em' }}>
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
                const isSemantic = i === 3;
                return (
                  <div
                    key={f.title}
                    onClick={() => handleFeatureClick(i)}
                    style={{
                      display: 'flex', gap: 20,
                      padding: '20px 24px',
                      borderRadius: 18,
                      border: `1px solid ${isActive ? (isSemantic ? 'rgba(16,185,129,0.35)' : 'rgba(99,102,241,0.35)') : '#f3f4f6'}`,
                      background: isActive
                        ? isSemantic
                          ? 'linear-gradient(135deg,rgba(16,185,129,0.05),rgba(5,150,105,0.03))'
                          : 'linear-gradient(135deg,rgba(99,102,241,0.05),rgba(139,92,246,0.03))'
                        : '#fafafa',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive
                        ? isSemantic
                          ? '0 8px 28px rgba(16,185,129,0.12)'
                          : '0 8px 28px rgba(99,102,241,0.12)'
                        : '0 1px 4px rgba(0,0,0,0.04)',
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
                      background: isSemantic
                        ? 'linear-gradient(to bottom,#10b981,#059669)'
                        : 'linear-gradient(to bottom,#6366f1,#8b5cf6)',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }} />

                    <div style={{
                      flexShrink: 0, width: 44, height: 44, borderRadius: 14,
                      background: isActive
                        ? isSemantic ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)'
                        : 'white',
                      border: `1px solid ${isActive ? (isSemantic ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.3)') : '#e5e7eb'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                      boxShadow: isActive
                        ? isSemantic ? '0 4px 12px rgba(16,185,129,0.2)' : '0 4px 12px rgba(99,102,241,0.2)'
                        : '0 1px 3px rgba(0,0,0,0.06)',
                      transition: 'all 0.3s',
                      transform: isActive ? 'scale(1.08) rotate(-4deg)' : 'scale(1)',
                    }}>
                      {f.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{
                          color: isActive ? (isSemantic ? '#10b981' : '#6366f1') : '#d1d5db',
                          fontSize: 11, fontFamily: 'monospace', fontWeight: 700,
                          transition: 'color 0.3s',
                        }}>
                          0{i + 1}
                        </span>
                        <h3 style={{
                          color: isActive ? '#111827' : '#374151',
                          fontWeight: 700, fontSize: 15,
                          transition: 'color 0.3s',
                          margin: 0,
                        }}>
                          {f.title}
                        </h3>
                        {isSemantic && (
                          <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                            color: '#059669',
                            background: 'rgba(16,185,129,0.1)',
                            border: '1px solid rgba(16,185,129,0.25)',
                            borderRadius: 6, padding: '2px 7px',
                            textTransform: 'uppercase',
                          }}>
                            New
                          </span>
                        )}
                      </div>
                      <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.75, margin: 0 }}>{f.description}</p>

                      {/* Source tags — only show for Semantic Mining when active */}
                      {isSemantic && isActive && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                          {[
                            { label: 'Schema', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
                            { label: 'Comments', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
                            { label: 'Confluence', color: '#0052cc', bg: 'rgba(0,82,204,0.08)' },
                            { label: 'Jira', color: '#0052cc', bg: 'rgba(0,82,204,0.08)' },
                            { label: 'dbt artifacts', color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
                          ].map((tag, ti) => (
                            <span key={tag.label} style={{
                              fontSize: 11, fontWeight: 600,
                              color: tag.color,
                              background: tag.bg,
                              borderRadius: 6, padding: '3px 9px',
                              animation: `tag-pop 0.3s ease ${ti * 0.06}s both`,
                              display: 'inline-block',
                            }}>
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      )}
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

              <div style={{ display: 'flex', height: 340 }}>
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
                <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
                  {/* User message */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)',
                      color: '#6366f1', fontSize: 12, padding: '8px 12px', borderRadius: '12px 12px 4px 12px',
                      maxWidth: '75%', lineHeight: 1.5,
                    }}>
                      {typedMsg || FEATURE_MESSAGES[activeFeature]}
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
                        {AI_RESPONSES[activeFeature] ?? AI_RESPONSES[0]}
                      </div>
                    </div>
                  )}

                  {/* Semantic Mining source pills */}
                  {!isTyping && isSemanticMining && (
                    <div style={{ marginLeft: 32, display: 'flex', flexWrap: 'wrap', gap: 6, animation: 'tech-slide-right 0.4s ease 0.15s both' }}>
                      {[
                        { label: '📄 dbt docs', color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
                        { label: '📘 Confluence', color: '#0052cc', bg: 'rgba(0,82,204,0.08)' },
                        { label: '🔑 contract_id', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
                      ].map(tag => (
                        <span key={tag.label} style={{
                          fontSize: 11, fontWeight: 600, color: tag.color,
                          background: tag.bg, borderRadius: 6, padding: '3px 9px',
                        }}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Chart — only for non-semantic features */}
                  {!isTyping && !isSemanticMining && (
                    <div style={{ marginLeft: 32, background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: 14, padding: 12, animation: 'tech-slide-right 0.5s ease 0.1s both' }}>
                      <div style={{ color: '#9ca3af', fontSize: 10, marginBottom: 8 }}>
                        {activeFeature === 0 && 'Subscriptions by Status · Q3 2024'}
                        {activeFeature === 1 && 'Schema relationships · orders'}
                        {activeFeature === 2 && 'Revenue by Region · Q1 vs Q2'}
                      </div>
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

                  {/* Semantic Mining — schema lineage card */}
                  {!isTyping && isSemanticMining && (
                    <div style={{ marginLeft: 32, background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: 14, padding: 12, animation: 'tech-slide-right 0.5s ease 0.2s both' }}>
                      <div style={{ color: '#9ca3af', fontSize: 10, marginBottom: 10 }}>Semantic context · arr_snapshot</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {[
                          { src: 'dbt', label: 'arr_snapshot', desc: 'Month-end ARR snapshot', color: '#f97316' },
                          { src: 'schema', label: 'contracts', desc: 'via contract_id FK', color: '#6366f1' },
                          { src: 'confluence', label: 'Revenue Glossary', desc: 'Business definition', color: '#0052cc' },
                        ].map(row => (
                          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                              fontSize: 9, fontWeight: 700, color: row.color,
                              background: `${row.color}14`, borderRadius: 4,
                              padding: '2px 5px', minWidth: 52, textAlign: 'center',
                              textTransform: 'uppercase', letterSpacing: '0.05em',
                            }}>
                              {row.src}
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{row.label}</span>
                            <span style={{ fontSize: 10, color: '#9ca3af' }}>{row.desc}</span>
                          </div>
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