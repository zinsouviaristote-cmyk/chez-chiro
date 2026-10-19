import Image from "next/image";
import marmiteImg from "@/assets/images/marmite-gombo.jpg";
import { HOURS, PHONES } from "@/lib/site";
import { callLink, orderLink } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "../icons";
import { Reveal } from "../motion/reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="pb-16 md:pb-24">
      <div className="container-site">
        <Reveal className="overflow-hidden rounded-lg bg-brown text-cream">
          <div className="grid md:grid-cols-12">
            <div className="p-6 sm:p-10 md:col-span-7 md:p-14 lg:p-16">
              <p className="text-small font-bold text-orange">{HOURS.days}, {HOURS.open}</p>
              <h2 id="cta-title" className="mt-2 text-heading">
                Une petite faim&nbsp;? On s&apos;en occupe.
              </h2>
              <p className="mt-4 max-w-md text-subheading text-cream/80">
                Un message sur WhatsApp ou un appel, et votre plat part de nos marmites.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary">
                  <WhatsAppIcon size={20} />
                  {PHONES.whatsapp.display}
                </a>
                <a href={callLink} className="btn btn-outline-light">
                  <PhoneIcon size={18} />
                  {PHONES.call.display}
                </a>
              </div>
            </div>
            <div className="relative hidden min-h-[22rem] md:col-span-5 md:block">
              <Image
                src={marmiteImg}
                alt="Une marmite de sauce qui mijote avec gombo et piments"
                sizes="(min-width: 768px) 40vw, 0px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
