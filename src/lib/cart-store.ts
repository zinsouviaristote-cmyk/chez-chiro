"use client";

import { useSyncExternalStore } from "react";
import { dishById } from "./menu";

// The multi-dish order on /menu, kept in localStorage (no backend, no account):
// the dishes { dishId: quantity } and the delivery details of the order drawer.
// Every read and write is guarded: private windows and blocked storage simply
// give an order that lasts for the visit.
export type Cart = Readonly<Record<string, number>>;
export type Delivery = "standard" | "premium";
export type OrderDetails = Readonly<{ quartier: string; livraison: Delivery; precisions: string }>;

const MAX_PER_DISH = 20;
const EMPTY: Cart = {};
const NO_DETAILS: OrderDetails = { quartier: "", livraison: "standard", precisions: "" };

function sanitizeCart(value: unknown): Cart {
  if (!value || typeof value !== "object") return EMPTY;
  const out: Record<string, number> = {};
  for (const [id, qty] of Object.entries(value)) {
    if (typeof qty === "number" && qty >= 1 && dishById(id)) out[id] = Math.min(Math.floor(qty), MAX_PER_DISH);
  }
  return out;
}

function sanitizeDetails(value: unknown): OrderDetails {
  if (!value || typeof value !== "object") return NO_DETAILS;
  const { quartier, livraison, precisions } = value as Record<string, unknown>;
  return {
    quartier: typeof quartier === "string" ? quartier.slice(0, 80) : "",
    livraison: livraison === "premium" ? "premium" : "standard",
    precisions: typeof precisions === "string" ? precisions.slice(0, 500) : "",
  };
}

/** One value kept in localStorage under `key`, the same in every component and every tab. */
function persisted<T>(key: string, sanitize: (value: unknown) => T, empty: T) {
  let value = empty;
  let loaded = false;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());

  function read() {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? sanitize(JSON.parse(raw)) : empty;
    } catch {
      return empty;
    }
  }

  function get() {
    if (!loaded && typeof window !== "undefined") {
      loaded = true;
      value = read();
      window.addEventListener("storage", (e) => {
        if (e.key !== key) return;
        value = read();
        notify();
      });
    }
    return value;
  }

  function set(next: T) {
    value = next;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Storage unavailable: the order still works for this visit.
    }
    notify();
  }

  function subscribe(listener: () => void) {
    get();
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  return { get, set, subscribe };
}

const cart = persisted("chezchiro:commande:v1", sanitizeCart, EMPTY);
const details = persisted("chezchiro:commande:livraison:v1", sanitizeDetails, NO_DETAILS);

export function setQuantity(id: string, qty: number) {
  const next: Record<string, number> = { ...cart.get() };
  if (qty <= 0) delete next[id];
  else next[id] = Math.min(qty, MAX_PER_DISH);
  cart.set(next);
}

export const addOne = (id: string) => setQuantity(id, (cart.get()[id] ?? 0) + 1);
export const removeOne = (id: string) => setQuantity(id, (cart.get()[id] ?? 0) - 1);

/** Empties the dishes and their précisions; the neighbourhood and delivery choice stay for the next order. */
export function clearCart() {
  cart.set(EMPTY);
  details.set({ ...details.get(), precisions: "" });
}

export const setOrderDetails = (patch: Partial<OrderDetails>) => details.set({ ...details.get(), ...patch });

/** The order; empty during server rendering and hydration, filled right after. */
export function useCart() {
  return useSyncExternalStore(cart.subscribe, cart.get, () => EMPTY);
}

/** Neighbourhood, delivery option and précisions of the order (same timing as useCart). */
export function useOrderDetails() {
  return useSyncExternalStore(details.subscribe, details.get, () => NO_DETAILS);
}
