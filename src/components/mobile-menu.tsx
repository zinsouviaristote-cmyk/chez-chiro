"use client";

// Full-screen mobile menu. Code-split: loaded on idle by <SiteHeader />,
// so Motion never weighs on the first paint.
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import logoReversed from "@/assets/images/logo-reversed.png";
import { HOURS, LOCATION, NAV } from "@/lib/site";
import { callLink, orderLink } from "@/lib/whatsapp";
import { CloseIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const circle = (r: string) => `circle(${r} at calc(100% - 2.5rem) 2.25rem)`;

  // `m` + LazyMotion: same animations, a smaller Motion bundle (shared with TextLoop).
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-brown text-cream lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: circle("0%") }}
            animate={reduce ? { opacity: 1 } : { clipPath: circle("150%") }}
            exit={reduce ? { opacity: 0 } : { clipPath: circle("0%") }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="container-site flex h-[4.5rem] items-center justify-between">
              <Image src={logoReversed} alt="Restaurant Chez Chiro" sizes="120px" className="h-11 w-auto" />
              <button
                type="button"
                onClick={onClose}
                autoFocus
                className="grid size-11 place-items-center rounded-full text-cream transition hover:bg-white/10"
                aria-label="Fermer le menu"
              >
                <CloseIcon size={24} />
              </button>
            </div>
            <nav aria-label="Navigation mobile" className="container-site mt-6 flex-1">
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block py-2 text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-cream transition-colors duration-200 hover:text-orange"
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>
            <div className="container-site pb-safe space-y-5 pb-8">
              <div className="text-sm text-cream/75">
                <p>
                  {HOURS.days} · {HOURS.open} · {HOURS.delivery.toLowerCase()}
                </p>
                <p>{LOCATION.label}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary">
                  <WhatsAppIcon size={18} />
                  WhatsApp
                </a>
                <a href={callLink} className="btn btn-outline-light">
                  <PhoneIcon size={18} />
                  Appeler
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
