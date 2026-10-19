import { SOCIALS } from "@/lib/site";
import { TIKTOK_VIDEOS } from "@/lib/tiktok";
import { TikTokIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { TikTokPhone } from "./tiktok-phone";

export function TikTokSection() {
  return (
    <section aria-labelledby="tiktok-title" className="relative overflow-hidden bg-brown py-20 text-cream md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 bottom-24 hidden size-[34rem] md:block rounded-full border-[3px] border-orange/20"
      />
      <div className="container-site relative">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <p className="eyebrow text-orange">En direct de nos marmites</p>
            <h2 id="tiktok-title" className="display mt-4 text-[2.6rem] sm:text-[3.2rem] md:text-[4.25rem]">
              2,8 millions de personnes regardent <span className="accent text-orange">ce qu&apos;on cuisine</span>.
            </h2>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-cream/75 md:text-lg">
              Food Challenge, festivals culinaires, coulisses de la cuisine : tout se passe sur TikTok. Touchez une
              vidéo pour la lancer.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:justify-self-end">
            <a href={SOCIALS.tiktok.url} target="_blank" rel="noopener" className="btn btn-primary">
              <TikTokIcon size={19} />
              Suivre {SOCIALS.tiktok.handle}
            </a>
          </Reveal>
        </div>

        <Stagger
          as="ul"
          stagger={0.1}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-16 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0"
        >
          {TIKTOK_VIDEOS.map((video, i) => (
            <StaggerItem
              as="li"
              key={video.id}
              className={i % 2 === 1 ? "w-[64%] shrink-0 snap-center sm:w-[40%] md:mt-12 md:w-auto" : "w-[64%] shrink-0 snap-center sm:w-[40%] md:w-auto"}
            >
              <TikTokPhone video={video} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-8 text-sm text-cream/70 md:mt-16">
          <p>
            <strong className="display mr-2 text-2xl text-cream">2,8 M</strong> abonnés
          </p>
          <p>
            <strong className="display mr-2 text-2xl text-cream">23 M</strong> j&apos;aime
          </p>
          <p className="flex items-center">
            Nos séries : Food Challenge Chez Chiro · Nos Festivals Culinaires · Chez Chiro Talk
          </p>
        </Reveal>
      </div>
    </section>
  );
}
