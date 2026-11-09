"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import {
  siDocker,
  siFastapi,
  siGooglebigquery,
  siLangchain,
  siNextdotjs,
  siPostgresql,
  siReact,
  siSpringboot,
  siTrpc,
  siVuedotjs,
} from "simple-icons";
import { AWS_SMILE, AWS_WORDMARK } from "@/components/portfolio/awsMark";
import { site } from "@/content/site";

type Glyph = {
  path?: string;
  hex?: string;
  ink?: boolean;
  aws?: boolean;
};

const glyphs: Record<string, Glyph> = {
  "Next.js": { path: siNextdotjs.path, hex: siNextdotjs.hex, ink: true },
  "Spring Boot": { path: siSpringboot.path, hex: siSpringboot.hex },
  FastAPI: { path: siFastapi.path, hex: siFastapi.hex },
  tRPC: { path: siTrpc.path, hex: siTrpc.hex },
  PostgreSQL: { path: siPostgresql.path, hex: siPostgresql.hex },
  BigQuery: { path: siGooglebigquery.path, hex: siGooglebigquery.hex },
  LangChain: { path: siLangchain.path, hex: siLangchain.hex, ink: true },
  "Vue 3": { path: siVuedotjs.path, hex: siVuedotjs.hex },
  "React Native": { path: siReact.path, hex: siReact.hex },
  Docker: { path: siDocker.path, hex: siDocker.hex },
  AWS: { aws: true, ink: true },
};

function ChipIcon({ name }: { name: string }) {
  const glyph = glyphs[name];
  if (!glyph) return null;
  if (glyph.aws) {
    return (
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <path fill="currentColor" d={AWS_WORDMARK} />
        <path fill="#f90" d={AWS_SMILE} />
      </svg>
    );
  }
  if (!glyph.path) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill={glyph.ink ? "currentColor" : `#${glyph.hex}`} d={glyph.path} />
    </svg>
  );
}

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
                <b className={glyphs[item]?.ink ? "is-ink" : undefined}>
                  <ChipIcon name={item} />
                  {item}
                </b>
                <em>✦</em>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
