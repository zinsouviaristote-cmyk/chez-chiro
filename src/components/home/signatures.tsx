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
    <section aria-labelledby="signatures-title" className="pb-20 md:pb-28">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Les incontournables"
            title={
              <span id="signatures-title">
                Les plats qu&apos;on <span className="accent text-orange">recommande</span> les yeux fermés.
              </span>
            }
          />
          <Reveal>
            <Link href="/menu" className="link-arrow shrink-0">
              Toute la carte <ArrowRightIcon size={18} className="arrow" />
            </Link>
          </Reveal>
        </div>

        <Stagger
          as="ul"
          className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-14 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0"
        >
          {CARDS.map((card) => (
            <StaggerItem as="li" key={card.name} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto">
              <a
                href={dishOrderLink(orderName(card.name), card.price, card.single)}
                target="_blank"
                rel="noopener"
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-[var(--radius-image)] bg-sand">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    sizes="(min-width: 768px) 25vw, 78vw"
                    className="zoom-img h-full w-full object-cover"
                    style={card.position ? { objectPosition: card.position } : undefined}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-orange px-3 py-1.5 text-[0.75rem] font-bold tracking-[0.03em] text-brown">
                    {card.single ? formatFcfa(card.price) : `dès ${formatFcfa(card.price)}`}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold leading-tight text-brown">{card.name}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{card.description}</p>
                <span className="link-arrow mt-4 text-[0.9375rem]">
                  Commander <ArrowRightIcon size={16} className="arrow" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12 md:gap-6">
          {/* Sauce Gbota Royal — no clean photo yet, so typography carries it */}
          <Reveal className="relative overflow-hidden rounded-[var(--radius-card)] bg-brown p-7 text-cream sm:p-10 md:col-span-7 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -right-40 hidden size-80 md:block rounded-full border-[3px] border-orange/50 md:-bottom-48 md:-right-36 md:size-[26rem]"
            />
            <p className="eyebrow text-orange">La signature de la maison</p>
            <h3 className="display mt-5 text-[2.9rem] sm:text-[3.6rem] md:text-[4.4rem]">
              Sauce Gbota <span className="accent text-orange">Royal</span>
            </h3>
            <p className="mt-3 text-lg text-cream/80">La tête de mouton, avec akassa ou piron.</p>

            <figure className="mt-8 max-w-lg border-l-2 border-orange pl-5">
              <blockquote className="accent text-[1.45rem] leading-snug text-cream md:text-[1.7rem]">
                « Trop top. Livraison très rapide, livreur courtois, repas très esquis. C&apos;était de la sauce gbota. […] »
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2 text-sm text-cream/70">
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
              <p className="text-sm text-cream/75">
                à partir de <strong className="text-base text-cream">{formatFcfa(5000)}</strong>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col rounded-[var(--radius-card)] bg-peach p-7 sm:p-10 md:col-span-5 md:p-12">
            <p className="eyebrow text-brown">Pour les grandes faims</p>
            <h3 className="display mt-5 text-[2.9rem] text-brown sm:text-[3.6rem]">
              Pack <span className="accent text-orange-deep">Banger</span>
            </h3>
            <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-brown">
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
              <p className="display text-[2.4rem] text-brown">{formatFcfa(PACK_BANGER.price)}</p>
              <a
                href={dishOrderLink(PACK_BANGER.name, PACK_BANGER.price, true)}
                target="_blank"
                rel="noopener"
                className="btn btn-dark"
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
