"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";

export function Credentials() {
  return (
    <section
      id="credentials"
      className="border-t border-line bg-mist px-5 py-24 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-teal">
            Credentials
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
            Certifications & hackathons.
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-start gap-4"
          >
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-muted">
              Certification
            </p>
            {site.certifications.map((cert) => (
              <div key={cert.title} className="w-full max-w-[240px]">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={240}
                  height={300}
                  className="h-auto w-full object-contain"
                />
                <p className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold">
                  {cert.title}
                </p>
                <p className="text-sm text-muted">{cert.issuer}</p>
              </div>
            ))}
          </motion.div>

          <div>
            <p className="mb-6 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-muted">
              Hackathon experience
            </p>
            <div className="divide-y divide-line border-y border-line">
              {site.hackathons.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="grid gap-3 py-7 md:grid-cols-[120px_160px_1fr] md:items-baseline md:gap-8"
                >
                  <span className="font-[family-name:var(--font-mono)] text-sm text-muted">
                    {item.year}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-lg font-bold text-teal">
                    {item.result}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-muted">{item.detail}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
