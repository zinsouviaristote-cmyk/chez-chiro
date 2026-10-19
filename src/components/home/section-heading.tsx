import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";

/** Section title (heading scale) and optional lead. Always left-aligned, no eyebrow. */
export function SectionHeading({
  id,
  title,
  lead,
  tone = "dark",
  className,
}: {
  id?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <h2 id={id} className={cn("text-heading", tone === "dark" ? "text-ink" : "text-cream")}>
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-4 max-w-2xl text-subheading", tone === "dark" ? "text-ink-soft" : "text-cream/75")}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
