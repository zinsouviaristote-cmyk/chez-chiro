"use client";

import { useSelectedArea } from "@/lib/area-store";
import { areaLabel } from "@/lib/delivery";
import { cn } from "@/lib/utils";
import { callLink, orderLink } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "../icons";

/**
 * The order buttons that close "Infos pratiques". Once a neighbourhood is
 * picked in the delivery finder, the WhatsApp message already includes it.
 */
export function OrderButtons() {
  const selected = useSelectedArea();
  const area = selected && areaLabel(selected);
  return (
    <div className="md:shrink-0">
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href={orderLink(area)} target="_blank" rel="noopener" className="btn btn-primary">
          <WhatsAppIcon size={22} />
          Commander sur WhatsApp
        </a>
        <a href={callLink} className="btn btn-outline-light">
          <PhoneIcon size={20} />
          Appeler
        </a>
      </div>
      {/* Always in the DOM (live region), empty and 0px tall until a neighbourhood is picked */}
      <p aria-live="polite" className={cn("text-small text-cream/72 md:text-right", area && "mt-3")}>
        {area ? `Votre quartier, ${area}, sera déjà dans le message.` : ""}
      </p>
    </div>
  );
}
