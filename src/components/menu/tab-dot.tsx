"use client";

import { useLayoutEffect, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

/**
 * Small orange dot that glides under the active text tab (CSS transition).
 * `container` is the positioned element holding the tabs.
 */
export function TabDot({
  container,
  activeSelector,
  className,
}: {
  container: RefObject<HTMLElement | null>;
  activeSelector: string;
  className?: string;
}) {
  const [x, setX] = useState<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = container.current?.querySelector<HTMLElement>(activeSelector);
      if (el) setX(el.offsetLeft + el.offsetWidth / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [container, activeSelector]);

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 size-2 rounded-full bg-orange transition-transform duration-500 ease-[var(--ease-out-soft)]",
        x === null && "opacity-0",
        className,
      )}
      style={{ transform: `translateX(${(x ?? 0) - 4}px)` }}
    />
  );
}
