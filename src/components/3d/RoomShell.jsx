import React from 'react';
import { FINISHES, MATERIAL } from './materials';

/**
 * RoomShell — reusable procedural architecture.
 * Floor · walls · ceiling · window wall with mullions · baseboards · column.
 * Everything is softly revealed by `reveal` stage values (0→1 each).
 */
export function Wall({ position, size, material, opacity = 1 }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={material.color}
        roughness={material.roughness}
        metalness={material.metalness}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

export default function RoomShell({
  reveal,
  finish = 'oak',
  wide = false,
  withColumn = false
}) {
  const pal = FINISHES[finish] || FINISHES.oak;
  const W = wide ? 13 : 10;
  const D = wide ? 11 : 10;

  const shellT = reveal.shell;
  const floorT = reveal.floor;
  const windowT = reveal.window;

  const wallOpacity = 0.15 + 0.85 * shellT;
  const floorOpacity = 0.1 + 0.9 * floorT;

  return (
    <group>
      {/* Floor slab */}
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <boxGeometry args={[W, 0.12, D]} />
        <meshStandardMaterial
          color={pal.floor.color}
          roughness={pal.floor.roughness}
          metalness={pal.floor.metalness}
          transparent={floorOpacity < 1}
          opacity={floorOpacity}
        />
      </mesh>

      {/* Rug / stone inlay — appears with material phase */}
      <mesh position={[0, -0.47, 0.4]} receiveShadow>
        <boxGeometry args={[5.6, 0.03, 3.4]} />
        <meshStandardMaterial
          color={MATERIAL.travertine.color}
          roughness={0.7}
          metalness={0.02}
          transparent
          opacity={reveal.material * 0.95}
        />
      </mesh>

      {/* Back wall */}
      <Wall
        position={[0, 2.2 - (1 - shellT) * 0.6, -D / 2 + 0.2]}
        size={[W, 4.6, 0.15]}
        material={{ ...MATERIAL.plasterWarm, color: pal.wall.color }}
        opacity={wallOpacity}
      />
      {/* Side walls */}
      <Wall
        position={[-W / 2 + 0.1, 2.2 - (1 - shellT) * 0.6, 0]}
        size={[0.15, 4.6, D]}
        material={MATERIAL.plasterWarm}
        opacity={wallOpacity}
      />
      <Wall
        position={[W / 2 - 0.1, 2.2 - (1 - shellT) * 0.6, 0]}
        size={[0.15, 4.6, D]}
        material={MATERIAL.plasterCool}
        opacity={wallOpacity}
      />
      {/* Ceiling — settles in slightly later */}
      <mesh position={[0, 4.55 - (1 - reveal.ceiling) * 0.5, 0]}>
        <boxGeometry args={[W, 0.12, D]} />
        <meshStandardMaterial
          color={MATERIAL.ceiling.color}
          roughness={1}
          transparent
          opacity={0.2 + 0.8 * reveal.ceiling}
        />
      </mesh>

      {/* Window glazing on back wall */}
      <group position={[0, 1.9, -D / 2 + 0.32]}>
        <mesh>
          <boxGeometry args={[4.4, 2.3, 0.05]} />
          <meshStandardMaterial
            color={MATERIAL.glass.color}
            roughness={0.06}
            metalness={0.15}
            transparent
            opacity={0.25 + windowT * 0.6}
            emissive="#e8f0f4"
            emissiveIntensity={0.12 + windowT * 0.35}
          />
        </mesh>
        {/* Timber mullions */}
        {[-1.1, 0, 1.1].map((x) => (
          <mesh key={x} position={[x, 0, 0.03]}>
            <boxGeometry args={[0.07, 2.3, 0.07]} />
            <meshStandardMaterial {...MATERIAL.oakDeep} />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[4.4, 0.07, 0.07]} />
          <meshStandardMaterial {...MATERIAL.oakDeep} />
        </mesh>
        {/* Sill */}
        <mesh position={[0, -1.2, 0.12]}>
          <boxGeometry args={[4.6, 0.09, 0.3]} />
          <meshStandardMaterial {...MATERIAL.travertine} />
        </mesh>
      </group>

      {/* Baseboards */}
      <mesh position={[0, -0.28, -D / 2 + 0.32]}>
        <boxGeometry args={[W - 0.4, 0.14, 0.05]} />
        <meshStandardMaterial color="#efe8da" roughness={0.8} transparent opacity={wallOpacity} />
      </mesh>

      {/* Optional structural column for commercial generosity */}
      {withColumn ? (
        <mesh position={[-3.4, 2, 1.4]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.24, 4.4, 24]} />
          <meshStandardMaterial {...MATERIAL.plasterWarm} transparent opacity={wallOpacity} />
        </mesh>
      ) : null}

      {/* Sun patch on floor — warms as light develops */}
      <mesh position={[0.4, -0.46, -1.2]} rotation={[-Math.PI / 2, 0, 0.18]}>
        <planeGeometry args={[3.6, 2.1]} />
        <meshBasicMaterial color="#fff3da" transparent opacity={reveal.light * 0.28} depthWrite={false} />
      </mesh>
    </group>
  );
}
