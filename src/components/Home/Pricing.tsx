import { useState } from "react";
import { Check, X, Zap, Star, Building2 } from "lucide-react";
import { useInView } from "../useInView";
import { pricingPlans } from "../../data";

const planIcons = [Zap, Star, Building2];

export function Pricing() {
  const [sectionRef, inView] = useInView(0.1);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <>
      <style>{`

        .pricing-section {
          background: #05060f;
          padding: 140px 0;
          position: relative;
          overflow: hidden;
        }

        .pricing-section::before {
          content: '';
          position: absolute;
          bottom: -100px;
          right: -200px;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .pricing-section::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent);
        }

        .pricing-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          color: #818cf8;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 24px;
        }

        .pricing-title {
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .pricing-title span {
          background: linear-gradient(135deg, #818cf8, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pricing-subtitle {
          color: rgba(255,255,255,0.4);
          font-size: 16px;
          font-weight: 300;
          line-height: 1.7;
        }

        .pricing-card {
          position: relative;
          border-radius: 24px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.4s cubic-bezier(0.34,1.2,0.64,1);
          cursor: default;
        }

        .pricing-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(99,102,241,0.3);
        }

        .pricing-card.popular {
          background: linear-gradient(160deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 100%);
          border: 1px solid rgba(99,102,241,0.4);
          box-shadow: 0 0 0 1px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .pricing-card.popular:hover {
          box-shadow: 0 20px 60px rgba(99,102,241,0.2), 0 0 0 1px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .pricing-popular-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #6366f1, #818cf8);
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 18px;
          border-radius: 999px;
          white-space: nowrap;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 20px rgba(99,102,241,0.5);
        }

        .pricing-plan-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .pricing-plan-name {
          font-weight: 700;
          font-size: 18px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 4px;
        }

        .pricing-plan-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .pricing-price-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 6px;
        }

        .pricing-price-currency {
          font-size: 22px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
        }

        .pricing-price-amount {
          font-size: 48px;
          font-weight: 800;
          color: white;
          line-height: 1;
        }

        .pricing-price-period {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
        }

        .pricing-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 24px 0;
        }

        .pricing-feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pricing-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }

        .pricing-feature-item.disabled {
          color: rgba(255,255,255,0.2);
          text-decoration: line-through;
        }

        .pricing-cta {
          display: block;
          text-align: center;
          padding: 14px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: all 0.3s;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
        }

        .pricing-cta:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
          color: white;
          transform: translateY(-2px);
        }

        .pricing-cta.popular-cta {
          background: linear-gradient(135deg, #6366f1, #818cf8);
          border: none;
          color: white;
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
        }

        .pricing-cta.popular-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(99,102,241,0.55);
        }

        .pricing-custom-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .pricing-custom-card h3 {
          font-size: 22px;
          font-weight: 800;
          color: white;
          margin-bottom: 8px;
        }

        .pricing-custom-card p {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          max-width: 480px;
        }

        .pricing-custom-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(99,102,241,0.4);
          color: #818cf8;
          font-weight: 600;
          padding: 14px 32px;
          border-radius: 14px;
          text-decoration: none;
          font-size: 14px;
          white-space: nowrap;
          transition: all 0.3s;
          font-family: 'DM Sans', sans-serif;
        }

        .pricing-custom-cta:hover {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.6);
          color: white;
          transform: translateY(-2px);
        }
      `}</style>

      <section className="pricing-section" id="pricing">
        <div
          ref={sectionRef}
          style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 72,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="pricing-label">Pricing</div>
            <h2 className="pricing-title">
              Simple, <span>Transparent</span> Pricing
            </h2>
            <p className="pricing-subtitle">
              No hidden fees. No surprises. Scale when you're ready.
            </p>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {pricingPlans.map((plan, i) => {
              const Icon = planIcons[i] || Zap;
              const isPopular = plan.isPopular;

              return (
                <div
                  key={plan.name}
                  className={`pricing-card${isPopular ? " popular" : ""}`}
                  onMouseEnter={() => setHoveredPlan(plan.name)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView
                      ? hoveredPlan === plan.name ? "translateY(-6px)" : "translateY(0)"
                      : "translateY(28px)",
                    transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.5s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.3s, border-color 0.3s`,
                  }}
                >
                  {isPopular && (
                    <div className="pricing-popular-badge">⭐ Most Popular</div>
                  )}

                  <div className="pricing-plan-icon">
                    <Icon size={20} color="#818cf8" />
                  </div>

                  <div className="pricing-plan-name">{plan.name}</div>
                  <div className="pricing-plan-desc">{plan.description}</div>

                  <div className="pricing-price-row">
                    {plan.price !== "Custom" && (
                      <span className="pricing-price-currency">€</span>
                    )}
                    <span className="pricing-price-amount">
                      {plan.price === "Custom" ? "Custom" : plan.price.replace("€", "")}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="pricing-price-period">{plan.period}</span>
                    )}
                  </div>

                  <div className="pricing-divider" />

                  <ul className="pricing-feature-list">
                    {plan.features.map((f) => (
                      <li key={f} className="pricing-feature-item">
                        <Check size={14} color="#4ade80" style={{ marginTop: 2, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded?.map((f) => (
                      <li key={f} className="pricing-feature-item disabled">
                        <X size={14} color="rgba(255,255,255,0.15)" style={{ marginTop: 2, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#demo"
                    className={`pricing-cta${isPopular ? " popular-cta" : ""}`}
                  >
                    {plan.cta}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Custom plan banner */}
          <div
            className="pricing-custom-card"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
            }}
          >
            <div>
              <h3>Need a custom solution?</h3>
              <p>
                Talk to our sales team for volume discounts, custom SLAs, on-prem deployment, and a plan tailored to your exact requirements.
              </p>
            </div>
            <a href="#demo" className="pricing-custom-cta">
              Get in Touch →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pricing;