import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileOrderBar } from "@/components/mobile-order-bar";
import { JsonLd } from "@/components/json-ld";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { BRAND, EMAIL, LOCATION, PHONES, SITE_URL, SOCIALS } from "@/lib/site";

// Bricolage Grotesque (Google Fonts, OFL), self-hosted through next/font/local:
// the single display instance we use (96pt optical size, weight 500, latin)
// weighs 22 KB instead of 77 KB for the full variable font.
const display = localFont({
  src: "../assets/fonts/bricolage-grotesque-96pt-500-latin.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument-serif",
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
    <html lang="fr" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body className="min-h-dvh">
        <noscript>
          <style>{`[data-reveal],[data-item]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brown focus:px-5 focus:py-3 focus:text-cream"
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

