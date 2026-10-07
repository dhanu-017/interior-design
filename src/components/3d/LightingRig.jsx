import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { track } from '../../lib/timeline';

/**
 * Architectural lighting that evolves with the scroll:
 * soft daylight → directional sun → warm interior glow.
 * `mode` from the lighting explorer biases the blend.
 */
const MODES = {
  daylight: { sun: 0.2, warm: 0.1, sky: 1 },
  evening: { sun: 0.55, warm: 1, sky: 0.55 },
  ambient: { sun: 0.1, warm: 0.55, sky: 0.8 }
};

export default function LightingRig({ damped, mode = 'evening', mobile }) {
  const sun = useRef();
  const warmA = useRef();
  const warmB = useRef();
  const amb = useRef();

  useFrame(() => {
    const p = damped.current;
    const m = MODES[mode] || MODES.evening;

    const daylight = 1.05 - p * 0.25;
    const sunI = (0.9 + track(p, [[0, 0], [0.5, 0.7], [1, 1.4]])) * (0.6 + m.sun * 0.8);
    const warmth = track(p, [[0, 0.1], [0.45, 0.45], [1, 1]]) * (0.35 + m.warm);

    if (sun.current) {
      sun.current.intensity = THREE.MathUtils.lerp(sun.current.intensity, sunI * 1.35, 0.05);
      sun.current.color.lerp(
        new THREE.Color(p > 0.55 ? '#ffdfae' : '#fff4e2'),
        0.04
      );
    }
    if (amb.current) amb.current.intensity = THREE.MathUtils.lerp(amb.current.intensity, daylight * m.sky, 0.05);
    if (warmA.current) warmA.current.intensity = THREE.MathUtils.lerp(warmA.current.intensity, (4 + warmth * 14) * (mobile ? 0.7 : 1), 0.06);
    if (warmB.current) warmB.current.intensity = THREE.MathUtils.lerp(warmB.current.intensity, (2 + warmth * 8) * (mobile ? 0.7 : 1), 0.06);
  });

  return (
    <group>
      <ambientLight ref={amb} intensity={0.95} color="#fff8ee" />
      <directionalLight
        ref={sun}
        castShadow={!mobile}
        position={[4.5, 6.5, 4]}
        intensity={1.4}
        color="#fff2df"
        shadow-mapSize-width={mobile ? 1024 : 2048}
        shadow-mapSize-height={mobile ? 1024 : 2048}
        shadow-camera-near={0.5}
        shadow-camera-far={22}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-bias={-0.0004}
      />
      {/* Warm interior pendants */}
      <pointLight ref={warmA} position={[0.2, 2.9, 1.4]} color="#f6d49c" intensity={8} distance={8} decay={2} />
      <pointLight ref={warmB} position={[-2.9, 1.9, 2.0]} color="#f7e3bd" intensity={5} distance={6.5} decay={2} />
      {!mobile ? (
        <spotLight
          position={[-2.4, 4.6, 2.4]}
          angle={0.5}
          penumbra={0.8}
          intensity={22}
          color="#f3dcae"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      ) : null}
    </group>
  );
}
