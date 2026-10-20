// Square thumbnails for /menu (src/assets/images/menu/), real photos only.
// Menu photos are cropped so their watermark never shows; sources in IMAGES.md.
import type { StaticImageData } from "next/image";
import gbotaRoyal from "@/assets/images/menu/gbota-royal.jpg";
import assrokouin from "@/assets/images/menu/assrokouin.jpg";
import teliboSauceMouton from "@/assets/images/menu/telibo-sauce-mouton.jpg";
import telibo from "@/assets/images/menu/telibo.jpg";
import rizAuGras from "@/assets/images/menu/riz-au-gras.jpg";
import entreeResistant from "@/assets/images/menu/entree-resistant.jpg";
import packBanger from "@/assets/images/menu/pack-banger.jpg";
import horsDoeuvre from "@/assets/images/menu/hors-doeuvre.jpg";
import fritesAloco from "@/assets/images/menu/frites-aloco.jpg";
import chawarmaStandard from "@/assets/images/menu/chawarma-standard.jpg";
import pouletBicyclette from "@/assets/images/menu/poulet-bicyclette.jpg";
import yaourt from "@/assets/images/menu/yaourt.jpg";
import degueCouscous from "@/assets/images/menu/degue-couscous.jpg";
import jusBissap from "@/assets/images/menu/jus-bissap.jpg";
import jusTamarin from "@/assets/images/menu/jus-tamarin.jpg";
import jusGingembre from "@/assets/images/menu/jus-gingembre.jpg";
import jusAnanas from "@/assets/images/menu/jus-ananas.jpg";
import attieke from "@/assets/images/menu/attieke.jpg";
import rizPetitPois from "@/assets/images/menu/riz-petit-pois.jpg";
import cassoulet from "@/assets/images/menu/cassoulet.jpg";
import tapioriz from "@/assets/images/menu/tapioriz.jpg";

export const MENU_PHOTOS: Record<string, { src: StaticImageData; alt: string }> = {
  "gbota-royal": { src: gbotaRoyal, alt: "Sauce gbota dans sa marmite, avec piments et oignons" },
  "assrokouin": { src: assrokouin, alt: "Sauce assrokouin servie avec une boule de pâte" },
  "telibo-sauce-mouton": { src: teliboSauceMouton, alt: "Sauce mouton garnie, avec viande et piment" },
  "telibo": { src: telibo, alt: "Télibo servi avec une sauce aux feuilles" },
  "riz-au-gras": { src: rizAuGras, alt: "Riz au gras avec un poisson braisé" },
  "entree-resistant": { src: entreeResistant, alt: "Hors-d'œuvre de crudités, œufs et viande, à côté du riz au gras" },
  "pack-banger": { src: packBanger, alt: "Une partie du Pack Banger : ailes de poulet, riz, spaghetti et sauce" },
  "hors-doeuvre": { src: horsDoeuvre, alt: "Hors-d'œuvre à chaud : œufs, viande, tomates et oignons" },
  "frites-aloco": { src: fritesAloco, alt: "Frites et aloco dorés" },
  "chawarma-standard": { src: chawarmaStandard, alt: "Chawarma au bœuf coupé en deux, avec salade" },
  "poulet-bicyclette": { src: pouletBicyclette, alt: "Poulet bicyclette braisé avec tomates, oignons et piment vert" },
  "yaourt": { src: yaourt, alt: "Bouteille de yaourt" },
  "degue-couscous": { src: degueCouscous, alt: "Bouteille de dèguè couscous" },
  "jus-bissap": { src: jusBissap, alt: "Bouteilles de jus de bissap" },
  "jus-tamarin": { src: jusTamarin, alt: "Bouteilles de jus de tamarin" },
  "jus-gingembre": { src: jusGingembre, alt: "Bouteilles de jus de gingembre" },
  "jus-ananas": { src: jusAnanas, alt: "Bouteilles de jus d'ananas" },
  "attieke": { src: attieke, alt: "Assiette d'attiéké avec poisson braisé, aloco et crudités" },
  "riz-petit-pois": { src: rizPetitPois, alt: "Riz au gras aux petits pois" },
  "cassoulet": { src: cassoulet, alt: "Cassoulet aux haricots blancs, saucisses et bœuf" },
  "tapioriz": { src: tapioriz, alt: "Bouillie de tapioriz au lait avec des arachides" },
};
