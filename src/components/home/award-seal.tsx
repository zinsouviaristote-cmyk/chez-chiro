import { cn } from "@/lib/utils";
import { TrophyIcon } from "../icons";

/**
 * Round "Barbecue d'Or 2022" seal with slowly rotating ring text
 * (pure SVG + CSS: no JS, honours prefers-reduced-motion).
 */
export function AwardSeal({ className }: { className?: string }) {
  const text = "BARBECUE D'OR 2022 · FESTIZIK COTONOU · ";
  return (
    <div
      className={cn(
        "relative grid size-[7.25rem] place-items-center rounded-full bg-brown text-cream shadow-[var(--shadow-lift)] md:size-[8.5rem]",
        className,
      )}
      role="img"
      aria-label="Barbecue d'Or 2022, Festizik Cotonou Barbecue"
    >
      <svg viewBox="0 0 120 120" className="absolute size-full animate-spin-slow motion-reduce:animate-none" aria-hidden>
        <defs>
          <path id="seal-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <text className="fill-cream text-[9px] font-bold" textLength="279" lengthAdjust="spacing">
          <textPath href="#seal-circle" textLength="279" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="relative grid size-12 place-items-center rounded-full bg-orange text-brown md:size-14">
        <TrophyIcon size={24} />
      </span>
    </div>
  );
}
