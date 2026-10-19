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
 * The rotating word inside the hero headline (its own centred line).
 * - The server HTML shows the first word, so the headline is complete at first paint.
 * - TextLoop (and Motion) load once the page has settled (see whenSettled).
 * - Every word is laid out invisibly in the same grid cell, so the line keeps
 *   the size of the longest word and the centred layout never jumps.
 * - Pauses off-screen; never rotates with prefers-reduced-motion.
 */
export function HeroWordLoop({ words }: { words: string[] }) {
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
    <span ref={ref} className="grid justify-items-center whitespace-nowrap">
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <span data-loop className="col-start-1 row-start-1 w-full">
        {Loop ? (
          <Loop interval={2.6} trigger={inView} variants={VARIANTS} transition={{ duration: 0.5, ease: EASE }}>
            {words.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </Loop>
        ) : (
          words[0]
        )}
      </span>
    </span>
  );
}
