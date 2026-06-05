import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Card {
  id: number;
  badge: string;
  icon: string;
  title: string;
  body: string;
  popup: Popup;
}

interface Popup {
  title: string;
  subtitle: string;
  body: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const cards: Card[] = [
  {
    id: 1,
    badge: "+ ASK IN PLAIN ENGLISH",
    icon: "💬",
    title: "From Question to Chart",
    body: "Ask a question in plain language. SirDash queries your database and returns a table, chart, and clear insight — in seconds, no SQL needed.",
    popup: {
      title: "Ask in plain English. Get answers you can use.",
      subtitle: "No SQL. No tickets. No waiting on the data team.",
      body: (
        <div className="space-y-4 text-sm leading-relaxed text-gray-600">
          <p>
            Type a business question the way you'd ask a colleague —{" "}
            <em className="text-indigo-600 font-medium not-italic bg-indigo-50 px-2 py-0.5 rounded">
              "Show revenue by region last quarter"
            </em>{" "}
            — and SirDash does the rest:
          </p>
          <ul className="space-y-3">
            {[
              "Understands your question using your real schema and business terms",
              "Generates the SQL automatically — visible and auditable",
              "Returns three things at once: a data table, a chart, and a plain-English insight",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-500">
            Anyone on your team can get answers in seconds. No training, no
            query language, no bottleneck.
          </p>
        </div>
      ),
      ctaLabel: "Try it in the sandbox →",
      ctaHref: "#sandbox",
    },
  },
  {
    id: 2,
    badge: "+ AUTOMATED SEMANTIC LAYER",
    icon: "🗂️",
    title: "Your Knowledge, Mapped Automatically",
    body: "Drop in your dbt, YAML, JSON, Confluence, and PDFs. SirDash mines them into a living semantic layer — so every answer understands your business.",
    popup: {
      title: "Semantic Mining: your business context, automatically.",
      subtitle: "Stop explaining your data to AI. Let it learn from what you already have.",
      body: (
        <div className="space-y-4 text-sm leading-relaxed text-gray-600">
          <p>
            Most AI tools don't know what your{" "}
            <strong className="text-gray-800">"active customer"</strong> or{" "}
            <strong className="text-gray-800">"net revenue"</strong> means.
            SirDash does — because it mines the documents your team already
            wrote:
          </p>
          <ul className="space-y-3">
            {[
              "Connects to your sources: dbt models, YAML, JSON, Confluence pages, PDFs, even meeting notes",
              "Extracts the meaning: tables, metrics, relationships, definitions, and business rules",
              "Builds a living semantic layer that keeps every answer grounded in your real business context",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-500 italic border-l-2 border-violet-200 pl-3">
            This is the difference between a generic chatbot and an analyst who
            actually knows your company.
          </p>
        </div>
      ),
      ctaLabel: "See how Semantic Mining works →",
      ctaHref: "#semantic-mining",
    },
  },
  {
    id: 3,
    badge: "+ DEEP INVESTIGATION",
    icon: "🔍",
    title: "Answer the Hard Questions",
    body: 'Go beyond simple reports. Ask "What separates our most profitable lanes from the ones losing money?" — SirDash investigates, finds the real drivers, and explains why.',
    popup: {
      title: "Ask the questions that used to need a data scientist.",
      subtitle: "Not just what happened — but why, with the numbers to prove it.",
      body: (
        <div className="space-y-5 text-sm leading-relaxed text-gray-600">
          <div className="bg-gray-900 text-white rounded-xl p-4 text-base font-medium leading-snug">
            "What separates our most profitable delivery lanes from the ones
            quietly losing money?"
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-2">
              How SirDash investigates it:
            </p>
            <p>
              A question like this can't be answered with a single query.
              SirDash breaks it down automatically — grouping lanes into
              profitable vs. unprofitable cohorts, comparing across corridor,
              carrier, volume, and service level, testing statistical
              significance, and ranking by real financial impact.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-3">
              What it finds —{" "}
              <span className="font-normal text-gray-400">an example:</span>
            </p>
            <ol className="space-y-3 list-none">
              {[
                {
                  n: "1",
                  text: (
                    <>
                      <strong className="text-gray-800">
                        Corridor is the dominant factor — not carrier.
                      </strong>{" "}
                      Short-haul regional corridors with high backhaul
                      utilization average 23% margin, while long-haul
                      cross-border lanes average −4%.
                    </>
                  ),
                },
                {
                  n: "2",
                  text: (
                    <>
                      <strong className="text-gray-800">
                        There are two different kinds of profitable lanes.
                      </strong>{" "}
                      Type A: dense dedicated routes. Type B: consolidated
                      multi-stop lanes. They win for opposite reasons and need
                      opposite optimizations.
                    </>
                  ),
                },
                {
                  n: "3",
                  text: (
                    <>
                      <strong className="text-gray-800">
                        The counter-intuitive part:
                      </strong>{" "}
                      your highest-volume lanes aren't your most profitable.
                      Mid-volume lanes (40–70th percentile) carry the best
                      margins.
                    </>
                  ),
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    {item.n}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
            SirDash surfaces the driver, shows the SQL behind every number, and
            lets you act on it.
          </p>
        </div>
      ),
      ctaLabel: "Book a demo to see this on your own data →",
      ctaHref: "#book-demo",
    },
  },
];

// ─── Badge accent colours per card ───────────────────────────────────────────

const badgeStyles = [
  "bg-indigo-50 text-indigo-600 border border-indigo-100",
  "bg-violet-50 text-violet-600 border border-violet-100",
  "bg-rose-50 text-rose-600 border border-rose-100",
];

const ctaStyles = [
  "bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-400",
  "bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-400",
  "bg-gray-900 hover:bg-gray-800 focus-visible:ring-gray-400",
];

const accentBorderStyles = [
  "border-t-indigo-500",
  "border-t-violet-500",
  "border-t-rose-500",
];

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({
  card,
  cardIndex,
  onClose,
}: {
  card: Card;
  cardIndex: number;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={card.popup.title}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent border */}
        <div
          className={`h-1 w-full ${
            cardIndex === 0
              ? "bg-indigo-500"
              : cardIndex === 1
              ? "bg-violet-500"
              : "bg-rose-500"
          }`}
        />

        {/* Header */}
        <div className="px-7 pt-7 pb-5">
          <div
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 ${badgeStyles[cardIndex]}`}
          >
            {card.badge}
          </div>
          <h2 className="text-xl font-bold text-gray-900 leading-tight mb-1.5">
            {card.popup.title}
          </h2>
          <p className="text-sm text-gray-500">{card.popup.subtitle}</p>
        </div>

        {/* Divider */}
        <div className="mx-7 h-px bg-gray-100" />

        {/* Body */}
        <div className="px-7 py-5">{card.popup.body}</div>

        {/* Footer */}
        <div className="px-7 pb-7 flex items-center gap-3">
          <a
            href={card.popup.ctaHref}
            className={`flex-1 text-center text-sm font-semibold text-white px-5 py-3 rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${ctaStyles[cardIndex]}`}
          >
            {card.popup.ctaLabel}
          </a>
          <button
            onClick={onClose}
            className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition-colors duration-150"
          >
            Close
          </button>
        </div>

        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function FeatureCard({
  card,
  index,
  onLearnMore,
}: {
  card: Card;
  index: number;
  onLearnMore: () => void;
}) {
  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-sm border border-gray-100 border-t-2 ${accentBorderStyles[index]} p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
    >
      {/* Badge */}
      <span
        className={`self-start inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${badgeStyles[index]}`}
      >
        {card.badge}
      </span>

      {/* Icon */}
      <div className="text-3xl">{card.icon}</div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 leading-snug">
        {card.title}
      </h3>

      {/* Body */}
      <p className="text-sm text-gray-500 leading-relaxed flex-1">{card.body}</p>

      {/* Learn More */}
      <button
        onClick={onLearnMore}
        className={`self-start text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-150 ${
          index === 0
            ? "text-indigo-600 hover:text-indigo-800"
            : index === 1
            ? "text-violet-600 hover:text-violet-800"
            : "text-rose-600 hover:text-rose-800"
        }`}
      >
        Learn More
        <svg
          className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function SirDashCards() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .animate-modal-in { animation: modal-in 0.2s ease-out both; }
      `}</style>

      <section className=" pt-36 pb-12 bg-gray-50 flex flex-col items-center justify-center px-4">
        {/* Section header */}
        <div className="text-center max-w-xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            What SirDash Does
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Three ways SirDash{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
              transforms
            </span>{" "}
            your data access
          </h1>
          <p className="mt-4 mb-12 text-base text-gray-500">
            No SQL. No tickets. No waiting on the data team.
          </p>
        </div>

        {/* Cards grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <FeatureCard
              key={card.id}
              card={card}
              index={i}
              onLearnMore={() => setActiveCard(i)}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      {activeCard !== null && (
        <Modal
          card={cards[activeCard]}
          cardIndex={activeCard}
          onClose={() => setActiveCard(null)}
        />
      )}
    </>
  );
}