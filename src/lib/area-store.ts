"use client";

import { useSyncExternalStore } from "react";

// The neighbourhood picked in the delivery finder, shared with the order
// buttons at the end of "Infos pratiques" so their WhatsApp message includes it.
let selected: string | undefined;
const listeners = new Set<() => void>();

export function setSelectedArea(label: string | undefined) {
  selected = label;
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
