import { securityFeatures } from '../data';

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-100 text-blue-600',
  purple: 'bg-purple-50 border-purple-100 text-purple-600',
  green: 'bg-green-50 border-green-100 text-green-600',
  yellow: 'bg-yellow-50 border-yellow-100 text-yellow-600',
  red: 'bg-red-50 border-red-100 text-red-600',
  indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
};

export default function Security() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-5 text-2xl">🛡️</div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Enterprise-Grade Security</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Your data stays protected with our comprehensive security framework</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {securityFeatures.map((f) => (
            <div key={f.category} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 hover:border-gray-200 transition-colors">
              <div className={`inline-flex items-center gap-2 border px-3 py-1.5 rounded-xl mb-4 text-sm font-semibold ${colorMap[f.color]}`}>
                <span>{f.icon}</span>{f.category}
              </div>
              <ul className="space-y-2">
                {f.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="text-green-500 font-bold mt-0.5 flex-shrink-0">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-brand/5 border border-brand/15 rounded-2xl p-8 flex items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-2xl flex-shrink-0">🔒</div>
          <div>
            <h3 className="text-gray-900 font-bold text-xl mb-2">Your data never leaves your environment</h3>
            <p className="text-gray-500 leading-relaxed">SirDash never copies or stores raw customer tables—queries run where your data lives, and only aggregated results are cached. Your sensitive information stays within your security perimeter at all times.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
