"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
import { Cursor } from "@/components/portfolio/Cursor";
import { Effects } from "@/components/portfolio/Effects";
import { prefersReducedMotion } from "@/lib/motion";

function ToastHost() {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    let hide = 0;
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setMessage(detail);
      setShow(true);
      window.clearTimeout(hide);
      hide = window.setTimeout(() => setShow(false), 1800);
    };
    window.addEventListener("hj-toast", onToast);
    return () => {
      window.removeEventListener("hj-toast", onToast);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}

function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: { offset: -12 },
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent("hj-toast", { detail: message }));
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <div className="v2">
        <a className="skip" href="#content">
          Skip to content
        </a>
        <div className="curtain" aria-hidden="true">
          <div className="curtain-top" />
          <div className="curtain-bot" />
          <span className="curtain-count" data-count>
            000
          </span>
        </div>
        {children}
        <Cursor />
        <Effects />
        <ToastHost />
        <LenisBridge />
      </div>
    </SmoothScroll>
  );
}

function LenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !prefersReducedMotion()) return;
    lenis.destroy();
  }, [lenis]);

  return null;
}
