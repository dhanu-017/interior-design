import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Extremely subtle drifting dust — believable air, never a particle storm. */
export default function Atmosphere({ damped, mobile, count = 90 }) {
  const ref = useRef();
  const seed = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = Math.random() * 3.6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.008;
    ref.current.position.y = Math.sin(t * 0.18) * 0.05 + damped.current * 0.1;
    const mat = ref.current.material;
    if (mat) mat.opacity = 0.16 + damped.current * 0.1;
  });

  if (mobile) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[seed, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#fff6e6"
        transparent
        opacity={0.2}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export function SoftVignette() {
  return null;
}
