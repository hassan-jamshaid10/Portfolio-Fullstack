"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { site } from "@/content/site";

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useLenis((lenis) => {
    const node = track.current;
    if (!node) return;
    const rate = 1 + Math.min(Math.abs(lenis.velocity) / 30, 2.2);
    node.getAnimations().forEach((animation) => {
      animation.playbackRate = rate;
    });
  });

  const items = site.marquee;

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={track}>
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {items.map((item) => (
              <span key={`${copy}-${item}`}>
                <b>{item}</b>
                <em>✦</em>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
