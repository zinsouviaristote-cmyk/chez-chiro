import Image from "next/image";
import posterImg from "@/assets/images/affiche-manifestation.jpg";
import { EVENT, PHONES } from "@/lib/site";
import { eventLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../icons";
import { Reveal } from "../motion/reveal";
import { Countdown } from "./countdown";

// Content strictly limited to what the event poster says.
export function EventSection() {
  return (
    <section id="manifestation" aria-labelledby="event-title" className="section">
      <div className="container-site">
        <Reveal className="overflow-hidden rounded-lg bg-brown text-cream">
          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-12 md:items-center md:gap-12 md:p-14 lg:p-16">
            <div className="md:col-span-7">
              <p className="inline-flex rounded bg-cream px-2 py-1 text-caption font-bold uppercase tracking-[0.08em] text-brown">
                Save the date
              </p>
              <h2 id="event-title" className="mt-5 text-heading">
                La Manifestation arrive.
              </h2>
              <p className="mt-2 text-subheading text-cream/75">{EVENT.tagline}</p>

              <div className="mt-8 flex items-stretch divide-x divide-cream/15">
                {EVENT.days.map((d) => (
                  <div key={d} className="pr-5 first:pl-0 [&:not(:first-child)]:pl-5 sm:pr-8 sm:[&:not(:first-child)]:pl-8">
                    <p className="text-display tabular-nums">{d}</p>
                    <p className="mt-1 text-small text-cream/70">
                      {EVENT.month}
                    </p>
                  </div>
                ))}
              </div>

              <Countdown />

              <div className="mt-8 flex flex-col gap-4 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:gap-6">
                <a href={eventLink()} target="_blank" rel="noopener" className="btn btn-primary">
                  <WhatsAppIcon size={19} />
                  Partenariats & accréditations
                </a>
                <p className="text-small text-cream/70">
                  {PHONES.events.display}
                </p>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative aspect-square max-w-sm overflow-hidden rounded-lg md:max-w-none">
                <Image
                  src={posterImg}
                  alt="Affiche « La Manifestation arrive. Du virtuel au réel », Save the date les 4, 5 et 6 décembre 2026, Restaurant Chez Chiro"
                  sizes="(min-width: 768px) 34vw, 90vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
