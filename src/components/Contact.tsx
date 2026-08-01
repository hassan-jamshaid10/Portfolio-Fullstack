"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="atmosphere grain relative overflow-hidden border-t border-line px-5 py-24 md:px-8 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-teal">
            Contact
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-6xl">
            {site.contact.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {site.contact.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-teal"
            >
              {site.email}
            </a>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink"
            >
              Resume
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink"
            >
              LinkedIn
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
