"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

export function Work() {
  return (
    <section id="work" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-teal">
              Selected work
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-6xl">
              Built to perform.
            </h2>
          </div>
          <p className="max-w-md text-muted md:text-right">
            A tight set of systems and product surfaces: automation, platforms,
            and interfaces with intent.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {site.projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group grid gap-6 py-10 transition md:grid-cols-[100px_1.1fr_1.4fr_auto] md:items-center md:gap-10 md:py-12"
            >
              <span className="font-[family-name:var(--font-mono)] text-sm text-muted">
                {project.id}
              </span>
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-teal">
                  {project.company}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight transition group-hover:text-teal md:text-3xl">
                  {project.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-ink-soft/80">
                {project.summary}
              </p>
              <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-teal transition group-hover:translate-x-1">
                Explore →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
