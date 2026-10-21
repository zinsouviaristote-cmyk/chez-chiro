import type { CSSProperties } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import heroDesktop from "@/assets/images/hero-ia-desktop.jpg";
import heroMobile from "@/assets/images/hero-ia-mobile.jpg";
import { GOOGLE, SOCIALS } from "@/lib/site";
import { orderLink } from "@/lib/whatsapp";
import { cn, formatCompact } from "@/lib/utils";
import { FacebookIcon, StarIcon, TikTokIcon, TrophyIcon, WhatsAppIcon } from "../icons";
import { HeroWordLoop } from "./hero-word-loop";

// The moments Chez Chiro cooks for. Never a dish name: the photo shows one dish.
const MOMENTS = ["déjeuner", "dîner", "repas de famille", "repas d'équipe"];

const ALT =
  "Plateau de poulet bicyclette braisé garni de tomates, d'oignons et de piment vert, avec poisson braisé, alloco et piment";

// Next never enlarges an image: a width above the file's own is served at the
// file's width, so the srcset says so and keeps a single entry for it.
function nativeSrcSet(srcSet: string | undefined, width: number) {
  const seen = new Set<number>();
  return srcSet
    ?.split(", ")
    .flatMap((candidate) => {
      const [url, w] = candidate.split(" ");
      const actual = Math.min(parseInt(w), width);
      if (seen.has(actual)) return [];
      seen.add(actual);
      return [`${url} ${actual}w`];
    })
    .join(", ");
}

// Static numbers: never animated (the old counter showed "1,8/5" mid-run).
const PROOF = [
  { value: `${GOOGLE.rating.toLocaleString("fr-FR")}/5`, label: `Google · ${GOOGLE.count} avis`, Icon: StarIcon, icon: "text-spark" },
  { value: formatCompact(SOCIALS.tiktok.followers), label: "abonnés TikTok", Icon: TikTokIcon },
  { value: formatCompact(SOCIALS.facebook.followers), label: "abonnés Facebook", Icon: FacebookIcon },
  { value: "Barbecue d'Or", label: "Lauréat 2022", Icon: TrophyIcon },
];

// Hairlines: 2 × 2 grid on mobile, 4 columns from md. Content centred, like the hero.
const CELL = [
  "border-r",
  "md:border-r",
  "border-r border-t md:border-t-0",
  "border-t md:border-t-0",
];

const delay = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;
const word = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  // Art direction: the wide frame from 768px, a portrait crop on the chicken
  // tray below. Both are preloaded with a media query, so each device fetches
  // one file. Both files are the AI image at its native size (1672 × 941).
  const common = { alt: ALT, loading: "eager", fetchPriority: "high", sizes: "100vw", quality: 60 } as const;
  const {
    props: { srcSet: desktopAll, src: desktopSrc },
  } = getImageProps({ ...common, src: heroDesktop });
  const {
    props: { srcSet: mobileAll, ...img },
  } = getImageProps({ ...common, src: heroMobile });
  const desktopSrcSet = nativeSrcSet(desktopAll, heroDesktop.width);
  const mobileSrcSet = nativeSrcSet(mobileAll, heroMobile.width);

  preload(img.src, {
    as: "image",
    imageSrcSet: mobileSrcSet,
    imageSizes: "100vw",
    fetchPriority: "high",
    media: "(max-width: 767px)",
  });
  preload(desktopSrc, {
    as: "image",
    imageSrcSet: desktopSrcSet,
    imageSizes: "100vw",
    fetchPriority: "high",
    media: "(min-width: 768px)",
  });

  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-7.3125rem)] flex-col overflow-hidden bg-brown text-cream md:min-h-[85vh]"
    >
      <div className="absolute inset-0 -z-10">
        <div className="ken-burns absolute inset-0">
          <picture>
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
            <img {...img} srcSet={mobileSrcSet} alt={ALT} className="h-full w-full object-cover" />
          </picture>
        </div>
        {/* Brown overlay over the AI photo: darker on phones, where the text sits on the chicken tray. */}
        <div aria-hidden className="absolute inset-0 bg-brown/80 md:bg-brown/55" />
      </div>

      <div className="container-site flex flex-1 flex-col items-center justify-center pb-12 pt-14 text-center md:pb-16 md:pt-20">
        <h1 id="hero-title" className="text-display">
          <span className="sr-only">
            Votre déjeuner, votre dîner, votre repas de famille ou votre repas d&apos;équipe, signé Chez Chiro.
          </span>
          <span aria-hidden className="block">
            <span className="block">
              <span className="hero-word" style={word(0)}>
                Votre
              </span>
            </span>
            <span className="block">
              <span className="hero-word w-full" style={word(1)}>
                <HeroWordLoop words={MOMENTS} />
              </span>
            </span>
            <span className="block">
              {["signé", "Chez", "Chiro."].map((w, i) => (
                <span key={w}>
                  <span className="hero-word" style={word(i + 2)}>
                    {w}
                  </span>
                  {i < 2 && " "}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <p className="hero-fade mt-5 max-w-[40rem] text-subheading text-cream/90 md:mt-6" style={delay(0.4)}>
          <span className="md:block">Cuisine béninoise faite maison, livrée à Cotonou et Abomey-Calavi.</span>{" "}
          <span className="md:block">Un message WhatsApp suffit, vous payez à la livraison.</span>
        </p>

        <div
          className="hero-fade mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row md:mt-10"
          style={delay(0.5)}
        >
          <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary">
            <WhatsAppIcon size={22} />
            Commander sur WhatsApp
          </a>
          <Link href="/menu" className="btn btn-light">
            Voir la carte
          </Link>
        </div>
      </div>

      {/* Proof bar: a flat brown band along the bottom edge (surface step, no gradient) */}
      <div className="hero-fade border-t border-cream/15 bg-brown/60" style={delay(0.6)}>
        <ul aria-label="Chez Chiro en quelques chiffres" className="container-site grid grid-cols-2 md:grid-cols-4">
          {PROOF.map(({ value, label, Icon, icon }, i) => (
            <li
              key={label}
              className={cn("flex flex-col items-center gap-1 border-cream/15 px-2 py-4 text-center md:px-6 md:py-6", CELL[i])}
            >
              <span className="text-[1.25rem] font-bold leading-tight md:text-heading-sm">{value}</span>
              <span className="flex items-center justify-center gap-1.5 text-small text-cream/85">
                <Icon size={15} className={cn("shrink-0", icon)} />
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
