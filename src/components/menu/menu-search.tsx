"use client";

import { useRef } from "react";
import { setMenuQuery, useMenuQuery } from "@/lib/menu-search-store";
import { CloseIcon, SearchIcon } from "../icons";

/** "Rechercher un plat": filters the items below as you type (accent-insensitive). */
export function MenuSearch() {
  const query = useMenuQuery();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div role="search" className="relative w-full md:w-[22rem]">
      <label htmlFor="menu-search" className="sr-only">
        Rechercher un plat
      </label>
      <SearchIcon size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
      <input
        ref={ref}
        id="menu-search"
        type="search"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        placeholder="Rechercher un plat"
        aria-controls="menu-items"
        value={query}
        onChange={(e) => setMenuQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && setMenuQuery("")}
        className="h-12 w-full appearance-none rounded-lg border border-ink/20 bg-surface pl-12 pr-12 text-body text-ink outline-none transition-colors duration-200 placeholder:text-ink-soft/80 hover:border-ink/40 focus:border-ink focus:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setMenuQuery("");
            ref.current?.focus();
          }}
          className="absolute right-0.5 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-lg text-ink-soft transition-colors hover:text-ink"
          aria-label="Effacer la recherche"
        >
          <CloseIcon size={18} />
        </button>
      )}
    </div>
  );
}
