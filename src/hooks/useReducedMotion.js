import { useEffect, useState, useCallback } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';
const STORAGE_KEY = 'interiora:calm-mode';

function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'on';
  } catch {
    return false;
  }
}

/**
 * True when the OS asks for reduced motion OR the visitor enabled
 * "Calm mode" in the footer toggle. Every animation path checks this.
 */
export function useReducedMotion() {
  const [system, setSystem] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(QUERY).matches : false
  );
  const [manual, setManual] = useState(readStored);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(QUERY);
    const handler = (e) => setSystem(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const setCalmMode = useCallback((on) => {
    setManual(on);
    try {
      window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch {
      /* storage unavailable — state still applies for the session */
    }
  }, []);

  return { reduced: system || manual, manual, setCalmMode };
}
