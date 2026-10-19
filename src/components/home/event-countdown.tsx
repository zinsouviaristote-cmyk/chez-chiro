"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ComponentType } from "react";
import { EVENT } from "@/lib/site";
import type { SlidingNumberProps } from "../motion-primitives/sliding-number";

// Midnight in Cotonou (UTC+1)
const START = new Date(`${EVENT.startISO}T00:00:00+01:00`).getTime();
const END = new Date(`${EVENT.endISO}T23:59:59+01:00`).getTime();
const DAY = 86_400_000;
const HOUR = 3_600_000;

/** "days:hours" before the event, "live" during it, "over" after. A string keeps the snapshot stable. */
function snapshot() {
  const now = Date.now();
  if (now > END) return "over";
  if (now >= START) return "live";
  const left = START - now;
  return `${Math.floor(left / DAY)}:${Math.floor((left % DAY) / HOUR)}`;
}

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 30_000);
  return () => clearInterval(timer);
}

type Phase = "static" | "armed" | "rolling";

/**
 * Days and hours before La Manifestation, computed in the visitor's browser.
 * Plain digits first; SlidingNumber (Motion) loads as the section approaches,
 * and the digits roll once from 00 when the countdown comes into view.
 */
export function EventCountdown() {
  const state = useSyncExternalStore(subscribe, snapshot, () => null);
  const ref = useRef<HTMLDivElement>(null);
  const [Sliding, setSliding] = useState<ComponentType<SlidingNumberProps> | null>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;

    const visible = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        visible.disconnect();
        setPhase((p) => (p === "armed" ? "rolling" : p));
      },
      { threshold: 0.6 },
    );

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        void import("../motion-primitives/sliding-number").then((mod) => {
          if (cancelled) return;
          setSliding(() => mod.SlidingNumber);
          // Already on screen: show the real value without the roll.
          const onScreen = el.getBoundingClientRect().top < window.innerHeight * 0.85;
          setPhase(onScreen ? "rolling" : "armed");
          if (!onScreen) visible.observe(el);
        });
      },
      { rootMargin: "0px 0px 600px 0px" },
    );
    near.observe(el);

    return () => {
      cancelled = true;
      near.disconnect();
      visible.disconnect();
    };
  }, []);

  if (state === "over") return null;

  if (state === "live") {
    return (
      <p className="text-heading-sm text-ink" ref={ref}>
        La Manifestation a commencé.
      </p>
    );
  }

  const [days, hours] = state ? state.split(":").map(Number) : [null, null];
  const cells = [
    { value: days, label: days === 1 ? "jour" : "jours" },
    { value: hours, label: hours === 1 ? "heure" : "heures" },
  ];

  return (
    <div ref={ref}>
      <p className="sr-only">
        {days === null ? "" : `Plus que ${days} jours et ${hours} heures avant La Manifestation.`}
      </p>
      <div aria-hidden className="flex items-end gap-8">
        {cells.map(({ value, label }) => (
          <div key={label}>
            <p className="text-display leading-none tabular-nums text-ink">
              {value === null ? (
                "––"
              ) : Sliding && phase !== "static" ? (
                <Sliding value={phase === "rolling" ? value : 0} padStart />
              ) : (
                String(value).padStart(2, "0")
              )}
            </p>
            <p className="mt-2 text-small text-ink-soft">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
