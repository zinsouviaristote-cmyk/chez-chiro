import Image from "next/image";
import logoMark from "@/assets/images/logo-mark.png";
import { PHONES } from "@/lib/site";
import { formatFcfa } from "@/lib/utils";
import { orderLink } from "@/lib/whatsapp";
import { CheckDoubleIcon, SendIcon, WhatsAppIcon } from "../icons";
import { InView } from "../motion/in-view";
import { PlayOnView } from "../motion/play-on-view";

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

// Exactly what the site pre-fills for a dish (see dishOrderLink), filled in as a customer would.
const MESSAGE = [
  "Bonjour Chez Chiro 👋",
  `Je voudrais commander : Attiéké (à partir de ${formatFcfa(3000)}).`,
  "",
  "Mon choix / accompagnement : poulet bicyclette",
  "Quantité : 2",
  "Mon quartier : Akassato",
];

// Step 3 of the page, nothing more: no price, no delivery time.
const REPLY = ["Commande bien reçue, merci 🙏", "Nous vous confirmons le total et la livraison. Vous réglez le livreur à la réception."];

function Time({ children }: { children: string }) {
  return <span className="text-[0.6875rem] tabular-nums text-ink-soft">{children}</span>;
}

/** The conversation as it lands in WhatsApp. Plays once in view (CSS, ~3 s); static with reduced motion. */
function ChatPreview() {
  return (
    <PlayOnView className="chat flex h-full flex-col overflow-hidden rounded-lg border border-line">
      <div className="flex items-center gap-3 bg-brown px-4 py-3 text-cream">
        <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-cream">
          <Image src={logoMark} alt="" sizes="40px" className="size-8 object-contain" />
        </span>
        <span className="min-w-0">
          <span className="block font-bold leading-tight">Chez Chiro</span>
          <span className="block text-caption tabular-nums text-cream/72">{PHONES.whatsapp.display}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 bg-chat px-3 py-4 sm:px-4">
        <span className="mx-auto mb-auto rounded-lg bg-cream px-2.5 py-1 text-caption text-ink-soft">Aujourd&apos;hui</span>

        <div className="chat-anim chat-out bubble-out mt-4 ml-auto max-w-[88%] rounded-lg rounded-tr-none bg-wa-out px-3 pb-1.5 pt-2 text-[0.9375rem] leading-snug text-ink">
          {MESSAGE.map((line, i) => (line ? <p key={i}>{line}</p> : <p key={i} aria-hidden className="h-2" />))}
          <p className="mt-1 flex items-center justify-end gap-1">
            <Time>12:04</Time>
            <span className="relative inline-grid" aria-label="Lu" role="img">
              <CheckDoubleIcon size={16} className="col-start-1 row-start-1 text-ink-soft/70" />
              <CheckDoubleIcon size={16} className="chat-anim chat-read col-start-1 row-start-1 text-[#53BDEB]" />
            </span>
          </p>
        </div>

        {/* Typing indicator and reply share one cell: no jump when one replaces the other */}
        <div className="grid">
          <div aria-hidden className="chat-anim chat-typing bubble-in col-start-1 row-start-1 flex h-9 w-16 items-center justify-center gap-1 self-start rounded-lg rounded-tl-none bg-cream">
            <span className="chat-dot size-1.5 rounded-full bg-ink-soft/60" />
            <span className="chat-dot size-1.5 rounded-full bg-ink-soft/60" />
            <span className="chat-dot size-1.5 rounded-full bg-ink-soft/60" />
          </div>
          <div className="chat-anim chat-reply bubble-in col-start-1 row-start-1 mr-auto max-w-[88%] rounded-lg rounded-tl-none bg-cream px-3 pb-1.5 pt-2 text-[0.9375rem] leading-snug text-ink">
            {REPLY.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-1 text-right">
              <Time>12:05</Time>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-chat px-3 pb-3 pt-1 sm:px-4">
        <span aria-hidden className="flex h-11 min-w-0 flex-1 items-center rounded-full bg-cream px-4 text-[0.9375rem] text-ink-soft">
          Écrire un message
        </span>
        <a
          href={orderLink()}
          target="_blank"
          rel="noopener"
          aria-label="Écrire à Chez Chiro sur WhatsApp"
          className="relative isolate grid size-11 shrink-0 place-items-center rounded-full bg-orange text-white transition-transform duration-200 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-brown/15 before:opacity-0 before:transition-opacity hover:before:opacity-100 active:scale-95"
        >
          <SendIcon size={20} />
        </a>
      </div>
    </PlayOnView>
  );
}

export function HowToOrder() {
  return (
    <section id="commander" aria-labelledby="order-title" className="section bg-surface">
      <div className="container-site grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="flex flex-col md:col-span-6 lg:col-span-7">
          <InView>
            <h2 id="order-title" className="max-w-xl text-heading text-ink">
              Commandez en trois étapes, sur WhatsApp
            </h2>
          </InView>

          {/* Vertical timeline; the step that matches the conversation lights up while it plays */}
          <ol className="mt-8 md:mt-10">
            {STEPS.map((step, i) => (
              <li key={step.title} className={`chat-step chat-step-${i + 1} relative pb-8 pl-14 last:pb-0`}>
                <span
                  aria-hidden
                  className="absolute left-0 top-0 isolate grid size-9 place-items-center overflow-hidden rounded-full bg-brown text-small font-bold text-cream"
                >
                  <span className="chat-step-dot absolute inset-0 -z-10 bg-orange opacity-0" />
                  {i + 1}
                </span>
                {i < STEPS.length - 1 && (
                  <span aria-hidden className="absolute bottom-1 left-[1.125rem] top-11 w-px bg-ink/15" />
                )}
                <h3 className="pt-1 text-subheading font-bold text-ink">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {step.title}
                </h3>
                <p className="mt-1 max-w-md text-body text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>

          <InView className="mt-8 md:mt-10">
            <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary">
              <WhatsAppIcon size={22} />
              Commander sur WhatsApp
            </a>
          </InView>
        </div>

        <InView as="figure" delay={0.1} className="flex flex-col md:col-span-6 lg:col-span-5">
          <div className="flex-1">
            <ChatPreview />
          </div>
          <figcaption className="mt-2 text-caption text-ink-soft">
            Exemple : le message est prêt, il ne reste qu&apos;à l&apos;envoyer.
          </figcaption>
        </InView>
      </div>
    </section>
  );
}
