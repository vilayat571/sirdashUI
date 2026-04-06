import { integrations } from '../data';

export default function Integrations() {
  return (
    <section className="bg-gray-50 py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Connect instantly with all your data sources</h2>
          <p className="text-gray-500 text-lg">No more bottlenecks. Start analyzing right away.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {integrations.map((db) => (
            <div key={db.name} className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm hover:shadow-md hover:border-brand/20 transition-all group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-5 text-3xl group-hover:bg-brand/5 group-hover:border-brand/20 transition-all">
                {db.emoji}
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-1">{db.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{db.description}</p>
              <div className="inline-flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Ready to connect
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mb-16">More integrations coming soon. Connect your existing infrastructure seamlessly.</p>

        {/* 10x trust block */}
        <div className="bg-brand/5 border border-brand/15 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-28 h-28 rounded-full bg-brand/10 border-2 border-brand/25 flex items-center justify-center">
            <span className="text-brand font-bold text-4xl">10x</span>
          </div>
          <div>
            <h3 className="text-gray-900 font-bold text-2xl mb-2">Trusted by data-intensive industries</h3>
            <p className="text-gray-500 leading-relaxed">
              From telecom giants managing customer data to financial institutions analyzing market trends, SirDash.ai empowers teams to make data-driven decisions without the traditional bottlenecks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
