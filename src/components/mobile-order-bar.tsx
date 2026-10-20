"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { callLink, orderLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/** true once the hero (any element with [data-hero]) has scrolled away. `page` re-runs it after a navigation. */
export function useHeroGone(page?: string) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      const onScroll = () => setGone(window.scrollY > 420);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const io = new IntersectionObserver(
      ([entry]) => setGone(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [page]);

  return gone;
}

/** Sticky WhatsApp + call bar on mobile. */
export function QuickOrderBar({ visible }: { visible: boolean }) {
  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={cn(
        "pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-brown px-4 pt-3 transition-[transform,opacity] duration-300 ease-[var(--ease-out-soft)] md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="flex gap-2">
        <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary flex-1 px-3">
          <WhatsAppIcon size={20} />
          Commander sur WhatsApp
        </a>
        <a href={callLink} className="btn btn-outline-light w-14 shrink-0 px-0" aria-label="Appeler Chez Chiro">
          <PhoneIcon size={20} />
        </a>
      </div>
    </div>
  );
}

/**
 * Site-wide mobile bar: slides in once the hero has left the screen.
 * /menu renders its own (<MenuOrderBar />), which turns into the order bar
 * as soon as a dish is added.
 */
export function MobileOrderBar() {
  const pathname = usePathname();
  const gone = useHeroGone(pathname);
  if (pathname === "/menu") return null;
  return <QuickOrderBar visible={gone} />;
}
