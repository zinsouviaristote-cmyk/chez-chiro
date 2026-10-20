// Google reviews, quoted word for word (research/data/google-reviews.json).
// Spelling kept exactly as published. Display names shortened to first name +
// initial; Korib L. and Guylandry F. need the owner's OK (see the V2 summary).

export type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
  /** Visit type shown by Google ("Livraison", "Dîner"…). */
  context?: string;
};

/** Shown large: the review that names the house signature. */
export const FEATURED_REVIEW: Review = {
  name: "Fely N.",
  rating: 5,
  date: "il y a un an",
  text: "Trop top. Livraison très rapide, livreur courtois, repas très esquis. C'était de la sauce gbota. Je me suis bien régalée avec les miens. Je recommande",
};

/** The carousel: five other 5-star reviews with text. */
export const REVIEWS: Review[] = [
  {
    name: "Carolle S.",
    rating: 5,
    date: "il y a un an",
    text: "Restaurant chez chiro c'est la meilleure j'ai vraiment aimé",
    context: "Livraison",
  },
  {
    name: "Korib L.",
    rating: 5,
    date: "il y a un an",
    text: "Vraiment magnifique, et les livreurs sont très courtois",
  },
  {
    name: "Fidélien F.",
    rating: 5,
    date: "il y a 6 mois",
    text: "Très bonne nourriture\nJe recommande",
    context: "Dîner",
  },
  {
    name: "Guylandry F.",
    rating: 5,
    date: "il y a un an",
    text: "Des mets au goût très succulent",
  },
  {
    name: "Samson W.",
    rating: 5,
    date: "il y a 2 ans",
    text: "Livraison disponible a Cotonou entre 45 et 60 minutes",
  },
];
