import React, { useEffect, useMemo, useRef } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { clamp, lerp, easeInOutCubic } from '../../lib/math';
import SmartImage from '../ui/SmartImage';
import './cinematic.css';
import './spatial.css';

/* One-image cinematic treatment: continuous, eased movement instead of image crossfades. */
function heroStyle(progress) {
  const p = easeInOutCubic(clamp(progress));
  // Noticeable but gentle parallax: the image continuously travels with the
  // scroll instead of feeling like a static poster behind changing text.
  const scale = lerp(1.045, 1.16, p);
  const x = lerp(-2.2, 2.2, p);
  const y = lerp(4.5, -4.5, p);

  return {
    transform: `translate3d(${x.toFixed(3)}%, ${y.toFixed(3)}%, 0) scale(${scale.toFixed(4)})`
  };
}

function StaticScene({ states, chapter }) {
  const heroState = states[states.length - 1] || states[0];

  return (
    <section className="static-scene container">
      <header className="static-scene__head stack stack-md">
        <p className="eyebrow">{chapter.label}</p>
        <h1 className="t-display">{chapter.title}</h1>
        <p className="t-lead lead muted">{chapter.summary}</p>
      </header>
      <figure className="static-scene__figure static-scene__figure--hero">
        <SmartImage src={heroState.image} alt={heroState.alt} fallbackLabel={heroState.label} />
      </figure>
      <div className="static-scene__text stack stack-sm">
        <p className="meta">{heroState.label}</p>
        <h2 className="t-h3">{heroState.title || heroState.label}</h2>
        <p className="t-body muted">{heroState.caption}</p>
      </div>
    </section>
  );
}

/**
 * CinematicScene — natural-flow editorial section. The text remains part of
 * the normal document flow while one hero image moves continuously with the
 * user's scroll. No snap, wheel interception, or pinned multi-step sequence.
 */
export default function CinematicScene({
  states,
  chapter,
  duration = 560,
  children,
  className = '',
  variant = null,
  withExplorers = false
}) {
  const trackRef = useRef(null);
  const { reduced } = useReducedMotion();
  const progress = useScrollProgress(trackRef, { disabled: reduced });

  /* Only one hero image is loaded for the cinematic stage. This removes the
     crossfade stack and keeps scrolling GPU-light even on mobile/lower-end devices. */
  const heroState = states[states.length - 1] || states[0];
  const heroMotion = useMemo(() => heroStyle(progress), [progress]);

  useEffect(() => {
    if (!heroState?.image) return;
    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = 'high';
    img.src = heroState.image;
  }, [heroState]);

  const activeIndex = useMemo(() => {
    const idx = states.findIndex((s) => progress >= s.range[0] && progress < s.range[1]);
    return idx === -1 ? states.length - 1 : idx;
  }, [states, progress]);

  if (reduced) return <StaticScene states={states} chapter={chapter} />;

  /* The cinematic stage intentionally uses one image only. The previous
     3D + multi-photo hybrid was visually rich but expensive to scroll. */

  return (
    <section
      ref={trackRef}
      className={`scene ${className}`}
      style={{ '--scene-height': `${duration}vh` }}
      aria-label={chapter.title}
    >
      <div className="scene__stage">
        <div className="scene__media" aria-hidden="false">
          <div className="scene__photos scene__photos--single">
            <figure className="scene__layer scene__layer--single">
              <SmartImage
                className="scene__img"
                src={heroState.image}
                alt={heroState.alt}
                fallbackLabel={heroState.label}
                loading="eager"
                style={heroMotion}
              />
            </figure>
          </div>
          <div className="scene__scrim" />
          <div
            className="scene__grain"
            style={{ transform: `translate3d(${(progress * -1.8).toFixed(2)}%, ${(progress * 1.2).toFixed(2)}%, 0)` }}
          />
          <div className="scene__frame" />
        </div>

        <div className="scene__overlay">
          {typeof children === 'function'
            ? children({ progress, activeIndex, states, chapter })
            : children}
        </div>

      </div>
    </section>
  );
}
