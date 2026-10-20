import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileOrderBar } from "@/components/mobile-order-bar";
import { JsonLd } from "@/components/json-ld";
import { IconSprite } from "@/components/icons";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { BRAND, EMAIL, LOCATION, PHONES, SITE_URL, SOCIALS } from "@/lib/site";

// One family for everything: Figtree (OFL), the closest free match to
// Uber Move / Uber Move Text. One variable file (latin) covers 400, 500 and 700.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const description =
  "Sauce gbota, wassa-wassa, poulet bicyclette braisé, attiéké… La cuisine béninoise de Chez Chiro, livrée à Cotonou et Abomey-Calavi. Commande sur WhatsApp, paiement à la livraison, tous les jours de 9h à 20h.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chez Chiro · Cuisine béninoise livrée à Cotonou et Calavi",
    template: "%s · Chez Chiro",
  },
  description,
  applicationName: BRAND.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: BRAND.fullName,
    title: "Chez Chiro · Cuisine béninoise livrée à Cotonou et Calavi",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Chez Chiro · Cuisine béninoise livrée à Cotonou et Calavi",
    description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FDFBF1",
  width: "device-width",
  initialScale: 1,
};

const restaurantLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: BRAND.fullName,
  alternateName: [BRAND.name, BRAND.legalName],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  description,
  telephone: `+${PHONES.whatsapp.e164}`,
  email: EMAIL,
  servesCuisine: ["Béninoise", "Africaine de l'Ouest"],
  priceRange: "500 – 12 000 FCFA",
  currenciesAccepted: "XOF",
  paymentAccepted: "Paiement à la livraison",
  hasMenu: `${SITE_URL}/menu`,
  hasMap: LOCATION.mapsUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Godomey",
    addressRegion: "Abomey-Calavi",
    addressCountry: "BJ",
  },
  areaServed: ["Cotonou", "Abomey-Calavi"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Commandes (WhatsApp)",
      telephone: `+${PHONES.whatsapp.e164}`,
      availableLanguage: "fr",
    },
    {
      "@type": "ContactPoint",
      contactType: "Commandes (appel)",
      telephone: PHONES.call.tel,
      availableLanguage: "fr",
    },
  ],
  sameAs: [SOCIALS.tiktok.url, SOCIALS.facebook.url, SOCIALS.instagram.url, SOCIALS.whatsappChannel.url],
  acceptsReservations: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={figtree.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh">
        <IconSprite />
        <noscript>
          <style>{`[data-reveal],[data-group]>*,[data-item],.chat .chat-anim{opacity:1!important;transform:none!important}.chat .chat-typing{opacity:0!important}`}</style>
        </noscript>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brown focus:px-5 focus:py-3 focus:text-cream"
        >
          Aller au contenu
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <MobileOrderBar />
        <RevealObserver />
        <JsonLd data={restaurantLd} />
      </body>
    </html>
  );
}

