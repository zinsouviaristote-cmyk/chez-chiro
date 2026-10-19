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
    <section id="menu" aria-labelledby="menu-title" className="bg-sand py-20 md:py-28">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-brown">La carte</p>
          <h2 id="menu-title" className="display mt-4 text-[2.6rem] text-brown sm:text-[3.2rem] md:text-[4.25rem]">
            Choisissez, on <span className="accent text-orange-deep">s&apos;occupe</span> du reste.
          </h2>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted md:text-lg">
            Touchez « Commander » : WhatsApp s&apos;ouvre avec le nom du plat déjà écrit. Les prix indiqués sont
            les prix de départ, le total dépend de vos choix.
          </p>
        </Reveal>

        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Catégories du menu"
          className="no-scrollbar relative -mx-5 mt-10 flex gap-7 overflow-x-auto px-5 md:mx-0 md:mt-14 md:gap-10 md:px-0"
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
                  "display relative shrink-0 pb-4 text-[1.65rem] transition-colors duration-300 md:text-[2.1rem] lg:text-[2.25rem]",
                  selected ? "text-brown" : "text-brown/65 hover:text-brown",
                )}
              >
                {c.tab}
              </button>
            );
          })}
          <TabDot container={tabsRef} activeSelector={`#tab-${active}`} className="bottom-0.5" />
        </div>

        <div className="mt-6 rounded-[var(--radius-card)] bg-cream/55 p-1 sm:p-6 md:mt-8 md:p-8">
          <div
            key={category.id}
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`tab-${category.id}`}
            className="panel-in"
          >
              <p className="px-3 pb-2 pt-1 text-[0.9375rem] text-muted sm:px-3">{category.intro}</p>
              <div className="grid px-3 md:grid-cols-2 md:gap-x-12">
                {category.dishes.slice(0, 6).map((dish) => (
                  <div key={dish.id} className="border-b border-brown/10 last:border-0 md:[&:nth-last-child(-n+2)]:border-0">
                    <DishRow dish={dish} />
                  </div>
                ))}
              </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] text-muted">
            {ALL_DISHES.length} plats, packs et boissons. Paiement à la livraison.
          </p>
          <Link href="/menu" className="btn btn-dark">
            Voir toute la carte <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
