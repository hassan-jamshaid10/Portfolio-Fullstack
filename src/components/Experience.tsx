"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-line bg-paper px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-teal">
            Experience
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
            Where I’ve shipped.
          </h2>
        </div>

        <div className="space-y-0 divide-y divide-line border-y border-line">
          {site.experience.map((job, index) => (
            <motion.article
              key={`${job.company}-${job.role}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-6 py-10 md:grid-cols-[220px_1fr] md:gap-12 md:py-12"
            >
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-muted">
                  {job.period}
                </p>
                <p className="mt-2 text-sm text-muted">{job.location}</p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
                  {job.role}
                </h3>
                <p className="mt-1 text-lg font-semibold text-teal">
                  {job.company}
                </p>
                <p className="mt-3 max-w-2xl text-muted">{job.summary}</p>
                <ul className="mt-5 max-w-2xl space-y-3">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="border-l-2 border-signal/70 pl-4 text-ink-soft/85 leading-relaxed"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-2"
        >
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-teal">
              Education
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold">
              {site.education.degree}
            </p>
            <p className="mt-1 text-muted">
              {site.education.school} | {site.education.period}
            </p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-teal">
              Achievements
            </p>
            <ul className="mt-3 space-y-2">
              {site.achievements.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
