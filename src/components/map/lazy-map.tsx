"use client";

import { useEffect, useRef, useState } from "react";
import { LOCATION } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, MapPinIcon } from "../icons";
import type { MapMode } from "./leaflet-map";

const openListing = () => window.open(LOCATION.mapsUrl, "_blank", "noopener");

/**
 * The Chez Chiro map (Leaflet + OpenStreetMap), loaded when it comes near
 * the viewport. Until then, and without JavaScript, a flat placeholder shows
 * the address. Both modes open the Google Maps listing in a new tab:
 * - "full": a click (not a drag) anywhere on the map; a label inside says so.
 * - "preview": a small static map under a link (footer).
 */
export function LazyMap({ mode, className }: { mode: MapMode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  // Touch screen or mouse: decided once the map loads; CSS media queries until then.
  const [touch, setTouch] = useState<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let map: { remove(): void } | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        void import("./leaflet-map").then(({ mountMap }) => {
          if (cancelled) return;
          map = mountMap(el, mode, openListing);
          setTouch(window.matchMedia("(pointer: coarse)").matches);
          setReady(true);
        });
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      map?.remove();
    };
  }, [mode]);

  return (
    <div className={cn("relative isolate overflow-hidden rounded-lg bg-surface", className)}>
      <div ref={ref} className="absolute inset-0" />

      {!ready && (
        <div aria-hidden className="absolute inset-0 grid place-items-center">
          <span className="flex flex-col items-center gap-2 text-ink-soft">
            <MapPinIcon size={mode === "full" ? 32 : 22} className="text-orange" />
            {mode === "full" && <span className="text-small font-bold text-ink">{LOCATION.label}</span>}
          </span>
        </div>
      )}

      {mode === "full" ? (
        <a
          href={LOCATION.mapsUrl}
          target="_blank"
          rel="noopener"
          className="absolute left-3 top-3 z-[1100] inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-cream px-3.5 text-small font-bold text-ink transition-colors duration-200 hover:bg-surface"
        >
          {touch === null ? (
            <>
              <span className="pointer-coarse:hidden">Cliquez sur la carte pour ouvrir Google Maps</span>
              <span className="hidden pointer-coarse:inline">Touchez la carte pour ouvrir Google Maps</span>
            </>
          ) : (
            <span>{touch ? "Touchez" : "Cliquez sur"} la carte pour ouvrir Google Maps</span>
          )}
          <ArrowUpRightIcon size={14} />
        </a>
      ) : (
        <a
          href={LOCATION.mapsUrl}
          target="_blank"
          rel="noopener"
          aria-label={`Restaurant Chez Chiro, ${LOCATION.label} : ouvrir la fiche Google Maps`}
          className="absolute inset-0 z-[500] rounded-lg"
        />
      )}
    </div>
  );
}
