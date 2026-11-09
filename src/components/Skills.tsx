import { site } from "@/content/site";

export function Skills() {
  return (
    <section className="section tight" id="skills">
      <div className="section-inner">
        <div className="sh">
          <div>
            <div className="mono" data-scramble data-text="/ Technical arsenal">
              / Technical arsenal
            </div>
            <h2>Stack I ship with.</h2>
          </div>
        </div>
        <div className="skill-grid">
          {site.skills.map((group) => (
            <article className="sk" key={group.group} data-reveal>
              <div className="mono">{group.group}</div>
              <div className="chips">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="ach">
          {site.achievementTiles.map((item) => (
            <article key={item.title} data-reveal>
              <small className="mono">{item.kicker}</small>
              {item.title}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
