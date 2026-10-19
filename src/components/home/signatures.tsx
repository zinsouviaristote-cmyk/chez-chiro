import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import attiekeImg from "@/assets/images/attieke-poisson-aloco.jpg";
import pouletImg from "@/assets/images/poulet-bicyclette-detail.jpg";
import rizImg from "@/assets/images/riz-petit-pois-crop.jpg";
import tapiorizImg from "@/assets/images/tapioriz-au-lait.jpg";
import { PACK_BANGER } from "@/lib/menu";
import { dishOrderLink } from "@/lib/whatsapp";
import { formatFcfa } from "@/lib/utils";
import { ArrowRightIcon, StarIcon, WhatsAppIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { SectionHeading } from "./section-heading";

type Card = {
  name: string;
  description: string;
  price: number;
  single?: boolean;
  image: StaticImageData;
  alt: string;
  position?: string;
};

const CARDS: Card[] = [
  {
    name: "Attiéké",
    description: "Avec poisson silivi ou tilapia, aloco, poulet bicyclette, lapin, mouton ou aileron braisés.",
    price: 3000,
    image: attiekeImg,
    alt: "Assiette d'attiéké avec poisson braisé, aloco et crudités",
  },
  {
    name: "Poulet bicyclette braisé",
    description: "Le poulet bicyclette entier et braisé, servi sans accompagnement.",
    price: 6000,
    single: true,
    image: pouletImg,
    alt: "Morceaux de poulet bicyclette braisé avec tomates et oignons",
  },
  {
    name: "Riz au gras aux petits pois",
    description: "Avec poulet bicyclette, lapin, mouton, aileron, poisson ou croupion de dinde.",
    price: 3000,
    image: rizImg,
    alt: "Riz au gras aux petits pois Chez Chiro",
    position: "50% 60%",
  },
  {
    name: "Tapioriz au lait",
    description: "La bouillie crémeuse du matin, avec arachide.",
    price: 1500,
    image: tapiorizImg,
    alt: "Bouillie de tapioriz au lait avec arachides",
  },
];

const orderName = (name: string) =>
  name === "Tapioriz au lait" ? "Bouillie : tapioriz au lait" : name === "Poulet bicyclette braisé" ? "Poulet bicyclette braisé complet" : name;

export function Signatures() {
  return (
    <section aria-labelledby="signatures-title" className="section">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="signatures-title" title="Les plats qu'on recommande les yeux fermés." />
          <Reveal>
            <Link href="/menu" className="link-arrow shrink-0">
              Toute la carte <ArrowRightIcon size={18} className="arrow" />
            </Link>
          </Reveal>
        </div>

        <Stagger
          as="ul"
          className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:mt-12 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0"
        >
          {CARDS.map((card) => (
            <StaggerItem as="li" key={card.name} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto">
              <a
                href={dishOrderLink(orderName(card.name), card.price, card.single)}
                target="_blank"
                rel="noopener"
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-surface">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    sizes="(min-width: 768px) 25vw, 78vw"
                    quality={60}
                    className="zoom-img h-full w-full object-cover"
                    style={card.position ? { objectPosition: card.position } : undefined}
                  />
                  <span className="absolute left-3 top-3 rounded bg-brown px-2 py-1 text-caption font-bold text-cream">
                    {card.single ? formatFcfa(card.price) : `dès ${formatFcfa(card.price)}`}
                  </span>
                </div>
                <h3 className="mt-4 text-heading-sm text-ink">{card.name}</h3>
                <p className="mt-1 text-small text-ink-soft">{card.description}</p>
                <span className="link-arrow mt-3">
                  Commander <ArrowRightIcon size={16} className="arrow" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12 md:gap-6">
          {/* Sauce Gbota Royal — no clean photo yet, so typography carries it */}
          <Reveal className="rounded-lg bg-brown p-6 text-cream sm:p-10 md:col-span-7 md:p-12">
            <p className="text-small font-bold text-orange">La signature de la maison</p>
            <h3 className="mt-2 text-heading">Sauce Gbota Royal</h3>
            <p className="mt-2 text-subheading text-cream/80">La tête de mouton, avec akassa ou piron.</p>

            <figure className="mt-8 max-w-lg border-l-2 border-orange pl-5">
              <blockquote className="text-subheading text-cream">
                « Trop top. Livraison très rapide, livreur courtois, repas très esquis. C&apos;était de la sauce gbota. […] »
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2 text-small text-cream/70">
                <span className="flex text-spark" role="img" aria-label="5 étoiles sur 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={13} />
                  ))}
                </span>
                Fely N., avis Google
              </figcaption>
            </figure>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={dishOrderLink("Sauce Gbota Royal (la tête de mouton)", 5000)}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                <WhatsAppIcon size={19} /> Commander la gbota
              </a>
              <p className="text-small text-cream/75">
                à partir de <strong className="text-body text-cream">{formatFcfa(5000)}</strong>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col rounded-lg bg-surface p-6 sm:p-10 md:col-span-5 md:p-12">
            <p className="text-small font-bold text-ink-soft">Pour les grandes faims</p>
            <h3 className="mt-2 text-heading text-ink">Pack Banger</h3>
            <ul className="mt-6 space-y-2.5 text-body text-ink">
              {[
                "Riz, hors-d'œuvre ou frites",
                "Poulet ou lapin braisé",
                "Wassa-wassa avec deux ailerons",
                "Un chawarma",
                "Un jus naturel + un yaourt ou dèguè",
                "Et un sac cadeau",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-orange" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-9">
              <p className="text-heading-sm tabular-nums text-ink">{formatFcfa(PACK_BANGER.price)}</p>
              <a
                href={dishOrderLink(PACK_BANGER.name, PACK_BANGER.price, true)}
                target="_blank"
                rel="noopener"
                className="btn btn-secondary"
              >
                <WhatsAppIcon size={19} /> Commander le pack
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
