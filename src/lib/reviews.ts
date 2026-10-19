// Google reviews, quoted word for word (research/data/google-reviews.json).
// Spelling kept exactly as published. Display names shortened to first name +
// initial; the three marked "à confirmer" need the owner's OK.

export type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
  context?: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Fely N.",
    rating: 5,
    date: "il y a un an",
    text: "Trop top. Livraison très rapide, livreur courtois, repas très esquis. C'était de la sauce gbota. Je me suis bien régalée avec les miens. Je recommande",
  },
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
    name: "Samson W.",
    rating: 5,
    date: "il y a 2 ans",
    text: "Livraison disponible a Cotonou entre 45 et 60 minutes",
  },
  {
    name: "Espoir",
    rating: 4,
    date: "il y a 6 mois",
    text: "un très bon restaurant bon manger des bon mets je vous le conseille vivement",
    context: "Déjeuner",
  },
  {
    name: "Guylandry F.",
    rating: 5,
    date: "il y a un an",
    text: "Des mets au goût très succulent",
  },
  {
    name: "Anderson G.",
    rating: 4,
    date: "il y a 2 ans",
    text: "C'était bien. Le cadre agréable et le service aussi",
  },
  {
    name: "N'tcha G.",
    rating: 5,
    date: "il y a 3 mois",
    text: "vous êtes là meilleur grand sœur que Dieu vous garde",
  },
];
