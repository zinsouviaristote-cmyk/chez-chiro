import Image from "next/image";
import choukouyaImg from "@/assets/images/choukouya-festival.jpg";
import polaroidImg from "@/assets/images/barbecue-or-2022-polaroid.jpg";
import { SOCIALS } from "@/lib/site";
import { ArrowUpRightIcon } from "../icons";
import { Reveal } from "../motion/reveal";

export function Story() {
  return (
    <section aria-labelledby="story-title" className="bg-peach py-20 md:py-28">
      <div className="container-site grid items-center gap-14 md:grid-cols-12 md:gap-12">
        <Reveal className="relative md:col-span-6">
          <div className="relative aspect-[4/5] w-[86%] overflow-hidden rounded-[var(--radius-image)] shadow-[var(--shadow-soft)]">
            <Image
              src={choukouyaImg}
              alt="Choukouya de mouton sur le grill, un soir de festival"
              sizes="(min-width: 768px) 40vw, 80vw"
              className="h-full w-full object-cover"
            />
          </div>
          <figure className="absolute -bottom-8 right-0 w-[48%] rotate-[4deg] rounded-md bg-white p-2 pb-3 shadow-[var(--shadow-lift)] transition-transform duration-700 hover:rotate-0 md:-bottom-10">
            <Image
              src={polaroidImg}
              alt="L'équipe Chez Chiro sur scène avec les cadres du Barbecue d'Or, Festizik Cotonou Barbecue 2022"
              sizes="(min-width: 768px) 22vw, 45vw"
              className="h-auto w-full rounded-sm"
            />
            <figcaption className="sr-only">Barbecue d&apos;Or, Festizik Cotonou Barbecue 2022</figcaption>
          </figure>
        </Reveal>

        <div className="md:col-span-6 md:pl-4">
          <Reveal>
            <p className="eyebrow text-brown">Notre histoire</p>
            <h2 id="story-title" className="display mt-4 text-[2.6rem] text-brown sm:text-[3.2rem] md:text-[4rem]">
              Près de 10 ans de marmites. Un <span className="accent text-orange-deep">Barbecue d&apos;Or</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="mt-8">
              <blockquote className="accent text-[1.55rem] leading-snug text-brown md:text-[1.85rem]">
                « Chez Chiro, c&apos;était déjà des années de cuisine, de rencontres, de festivals et surtout, de
                personnes qui nous faisaient confiance. »
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">Chez Chiro, sur TikTok</figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.14}>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-brown/10 sm:grid-cols-2">
              <div className="bg-peach p-5 sm:pr-6">
                <dt className="eyebrow text-[0.75rem] text-muted">2022</dt>
                <dd className="mt-2 font-bold text-brown">Barbecue d&apos;Or au Festizik Cotonou Barbecue</dd>
              </div>
              <div className="bg-peach p-5 sm:pl-6">
                <dt className="eyebrow text-[0.75rem] text-muted">Sur TikTok</dt>
                <dd className="mt-2 font-bold text-brown">Food Challenge, Festivals culinaires, Chez Chiro Talk</dd>
              </div>
            </dl>
            <a
              href={SOCIALS.tiktok.url}
              target="_blank"
              rel="noopener"
              className="link-arrow mt-8"
            >
              Voir les coulisses sur TikTok <ArrowUpRightIcon size={17} className="arrow" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
