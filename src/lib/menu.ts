import { formatFcfa } from "./utils";

// Full menu, rebuilt from research/data/menu.json (chezchiro.com, 19 Oct 2026).
// - Prices: the lowest published level, shown as "à partir de" when the dish
//   has several levels (demo assumption, à confirmer).
// - Spelling lightly normalised (accents, "Acec" → "Avec", "0,33cl" → "33 cl").
// - The site lists juices and yaourt/dèguè twice ("Repas" + their own tab):
//   merged here into "Douceurs & jus", one line per product.

export type Dish = {
  id: string;
  name: string;
  /** Optional precision shown after the name, e.g. "la tête de mouton". */
  aside?: string;
  description: string;
  /** "NB" lines from the original menu (tilapia / silivi prices). */
  note?: string;
  price: number;
  /** true when the menu shows a single price (no "à partir de"). */
  single?: boolean;
  /** Published price levels, kept for reference. */
  levels: number[];
  tag?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  /** Shorter label for the text tabs. */
  tab: string;
  intro: string;
  dishes: Dish[];
};

export const PACK_BANGER: Dish = {
  id: "pack-banger",
  name: "Pack Banger",
  description:
    "Riz + hors-d'œuvre ou frites + poulet ou lapin braisé + wassa-wassa avec deux ailerons + chawarma + un jus de fruits naturel + un yaourt ou dèguè + un sac cadeau.",
  price: 12000,
  single: true,
  levels: [12000],
};

export const MENU: MenuCategory[] = [
  {
    id: "sauces",
    label: "Sauces & pâtes",
    tab: "Sauces & pâtes",
    intro: "Les sauces qui mijotent longtemps, servies avec akassa, piron, télibo ou agbéli.",
    dishes: [
      {
        id: "gbota-royal",
        name: "Sauce Gbota Royal",
        aside: "la tête de mouton",
        description: "Avec akassa ou piron.",
        price: 5000,
        levels: [5000, 9000],
        tag: "Signature",
      },
      {
        id: "assrokouin",
        name: "Sauce assrokouin bien garnie",
        description: "Avec télibo ou agbéli.",
        price: 3000,
        levels: [3000, 3500, 4000, 5000, 6000],
      },
      {
        id: "telibo-sauce-mouton",
        name: "Télibo avec sauce mouton",
        description: "Avec télibo ou akassa.",
        price: 3000,
        levels: [3000, 3500, 4000, 5000, 6000],
      },
      {
        id: "sauce-mouton",
        name: "Sauce mouton",
        description: "Avec télibo, riz blanc ou agbéli.",
        price: 3000,
        levels: [3000, 3500, 4000, 5000, 6000],
      },
      {
        id: "telibo",
        name: "Télibo",
        description: "Avec sauce graine ou sauce arachide.",
        price: 3000,
        levels: [3000, 3500, 5000, 6000],
      },
    ],
  },
  {
    id: "riz",
    label: "Riz & graines",
    tab: "Riz & graines",
    intro: "Riz au gras, attiéké, wassa-wassa : la base généreuse, avec la viande ou le poisson de votre choix.",
    dishes: [
      {
        id: "riz-au-gras",
        name: "Riz au gras",
        description:
          "Avec poulet bicyclette, lapin braisé, mouton braisé, aileron braisé ou poisson (silivi ou tilapia).",
        note: "Avec tilapia : à partir de 3 500 FCFA",
        price: 3000,
        levels: [3000, 3500, 4000, 6000],
      },
      {
        id: "riz-petit-pois",
        name: "Riz au gras aux petits pois",
        description:
          "Avec poulet bicyclette braisé, lapin braisé, mouton, aileron, poisson ou croupion de dinde.",
        price: 3000,
        levels: [3000, 3500, 4000, 5000, 6000],
      },
      {
        id: "riz-cassoulet",
        name: "Mélange riz au gras et cassoulet",
        description:
          "Avec poulet bicyclette braisé, mouton, lapin, aileron, poulet ou poisson.",
        price: 4000,
        levels: [4000, 4500, 5000, 6000, 7000],
      },
      {
        id: "entree-resistant",
        name: "Entrée + résistant",
        aside: "hors-d'œuvre + riz au gras",
        description:
          "Avec mouton, lapin, aileron, poisson ou poulet bicyclette braisé.",
        price: 4500,
        levels: [4500, 5000, 6000, 7000, 8000],
      },
      {
        id: "attieke",
        name: "Attiéké",
        description:
          "Avec poulet bicyclette, lapin, mouton ou aileron braisés, aloco poisson (silivi ou tilapia) ou croupion de dinde.",
        note: "Avec silivi : à partir de 3 000 FCFA · avec tilapia : à partir de 4 000 FCFA",
        price: 3000,
        levels: [3000, 3500, 4000, 5000, 6000],
      },
      {
        id: "wassa-wassa",
        name: "Wassa-wassa",
        description:
          "Avec poulet bicyclette, lapin, mouton ou aileron braisés, poisson (silivi ou tilapia) ou croupion de dinde.",
        note: "Avec tilapia : à partir de 3 500 FCFA",
        price: 3000,
        levels: [3000, 3500, 4000, 5000, 6000],
      },
    ],
  },
  {
    id: "braises",
    label: "Braisés & frites",
    tab: "Braisés",
    intro: "Le poulet bicyclette braisé, le croupion de dinde et l'aloco bien doré.",
    dishes: [
      {
        id: "poulet-bicyclette",
        name: "Poulet bicyclette braisé complet",
        description: "Poulet entier braisé, sans accompagnement.",
        price: 6000,
        single: true,
        levels: [6000],
      },
      {
        id: "croupion-dinde",
        name: "Croupion de dinde",
        description: "Avec piron, akassa, riz, attiéké ou frites-aloco.",
        price: 3000,
        levels: [3000, 3500, 4000, 5000, 6000],
      },
      {
        id: "frites-aloco",
        name: "Frites avec aloco",
        description:
          "Avec poulet bicyclette, lapin, mouton ou aileron braisés, poisson (silivi ou tilapia) ou croupion de dinde.",
        note: "Avec tilapia : à partir de 4 000 FCFA",
        price: 3000,
        levels: [3000, 3500, 4000, 5000, 6000],
      },
      {
        id: "portion-frites",
        name: "Portion de frites",
        description: "Une portion de frites, d'aloco ou de riz.",
        price: 1000,
        single: true,
        levels: [1000],
      },
    ],
  },
  {
    id: "snacks",
    label: "Chawarma & snacks",
    tab: "Snacks",
    intro: "Pour la pause de midi ou la petite faim du soir.",
    dishes: [
      {
        id: "chawarma-chef",
        name: "Chawarma du chef",
        description: "Viande de bœuf et fromage fondant.",
        price: 3500,
        levels: [3500, 4000, 5000, 6000],
      },
      {
        id: "chawarma-standard",
        name: "Chawarma standard",
        description: "Avec viande de bœuf.",
        price: 2000,
        levels: [2000, 2500, 3000, 4000],
      },
      {
        id: "hors-doeuvre",
        name: "Hors-d'œuvre à chaud",
        description: "Avec du pain.",
        price: 3000,
        levels: [3000, 3500, 4000, 5000, 6000],
      },
      {
        id: "cassoulet",
        name: "Cassoulet avec pain ou gari",
        description: "Viande de bœuf en petits morceaux et saucisses.",
        price: 3000,
        levels: [3000, 3500, 5000, 6000],
      },
    ],
  },
  {
    id: "douceurs",
    label: "Douceurs & jus",
    tab: "Douceurs & jus",
    intro: "La bouillie du matin, les douceurs lactées et les jus naturels maison.",
    dishes: [
      {
        id: "tapioriz",
        name: "Bouillie : tapioriz au lait",
        description: "Avec arachide.",
        price: 1500,
        levels: [1500, 2000, 2500, 3000, 5000],
      },
      {
        id: "yaourt",
        name: "Yaourt",
        description: "Bouteille de 33 cl.",
        price: 600,
        single: true,
        levels: [600],
      },
      {
        id: "degue-couscous",
        name: "Dèguè couscous",
        description: "Bouteille de 33 cl.",
        price: 600,
        single: true,
        levels: [600],
      },
      {
        id: "degue-mil",
        name: "Dèguè mil",
        description: "Produit laitier.",
        price: 600,
        single: true,
        levels: [600],
      },
      {
        id: "jus-bissap",
        name: "Jus de bissap",
        description: "Jus naturel, 0,5 litre.",
        price: 500,
        single: true,
        levels: [500],
      },
      {
        id: "jus-gingembre",
        name: "Jus de gingembre",
        description: "Jus naturel, 0,5 litre.",
        price: 500,
        single: true,
        levels: [500],
      },
      {
        id: "jus-tamarin",
        name: "Jus de tamarin",
        description: "Jus naturel, 0,5 litre.",
        price: 500,
        single: true,
        levels: [500],
      },
      {
        id: "jus-ananas",
        name: "Jus d'ananas",
        description: "Jus naturel, 0,5 litre.",
        price: 500,
        single: true,
        levels: [500],
      },
    ],
  },
];

export const ALL_DISHES: Dish[] = [PACK_BANGER, ...MENU.flatMap((c) => c.dishes)];

/** "à partir de 3 000 FCFA", or "6 000 FCFA" for a single-price item. */
export function priceText(dish: Pick<Dish, "price" | "single">) {
  return dish.single ? formatFcfa(dish.price) : `à partir de ${formatFcfa(dish.price)}`;
}

/** Name as written in WhatsApp messages: "Sauce Gbota Royal, la tête de mouton". */
export function orderName(dish: Pick<Dish, "name" | "aside">) {
  return dish.aside ? `${dish.name}, ${dish.aside}` : dish.name;
}

/** Card description: the precision first ("La tête de mouton."), then the description. */
export function cardDescription(dish: Pick<Dish, "aside" | "description">) {
  const aside = dish.aside ? `${dish.aside.charAt(0).toUpperCase()}${dish.aside.slice(1)}. ` : "";
  return `${aside}${dish.description}`;
}

/** "Populaires" on /menu: the house signature, the four homepage classics and the pack. */
export const POPULAR_IDS = ["gbota-royal", "attieke", "poulet-bicyclette", "riz-petit-pois", "tapioriz", "pack-banger"];

export const dishById = (id: string) => ALL_DISHES.find((d) => d.id === id);
