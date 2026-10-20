import Link from "next/link";
import { EVENT } from "@/lib/site";
import { ArrowRightIcon, SparkIcon } from "./icons";

export function AnnouncementBar() {
  return (
    <Link
      href="/#manifestation"
      className="group relative z-[51] block bg-brown text-cream"
    >
      <div className="container-site flex h-11 items-center justify-center gap-2.5 text-[0.8125rem] font-medium">
        <SparkIcon size={12} className="shrink-0 text-spark" />
        <span className="truncate">
          <span className="font-bold text-orange">{EVENT.name}</span>
          <span className="mx-1.5 text-cream/50">·</span>
          4, 5 & 6 décembre 2026
          <span className="hidden sm:inline">
            <span className="mx-1.5 text-cream/50">·</span>Save the date
          </span>
        </span>
        <ArrowRightIcon size={14} className="shrink-0 transition-transform duration-500 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
