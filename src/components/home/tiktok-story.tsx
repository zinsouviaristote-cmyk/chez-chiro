import { SOCIALS } from "@/lib/site";
import { TIKTOK_VIDEOS } from "@/lib/tiktok";
import { TikTokIcon } from "../icons";
import { InView } from "../motion/in-view";
import { Carousel, CarouselContent, CarouselIndicator, CarouselItem } from "../ui/carousel";
import { TikTokPhone } from "./tiktok-phone";

export function TikTokStory() {
  return (
    <section id="tiktok" aria-labelledby="tiktok-title" className="section bg-brown text-cream">
      <div className="container-site">
        <InView className="max-w-2xl">
          <h2 id="tiktok-title" className="text-heading">
            Chez Chiro, en cuisine depuis près de dix ans
          </h2>
          <p className="mt-4 text-subheading text-cream/80">
            En 2022, la maison remporte le Barbecue d&apos;Or. Sur TikTok, 2,8 millions d&apos;abonnés suivent ses
            marmites et ses Food Challenges, avec 23 millions de j&apos;aime.
          </p>
          <a href={SOCIALS.tiktok.url} target="_blank" rel="noopener" className="btn btn-light mt-8">
            <TikTokIcon size={20} />
            Suivre {SOCIALS.tiktok.handle}
          </a>
        </InView>

        <InView className="mt-10 md:mt-14">
          <Carousel label="Vidéos TikTok de Chez Chiro">
            <CarouselContent className="-mx-4 scroll-px-4 gap-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
              {TIKTOK_VIDEOS.map((video) => (
                <CarouselItem key={video.id} className="w-[70%] sm:w-[42%] md:w-auto">
                  <TikTokPhone video={video} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselIndicator className="mt-3 text-cream md:hidden" />
          </Carousel>
        </InView>
      </div>
    </section>
  );
}
