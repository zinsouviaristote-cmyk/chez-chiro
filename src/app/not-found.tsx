import Link from "next/link";
import { orderLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section data-hero className="py-24 md:py-36">
      <div className="container-site max-w-3xl text-center">
        <p className="eyebrow text-brown">Page introuvable</p>
        <h1 className="display mt-5 text-[3.2rem] text-brown md:text-[5rem]">
          Cette marmite est <span className="accent text-orange">vide</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted">
          La page demandée n&apos;existe pas. La carte, elle, est bien garnie.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/menu" className="btn btn-dark">
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
