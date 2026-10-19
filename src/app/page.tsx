import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { Proof } from "@/components/home/proof";
import { Signatures } from "@/components/home/signatures";
import { MenuPreview } from "@/components/home/menu-preview";
import { HowToOrder } from "@/components/home/how-to-order";
import { TikTokSection } from "@/components/home/tiktok-section";
import { Story } from "@/components/home/story";
import { EventSection } from "@/components/home/event";
import { Reviews } from "@/components/home/reviews";
import { Infos } from "@/components/home/infos";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Proof />
      <Signatures />
      <MenuPreview />
      <HowToOrder />
      <TikTokSection />
      <Story />
      <EventSection />
      <Reviews />
      <Infos />
      <FinalCta />
    </>
  );
}
