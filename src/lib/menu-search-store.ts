"use client";

import { useSyncExternalStore } from "react";

// The "Rechercher un plat" query, shared by the field in the store header
// and the item list below it.
let query = "";
const listeners = new Set<() => void>();

export function setMenuQuery(value: string) {
  query = value;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useMenuQuery() {
  return useSyncExternalStore(
    subscribe,
    () => query,
    () => "",
  );
}
