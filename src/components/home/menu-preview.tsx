"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ALL_DISHES, MENU } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "../icons";
import { DishRow } from "../menu/dish-row";
import { Reveal } from "../motion/reveal";
import { TabDot } from "../menu/tab-dot";

export function MenuPreview() {
  const [active, setActive] = useState(MENU[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const category = MENU.find((c) => c.id === active) ?? MENU[0];

  return (
    <section id="menu" aria-labelledby="menu-title" className="section bg-surface">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <h2 id="menu-title" className="text-heading text-ink">
            Choisissez, on s&apos;occupe du reste.
          </h2>
          <p className="mt-4 max-w-2xl text-subheading text-ink-soft">
            Touchez « Commander » : WhatsApp s&apos;ouvre avec le nom du plat déjà écrit. Les prix indiqués sont
            les prix de départ, le total dépend de vos choix.
          </p>
        </Reveal>

        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Catégories du menu"
          className="no-scrollbar relative -mx-4 mt-8 flex gap-6 overflow-x-auto px-4 sm:-mx-6 sm:px-6 md:mx-0 md:mt-12 md:gap-8 md:px-0"
        >
          {MENU.map((c) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                type="button"
                id={`tab-${c.id}`}
                aria-selected={selected}
                aria-controls="menu-panel"
                onClick={() => setActive(c.id)}
                className={cn(
                  "relative shrink-0 pb-4 text-heading-sm transition-colors duration-200",
                  selected ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                {c.tab}
              </button>
            );
          })}
          <TabDot container={tabsRef} activeSelector={`#tab-${active}`} className="bottom-0.5" />
        </div>

        <div className="mt-4 rounded-lg bg-cream p-1 sm:p-6 md:mt-6 md:p-8">
          <div
            key={category.id}
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`tab-${category.id}`}
            className="panel-in"
          >
              <p className="px-3 pb-2 pt-3 text-small text-ink-soft sm:pt-1">{category.intro}</p>
              <div className="grid px-3 md:grid-cols-2 md:gap-x-12">
                {category.dishes.slice(0, 6).map((dish) => (
                  <div key={dish.id} className="border-b border-line last:border-0 md:[&:nth-last-child(-n+2)]:border-0">
                    <DishRow dish={dish} />
                  </div>
                ))}
              </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-ink-soft">
            {ALL_DISHES.length} plats, packs et boissons. Paiement à la livraison.
          </p>
          <Link href="/menu" className="btn btn-secondary">
            Voir toute la carte <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
