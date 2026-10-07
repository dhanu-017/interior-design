import React from 'react';
import { FINISHES } from '../3d/materials';

const FINISH_KEYS = ['oak', 'travertine', 'plaster'];
const LIGHT_KEYS = [
  { id: 'daylight', label: 'Day' },
  { id: 'evening', label: 'Evening' }
];

/**
 * Signature explorers — minimal text controls, never a dashboard.
 * Material selection re-finishes the live room; lighting re-lights it.
 */
export function MaterialExplorer({ value, onChange }) {
  return (
    <div className="explorer" role="group" aria-label="Material finish">
      <span className="explorer__label t-micro">Finish</span>
      <div className="explorer__row">
        {FINISH_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`explorer__chip t-micro ${value === key ? 'is-active' : ''}`}
            aria-pressed={value === key}
          >
            <i
              className="explorer__swatch"
              style={{ background: (FINISHES[key] && FINISHES[key].floor.color) || '#ccc' }}
              aria-hidden="true"
            />
            {FINISHES[key].label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LightingExplorer({ value, onChange }) {
  return (
    <div className="explorer" role="group" aria-label="Lighting mood">
      <span className="explorer__label t-micro">Light</span>
      <div className="explorer__row">
        {LIGHT_KEYS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => onChange(l.id)}
            className={`explorer__chip t-micro ${value === l.id ? 'is-active' : ''}`}
            aria-pressed={value === l.id}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
