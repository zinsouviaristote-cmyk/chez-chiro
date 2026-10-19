import Image from "next/image";
import choukouyaImg from "@/assets/images/choukouya-festival.jpg";
import polaroidImg from "@/assets/images/barbecue-or-2022-polaroid.jpg";
import { SOCIALS } from "@/lib/site";
import { ArrowUpRightIcon } from "../icons";
import { Reveal } from "../motion/reveal";

export function Story() {
  return (
    <section aria-labelledby="story-title" className="section bg-surface">
      <div className="container-site grid items-center gap-14 md:grid-cols-12 md:gap-12">
        <Reveal className="relative md:col-span-6">
          <div className="relative aspect-[4/5] w-[86%] overflow-hidden rounded-lg">
            <Image
              src={choukouyaImg}
              alt="Choukouya de mouton sur le grill, un soir de festival"
              sizes="(min-width: 768px) 40vw, 80vw"
              className="h-full w-full object-cover"
            />
          </div>
          <figure className="absolute -bottom-8 right-0 w-[48%] rounded-lg bg-surface p-1.5 md:-bottom-10">
            <Image
              src={polaroidImg}
              alt="L'équipe Chez Chiro sur scène avec les cadres du Barbecue d'Or, Festizik Cotonou Barbecue 2022"
              sizes="(min-width: 768px) 22vw, 45vw"
              className="h-auto w-full rounded-md"
            />
            <figcaption className="sr-only">Barbecue d&apos;Or, Festizik Cotonou Barbecue 2022</figcaption>
          </figure>
        </Reveal>

        <div className="md:col-span-6 md:pl-4">
          <Reveal>
            <h2 id="story-title" className="text-heading text-ink">
              Près de 10 ans de marmites. Un Barbecue d&apos;Or.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="mt-8">
              <blockquote className="border-l-2 border-orange pl-5 text-subheading text-ink">
                « Chez Chiro, c&apos;était déjà des années de cuisine, de rencontres, de festivals et surtout, de
                personnes qui nous faisaient confiance. »
              </blockquote>
              <figcaption className="mt-3 pl-5 text-small text-ink-soft">Chez Chiro, sur TikTok</figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.14}>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2">
              <div className="bg-cream p-6">
                <dt className="text-caption font-bold uppercase tracking-[0.08em] text-ink-soft">2022</dt>
                <dd className="mt-1 font-bold text-ink">Barbecue d&apos;Or au Festizik Cotonou Barbecue</dd>
              </div>
              <div className="bg-cream p-6">
                <dt className="text-caption font-bold uppercase tracking-[0.08em] text-ink-soft">Sur TikTok</dt>
                <dd className="mt-1 font-bold text-ink">Food Challenge, Festivals culinaires, Chez Chiro Talk</dd>
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
