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
        "group relative -mx-3 rounded-2xl px-3 py-5 transition-colors duration-300 hover:bg-cream/70 sm:flex sm:items-start sm:gap-6",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <h3 className="text-[1.0625rem] font-bold leading-snug text-brown sm:text-lg">
          {dish.name}
          {dish.aside && <span className="accent ml-1.5 text-[1.1rem] font-normal text-muted">({dish.aside})</span>}
          {dish.tag && (
            <span className="ml-2 inline-block translate-y-[-2px] rounded-full bg-orange px-2.5 py-1 align-middle text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brown">
              {dish.tag}
            </span>
          )}
        </h3>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{dish.description}</p>
        {dish.note && <p className="mt-1.5 text-[0.8125rem] font-semibold text-brown/80">{dish.note}</p>}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <p className="whitespace-nowrap text-[0.9375rem] text-brown">
            {!dish.single && <span className="text-muted">à partir de </span>}
            <strong className="font-bold">{formatFcfa(dish.price)}</strong>
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener"
            aria-label={label}
            className="btn btn-sm min-h-11 shrink-0 bg-peach px-3.5 text-brown hover:bg-orange sm:hidden"
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
        className="btn btn-sm mt-0.5 hidden min-h-11 shrink-0 border-2 border-brown/15 bg-transparent text-brown group-hover:border-orange group-hover:bg-orange hover:border-orange hover:bg-orange sm:inline-flex"
      >
        <WhatsAppIcon size={17} />
        Commander
      </a>
    </article>
  );
}
