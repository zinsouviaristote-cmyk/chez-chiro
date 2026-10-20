"use client";

import { useSyncExternalStore } from "react";
import { dishById } from "./menu";

// The multi-dish order on /menu: { dishId: quantity }, kept in localStorage
// (no backend, no account). Every read and write is guarded: private windows
// and blocked storage simply give an order that lasts for the visit.
export type Cart = Readonly<Record<string, number>>;

const KEY = "chezchiro:commande:v1";
const MAX_PER_DISH = 20;
const EMPTY: Cart = {};

let cart: Cart = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function sanitize(value: unknown): Cart {
  if (!value || typeof value !== "object") return EMPTY;
  const out: Record<string, number> = {};
  for (const [id, qty] of Object.entries(value)) {
    if (typeof qty === "number" && qty >= 1 && dishById(id)) out[id] = Math.min(Math.floor(qty), MAX_PER_DISH);
  }
  return out;
}

function read() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  cart = read();
  // Same order across tabs.
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    cart = read();
    listeners.forEach((listener) => listener());
  });
}

function commit(next: Cart) {
  cart = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable: the order still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function setQuantity(id: string, qty: number) {
  load();
  const next: Record<string, number> = { ...cart };
  if (qty <= 0) delete next[id];
  else next[id] = Math.min(qty, MAX_PER_DISH);
  commit(next);
}

export const addOne = (id: string) => setQuantity(id, (getCart()[id] ?? 0) + 1);
export const removeOne = (id: string) => setQuantity(id, (getCart()[id] ?? 0) - 1);
export const clearCart = () => commit(EMPTY);

function getCart() {
  load();
  return cart;
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The order; empty during server rendering and hydration, filled right after. */
export function useCart() {
  return useSyncExternalStore(subscribe, getCart, () => EMPTY);
}
