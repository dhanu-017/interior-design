import React, { useRef, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * UIverse "magnetic button" pattern, restyled to the INTERIORA system:
 * hairline bronze border, tracked uppercase label, magnetic pointer pull.
 */
export default function MagneticButton({
  as: Tag = 'a',
  children,
  variant = 'ghost',
  className = '',
  strength = 0.32,
  icon = '→',
  ...props
}) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const { reduced } = useReducedMotion();

  const handleMove = useCallback(
    (event) => {
      if (reduced || !wrapRef.current || !innerRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      innerRef.current.style.transform = `translate3d(${(x * strength).toFixed(2)}px, ${(y * strength).toFixed(2)}px, 0)`;
    },
    [reduced, strength]
  );

  const handleLeave = useCallback(() => {
    if (innerRef.current) innerRef.current.style.transform = '';
  }, []);

  return (
    <Tag
      ref={wrapRef}
      className={`btn btn--${variant} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onBlur={handleLeave}
      {...props}
    >
      <span className="btn__inner" ref={innerRef}>
        <span className="btn__label t-meta">{children}</span>
        {icon ? <span className="btn__icon" aria-hidden="true">{icon}</span> : null}
      </span>
    </Tag>
  );
}
