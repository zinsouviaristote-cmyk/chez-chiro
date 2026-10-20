import type { Metadata } from "next";
import { MENU, PACK_BANGER } from "@/lib/menu";
import { SITE_URL } from "@/lib/site";
import { orderLink } from "@/lib/whatsapp";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { MenuOrderBar } from "@/components/menu/menu-order-bar";
import { StoreHeader } from "@/components/menu/store-header";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Menu et prix · Sauce gbota, wassa-wassa, poulet braisé",
  description:
    "Toute la carte Chez Chiro avec les prix en FCFA : sauces et pâtes, riz au gras, attiéké, wassa-wassa, poulet bicyclette braisé, chawarma, jus naturels. Ajoutez vos plats et envoyez la commande en un message sur WhatsApp.",
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu" },
};

const menuLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Menu Chez Chiro",
  url: `${SITE_URL}/menu`,
  inLanguage: "fr",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "Packs",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: PACK_BANGER.name,
          description: PACK_BANGER.description,
          offers: { "@type": "Offer", price: PACK_BANGER.price, priceCurrency: "XOF" },
        },
      ],
    },
    ...MENU.map((c) => ({
      "@type": "MenuSection",
      name: c.label,
      hasMenuItem: c.dishes.map((d) => ({
        "@type": "MenuItem",
        name: d.aside ? `${d.name} (${d.aside})` : d.name,
        description: d.description,
        offers: d.single
          ? { "@type": "Offer", price: d.price, priceCurrency: "XOF" }
          : {
              "@type": "AggregateOffer",
              lowPrice: Math.min(...d.levels),
              highPrice: Math.max(...d.levels),
              priceCurrency: "XOF",
            },
      })),
    })),
  ],
};

export default function MenuPage() {
  return (
    <>
      <StoreHeader />
      <MenuBrowser />

      <div className="container-site pb-16 md:pb-24">
        <Reveal className="flex flex-col items-start gap-5 rounded-lg bg-brown p-6 text-cream sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-heading">Besoin d&apos;un conseil pour choisir</h2>
            <p className="mt-2 max-w-lg text-subheading text-cream/75">
              Dites-nous ce qui vous fait envie : un message WhatsApp suffit.
            </p>
          </div>
          <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary">
            <WhatsAppIcon size={20} /> Écrire sur WhatsApp
          </a>
        </Reveal>
      </div>

      <MenuOrderBar />
      <JsonLd data={menuLd} />
    </>
  );
}
