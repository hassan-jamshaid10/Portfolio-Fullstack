"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

export function Process() {
  return (
    <section className="bg-teal px-5 py-24 text-paper md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-signal">
            How it usually goes
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
            From fuzzy brief to shipped product.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {site.process.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="border-t border-paper/20 pt-6"
            >
              <p className="font-[family-name:var(--font-mono)] text-sm text-signal">
                {item.step}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
