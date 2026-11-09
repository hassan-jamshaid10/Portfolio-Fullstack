import { site } from "@/content/site";

export function ProofStrip() {
  return (
    <section className="section facts-section" aria-label="Quick facts">
      <div className="section-inner">
        <div className="facts" data-reveal>
          {site.quickFacts.map((fact) => (
            <div key={fact.label}>
              <div className="mono">{fact.label}</div>
              <b>{fact.value}</b>
              <p>{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
