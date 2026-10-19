import Link from "next/link";
import { orderLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section data-hero className="py-20 md:py-32">
      <div className="container-site">
        <p className="text-small font-bold text-ink-soft">Erreur 404</p>
        <h1 className="mt-2 max-w-3xl text-display text-ink">
          Cette page n&apos;existe pas.
        </h1>
        <p className="mt-5 max-w-md text-subheading text-ink-soft">
          Le lien est peut-être ancien. La carte, elle, est bien là.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/menu" className="btn btn-secondary">
            Voir le menu
          </Link>
          <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary">
            <WhatsAppIcon size={19} /> Commander
          </a>
        </div>
      </div>
    </section>
  );
}
