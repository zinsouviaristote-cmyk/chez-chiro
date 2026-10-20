"use client";
// AnimatedBackground with the motion-primitives API (children carry `data-id`,
// one background slides to the active child), run by a CSS transform
// transition instead of Motion's layoutId: no animation library to load.
import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ItemProps = { "data-id": string; onClick?: () => void };

export function AnimatedBackground({
  children,
  value,
  onValueChange,
  className,
  containerClassName,
}: {
  children: ReactElement<ItemProps>[];
  /** `data-id` of the active child, or null for none. */
  value: string | null;
  onValueChange: (id: string) => void;
  /** Classes of the sliding background (colour, radius). */
  className?: string;
  containerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;
    const measure = () => {
      const el = value ? container.querySelector<HTMLElement>(`[data-id="${CSS.escape(value)}"]`) : null;
      setBox(el ? { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight } : null);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={cn("relative isolate", containerClassName)}>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 -z-10 transition-[transform,opacity] duration-300 ease-[var(--ease-out-soft)]",
          box ? "opacity-100" : "opacity-0",
          className,
        )}
        style={box ? { width: box.w, height: box.h, transform: `translate3d(${box.x}px, ${box.y}px, 0)` } : undefined}
      />
      {Children.map(children, (child): ReactNode => {
        if (!isValidElement<ItemProps>(child)) return child;
        const id = child.props["data-id"];
        return cloneElement(child, {
          "data-checked": id === value ? "true" : "false",
          onClick: () => {
            child.props.onClick?.();
            onValueChange(id);
          },
        } as Partial<ItemProps>);
      })}
    </div>
  );
}
