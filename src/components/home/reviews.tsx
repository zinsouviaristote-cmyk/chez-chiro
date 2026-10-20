import { GOOGLE, LOCATION } from "@/lib/site";
import { FEATURED_REVIEW, REVIEWS, type Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, GoogleIcon, StarIcon } from "../icons";
import { InView } from "../motion/in-view";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
  CarouselPlayToggle,
} from "../ui/carousel";

/** Five stars; a fractional rating fills the last star partly (4,4 → 40 % of the fifth). */
function Stars({ rating, size = 16, className }: { rating: number; size?: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label={`${rating.toLocaleString("fr-FR")} étoiles sur 5`}
      className={cn("flex gap-0.5", className)}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return (
          <span key={i} className="relative block" style={{ width: size, height: size }}>
            <StarIcon size={size} className="absolute inset-0 text-ink/15" />
            {fill > 0 && (
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <StarIcon size={size} className="text-spark" />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

const meta = (review: Review) => [review.context, review.date].filter(Boolean).join(" · ");

export function Reviews() {
  return (
    <section id="avis" aria-labelledby="reviews-title" className="section bg-surface">
      <div className="container-site">
        <InView>
          <h2 id="reviews-title" className="text-heading text-ink">
            Ce que nos clients écrivent sur Google
          </h2>
        </InView>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-stretch md:gap-6">
          {/* Rating: static numbers, never a counter */}
          <InView className="flex items-center gap-5 rounded-lg bg-cream p-6 md:col-span-4 md:flex-col md:items-start md:justify-between md:gap-10 md:p-8">
            <p className="text-[4.5rem] font-bold leading-none tracking-[-0.03em] tabular-nums text-ink md:text-[7rem]">
              {GOOGLE.rating.toLocaleString("fr-FR")}
            </p>
            <div>
              <Stars rating={GOOGLE.rating} size={22} />
              <p className="mt-2 flex items-center gap-2 text-body font-bold text-ink">
                <GoogleIcon size={20} />
                {GOOGLE.count} avis Google
              </p>
            </div>
          </InView>

          {/* Featured review, in large type */}
          <InView as="figure" delay={0.08} className="flex flex-col justify-center md:col-span-8 md:pl-8 lg:pl-12">
            <Stars rating={FEATURED_REVIEW.rating} size={20} />
            <blockquote className="mt-5 text-[1.1875rem] font-medium leading-[1.45] text-ink md:text-[1.875rem] md:leading-[1.33]">
              « {FEATURED_REVIEW.text} »
            </blockquote>
            <figcaption className="mt-6 text-small text-ink-soft">
              <span className="font-bold text-ink">{FEATURED_REVIEW.name}</span> · Avis Google · {FEATURED_REVIEW.date}
            </figcaption>
          </InView>
        </div>

        <InView className="mt-10 md:mt-14">
          <Carousel label="Avis Google" autoPlay={6}>
            <CarouselContent className="-mx-4 scroll-px-4 gap-4 px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:scroll-px-0 md:gap-6 md:px-0">
              {REVIEWS.map((review) => (
                <CarouselItem
                  key={review.name}
                  className="w-[84%] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <figure className="flex h-full flex-col rounded-lg bg-cream p-6">
                    <Stars rating={review.rating} />
                    <blockquote className="mt-4 flex-1 whitespace-pre-line text-subheading font-normal text-ink">
                      « {review.text} »
                    </blockquote>
                    <figcaption className="mt-6 border-t border-line pt-4 text-small">
                      <span className="block font-bold text-ink">{review.name}</span>
                      <span className="mt-0.5 block text-ink-soft">{meta(review)}</span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-2 flex items-center justify-between sm:hidden">
              <CarouselIndicator className="-ml-3.5 text-ink" />
              <CarouselPlayToggle />
            </div>
            <div className="mt-2 flex items-center justify-between gap-4 sm:mt-6">
              <a href={LOCATION.mapsUrl} target="_blank" rel="noopener" className="link-arrow min-h-11">
                Voir tous les avis sur Google <ArrowUpRightIcon size={17} className="arrow" />
              </a>
              <div className="hidden items-center gap-2 sm:flex">
                <CarouselPlayToggle />
                <CarouselNavigation />
              </div>
            </div>
          </Carousel>
        </InView>
      </div>
    </section>
  );
}
