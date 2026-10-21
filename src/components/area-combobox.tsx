"use client";

import { useId, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { searchAreas, type Area } from "@/lib/delivery";
import { cn, formatFcfa } from "@/lib/utils";
import { CloseIcon, MapPinIcon } from "./icons";

type Props = {
  /** Id of the input, for its <label htmlFor>. */
  id: string;
  inputRef: RefObject<HTMLInputElement | null>;
  value: string;
  onValueChange: (value: string) => void;
  onPick: (area: Area) => void;
  /** Name of the neighbourhood already picked: the list stays closed while the field shows it. */
  selected?: string;
  /** Inside the list when nothing matches. Without it, the list closes. */
  empty?: (typed: string) => ReactNode;
  /** Under the field while the list is closed, announced politely. */
  hint?: ReactNode;
  /** The list pushes what follows down instead of covering it (scrolling order drawer). */
  inline?: boolean;
  onFocus?: () => void;
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
  className?: string;
};

/**
 * "Votre quartier": combobox (ARIA 1.2 pattern) with an accent-insensitive
 * search over every neighbourhood of the delivery zones. Used by the delivery
 * finder of the homepage and by the order drawer of /menu.
 */
export function AreaCombobox({
  id,
  inputRef,
  value,
  onValueChange,
  onPick,
  selected,
  empty,
  hint,
  inline,
  onFocus,
  invalid,
  describedBy,
  required,
  className,
}: Props) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = searchAreas(value);
  const typed = value.trim();
  const showList = open && typed.length > 0 && typed !== selected && (results.length > 0 || !!empty);
  const optionId = (i: number) => `${listId}-opt-${i}`;

  function pick(area: Area) {
    setOpen(false);
    onPick(area);
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
      // Closes the list only, not the order drawer around it.
      if (showList) e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={className}>
      <div className="relative">
        <MapPinIcon size={20} className="pointer-events-none absolute left-4 top-7 -translate-y-1/2 text-ink-soft" />
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          autoCapitalize="words"
          spellCheck={false}
          enterKeyHint="search"
          maxLength={80}
          placeholder="Ex. : Togba, Pahou, Glo"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={showList && results[active] ? optionId(active) : undefined}
          aria-required={required || undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          value={value}
          onChange={(e) => {
            onValueChange(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            onFocus?.();
          }}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className="h-14 w-full rounded-lg border border-ink/25 bg-cream pl-12 pr-12 text-body text-ink outline-none transition-colors duration-200 placeholder:text-ink-soft/80 hover:border-ink/50 focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange aria-[invalid=true]:border-orange-deep"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onValueChange("");
              inputRef.current?.focus();
            }}
            className="absolute right-1 top-7 grid size-11 -translate-y-1/2 place-items-center rounded-lg text-ink-soft transition-colors hover:text-ink"
            aria-label="Effacer le quartier"
          >
            <CloseIcon size={18} />
          </button>
        )}

        <div
          className={cn(
            "mt-2 overflow-hidden rounded-lg border border-line bg-cream",
            !inline && "absolute inset-x-0 top-full z-20",
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
          {results.length === 0 && empty?.(typed)}
        </div>
      </div>

      {hint !== undefined && <div aria-live="polite">{!showList && hint}</div>}
    </div>
  );
}
