// Scroll reveals, inspired by the motion-primitives InView / AnimatedGroup
// pattern but run by CSS transitions and one shared IntersectionObserver
// (<RevealObserver />): no per-element JavaScript, nothing on the critical path.
import type { CSSProperties, ReactNode } from "react";

type Tag = "div" | "section" | "ul" | "ol" | "li" | "article" | "p" | "span" | "figure" | "header";

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
  id?: string;
};

export function Reveal({ children, as: Comp = "div", className, delay = 0, id }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Comp id={id} data-reveal="" className={className} style={style}>
      {children}
    </Comp>
  );
}

type StaggerProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /** Seconds between two items. */
  stagger?: number;
};

/** Children rendered with <StaggerItem> appear one after another. */
export function Stagger({ children, as: Comp = "div", className, stagger = 0.09 }: StaggerProps) {
  return (
    <Comp data-stagger="" className={className} style={{ "--stagger": `${stagger}s` } as CSSProperties}>
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  as: Comp = "div",
  className,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  return (
    <Comp data-item="" className={className}>
      {children}
    </Comp>
  );
}
