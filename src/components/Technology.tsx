import { technologyFeatures } from '../data';

export default function Technology() {
  return (
    <section id="technology" className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Technology</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Cutting-edge AI that adapts to your domain and speaks your data's language.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Feature list */}
          <div className="space-y-6">
            {technologyFeatures.map((f, i) => (
              <div key={f.title} className="flex gap-5 p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-brand/30 hover:bg-brand/[0.02] transition-all group">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xl shadow-sm group-hover:border-brand/30 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-brand/50 text-xs font-mono font-bold">0{i+1}</span>
                    <h3 className="text-gray-900 font-bold text-base">{f.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
            <a href="#demo" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-brand/20 mt-2">
              See it in action →
            </a>
          </div>

          {/* App mockup — light style */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-brand flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">S</span>
                </div>
                <span className="text-gray-700 text-sm font-semibold">SirDash.ai</span>
                <span className="text-gray-400 text-xs">· Workspace</span>
              </div>
              <div className="bg-brand text-white text-xs px-3 py-1 rounded-full font-medium">+ New Chat</div>
            </div>

            <div className="flex h-72">
              <div className="w-36 bg-gray-50 border-r border-gray-100 p-2.5 space-y-0.5">
                {['Chats','Updates & FAQ','Data Profile','Settings'].map((item,i)=>(
                  <div key={item} className={`text-xs px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${i===0?'bg-brand/10 text-brand font-medium':'text-gray-400 hover:text-gray-600'}`}>
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex-1 p-4 space-y-3 bg-white">
                <div className="flex justify-end">
                  <div className="bg-brand/10 border border-brand/15 text-brand text-xs px-3 py-2 rounded-xl rounded-tr-sm max-w-[75%]">
                    Show me subscriptions from last quarter grouped by status
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center text-[10px] text-brand font-bold flex-shrink-0">S</div>
                  <div className="bg-gray-50 border border-gray-100 text-gray-600 text-xs px-3 py-2 rounded-xl rounded-tl-sm max-w-[75%] leading-relaxed">
                    Found 284 subscriptions. Breakdown: 42% Active, 31% Expired, 27% Pending. Generating chart...
                  </div>
                </div>
                <div className="ml-8 bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <div className="text-gray-400 text-[10px] mb-2">Subscriptions by Status · Q3 2024</div>
                  <div className="flex items-end gap-1 h-10">
                    {[70,45,85,30,60,90,50,40,75].map((h,i)=>(
                      <div key={i} className="flex-1 bg-brand rounded-sm" style={{height:`${h}%`,opacity:0.6+h/300}} />
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 flex items-center gap-2">
                  <input readOnly placeholder="Ask another question..." className="flex-1 bg-transparent text-gray-400 text-xs outline-none" />
                  <span className="text-brand text-xs font-medium">Enter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
