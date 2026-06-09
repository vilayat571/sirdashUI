const certificates = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="#4F46E5" strokeWidth="2" fill="none" />
        <path d="M16 4C16 4 10 8 10 16C10 20 12.5 23.5 16 25C19.5 23.5 22 20 22 16C22 8 16 4 16 4Z" fill="#4F46E5" opacity="0.15" stroke="#4F46E5" strokeWidth="1.5" />
        <line x1="4" y1="16" x2="28" y2="16" stroke="#4F46E5" strokeWidth="1.5" />
        <line x1="8" y1="10" x2="24" y2="10" stroke="#4F46E5" strokeWidth="1.5" />
        <line x1="8" y1="22" x2="24" y2="22" stroke="#4F46E5" strokeWidth="1.5" />
      </svg>
    ),
    label: "GDPR Compliant",
    color: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-indigo-100",
    badge: "Active",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3L5 8V16C5 21.5 9.8 26.7 16 28C22.2 26.7 27 21.5 27 16V8L16 3Z" stroke="#7C3AED" strokeWidth="2" fill="#7C3AED" fillOpacity="0.1" />
        <path d="M11 16L14.5 19.5L21 13" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "CASA Tier II Verified",
    color: "bg-violet-50 border-violet-100",
    iconBg: "bg-violet-100",
    badge: "Verified",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="13" stroke="#2563EB" strokeWidth="2" fill="none" />
        <path d="M7 16C7 11.029 11.029 7 16 7" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M25 16C25 20.971 20.971 25 16 25" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="6" y="13" width="20" height="6" rx="1" fill="#2563EB" fillOpacity="0.12" />
        <line x1="6" y1="13" x2="26" y2="13" stroke="#2563EB" strokeWidth="1" />
        <line x1="6" y1="19" x2="26" y2="19" stroke="#2563EB" strokeWidth="1" />
      </svg>
    ),
    label: "CCPA Compliant",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
    badge: "Active",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="24" height="24" rx="6" stroke="#6B7280" strokeWidth="2" fill="none" />
        <path d="M10 16H22M16 10V22" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="4" stroke="#6B7280" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    label: "SOC 2 Type II",
    color: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-100",
    badge: "Coming Soon",
    badgeColor: "bg-gray-200 text-gray-500",
  },
];

const Certificates = () => {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section eyebrow */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
            Security & Compliance
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-3">
          Enterprise-Grade{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
            Security
          </span>
        </h2>
        <p className="text-center text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-14">
          Your data stays protected with our comprehensive security framework — certified and verified by independent bodies.
        </p>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.label}
              className={`relative flex flex-col items-start gap-4 p-6 rounded-2xl border ${cert.color} transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
            >
              {/* Badge */}
              <span
                className={`absolute top-4 right-4 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cert.badgeColor}`}
              >
                {cert.badge}
              </span>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${cert.iconBg} flex items-center justify-center`}>
                {cert.icon}
              </div>

              {/* Label */}
              <p className="text-gray-900 font-semibold text-base leading-snug pr-2">
                {cert.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom trust note */}
        <div className="mt-12 flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 max-w-2xl mx-auto">
          <svg className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0V7m0 4v4m-6 4h12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
          </svg>
          <p className="text-sm text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">Your data never leaves your environment.</span>{" "}
            SirDash never copies or stores raw customer tables — queries run where your data lives, and only aggregated results are cached.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certificates;