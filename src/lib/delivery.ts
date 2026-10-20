import { AREA_ALIASES, DELIVERY_ZONES, type DeliveryZone } from "./site";

export type Area = { name: string; zone: DeliveryZone; keys: string[] };

/** "Hêvié" → "hevie", "Abomey-Calavi" → "abomey calavi": no accents, no case, no punctuation. */
export function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Every neighbourhood of the delivery zones, with its zone and search keys (name + poster spellings). */
export const AREAS: Area[] = DELIVERY_ZONES.flatMap((zone) =>
  zone.areas.map((name) => ({
    name,
    zone,
    keys: [name, ...(AREA_ALIASES[name] ?? [])].map(normalize),
  })),
).sort((a, b) => a.name.localeCompare(b.name, "fr"));

/** Matches by name start first, then by word start, then anywhere. */
export function searchAreas(query: string): Area[] {
  const q = normalize(query);
  if (!q) return [];
  const rank = (area: Area) => {
    if (area.keys.some((k) => k.startsWith(q))) return 0;
    if (area.keys.some((k) => k.split(" ").some((word) => word.startsWith(q)))) return 1;
    if (area.keys.some((k) => k.includes(q))) return 2;
    return -1;
  };
  return AREAS.map((area) => ({ area, r: rank(area) }))
    .filter(({ r }) => r >= 0)
    .sort((a, b) => a.r - b.r)
    .map(({ area }) => area);
}

/** "Togba (zone B)": the neighbourhood as written in the WhatsApp message. */
export const areaLabel = (area: Area) => `${area.name} (zone ${area.zone.zone})`;
