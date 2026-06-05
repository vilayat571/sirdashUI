import logoPush from '../../assets/logos/push30.png'
import logoYazaki from '../../assets/logos/yazaki_logo.jpeg'
import logoBozbec from '../../assets/logos/bozbecLogo.webp'

const PARTNERS = [
  { name: "Push 30", src: logoPush },
  { name: "Bozbec", src: logoBozbec },
  { name: "Motech", src: logoYazaki },
];

const Companies = () => {
  return (
    <section className="relative overflow-hidden bg-[#05060f] px-6 py-24 border-t border-indigo-500/[0.08]">

      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Bottom glow */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.07)_0%,transparent_70%)]" />

      {/* Inner */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">

        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-indigo-400">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
          Our Partners
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Powering data teams worldwide
        </h2>

        {/* Subtitle */}
        <p className="mb-14 text-center text-[15px] font-light leading-relaxed text-white/35">
          From startups to enterprise — teams rely on SirDash for instant data access.
        </p>

        {/* Cards */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          {PARTNERS.map((p, i) => (
            <>
              {/* Card */}
              <div
                key={p.name}
                className="group flex w-48 flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-7 py-8 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-indigo-500/[0.04] hover:shadow-[0_8px_32px_rgba(99,102,241,0.1),0_0_0_1px_rgba(99,102,241,0.1)]"
              >
                <div className="flex h-14 w-24 items-center justify-center">
                  <img
                    src={p.src}
                    alt={p.name}
                    className="h-full w-full object-contain brightness-0 invert opacity-55 transition-opacity duration-200 group-hover:opacity-90"
                  />
                </div>
                <span className="text-center text-[11px] font-medium uppercase tracking-[0.04em] text-white/30 transition-colors duration-200 group-hover:text-white/55">
                  {p.name}
                </span>
              </div>

              {/* Divider */}
              {i < PARTNERS.length - 1 && (
                <div key={`div-${i}`} className="hidden h-12 w-px flex-shrink-0 bg-white/[0.06] sm:block" />
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;