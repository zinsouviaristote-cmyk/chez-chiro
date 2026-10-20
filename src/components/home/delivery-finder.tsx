"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { setSelectedArea } from "@/lib/area-store";
import { areaLabel, searchAreas, type Area } from "@/lib/delivery";
import { DELIVERY_ZONES, type DeliveryZone } from "@/lib/site";
import { cn, formatFcfa } from "@/lib/utils";
import { areaQuestionLink } from "@/lib/whatsapp";
import { CloseIcon, MapPinIcon, WhatsAppIcon } from "../icons";
import { AnimatedBackground } from "../ui/animated-background";

type Selection = { zone: DeliveryZone; area?: Area };

/**
 * Delivery fees by neighbourhood: a "Votre quartier" combobox (ARIA 1.2
 * pattern, accent-insensitive search over every neighbourhood of the zone
 * data), zone chips A–E to browse without typing, and the zone's standard and
 * premium price and time. Same data as the delivery poster, nothing added.
 */
export function DeliveryFinder() {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [selection, setSelection] = useState<Selection>({ zone: DELIVERY_ZONES[0] });

  const results = searchAreas(query);
  const typed = query.trim();
  const showList = open && typed.length > 0 && typed !== selection.area?.name;
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-opt-${i}`;

  function pick(area: Area) {
    setSelection({ zone: area.zone, area });
    setQuery(area.name);
    setOpen(false);
    setSelectedArea(areaLabel(area));
  }

  function browse(zone: DeliveryZone) {
    setSelection({ zone });
    setQuery("");
    setOpen(false);
    setSelectedArea(undefined);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && showList && results[active]) {
      e.preventDefault();
      pick(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const { zone, area } = selection;
  // Under the title: the zone's own precision, or, when browsing, its neighbourhoods.
  const detail = area ? zone.note : (zone.note ?? zone.areas.join(", "));

  return (
    <div className="rounded-lg bg-surface p-6 md:p-8">
      <h3 className="text-heading-sm text-ink">Frais de livraison</h3>

      <label htmlFor={`${id}-input`} className="mt-5 block text-small font-bold text-ink">
        Votre quartier
      </label>
      <div className="relative mt-2">
        <MapPinIcon size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="text"
          role="combobox"
          autoComplete="off"
          autoCapitalize="words"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="Ex. : Togba, Pahou, Glo"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={showList && results[active] ? optionId(active) : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className="h-14 w-full rounded-lg border border-ink/25 bg-cream pl-12 pr-12 text-body text-ink outline-none transition-colors duration-200 placeholder:text-ink-soft/80 hover:border-ink/50 focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-lg text-ink-soft transition-colors hover:text-ink"
            aria-label="Effacer le quartier"
          >
            <CloseIcon size={18} />
          </button>
        )}

        <div
          className={cn(
            "absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-line bg-cream",
            !showList && "hidden",
          )}
        >
          <ul id={listId} role="listbox" aria-label="Quartiers" className="max-h-72 overflow-y-auto py-1.5">
            {results.map((a, i) => (
              <li
                key={a.name}
                id={optionId(i)}
                role="option"
                aria-selected={i === active}
                // mousedown, not click: keeps the input focused (no blur before the pick)
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(a);
                }}
                onMouseMove={() => setActive(i)}
                className={cn(
                  "flex min-h-12 cursor-pointer items-center justify-between gap-4 px-4 py-2",
                  i === active && "bg-surface",
                )}
              >
                <span className="font-bold text-ink">{a.name}</span>
                <span className="text-small text-ink-soft">
                  Zone {a.zone.zone} · à partir de {formatFcfa(a.zone.standard.price)}
                </span>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <div className="px-4 py-3">
              <p className="text-small text-ink-soft">« {typed} » n&apos;est pas dans la liste des zones.</p>
              <a
                href={areaQuestionLink(typed)}
                target="_blank"
                rel="noopener"
                onMouseDown={(e) => e.preventDefault()}
                className="mt-1 inline-flex min-h-11 items-center gap-2 font-bold text-ink"
              >
                <WhatsAppIcon size={18} />
                <span className="link-underline">Quartier non listé ? Demandez sur WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </div>

      <p className="mt-5 text-small font-bold text-ink" id={`${id}-zones`}>
        Ou parcourez les zones
      </p>
      <div role="group" aria-labelledby={`${id}-zones`} className="mt-2">
        <AnimatedBackground
          value={zone.zone}
          onValueChange={(z) => browse(DELIVERY_ZONES.find((d) => d.zone === z)!)}
          className="rounded-full bg-brown"
          containerClassName="grid grid-cols-5 rounded-full bg-cream p-1"
        >
          {DELIVERY_ZONES.map((d) => (
            <button
              key={d.zone}
              data-id={d.zone}
              type="button"
              aria-pressed={d.zone === zone.zone}
              className="min-h-11 rounded-full text-[0.9375rem] font-bold text-ink transition-colors duration-300 data-[checked=true]:text-cream"
            >
              <span className="sr-only sm:not-sr-only">Zone </span>
              {d.zone}
            </button>
          ))}
        </AnimatedBackground>
      </div>

      {/* The answer: updates as soon as a neighbourhood or a zone is chosen */}
      <div aria-live="polite" className="mt-4 rounded-lg bg-cream p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-heading-sm text-ink">{area ? area.name : `Zone ${zone.zone}`}</p>
            {detail && <p className="mt-1 text-small text-ink-soft">{detail}</p>}
          </div>
          {area && (
            <span className="shrink-0 rounded bg-brown px-2 py-1 text-caption font-bold uppercase tracking-[0.08em] text-cream">
              Zone {zone.zone}
            </span>
          )}
        </div>
        <dl className="mt-4 grid grid-cols-2 border-t border-line pt-4">
          {(
            [
              ["Standard", zone.standard],
              ["Premium", zone.premium],
            ] as const
          ).map(([label, rate], i) => (
            <div key={label} className={cn(i === 0 ? "border-r border-line pr-4" : "pl-4")}>
              <dt className="text-caption font-bold uppercase tracking-[0.08em] text-ink-soft">{label}</dt>
              <dd className="mt-1 text-[1.25rem] font-bold leading-tight tabular-nums text-ink">
                {formatFcfa(rate.price)}
              </dd>
              <dd className="mt-0.5 text-small text-ink-soft">{rate.time}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href={areaQuestionLink()}
        target="_blank"
        rel="noopener"
        className="mt-3 inline-flex min-h-11 items-center gap-2 text-small font-bold text-ink"
      >
        <WhatsAppIcon size={18} />
        <span className="link-underline">Quartier non listé ? Demandez sur WhatsApp</span>
      </a>
    </div>
  );
}
