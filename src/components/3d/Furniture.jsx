import React from 'react';
import { MATERIAL } from './materials';

function M({ color, roughness, metalness, ...rest }) {
  return <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} {...rest} />;
}

function RevealGroup({ e, children, position = [0, 0, 0] }) {
  if (!e || e.opacity <= 0.01) return null;
  return (
    <group
      position={[position[0], position[1] + e.y, position[2] + e.z]}
      scale={e.scale}
    >
      <group position={[-position[0], -position[1], -position[2]]}>
        <group position={position}>{children}</group>
      </group>
    </group>
  );
}

export function Sofa({ e }) {
  return (
    <RevealGroup e={e} position={[-1.9, 0, 0.6]}>
      <group>
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.3, 0.5, 0.95]} />
          {M(MATERIAL.linen)}
        </mesh>
        <mesh position={[0, 0.72, -0.42]} castShadow>
          <boxGeometry args={[2.3, 0.62, 0.24]} />
          {M(MATERIAL.linen)}
        </mesh>
        {[-1.05, 1.05].map((x) => (
          <mesh key={x} position={[x, 0.62, 0]} castShadow>
            <boxGeometry args={[0.22, 0.5, 0.95]} />
            {M(MATERIAL.linen)}
          </mesh>
        ))}
        {[630, 640].map((_, i) => (
          <mesh key={i} position={[-0.55 + i * 1.1, 0.66, -0.28]} rotation={[0.15, 0, 0]} castShadow>
            <boxGeometry args={[0.62, 0.42, 0.18]} />
            {M(i ? MATERIAL.boucle : MATERIAL.ceramic)}
          </mesh>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-0.95 + i * 0.63, 0.05, i % 2 ? 0.32 : -0.32]}>
            <cylinderGeometry args={[0.035, 0.035, 0.12, 12]} />
            {M(MATERIAL.walnut)}
          </mesh>
        ))}
      </group>
    </RevealGroup>
  );
}

export function LoungeChair({ e, position = [2.4, 0, 0.9], flip = false }) {
  return (
    <RevealGroup e={e} position={position}>
      <group rotation={[0, flip ? 0.5 : -0.45, 0]}>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.42, 0.8]} />
          {M(MATERIAL.boucle)}
        </mesh>
        <mesh position={[0, 0.68, -0.4]} rotation={[0.18, 0, 0]} castShadow>
          <boxGeometry args={[0.85, 0.7, 0.2]} />
          {M(MATERIAL.boucle)}
        </mesh>
        <mesh position={[0, 0.28, 0.62]} castShadow>
          <boxGeometry args={[0.7, 0.08, 0.3]} />
          {M(MATERIAL.oak)}
        </mesh>
      </group>
    </RevealGroup>
  );
}

export function CoffeeTable({ e }) {
  return (
    <RevealGroup e={e} position={[0.2, 0, 1.5]}>
      <group>
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.85, 0.95, 0.09, 36]} />
          {M(MATERIAL.travertine)}
        </mesh>
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.2, 0.28, 20]} />
          {M(MATERIAL.oakDeep)}
        </mesh>
        <mesh position={[0.3, 0.44, 0.15]} castShadow>
          <cylinderGeometry args={[0.14, 0.11, 0.22, 20]} />
          {M(MATERIAL.ceramic)}
        </mesh>
      </group>
    </RevealGroup>
  );
}

export function FloorLamp({ e, position = [-3.1, 0, 2.1] }) {
  return (
    <RevealGroup e={e} position={position}>
      <group>
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.24, 0.08, 20]} />
          {M(MATERIAL.bronze)}
        </mesh>
        <mesh position={[0, 0.95, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.9, 12]} />
          {M(MATERIAL.bronze)}
        </mesh>
        <mesh position={[0, 1.95, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.42, 0.5, 24, 1, true]} />
          <meshStandardMaterial color="#f2e7d2" roughness={0.9} side={2} transparent opacity={0.96} />
        </mesh>
        <mesh position={[0, 1.82, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#ffe9bd" transparent opacity={0.9} />
        </mesh>
      </group>
    </RevealGroup>
  );
}

export function Plant({ e, position = [3.3, 0, -1.4] }) {
  return (
    <RevealGroup e={e} position={position}>
      <group>
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.32, 0.56, 20]} />
          {M(MATERIAL.ceramic)}
        </mesh>
        <mesh position={[0, 1.05, 0]} castShadow>
          <sphereGeometry args={[0.55, 20, 20]} />
          {M(MATERIAL.leaf)}
        </mesh>
        <mesh position={[0.3, 0.85, 0.2]} castShadow>
          <sphereGeometry args={[0.34, 18, 18]} />
          {M({ ...MATERIAL.leaf, color: '#6d8a56' })}
        </mesh>
      </group>
    </RevealGroup>
  );
}

export function Artwork({ e, position = [3.35, 1.6, 0.6] }) {
  return (
    <RevealGroup e={e} position={position}>
      <group rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 1.9, 0.08]} />
          {M(MATERIAL.paper)}
        </mesh>
        <mesh position={[0, 0.2, 0.06]}>
          <boxGeometry args={[1.1, 0.7, 0.02]} />
          {M({ color: '#d9bfa0', roughness: 0.85, metalness: 0 })}
        </mesh>
        <mesh position={[0, -0.55, 0.06]}>
          <boxGeometry args={[1.1, 0.28, 0.02]} />
          {M({ color: '#8a7a66', roughness: 0.85, metalness: 0 })}
        </mesh>
      </group>
    </RevealGroup>
  );
}

export function DiningSet({ e }) {
  return (
    <RevealGroup e={e} position={[0.4, 0, -0.6]}>
      <group>
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.1, 1.1]} />
          {M(MATERIAL.oak)}
        </mesh>
        {[[-1.1, -0.4], [1.1, -0.4], [-1.1, 0.4], [1.1, 0.4]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.36, z]} castShadow>
            <boxGeometry args={[0.09, 0.72, 0.09]} />
            {M(MATERIAL.walnut)}
          </mesh>
        ))}
        {[[-0.6, 1.05], [0.6, 1.05], [-0.6, -1.05], [0.6, -1.05]].map(([x, z], i) => (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, 0.45, 0]} castShadow>
              <boxGeometry args={[0.45, 0.08, 0.45]} />
              {M(MATERIAL.charcoal)}
            </mesh>
            <mesh position={[0, 0.22, 0]} castShadow>
              <boxGeometry args={[0.07, 0.45, 0.07]} />
              {M(MATERIAL.charcoal)}
            </mesh>
          </group>
        ))}
      </group>
    </RevealGroup>
  );
}

export function ShelfStyling({ e, position = [-3.35, 1.1, -0.8] }) {
  return (
    <RevealGroup e={e} position={position}>
      <group rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 0.34]} />
          {M(MATERIAL.oakDeep)}
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[-0.6 + i * 0.55, 0.28, 0]} castShadow>
            <boxGeometry args={[0.16, 0.5 - i * 0.08, 0.24]} />
            {M(i === 1 ? MATERIAL.ceramic : MATERIAL.travertine)}
          </mesh>
        ))}
      </group>
    </RevealGroup>
  );
}

/** Long shared table + benches for the commercial environment. */
export function WorkTable({ e }) {
  return (
    <RevealGroup e={e} position={[0, 0, 0.2]}>
      <group>
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.12, 1.4]} />
          {M(MATERIAL.oak)}
        </mesh>
        {[[-1.9], [1.9]].map(([x], i) => (
          <mesh key={i} position={[x, 0.35, 0]} castShadow>
            <boxGeometry args={[0.12, 0.7, 1.2]} />
            {M(MATERIAL.walnut)}
          </mesh>
        ))}
        {[1.1, -1.1].map((z, i) => (
          <mesh key={i} position={[0, 0.42, z]} castShadow receiveShadow>
            <boxGeometry args={[3.4, 0.14, 0.4]} />
            {M(MATERIAL.linen)}
          </mesh>
        ))}
      </group>
    </RevealGroup>
  );
}
