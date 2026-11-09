"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import {
  siApachekafka,
  siDocker,
  siFastapi,
  siFlutter,
  siGit,
  siJavascript,
  siLangchain,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSpringboot,
  siSupabase,
  siTailwindcss,
  siTrpc,
  siTypescript,
  siVuedotjs,
} from "simple-icons";
import { AWS_SMILE, AWS_WORDMARK } from "@/components/portfolio/awsMark";
import { JAVA_PATHS } from "@/components/portfolio/javaMark";

type IconMark = {
  name: string;
  path: string;
  hex: string;
  /** Near-black marks switch to the theme foreground so they stay visible. */
  ink?: boolean;
};

const marks: Array<IconMark | { name: string; kind: "java" | "aws" }> = [
  { name: "Java", kind: "java" },
  { name: "TypeScript", path: siTypescript.path, hex: siTypescript.hex },
  { name: "JavaScript", path: siJavascript.path, hex: siJavascript.hex },
  { name: "Python", path: siPython.path, hex: siPython.hex },
  { name: "Spring Boot", path: siSpringboot.path, hex: siSpringboot.hex },
  { name: "Next.js", path: siNextdotjs.path, hex: siNextdotjs.hex, ink: true },
  { name: "React", path: siReact.path, hex: siReact.hex },
  { name: "Vue", path: siVuedotjs.path, hex: siVuedotjs.hex },
  { name: "FastAPI", path: siFastapi.path, hex: siFastapi.hex },
  { name: "Node.js", path: siNodedotjs.path, hex: siNodedotjs.hex },
  { name: "PostgreSQL", path: siPostgresql.path, hex: siPostgresql.hex },
  { name: "MySQL", path: siMysql.path, hex: siMysql.hex },
  { name: "Supabase", path: siSupabase.path, hex: siSupabase.hex },
  { name: "Docker", path: siDocker.path, hex: siDocker.hex },
  { name: "AWS", kind: "aws" },
  { name: "Tailwind CSS", path: siTailwindcss.path, hex: siTailwindcss.hex },
  { name: "tRPC", path: siTrpc.path, hex: siTrpc.hex },
  { name: "Kafka", path: siApachekafka.path, hex: siApachekafka.hex, ink: true },
  { name: "Flutter", path: siFlutter.path, hex: siFlutter.hex },
  { name: "LangChain", path: siLangchain.path, hex: siLangchain.hex, ink: true },
  { name: "Git", path: siGit.path, hex: siGit.hex },
];

function MarkGlyph({ mark }: { mark: (typeof marks)[number] }) {
  if ("kind" in mark && mark.kind === "java") {
    return (
      <svg viewBox="0 0 128 128" aria-hidden="true">
        {JAVA_PATHS.map((part, index) => (
          <path key={index} fill={part.fill} d={part.d} />
        ))}
      </svg>
    );
  }
  if ("kind" in mark && mark.kind === "aws") {
    return (
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <path fill="currentColor" d={AWS_WORDMARK} />
        <path fill="#f90" d={AWS_SMILE} />
      </svg>
    );
  }
  if (!("path" in mark)) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill={mark.ink ? "currentColor" : `#${mark.hex}`} d={mark.path} />
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

  return (
    <div className="marquee" aria-label="Technologies">
      <div className="marquee-track" ref={track}>
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {marks.map((mark) => (
              <span
                className={`brand${"ink" in mark && mark.ink ? " is-ink" : ""}${
                  "kind" in mark && mark.kind === "aws" ? " is-ink" : ""
                }`}
                key={`${copy}-${mark.name}`}
                title={mark.name}
              >
                <MarkGlyph mark={mark} />
                <span>{mark.name}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
