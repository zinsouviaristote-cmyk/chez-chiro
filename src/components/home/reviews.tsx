import { GOOGLE, LOCATION } from "@/lib/site";
import { REVIEWS } from "@/lib/reviews";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, GoogleIcon, StarIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";

function Stars({ rating, size = 15, className }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`${rating} étoiles sur 5`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} size={size} className={i < rating ? "text-spark" : "text-brown/15"} />
      ))}
    </span>
  );
}

export function Reviews() {
  const total = GOOGLE.count;
  return (
    <section id="avis" aria-labelledby="reviews-title" className="bg-sand py-20 md:py-28">
      <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-brown">Avis Google</p>
          <h2 id="reviews-title" className="display mt-4 text-[2.6rem] text-brown sm:text-[3.2rem] md:text-[3.6rem]">
            Ils en parlent <span className="accent text-orange-deep">mieux</span> que nous.
          </h2>

          <div className="mt-8 rounded-[var(--radius-card)] bg-cream p-6">
            <div className="flex items-end gap-3">
              <p className="display text-[4.2rem] leading-none text-brown">{GOOGLE.rating.toLocaleString("fr-FR")}</p>
              <div className="pb-1.5">
                <Stars rating={4} size={17} />
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <GoogleIcon size={14} /> {total} avis
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-2" aria-label="Répartition des notes">
              {[5, 4, 3, 2, 1].map((star) => {
                const n = GOOGLE.distribution[star];
                return (
                  <li key={star} className="flex items-center gap-3 text-xs text-muted">
                    <span className="w-3 text-right font-bold text-brown">{star}</span>
                    <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-brown/10">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-orange"
                        style={{ width: `${(n / total) * 100}%` }}
                      />
                    </span>
                    <span className="w-5 tabular-nums">{n}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <a href={LOCATION.mapsUrl} target="_blank" rel="noopener" className="link-arrow mt-7">
            Tous les avis sur Google <ArrowUpRightIcon size={17} className="arrow" />
          </a>
        </Reveal>

        <Stagger
          as="ul"
          stagger={0.07}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:block sm:columns-2 sm:gap-4 sm:overflow-visible sm:px-0 md:col-span-8 lg:columns-3 sm:[&>li]:mb-4"
        >
          {REVIEWS.map((review) => (
            <StaggerItem
              as="li"
              key={review.name}
              className="w-[82%] shrink-0 snap-center break-inside-avoid rounded-[var(--radius-card)] bg-cream p-6 transition-transform duration-500 hover:-translate-y-1 sm:w-auto"
            >
              <figure>
                <Stars rating={review.rating} />
                <blockquote className="mt-4 whitespace-pre-line text-[1.0625rem] leading-relaxed text-ink">
                  « {review.text} »
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                  <span className="block font-bold text-brown">{review.name}</span>
                  <span className="mt-0.5 block text-muted">
                    {review.context ? `${review.context} · ` : ""}
                    {review.date}
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
