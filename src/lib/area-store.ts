"use client";

import { useSyncExternalStore } from "react";
import type { Area } from "./delivery";

// The neighbourhood picked in the delivery finder, shared with the order
// buttons at the end of "Infos pratiques" so their WhatsApp message includes it,
// and with the order drawer of /menu, which starts from it.
let selected: Area | undefined;
const listeners = new Set<() => void>();

export function setSelectedArea(area: Area | undefined) {
  selected = area;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSelectedArea() {
  return useSyncExternalStore(
    subscribe,
    () => selected,
    () => undefined,
  );
}
