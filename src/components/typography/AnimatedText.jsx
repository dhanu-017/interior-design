import React from 'react';
import { clamp, easeOutExpo } from '../../lib/math';

/**
 * Per-word staggered reveal with a soft blur lift — adapted from the
 * React Bits "BlurText / SplitText" component patterns.
 */
export default function AnimatedText({
  text,
  progress = 1,
  range = [0, 1],
  className = '',
  as: Tag = 'p',
  blur = true
}) {
  const words = text.split(' ');
  const span = range[1] - range[0];
  const per = span / (words.length + 5);

  return (
    <Tag className={`at ${className}`}>
      {words.map((word, i) => {
        const start = range[0] + i * per;
        const p = easeOutExpo(clamp((progress - start) / (per * 2.6)));
        return (
          <span
            key={`${word}-${i}`}
            className="at__word"
            style={{
              opacity: p.toFixed(3),
              transform: `translate3d(0, ${((1 - p) * 18).toFixed(2)}px, 0)`,
              filter: blur ? `blur(${((1 - p) * 6).toFixed(2)}px)` : 'none'
            }}
          >
            {word}{' '}
          </span>
        );
      })}
    </Tag>
  );
}
