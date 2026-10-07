import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import SpatialScene from './SpatialScene';
import { useIsMobile } from '../../hooks/useMediaQuery';
import ErrorBoundary from '../shell/ErrorBoundary';

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

/**
 * ExperienceCanvas — production WebGL wrapper.
 * - Critical hero scene mounts immediately; no global asset preload.
 * - Premium veil (brand mark + hairline) with no percentages.
 * - Image fallback when WebGL is unavailable or fails.
 */
export default function ExperienceCanvas({
  variant = 'home',
  target,
  finish = 'oak',
  lightMode = 'evening',
  fallbackImage,
  fallbackAlt = ''
}) {
  const mobile = useIsMobile();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [noGL, setNoGL] = useState(false);
  const damped = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!webglAvailable()) setNoGL(true);
  }, []);

  useEffect(() => {
    if (mobile || noGL) return undefined;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [mobile, noGL]);

  // Keep damped value near target on first paint so the opening frame is correct.
  useEffect(() => {
    damped.current = target.current;
  }, [target]);

  if (noGL || failed) {
    return (
      <div className="scene__canvas scene__canvas--fallback" aria-hidden="true">
        {fallbackImage ? <img src={fallbackImage} alt="" loading="eager" decoding="async" /> : null}
        <span className="scene__veil-mark">INTERIORA</span>
        <span className="sr-only">{fallbackAlt}</span>
      </div>
    );
  }

  return (
    <div className="scene__canvas" aria-hidden="true">
      <ErrorBoundary>
      <Canvas
        shadows={!mobile}
        dpr={mobile ? [1, 1.5] : [1, 1.9]}
        gl={{ antialias: !mobile, powerPreference: 'high-performance', alpha: false }}
        camera={{ position: [0, 2, 8.4], fov: 35, near: 0.1, far: 60 }}
        onCreated={({ gl }) => {
          requestAnimationFrame(() => setReady(true));
          gl.setClearColor('#ece4d6');
        }}
        onError={() => setFailed(true)}
      >
        <color attach="background" args={['#ece4d6']} />
        <fog attach="fog" args={['#ece4d6', mobile ? 9 : 8, mobile ? 20 : 19]} />
        <Suspense fallback={null}>
          <SpatialScene
            variant={variant}
            target={target}
            damped={damped}
            pointer={pointer}
            finish={finish}
            lightMode={lightMode}
            mobile={mobile}
          />
        </Suspense>
      </Canvas>
      </ErrorBoundary>
      <div className={`scene__veil ${ready ? 'is-lifted' : ''}`}>
        <span className="scene__veil-mark">INTERIORA</span>
        <span className="scene__veil-line" />
      </div>
    </div>
  );
}
