import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useElementProgress } from '../../hooks/useScrollProgress';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { interpolate, easeOutCubic } from '../../lib/math';

export default function NextChapter({ to, label, title, image, alt }) {
  const ref = useRef(null);
  const { reduced } = useReducedMotion();
  const progress = useElementProgress(ref, { start: 0.95, end: 0.3, disabled: reduced });
  const p = reduced ? 1 : easeOutCubic(progress);

  return (
    <Link ref={ref} to={to} className="next-chapter">
      <div
        className="next-chapter__media"
        style={{
          transform: `scale(${interpolate(p, [0, 1], [1.18, 1]).toFixed(4)})`,
          opacity: interpolate(p, [0, 1], [0.35, 1]).toFixed(3)
        }}
      >
        <img src={image} alt={alt} loading="lazy" decoding="async" />
      </div>
      <div className="next-chapter__content container">
        <p className="eyebrow">Continue reading</p>
        <h2 className="t-h1 next-chapter__title">{title}</h2>
        <span className="next-chapter__label t-meta">
          {label}
          <i
            aria-hidden="true"
            style={{ transform: `translateX(${interpolate(p, [0, 1], [0, 18]).toFixed(2)}px)` }}
          >
            →
          </i>
        </span>
      </div>
    </Link>
  );
}
