import type { ComponentType, SVGProps } from "react";
import { HOURS, LOCATION, PHONES } from "@/lib/site";
import { CashIcon, ClockIcon, MapPinIcon, TruckIcon } from "../icons";
import { LazyMap } from "../map/lazy-map";
import { AnimatedGroup, InView } from "../motion/in-view";
import { DeliveryFinder } from "./delivery-finder";
import { OrderButtons } from "./order-buttons";

type Fact = { Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>; label: string; value: string; detail: string };

const FACTS: Fact[] = [
  { Icon: ClockIcon, label: "Horaires", value: `${HOURS.open}, ${HOURS.days.toLowerCase()}`, detail: `${HOURS.delivery}` },
  { Icon: TruckIcon, label: "Zone de livraison", value: "Cotonou et Abomey-Calavi", detail: "Frais selon le quartier" },
  { Icon: CashIcon, label: "Paiement", value: "À la livraison", detail: "Vous réglez le livreur à la réception" },
];

/** Hours, delivery area, payment, the map, delivery fees, and the order buttons that end the page. */
export function Infos() {
  return (
    <section id="infos" aria-labelledby="infos-title" className="section">
      <div className="container-site">
        <InView>
          <h2 id="infos-title" className="text-heading text-ink">
            Infos pratiques
          </h2>
        </InView>

        <AnimatedGroup
          as="ul"
          className="mt-6 divide-y divide-line border-y border-line md:mt-10 md:grid md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {FACTS.map(({ Icon, label, value, detail }) => (
            <li key={label} className="flex gap-4 py-5 md:px-8 md:py-7 md:first:pl-0 md:last:pr-0">
              <Icon size={22} className="mt-0.5 shrink-0 text-ink" />
              <div>
                <h3 className="text-small text-ink-soft">{label}</h3>
                <p className="mt-0.5 text-subheading font-bold text-ink">{value}</p>
                <p className="mt-0.5 text-small text-ink-soft">{detail}</p>
              </div>
            </li>
          ))}
        </AnimatedGroup>

        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-12">
          <InView className="flex flex-col md:col-span-7">
            <LazyMap mode="full" className="h-[19rem] md:h-auto md:min-h-[30rem] md:flex-1" />
            <p className="mt-3 flex items-center gap-2 text-small text-ink-soft">
              <MapPinIcon size={16} className="shrink-0 text-ink" />
              <span>
                <span className="font-bold text-ink">Restaurant Chez Chiro</span> · {LOCATION.label}
              </span>
            </p>
          </InView>
          <InView delay={0.08} className="md:col-span-5">
            <DeliveryFinder />
          </InView>
        </div>

        <InView className="mt-10 rounded-lg bg-brown p-6 text-cream sm:p-8 md:mt-14 md:flex md:items-start md:justify-between md:gap-10 md:p-10">
          <div>
            <h3 className="text-heading-sm md:text-heading">Commandez maintenant</h3>
            <p className="mt-2 flex flex-col text-small text-cream/72 sm:flex-row sm:gap-4">
              <span className="whitespace-nowrap">WhatsApp {PHONES.whatsapp.display}</span>
              <span className="whitespace-nowrap">Appel {PHONES.call.display}</span>
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <OrderButtons />
          </div>
        </InView>
      </div>
    </section>
  );
}
