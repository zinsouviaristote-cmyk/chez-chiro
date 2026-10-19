import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NBSP = " ";

/** 3500 → "3 500 FCFA" (non-breaking spaces so a price never wraps). */
export function formatFcfa(value: number) {
  const digits = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return `${digits}${NBSP}FCFA`;
}

/** 2_800_000 → "2,8 M", 562_523 → "562 K" (French compact style). */
export function formatCompact(value: number) {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${m.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}${NBSP}M`;
  }
  if (value >= 1_000) {
    return `${Math.floor(value / 1_000)}${NBSP}K`;
  }
  return value.toString();
}
