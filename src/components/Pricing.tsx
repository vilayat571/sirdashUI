import { Check, X } from 'lucide-react';
import { pricingPlans } from '../data';

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 text-lg">Choose the plan that best fits your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl p-7 flex flex-col transition-all ${
              plan.isPopular
                ? 'bg-[#06071a] border-2 border-brand shadow-2xl shadow-brand/20 text-white'
                : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
            }`}>
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-brand text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">⭐ Most Popular</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-bold text-xl mb-1 ${plan.isPopular?'text-white':'text-gray-900'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className={`font-bold text-4xl ${plan.isPopular?'text-white':'text-gray-900'}`}>{plan.price}</span>
                  {plan.price !== 'Custom' && <span className={`text-sm ${plan.isPopular?'text-white/50':'text-gray-400'}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm mt-2 ${plan.isPopular?'text-white/60':'text-gray-500'}`}>{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.isPopular?'text-white/75':'text-gray-600'}`}>
                    <Check size={15} className="text-green-400 mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
                {plan.notIncluded?.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm line-through ${plan.isPopular?'text-white/25':'text-gray-300'}`}>
                    <X size={15} className="text-red-400/60 mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>

              <a href="#demo" className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                plan.isPopular
                  ? 'bg-white text-brand hover:bg-gray-100'
                  : 'bg-brand hover:bg-brand-dark text-white shadow-md shadow-brand/20'
              }`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-gray-900 font-bold text-xl mb-2">Need a custom solution?</h3>
          <p className="text-gray-500 text-sm mb-5">Contact our sales team for a tailored pricing plan that fits your specific needs.</p>
          <a href="#demo" className="inline-block border border-gray-200 hover:border-brand/40 text-gray-700 hover:text-brand font-semibold px-8 py-3 rounded-xl transition-all">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
