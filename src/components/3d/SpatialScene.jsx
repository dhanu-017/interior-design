import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import RoomShell from './RoomShell';
import CameraRig from './CameraRig';
import LightingRig from './LightingRig';
import Atmosphere from './Atmosphere';
import {
  Sofa,
  LoungeChair,
  CoffeeTable,
  FloorLamp,
  Plant,
  Artwork,
  WorkTable
} from './Furniture';
import { segment, entrance } from '../../lib/timeline';
import { ProcessTable, GalleryWall } from './Sets';

/**
 * SpatialScene — one parametric architectural universe, five mounted moods
 * (home / residential / commercial / process / portfolio). Process carries
 * the design-table scene, Portfolio the spatial gallery. Each canvas mounts
 * per-route only and unmounts on navigation.
 *
 * Timeline (shared grammar, tuned per variant):
 *   ENTRY (approach) → SETUP (shell/floor) → REVEAL (window/material)
 *   → TRANSFORMATION (furniture arrives spatially) → SETTLE (warm light,
 *   decor, hold) → EXIT (handled by route change, never abrupt mid-scroll)
 */
function useReveal(p) {
  return {
    shell: segment(p, 0.0, 0.24),
    floor: segment(p, 0.02, 0.2),
    ceiling: segment(p, 0.12, 0.32),
    window: segment(p, 0.14, 0.34),
    material: segment(p, 0.32, 0.52),
    furniture: segment(p, 0.38, 0.62),
    light: segment(p, 0.5, 0.88),
    decor: segment(p, 0.66, 0.92)
  };
}

function InteriorSet({ variant, progress, finish }) {
  const reveal = useReveal(progress);
  const fq = progress;

  if (variant === 'process') {
    return (
      <group>
        <RoomShell reveal={reveal} finish={finish} />
        <ProcessTable
          reveal={reveal}
          e={{
            sketch: entrance(fq, 0.3),
            plan: entrance(fq, 0.4),
            model: entrance(fq, 0.52),
            samples: entrance(fq, 0.64)
          }}
        />
        <FloorLamp e={entrance(fq, 0.7)} position={[-3.2, 0, 2.2]} />
        <Plant e={entrance(fq, 0.76)} position={[3.4, 0, -1.2]} />
      </group>
    );
  }

  if (variant === 'portfolio') {
    return (
      <group>
        <RoomShell reveal={reveal} finish={finish} wide />
        <GalleryWall progress={progress} count={5} />
        <Plant e={entrance(fq, 0.7)} position={[-4.4, 0, -1.5]} />
      </group>
    );
  }

  if (variant === 'commercial') {
    return (
      <group>
        <RoomShell reveal={reveal} finish={finish} wide withColumn />
        <WorkTable e={entrance(fq, 0.4)} />
        <LoungeChair e={entrance(fq, 0.58)} position={[3.1, 0, 1.1]} />
        <FloorLamp e={entrance(fq, 0.72)} position={[-4.2, 0, 2.3]} />
        <Plant e={entrance(fq, 0.8)} position={[4.4, 0, -2.0]} />
      </group>
    );
  }

  if (variant === 'residential') {
    return (
      <group>
        <RoomShell reveal={reveal} finish={finish} />
        <Sofa e={entrance(fq, 0.48)} />
        <CoffeeTable e={entrance(fq, 0.58)} />
        <FloorLamp e={entrance(fq, 0.68)} />
        <Artwork e={entrance(fq, 0.76)} position={[-3.35, 1.7, 0.9]} />
        <Plant e={entrance(fq, 0.84)} />
      </group>
    );
  }

  // home — "walking into an interior"
  return (
    <group>
      <RoomShell reveal={reveal} finish={finish} />
      <Sofa e={entrance(fq, 0.42)} />
      <CoffeeTable e={entrance(fq, 0.52)} />
      <LoungeChair e={entrance(fq, 0.58)} />
      <FloorLamp e={entrance(fq, 0.66)} />
      <Artwork e={entrance(fq, 0.72)} />
      <Plant e={entrance(fq, 0.78)} />
      <ShelfStyling e={entrance(fq, 0.82)} />
    </group>
  );
}

function DampedProgress({ target, damped }) {
  useFrame((_, delta) => {
    const k = 1 - Math.exp(-delta * 3.4);
    damped.current += (target.current - damped.current) * k;
    if (Math.abs(target.current - damped.current) < 0.0004) damped.current = target.current;
  });
  return null;
}

export default function SpatialScene({
  variant = 'home',
  target,
  damped,
  pointer,
  finish = 'oak',
  lightMode = 'evening',
  mobile = false
}) {
  return (
    <group>
      <DampedProgress target={target} damped={damped} />
      <CameraRig variant={variant} damped={damped} pointer={pointer} mobile={mobile} />
      <LightingRig damped={damped} mode={lightMode} mobile={mobile} />
      <LiveSet variant={variant} damped={damped} finish={finish} />
      <Atmosphere damped={damped} mobile={mobile} count={mobile ? 0 : 90} />
      <ContactShadows position={[0, -0.6, 0]} opacity={0.36} scale={mobile ? 10 : 15} blur={2.6} far={11} color="#3d3129" />
    </group>
  );
}

function LiveSet({ variant, damped, finish }) {
  const [, force] = React.useReducer((x) => x + 1, 0);
  const last = useRef(-1);
  useFrame(() => {
    const p = damped.current;
    if (Math.abs(p - last.current) > 0.0025) {
      last.current = p;
      force();
    }
  });
  const p = last.current < 0 ? damped.current : last.current;
  return <InteriorSet variant={variant} progress={p} finish={finish} />;
}
