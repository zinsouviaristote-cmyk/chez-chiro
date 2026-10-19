import { GOOGLE, SOCIALS } from "@/lib/site";
import { AnimatedNumber } from "../motion-primitives/animated-number";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { FacebookIcon, GoogleIcon, TikTokIcon, TrophyIcon } from "../icons";


export function Proof() {
  return (
    <section aria-labelledby="proof-title" className="py-20 md:py-28">
      <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-brown">Ils nous suivent, ils reviennent</p>
          <h2 id="proof-title" className="display mt-4 text-[2.6rem] text-brown sm:text-[3.2rem] md:text-[4rem]">
            Toute une <span className="accent text-orange">communauté</span> à table.
          </h2>
          <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-muted md:text-lg">
            Des millions de gourmands suivent nos marmites chaque jour sur TikTok et Facebook. Ceux qui ont goûté le
            disent sur Google.
          </p>
        </Reveal>

        <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 md:col-span-7">
          <StaggerItem as="li" className="rounded-[var(--radius-card)] bg-brown p-5 text-cream sm:p-7">
            <TikTokIcon size={22} className="text-orange" />
            <p className="display mt-6 text-[2.75rem] sm:text-[3.6rem]">
              <AnimatedNumber value={SOCIALS.tiktok.followers / 1_000_000} decimals={1} />
              <span className="text-orange">&nbsp;M</span>
            </p>
            <p className="mt-2 text-sm leading-snug text-cream/75 sm:text-[0.9375rem]">
              abonnés sur TikTok
              <br className="hidden sm:block" /> et 23 M de j&apos;aime
            </p>
          </StaggerItem>

          <StaggerItem as="li" className="rounded-[var(--radius-card)] bg-sand p-5 sm:p-7">
            <FacebookIcon size={22} className="text-brown" />
            <p className="display mt-6 text-[2.2rem] text-brown sm:text-[3.6rem]">
              <AnimatedNumber value={SOCIALS.facebook.followers} decimals={0} />
            </p>
            <p className="mt-2 text-sm leading-snug text-muted sm:text-[0.9375rem]">abonnés sur Facebook</p>
          </StaggerItem>

          <StaggerItem as="li" className="rounded-[var(--radius-card)] bg-peach p-5 sm:p-7">
            <GoogleIcon size={22} />
            <p className="display mt-6 text-[2.75rem] text-brown sm:text-[3.6rem]">
              <AnimatedNumber value={GOOGLE.rating} decimals={1} />
              <span className="text-[0.5em] text-muted">&nbsp;/5</span>
            </p>
            <p className="mt-2 text-sm leading-snug text-muted sm:text-[0.9375rem]">
              sur Google, {GOOGLE.count} avis
            </p>
          </StaggerItem>

          <StaggerItem as="li" className="rounded-[var(--radius-card)] border-2 border-brown p-5 sm:p-7">
            <TrophyIcon size={22} className="text-brown" />
            <p className="display mt-6 text-[1.9rem] leading-[0.95] text-brown sm:text-[2.6rem]">
              Barbecue d&apos;Or
            </p>
            <p className="mt-2 text-sm leading-snug text-muted sm:text-[0.9375rem]">
              2022 · Festizik Cotonou Barbecue
            </p>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
