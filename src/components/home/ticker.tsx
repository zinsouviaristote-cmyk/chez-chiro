import { SparkIcon } from "../icons";

const ITEMS = [
  "Sauce Gbota Royal",
  "Wassa-wassa",
  "Poulet bicyclette braisé",
  "Attiéké poisson",
  "Télibo sauce mouton",
  "Chawarma du chef",
  "Tapioriz au lait",
  "Riz au gras",
  "Croupion de dinde",
  "Jus de bissap",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center">
          <span className="display whitespace-nowrap px-6 text-[1.6rem] tracking-[-0.01em] md:px-9 md:text-[2.1rem]">
            {item}
          </span>
          <SparkIcon size={16} className="text-orange" />
        </li>
      ))}
    </ul>
  );
}

/** Slow dish-name ticker. Pure CSS (compositor-only), pauses on hover. */
export function Ticker() {
  return (
    <div role="marquee" className="overflow-hidden border-y border-brown/10 bg-brown py-4 text-cream md:py-5" aria-label="Quelques plats de la carte">
      <div className="marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
