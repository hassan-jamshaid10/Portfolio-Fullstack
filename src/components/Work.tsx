"use client";

import { useRef, type PointerEvent } from "react";
import { Magnetic } from "@/components/portfolio/Magnetic";
import { projectHref, site, type Project } from "@/content/site";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

const bars = ["40%", "70%", "55%", "90%", "65%", "80%"];

function Explore({ project }: { project: Project }) {
  const href = projectHref(project);
  if (!href) {
    return (
      <span className="explore is-pending" aria-hidden="true">
        ↗
      </span>
    );
  }
  const external = href.startsWith("http");
  const label = project.linkLabel ? `${project.linkLabel}: ${project.title}` : `Open ${project.title}`;
  return (
    <a
      className="explore"
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      ↗
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const href = projectHref(project);
  const size = index === 0 ? "big" : index === 1 ? "mid" : "third";

  function onMove(event: PointerEvent<HTMLElement>) {
    const card = ref.current;
    if (!card || event.pointerType !== "mouse" || !hasFinePointer() || prefersReducedMotion()) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
    const rx = (py - 0.5) * -7;
    const ry = (px - 0.5) * 9;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  }

  function onLeave() {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "";
  }

  return (
    <article
      ref={ref}
      className={`card ${size}`}
      data-cursor={href ? "view" : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="num">{project.id}</span>
      <div className="mono">{project.company}</div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      {index === 0 ? (
        <div className="ui" aria-hidden="true">
          <i style={{ width: "40%" }} />
          <i style={{ width: "70%" }} />
          <div className="bars">
            {bars.map((height) => (
              <b key={height} style={{ height }} />
            ))}
          </div>
        </div>
      ) : null}
      <div className="chips">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <Magnetic className="explore-wrap" strength={0.35}>
        <Explore project={project} />
      </Magnetic>
    </article>
  );
}

export function Work() {
  return (
    <section className="section tight" id="work">
      <div className="section-inner">
        <div className="sh">
          <div>
            <div className="mono" data-scramble data-text="/ Selected work">
              / Selected work
            </div>
            <h2>Built to perform.</h2>
          </div>
          <p>{site.workIntro}</p>
        </div>
        <div className="work-grid">
          {site.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
