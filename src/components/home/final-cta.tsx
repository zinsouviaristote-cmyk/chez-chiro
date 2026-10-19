import Image from "next/image";
import marmiteImg from "@/assets/images/marmite-gombo.jpg";
import { HOURS, PHONES } from "@/lib/site";
import { callLink, orderLink } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "../icons";
import { Reveal } from "../motion/reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="pb-20 md:pb-28">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-orange md:rounded-[2.5rem]">
          <div className="grid md:grid-cols-12">
            <div className="p-7 sm:p-10 md:col-span-7 md:p-14 lg:p-16">
              <p className="eyebrow text-brown">{HOURS.days}, {HOURS.open}</p>
              <h2 id="cta-title" className="display mt-5 text-[3rem] text-brown sm:text-[4rem] md:text-[4.8rem]">
                Une petite faim&nbsp;? <span className="accent">On s&apos;en occupe.</span>
              </h2>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-brown/85">
                Un message sur WhatsApp ou un appel, et votre plat part de nos marmites.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-dark">
                  <WhatsAppIcon size={20} />
                  {PHONES.whatsapp.display}
                </a>
                <a href={callLink} className="btn btn-outline">
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
