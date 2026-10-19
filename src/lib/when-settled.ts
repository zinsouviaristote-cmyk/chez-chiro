/**
 * Runs `callback` once the page has settled: on the first interaction, or
 * `delay` ms after the load event (then on idle), whichever comes first.
 * Keeps non-essential JavaScript (Motion) off the loading path, where it
 * would compete with the hero photo and hydration on low-end phones.
 * Returns a cleanup function.
 */
export function whenSettled(callback: () => void, delay = 2500) {
  const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
  let done = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let idleId: number | undefined;

  const cleanup = () => {
    events.forEach((name) => window.removeEventListener(name, run));
    window.removeEventListener("load", onLoad);
    clearTimeout(timer);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
  };

  function run() {
    if (done) return;
    done = true;
    cleanup();
    callback();
  }

  function onLoad() {
    timer = setTimeout(() => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(run, { timeout: 2000 });
      else run();
    }, delay);
  }

  events.forEach((name) => window.addEventListener(name, run, { passive: true }));
  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad);

  return () => {
    done = true;
    cleanup();
  };
}
