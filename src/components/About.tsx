"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";

export function About() {
  const aws = site.certifications[0];

  return (
    <section
      id="about"
      className="border-t border-line bg-mist px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[1.15fr_0.85fr] md:gap-16 lg:gap-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-teal">
              About
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
              {site.about.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft/85">
              {site.about.body}
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 space-y-4"
          >
            {site.about.highlights.map((item) => (
              <li
                key={item}
                className="border-l-2 border-signal pl-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-ink"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="justify-self-center md:justify-self-end"
        >
          <div className="relative w-full max-w-sm border border-line bg-paper px-8 py-10 text-center shadow-[0_20px_50px_rgba(12,18,16,0.06)]">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-teal">
              Certification
            </p>
            <div className="relative mx-auto mt-6 h-44 w-44 md:h-52 md:w-52">
              <Image
                src={aws.image}
                alt={`${aws.title} badge`}
                fill
                sizes="208px"
                className="object-contain"
                priority
              />
            </div>
            <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink">
              {aws.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{aws.issuer}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
