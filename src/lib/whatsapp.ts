import { PHONES } from "./site";
import { formatFcfa } from "./utils";

function wa(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Generic order message, used by the main CTAs. `area` prefills the neighbourhood (e.g. "Togba (zone B)"). */
export function orderLink(area?: string) {
  return wa(
    PHONES.whatsapp.e164,
    [
      "Bonjour Chez Chiro 👋",
      "Je voudrais passer une commande.",
      "",
      "Mes plats : ",
      `Mon quartier : ${area ?? ""}`,
      "Livraison standard ou premium : ",
    ].join("\n"),
  );
}

/** A neighbourhood missing from the delivery zones: ask before ordering. */
export function areaQuestionLink(area?: string) {
  const name = area?.trim();
  return wa(
    PHONES.whatsapp.e164,
    [
      "Bonjour Chez Chiro 👋",
      name
        ? `Mon quartier, ${name}, n'est pas dans la liste des zones de livraison.`
        : "Mon quartier n'est pas dans la liste des zones de livraison : ",
      "Livrez-vous chez moi ? Quels sont les frais et le temps de livraison ?",
    ].join("\n"),
  );
}

/** Order message with the dish name (and its "à partir de" price) prefilled. */
export function dishOrderLink(name: string, fromPrice?: number, single = false) {
  const price =
    fromPrice === undefined
      ? ""
      : single
        ? ` (${formatFcfa(fromPrice)})`
        : ` (à partir de ${formatFcfa(fromPrice)})`;
  return wa(
    PHONES.whatsapp.e164,
    [
      "Bonjour Chez Chiro 👋",
      `Je voudrais commander : ${name}${price}.`,
      "",
      "Mon choix / accompagnement : ",
      "Quantité : ",
      "Mon quartier : ",
    ].join("\n"),
  );
}

/** La Manifestation — partnerships & accreditations line from the poster. */
export function eventLink() {
  return wa(
    PHONES.events.e164,
    "Bonjour 👋 Je vous contacte au sujet de La Manifestation (4, 5 et 6 décembre 2026) : partenariat / accréditation.",
  );
}

export const callLink = `tel:${PHONES.call.tel}`;
