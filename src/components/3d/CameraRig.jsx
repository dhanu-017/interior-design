import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { track } from '../../lib/timeline';

/**
 * Professional architectural camera: position + target + focal length,
 * all pure functions of damped scroll progress. Subtle pointer parallax
 * (±0.12) that reads as "the space responds" rather than motion control.
 */
export const CAMERA_PATHS = {
  home: {
    pos: [
      [0, -1.4, 2.1, 8.6],
      [0.18, -0.7, 1.95, 7.2],
      [0.42, 0.05, 1.8, 5.6],
      [0.7, -0.4, 1.72, 4.6],
      [1, -0.9, 1.66, 3.9]
    ],
    tgt: [
      [0, 0, 1.15, -0.6],
      [0.42, 0, 1.1, 0.1],
      [0.7, 0, 1.05, 0.5],
      [1, 0, 1.0, 0.7]
    ],
    fov: [
      [0, 36],
      [0.5, 34],
      [1, 32]
    ]
  },
  residential: {
    pos: [
      [0, 0.4, 2.3, 8.2],
      [0.3, 0.1, 2.0, 6.6],
      [0.6, -0.5, 1.8, 5.0],
      [1, -0.9, 1.7, 4.1]
    ],
    tgt: [
      [0, 0, 1.2, -0.9],
      [0.5, 0, 1.1, 0.0],
      [1, 0, 1.0, 0.6]
    ],
    fov: [
      [0, 37],
      [1, 32]
    ]
  },
  commercial: {
    pos: [
      [0, 1.8, 2.6, 9.4],
      [0.35, 0.6, 2.2, 7.4],
      [0.7, -0.6, 1.9, 5.6],
      [1, -1.2, 1.8, 4.8]
    ],
    tgt: [
      [0, 0, 1.2, -1.2],
      [0.5, 0, 1.1, -0.2],
      [1, 0, 1.05, 0.4]
    ],
    fov: [
      [0, 38],
      [1, 33]
    ]
  },
  process: { // design-table orbit on the Process route
    pos: [
      [0, 2.6, 3.4, 7.6],
      [0.35, 1.2, 2.6, 6.2],
      [0.65, -0.8, 2.1, 5.2],
      [1, -1.6, 1.9, 4.6]
    ],
    tgt: [
      [0, 0, 0.9, 0.2],
      [0.5, 0, 0.9, 0.5],
      [1, 0, 1.0, 0.6]
    ],
    fov: [
      [0, 35],
      [1, 32]
    ]
  },
  portfolio: { // lateral gallery glide on the Portfolio route
    pos: [
      [0, -2.2, 1.9, 7.8],
      [0.4, 0, 1.8, 6.0],
      [0.75, 1.6, 1.75, 4.9],
      [1, 2.4, 1.7, 4.3]
    ],
    tgt: [
      [0, 0, 1.1, -0.8],
      [0.5, 0.4, 1.05, 0.0],
      [1, 0.8, 1.0, 0.3]
    ],
    fov: [
      [0, 36],
      [1, 33]
    ]
  }
};

export default function CameraRig({ variant = 'home', damped, pointer, mobile }) {
  const look = useRef(new THREE.Vector3(0, 1.1, 0));
  const paths = CAMERA_PATHS[variant] || CAMERA_PATHS.home;

  useFrame((state, delta) => {
    const cam = state.camera;
    const p = damped.current;
    const k = 1 - Math.exp(-delta * (mobile ? 2.4 : 3.2));

    const px =
      track(p, paths.pos.map(([t, x]) => [t, x])) + (mobile ? 0 : pointer.current.x * 0.22);
    const py = track(p, paths.pos.map(([t, , y]) => [t, y])) + (mobile ? 0 : pointer.current.y * 0.1);
    const pz = track(p, paths.pos.map(([t, , , z]) => [t, z]));

    const tx = track(p, paths.tgt.map(([t, x]) => [t, x]));
    const ty = track(p, paths.tgt.map(([t, , y]) => [t, y]));
    const tz = track(p, paths.tgt.map(([t, , , z]) => [t, z]));

    cam.position.x = THREE.MathUtils.damp(cam.position.x, px, 3.2, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, py, 3.2, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, pz, 3.2, delta);

    const fov = track(p, paths.fov);
    if (cam.fov !== undefined && Math.abs(cam.fov - fov) > 0.01) {
      cam.fov += (fov - cam.fov) * k;
      cam.updateProjectionMatrix();
    }

    look.current.set(
      THREE.MathUtils.damp(look.current.x, tx, 3.4, delta),
      THREE.MathUtils.damp(look.current.y, ty, 3.4, delta),
      THREE.MathUtils.damp(look.current.z, tz, 3.4, delta)
    );
    cam.lookAt(look.current);
  });

  return null;
}
