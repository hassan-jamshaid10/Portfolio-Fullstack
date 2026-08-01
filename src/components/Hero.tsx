"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="hero-shell grain relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-grid" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="absolute -right-6 top-[18%] select-none font-[family-name:var(--font-display)] text-[clamp(8rem,28vw,22rem)] font-extrabold leading-none tracking-[-0.06em] text-ink md:-right-10"
        >
          HJ
        </motion.p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="flex items-center justify-between gap-4"
        >
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-teal">
            {site.role}
          </p>
          <p className="hidden font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-muted sm:block">
            {site.location}
          </p>
        </motion.div>

        <div className="my-auto py-10 md:py-14">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="mb-7 h-1 w-16 origin-left bg-signal md:mb-9 md:w-24"
          />

          <h1 className="font-[family-name:var(--font-display)] font-extrabold tracking-[-0.05em] text-ink">
            <span className="sr-only">{site.fullName}</span>
            <span className="flex flex-col gap-0" aria-hidden>
              <motion.span
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
                className="block text-[clamp(3.8rem,13vw,9.5rem)] leading-[0.86]"
              >
                {site.firstName}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.32, ease }}
                className="block text-[clamp(3.8rem,13vw,9.5rem)] leading-[0.86]"
              >
                {site.lastName}
                <span className="text-teal">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-8 max-w-xl font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug tracking-tight text-ink md:mt-10 md:text-3xl"
          >
            {site.hero.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease }}
            className="mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg"
          >
            {site.hero.support}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.75, ease }}
          className="flex flex-col gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-ink px-8 py-4 font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-paper transition-colors duration-300 hover:bg-teal"
            >
              Let&apos;s talk
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
            <a
              href="#work"
              className="font-[family-name:var(--font-display)] text-base font-semibold text-ink underline decoration-ink/25 decoration-1 underline-offset-8 transition hover:decoration-teal"
            >
              See selected work
            </a>
          </div>

          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-muted transition hover:text-ink"
          >
            Download resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
