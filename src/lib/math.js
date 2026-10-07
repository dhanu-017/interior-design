export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const inverseLerp = (a, b, v) => (b === a ? 0 : clamp((v - a) / (b - a)));

export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Multi-segment linear interpolation — the single primitive every
 * cinematic value on the site is derived from.
 *
 * interpolate(0.43, [0, 0.5, 1], [1, 1.12, 1.3]) → an actual intermediate value.
 */
export function interpolate(input, inputRange, outputRange, easing = (t) => t) {
  if (inputRange.length !== outputRange.length || inputRange.length < 2) return outputRange[0];
  const last = inputRange.length - 1;
  if (input <= inputRange[0]) return outputRange[0];
  if (input >= inputRange[last]) return outputRange[last];
  for (let i = 0; i < last; i += 1) {
    const a = inputRange[i];
    const b = inputRange[i + 1];
    if (input >= a && input <= b) {
      return lerp(outputRange[i], outputRange[i + 1], easing(inverseLerp(a, b, input)));
    }
  }
  return outputRange[last];
}

