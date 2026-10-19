"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import { NAV, PHONES } from "@/lib/site";
import { callLink, orderLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { whenSettled } from "@/lib/when-settled";
import { MenuIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const loadMobileMenu = () => import("./mobile-menu");
const MobileMenu = dynamic(loadMobileMenu, { ssr: false });

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Warm the mobile-menu chunk once the page has settled, so the first tap is instant.
  useEffect(() => whenSettled(() => void loadMobileMenu()), []);

  return (
    <>
      <header
        data-scrolled={scrolled}
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled
            ? "bg-cream/88 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl"
            : "bg-cream",
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between gap-4 transition-[height] duration-500 ease-[var(--ease-out-soft)]",
            scrolled ? "h-16" : "h-[4.5rem] md:h-20",
          )}
        >
          <Link href="/" className="relative shrink-0" aria-label="Chez Chiro — accueil">
            <Image
              src={logo}
              alt="Restaurant Chez Chiro"
              loading="eager"
              fetchPriority="low"
              sizes="120px"
              className={cn(
                "w-auto transition-[height] duration-500 ease-[var(--ease-out-soft)]",
                scrolled ? "h-10" : "h-11 md:h-14",
              )}
            />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-brown">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline py-1">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={callLink}
              className="btn btn-pill btn-pill-outline hidden md:inline-flex"
              aria-label={`Appeler le ${PHONES.call.display}`}
            >
              <PhoneIcon size={16} />
              Appeler
            </a>
            <a href={orderLink()} target="_blank" rel="noopener" className="btn btn-primary btn-pill">
              <WhatsAppIcon size={18} />
              Commander
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuMounted(true);
                setOpen(true);
              }}
              className="grid size-11 place-items-center rounded-full text-brown transition hover:bg-surface lg:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="menu-mobile"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      {menuMounted && <MobileMenu open={open} onClose={close} />}
    </>
  );
}
