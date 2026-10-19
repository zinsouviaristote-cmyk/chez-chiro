// Real information only — every value below comes from the restaurant's own
// channels (site, TikTok, Facebook, posters) or its Google listing.
// Items marked "à confirmer" are listed in IMAGES.md / the V1 summary.

export const SITE_URL = "https://www.chezchiro.com";

export const BRAND = {
  name: "Chez Chiro",
  legalName: "Restau Chez Chiro",
  fullName: "Restaurant Chez Chiro",
  rccm: "RB/ABC/21 B 4666",
};

export const PHONES = {
  // Old 8-digit numbers converted to the 10-digit format (à confirmer).
  whatsapp: {
    display: "+229 01 56 49 99 82",
    e164: "2290156499982",
  },
  call: {
    display: "+229 01 60 40 83 24",
    tel: "+2290160408324",
  },
  // La Manifestation poster: Partenariats / Accréditations.
  events: {
    display: "+229 01 97 25 96 23",
    e164: "2290197259623",
  },
};

export const EMAIL = "info@chezchiro.com";

export const HOURS = {
  days: "Tous les jours",
  open: "9h – 20h",
  delivery: "Livraisons à partir de 12h",
};

export const LOCATION = {
  label: "Godomey, Abomey-Calavi",
  area: "Cotonou & Abomey-Calavi",
  mapsUrl: "https://maps.app.goo.gl/AkUQMPDwxWUsRAep7",
};

export const SOCIALS = {
  tiktok: {
    url: "https://www.tiktok.com/@restauchezchiro",
    handle: "@restauchezchiro",
    followers: 2_800_000,
    likes: 23_000_000,
  },
  facebook: {
    url: "https://www.facebook.com/restauchezchiro",
    // As displayed on 19 Oct 2026 (public page header).
    followers: 562_548,
  },
  instagram: {
    url: "https://www.instagram.com/restauchezchiro/",
  },
  // Linked from the Facebook page intro ("Abonnez-vous à notre chaîne WhatsApp").
  whatsappChannel: {
    url: "https://whatsapp.com/channel/0029VbB2C6s9WtCA0JM5Pi1D",
  },
};

export const GOOGLE = {
  rating: 4.4,
  count: 54,
  distribution: { 5: 38, 4: 10, 3: 2, 2: 0, 1: 4 } as Record<number, number>,
};

export const EVENT = {
  name: "La Manifestation",
  tagline: "Du virtuel au réel",
  days: ["04", "05", "06"],
  month: "déc. 2026",
  startISO: "2026-12-04",
  endISO: "2026-12-06",
};

// Delivery rates, rebuilt as text from the site's poster
// "Découvrez nos nouveaux tarifs de livraisons avec les temps estimés".
// Spellings normalised — à confirmer avec la propriétaire.
export const DELIVERY_ZONES = [
  {
    zone: "A",
    areas: "Cotonou et Calavi (hors quartiers des zones B à E)",
    standard: { price: 500, time: "45 à 90 min" },
    premium: { price: 1000, time: "30 à 50 min" },
  },
  {
    zone: "B",
    areas: "Akassato, Zoundja, Togba, Cococodji, Bazounkpa, Gbodjè, Atrokpocodji",
    standard: { price: 700, time: "55 à 115 min" },
    premium: { price: 1200, time: "45 à 65 min" },
  },
  {
    zone: "C",
    areas: "Kansoukpa",
    standard: { price: 800, time: "75 à 120 min" },
    premium: { price: 1300, time: "60 à 80 min" },
  },
  {
    zone: "D",
    areas: "Adjagbo, Ouèdo, Hêvié, Pahou, Akpakpa, Togbin",
    standard: { price: 1000, time: "90 à 130 min" },
    premium: { price: 1500, time: "60 à 90 min" },
  },
  {
    zone: "E",
    areas: "Glo, Ekpè, Djeffa",
    standard: { price: 1500, time: "95 à 135 min" },
    premium: { price: 2000, time: "60 à 95 min" },
  },
];

export const NAV = [
  { href: "/menu", label: "Le menu" },
  { href: "/#commander", label: "Commander" },
  { href: "/#avis", label: "Avis" },
  { href: "/#manifestation", label: "La Manifestation" },
  { href: "/#infos", label: "Infos pratiques" },
];
