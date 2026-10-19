import type { StaticImageData } from "next/image";
import c1 from "@/assets/images/tiktok-7558439966552935691.jpg";
import c2 from "@/assets/images/tiktok-7634944240405056786.jpg";
import c3 from "@/assets/images/tiktok-7595186991277296952.jpg";
import c4 from "@/assets/images/tiktok-7556231244745411851.jpg";

// Four most-viewed public videos on @restauchezchiro ("Populaire" tab,
// 19 Oct 2026). View counts as displayed by TikTok that day.
export type TikTokVideo = {
  id: string;
  title: string;
  views: string;
  cover: StaticImageData;
  alt: string;
};

export const TIKTOK_VIDEOS: TikTokVideo[] = [
  {
    id: "7558439966552935691",
    title: "Food Challenge Chez Chiro, partie 1",
    views: "12 M",
    cover: c1,
    alt: "Une assiette garnie d'aloco tenue devant la bannière Food Challenge Chez Chiro",
  },
  {
    id: "7634944240405056786",
    title: "Food Challenge Chez Chiro, partie 1",
    views: "10,9 M",
    cover: c2,
    alt: "Une assiette d'attiéké, poisson et aloco tenue devant la bannière Food Challenge",
  },
  {
    id: "7595186991277296952",
    title: "Food Challenge Chez Chiro",
    views: "8,3 M",
    cover: c3,
    alt: "Une assiette de pâte et sauce tenue devant la bannière Food Challenge",
  },
  {
    id: "7556231244745411851",
    title: "Food Challenge Chez Chiro, partie 2",
    views: "6,8 M",
    cover: c4,
    alt: "Une assiette garnie de poisson et d'aloco tenue devant la bannière Food Challenge",
  },
];
