import { DELIVERY_ZONES, HOURS, LOCATION, PHONES } from "@/lib/site";
import { callLink, orderLink } from "@/lib/whatsapp";
import { formatFcfa } from "@/lib/utils";
import { ArrowUpRightIcon, CashIcon, ClockIcon, MapPinIcon, PhoneIcon, TruckIcon, WhatsAppIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { SectionHeading } from "./section-heading";

export function Infos() {
  return (
    <section id="infos" aria-labelledby="infos-title" className="section">
      <div className="container-site">
        <SectionHeading
          id="infos-title"
          title="Où, quand, combien."
          lead="On livre partout à Cotonou et à Abomey-Calavi, tous les jours. Vous payez à la livraison."
        />

        <Stagger as="ul" className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          <StaggerItem as="li" className="rounded-lg bg-surface p-6 sm:p-8">
            <ClockIcon size={24} className="text-ink" />
            <h3 className="mt-6 text-small font-bold text-ink-soft">Horaires</h3>
            <p className="mt-1 text-heading text-ink">{HOURS.open}</p>
            <p className="mt-1 font-bold text-ink">{HOURS.days}</p>
            <p className="mt-3 text-small text-ink-soft">{HOURS.delivery}.</p>
          </StaggerItem>

          <StaggerItem as="li" className="rounded-lg bg-brown p-6 text-cream sm:p-8">
            <MapPinIcon size={24} className="text-orange" />
            <h3 className="mt-6 text-small font-bold text-cream/70">Nous trouver</h3>
            <p className="mt-1 text-heading">Godomey</p>
            <p className="mt-1 font-bold">Abomey-Calavi</p>
            <a href={LOCATION.mapsUrl} target="_blank" rel="noopener" className="btn btn-outline-light btn-sm mt-6">
              Ouvrir dans Google Maps <ArrowUpRightIcon size={16} />
            </a>
          </StaggerItem>

          <StaggerItem as="li" className="rounded-lg bg-surface p-6 sm:p-8">
            <CashIcon size={24} className="text-ink" />
            <h3 className="mt-6 text-small font-bold text-ink-soft">Commander</h3>
            <p className="mt-2 space-y-1">
              <a href={orderLink()} target="_blank" rel="noopener" className="flex min-h-11 items-center gap-2 font-bold text-ink">
                <WhatsAppIcon size={18} /> <span className="link-underline">{PHONES.whatsapp.display}</span>
              </a>
              <a href={callLink} className="flex min-h-11 items-center gap-2 font-bold text-ink">
                <PhoneIcon size={18} /> <span className="link-underline">{PHONES.call.display}</span>
              </a>
            </p>
            <p className="mt-3 text-small text-ink-soft">Paiement à la livraison.</p>
          </StaggerItem>
        </Stagger>

        <Reveal className="mt-16 md:mt-24">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-small font-bold text-ink-soft">
                <TruckIcon size={20} />
                Zones et frais de livraison
              </p>
              <h3 className="mt-2 text-heading-sm text-ink md:text-[1.75rem] md:leading-[1.29]">
                Standard ou premium, à vous de voir.
              </h3>
            </div>
            <p className="max-w-sm text-small text-ink-soft">
              Temps estimés selon votre zone. Précisez votre quartier dans le message WhatsApp.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-line">
            <div className="hidden grid-cols-12 gap-4 bg-surface px-6 py-3 text-caption font-bold uppercase tracking-[0.08em] text-ink-soft md:grid">
              <span className="col-span-6">Zone</span>
              <span className="col-span-3">Standard</span>
              <span className="col-span-3">Premium</span>
            </div>
            <ul className="divide-y divide-line">
              {DELIVERY_ZONES.map((z) => (
                <li
                  key={z.zone}
                  className="grid gap-4 px-4 py-5 md:grid-cols-12 md:items-center md:px-6"
                >
                  <div className="flex gap-4 md:col-span-6">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brown text-body font-bold text-cream">
                      {z.zone}
                    </span>
                    <p className="text-small text-ink">{z.areas}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:col-span-6 md:gap-4">
                    <p className="rounded-lg bg-surface px-3.5 py-2.5 md:bg-transparent md:p-0">
                      <span className="block text-caption font-bold uppercase tracking-[0.08em] text-ink-soft md:hidden">
                        Standard
                      </span>
                      <span className="font-bold tabular-nums text-ink">{formatFcfa(z.standard.price)}</span>
                      <span className="block text-small text-ink-soft">{z.standard.time}</span>
                    </p>
                    <p className="rounded-lg bg-surface px-3.5 py-2.5 md:bg-transparent md:p-0">
                      <span className="block text-caption font-bold uppercase tracking-[0.08em] text-ink-soft md:hidden">
                        Premium
                      </span>
                      <span className="font-bold tabular-nums text-ink">{formatFcfa(z.premium.price)}</span>
                      <span className="block text-small text-ink-soft">{z.premium.time}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
