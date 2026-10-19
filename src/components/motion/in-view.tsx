// InView and AnimatedGroup, with the same roles and presets as the
// motion-primitives components, but run by CSS transitions and one shared
// IntersectionObserver (<RevealObserver />). Sections stay Server Components
// and ship no JavaScript for their reveals; reduced motion shows everything.
import type { CSSProperties, ReactNode } from "react";

type Tag = "div" | "section" | "ul" | "ol" | "li" | "article" | "p" | "span" | "figure" | "header" | "dl";

/** "slide": rise 20px and fade in. "fade": opacity only. */
type Preset = "slide" | "fade";

type InViewProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  preset?: Preset;
  /** Seconds before the reveal starts. */
  delay?: number;
  id?: string;
};

/** Reveals its content once, when it scrolls into view. */
export function InView({ children, as: Comp = "div", className, preset = "slide", delay = 0, id }: InViewProps) {
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Comp id={id} data-reveal="" data-preset={preset} className={className} style={style}>
      {children}
    </Comp>
  );
}

type AnimatedGroupProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  preset?: Preset;
  /** Seconds between two children. */
  stagger?: number;
  id?: string;
};

/** Reveals each direct child in turn when the group scrolls into view. */
export function AnimatedGroup({
  children,
  as: Comp = "div",
  className,
  preset = "slide",
  stagger = 0.08,
  id,
}: AnimatedGroupProps) {
  return (
    <Comp
      id={id}
      data-group=""
      data-preset={preset}
      className={className}
      style={{ "--stagger": `${stagger}s` } as CSSProperties}
    >
      {children}
    </Comp>
  );
}
