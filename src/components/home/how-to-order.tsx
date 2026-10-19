import Image from "next/image";
import barquettesImg from "@/assets/images/barquettes-livraison.jpg";
import { PHONES } from "@/lib/site";
import { orderLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    title: "Choisissez",
    text: "Parcourez la carte et touchez « Commander » sur le plat qui vous fait envie.",
  },
  {
    title: "Envoyez",
    text: "WhatsApp s'ouvre avec votre message déjà écrit. Ajoutez votre quartier, puis envoyez.",
  },
  {
    title: "Régalez-vous",
    text: "On vous livre à Cotonou et à Abomey-Calavi. Vous payez à la livraison.",
  },
];

export function HowToOrder() {
  return (
    <section id="commander" aria-labelledby="order-title" className="section">
      <div className="container-site grid items-center gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <SectionHeading
            id="order-title"
            title="Trois étapes. Zéro formulaire."
            lead="Pas de compte à créer, pas de panier compliqué : un message suffit."
          />

          <Stagger as="ol" className="mt-8 space-y-3 md:mt-12">
            {STEPS.map((step, i) => (
              <StaggerItem
                as="li"
                key={step.title}
                className="flex items-start gap-4 rounded-lg bg-surface p-6 sm:gap-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-brown text-heading-sm text-cream">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-heading-sm text-ink">{step.title}</h3>
                  <p className="mt-1 text-body text-ink-soft">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary">
              <WhatsAppIcon size={20} />
              Commander maintenant
            </a>
            <p className="text-small text-ink-soft">
              WhatsApp : <strong className="text-ink">{PHONES.whatsapp.display}</strong>
            </p>
          </Reveal>
        </div>

        {/* Phone mock-up: shows the exact message the site pre-fills */}
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[24rem] pt-10 md:col-span-5 md:max-w-none md:pt-0">
          <div className="absolute right-0 top-0 aspect-[4/5] w-[62%] overflow-hidden rounded-lg md:-top-10 md:w-[64%]">
            <Image
              src={barquettesImg}
              alt="Barquettes de pâte rouge et poulet préparées dans la cuisine Chez Chiro"
              sizes="(min-width: 768px) 22vw, 60vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative mt-16 w-[82%] max-w-[19rem] overflow-hidden rounded-[2rem] border-[8px] border-brown bg-surface md:mt-24">
            <div className="flex items-center gap-3 bg-brown px-4 pb-3 pt-1.5 text-cream">
              <span className="grid size-9 place-items-center rounded-full bg-orange text-white">
                <WhatsAppIcon size={18} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Chez Chiro</p>
                <p className="text-xs text-cream/65">{PHONES.whatsapp.display}</p>
              </div>
            </div>
            <div className="p-3.5 pb-5">
              <div className="ml-auto w-[94%] rounded-lg rounded-tr-sm bg-[#d9f7c8] p-3.5 text-[0.8125rem] leading-relaxed text-ink">
                <p>Bonjour Chez Chiro 👋</p>
                <p>
                  Je voudrais commander : Sauce Gbota Royal (la tête de mouton) (à partir de 5&nbsp;000&nbsp;FCFA).
                </p>
                <p className="mt-2">Mon choix / accompagnement : akassa</p>
                <p>Quantité : 2</p>
                <p>Mon quartier : Godomey</p>
                <p className="mt-1 text-right text-[0.6875rem] text-ink/50">✓✓</p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-small text-ink-soft">Exemple : le message est prêt, il ne reste qu&apos;à l&apos;envoyer.</p>
        </Reveal>
      </div>
    </section>
  );
}
