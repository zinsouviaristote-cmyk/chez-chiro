"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets data-play="on" once, when the element is half on screen. CSS runs the
 * animation from there (see .chat-* in globals.css); nothing re-renders.
 */
export function PlayOnView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.play = "on";
        io.disconnect();
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
