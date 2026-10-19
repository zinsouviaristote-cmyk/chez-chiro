"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TabDot } from "./tab-dot";

type Tab = { id: string; label: string };

/**
 * Text-only category tabs, sticky under the header. They scroll to each
 * section and follow the reader as they scroll (scroll-spy).
 */
export function MenuTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);
  const clickLock = useRef(0);

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < clickLock.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [tabs]);

  useEffect(() => {
    const el = barRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (el && barRef.current) {
      const bar = barRef.current;
      const left = el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2;
      bar.scrollTo({ left, behavior: "smooth" });
    }
  }, [active]);

  return (
    <div className="sticky top-16 z-30 border-b border-line bg-cream/92 backdrop-blur-xl">
      <div
        ref={barRef}
        className="no-scrollbar container-site relative flex gap-7 overflow-x-auto md:gap-10"
        role="navigation"
        aria-label="Catégories du menu"
      >
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              data-tab={t.id}
              aria-current={selected ? "true" : undefined}
              onClick={() => {
                clickLock.current = Date.now() + 900;
                setActive(t.id);
              }}
              className={cn(
                "display relative shrink-0 py-4 text-[1.35rem] transition-colors duration-300 md:text-[1.75rem]",
                selected ? "text-brown" : "text-brown/65 hover:text-brown",
              )}
            >
              {t.label}
            </a>
          );
        })}
        <TabDot container={barRef} activeSelector={`[data-tab="${active}"]`} className="bottom-1.5" />
      </div>
    </div>
  );
}
