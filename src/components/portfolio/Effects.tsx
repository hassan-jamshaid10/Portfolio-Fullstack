"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function scrambleTo(target: Element, text: string, duration = 0.7) {
  const gsap = registerGsap();
  gsap.to(target, {
    duration,
    scrambleText: {
      text,
      chars: "upperCase",
      speed: 0.32,
      revealDelay: 0.15,
    },
  } as gsap.TweenVars);
}

export function Effects() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.querySelectorAll(".exp-row").forEach((row) => row.classList.add("is-drawn"));
      document.querySelector(".mail")?.classList.add("inview");
      return;
    }

    const gsap = registerGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-scramble]").forEach((el) => {
        const text = el.dataset.text || el.textContent || "";
        ScrollTrigger.create({
          trigger: el,
          start: "top 86%",
          once: true,
          onEnter: () => scrambleTo(el, text),
        });
      });

      gsap.fromTo(
        ".bigname",
        { xPercent: -56 },
        {
          xPercent: -42,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.to(".figure-scroll", {
        y: -80,
        scale: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".efig", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ".efig", start: "top 80%", once: true },
      });

      gsap.fromTo(
        ".about-portrait",
        { y: 18 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: ".efig",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".exp-row").forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 85%",
          once: true,
          onEnter: () => row.classList.add("is-drawn"),
        });
      });

      gsap.utils.toArray<HTMLElement>(".contact h2 .word span").forEach((word, index) => {
        gsap.from(word, {
          yPercent: 110,
          duration: 0.75,
          delay: index * 0.035,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact h2", start: "top 82%", once: true },
        });
      });

      const mail = document.querySelector(".mail");
      if (mail) {
        ScrollTrigger.create({
          trigger: mail,
          start: "top 88%",
          once: true,
          onEnter: () => mail.classList.add("inview"),
        });
      }

      gsap.from(".cameo", {
        x: 90,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact", start: "top 72%", once: true },
      });
    }, document.querySelector(".v2") ?? undefined);

    return () => ctx.revert();
  }, []);

  return null;
}
