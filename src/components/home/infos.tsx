import { DELIVERY_ZONES, HOURS, LOCATION, PHONES } from "@/lib/site";
import { callLink, orderLink } from "@/lib/whatsapp";
import { formatFcfa } from "@/lib/utils";
import { ArrowUpRightIcon, CashIcon, ClockIcon, MapPinIcon, PhoneIcon, TruckIcon, WhatsAppIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { SectionHeading } from "./section-heading";

export function Infos() {
  return (
    <section id="infos" aria-labelledby="infos-title" className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Infos pratiques"
          title={
            <span id="infos-title">
              Où, quand, <span className="accent text-orange">combien</span>.
            </span>
          }
          lead="On livre partout à Cotonou et à Abomey-Calavi, tous les jours. Vous payez à la livraison."
        />

        <Stagger as="ul" className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
          <StaggerItem as="li" className="rounded-[var(--radius-card)] bg-sand p-6 sm:p-8">
            <ClockIcon size={26} className="text-brown" />
            <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.08em] text-muted">Horaires</h3>
            <p className="display mt-2 text-[2.2rem] text-brown">{HOURS.open}</p>
            <p className="mt-1 font-semibold text-brown">{HOURS.days}</p>
            <p className="mt-3 text-[0.9375rem] text-muted">{HOURS.delivery}.</p>
          </StaggerItem>

          <StaggerItem as="li" className="relative overflow-hidden rounded-[var(--radius-card)] bg-brown p-6 text-cream sm:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-64">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="absolute inset-0 rounded-full border border-orange/40"
                  style={{ transform: `scale(${0.35 + i * 0.22})` }}
                />
              ))}
              <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange" />
            </div>
            <MapPinIcon size={26} className="relative text-orange" />
            <h3 className="relative mt-6 text-sm font-bold uppercase tracking-[0.08em] text-cream/65">
              Nous trouver
            </h3>
            <p className="display relative mt-2 text-[2.2rem]">Godomey</p>
            <p className="relative mt-1 font-semibold">Abomey-Calavi</p>
            <a
              href={LOCATION.mapsUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-sm relative mt-6"
            >
              Ouvrir dans Google Maps <ArrowUpRightIcon size={16} />
            </a>
          </StaggerItem>

          <StaggerItem as="li" className="rounded-[var(--radius-card)] bg-peach p-6 sm:p-8">
            <CashIcon size={26} className="text-brown" />
            <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.08em] text-muted">Commander</h3>
            <p className="mt-3 space-y-1">
              <a href={orderLink()} target="_blank" rel="noopener" className="flex items-center gap-2 font-bold text-brown">
                <WhatsAppIcon size={18} /> <span className="link-underline">{PHONES.whatsapp.display}</span>
              </a>
              <a href={callLink} className="flex items-center gap-2 font-bold text-brown">
                <PhoneIcon size={18} /> <span className="link-underline">{PHONES.call.display}</span>
              </a>
            </p>
            <p className="mt-4 text-[0.9375rem] text-muted">Paiement à la livraison.</p>
          </StaggerItem>
        </Stagger>

        <Reveal className="mt-14 md:mt-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-brown">
                <TruckIcon size={22} />
                <span className="eyebrow">Zones et frais de livraison</span>
              </p>
              <h3 className="display mt-3 text-[2rem] text-brown md:text-[2.6rem]">
                Standard ou premium, à vous de voir.
              </h3>
            </div>
            <p className="max-w-sm text-[0.9375rem] text-muted">
              Temps estimés selon votre zone. Précisez votre quartier dans le message WhatsApp.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line">
            <div className="hidden grid-cols-12 gap-4 bg-sand px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-muted md:grid">
              <span className="col-span-6">Zone</span>
              <span className="col-span-3">Standard</span>
              <span className="col-span-3">Premium</span>
            </div>
            <ul className="divide-y divide-line">
              {DELIVERY_ZONES.map((z) => (
                <li
                  key={z.zone}
                  className="grid gap-4 px-5 py-5 transition-colors duration-300 hover:bg-sand/50 md:grid-cols-12 md:items-center md:px-6"
                >
                  <div className="flex gap-4 md:col-span-6">
                    <span className="display grid size-11 shrink-0 place-items-center rounded-full bg-brown text-xl text-cream">
                      {z.zone}
                    </span>
                    <p className="text-[0.9375rem] leading-relaxed text-ink">{z.areas}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:col-span-6 md:gap-4">
                    <p className="rounded-2xl bg-sand/70 px-3.5 py-2.5 md:bg-transparent md:p-0">
                      <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-muted md:hidden">
                        Standard
                      </span>
                      <span className="font-bold text-brown">{formatFcfa(z.standard.price)}</span>
                      <span className="block text-sm text-muted">{z.standard.time}</span>
                    </p>
                    <p className="rounded-2xl bg-peach/70 px-3.5 py-2.5 md:bg-transparent md:p-0">
                      <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-muted md:hidden">
                        Premium
                      </span>
                      <span className="font-bold text-brown">{formatFcfa(z.premium.price)}</span>
                      <span className="block text-sm text-muted">{z.premium.time}</span>
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
