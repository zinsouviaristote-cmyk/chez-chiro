"use client";

// Mobile navigation panel: slides in from the right over a brown overlay.
// Code-split: loaded on idle by <SiteHeader />, so Motion never weighs on the first paint.
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import logo from "@/assets/images/logo.png";
import { HOURS, LOCATION, NAV } from "@/lib/site";
import { callLink, orderLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, ClockIcon, CloseIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  open: boolean;
  onClose: () => void;
  /** NAV href of what's on screen when the panel opened (highlighted). */
  current: string | null;
};

export default function MobileMenu({ open, onClose, current }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const transition = { duration: reduce ? 0 : 0.22, ease: EASE };

  // While open: page scroll locked, Escape closes, Tab stays inside the panel,
  // and focus goes back to the menu button on close.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const opener = document.activeElement as HTMLElement | null;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  // `m` + LazyMotion: a smaller Motion bundle (shared with TextLoop).
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <div key="menu" className="lg:hidden">
            <m.div
              aria-hidden
              onClick={onClose}
              className="fixed inset-0 z-[60] bg-brown/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            />
            <m.div
              ref={panelRef}
              id="menu-mobile"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[60] flex w-[calc(100%-3.5rem)] max-w-sm flex-col bg-cream text-ink"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={transition}
            >
              {/* Same row as the header: logo at its normal size, the button where the menu button was */}
              <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line pl-6 pr-4">
                <Image src={logo} alt="Restaurant Chez Chiro" sizes="120px" className="h-11 w-auto" />
                <button
                  type="button"
                  onClick={onClose}
                  autoFocus
                  className="grid size-11 place-items-center rounded-full text-brown transition hover:bg-surface"
                  aria-label="Fermer le menu"
                >
                  <CloseIcon size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                <nav aria-label="Navigation mobile">
                  <ul className="divide-y divide-line border-b border-line">
                    {NAV.map((item) => {
                      const active = item.href === current;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            aria-current={active ? "location" : undefined}
                            className={cn(
                              "relative flex min-h-[3.25rem] items-center justify-between gap-4 px-6 py-3 text-[1.3125rem] font-semibold leading-tight text-ink transition-colors duration-200",
                              active
                                ? "bg-surface before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:rounded-r-full before:bg-orange"
                                : "hover:bg-surface",
                            )}
                          >
                            {item.label}
                            <ChevronRightIcon size={18} className={cn("shrink-0", active ? "text-orange" : "text-ink/35")} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="space-y-3 px-6 py-6 text-small text-ink-soft">
                  <p className="flex gap-3">
                    <ClockIcon size={18} className="mt-0.5 shrink-0 text-ink" />
                    <span>
                      <span className="block font-bold text-ink">
                        {HOURS.days}, {HOURS.open}
                      </span>
                      {HOURS.delivery}
                    </span>
                  </p>
                  <p className="flex gap-3">
                    <MapPinIcon size={18} className="mt-0.5 shrink-0 text-ink" />
                    <span>
                      <span className="block font-bold text-ink">{LOCATION.label}</span>
                      Livraison à {LOCATION.area}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid shrink-0 gap-3 px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <a
                  href={orderLink()}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary sm:w-full"
                  aria-label="Commander sur WhatsApp"
                >
                  <WhatsAppIcon size={20} />
                  WhatsApp
                </a>
                <a href={callLink} className="btn btn-outline sm:w-full">
                  <PhoneIcon size={18} />
                  Appeler
                </a>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
