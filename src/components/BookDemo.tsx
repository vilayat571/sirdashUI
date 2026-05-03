import { useState } from 'react';
import { Users, Calendar, MessageSquare, Send } from 'lucide-react';
import { useInView } from './useInView';

const demoFeatures = [
  {
    icon: <Users size={18} />, color: '#6366f1',
    title: 'Tailored to Your Team',
    description: "We'll customize the demo for your specific role and use cases, whether you're a product manager, data analyst, or data scientist.",
  },
  {
    icon: <Calendar size={18} />, color: '#8b5cf6',
    title: 'Flexible Scheduling',
    description: 'Pick a time that works for your team. We offer demos across global time zones to accommodate your schedule.',
  },
  {
    icon: <MessageSquare size={18} />, color: '#6366f1',
    title: 'Q&A Session',
    description: 'Every demo includes time for in-depth questions with our product specialists to address your specific requirements.',
  },
];

export default function BookDemo() {
  const [sectionRef, inView] = useInView(0.08);
  const [form, setForm] = useState({ fullName: '', businessEmail: '', company: '', role: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1600);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: 'white',
    border: `1px solid ${focusedField === name ? 'rgba(99,102,241,0.5)' : '#e5e7eb'}`,
    borderRadius: 12,
    padding: '12px 16px',
    fontSize: 14,
    color: '#111827',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    boxShadow: focusedField === name ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block', color: '#374151', fontSize: 13, marginBottom: 6, fontWeight: 600,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes bd-success { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes bd-spin { to{transform:rotate(360deg)} }
        @keyframes bd-check { from{stroke-dashoffset:50} to{stroke-dashoffset:0} }
        @keyframes bd-feature-in { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
        ::placeholder { color: #d1d5db !important; }
      `}</style>

      <section id="demo" style={{ background: 'white', padding: '112px 0' }}>
        <div ref={sectionRef} style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

          {/* Heading */}
          <div style={{
            textAlign: 'center', marginBottom: 64,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 999, padding: '6px 16px', marginBottom: 16,
              fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, color: '#6366f1', letterSpacing: '0.08em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block', boxShadow: '0 0 6px rgba(99,102,241,0.5)' }} />
              BOOK A DEMO
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.2rem)', fontWeight: 800, color: '#111827', marginBottom: 12, fontFamily: "'Syne',sans-serif", letterSpacing: '-0.025em' }}>
              Book a Demo
            </h2>
            <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
              Experience the power of SirDash.ai firsthand with a personalized demonstration tailored to your data needs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

            {/* Feature cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {demoFeatures.map((f, i) => (
                <div
                  key={f.title}
                  style={{
                    background: '#f9fafb', borderRadius: 18, border: '1px solid #f3f4f6',
                    padding: '24px', display: 'flex', gap: 20,
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s, border-color 0.25s, box-shadow 0.25s`,
                  }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(99,102,241,0.25)'; el.style.boxShadow = '0 6px 24px rgba(99,102,241,0.08)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#f3f4f6'; el.style.boxShadow = 'none'; }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: f.color,
                    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                    onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.12) rotate(-5deg)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <h3 style={{ color: '#111827', fontWeight: 700, fontSize: 16, marginBottom: 6, fontFamily: "'Syne',sans-serif" }}>{f.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.75, margin: 0 }}>{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{
              background: '#f9fafb', borderRadius: 22, border: '1px solid #f3f4f6',
              padding: '36px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
              }} />

              {submitted ? (
                // Success state
                <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'bd-success 0.5s ease' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(74,222,128,0.1)', border: '2px solid rgba(74,222,128,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M8 16 L13 21 L24 11" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ strokeDasharray: 50, strokeDashoffset: 0, animation: 'bd-check 0.5s ease 0.2s both' }} />
                    </svg>
                  </div>
                  <h3 style={{ color: '#111827', fontWeight: 800, fontSize: 22, marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>
                    Demo Request Sent!
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.75 }}>
                    Thanks! Our team will reach out within 24 hours to schedule your personalized demo.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Full Name <span style={{ color: '#6366f1' }}>*</span></label>
                      <input
                        type="text" name="fullName" placeholder="John Doe"
                        value={form.fullName} onChange={handleChange}
                        onFocus={() => setFocusedField('fullName')} onBlur={() => setFocusedField(null)}
                        style={inputStyle('fullName')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Business Email <span style={{ color: '#6366f1' }}>*</span></label>
                      <input
                        type="email" name="businessEmail" placeholder="john@company.com"
                        value={form.businessEmail} onChange={handleChange}
                        onFocus={() => setFocusedField('businessEmail')} onBlur={() => setFocusedField(null)}
                        style={inputStyle('businessEmail')}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Company <span style={{ color: '#6366f1' }}>*</span></label>
                      <input
                        type="text" name="company" placeholder="Company Inc."
                        value={form.company} onChange={handleChange}
                        onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                        style={inputStyle('company')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Your Role <span style={{ color: '#6366f1' }}>*</span></label>
                      <select
                        name="role" value={form.role} onChange={handleChange}
                        onFocus={() => setFocusedField('role')} onBlur={() => setFocusedField(null)}
                        style={{ ...inputStyle('role'), appearance: 'none', cursor: 'pointer', color: form.role ? '#111827' : '#9ca3af' }}
                      >
                        <option value="">Select your role</option>
                        <option value="pm">Product Manager</option>
                        <option value="analyst">Data Analyst</option>
                        <option value="scientist">Data Scientist</option>
                        <option value="engineer">Engineer</option>
                        <option value="executive">Executive</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>What are you hoping to learn from the demo?</label>
                    <textarea
                      name="message" placeholder="Tell us about your specific data challenges or use cases..."
                      value={form.message} onChange={handleChange} rows={4}
                      onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                      style={{ ...inputStyle('message'), resize: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{
                      width: '100%', padding: '14px',
                      background: submitting ? 'rgba(99,102,241,0.7)' : 'linear-gradient(135deg,#6366f1,#818cf8)',
                      color: 'white', fontWeight: 700, fontSize: 15,
                      border: 'none', borderRadius: 14, cursor: submitting ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: '0 6px 24px rgba(99,102,241,0.35)',
                      transition: 'all 0.25s',
                      fontFamily: "'Syne',sans-serif",
                    }}
                    onMouseEnter={e => { if (!submitting) { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 32px rgba(99,102,241,0.5)'; } }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 6px 24px rgba(99,102,241,0.35)'; }}
                  >
                    {submitting ? (
                      <>
                        <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'bd-spin 0.7s linear infinite' }} />
                        Sending...
                      </>
                    ) : (
                      <><Send size={15} /> Request a Demo</>
                    )}
                  </button>

                  <p style={{ color: '#9ca3af', fontSize: 12, textAlign: 'center', margin: 0 }}>
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}