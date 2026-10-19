import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import attiekeImg from "@/assets/images/attieke-poisson-aloco.jpg";
import pouletImg from "@/assets/images/poulet-bicyclette-detail.jpg";
import rizImg from "@/assets/images/riz-petit-pois-crop.jpg";
import tapiorizImg from "@/assets/images/tapioriz-au-lait.jpg";
import { ALL_DISHES, PACK_BANGER, type Dish } from "@/lib/menu";
import { dishOrderLink } from "@/lib/whatsapp";
import { formatFcfa } from "@/lib/utils";
import { ArrowRightIcon, WhatsAppIcon } from "../icons";
import { AnimatedGroup, InView } from "../motion/in-view";

const byId = (id: string) => {
  const dish = ALL_DISHES.find((d) => d.id === id);
  if (!dish) throw new Error(`Unknown dish: ${id}`);
  return dish;
};

const priceLabel = (dish: Dish) => (dish.single ? formatFcfa(dish.price) : `dès ${formatFcfa(dish.price)}`);
const fullName = (dish: Dish) => (dish.aside ? `${dish.name} (${dish.aside})` : dish.name);

const GBOTA = byId("gbota-royal");

// Dishes that have a real, unwatermarked photo. Names and prices come from the menu.
const CLASSICS: { dish: Dish; name: string; line: string; image: StaticImageData; alt: string; position?: string }[] = [
  {
    dish: byId("attieke"),
    name: "Attiéké",
    line: "Avec aloco et poisson, poulet, lapin ou mouton braisés.",
    image: attiekeImg,
    alt: "Assiette d'attiéké avec poisson braisé, aloco et crudités",
  },
  {
    dish: byId("poulet-bicyclette"),
    name: "Poulet bicyclette braisé",
    line: "Le poulet entier, braisé, servi sans accompagnement.",
    image: pouletImg,
    alt: "Morceaux de poulet bicyclette braisé avec tomates et oignons",
  },
  {
    dish: byId("riz-petit-pois"),
    name: "Riz au gras aux petits pois",
    line: "Avec poulet, lapin, mouton, poisson ou croupion de dinde.",
    image: rizImg,
    alt: "Riz au gras aux petits pois Chez Chiro",
    position: "50% 55%",
  },
  {
    dish: byId("tapioriz"),
    name: "Tapioriz au lait",
    line: "La bouillie crémeuse, servie avec de l'arachide.",
    image: tapiorizImg,
    alt: "Bouillie de tapioriz au lait avec arachides",
  },
];

const PACK_ITEMS = [
  "Riz, hors-d'œuvre ou frites",
  "Poulet ou lapin braisé",
  "Wassa-wassa et deux ailerons",
  "Un chawarma",
  "Un jus naturel",
  "Un yaourt ou un dèguè",
];

export function Dishes() {
  return (
    <section id="plats" aria-labelledby="plats-title" className="section">
      <div className="container-site">
        <InView className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="plats-title" className="max-w-2xl text-heading text-ink">
            Nos plats, de la sauce gbota au tapioriz
          </h2>
          <Link href="/menu" className="link-arrow shrink-0">
            Toute la carte <ArrowRightIcon size={18} className="arrow" />
          </Link>
        </InView>

        {/* House signature: no clean photo yet (watermarked), so type carries it */}
        <InView as="article" className="mt-8 rounded-lg bg-brown text-cream md:mt-12">
          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-12 md:gap-12 md:p-14">
            <div className="md:col-span-7">
              <p className="text-small font-bold text-orange">La signature de la maison</p>
              <h3 className="mt-3 text-display">{GBOTA.name}</h3>
              <p className="mt-4 max-w-md text-subheading text-cream/80">
                Notre sauce gbota, préparée avec la tête de mouton.
              </p>
            </div>
            <div className="flex flex-col justify-end md:col-span-5">
              <dl className="divide-y divide-cream/15 border-y border-cream/15">
                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="text-small text-cream/70">Servie avec</dt>
                  <dd className="text-subheading font-bold">Akassa ou piron</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="text-small text-cream/70">Prix</dt>
                  <dd className="text-subheading font-bold tabular-nums">à partir de {formatFcfa(GBOTA.price)}</dd>
                </div>
              </dl>
              <a
                href={dishOrderLink(fullName(GBOTA), GBOTA.price)}
                target="_blank"
                rel="noopener"
                className="btn btn-primary mt-6 sm:w-full"
              >
                <WhatsAppIcon size={22} />
                Commander la gbota
              </a>
            </div>
          </div>
        </InView>

        <InView className="mt-14 md:mt-20">
          <h3 className="text-heading-sm text-ink">Les classiques de la maison</h3>
        </InView>
        <AnimatedGroup
          as="ul"
          className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:mt-6 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0"
        >
          {CLASSICS.map(({ dish, name, line, image, alt, position }) => (
            <li key={dish.id} className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-auto">
              <a
                href={dishOrderLink(fullName(dish), dish.price, dish.single)}
                target="_blank"
                rel="noopener"
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-surface">
                  <Image
                    src={image}
                    alt={alt}
                    sizes="(min-width: 768px) 280px, 72vw"
                    quality={60}
                    className="zoom-img h-full w-full object-cover"
                    style={position ? { objectPosition: position } : undefined}
                  />
                </div>
                <h4 className="mt-4 text-subheading font-bold text-ink">
                  <span className="card-title">{name}</span>
                </h4>
                <p className="mt-1 text-small text-ink-soft">{line}</p>
                <p className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-bold tabular-nums text-ink">{priceLabel(dish)}</span>
                  <span className="inline-flex items-center gap-1.5 text-small font-bold text-ink">
                    <WhatsAppIcon size={16} />
                    Commander
                  </span>
                </p>
              </a>
            </li>
          ))}
        </AnimatedGroup>

        {/* Separate offer for big appetites */}
        <InView
          as="article"
          className="mt-14 grid gap-6 rounded-lg bg-surface p-6 sm:p-10 md:mt-20 md:grid-cols-12 md:items-center md:gap-10"
        >
          <div className="md:col-span-8">
            <p className="text-small font-bold text-ink-soft">Pour les grandes faims</p>
            <h3 className="mt-2 text-heading text-ink">{PACK_BANGER.name}</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-2 text-body text-ink sm:grid-cols-2">
              {PACK_ITEMS.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span aria-hidden className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-spark" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-small text-ink-soft">Avec un sac cadeau.</p>
          </div>
          <div className="flex flex-col gap-4 border-t border-line pt-6 md:col-span-4 md:items-end md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <p className="text-heading tabular-nums text-ink">{formatFcfa(PACK_BANGER.price)}</p>
            <a
              href={dishOrderLink(PACK_BANGER.name, PACK_BANGER.price, true)}
              target="_blank"
              rel="noopener"
              className="btn btn-secondary md:w-full"
            >
              <WhatsAppIcon size={20} />
              Commander le pack
            </a>
          </div>
        </InView>

        <InView className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body text-ink-soft">
            {ALL_DISHES.length} plats, packs et boissons sur la carte complète.
          </p>
          <Link href="/menu" className="btn btn-outline">
            Voir toute la carte
            <ArrowRightIcon size={18} />
          </Link>
        </InView>
      </div>
    </section>
  );
}
