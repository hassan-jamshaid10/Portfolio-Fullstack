"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink"
        >
          {site.firstName}
          <span className="text-teal">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft/80 transition hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-sm bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-teal"
        >
          Let’s talk
        </a>
      </div>
    </motion.header>
  );
}
