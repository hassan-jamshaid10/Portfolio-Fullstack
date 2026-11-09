"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { showToast } from "@/components/portfolio/Shell";
import { registerGsap } from "@/lib/gsap";
import { copyText, hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { site } from "@/content/site";

const figureBlur =
  "data:image/webp;base64,UklGRnYBAABXRUJQVlA4WAoAAAAQAAAAFwAAHwAAQUxQSNAAAAABgDLb1rJ1SM/ngkNyh0ZzT+7W3V0jiSGRGKJkp7l0fsM3NOZLuDunPM+9950hIiZA/V9nxeJYlhW+fQAPhRaMQ38MkW0YECsbMtXKykz9sphbLRApU1XasrJyHcBVthVrAHDdESpq+NWA1/2JKE7i6g+Y24yVD7CDVBaET9S8JECdSo6IsGfJAjEHaTNxLvmONsV+S86UuR3STqJRchdKRF3j/ZLxU6fo6DT3LOPNxlBK7TOQwgr/4HSzcsBdYs2wLlh7rE8/J4g/AD9/Gso1VlA4IIAAAADQBACdASoYACAAPu1ip04ppSMiMBgMATAdiWUAzYXcAHhsUWbwtl+1rQXbXcmAAAD+9CUo92NwEVmqAImkp2ZQpZZmxnP/4qd7NB63bRKm6pYs2p2dz8z/qKJAPTNKcS1N0w0FHyupVTYB+9xTc8OEULWczg59jYLD/lUoVaAAAA==";

function SplitName({ text, outline = false }: { text: string; outline?: boolean }) {
  return (
    <span className={outline ? "name-line name-outline" : "name-line"}>
      {text.split("").map((char, index) => (
        <span className="char-mask" key={`${char}-${index}`}>
          <span className="name-char">{char}</span>
        </span>
      ))}
    </span>
  );
}

async function onEmailClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const ok = await copyText(site.email);
  showToast(ok ? "Email copied" : site.email);
}

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove("is-intro");
      root.classList.add("intro-done");
      return;
    }

    const gsap = registerGsap();
    const count = { n: 0 };
    const countEl = document.querySelector<HTMLElement>("[data-count]");
    const lead = document.querySelector(".lead");

    const tl = gsap.timeline({
      onComplete: () => {
        root.classList.remove("is-intro");
        root.classList.add("intro-done");
        document.querySelector(".idcard")?.classList.add("power");
      },
    });

    tl.set(".name-char", { yPercent: 115 }, 0);
    tl.set(".lead, .sub, .ctas, .contactline", { autoAlpha: 0 }, 0);
    tl.to(count, {
      n: 100,
      duration: 0.72,
      ease: "none",
      onUpdate: () => {
        if (countEl) countEl.textContent = String(Math.round(count.n)).padStart(3, "0");
      },
    });
    tl.to(".curtain-count", { autoAlpha: 0, duration: 0.18 }, "-=0.05");
    tl.to(".curtain-top", { scaleY: 0, duration: 0.55, ease: "power4.inOut" }, "<");
    tl.to(".curtain-bot", { scaleY: 0, duration: 0.55, ease: "power4.inOut" }, "<");
    tl.set([".hero-l", ".nav", ".figure-tilt", ".scrollhint"], { autoAlpha: 1 }, "-=0.28");
    tl.to(".name-char", { yPercent: 0, duration: 0.78, stagger: 0.04, ease: "power4.out" }, "<");
    tl.fromTo(
      ".name-outline",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "power3.inOut" },
      "<0.12",
    );
    if (lead) {
      tl.to(
        lead,
        {
          autoAlpha: 1,
          duration: 0.9,
          scrambleText: {
            text: site.hero.headline,
            chars: "upperCase",
            revealDelay: 0.2,
            speed: 0.35,
          },
        } as gsap.TweenVars,
        "-=0.35",
      );
    }
    tl.to(".sub", { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.45");
    tl.fromTo(
      ".figure-tilt",
      { y: 40, autoAlpha: 0, filter: "blur(12px)" },
      { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
      "-=0.7",
    );
    tl.to([".ctas", ".contactline", ".scrollhint"], { autoAlpha: 1, duration: 0.45, stagger: 0.08 }, "-=0.35");

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const root = stage.current;
    if (!root || !hasFinePointer() || prefersReducedMotion()) return;

    const tilt = root.querySelector<HTMLElement>(".figure-tilt");
    const rings = root.querySelector<HTMLElement>(".rings");
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    let running = true;
    let visible = true;

    const onMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      cx = Math.max(-0.65, Math.min(0.65, (event.clientX - bounds.left) / bounds.width - 0.5));
      cy = Math.max(-0.65, Math.min(0.65, (event.clientY - bounds.top) / bounds.height - 0.5));
    };

    const loop = () => {
      if (!running) return;
      if (visible) {
        tx += (cx - tx) * 0.08;
        ty += (cy - ty) * 0.08;
        if (tilt) {
          tilt.style.transform = `rotateY(${tx * 16}deg) rotateX(${ty * -10}deg) translate3d(${tx * 14}px, ${ty * 8}px, 0)`;
        }
        if (rings) {
          rings.style.transform = `translate3d(${tx * 26}px, ${ty * 16}px, 0)`;
        }
      }
      frame = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    });
    observer.observe(root);
    window.addEventListener("pointermove", onMove, { passive: true });
    const start = window.setTimeout(() => {
      frame = requestAnimationFrame(loop);
    }, 2100);

    return () => {
      running = false;
      window.clearTimeout(start);
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <header className="hero" id="top">
      <div className="gridbg" />
      <div className="bigname" aria-hidden="true">
        JAMSHAID
      </div>
      <div className="hero-l">
        <h1 className="name">
          <span className="sr-only">Hassan Jamshaid.</span>
          <span aria-hidden="true">
            <SplitName text="Hassan" />
            <span className="name-row">
              <SplitName text="Jamshaid" outline />
              <span className="accent-dot">.</span>
            </span>
          </span>
        </h1>
        <p className="lead">{site.hero.headline}</p>
        <p className="sub">{site.hero.support}</p>
        <div className="ctas">
          <a className="btn solid" href="#work">
            See selected work →
          </a>
          <a className="btn ghost" href={site.resumeUrl} download>
            Download resume
          </a>
        </div>
        <div className="contactline">
          <div>
            <small>EMAIL</small>
            <a href={`mailto:${site.email}`} onClick={onEmailClick}>
              {site.email}
            </a>
          </div>
          <div>
            <small>PHONE</small>
            <a href={site.phoneHref}>{site.phone}</a>
          </div>
          <div>
            <small>ROLE</small>
            {site.role}
          </div>
        </div>
      </div>

      <div className="figure-scroll" ref={stage}>
        <div className="hero-stage">
          <div className="rings" aria-hidden="true">
            <div className="ring r2" />
            <div className="ring r1">
              <span className="orbit">
                <span className="sat" />
              </span>
            </div>
          </div>
          <div className="floor" aria-hidden="true" />
          <div className="figure-tilt">
            <div className="figure-breathe">
              <Image
                className="figure-img"
                src="/media/hassan-figure.webp"
                alt="Stylized portrait of Hassan Jamshaid in a black suit, arms crossed"
                width={864}
                height={1152}
                preload
                quality={80}
                sizes="(max-width: 980px) 90vw, 620px"
                placeholder="blur"
                blurDataURL={figureBlur}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="scrollhint">
        <i />
        <div className="mono">Scroll</div>
      </div>
    </header>
  );
}
