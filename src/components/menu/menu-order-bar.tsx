"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSelectedArea } from "@/lib/area-store";
import { cartOrderLink, cartTotal, type CartEntry } from "@/lib/cart-message";
import {
  addOne,
  clearCart,
  removeOne,
  setOrderDetails,
  useCart,
  useOrderDetails,
  type Delivery,
} from "@/lib/cart-store";
import { findArea } from "@/lib/delivery";
import { dishById, priceText } from "@/lib/menu";
import { formatFcfa } from "@/lib/utils";
import { AreaCombobox } from "../area-combobox";
import { CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "../icons";

const totalText = (amount: number, from: boolean) => `${from ? "à partir de " : ""}${formatFcfa(amount)}`;

const DELIVERY_OPTIONS: [Delivery, string][] = [
  ["standard", "Standard"],
  ["premium", "Premium"],
];

/**
 * Bottom of /menu: once a dish is added, a "Votre commande (n)" bar, on every
 * screen size, that opens the order drawer. Nothing while the order is empty.
 * The drawer works like a short checkout: dishes, neighbourhood (required),
 * delivery option, précisions, then one complete WhatsApp message.
 */
export function MenuOrderBar() {
  const id = useId();
  const cart = useCart();
  const details = useOrderDetails();
  const homeArea = useSelectedArea();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [tried, setTried] = useState(false);

  const entries: CartEntry[] = Object.entries(cart).flatMap(([id, qty]) => {
    const dish = dishById(id);
    return dish ? [{ dish, qty }] : [];
  });
  const { amount, from, count } = cartTotal(entries);
  // An emptied order closes the drawer.
  const isOpen = open && count > 0;

  const quartier = details.quartier.trim();
  const area = findArea(quartier);
  const rate = area?.zone[details.livraison];
  const missing = tried && !quartier;
  const errorId = `${id}-error`;

  // Native modal dialog: focus trap, Escape and inert page for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  function openDrawer() {
    // Starts from the neighbourhood checked on the homepage, if none is typed yet.
    if (!quartier && homeArea) setOrderDetails({ quartier: homeArea.name });
    setOpen(true);
  }

  function closeDrawer() {
    setOpen(false);
    setTried(false);
  }

  // The suggestions open under the field: bring it near the top of the
  // scrolling area, so the phone keyboard does not hide them.
  function revealField() {
    const scroller = scrollerRef.current;
    const field = fieldRef.current;
    if (!scroller || !field || field.offsetTop - scroller.scrollTop < scroller.clientHeight / 3) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => scroller.scrollTo({ top: field.offsetTop - 16, behavior: smooth ? "smooth" : "auto" }));
  }

  return (
    <>
      {count > 0 && (
        <div data-order-bar className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-brown px-4 pt-3 md:inset-x-auto md:bottom-6 md:left-1/2 md:w-[28rem] md:-translate-x-1/2 md:rounded-lg md:border-0 md:p-3">
          <button
            type="button"
            onClick={openDrawer}
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

      {/* Full height on every screen: the form scrolls, the footer and its send button stay in view. */}
      <dialog
        ref={dialogRef}
        aria-labelledby="order-title"
        onClose={closeDrawer}
        onClick={(e) => e.target === e.currentTarget && closeDrawer()}
        className="order-sheet fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-cream p-0 text-ink backdrop:bg-brown/55 md:ml-auto md:w-[30rem]"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-3 md:px-6">
            <h2 id="order-title" className="text-heading-sm text-ink">
              Votre commande
            </h2>
            <button
              type="button"
              onClick={closeDrawer}
              className="-mr-2 grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
              aria-label="Fermer la commande"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <div ref={scrollerRef} className="relative flex-1 overflow-y-auto overscroll-contain">
            <ul className="divide-y divide-line px-5 md:px-6">
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

            <div className="border-t border-line px-5 pb-8 pt-6 md:px-6">
              <div ref={fieldRef}>
                <label htmlFor={`${id}-quartier`} className="block text-small font-bold text-ink">
                  Votre quartier
                </label>
                <AreaCombobox
                  id={`${id}-quartier`}
                  inputRef={inputRef}
                  value={details.quartier}
                  onValueChange={(value) => setOrderDetails({ quartier: value })}
                  selected={area?.name}
                  onPick={(picked) => setOrderDetails({ quartier: picked.name })}
                  onFocus={revealField}
                  required
                  invalid={missing}
                  describedBy={missing ? errorId : undefined}
                  inline
                  hint={
                    area ? (
                      <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-ink-soft">
                        <span className="rounded bg-brown px-2 py-0.5 text-caption font-bold uppercase tracking-[0.08em] text-cream">
                          Zone {area.zone.zone}
                        </span>
                        {area.zone.note}
                      </p>
                    ) : quartier ? (
                      <p className="mt-2 flex items-center gap-2 text-small text-ink-soft">
                        <WhatsAppIcon size={16} className="shrink-0 text-ink" />
                        Frais de livraison confirmés sur WhatsApp
                      </p>
                    ) : null
                  }
                  className="mt-2"
                />
                {/* Always in the DOM so the message is announced when it appears */}
                <p id={errorId} role="alert" className="text-small font-bold text-ink">
                  {missing && (
                    <span className="mt-2 flex items-center gap-2">
                      <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-orange-deep text-caption font-bold leading-none text-white">
                        !
                      </span>
                      Indiquez votre quartier pour la livraison.
                    </span>
                  )}
                </p>
              </div>

              {area && (
                <fieldset className="panel-in mt-6">
                  <legend className="text-small font-bold text-ink">Livraison</legend>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {DELIVERY_OPTIONS.map(([option, label]) => {
                      const { price, time } = area.zone[option];
                      return (
                        <label
                          key={option}
                          className="group flex cursor-pointer flex-col rounded-lg border border-ink/25 bg-cream p-4 transition-colors duration-200 hover:border-ink/50 has-checked:border-ink has-checked:bg-surface has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-orange"
                        >
                          <input
                            type="radio"
                            name={`${id}-livraison`}
                            value={option}
                            checked={details.livraison === option}
                            onChange={() => setOrderDetails({ livraison: option })}
                            className="sr-only"
                          />
                          <span className="flex items-center gap-2 font-bold text-ink">
                            <span
                              aria-hidden
                              className="grid size-[1.125rem] shrink-0 place-items-center rounded-full border-2 border-ink/40 transition-colors duration-200 group-has-checked:border-ink"
                            >
                              <span className="size-2 scale-0 rounded-full bg-ink transition-transform duration-200 group-has-checked:scale-100" />
                            </span>
                            {label}
                          </span>
                          <span className="mt-2 text-[1.125rem] font-bold leading-tight tabular-nums text-ink">
                            {formatFcfa(price)}
                          </span>
                          <span className="mt-0.5 text-small text-ink-soft">{time}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              <div className="mt-6">
                <label htmlFor={`${id}-precisions`} className="flex items-baseline justify-between gap-4 text-small font-bold text-ink">
                  Précisions
                  <span className="font-normal text-ink-soft">Facultatif</span>
                </label>
                <textarea
                  id={`${id}-precisions`}
                  rows={3}
                  maxLength={500}
                  placeholder="Accompagnement, poisson silivi ou tilapia, sans piment…"
                  value={details.precisions}
                  onChange={(e) => setOrderDetails({ precisions: e.target.value })}
                  // 16px text: iOS does not zoom on focus
                  className="mt-2 block min-h-14 w-full resize-none rounded-lg border border-ink/25 bg-cream px-4 py-3 text-body text-ink outline-none transition-colors duration-200 placeholder:text-ink-soft/80 hover:border-ink/50 focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                />
              </div>
            </div>
          </div>

          <div className="pb-safe border-t border-line bg-surface px-5 pt-4 md:px-6 md:pb-6">
            <dl className="text-small">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink-soft">Plats</dt>
                <dd className="tabular-nums text-ink">{totalText(amount, from)}</dd>
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-4">
                <dt className="text-ink-soft">{rate ? `Livraison ${details.livraison}` : "Livraison"}</dt>
                <dd className="tabular-nums text-ink">{rate ? formatFcfa(rate.price) : "à confirmer"}</dd>
              </div>
            </dl>
            <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3">
              <p className="font-bold text-ink">Total indicatif</p>
              <p className="text-heading-sm tabular-nums text-ink">
                {from && <span className="text-small font-normal text-ink-soft">à partir de </span>}
                {formatFcfa(amount + (rate?.price ?? 0))}
              </p>
            </div>
            <p className="text-small text-ink-soft">Confirmé par Chez Chiro sur WhatsApp</p>
            <a
              href={cartOrderLink(entries, details, area)}
              target="_blank"
              rel="noopener"
              onClick={(e) => {
                if (quartier) return;
                // No neighbourhood, no delivery: stay here and point to the field.
                e.preventDefault();
                setTried(true);
                inputRef.current?.focus();
              }}
              className="btn btn-primary mt-4 w-full whitespace-normal px-4 text-center sm:w-full"
            >
              <WhatsAppIcon size={22} />
              Envoyer la commande sur WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                clearCart();
                closeDrawer();
              }}
              className="mx-auto mt-1 flex min-h-11 items-center text-small font-bold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              Vider la commande
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
