export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#06071a] pt-28 pb-0">
      {/* Deep radial glow behind headline */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.28)_0%,transparent_70%)]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ── Centered social proof ── */}
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {['#818cf8','#a78bfa','#60a5fa','#34d399','#f472b6'].map((bg, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#06071a]" style={{ background: bg }} />
              ))}
            </div>
            <span className="text-white/55 text-sm">
              <strong className="text-white font-semibold">500+</strong> enterprises trust SirDash
            </span>
          </div>

          {/* ── Big centered headline ── */}
          <h1 className="text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl">
            <span className="text-white">Your Data,</span>{' '}
            <span className="gradient-text">Intelligent</span>
            <br />
            <span className="text-white">Conversations</span>
          </h1>

          <p className="text-white/50 text-xl max-w-xl leading-relaxed">
            Enterprise-grade AI that turns natural language into database insights—no SQL required.
          </p>

          {/* ── Single CTA like MetricStory ── */}
          <a
            href="#demo"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all duration-200 flex items-center gap-2 shadow-xl shadow-brand/20"
          >
            Book a Demo
            <span className="text-xl leading-none rotate-45">↗</span>
          </a>

          {/* ── Decorative curved arrow + NEW badge (MetricStory style) ── */}
          <div className="relative w-full flex justify-center mt-2 mb-[-2px]">
            {/* NEW! badge bottom-left */}
            <div className="absolute left-8 bottom-24 rotate-[-8deg] select-none">
              <span className="text-white font-black text-sm tracking-widest uppercase border-2 border-white/30 px-2 py-0.5 rounded">
                NEW!<br />
                <span className="text-white/60 text-xs font-normal normal-case tracking-normal">v2.0</span>
              </span>
            </div>

            {/* SVG curved arrow pointing down-right toward dashboard */}
            <svg className="absolute right-12 bottom-10 w-24 h-24 text-white/30" viewBox="0 0 100 100" fill="none">
              <path d="M10 10 C 10 60, 60 60, 80 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M70 88 L80 85 L77 74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Spiral decoration */}
              <path d="M82 20 C90 20, 94 26, 90 32 C86 38, 80 36, 82 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
            </svg>

            {/* ── Dashboard mockup breaking out of dark section ── */}
            <div className="w-full max-w-5xl mx-auto rounded-t-2xl overflow-hidden shadow-2xl shadow-brand/10 border border-white/10 border-b-0">
              {/* White dashboard — mimics MetricStory's light app below dark hero */}
              <div className="bg-white flex h-[460px]">
                {/* Sidebar */}
                <div className="w-52 bg-white border-r border-gray-100 flex flex-col">
                  <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <div>
                      <div className="text-gray-900 text-sm font-bold">SirDash.ai</div>
                      <div className="text-gray-400 text-[10px]">Welcome, Admin</div>
                    </div>
                  </div>
                  <nav className="p-3 space-y-0.5 flex-1">
                    {[
                      { label: 'Analytics', active: true },
                      { label: 'Search' },
                      { label: 'My User' },
                      { label: 'Help' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          item.active ? 'bg-brand/10 text-brand font-medium' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-brand' : 'bg-gray-300'}`} />
                        {item.label}
                      </div>
                    ))}
                  </nav>
                  <div className="p-4 border-t border-gray-100">
                    <div className="text-gray-400 text-xs flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      Sign out
                    </div>
                  </div>
                </div>

                {/* Main workspace */}
                <div className="flex-1 flex flex-col bg-gray-50/50">
                  {/* Topbar */}
                  <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-gray-900 font-bold text-base">Workspace</div>
                      <div className="text-gray-400 text-xs">Welcome, Admin</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-400 text-xs w-52">
                        Write your query...
                        <span className="float-right text-gray-300 text-[10px] mt-0.5">Press Enter</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                        <span className="text-brand text-xs font-bold">A</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 space-y-4 overflow-hidden">
                    {/* User signups table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 text-sm font-semibold">User Sign up this week</span>
                          <span className="bg-brand/10 text-brand text-xs font-semibold px-2 py-0.5 rounded-full">5 users</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 text-xs flex items-center gap-1.5">
                            <span>🔍</span> Search
                          </div>
                          <div className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 text-xs">Query</div>
                          <div className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 text-xs">↓ Download</div>
                        </div>
                      </div>
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-50">
                            {['ID','Name','Email address','Date','Time','Action'].map(h => (
                              <th key={h} className="px-4 py-2 text-left text-gray-400 font-medium">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { id:'#1', name:'Cameron Williamson', handle:'@cameron', email:'debbie.baker@example.com', date:'Jan 12, 2024', time:'10:20' },
                            { id:'#2', name:'Bessie Cooper', handle:'@cessie', email:'jackson.graham@example.com', date:'Jan 13, 2024', time:'10:30' },
                            { id:'#3', name:'Jenny Wilson', handle:'@jenny', email:'alma.lawson@example.com', date:'Jan 14, 2024', time:'14:15' },
                          ].map((row) => (
                            <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                              <td className="px-4 py-2.5 text-gray-400">{row.id}</td>
                              <td className="px-4 py-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand/30 to-purple-400/30" />
                                  <div>
                                    <div className="text-gray-700 font-medium">{row.name}</div>
                                    <div className="text-gray-400 text-[10px]">{row.handle}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-2.5 text-gray-400">{row.email}</td>
                              <td className="px-4 py-2.5 text-gray-500">{row.date}</td>
                              <td className="px-4 py-2.5 text-gray-500">{row.time}</td>
                              <td className="px-4 py-2.5 text-gray-300">🗑</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Charts row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-700 text-xs font-semibold">User Churn this week</span>
                          <div className="flex gap-1.5">
                            <span className="border border-gray-200 text-gray-400 text-[10px] px-2 py-0.5 rounded">Query</span>
                            <span className="border border-gray-200 text-gray-400 text-[10px] px-2 py-0.5 rounded">Download</span>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 h-14">
                          {[35,55,40,80,45,30,50,35,45].map((h,i) => (
                            <div key={i} className="flex-1 rounded-sm bg-brand" style={{ height: `${h}%`, opacity: h > 60 ? 1 : 0.7 }} />
                          ))}
                        </div>
                        <div className="flex justify-between mt-1.5">
                          {['12 Jan','13 Jan','14 Jan','15 Jan','16 Jan'].map(d => (
                            <span key={d} className="text-gray-300 text-[9px]">{d}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-700 text-xs font-semibold">User Dashboard views this week</span>
                          <div className="flex gap-1.5">
                            <span className="border border-gray-200 text-gray-400 text-[10px] px-2 py-0.5 rounded">Query</span>
                            <span className="border border-gray-200 text-gray-400 text-[10px] px-2 py-0.5 rounded">Download</span>
                          </div>
                        </div>
                        <svg viewBox="0 0 200 60" className="w-full h-14">
                          <polyline
                            points="0,50 30,45 60,40 90,35 120,30 150,20 180,12 200,8"
                            fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"
                          />
                          <polyline
                            points="0,50 30,45 60,40 90,35 120,30 150,20 180,12 200,8"
                            fill="url(#grad)" strokeWidth="0"
                          />
                          <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15"/>
                              <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                          <polygon points="0,50 30,45 60,40 90,35 120,30 150,20 180,12 200,8 200,60 0,60" fill="url(#grad)"/>
                        </svg>
                        <div className="flex justify-between mt-0.5">
                          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                            <span key={d} className="text-gray-300 text-[9px]">{d}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
