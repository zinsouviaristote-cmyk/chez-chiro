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
    <section id="manifestation" aria-labelledby="event-title" className="py-20 md:py-28">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-brown text-cream md:rounded-[2.5rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-40 hidden size-[30rem] md:block rounded-full border-[3px] border-orange/30"
          />
          <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-12 md:items-center md:gap-12 md:p-14 lg:p-16">
            <div className="md:col-span-7">
              <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-orange px-3.5 py-1.5 text-brown">
                Save the date
              </p>
              <h2 id="event-title" className="display mt-6 text-[3.1rem] sm:text-[4rem] md:text-[5.2rem]">
                La Manifestation <span className="accent block text-orange md:inline">arrive.</span>
              </h2>
              <p className="eyebrow mt-4 text-cream/70">{EVENT.tagline}</p>

              <div className="mt-9 flex items-stretch divide-x divide-cream/15">
                {EVENT.days.map((d) => (
                  <div key={d} className="pr-5 first:pl-0 [&:not(:first-child)]:pl-5 sm:pr-8 sm:[&:not(:first-child)]:pl-8">
                    <p className="display text-[3.4rem] leading-none sm:text-[4.4rem]">{d}</p>
                    <p className="mt-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-cream/70">
                      {EVENT.month}
                    </p>
                  </div>
                ))}
              </div>

              <Countdown />

              <div className="mt-9 flex flex-col gap-4 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:gap-6">
                <a href={eventLink()} target="_blank" rel="noopener" className="btn btn-primary">
                  <WhatsAppIcon size={19} />
                  Partenariats & accréditations
                </a>
                <p className="text-sm text-cream/70">
                  {PHONES.events.display}
                </p>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-[var(--radius-image)] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] md:max-w-none md:rotate-[2deg] md:transition-transform md:duration-700 md:hover:rotate-0">
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
