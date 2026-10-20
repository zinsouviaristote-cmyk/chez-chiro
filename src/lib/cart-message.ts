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

/** One prefilled WhatsApp message for the whole order (format of the site's other order messages). */
export function cartOrderLink(entries: CartEntry[], area?: string) {
  const { amount, from } = cartTotal(entries);
  const lines = entries.map(
    ({ dish, qty }) => `• ${qty} × ${orderName(dish)} : ${dish.single ? "" : "à partir de"}${formatFcfa(dish.price * qty)}`,
  );
  return whatsappLink(
    [
      "Bonjour Chez Chiro 👋",
      "Je voudrais commander :",
      "",
      ...lines,
      "",
      "Mes choix (accompagnement, viande, poisson) : ",
      `Mon quartier : ${area ?? ""}`,
      "Livraison standard ou premium : ",
      "",
      `Total indicatif : ${from ? "à partir de " : ""}${formatFcfa(amount)}, hors livraison. À confirmer par Chez Chiro.`,
    ].join("\n"),
  );
}
