import type { Dish } from "@/lib/menu";
import { dishOrderLink } from "@/lib/whatsapp";
import { cn, formatFcfa } from "@/lib/utils";
import { WhatsAppIcon } from "../icons";

export function DishRow({ dish, className }: { dish: Dish; className?: string }) {
  const fullName = dish.aside ? `${dish.name} (${dish.aside})` : dish.name;
  const href = dishOrderLink(fullName, dish.price, dish.single);
  const label = `Commander ${fullName} sur WhatsApp`;
  return (
    <article
      className={cn(
        "group relative -mx-3 rounded-lg px-3 py-5 transition-colors duration-200 hover:bg-surface sm:flex sm:items-start sm:gap-6",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <h3 className="text-[1.0625rem] font-bold leading-snug text-ink sm:text-subheading sm:font-bold">
          {dish.name}
          {dish.aside && <span className="ml-1.5 font-normal text-ink-soft">({dish.aside})</span>}
          {dish.tag && (
            <span className="ml-2 inline-block translate-y-[-2px] rounded bg-brown px-2 py-0.5 align-middle text-caption font-bold uppercase tracking-[0.06em] text-cream">
              {dish.tag}
            </span>
          )}
        </h3>
        <p className="mt-1 text-small text-ink-soft">{dish.description}</p>
        {dish.note && <p className="mt-1.5 text-caption font-bold text-ink-soft">{dish.note}</p>}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <p className="whitespace-nowrap text-body tabular-nums text-ink">
            {!dish.single && <span className="text-ink-soft">à partir de </span>}
            <strong className="font-bold">{formatFcfa(dish.price)}</strong>
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener"
            aria-label={label}
            className="btn btn-outline btn-sm shrink-0 sm:hidden"
          >
            <WhatsAppIcon size={17} />
            Commander
          </a>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        aria-label={label}
        className="btn btn-outline btn-sm mt-0.5 hidden shrink-0 bg-cream sm:inline-flex"
      >
        <WhatsAppIcon size={17} />
        Commander
      </a>
    </article>
  );
}
