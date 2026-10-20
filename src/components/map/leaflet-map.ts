// Loaded on demand by <LazyMap /> (dynamic import), with Leaflet and its CSS:
// none of it is in the page's initial JavaScript or stylesheet.
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import logoMark from "@/assets/images/logo-mark.png";
import { LOCATION } from "@/lib/site";

export type MapMode = "full" | "preview";

/**
 * Mounts the OpenStreetMap map (free tiles, no API key) with the Chez Chiro pin.
 * - Never traps page scrolling: no scroll-wheel zoom; on touch screens a
 *   one-finger drag scrolls the page (dragging off, pinch-zoom on).
 * - "full": a click that is not a drag calls `onOpen` (Leaflet drops the click after a drag).
 * - "preview": static; the link laid over it does the opening.
 */
export function mountMap(el: HTMLElement, mode: MapMode, onOpen: () => void) {
  const full = mode === "full";
  const touch = window.matchMedia("(pointer: coarse)").matches;
  el.classList.add("cc-map");

  const map = L.map(el, {
    center: LOCATION.coords,
    zoom: full ? 15 : 13,
    minZoom: 11,
    maxZoom: 18,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    dragging: full && !touch,
    touchZoom: full,
    zoomControl: false,
    attributionControl: false,
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
  }).addTo(map);

  L.control
    .attribution({
      position: "bottomright",
      prefix: '<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>',
    })
    .addTo(map);

  if (full) {
    L.control.zoom({ position: "bottomleft", zoomInTitle: "Zoomer", zoomOutTitle: "Dézoomer" }).addTo(map);
    map.on("click", onOpen);
  }

  const size = full ? 56 : 44;
  L.marker(LOCATION.coords, {
    interactive: false,
    keyboard: false,
    icon: L.divIcon({
      className: "cc-pin",
      html: `<span class="cc-pin__badge"><img src="${logoMark.src}" alt="" width="${size - 14}" height="${size - 14}" /></span>`,
      iconSize: [size, size + 10],
      iconAnchor: [size / 2, size + 10],
    }),
  }).addTo(map);

  // The pin's tip marks the spot; shift the view so the whole pin looks centred.
  map.panBy([0, -(size + 10) / 2], { animate: false });

  return map;
}
