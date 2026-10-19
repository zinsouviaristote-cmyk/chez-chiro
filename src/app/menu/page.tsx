import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import pateImg from "@/assets/images/pate-sauce-challenge.jpg";
import grainImg from "@/assets/images/plat-gras-poulet.jpg";
import pouletImg from "@/assets/images/poulet-bicyclette-detail.jpg";
import cassouletImg from "@/assets/images/cassoulet-crop.jpg";
import bissapImg from "@/assets/images/jus-bissap.jpg";
import { ALL_DISHES, MENU, PACK_BANGER } from "@/lib/menu";
import { DELIVERY_ZONES, HOURS, SITE_URL } from "@/lib/site";
import { dishOrderLink, orderLink } from "@/lib/whatsapp";
import { formatFcfa } from "@/lib/utils";
import { DishRow } from "@/components/menu/dish-row";
import { MenuTabs } from "@/components/menu/menu-tabs";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { CashIcon, ClockIcon, TruckIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Menu et prix · Sauce gbota, wassa-wassa, poulet braisé",
  description:
    "Toute la carte Chez Chiro avec les prix en FCFA : sauces et pâtes, riz au gras, attiéké, wassa-wassa, poulet bicyclette braisé, chawarma, jus naturels. Commande en un message sur WhatsApp.",
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu" },
};

const IMAGES: Record<string, { src: StaticImageData; alt: string; position?: string }> = {
  sauces: { src: pateImg, alt: "Pâte servie avec une sauce rouge garnie et des piments", position: "50% 55%" },
  riz: { src: grainImg, alt: "Plat au gras servi avec une cuisse de poulet braisée", position: "50% 45%" },
  braises: { src: pouletImg, alt: "Poulet bicyclette braisé garni de tomates et d'oignons" },
  snacks: { src: cassouletImg, alt: "Cassoulet aux haricots blancs, saucisses et bœuf, avec du pain" },
  douceurs: { src: bissapImg, alt: "Bouteilles de jus de bissap maison" },
};

const menuLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Menu Chez Chiro",
  url: `${SITE_URL}/menu`,
  inLanguage: "fr",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "Packs",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: PACK_BANGER.name,
          description: PACK_BANGER.description,
          offers: { "@type": "Offer", price: PACK_BANGER.price, priceCurrency: "XOF" },
        },
      ],
    },
    ...MENU.map((c) => ({
      "@type": "MenuSection",
      name: c.label,
      hasMenuItem: c.dishes.map((d) => ({
        "@type": "MenuItem",
        name: d.aside ? `${d.name} (${d.aside})` : d.name,
        description: d.description,
        offers: d.single
          ? { "@type": "Offer", price: d.price, priceCurrency: "XOF" }
          : {
              "@type": "AggregateOffer",
              lowPrice: Math.min(...d.levels),
              highPrice: Math.max(...d.levels),
              priceCurrency: "XOF",
            },
      })),
    })),
  ],
};

const minDelivery = Math.min(...DELIVERY_ZONES.map((z) => z.standard.price));

export default function MenuPage() {
  return (
    <>
      <section data-hero className="pb-10 pt-8 md:pb-16 md:pt-14">
        <div className="container-site grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow flex items-center gap-2 text-brown">
              <span className="inline-block size-1.5 rounded-full bg-spark" />
              La carte · {ALL_DISHES.length} plats et boissons
            </p>
            <h1 className="display mt-5 text-[3.4rem] text-brown sm:text-[4.4rem] md:text-[6rem]">
              Le menu <span className="accent text-orange">Chez Chiro</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted md:text-lg">
              Touchez « Commander » sur un plat : WhatsApp s&apos;ouvre avec son nom déjà écrit. Les prix sont des
              prix de départ, le total dépend de la viande, du poisson ou de l&apos;accompagnement choisi.
            </p>
          </div>
          <ul className="grid gap-3 text-[0.9375rem] text-brown sm:grid-cols-3 md:col-span-5 md:grid-cols-1">
            <li className="flex items-center gap-3 rounded-2xl bg-sand px-4 py-3">
              <ClockIcon size={20} /> {HOURS.days}, {HOURS.open}
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-sand px-4 py-3">
              <TruckIcon size={20} /> Livraison dès {formatFcfa(minDelivery)}
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-sand px-4 py-3">
              <CashIcon size={20} /> Paiement à la livraison
            </li>
          </ul>
        </div>
      </section>

      <MenuTabs tabs={[{ id: "pack", label: "Pack Banger" }, ...MENU.map((c) => ({ id: c.id, label: c.tab }))]} />

      <div className="container-site pb-16 md:pb-24">
        <section id="pack" aria-labelledby="pack-title" className="scroll-mt-32 pt-10 md:pt-14">
          <Reveal className="grid gap-6 rounded-[var(--radius-card)] bg-peach p-7 sm:p-10 md:grid-cols-12 md:items-center md:p-12">
            <div className="md:col-span-8">
              <p className="eyebrow text-brown">Pour les grandes faims</p>
              <h2 id="pack-title" className="display mt-4 text-[2.8rem] text-brown md:text-[3.8rem]">
                Pack <span className="accent text-orange-deep">Banger</span>
              </h2>
              <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-brown/85">{PACK_BANGER.description}</p>
            </div>
            <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end">
              <p className="display text-[2.8rem] text-brown">{formatFcfa(PACK_BANGER.price)}</p>
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
        </section>

        {MENU.map((category) => {
          const img = IMAGES[category.id];
          return (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`${category.id}-title`}
              className="scroll-mt-24 border-b border-line py-14 last:border-0 md:py-20"
            >
              <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                <Reveal className="md:col-span-4">
                  <div className="md:sticky md:top-40">
                    <h2 id={`${category.id}-title`} className="display text-[2.5rem] text-brown md:text-[3.2rem]">
                      {category.label}
                    </h2>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{category.intro}</p>
                    {img && (
                      <div className="group relative mt-6 aspect-[16/10] overflow-hidden rounded-[var(--radius-image)] bg-sand md:aspect-[4/5]">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          sizes="(min-width: 768px) 30vw, 92vw"
                          className="zoom-img h-full w-full object-cover"
                          style={img.position ? { objectPosition: img.position } : undefined}
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
                <div className="md:col-span-8">
                  <div className="divide-y divide-line border-t border-line md:border-t-0">
                    {category.dishes.map((dish) => (
                      <div key={dish.id}>
                        <DishRow dish={dish} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <Reveal className="mt-6 flex flex-col items-start gap-5 rounded-[var(--radius-card)] bg-brown p-7 text-cream sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display text-[2.2rem] md:text-[2.8rem]">Vous hésitez&nbsp;?</h2>
            <p className="mt-2 max-w-lg text-cream/75">
              Dites-nous ce qui vous fait envie : un message WhatsApp suffit.
            </p>
          </div>
          <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary">
            <WhatsAppIcon size={20} /> Écrire sur WhatsApp
          </a>
        </Reveal>
      </div>
      <JsonLd data={menuLd} />
    </>
  );
}
