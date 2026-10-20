"use client";

import { useEffect, useRef, useState } from "react";
import { useSelectedArea } from "@/lib/area-store";
import { cartOrderLink, cartTotal, type CartEntry } from "@/lib/cart-message";
import { addOne, clearCart, removeOne, useCart } from "@/lib/cart-store";
import { dishById, priceText } from "@/lib/menu";
import { formatFcfa } from "@/lib/utils";
import { CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "../icons";
import { QuickOrderBar, useHeroGone } from "../mobile-order-bar";

const totalText = (amount: number, from: boolean) => `${from ? "dès " : ""}${formatFcfa(amount)}`;

/**
 * Bottom of /menu. Empty order: the WhatsApp + call bar on mobile (as on the
 * homepage). Once a dish is added: a "Votre commande (n)" bar, on every
 * screen size, that opens the order drawer.
 */
export function MenuOrderBar() {
  const cart = useCart();
  const area = useSelectedArea();
  const heroGone = useHeroGone("/menu");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const entries: CartEntry[] = Object.entries(cart).flatMap(([id, qty]) => {
    const dish = dishById(id);
    return dish ? [{ dish, qty }] : [];
  });
  const { amount, from, count } = cartTotal(entries);
  // An emptied order closes the drawer.
  const isOpen = open && count > 0;

  // Native modal dialog: focus trap, Escape and inert page for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      {count === 0 ? (
        <QuickOrderBar visible={heroGone} />
      ) : (
        <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-brown px-4 pt-3 md:inset-x-auto md:bottom-6 md:left-1/2 md:w-[28rem] md:-translate-x-1/2 md:rounded-lg md:border-0 md:p-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className="flex min-h-14 w-full items-center gap-3 text-left text-cream"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream font-bold tabular-nums text-brown">
              {count}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold">Votre commande ({count})</span>
              <span className="block text-small text-cream/72">{totalText(amount, from)}, à confirmer</span>
            </span>
            <span className="btn btn-primary w-auto px-5">Voir</span>
          </button>
          <p aria-live="polite" className="sr-only">
            {count} {count > 1 ? "plats" : "plat"} dans votre commande
          </p>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="order-title"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        className="order-sheet fixed inset-0 m-0 mt-auto h-fit max-h-[88dvh] border-0 w-full max-w-none overflow-hidden rounded-t-lg bg-cream p-0 text-ink backdrop:bg-brown/55 md:ml-auto md:mt-0 md:h-dvh md:max-h-none md:w-[30rem] md:rounded-none"
      >
        <div className="flex max-h-[88dvh] flex-col md:h-dvh md:max-h-none">
          <div className="flex items-center justify-between border-b border-line px-5 py-3 md:px-6">
            <h2 id="order-title" className="text-heading-sm text-ink">
              Votre commande
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
              aria-label="Fermer la commande"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <ul className="flex-1 divide-y divide-line overflow-y-auto px-5 md:px-6">
            {entries.map(({ dish, qty }) => (
              <li key={dish.id} className="flex items-center gap-4 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-snug text-ink">{dish.name}</p>
                  <p className="mt-0.5 text-small text-ink-soft">
                    {priceText(dish)} {qty > 1 && "l'unité"}
                  </p>
                </div>
                <div role="group" aria-label={`Quantité : ${dish.name}`} className="flex h-11 items-center rounded-full border border-line">
                  <button
                    type="button"
                    onClick={() => removeOne(dish.id)}
                    aria-label={`Retirer un ${dish.name}`}
                    className="grid size-11 place-items-center rounded-full transition-colors hover:bg-surface"
                  >
                    <MinusIcon size={16} />
                  </button>
                  <span className="min-w-5 text-center font-bold tabular-nums">{qty}</span>
                  <button
                    type="button"
                    onClick={() => addOne(dish.id)}
                    aria-label={`Ajouter un ${dish.name}`}
                    className="grid size-11 place-items-center rounded-full transition-colors hover:bg-surface"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="pb-safe border-t border-line bg-surface px-5 pt-5 md:px-6 md:pb-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-bold text-ink">Total indicatif</p>
              <p className="text-heading-sm tabular-nums text-ink">
                {from && <span className="text-small font-normal text-ink-soft">à partir de </span>}
                {formatFcfa(amount)}
              </p>
            </div>
            <p className="mt-1 text-small text-ink-soft">
              Hors livraison. Chez Chiro vous confirme le total sur WhatsApp, vous payez à la livraison.
            </p>
            <a
              href={cartOrderLink(entries, area)}
              target="_blank"
              rel="noopener"
              className="btn btn-primary mt-5 w-full whitespace-normal px-4 text-center sm:w-full"
            >
              <WhatsAppIcon size={22} />
              Envoyer la commande sur WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                clearCart();
                setOpen(false);
              }}
              className="mx-auto mt-2 flex min-h-11 items-center text-small font-bold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              Vider la commande
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
