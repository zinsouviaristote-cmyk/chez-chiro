import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom type scale (globals.css), otherwise it reads
// `text-heading` as a colour and drops it when `text-ink` comes after it.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "heading", "heading-sm", "subheading", "body", "small", "caption"],
    },
  },
});

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

/** "Hêvié" → "hevie", "Abomey-Calavi" → "abomey calavi": no accents, no case, no punctuation. */
export function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
