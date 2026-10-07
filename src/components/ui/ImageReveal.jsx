import React, { useRef } from 'react';
import { useElementProgress } from '../../hooks/useScrollProgress';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { clamp, easeOutCubic, lerp } from '../../lib/math';
import SmartImage from './SmartImage';

/**
 * Clip-path + scale reveal driven by the element's own travel through
 * the viewport. Continuous — not an onEnter trigger.
 */
export default function ImageReveal({ src, alt, className = '', caption, ratio = '16 / 10' }) {
  const ref = useRef(null);
  const { reduced } = useReducedMotion();
  const progress = useElementProgress(ref, { start: 0.92, end: 0.35, disabled: reduced });

  const p = reduced ? 1 : easeOutCubic(progress);
  const inset = lerp(9, 0, clamp(p));

  return (
    <figure ref={ref} className={`image-reveal ${className}`} style={{ aspectRatio: ratio }}>
      <div
        className="image-reveal__mask"
        style={{
          clipPath: `inset(${inset.toFixed(2)}% ${inset.toFixed(2)}% ${inset.toFixed(2)}% ${inset.toFixed(2)}%)`,
          transform: `scale(${lerp(1.12, 1, clamp(p)).toFixed(4)})`,
          opacity: lerp(0.25, 1, clamp(p)).toFixed(3)
        }}
      >
        <SmartImage src={src} alt={alt} fallbackLabel={caption || 'INTERIORA'} />
      </div>
      {caption ? <figcaption className="t-micro muted">{caption}</figcaption> : null}
    </figure>
  );
}
