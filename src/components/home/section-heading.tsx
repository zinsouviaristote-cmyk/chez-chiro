import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <p className={cn("eyebrow", tone === "dark" ? "text-brown" : "text-orange")}>{eyebrow}</p>
      <h2
        className={cn(
          "display mt-4 text-[2.6rem] sm:text-[3.2rem] md:text-[4.25rem]",
          tone === "dark" ? "text-brown" : "text-cream",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-5 text-[1.0625rem] leading-relaxed md:text-lg",
            align === "center" && "mx-auto",
            "max-w-2xl",
            tone === "dark" ? "text-muted" : "text-cream/75",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
