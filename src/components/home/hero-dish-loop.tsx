"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { whenSettled } from "@/lib/when-settled";
import type { TextLoopProps } from "../motion-primitives/text-loop";

const EASE = [0.22, 1, 0.36, 1] as const;
const VARIANTS = {
  initial: { y: "30%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-30%", opacity: 0 },
};

/**
 * The rotating dish inside the hero headline.
 * - The server HTML shows the first dish, so the headline is complete at first paint.
 * - TextLoop (and Motion) load once the page has settled (see whenSettled).
 * - Every dish is laid out invisibly in the same grid cell: the slot is always as
 *   tall as the longest name, so a 1- or 2-line dish never moves anything. The
 *   visible dish sits at the bottom of the slot, so spare room ends up above the
 *   headline (over the photo), never inside it.
 * - Pauses off-screen; never rotates with prefers-reduced-motion.
 */
export function HeroDishLoop({ dishes }: { dishes: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [Loop, setLoop] = useState<ComponentType<TextLoopProps> | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const stop = whenSettled(() => {
      void import("../motion-primitives/text-loop").then((mod) => {
        if (!cancelled) setLoop(() => mod.TextLoop);
      });
    });
    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="grid [text-wrap:wrap]">
      {dishes.map((dish) => (
        <span key={dish} className="invisible col-start-1 row-start-1">
          {dish}
        </span>
      ))}
      <span className="col-start-1 row-start-1 self-end">
        {Loop ? (
          <Loop interval={2.6} trigger={inView} variants={VARIANTS} transition={{ duration: 0.5, ease: EASE }}>
            {dishes.map((dish) => (
              <span key={dish}>{dish}</span>
            ))}
          </Loop>
        ) : (
          dishes[0]
        )}
      </span>
    </span>
  );
}
