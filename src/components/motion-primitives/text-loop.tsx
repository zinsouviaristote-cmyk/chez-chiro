"use client";
// motion-primitives — TextLoop (github.com/ibelick/motion-primitives).
// Same API as the original. Changes for this site:
// - `m` + LazyMotion(domAnimation) instead of `motion`, to keep the chunk small.
// - The wrapper is a block that may wrap (the original forces one line), so a
//   long dish name can break on narrow screens.
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import type { AnimatePresenceProps, Transition, Variants } from "motion/react";
import { Children, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TextLoopProps = {
  children: ReactNode[];
  className?: string;
  /** Seconds between two items. */
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  trigger?: boolean;
  mode?: AnimatePresenceProps["mode"];
};

export function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  trigger = true,
  mode = "popLayout",
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    if (!trigger) return;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, trigger]);

  const motionVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <span className={cn("relative block", className)}>
        <AnimatePresence mode={mode} initial={false}>
          <m.span
            key={currentIndex}
            className="block"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            variants={variants || motionVariants}
          >
            {items[currentIndex]}
          </m.span>
        </AnimatePresence>
      </span>
    </LazyMotion>
  );
}
