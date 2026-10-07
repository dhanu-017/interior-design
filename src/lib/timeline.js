import { clamp, lerp } from './math';

/**
 * Unified scroll-timeline primitives.
 *
 * Every scene follows ENTRY → SETUP → REVEAL → TRANSFORMATION → SETTLE → EXIT.
 * Each phase occupies a segment of normalized progress with a HOLD plateau
 * after major changes so the composition can breathe:
 *
 *   MOTION → STILLNESS → MOTION → STILLNESS
 *
 * Scrolling backward reverses every value naturally because everything is a
 * pure function of progress — no imperative animation state.
 */

export const smooth = (t) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

/** 0 before `a`, 1 after `b`, smooth eased ramp between. */
export function segment(progress, a, b) {
  if (b <= a) return progress >= b ? 1 : 0;
  return smooth((progress - a) / (b - a));
}

/**
 * A phase with an eased entrance and a built-in hold.
 * `peak` is where the motion settles; values after `peak` stay at 1.
 */
export function phase(progress, start, peak, end = 1) {
  if (progress <= start) return 0;
  if (progress >= peak) return 1;
  void end;
  return smooth((progress - start) / Math.max(0.0001, peak - start));
}

/** Interpolate across keyframed stops: [[p0,v0],[p1,v1],...] */
export function track(progress, stops) {
  if (!stops.length) return 0;
  if (progress <= stops[0][0]) return stops[0][1];
  const last = stops[stops.length - 1];
  if (progress >= last[0]) return last[1];
  for (let i = 0; i < stops.length - 1; i += 1) {
    const [p0, v0] = stops[i];
    const [p1, v1] = stops[i + 1];
    if (progress >= p0 && progress <= p1) {
      return lerp(v0, v1, smooth((progress - p0) / Math.max(0.0001, p1 - p0)));
    }
  }
  return last[1];
}

/** Reveal transform for furniture entering spatially (never opacity-only). */
export function entrance(progress, start, span = 0.16) {
  const t = segment(progress, start, start + span);
  return {
    t,
    y: (1 - t) * 0.55,
    z: (1 - t) * 1.1,
    scale: 0.86 + 0.14 * t,
    opacity: segment(progress, start, start + span * 0.45),
    settled: t >= 1
  };
}
