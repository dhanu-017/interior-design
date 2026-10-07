import React from 'react';
import { MATERIAL } from './materials';

/**
 * Process — the design table. Scroll orbits the table while artifacts
 * become physical objects: sketch → plan → massing model → samples → reveal.
 */
export function ProcessTable({ reveal, e }) {
  return (
    <group position={[0, 0, 0.3]}>
      {/* Table */}
      <mesh position={[0, 0.62 - (1 - reveal.shell) * 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.14, 2.2]} />
        <meshStandardMaterial {...MATERIAL.oak} transparent opacity={0.3 + reveal.shell * 0.7} />
      </mesh>
      {[[-2, -0.9], [2, -0.9], [-2, 0.9], [2, 0.9]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.28, z]} castShadow>
          <boxGeometry args={[0.12, 0.62, 0.12]} />
          <meshStandardMaterial {...MATERIAL.walnut} transparent opacity={0.3 + reveal.shell * 0.7} />
        </mesh>
      ))}

      {/* Sketch sheet */}
      {e.sketch.opacity > 0.01 ? (
        <group position={[-1.35, 0.78 + e.sketch.y, 0.15 + e.sketch.z * 0.3]} rotation={[-0.12, 0.1, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.15, 0.015, 1.5]} />
            <meshStandardMaterial color="#f6f1e6" roughness={0.9} transparent opacity={e.sketch.opacity} />
          </mesh>
          <mesh position={[0, 0.012, -0.3]}>
            <boxGeometry args={[0.85, 0.006, 0.5]} />
            <meshStandardMaterial color="#c9b69a" roughness={0.9} transparent opacity={e.sketch.opacity} />
          </mesh>
        </group>
      ) : null}

      {/* Floor plan sheet */}
      {e.plan.opacity > 0.01 ? (
        <group position={[-0.1, 0.78 + e.plan.y, -0.25 + e.plan.z * 0.3]} rotation={[-0.1, -0.06, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.3, 0.015, 1.0]} />
            <meshStandardMaterial color="#eef0ee" roughness={0.9} transparent opacity={e.plan.opacity} />
          </mesh>
          <mesh position={[-0.2, 0.012, 0]}>
            <boxGeometry args={[0.5, 0.006, 0.7]} />
            <meshStandardMaterial color="#5c564c" roughness={0.9} transparent opacity={e.plan.opacity * 0.8} />
          </mesh>
        </group>
      ) : null}

      {/* Massing model */}
      {e.model.opacity > 0.01 ? (
        <group position={[1.25, 0.7 + e.model.y, 0.3]} scale={e.model.scale}>
          <mesh position={[0, 0.22, 0]} castShadow>
            <boxGeometry args={[0.9, 0.44, 0.7]} />
            <meshStandardMaterial color="#e8ded0" roughness={0.85} transparent opacity={e.model.opacity} />
          </mesh>
          <mesh position={[-0.15, 0.55, 0.05]} castShadow>
            <boxGeometry args={[0.5, 0.24, 0.4]} />
            <meshStandardMaterial color="#d5c6ae" roughness={0.85} transparent opacity={e.model.opacity} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[1.2, 0.04, 1.0]} />
            <meshStandardMaterial {...MATERIAL.walnut} transparent opacity={e.model.opacity} />
          </mesh>
        </group>
      ) : null}

      {/* Material samples */}
      {e.samples.opacity > 0.01 ? (
        <group position={[0.35, 0.74 + e.samples.y, 0.75]} rotation={[0, 0.25, 0]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[-0.4 + i * 0.4, 0.03, 0]} rotation={[-0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.32, 0.05, 0.42]} />
              <meshStandardMaterial
                color={['#c9a06f', '#ddd3c2', '#6f5138'][i]}
                roughness={0.6}
                transparent
                opacity={e.samples.opacity}
              />
            </mesh>
          ))}
        </group>
      ) : null}
    </group>
  );
}

/**
 * Portfolio — a calm spatial gallery. Frames rest on the back wall;
 * the active frame drifts forward as scroll passes.
 */
export function GalleryWall({ progress, count = 5 }) {
  const active = Math.min(count - 1, Math.floor(progress * count));
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 2.1, -4.55]} receiveShadow>
        <boxGeometry args={[12, 4.4, 0.15]} />
        <meshStandardMaterial color="#efe8db" roughness={0.96} />
      </mesh>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        const z = -4.3 + (isActive ? 0.55 : 0);
        const s = isActive ? 1.06 : 1;
        const x = (i - (count - 1) / 2) * 1.55;
        return (
          <group key={i} position={[x * 0.62, 1.85, z]} scale={s}>
            <mesh castShadow>
              <boxGeometry args={[1.15, 1.45, 0.07]} />
              <meshStandardMaterial color={isActive ? '#2c2620' : '#4a4239'} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.045]}>
              <boxGeometry args={[1.0, 1.3, 0.02]} />
              <meshStandardMaterial
                color={['#d9c3a3', '#cfd6cf', '#d8c9b4', '#c4b49a', '#e0d5c2'][i % 5]}
                roughness={0.9}
              />
            </mesh>
            <mesh position={[0, -0.95, 0.02]}>
              <boxGeometry args={[0.5, 0.03, 0.03]} />
              <meshStandardMaterial color="#a67c4e" roughness={0.4} metalness={0.7} />
            </mesh>
          </group>
        );
      })}
      {/* Bench */}
      <mesh position={[0, 0.32, -2.6]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.16, 0.7]} />
        <meshStandardMaterial {...MATERIAL.oak} />
      </mesh>
      {[[-1.4], [1.4]].map(([x], i) => (
        <mesh key={i} position={[x, 0.12, -2.6]} castShadow>
          <boxGeometry args={[0.12, 0.28, 0.6]} />
          <meshStandardMaterial {...MATERIAL.walnut} />
        </mesh>
      ))}
    </group>
  );
}
