export default function Demo() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">See SirDash in Action</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Watch how SirDash transforms natural language into powerful data insights in real-time</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 aspect-video flex items-center justify-center cursor-pointer group">
            {/* Mock video frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-[#06071a]" />
            <div className="absolute inset-0 grid-bg opacity-20" />

            {/* UI inside video */}
            <div className="absolute inset-0 flex opacity-40">
              <div className="w-44 bg-white/5 border-r border-white/5 p-3 space-y-1">
                {['Home','Chats','Updates & FAQ','Data Profile','Settings'].map((item,i)=>(
                  <div key={item} className={`text-xs px-2 py-1.5 rounded text-white/40 ${i===4?'bg-brand/30 text-brand-light':''}`}>{item}</div>
                ))}
              </div>
              <div className="flex-1 p-4">
                <div className="text-white font-bold text-sm mb-3">User Management</div>
                <div className="space-y-2">
                  {[['Username','testuser2'],['Email','test@test.de'],['First Name',''],['Password','']].map(([l,v])=>(
                    <div key={l}>
                      <div className="text-white/30 text-[10px] mb-0.5">{l}</div>
                      <div className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white/40 text-xs">{v}</div>
                    </div>
                  ))}
                  <div className="bg-brand text-white text-xs px-3 py-1.5 rounded w-fit mt-1">Create</div>
                </div>
              </div>
            </div>

            {/* Play button */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1.5" />
              </div>
              <span className="text-white/70 text-sm font-medium">Watch Demo · 2 min</span>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              ▶ Watch on YouTube
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6 mb-8">Ready to experience the power of conversational data intelligence?</p>
          <div className="flex justify-center">
            <a href="#demo" className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand/20 flex items-center gap-2">
              Book a Personalized Demo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
