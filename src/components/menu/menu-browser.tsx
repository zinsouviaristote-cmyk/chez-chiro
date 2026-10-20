"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-store";
import { ALL_DISHES, MENU, POPULAR_IDS, dishById, type Dish } from "@/lib/menu";
import { MENU_PHOTOS } from "@/lib/menu-photos";
import { setMenuQuery, useMenuQuery } from "@/lib/menu-search-store";
import { normalize } from "@/lib/utils";
import { menuQuestionLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../icons";
import { AnimatedBackground } from "../ui/animated-background";
import { DishCard } from "./dish-card";

/** `tab`: short label for the pills; `title`: section heading. */
type Section = { id: string; tab: string; title: string; intro: string; dishes: Dish[] };

const SECTIONS: Section[] = [
  {
    id: "populaires",
    tab: "Populaires",
    title: "Populaires",
    intro: "La signature de la maison, nos classiques et le Pack Banger.",
    dishes: POPULAR_IDS.map((id) => dishById(id)!),
  },
  ...MENU.map((c) => ({ id: c.id, tab: c.tab, title: c.label, intro: c.intro, dishes: c.dishes })),
];

const SEARCH_INDEX = ALL_DISHES.map((dish) => ({
  dish,
  text: normalize([dish.name, dish.aside, dish.description, dish.tag].filter(Boolean).join(" ")),
}));

function search(query: string) {
  const words = normalize(query).split(" ").filter(Boolean);
  if (!words.length) return [];
  return SEARCH_INDEX.filter(({ text }) => words.every((w) => text.includes(w))).map(({ dish }) => dish);
}

function Grid({ dishes, cart }: { dishes: Dish[]; cart: Readonly<Record<string, number>> }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
      {dishes.map((dish) => (
        <li key={dish.id}>
          <DishCard dish={dish} photo={MENU_PHOTOS[dish.id]} qty={cart[dish.id] ?? 0} />
        </li>
      ))}
    </ul>
  );
}

/** Sticky category pills: the active one is filled and follows the scroll. */
function CategoryNav({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  const barRef = useRef<HTMLDivElement>(null);

  // Keep the active pill in view on narrow screens.
  useEffect(() => {
    const bar = barRef.current;
    const el = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!bar || !el) return;
    bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Catégories du menu" className="sticky top-[65px] z-30 border-b border-line bg-cream">
      <div ref={barRef} className="no-scrollbar container-site overflow-x-auto">
        <AnimatedBackground
          value={active}
          onValueChange={onPick}
          className="rounded-full bg-brown"
          containerClassName="flex w-max gap-1 py-2"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              data-id={s.id}
              href={`#${s.id}`}
              aria-current={s.id === active ? "true" : undefined}
              className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 text-[0.875rem] font-bold md:px-4 md:text-[0.9375rem] text-ink transition-colors duration-300 hover:text-ink/70 data-[checked=true]:text-cream"
            >
              {s.tab}
            </a>
          ))}
        </AnimatedBackground>
      </div>
    </nav>
  );
}

/** Categories, live search and the item grid of /menu. */
export function MenuBrowser() {
  const cart = useCart();
  const query = useMenuQuery();
  const [active, setActive] = useState(SECTIONS[0].id);
  const clickLock = useRef(0);
  const searching = query.trim().length > 0;
  const results = searching ? search(query) : [];

  // Scroll-spy: the category whose title crosses the upper third of the screen.
  useEffect(() => {
    if (searching) return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < clickLock.current) return;
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [searching]);

  if (searching) {
    return (
      <div id="menu-items" className="container-site pb-16 md:pb-24">
        <p aria-live="polite" className="border-t border-line pt-6 text-small font-bold text-ink-soft">
          {results.length === 0
            ? "Aucun résultat"
            : `${results.length} ${results.length > 1 ? "plats" : "plat"} pour « ${query.trim()} »`}
        </p>
        {results.length > 0 ? (
          <div className="mt-4">
            <Grid dishes={results} cart={cart} />
          </div>
        ) : (
          <div className="mt-4 rounded-lg bg-surface p-6 md:p-10">
            <h2 className="text-heading-sm text-ink">Aucun plat ne correspond à « {query.trim()} »</h2>
            <p className="mt-2 max-w-xl text-body text-ink-soft">
              Il n&apos;est peut-être pas sur la carte en ligne. Posez-nous la question sur WhatsApp.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={menuQuestionLink(query)} target="_blank" rel="noopener" className="btn btn-primary">
                <WhatsAppIcon size={22} />
                Demander sur WhatsApp
              </a>
              <button type="button" onClick={() => setMenuQuery("")} className="btn btn-outline">
                Voir toute la carte
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div id="menu-items">
      <CategoryNav
        active={active}
        onPick={(id) => {
          clickLock.current = Date.now() + 900;
          setActive(id);
        }}
      />
      <div className="container-site pb-16 md:pb-24">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-36 pt-10 md:pt-14">
            <h2 id={`${s.id}-title`} className="text-heading-sm text-ink">
              {s.title}
            </h2>
            <p className="mt-1 text-small text-ink-soft">{s.intro}</p>
            <div className="mt-5">
              <Grid dishes={s.dishes} cart={cart} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
