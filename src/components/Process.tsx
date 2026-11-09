import { site } from "@/content/site";

export function Process() {
  return (
    <section className="section tight" id="process">
      <div className="section-inner">
        <div className="sh">
          <div>
            <div className="mono" data-scramble data-text="/ Process">
              / Process
            </div>
            <h2>How it usually goes.</h2>
          </div>
          <p>From fuzzy brief to shipped product.</p>
        </div>
        <div className="process-grid">
          {site.process.map((item) => (
            <article key={item.step} data-reveal>
              <div className="mono">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
