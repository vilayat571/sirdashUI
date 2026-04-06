import { useState } from 'react';
import { Users, Calendar, MessageSquare, Send } from 'lucide-react';

const demoFeatures = [
  { icon: <Users size={18} className="text-brand" />, title: 'Tailored to Your Team', description: "We'll customize the demo for your specific role and use cases, whether you're a product manager, data analyst, or data scientist." },
  { icon: <Calendar size={18} className="text-brand" />, title: 'Flexible Scheduling', description: 'Pick a time that works for your team. We offer demos across global time zones to accommodate your schedule.' },
  { icon: <MessageSquare size={18} className="text-brand" />, title: 'Q&A Session', description: 'Every demo includes time for in-depth questions with our product specialists to address your specific requirements.' },
];

export default function BookDemo() {
  const [form, setForm] = useState({ fullName: '', businessEmail: '', company: '', role: '', message: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.MouseEvent) => { e.preventDefault(); alert('Demo request sent!'); };

  return (
    <section id="demo" className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book a Demo</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Experience the power of SirDash.ai firsthand with a personalized demonstration tailored to your data needs.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            {demoFeatures.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex gap-5 hover:border-brand/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center flex-shrink-0">{f.icon}</div>
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5 font-medium">Full Name <span className="text-brand">*</span></label>
                  <input type="text" name="fullName" placeholder="John Doe" value={form.fullName} onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 text-sm focus:outline-none focus:border-brand/50 transition-all" />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5 font-medium">Business Email <span className="text-brand">*</span></label>
                  <input type="email" name="businessEmail" placeholder="john@company.com" value={form.businessEmail} onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 text-sm focus:outline-none focus:border-brand/50 transition-all" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5 font-medium">Company <span className="text-brand">*</span></label>
                  <input type="text" name="company" placeholder="Company Inc." value={form.company} onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 text-sm focus:outline-none focus:border-brand/50 transition-all" />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1.5 font-medium">Your Role <span className="text-brand">*</span></label>
                  <select name="role" value={form.role} onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-500 text-sm focus:outline-none focus:border-brand/50 transition-all appearance-none cursor-pointer">
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
                <label className="block text-gray-600 text-sm mb-1.5 font-medium">What are you hoping to learn from the demo?</label>
                <textarea name="message" placeholder="Tell us about your specific data challenges or use cases..." value={form.message} onChange={handleChange}
                  rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-300 text-sm focus:outline-none focus:border-brand/50 transition-all resize-none" />
              </div>
              <button onClick={handleSubmit}
                className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand/20">
                <Send size={16} />
                Request a Demo
              </button>
              <p className="text-gray-400 text-xs text-center">By submitting this form, you agree to our privacy policy and terms of service.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
