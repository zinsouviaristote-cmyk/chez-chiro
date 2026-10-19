import { orderLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../icons";
import { AnimatedGroup, InView } from "../motion/in-view";

const STEPS = [
  {
    title: "Choisissez un plat",
    text: "Touchez « Commander » : WhatsApp s'ouvre avec le nom du plat déjà écrit.",
  },
  {
    title: "Précisez la commande",
    text: "Ajoutez l'accompagnement, la quantité et votre quartier, puis envoyez.",
  },
  {
    title: "Payez à la réception",
    text: "On vous confirme le total. Vous réglez le livreur quand le repas arrive.",
  },
];

// Exactly what the site pre-fills (see dishOrderLink), with an example filled in.
const MESSAGE = [
  "Bonjour Chez Chiro 👋",
  "Je voudrais commander : Attiéké (à partir de 3 000 FCFA).",
  "",
  "Mon choix / accompagnement : poisson tilapia",
  "Quantité : 2",
  "Mon quartier : Godomey",
];

export function HowToOrder() {
  return (
    <section id="commander" aria-labelledby="order-title" className="section bg-surface">
      <div className="container-site grid gap-10 md:grid-cols-12 md:items-center md:gap-12">
        <div className="md:col-span-8">
          <InView>
            <h2 id="order-title" className="max-w-xl text-heading text-ink">
              Commandez en trois étapes, sur WhatsApp
            </h2>
          </InView>

          {/* Mobile: vertical timeline. Desktop: one row, joined by a hairline. */}
          <AnimatedGroup as="ol" className="mt-8 md:mt-10 md:grid md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative pb-7 pl-11 last:pb-0 md:pb-0 md:pl-0 md:pt-11">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 grid size-7 place-items-center rounded-full bg-brown text-caption font-bold text-cream"
                >
                  {i + 1}
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-3.5 top-9 w-px bg-ink/15 md:bottom-auto md:left-10 md:right-[-2rem] md:top-3.5 md:h-px md:w-auto"
                  />
                )}
                <h3 className="text-subheading font-bold text-ink">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {step.title}
                </h3>
                <p className="mt-1 text-body text-ink-soft">{step.text}</p>
              </li>
            ))}
          </AnimatedGroup>

          <InView className="mt-8 md:mt-10">
            <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary">
              <WhatsAppIcon size={22} />
              Commander sur WhatsApp
            </a>
          </InView>
        </div>

        {/* The message the site pre-fills, as it lands in WhatsApp */}
        <InView as="figure" delay={0.1} className="md:col-span-4">
          <div className="mx-auto max-w-[22rem] overflow-hidden rounded-lg border border-line bg-cream">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="grid size-8 place-items-center rounded-full bg-orange text-white">
                <WhatsAppIcon size={16} />
              </span>
              <p className="text-small font-bold text-ink">Chez Chiro</p>
            </div>
            <div className="p-4">
              <div className="ml-auto w-[92%] rounded-lg rounded-tr-sm bg-[#dcf3cf] px-3.5 py-3 text-small text-ink">
                {MESSAGE.map((line, i) => (line ? <p key={i}>{line}</p> : <p key={i} aria-hidden className="h-2" />))}
              </div>
            </div>
          </div>
          <figcaption className="mx-auto mt-3 max-w-[22rem] text-small text-ink-soft">
            Exemple : le message est prêt, il ne reste qu&apos;à l&apos;envoyer.
          </figcaption>
        </InView>
      </div>
    </section>
  );
}
