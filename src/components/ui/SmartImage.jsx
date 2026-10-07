import React, { useCallback, useState } from 'react';

/**
 * Every image on the site goes through here. A failed load renders a
 * consistent architectural fallback instead of breaking the composition.
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  style,
  loading = 'lazy',
  fallbackLabel = 'INTERIORA',
  ...rest
}) {
  const [failed, setFailed] = useState(false);
  const handleError = useCallback(() => setFailed(true), []);

  if (failed) {
    return (
      <div
        className={`smart-image smart-image--fallback ${className}`}
        style={style}
        role="img"
        aria-label={alt || `${fallbackLabel} visual`}
      >
        <span className="smart-image__grid" aria-hidden="true" />
        <span className="smart-image__label t-micro">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      {...rest}
      className={`smart-image ${className}`}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      style={style}
      onError={handleError}
    />
  );
}
