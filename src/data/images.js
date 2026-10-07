/**
 * Single source of truth for imagery. Swap these IDs for local
 * /public/images/*.webp assets and no animation code changes at all.
 * Photography for the portfolio. Interface styling applies the monochrome treatment.
 */
const u = (id, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  home: {
    arrival: u('1600585154340-be6161a56a0c'),
    statement: u('1616486338812-3dadae4b4ace'),
    depth: u('1618221195710-dd6b41faaea6'),
    light: u('1600607687939-ce8a6c25118c'),
    threshold: u('1586023492125-27b2c045efd7')
  },
  residential: {
    empty: u('1487958449943-2429e8be8625'),
    shell: u('1560448204-e02f11c3d0e2'),
    furniture: u('1616594039964-ae9021a400a0'),
    lighting: u('1556909212-d5b604d0c90d'),
    finished: u('1600566753086-00f18fb6b3ea')
  },
  commercial: {
    blueprint: u('1503174971373-b1f69850bded'),
    structure: u('1497366216548-37526070297c'),
    furniture: u('1497366811353-6870744d04b2'),
    people: u('1524758631624-e2822e304c36'),
    finished: u('1567767292278-a4f21aa2d36e')
  },
  process: {
    sketch: u('1541123437800-1bb1317badc2'),
    plan: u('1487958449943-2429e8be8625'),
    concept: u('1600607687920-4e2a09cf159d'),
    materials: u('1616627561839-074385245ff6'),
    construction: u('1487958449943-2429e8be8625'),
    reveal: u('1600566753086-00f18fb6b3ea')
  },
  portfolio: {
    living: u('1600585154340-be6161a56a0c'),
    bedroom: u('1616594039964-ae9021a400a0'),
    kitchen: u('1556909212-d5b604d0c90d'),
    commercial: u('1414235077428-338989a2e8c0'),
    signature: u('1600566753086-00f18fb6b3ea')
  }
};
