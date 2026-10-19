import { Hero } from "@/components/home/hero";
import { Dishes } from "@/components/home/dishes";
import { HowToOrder } from "@/components/home/how-to-order";
import { TikTokStory } from "@/components/home/tiktok-story";
import { EventSection } from "@/components/home/event";
import { Reviews } from "@/components/home/reviews";
import { Infos } from "@/components/home/infos";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Dishes />
      <HowToOrder />
      <TikTokStory />
      <EventSection />
      <Reviews />
      <Infos />
      <FinalCta />
    </>
  );
}
