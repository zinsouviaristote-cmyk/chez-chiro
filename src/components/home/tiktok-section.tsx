import { SOCIALS } from "@/lib/site";
import { TIKTOK_VIDEOS } from "@/lib/tiktok";
import { TikTokIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { TikTokPhone } from "./tiktok-phone";

export function TikTokSection() {
  return (
    <section aria-labelledby="tiktok-title" className="section bg-brown text-cream">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <h2 id="tiktok-title" className="text-heading">
              2,8 millions de personnes regardent ce qu&apos;on cuisine.
            </h2>
            <p className="mt-4 max-w-2xl text-subheading text-cream/75">
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
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:mt-12 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0"
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

        <Reveal className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-8 text-small text-cream/70 md:mt-12">
          <p>
            <strong className="mr-2 text-heading-sm text-cream">2,8 M</strong> abonnés
          </p>
          <p>
            <strong className="mr-2 text-heading-sm text-cream">23 M</strong> j&apos;aime
          </p>
          <p className="flex items-center">
            Nos séries : Food Challenge Chez Chiro · Nos Festivals Culinaires · Chez Chiro Talk
          </p>
        </Reveal>
      </div>
    </section>
  );
}
