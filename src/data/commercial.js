import { IMG } from './images';

export const commercialChapter = {
  index: '03',
  route: '/commercial',
  label: 'Commercial',
  title: 'Spaces That Work Harder',
  display: ['Spaces that', 'work harder'],
  summary:
    'Workplaces and hospitality settings planned for clarity, comfort, and a distinctive identity that carries through every detail.'
};

export const commercialStates = [
  {
    id: 'blueprint',
    label: 'Blueprint',
    title: 'The Brief, Mapped',
    image: IMG.commercial.blueprint,
    alt: 'Architectural blueprint and floor plan drawings on a bright clean drafting table with natural light',
    range: [0, 0.19],
    zoom: [1.02, 1.08],
    drift: [0, -1],
    caption: 'We translate the brief into a clear plan for movement, capacity, service, and the experience of each visitor.'
  },
  {
    id: 'structure',
    label: 'Structure',
    title: 'Structure with Purpose',
    image: IMG.commercial.structure,
    alt: 'Bright modern office interior with white columns, clear glass partitions and open light-filled floor plate',
    range: [0.19, 0.39],
    zoom: [1.05, 1.12],
    drift: [1.4, 0],
    caption: 'The existing structure becomes an asset, guiding light, circulation, and the practical rhythm of the business.'
  },
  {
    id: 'furniture',
    label: 'Furniture & Layout',
    title: 'Space for Focus',
    image: IMG.commercial.furniture,
    alt: 'Bright airy modern office interior with pale custom joinery and considered light furniture layout',
    range: [0.39, 0.59],
    zoom: [1.07, 1.15],
    drift: [-1.4, 0.5],
    caption: 'Zones, acoustics, and clear wayfinding support concentration, collaboration, and the working day.'
  },
  {
    id: 'people',
    label: 'People & Lighting',
    title: 'Built Around People',
    image: IMG.commercial.people,
    alt: 'Bright natural-lit modern office lounge with people working under soft daylight and layered lighting',
    range: [0.59, 0.79],
    zoom: [1.09, 1.16],
    drift: [1, -0.8],
    caption: 'The measure of a successful space is how naturally people can work, meet, pause, and return.'
  },
  {
    id: 'finished',
    label: 'Completed Space',
    title: 'A Distinctive Address',
    image: IMG.commercial.finished,
    alt: 'Bright finished commercial interior with refined pale materials, natural daylight and airy ambience',
    range: [0.79, 1],
    zoom: [1.1, 1.19],
    drift: [-1, 0.8],
    caption: 'A purposeful, recognisable environment expresses the business clearly and serves it well over time.'
  }
];

export const commercialCategories = [
  {
    id: 'office',
    label: 'Office',
    image: IMG.commercial.structure,
    alt: 'Bright contemporary office interior with natural daylight, open plan workstations and glass meeting rooms',
    note: 'Workplaces that balance focused work, shared ideas, and a clear sense of identity.'
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    image: IMG.portfolio.commercial,
    alt: 'Light-filled restaurant interior with natural daylight, pale finishes and elegant custom banquettes',
    note: 'Dining spaces planned for a memorable atmosphere and a seamless service rhythm.'
  },
  {
    id: 'hotel',
    label: 'Hotel',
    image: IMG.commercial.people,
    alt: 'Bright hotel lobby lounge with sculptural light seating, natural daylight and airy architectural lighting',
    note: 'Guest spaces designed to feel coherent, intuitive, and welcoming at every scale.'
  },
  {
    id: 'retail',
    label: 'Retail',
    image: IMG.commercial.furniture,
    alt: 'Bright minimal retail interior with pale custom display joinery and soft natural lighting',
      note: 'Retail settings that give products room to speak through light, display, and material.'
  }
];
