"use client";

import Image from "next/image";
import { useState } from "react";
import type { TikTokVideo } from "@/lib/tiktok";
import { PlayIcon, TikTokIcon } from "../icons";

/**
 * Vertical video in a phone frame. Only the cover image loads with the page;
 * the TikTok player (and its scripts) loads after a tap.
 */
export function TikTokPhone({ video }: { video: TikTokVideo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative rounded-[2rem] bg-[#1b0a03] p-2 ring-1 ring-cream/10">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-black">
        {playing ? (
          <iframe
            src={`https://www.tiktok.com/player/v1/${video.id}?autoplay=1&music_info=0&description=0&rel=0&native_context_menu=0`}
            title={`${video.title} — vidéo TikTok de Chez Chiro`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 block h-full w-full text-left"
            aria-label={`Lire la vidéo « ${video.title} », publiée le ${video.date} (${video.views} de vues)`}
          >
            <Image
              src={video.cover}
              alt={video.alt}
              sizes="(min-width: 768px) 270px, 70vw"
              quality={60}
              className="zoom-img h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/40" />
            <span className="absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between text-cream">
              <span className="flex items-center gap-1.5 rounded bg-black/55 px-2 py-1 text-caption font-bold">
                <TikTokIcon size={12} /> {video.views} de vues
              </span>
            </span>
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-orange text-white transition-transform duration-200 group-hover:scale-105">
              <PlayIcon size={26} className="translate-x-0.5" />
            </span>
            <span className="absolute inset-x-4 bottom-4 text-cream">
              <span className="block text-body font-bold">{video.title}</span>
              <span className="mt-0.5 block text-caption text-cream/80">{video.date}</span>
            </span>
          </button>
        )}
      </div>
      <span aria-hidden className="absolute left-1/2 top-3.5 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/60" />
    </div>
  );
}
