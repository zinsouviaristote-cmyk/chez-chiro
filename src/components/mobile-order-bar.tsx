"use client";

import { useEffect, useState } from "react";
import { callLink, orderLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/**
 * Sticky WhatsApp + call bar on mobile. It slides in once the hero
 * (any element with [data-hero]) has left the screen.
 */
export function MobileOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      const onScroll = () => setVisible(window.scrollY > 420);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={cn(
        "pb-safe fixed inset-x-0 bottom-0 z-40 px-3 pt-3 transition-[transform,opacity] duration-500 ease-[var(--ease-out-soft)] md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[110%] opacity-0",
      )}
    >
      <div className="flex gap-2 rounded-full bg-brown/95 p-1.5 shadow-[0_18px_40px_-16px_rgb(49_20_8/0.7)] backdrop-blur-md">
        <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary flex-1 py-3.5">
          <WhatsAppIcon size={20} />
          Commander sur WhatsApp
        </a>
        <a
          href={callLink}
          className="btn grid size-[3.1rem] shrink-0 place-items-center bg-cream/10 p-0 text-cream hover:bg-cream/20"
          aria-label="Appeler Chez Chiro"
        >
          <PhoneIcon size={20} />
        </a>
      </div>
    </div>
  );
}
