import { site } from "@/content/site";

export function Experience() {
  const education = `${site.education.degree}, ${site.education.school}, ${site.education.period}.`;

  return (
    <section className="section tight" id="experience">
      <div className="section-inner">
        <div className="sh">
          <div>
            <div className="mono" data-scramble data-text="/ Experience">
              / Experience
            </div>
            <h2>Where I’ve shipped.</h2>
          </div>
          <p>{education}</p>
        </div>
        <div className="exp">
          {site.experience.map((job) => (
            <article className="exp-row" key={`${job.company}-${job.period}`}>
              <div>
                <div className="mono">{job.period.replace(" to ", " → ")}</div>
                <div className="mono loc">{job.location}</div>
              </div>
              <div>
                <h3>{job.role}</h3>
                <div className="co">{job.company}</div>
                <p className="summary">{job.summary}</p>
              </div>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
