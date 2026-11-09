"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { Magnetic } from "@/components/portfolio/Magnetic";
import { site, type Project } from "@/content/site";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  function onMove(event: PointerEvent<HTMLElement>) {
    const card = ref.current;
    if (!card || event.pointerType !== "mouse" || !hasFinePointer() || prefersReducedMotion()) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
    const rx = (py - 0.5) * -6;
    const ry = (px - 0.5) * 8;
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
      className="card"
      data-cursor={project.link ? "view" : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="card-cover">
        <Image src={project.cover} alt="" width={1400} height={820} sizes="(max-width: 800px) 100vw, 33vw" />
        <span className="num">{project.id}</span>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="mono">{project.role}</span>
          <span className="mono">{project.dates}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="chips">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.link ? (
          <Magnetic strength={0.28}>
            <a
              className="btn solid card-link"
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.link.label} ↗
            </a>
          </Magnetic>
        ) : null}
      </div>
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
          {site.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
