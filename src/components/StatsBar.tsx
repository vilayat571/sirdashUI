export default function StatsBar() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest mb-10">
          Helping to grow the next generation of <strong className="text-gray-600">500+</strong> companies
        </p>

        <div className="flex flex-wrap justify-center items-center gap-10 mb-14">
          {['Telecom Corp', 'FinanceHub', 'DataStream', 'NovaSoft', 'CloudBase', 'MetaAnalytics'].map((name) => (
            <div key={name} className="text-gray-300 font-bold text-lg tracking-tight hover:text-gray-400 transition-colors cursor-pointer select-none">
              {name}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '10x', label: 'Faster insights', sub: 'than traditional BI' },
            { value: '0 SQL', label: 'Required', sub: 'just natural language' },
            { value: '99.9%', label: 'Uptime SLA', sub: 'enterprise-grade' },
            { value: '3+ DBs', label: 'Supported', sub: 'more coming soon' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="text-3xl font-bold text-brand mb-1">{stat.value}</div>
              <div className="text-gray-700 font-semibold text-sm">{stat.label}</div>
              <div className="text-gray-400 text-xs mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
