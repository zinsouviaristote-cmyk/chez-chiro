"use client";
// Adapted from motion-primitives (ibelick/motion-primitives) — AnimatedNumber:
// a spring-animated number driven by Motion. Changes for this site:
// - The server HTML renders the final value (crawlers and no-JS visitors never
//   see "0", a bug the old site had with its animated counters).
// - Motion is imported only when the number scrolls into view, so it never
//   weighs on the first paint.
// - Respects prefers-reduced-motion.
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  /** Fixed number of decimals, French formatting (2,8 · 562 523). */
  decimals?: number;
  /** Spring duration, in seconds. */
  duration?: number;
};

export function AnimatedNumber({ value, className, decimals = 0, duration = 2.2 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) =>
    n.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fmt = (n: number) =>
      n.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

    let cancelled = false;
    let stop: (() => void) | undefined;
    el.textContent = fmt(0);

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const { animate } = await import("motion");
        if (cancelled) return;
        const controls = animate(0, value, {
          type: "spring",
          bounce: 0,
          duration,
          onUpdate: (latest) => {
            el.textContent = fmt(latest);
          },
        });
        stop = () => controls.stop();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      stop?.();
    };
  }, [value, decimals, duration]);

  return (
    <span className={cn("tabular-nums", className)}>
      <span ref={ref} aria-hidden>
        {format(value)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
