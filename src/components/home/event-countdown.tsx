"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ComponentType } from "react";
import { EVENT } from "@/lib/site";
import type { SlidingNumberProps } from "../motion-primitives/sliding-number";

// Calendar days in Cotonou (UTC+1, no daylight saving). Days only: the poster
// gives no opening time, so hours would imply one we don't know.
const DAY = 86_400_000;
const UTC_OFFSET = 3_600_000;
const dayNumber = (ms: number) => Math.floor((ms + UTC_OFFSET) / DAY);
const FIRST_DAY = dayNumber(Date.parse(`${EVENT.startISO}T12:00:00+01:00`));
const LAST_DAY = dayNumber(Date.parse(`${EVENT.endISO}T12:00:00+01:00`));

/** Days left before the first day ("d:45"), the current day during it ("live:2"), "over" after. */
function snapshot() {
  const today = dayNumber(Date.now());
  if (today > LAST_DAY) return "over";
  if (today >= FIRST_DAY) return `live:${today - FIRST_DAY + 1}`;
  return `d:${FIRST_DAY - today}`;
}

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 60_000);
  return () => clearInterval(timer);
}

type Phase = "static" | "armed" | "rolling";

/**
 * Days before La Manifestation, computed in the visitor's browser.
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

  if (state?.startsWith("live:")) {
    return (
      <p ref={ref} className="text-heading-sm text-ink">
        Jour {state.slice(5)} sur 3
      </p>
    );
  }

  const days = state ? Number(state.slice(2)) : null;
  const label = `${days === 1 ? "jour" : "jours"} avant le 4 décembre`;

  return (
    <div ref={ref}>
      <p className="sr-only">{days === null ? "" : `Plus que ${days} ${label}.`}</p>
      <div aria-hidden className="flex items-end gap-4">
        <p className="text-display leading-none tabular-nums text-ink">
          {days === null ? (
            "––"
          ) : Sliding && phase !== "static" ? (
            <Sliding value={phase === "rolling" ? days : 0} padStart />
          ) : (
            String(days).padStart(2, "0")
          )}
        </p>
        <p className="pb-1 text-subheading text-ink-soft">{label}</p>
      </div>
    </div>
  );
}
