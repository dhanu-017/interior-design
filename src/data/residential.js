import { IMG } from './images';

export const residentialChapter = {
  index: '02',
  route: '/residential',
  label: 'Residential',
  title: 'A More Personal Kind of Home',
  display: ['A more personal', 'kind of home'],
  summary:
    'Homes shaped around the people who inhabit them — composed with thoughtful planning, lasting finishes, and a sense of ease.'
};

export const residentialStates = [
  {
    id: 'empty',
    label: 'Empty Room',
    title: 'The Unfinished Room',
    image: IMG.residential.empty,
    alt: 'Bright empty interior volume with large white-framed windows, pale plaster and natural daylight flooding in',
    range: [0, 0.19],
    zoom: [1.01, 1.08],
    drift: [0, -1],
    caption: 'We begin by reading the room as it is: its light, structure, constraints, and untapped potential.'
  },
  {
    id: 'shell',
    label: 'Architectural Shell',
    title: 'Shape and Light',
    image: IMG.residential.shell,
    alt: 'Bright minimalist empty room with floor-to-ceiling windows, white walls and light oak floor',
    range: [0.19, 0.39],
    zoom: [1.04, 1.11],
    drift: [1.2, 0.4],
    caption: 'Openings and sightlines are tuned first, letting daylight and movement define the character of the home.'
  },
  {
    id: 'furniture',
    label: 'Furniture',
    title: 'An Everyday Plan',
    image: IMG.residential.furniture,
    alt: 'Sunlit serene bedroom with soft neutral palette, light linen bedding and pale oak flooring',
    range: [0.39, 0.59],
    zoom: [1.06, 1.14],
    drift: [-1.2, 0.6],
    caption: 'A considered layout makes daily routines feel natural, with room for both gathering and retreat.'
  },
  {
    id: 'lighting',
    label: 'Lighting & Decor',
    title: 'Details in Balance',
    image: IMG.residential.lighting,
    alt: 'Bright airy kitchen with natural daylight, stone island, light timber cabinetry and soft textiles',
    range: [0.59, 0.79],
    zoom: [1.08, 1.16],
    drift: [0.8, -0.8],
    caption: 'Lighting and finish are layered with restraint, adding depth while keeping the rooms clear and composed.'
  },
  {
    id: 'finished',
    label: 'Finished Interior',
    title: 'A Home, Resolved',
    image: IMG.residential.finished,
    alt: 'Finished bright luxury modern interior with refined pale furniture, abundant natural light and airy atmosphere',
    range: [0.79, 1],
    zoom: [1.1, 1.2],
    drift: [-1, 0.8],
    caption: 'Every element belongs. The result is a home with its own character, shaped around the life within it.'
  }
];

export const residentialProjects = [
  {
    id: 'res-01',
    title: 'Linden House',
    category: 'Residential',
    location: 'Hillside',
    year: '2025',
    image: IMG.portfolio.living,
    alt: 'Bright refined living room with natural daylight, pale oak and soft sculptural lighting',
    excerpt: 'A hillside home gathered around one generous living space, with long views across the landscape.'
  },
  {
    id: 'res-02',
    title: 'Marlow Apartment',
    category: 'Residential',
    location: 'City Centre',
    year: '2024',
    image: IMG.portfolio.bedroom,
    alt: 'Sunlit serene modern bedroom with soft neutral palette, layered light linens and natural daylight',
    excerpt: 'A compact city home re-planned for clearer movement, better daylight, and a greater sense of space.'
  },
  {
    id: 'res-03',
    title: 'Ash & Stone',
    category: 'Residential',
    location: 'Coastal',
    year: '2024',
    image: IMG.portfolio.kitchen,
    alt: 'Bright minimal kitchen with pale stone island, light timber cabinetry and abundant natural light',
      excerpt: 'A coastal kitchen and dining room connected through a continuous line of timber and stone.'
  }
];
