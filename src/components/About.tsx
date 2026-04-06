export default function About() {
  return (
    <section id="about" className="bg-gray-50 py-28">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-brand font-semibold mb-6 shadow-sm">
            + NATURAL LANGUAGE DATA ACCESS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Connect Instantly With<br />All Your Data Sources
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            No SQL, no complicated setup—just ask your data questions in plain English and get instant answers.
          </p>
          <a href="#demo" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-3.5 rounded-xl mt-8 transition-all shadow-lg shadow-brand/20">
            Book A Demo <span className="text-lg rotate-45 inline-block">↗</span>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {[
            {
              badge: '+ REAL-TIME ANALYTICS',
              badgeColor: 'text-red-500 bg-red-50 border-red-200',
              title: 'Dashboards In Seconds',
              desc: 'Plan, collaborate, and query your data in seconds. No SQL knowledge needed—our AI translates your questions into powerful database queries automatically.',
            },
            {
              badge: '+ BETTER INSIGHTS',
              badgeColor: 'text-green-600 bg-green-50 border-green-200',
              title: 'AI-Driven Insights',
              desc: 'Our Agentic RAG Intelligence actively shapes responses based on your specific domain knowledge. Get insights tailored to your business context every time.',
            },
            {
              badge: '+ NO MORE SQL',
              badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
              title: 'Write Queries In English',
              desc: 'Natural language queries are transformed into precise SQL statements. Ask anything in plain English and get perfectly structured results instantly.',
            },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-semibold mb-4 ${card.badgeColor}`}>
                {card.badge}
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              <button className="mt-4 text-brand text-sm font-semibold hover:text-brand-dark transition-colors">Learn More →</button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-2xl">🔗</div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-bold text-xl mb-1">Connect SirDash To Your Stack</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Connect in minutes with PostgreSQL, Microsoft SQL Server, or Oracle Database. We will jump on a call to onboard you and configure your semantic data layer from day one.
            </p>
          </div>
          <a href="#demo" className="flex-shrink-0 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm whitespace-nowrap">
            Book A Demo ↗
          </a>
        </div>
      </div>
    </section>
  );
}
