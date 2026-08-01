"use client";

import { motion } from "framer-motion";

const proofs = [
  {
    label: "Now",
    value: "Liffey Logics",
    detail: "Associate Software Engineer",
  },
  {
    label: "Focus",
    value: "SaaS & AI systems",
    detail: "Multi-tenant platforms that ship",
  },
  {
    label: "Certified",
    value: "AWS Cloud Foundations",
    detail: "Amazon Web Services Academy",
  },
  {
    label: "Base",
    value: "Lahore | Remote",
    detail: "Open to global teams",
  },
];

export function ProofStrip() {
  return (
    <section className="border-y border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl md:grid-cols-4">
        {proofs.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="border-b border-paper/10 px-5 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:py-10 md:last:border-r-0"
          >
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-signal">
              {item.label}
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight md:text-2xl">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-paper/55">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
