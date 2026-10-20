import Image from "next/image";
import bannerImg from "@/assets/images/hero-poulet-desktop.jpg";
import logoMark from "@/assets/images/logo-mark.png";
import { DELIVERY_ZONES, GOOGLE } from "@/lib/site";
import { formatFcfa } from "@/lib/utils";
import { StarIcon } from "../icons";
import { MenuSearch } from "./menu-search";

const minDelivery = Math.min(...DELIVERY_ZONES.map((z) => z.standard.price));

/**
 * Store header, Uber Eats style: wide banner (image slot "Menu — bannière",
 * IMAGES.md), logo tile over its edge, the name, one meta line and the search.
 */
export function StoreHeader() {
  const rating = (
    <>
      <span className="font-bold text-ink">{GOOGLE.rating.toLocaleString("fr-FR")}</span>
      <StarIcon size={16} className="ml-1 mr-1.5 text-spark" />
      <span className="sr-only">sur 5 </span>({GOOGLE.count} avis Google)
    </>
  );
  const meta = [rating, `Livraison dès ${formatFcfa(minDelivery)}`, "9h–20h", "Paiement à la livraison"];
  return (
    <section data-hero aria-labelledby="menu-title" className="pb-6 md:pb-8 md:pt-6">
      <div className="mx-auto max-w-[calc(1200px+4rem)] md:px-8">
        <div className="relative h-44 overflow-hidden bg-brown sm:h-56 md:h-72 md:rounded-lg">
          <Image
            src={bannerImg}
            alt="Poulet bicyclette braisé Chez Chiro, garni de tomates, d'oignons et de piment vert"
            fill
            priority
            fetchPriority="high"
            quality={60}
            sizes="(min-width: 1264px) 1200px, 100vw"
            className="object-cover object-[50%_45%]"
          />
        </div>
      </div>

      <div className="container-site">
        <div className="relative -mt-10 grid size-20 place-items-center rounded-lg border-4 border-cream bg-cream md:-mt-12 md:size-24">
          <Image src={logoMark} alt="" sizes="88px" className="size-full object-contain p-1" />
        </div>

        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <h1 id="menu-title" className="text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink md:text-[3rem]">
              Chez Chiro
            </h1>
            {/* Each separator stays with the item before it: a wrapped line never starts with "·" */}
            <p className="mt-3 flex flex-wrap items-center text-[0.9375rem] text-ink-soft md:text-body">
              {meta.map((item, i) => (
                <span key={i} className="inline-flex items-center whitespace-nowrap">
                  {item}
                  {i < meta.length - 1 && (
                    <span aria-hidden className="mx-2 text-ink/30">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
          <MenuSearch />
        </div>
      </div>
    </section>
  );
}
