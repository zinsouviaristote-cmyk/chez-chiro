import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/images/hero-poulet-bicyclette.jpg";
import { GOOGLE } from "@/lib/site";
import { dishOrderLink, orderLink } from "@/lib/whatsapp";
import { formatFcfa } from "@/lib/utils";
import { ArrowRightIcon, StarIcon, TikTokIcon, WhatsAppIcon } from "../icons";
import { AwardSeal } from "./award-seal";

function ProofRow({ className }: { className?: string }) {
  return (
    <ul className={`flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-brown ${className ?? ""}`}>
      <li className="flex items-center gap-2">
        <span className="flex text-spark" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} size={15} />
          ))}
        </span>
        <span>
          <strong className="font-bold">{GOOGLE.rating.toLocaleString("fr-FR")}</strong> sur Google · {GOOGLE.count}{" "}
          avis
        </span>
      </li>
      <li className="flex items-center gap-2">
        <TikTokIcon size={16} />
        <span>
          <strong className="font-bold">2,8 M</strong> d&apos;abonnés TikTok
        </span>
      </li>
    </ul>
  );
}

export function Hero() {
  return (
    <section data-hero className="relative overflow-hidden pb-12 pt-4 md:pb-24 md:pt-10">
      <div className="container-site grid items-center gap-7 md:grid-cols-12 md:gap-8 lg:gap-14">
        <div className="md:col-span-6 lg:col-span-6">
          <p className="eyebrow flex items-center gap-2 text-brown">
            <span className="inline-block size-1.5 rounded-full bg-spark" />
            Cuisine béninoise · Cotonou & Calavi
          </p>

          <h1 className="display mt-4 text-[3.65rem] md:mt-5 text-brown sm:text-[4.6rem] md:text-[5.2rem] lg:text-[7rem]">
            Ça <span className="accent text-orange">mijote</span>
            <br />
            chez Chiro.
          </h1>

          <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-muted md:mt-6 md:text-lg">
            Sauce gbota, wassa-wassa, poulet bicyclette braisé… La cuisine de la maison, livrée chez vous ou au
            bureau, à Cotonou et Abomey-Calavi.
          </p>

          <div className="mt-7 flex items-center gap-2.5 sm:gap-5 md:mt-8">
            <a
              href={orderLink()}
              target="_blank"
              rel="noopener"
              className="btn btn-primary flex-1 px-4 sm:flex-none sm:px-6 sm:text-[1.0625rem]"
            >
              <WhatsAppIcon size={21} />
              <span className="sm:hidden">Commander</span>
              <span className="hidden sm:inline">Commander sur WhatsApp</span>
            </a>
            <Link href="/menu" className="btn btn-outline flex-1 px-4 sm:hidden">
              Voir le menu
            </Link>
            <Link href="/menu" className="link-arrow hidden py-2 sm:inline-flex">
              Voir le menu et les prix <ArrowRightIcon size={18} className="arrow" />
            </Link>
          </div>

          <ProofRow className="mt-9 hidden md:flex" />
        </div>

        <div className="md:col-span-6">
          <div className="relative">
          <div className="relative aspect-[6/5] overflow-hidden rounded-[1.75rem] sm:aspect-[4/5] bg-sand shadow-[var(--shadow-lift)] md:rounded-[2.25rem]">
            <Image
              src={heroImg}
              alt="Poulet bicyclette braisé Chez Chiro, garni de tomates, d'oignons et de piment vert"
              preload
              quality={60}
              placeholder="blur"
              sizes="(min-width: 1216px) 560px, (min-width: 768px) 48vw, 92vw"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brown/45 to-transparent" />
          </div>

          <a
            href={dishOrderLink("Poulet bicyclette braisé complet", 6000, true)}
            target="_blank"
            rel="noopener"
            className="group absolute bottom-3 left-3 flex items-center justify-between gap-3 rounded-full bg-cream/95 py-1.5 pl-4 pr-1.5 shadow-[var(--shadow-soft)] backdrop-blur transition duration-500 hover:-translate-y-1 sm:bottom-4 sm:left-4 sm:min-w-[19rem] sm:rounded-2xl sm:p-3.5 sm:pl-4 md:-left-6 md:bottom-8"
          >
            <span>
              <span className="block text-[0.95rem] font-bold leading-tight text-brown">
                Poulet bicyclette braisé
              </span>
              <span className="mt-0.5 block text-[0.8125rem] text-muted sm:text-sm">
                <span className="hidden sm:inline">Entier, sans accompagnement · </span>
                {formatFcfa(6000)}
              </span>
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange sm:size-11 text-brown transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
              <WhatsAppIcon size={20} />
              <span className="sr-only">Commander ce plat</span>
            </span>
          </a>

          <AwardSeal className="absolute -right-1 -top-6 md:-right-7 md:-top-7" />
          </div>
          <ProofRow className="mt-6 flex md:hidden" />
        </div>
      </div>
    </section>
  );
}
