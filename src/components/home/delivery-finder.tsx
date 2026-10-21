"use client";

import { useId, useRef, useState } from "react";
import { setSelectedArea } from "@/lib/area-store";
import type { Area } from "@/lib/delivery";
import { DELIVERY_ZONES, type DeliveryZone } from "@/lib/site";
import { cn, formatFcfa } from "@/lib/utils";
import { areaQuestionLink } from "@/lib/whatsapp";
import { AreaCombobox } from "../area-combobox";
import { WhatsAppIcon } from "../icons";
import { AnimatedBackground } from "../ui/animated-background";

type Selection = { zone: DeliveryZone; area?: Area };

/**
 * Delivery fees by neighbourhood: the "Votre quartier" combobox (shared with
 * the order drawer of /menu), zone chips A–E to browse without typing, and the
 * zone's standard and premium price and time. Same data as the delivery
 * poster, nothing added.
 */
export function DeliveryFinder() {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState<Selection>({ zone: DELIVERY_ZONES[0] });

  function pick(area: Area) {
    setSelection({ zone: area.zone, area });
    setQuery(area.name);
    setSelectedArea(area);
  }

  function browse(zone: DeliveryZone) {
    setSelection({ zone });
    setQuery("");
    setSelectedArea(undefined);
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
      <AreaCombobox
        id={`${id}-input`}
        inputRef={inputRef}
        value={query}
        onValueChange={setQuery}
        selected={selection.area?.name}
        onPick={pick}
        empty={(typed) => (
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
        className="mt-2"
      />

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
