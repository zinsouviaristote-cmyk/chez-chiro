"use client";

import { useSyncExternalStore } from "react";
import { EVENT } from "@/lib/site";

// Midnight in Cotonou (UTC+1)
const START = new Date(`${EVENT.startISO}T00:00:00+01:00`).getTime();
const END = new Date(`${EVENT.endISO}T23:59:59+01:00`).getTime();

function daysLeft() {
  const now = Date.now();
  if (now > END) return -1;
  if (now >= START) return 0;
  return Math.ceil((START - now) / 86_400_000);
}

function subscribe(onChange: () => void) {
  const t = setInterval(onChange, 60_000);
  return () => clearInterval(t);
}

/** Days left before 4 Dec 2026, computed in the visitor's browser. */
export function Countdown() {
  const days = useSyncExternalStore(subscribe, daysLeft, () => null);

  if (days === null || days < 0) return null;

  return (
    <p className="mt-7 inline-flex items-center gap-3 rounded-full border border-cream/20 py-2 pl-2 pr-5 text-sm text-cream/85">
      <span className="display grid h-9 min-w-9 place-items-center rounded-full bg-cream px-2.5 text-lg text-brown">
        {days === 0 ? "J" : `J-${days}`}
      </span>
      {days === 0 ? "C'est maintenant !" : `Plus que ${days} jour${days > 1 ? "s" : ""}`}
    </p>
  );
}
