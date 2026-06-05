import { useState } from "react";
import { Check, X, Zap, Star, Building2 } from "lucide-react";
import { useInView } from "../useInView";
import { pricingPlans } from "../../data";

const planIcons = [Zap, Star, Building2];

export function Pricing() {
  const [sectionRef, inView] = useInView(0.1);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section id="pricing" style={{ background: "#f8f9fb", padding: "140px 0", position: "relative", overflow: "hidden" }}>
      <div ref={sectionRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

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
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#EEEDFE", color: "#534AB7",
            fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "4px 14px", borderRadius: 999, marginBottom: 20,
          }}>
            Pricing
          </div>

          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#111", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 12 }}>
            Simple, <span style={{ color: "#534AB7" }}>transparent</span> pricing
          </h2>

          <p style={{ color: "#6b7280", fontSize: 16, fontWeight: 400, lineHeight: 1.7, margin: 0 }}>
            No hidden fees. No surprises. Scale when you're ready.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {pricingPlans.map((plan, i) => {
            const Icon = planIcons[i] || Zap;
            const isPopular = plan.isPopular;
            const isHov = hoveredPlan === plan.name;

            return (
              <div
                key={plan.name}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{
                  position: "relative",
                  borderRadius: 20,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  background: "#fff",
                  border: isPopular ? "2px solid #534AB7" : "0.5px solid #e5e7eb",
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.45s cubic-bezier(0.34,1.3,0.64,1), border-color 0.2s`,
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? isHov ? "translateY(-5px)" : "translateY(0)"
                    : "translateY(28px)",
                  cursor: "default",
                }}
              >
                {isPopular && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "#534AB7", color: "#fff",
                    fontSize: 11, fontWeight: 600, padding: "4px 16px", borderRadius: 999,
                    whiteSpace: "nowrap", letterSpacing: "0.04em",
                  }}>
                    ⭐ Most Popular
                  </div>
                )}

                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "#EEEDFE", border: "0.5px solid #CECBF6",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <Icon size={18} color="#534AB7" />
                </div>

                <div style={{ fontWeight: 700, fontSize: 17, color: "#111", marginBottom: 4 }}>{plan.name}</div>
                <div style={{ fontSize: 13, color: "#9ca3af", fontWeight: 400, lineHeight: 1.5, marginBottom: 20 }}>{plan.description}</div>

                <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 6 }}>
                  {plan.price !== "Custom" && (
                    <span style={{ fontSize: 20, fontWeight: 600, color: "#6b7280" }}>€</span>
                  )}
                  <span style={{ fontSize: plan.price === "Custom" ? 28 : 44, fontWeight: 700, color: "#111", lineHeight: 1 }}>
                    {plan.price === "Custom" ? "Custom" : plan.price.replace("€", "")}
                  </span>
                  {plan.price !== "Custom" && (
                    <span style={{ fontSize: 13, color: "#9ca3af", marginLeft: 2 }}>{plan.period}</span>
                  )}
                </div>

                <div style={{ height: "0.5px", background: "#f3f4f6", margin: "20px 0" }} />

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                      <Check size={14} color="#1D9E75" style={{ marginTop: 2, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded?.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#d1d5db", textDecoration: "line-through", lineHeight: 1.5 }}>
                      <X size={14} color="#d1d5db" style={{ marginTop: 2, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#demo"
                  style={{
                    display: "block", textAlign: "center", padding: "12px",
                    borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none",
                    letterSpacing: "0.01em", transition: "all 0.2s",
                    ...(isPopular
                      ? { background: "#534AB7", color: "#fff", border: "none" }
                      : { background: "#f9fafb", border: "0.5px solid #e5e7eb", color: "#374151" }
                    ),
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>

        {/* Custom plan banner */}
        <div
          style={{
            background: "#fff",
            border: "0.5px solid #e5e7eb",
            borderRadius: 18,
            padding: "36px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            marginTop: 20,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
          }}
        >
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8 }}>Need a custom solution?</h3>
            <p style={{ fontSize: 14, color: "#6b7280", fontWeight: 400, maxWidth: 480, margin: 0 }}>
              Talk to our sales team for volume discounts, custom SLAs, on-prem deployment, and a plan tailored to your exact requirements.
            </p>
          </div>
          <a
            href="#demo"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "0.5px solid #CECBF6", color: "#534AB7",
              fontWeight: 600, padding: "12px 28px", borderRadius: 12,
              textDecoration: "none", fontSize: 14, whiteSpace: "nowrap",
              background: "#EEEDFE", transition: "all 0.2s",
            }}
          >
            Get in touch →
          </a>
        </div>

      </div>
    </section>
  );
}

export default Pricing;