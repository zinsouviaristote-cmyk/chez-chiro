import Image from "next/image";
import Link from "next/link";
import logoReversed from "@/assets/images/logo-reversed.png";
import { BRAND, EMAIL, HOURS, LOCATION, NAV, PHONES, SOCIALS } from "@/lib/site";
import { callLink, orderLink } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./icons";
import { LazyMap } from "./map/lazy-map";

const socials = [
  { href: SOCIALS.tiktok.url, label: "TikTok", Icon: TikTokIcon },
  { href: SOCIALS.facebook.url, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIALS.instagram.url, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIALS.whatsappChannel.url, label: "la chaîne WhatsApp", Icon: WhatsAppIcon },
];

export function SiteFooter() {
  return (
    <footer className="bg-brown pb-28 text-cream md:pb-0">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Image src={logoReversed} alt="Restaurant Chez Chiro" sizes="180px" className="h-16 w-auto" />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-cream/70">
            Cuisine béninoise faite maison, livrée à Cotonou et à Abomey-Calavi. Commandez sur WhatsApp, payez à la livraison.
          </p>
          <ul className="mt-7 flex gap-2.5">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Chez Chiro sur ${label}`}
                  className="grid size-11 place-items-center rounded-full border border-cream/20 text-cream transition duration-300 hover:-translate-y-0.5 hover:border-orange hover:bg-orange hover:text-white"
                >
                  <Icon size={19} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 md:col-span-8">
          <div>
            <h2 className="eyebrow text-orange">Commander</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem] max-md:mt-3 max-md:space-y-0">
              <li>
                <a href={orderLink()} target="_blank" rel="noopener" className="link-underline max-md:inline-flex max-md:min-h-11 max-md:items-center">
                  WhatsApp · {PHONES.whatsapp.display}
                </a>
              </li>
              <li>
                <a href={callLink} className="link-underline max-md:inline-flex max-md:min-h-11 max-md:items-center">
                  Appel · {PHONES.call.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="link-underline max-md:inline-flex max-md:min-h-11 max-md:items-center">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-orange">Horaires</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                {HOURS.days}, {HOURS.open}
              </li>
              <li>{HOURS.delivery}</li>
              <li>Paiement à la livraison</li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-orange">Nous trouver</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>{LOCATION.label}</li>
              <li>
                <LazyMap mode="preview" className="h-32 w-full max-w-[16rem] bg-cream/10" />
              </li>
            </ul>
            <nav aria-label="Pied de page" className="mt-8">
              <ul className="space-y-2 text-[0.9375rem] text-cream/70 max-md:space-y-0">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline hover:text-cream max-md:inline-flex max-md:min-h-11 max-md:min-w-11 max-md:items-center">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col gap-2 py-6 text-[0.8125rem] text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {BRAND.legalName} · RCCM {BRAND.rccm}
          </p>
          <p>Prix en FCFA, à titre indicatif. Le total vous est confirmé à la commande.</p>
        </div>
      </div>
    </footer>
  );
}
