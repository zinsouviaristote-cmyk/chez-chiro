"use client";
// Carousel with the motion-primitives API (Carousel, CarouselContent,
// CarouselItem, CarouselNavigation, CarouselIndicator), built on native
// scroll-snap: the swipe feels native on phones and no animation library is
// loaded. From `md` the same markup can turn into a grid (pass grid classes to
// CarouselContent and hide the controls).
//
// `autoPlay` (seconds) advances one slide at a time and loops. It pauses while
// the carousel is hovered, focused or touched (and resumes a few seconds after
// the last touch), stops off-screen and in hidden tabs, can be paused with
// <CarouselPlayToggle />, and never runs with prefers-reduced-motion.
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
  step: (direction: 1 | -1) => void;
  canPrev: boolean;
  canNext: boolean;
  trackRef: RefObject<HTMLDivElement | null>;
  label: string;
  /** null when the carousel has no autoplay (or reduced motion is on). */
  playing: boolean | null;
  togglePlaying: () => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel parts must be used inside <Carousel>.");
  return context;
}

const TOUCH_RESUME_MS = 8000;

export function Carousel({
  children,
  className,
  label,
  autoPlay,
}: {
  children: ReactNode;
  className?: string;
  label: string;
  /** Seconds between two slides. */
  autoPlay?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [edges, setEdges] = useState({ prev: false, next: true });

  // Autoplay state: `canPlay` (option set, motion allowed), `playing` (pause
  // button), `held` (hover / focus / touch), `visible` (on screen, tab shown).
  const [canPlay, setCanPlay] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [visible, setVisible] = useState(false);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const padding = () => parseFloat(getComputedStyle(trackRef.current!).scrollPaddingLeft || "0");

  // Active slide = the one whose left edge is closest to the track's.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[];
        if (!items.length) return;
        const left = track.scrollLeft + padding();
        let best = 0;
        items.forEach((item, i) => {
          if (Math.abs(item.offsetLeft - left) < Math.abs(items[best].offsetLeft - left)) best = i;
        });
        setIndex(best);
        setEdges({
          prev: track.scrollLeft > 4,
          next: track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
        });
      });
    };
    measure();
    track.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    const item = track?.children[i] as HTMLElement | undefined;
    if (!track || !item) return;
    track.scrollTo({ left: item.offsetLeft - padding(), behavior: "smooth" });
  }, []);

  // One slide forward or back from the current scroll position.
  const step = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const items = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft + padding();
      const target =
        direction === 1
          ? items.findIndex((item) => item.offsetLeft > left + 4)
          : items.findLastIndex((item) => item.offsetLeft < left - 4);
      if (target !== -1) scrollTo(target);
    },
    [scrollTo],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!autoPlay || !root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let onScreen = false;
    const update = () => setVisible(onScreen && !document.hidden);
    // The observer's first callback (right after observe) also turns autoplay on.
    const io = new IntersectionObserver(([entry]) => {
      setCanPlay(true);
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(root);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      clearTimeout(touchTimer.current);
    };
  }, [autoPlay]);

  const running = canPlay && playing && visible && !hovered && !focused && !touched;

  useEffect(() => {
    if (!running || !autoPlay) return;
    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
      else step(1);
    }, autoPlay * 1000);
    return () => clearInterval(timer);
  }, [running, autoPlay, step]);

  const value: CarouselContextValue = {
    index,
    count,
    setCount,
    scrollTo,
    step,
    canPrev: edges.prev,
    canNext: edges.next,
    trackRef,
    label,
    playing: canPlay ? playing : null,
    togglePlaying: () => setPlaying((p) => !p),
  };

  return (
    <CarouselContext.Provider value={value}>
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carrousel"
        aria-label={label}
        className={className}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        }}
        onTouchStart={() => {
          clearTimeout(touchTimer.current);
          setTouched(true);
        }}
        onTouchEnd={() => {
          clearTimeout(touchTimer.current);
          touchTimer.current = setTimeout(() => setTouched(false), TOUCH_RESUME_MS);
        }}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children, className }: { children: ReactNode; className?: string }) {
  const { trackRef, setCount, playing } = useCarousel();
  const count = Children.count(children);
  useEffect(() => setCount(count), [count, setCount]);

  return (
    <div
      ref={trackRef}
      aria-live={playing ? "off" : "polite"}
      // relative: slides' offsetLeft is then measured from the track itself
      className={cn("no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain", className)}
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

const CONTROL =
  "grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-[background-color,opacity] duration-200 hover:bg-cream disabled:pointer-events-none disabled:opacity-35";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden fill="currentColor">
      <path
        d={
          direction === "right"
            ? "M8.94 4.94a1.5 1.5 0 0 1 2.12 0l6 6a1.5 1.5 0 0 1 0 2.12l-6 6a1.5 1.5 0 1 1-2.12-2.12L13.88 12 8.94 7.06a1.5 1.5 0 0 1 0-2.12Z"
            : "M15.06 4.94a1.5 1.5 0 0 1 0 2.12L10.12 12l4.94 4.94a1.5 1.5 0 1 1-2.12 2.12l-6-6a1.5 1.5 0 0 1 0-2.12l6-6a1.5 1.5 0 0 1 2.12 0Z"
        }
      />
    </svg>
  );
}

/** Previous / next buttons (one slide at a time). */
export function CarouselNavigation({ className }: { className?: string }) {
  const { step, canPrev, canNext, label } = useCarousel();
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button type="button" onClick={() => step(-1)} disabled={!canPrev} className={CONTROL} aria-label={`${label} : précédent`}>
        <Chevron direction="left" />
      </button>
      <button type="button" onClick={() => step(1)} disabled={!canNext} className={CONTROL} aria-label={`${label} : suivant`}>
        <Chevron direction="right" />
      </button>
    </div>
  );
}

/** Pause / resume the autoplay. Renders nothing without autoplay. */
export function CarouselPlayToggle({ className }: { className?: string }) {
  const { playing, togglePlaying, label } = useCarousel();
  if (playing === null) return null;
  return (
    <button
      type="button"
      onClick={togglePlaying}
      className={cn(CONTROL, className)}
      aria-label={playing ? `${label} : mettre en pause le défilement` : `${label} : reprendre le défilement`}
    >
      <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden fill="currentColor">
        {playing ? (
          <path d="M7 4.5A1.5 1.5 0 0 1 8.5 3h1A1.5 1.5 0 0 1 11 4.5v15A1.5 1.5 0 0 1 9.5 21h-1A1.5 1.5 0 0 1 7 19.5v-15Zm6 0A1.5 1.5 0 0 1 14.5 3h1A1.5 1.5 0 0 1 17 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-15Z" />
        ) : (
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
        )}
      </svg>
    </button>
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
