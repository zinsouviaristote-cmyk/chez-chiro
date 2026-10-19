"use client";
// Carousel with the motion-primitives API (Carousel, CarouselContent,
// CarouselItem, CarouselIndicator), built on native scroll-snap: the swipe
// feels native on phones and no animation library is loaded. From `md` the
// same markup can turn into a grid (pass grid classes to CarouselContent and
// hide the indicator).
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { cn } from "@/lib/utils";

type CarouselContextValue = {
  index: number;
  count: number;
  setCount: (count: number) => void;
  scrollTo: (index: number) => void;
  trackRef: RefObject<HTMLDivElement | null>;
  label: string;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel parts must be used inside <Carousel>.");
  return context;
}

export function Carousel({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  // Active slide = the one whose left edge is closest to the track's.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[];
        const left = track.scrollLeft + parseFloat(getComputedStyle(track).scrollPaddingLeft || "0");
        let best = 0;
        items.forEach((item, i) => {
          if (Math.abs(item.offsetLeft - left) < Math.abs(items[best].offsetLeft - left)) best = i;
        });
        setIndex(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    const item = track?.children[i] as HTMLElement | undefined;
    if (!track || !item) return;
    const padding = parseFloat(getComputedStyle(track).scrollPaddingLeft || "0");
    track.scrollTo({ left: item.offsetLeft - padding, behavior: "smooth" });
  }, []);

  return (
    <CarouselContext.Provider value={{ index, count, setCount, scrollTo, trackRef, label }}>
      <div role="region" aria-roledescription="carrousel" aria-label={label} className={className}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children, className }: { children: ReactNode; className?: string }) {
  const { trackRef, setCount } = useCarousel();
  const count = Children.count(children);
  useEffect(() => setCount(count), [count, setCount]);

  return (
    <div
      ref={trackRef}
      className={cn("no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain", className)}
    >
      {children}
    </div>
  );
}

export function CarouselItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="group" aria-roledescription="diapositive" className={cn("shrink-0 snap-start", className)}>
      {children}
    </div>
  );
}

/** Dots under the track; the active one is fully opaque. */
export function CarouselIndicator({ className }: { className?: string }) {
  const { index, count, scrollTo, label } = useCarousel();
  if (count < 2) return null;
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => scrollTo(i)}
          aria-label={`${label} : élément ${i + 1} sur ${count}`}
          aria-current={i === index ? "true" : undefined}
          className="grid size-11 place-items-center"
        >
          <span
            className={cn(
              "block size-2 rounded-full bg-current transition-opacity duration-200",
              i === index ? "opacity-100" : "opacity-35",
            )}
          />
        </button>
      ))}
    </div>
  );
}
