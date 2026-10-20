import Image from "next/image";
import posterImg from "@/assets/images/affiche-manifestation.jpg";
import { EVENT } from "@/lib/site";
import { eventLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../icons";
import { AnimatedGroup, InView } from "../motion/in-view";
import { EventCountdown } from "./event-countdown";

// Content strictly limited to what the event poster says:
// "La Manifestation arrive. Du virtuel au réel. Save the date 04 05 06 déc. 2026.
// Partenariats, accréditations" (+ the partnerships phone number, on the poster).
export function EventSection() {
  return (
    <section id="manifestation" aria-labelledby="event-title" className="section">
      {/* Mobile: title, poster, dates. Desktop: poster on the left, title and dates on the right. */}
      <div className="container-site grid gap-8 md:grid-cols-12 md:gap-x-14 md:gap-y-0">
        <InView className="md:col-span-6 md:col-start-7 md:row-start-1 md:self-end">
          <p className="inline-flex rounded bg-brown px-2 py-1 text-caption font-bold uppercase tracking-[0.08em] text-cream">
            Save the date
          </p>
          <h2 id="event-title" className="mt-5 text-display text-ink">
            La Manifestation
          </h2>
          <p className="mt-3 text-subheading text-ink-soft">Du virtuel au réel. Trois jours avec Chez Chiro.</p>
        </InView>

        <InView delay={0.1} className="md:col-span-6 md:col-start-1 md:row-span-2 md:row-start-1 md:self-center">
          <div className="overflow-hidden rounded-lg bg-surface">
            <Image
              src={posterImg}
              alt="Affiche « La Manifestation arrive. Du virtuel au réel », Save the date les 4, 5 et 6 décembre 2026, Restaurant Chez Chiro"
              sizes="(min-width: 1264px) 570px, (min-width: 768px) 46vw, 92vw"
              quality={75}
              className="h-auto w-full"
            />
          </div>
        </InView>

        <div className="md:col-span-6 md:col-start-7 md:row-start-2 md:self-start">
          <AnimatedGroup
            as="dl"
            stagger={0.1}
            className="grid grid-cols-3 divide-x divide-line border-y border-line md:mt-10"
          >
            {EVENT.days.map((day, i) => (
              <div key={day} className={i === 0 ? "py-5 pr-4" : "px-4 py-5"}>
                <dt className="sr-only">Jour {i + 1}</dt>
                <dd>
                  <span className="block text-display leading-none tabular-nums text-ink">{day}</span>
                  <span className="mt-2 block text-small text-ink-soft">déc. 2026</span>
                </dd>
              </div>
            ))}
          </AnimatedGroup>

          <InView className="mt-8 md:mt-10">
            <EventCountdown />
          </InView>

          <InView className="mt-8 border-t border-line pt-8 md:mt-10">
            <a href={eventLink()} target="_blank" rel="noopener" className="btn btn-primary">
              <WhatsAppIcon size={22} />
              Partenariats & accréditations
            </a>
            <p className="mt-3 text-small text-ink-soft">Partenaires et médias : écrivez-nous sur WhatsApp.</p>
          </InView>
        </div>
      </div>
    </section>
  );
}
