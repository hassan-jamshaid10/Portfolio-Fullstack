"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { useLenis } from "lenis/react";
import { Magnetic } from "@/components/portfolio/Magnetic";
import { prefersReducedMotion } from "@/lib/motion";

const links = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#contact", id: "contact", label: "Contact" },
];

function ThemeToggle() {
  const { setTheme } = useTheme();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.getAttribute("data-theme") !== "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    const reduce = prefersReducedMotion();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = `${rect.left + rect.width / 2}px`;
    const y = `${rect.top + rect.height / 2}px`;

    const commit = () => {
      document.documentElement.setAttribute("data-theme", next);
      document.documentElement.style.colorScheme = next;
      flushSync(() => setTheme(next));
    };

    const canReveal = !reduce && typeof document.startViewTransition === "function";
    if (!canReveal) {
      if (!reduce) document.documentElement.classList.add("theme-fade");
      window.requestAnimationFrame(() => {
        commit();
        window.setTimeout(() => document.documentElement.classList.remove("theme-fade"), 360);
      });
      return;
    }

    document.documentElement.style.setProperty("--theme-x", x);
    document.documentElement.style.setProperty("--theme-y", y);
    const transition = document.startViewTransition(() => {
      commit();
    });
    transition.finished.finally(() => {
      document.documentElement.style.removeProperty("--theme-x");
      document.documentElement.style.removeProperty("--theme-y");
    });
  }

  return (
    <button
      type="button"
      className="toggle"
      role="switch"
      aria-checked={dark}
      aria-label="Switch to light/dark theme"
      onClick={onClick}
    >
      <svg className="sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <span className="knob" />
    </button>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("work");
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [lenis, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-inner">
        <a className="logo" href="#top" aria-label="Hassan Jamshaid, back to top">
          HJ<span>.</span>
        </a>
        <Magnetic strength={0.18} className="links-wrap">
          <nav className="links" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={active === link.id ? "on" : undefined}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </Magnetic>
        <div className="nav-right">
          <Magnetic strength={0.35}>
            <ThemeToggle />
          </Magnetic>
          <Magnetic strength={0.28} className="talk">
            <a className="btn solid" href="#contact">
              Let’s talk ↗
            </a>
          </Magnetic>
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {open ? (
        <div className="menu-overlay">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={active === link.id ? "on" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a className="btn solid menu-cta" href="#contact" onClick={() => setOpen(false)}>
            Let’s talk ↗
          </a>
        </div>
      ) : null}
    </header>
  );
}
