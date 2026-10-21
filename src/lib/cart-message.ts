import type { OrderDetails } from "./cart-store";
import { areaLabel, type Area } from "./delivery";
import { orderName, type Dish } from "./menu";
import { formatFcfa } from "./utils";
import { whatsappLink } from "./whatsapp";

export type CartEntry = { dish: Dish; qty: number };

/** Indicative total: "à partir de" as soon as one dish has several price levels. */
export function cartTotal(entries: CartEntry[]) {
  const amount = entries.reduce((sum, { dish, qty }) => sum + dish.price * qty, 0);
  const from = entries.some(({ dish }) => !dish.single);
  return { amount, from, count: entries.reduce((n, { qty }) => n + qty, 0) };
}

/**
 * One prefilled WhatsApp message for the whole order, complete for the
 * kitchen: dishes, précisions, neighbourhood, delivery, total. `area` is the
 * listed neighbourhood matching `details.quartier`; without it, the fee is
 * left to Chez Chiro.
 */
export function cartOrderLink(entries: CartEntry[], details: OrderDetails, area?: Area) {
  const { amount, from } = cartTotal(entries);
  const rate = area?.zone[details.livraison];
  const precisions = details.precisions.trim();
  const total = `${from ? "à partir de " : ""}${formatFcfa(amount + (rate?.price ?? 0))}`;
  return whatsappLink(
    [
      "Bonjour Chez Chiro 👋",
      "Je voudrais commander :",
      ...entries.map(
        ({ dish, qty }) => `- ${qty} × ${orderName(dish)} (${dish.single ? "" : "dès "}${formatFcfa(dish.price)})`,
      ),
      ...(precisions ? [`Précisions : ${precisions}`] : []),
      `Quartier : ${area ? areaLabel(area) : details.quartier.trim()}`,
      rate
        ? `Livraison : ${details.livraison}, ${formatFcfa(rate.price)} (${rate.time})`
        : "Livraison : frais à confirmer",
      `Total indicatif : ${total}, ${rate ? "livraison comprise" : "hors livraison"}`,
      "Merci de me confirmer le total.",
    ].join("\n"),
  );
}
