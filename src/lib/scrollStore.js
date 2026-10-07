/**
 * One shared scroll bus for the entire application.
 * Components subscribe; a single passive listener + rAF flush feeds them all.
 * No component adds its own `onScroll` handler.
 */
const subscribers = new Set();
const invalidators = new Set();

let queued = false;
let lastY = typeof window !== 'undefined' ? window.scrollY : -1;

function flush() {
  queued = false;
  const y = window.scrollY;
  if (y === lastY) return;
  lastY = y;
  subscribers.forEach((fn) => fn(y));
}

function queue() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(flush);
}

/** Geometry changed (resize / image load / route change): re-measure + re-emit. */
export function invalidate() {
  lastY = -1;
  invalidators.forEach((fn) => fn());
  queue();
}

export function subscribe(fn) {
  subscribers.add(fn);
  fn(window.scrollY);
  return () => subscribers.delete(fn);
}

export function onInvalidate(fn) {
  invalidators.add(fn);
  return () => invalidators.delete(fn);
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', invalidate);
  window.addEventListener('orientationchange', invalidate);
}
