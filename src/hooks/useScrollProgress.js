import { useEffect, useRef, useState } from 'react';
import { subscribe, onInvalidate } from '../lib/scrollStore';
import { clamp } from '../lib/math';

/**
 * Normalized 0 → 1 progress for a PINNED scene track.
 * Used by CinematicScene. Geometry is cached and re-measured only on
 * invalidation, so nothing forces layout on every frame.
 */
export function useScrollProgress(ref, { offset = 0, disabled = false } = {}) {
  const [progress, setProgress] = useState(0);
  const geo = useRef({ start: 0, range: 1 });

  useEffect(() => {
    if (disabled || !ref.current) return undefined;
    const el = ref.current;
    let last = -1;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      geo.current.start = rect.top + window.scrollY - offset * window.innerHeight;
      geo.current.range = Math.max(1, el.offsetHeight - window.innerHeight);
    };

    const update = () => {
      const p = clamp((window.scrollY - geo.current.start) / geo.current.range);
      if (Math.abs(p - last) > 0.0009) {
        last = p;
        setProgress(p);
      }
    };

    const handleInvalidate = () => {
      measure();
      update();
    };

    measure();
    update();

    const unsub = subscribe(update);
    const offInvalidate = onInvalidate(handleInvalidate);
    const ro = new ResizeObserver(handleInvalidate);
    ro.observe(el);
    window.addEventListener('load', handleInvalidate);

    return () => {
      unsub();
      offInvalidate();
      ro.disconnect();
      window.removeEventListener('load', handleInvalidate);
    };
  }, [ref, offset, disabled]);

  return progress;
}

/**
 * Normalized 0 → 1 progress as an ELEMENT travels through the viewport.
 * `start` = viewport fraction where progress is 0 (element top),
 * `end`   = viewport fraction where progress is 1 (element bottom).
 */
export function useElementProgress(ref, { start = 0.95, end = 0.25, disabled = false } = {}) {
  const [progress, setProgress] = useState(0);
  const geo = useRef({ top: 0, height: 1 });

  useEffect(() => {
    if (disabled || !ref.current) return undefined;
    const el = ref.current;
    let last = -1;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      geo.current.top = rect.top + window.scrollY;
      geo.current.height = el.offsetHeight;
    };

    const update = () => {
      const vh = window.innerHeight;
      const numerator = window.scrollY + start * vh - geo.current.top;
      const denominator = Math.max(1, geo.current.height + (start - end) * vh);
      const p = clamp(numerator / denominator);
      if (Math.abs(p - last) > 0.004) {
        last = p;
        setProgress(p);
      }
    };

    const handleInvalidate = () => {
      measure();
      update();
    };

    measure();
    update();

    const unsub = subscribe(update);
    const offInvalidate = onInvalidate(handleInvalidate);
    const ro = new ResizeObserver(handleInvalidate);
    ro.observe(el);

    return () => {
      unsub();
      offInvalidate();
      ro.disconnect();
    };
  }, [ref, start, end, disabled]);

  return progress;
}

/** Boolean flag that flips only when a threshold is crossed (cheap UI state). */
export function useScrollFlag(thresholdVh = 0.12, disabled = false) {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (disabled) return undefined;
    const update = () => {
      const next = window.scrollY > window.innerHeight * thresholdVh;
      setFlag((prev) => (prev === next ? prev : next));
    };
    update();
    return subscribe(update);
  }, [thresholdVh, disabled]);
  return flag;
}
