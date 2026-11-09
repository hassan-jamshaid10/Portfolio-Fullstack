"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const root = document.querySelector(".v2");
    let x = -100;
    let y = -100;
    let gx = x;
    let gy = y;
    let frame = 0;
    let shown = false;

    const onMove = (event: PointerEvent) => {
      if (!shown) {
        shown = true;
        root?.classList.add("has-cursor");
        document.documentElement.classList.add("has-cursor");
      }
      x = event.clientX;
      y = event.clientY;
      const card = (event.target as HTMLElement | null)?.closest?.("[data-cursor='view']");
      root?.classList.toggle("cursor-view", Boolean(card));
    };

    const loop = () => {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (glow.current) glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      if (label.current) label.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      root?.classList.remove("has-cursor", "cursor-view");
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={label} className="cursor-label" aria-hidden>
        View ↗
      </div>
    </>
  );
}
