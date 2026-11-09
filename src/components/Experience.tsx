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
                <div className="mono">{job.period}</div>
                {job.location ? <div className="mono loc">{job.location}</div> : null}
              </div>
              <div>
                <h3>{job.role}</h3>
                {job.href ? (
                  <a className="co" href={job.href} target="_blank" rel="noreferrer">
                    {job.company} ↗
                  </a>
                ) : (
                  <div className="co">{job.company}</div>
                )}
                <p className="summary">{job.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
