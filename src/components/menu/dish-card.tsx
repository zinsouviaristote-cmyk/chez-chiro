"use client";

import Image, { type StaticImageData } from "next/image";
import type { MouseEvent } from "react";
import { addOne, removeOne } from "@/lib/cart-store";
import { cardDescription, priceText, type Dish } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "../icons";

type Photo = { src: StaticImageData; alt: string };

const stop = (fn: () => void) => (e: MouseEvent) => {
  e.stopPropagation();
  fn();
};

/** Round orange "+" (adds one), or − quantity + once the dish is in the order. */
function QuantityControl({ dish, qty, className }: { dish: Dish; qty: number; className?: string }) {
  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={stop(() => addOne(dish.id))}
        aria-label={`Ajouter ${dish.name} à la commande`}
        className={cn(
          "relative isolate grid size-11 place-items-center rounded-full bg-orange text-white transition-transform duration-200 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-brown/15 before:opacity-0 before:transition-opacity hover:before:opacity-100 active:scale-95",
          className,
        )}
      >
        <PlusIcon size={22} />
      </button>
    );
  }
  return (
    <div
      role="group"
      aria-label={`${dish.name} : ${qty} dans la commande`}
      className={cn("flex h-11 items-center rounded-full bg-brown text-cream", className)}
    >
      <button
        type="button"
        onClick={stop(() => removeOne(dish.id))}
        aria-label={`Retirer un ${dish.name}`}
        className="grid size-11 place-items-center rounded-full transition-colors hover:bg-cream/10"
      >
        <MinusIcon size={18} />
      </button>
      <span className="min-w-4 text-center font-bold tabular-nums">{qty}</span>
      <button
        type="button"
        onClick={stop(() => addOne(dish.id))}
        aria-label={`Ajouter un ${dish.name}`}
        className="grid size-11 place-items-center rounded-full transition-colors hover:bg-cream/10"
      >
        <PlusIcon size={18} />
      </button>
    </div>
  );
}

/**
 * Menu item, Uber Eats style. The whole card adds the dish to the order
 * (pointer); the "+" button is the keyboard and screen-reader way.
 */
export function DishCard({ dish, photo, qty }: { dish: Dish; photo?: Photo; qty: number }) {
  const description = cardDescription(dish);
  return (
    <article
      onClick={() => addOne(dish.id)}
      className={cn(
        "group relative flex h-full cursor-pointer gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-surface",
        qty > 0 ? "border-ink/40" : "border-line",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-[1.0625rem] font-bold leading-snug text-ink">
          {dish.name}
          {dish.tag && (
            <span className="ml-2 inline-block translate-y-[-2px] rounded bg-brown px-1.5 py-0.5 align-middle text-[0.6875rem] font-bold uppercase leading-normal tracking-[0.06em] text-cream">
              {dish.tag}
            </span>
          )}
        </h3>
        <p title={description} className="mt-1 line-clamp-2 text-small text-ink-soft">
          {description}
        </p>
        <p className="mt-auto pt-3 font-bold tabular-nums text-ink">{priceText(dish)}</p>
        {dish.note && <p className="mt-0.5 text-caption text-ink-soft">{dish.note}</p>}
      </div>

      {photo ? (
        <div className="relative size-28 shrink-0 self-start">
          <div className="size-full overflow-hidden rounded-lg bg-surface">
            <Image
              src={photo.src}
              alt={photo.alt}
              sizes="112px"
              quality={60}
              className="zoom-img size-full object-cover"
            />
          </div>
          <QuantityControl
            dish={dish}
            qty={qty}
            className={qty === 0 ? "absolute bottom-1.5 right-1.5" : "absolute inset-x-1 bottom-1 justify-between"}
          />
        </div>
      ) : (
        <QuantityControl dish={dish} qty={qty} className="shrink-0 self-end" />
      )}
    </article>
  );
}
