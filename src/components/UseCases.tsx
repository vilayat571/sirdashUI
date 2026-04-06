import { useState } from 'react';
import { useCases } from '../data';

export default function UseCases() {
  const [active, setActive] = useState(0);
  const current = useCases[active];

  return (
    <section id="use-cases" className="bg-gray-50 py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Use Cases</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Empowering every data professional with AI-powered insights tailored to their needs.</p>
        </div>

        <div className="flex gap-2 bg-white border border-gray-200 p-1.5 rounded-2xl mb-8 w-fit mx-auto shadow-sm">
          {useCases.map((uc, i) => (
            <button key={uc.role} onClick={() => setActive(i)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${active===i?'bg-brand text-white shadow-md shadow-brand/25':'text-gray-500 hover:text-gray-700'}`}>
              {uc.icon} {uc.role}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-4xl mb-3">{current.icon}</div>
              <h3 className="text-gray-900 font-bold text-2xl mb-3">{current.role}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">{current.description}</p>
              <div className="space-y-2.5">
                {current.queries.map((q) => (
                  <div key={q} className="flex gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <span className="text-brand mt-0.5 flex-shrink-0">💬</span>
                    <p className="text-gray-600 text-sm italic leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Key Benefits</h4>
              <div className="space-y-3 mb-8">
                {current.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{b}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                <div className="text-gray-400 text-xs mb-3">Live query preview</div>
                <div className="bg-brand/8 border border-brand/15 rounded-xl px-3 py-2 mb-3">
                  <div className="text-brand text-xs font-mono">{current.queries[0].replace(/"/g,'')}</div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-gray-400 text-xs">Generating insight...</span>
                </div>
                <div className="flex items-end gap-1 h-10">
                  {[55,80,40,70,90,55,75,60,85].map((h,i)=>(
                    <div key={i} className="flex-1 bg-brand rounded-sm" style={{height:`${h}%`,opacity:0.5+h/200}} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
