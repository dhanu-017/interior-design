/**
 * Sophisticated PBR material palette — one studio language across routes.
 * All values tuned for architectural visualization: restrained roughness,
 * believable reflectivity, never plastic, never glossy.
 */

export const FINISHES = {
  oak: {
    label: 'Oak',
    floor: { color: '#c9a06f', roughness: 0.62, metalness: 0.02 },
    wall: { color: '#e9dfd2', roughness: 0.94, metalness: 0 }
  },
  travertine: {
    label: 'Stone',
    floor: { color: '#d8cfc0', roughness: 0.48, metalness: 0.04 },
    wall: { color: '#ece5d8', roughness: 0.9, metalness: 0 }
  },
  plaster: {
    label: 'Plaster',
    floor: { color: '#cdbfa9', roughness: 0.86, metalness: 0 },
    wall: { color: '#f2ece2', roughness: 0.97, metalness: 0 }
  },
  walnut: {
    label: 'Walnut',
    floor: { color: '#8a6a4c', roughness: 0.58, metalness: 0.05 },
    wall: { color: '#e7dccb', roughness: 0.93, metalness: 0 }
  }
};

export const MATERIAL = {
  plasterWarm: { color: '#f3ede3', roughness: 0.96, metalness: 0 },
  plasterCool: { color: '#e9e2d6', roughness: 0.95, metalness: 0 },
  ceiling: { color: '#f6f1e8', roughness: 0.98, metalness: 0 },
  oak: { color: '#c9a06f', roughness: 0.6, metalness: 0.04 },
  oakDeep: { color: '#8f6a47', roughness: 0.62, metalness: 0.06 },
  walnut: { color: '#6f5138', roughness: 0.58, metalness: 0.06 },
  travertine: { color: '#ddd3c2', roughness: 0.52, metalness: 0.03 },
  stoneDark: { color: '#9a8d7a', roughness: 0.7, metalness: 0.02 },
  linen: { color: '#e6dcc8', roughness: 0.95, metalness: 0 },
  boucle: { color: '#ded2ba', roughness: 1, metalness: 0 },
  bronze: { color: '#a67c4e', roughness: 0.34, metalness: 0.85 },
  brassMuted: { color: '#b08d57', roughness: 0.42, metalness: 0.7 },
  ceramic: { color: '#efe7d9', roughness: 0.32, metalness: 0.02 },
  glass: { color: '#dfe9ef', roughness: 0.08, metalness: 0.1 },
  leaf: { color: '#5f7a4c', roughness: 1, metalness: 0 },
  charcoal: { color: '#3a342e', roughness: 0.8, metalness: 0.1 },
  paper: { color: '#f4efe6', roughness: 0.9, metalness: 0 }
};
