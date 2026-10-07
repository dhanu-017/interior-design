import React from 'react';
import { clamp, interpolate, easeOutCubic } from '../../lib/math';

/**
 * Masked line-by-line reveal. Progress-driven, so a line can be caught
 * mid-rise when the user stops scrolling.
 * Adapted from React Bits "SplitText / TextAnimate" patterns.
 */
export default function AnimatedHeading({
  lines,
  progress = 1,
  range = [0, 1],
  className = '',
  as: Tag = 'h1',
  weight = 't-display'
}) {
  const span = range[1] - range[0];
  const step = span / (lines.length + 1.2);

  return (
    <Tag className={`ah ${weight} ${className}`}>
      {lines.map((line, i) => {
        const start = range[0] + i * step * 0.72;
        const p = clamp((progress - start) / (step * 1.35));
        const eased = easeOutCubic(p);
        return (
          <span className="ah__line" key={`${line}-${i}`}>
            <span
              className="ah__inner"
              style={{
                transform: `translate3d(0, ${((1 - eased) * 112).toFixed(2)}%, 0)`,
                opacity: eased.toFixed(3)
              }}
            >
              {line}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
