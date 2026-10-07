import { IMG } from './images';

export const portfolioChapter = {
  index: '05',
  route: '/portfolio',
  label: 'Portfolio',
  title: 'Selected Spaces, Thoughtfully Made',
  display: ['Selected spaces,', 'thoughtfully made'],
  summary:
    'A collection of homes, workplaces, and places to gather, each designed around its brief and resolved with care.'
};

export const portfolioProjects = [
  {
    id: 'p-living',
    title: 'The Long Living Room',
    category: 'Living Room',
    location: 'Private residence',
    year: '2025',
    image: IMG.portfolio.living,
    alt: 'Bright luxury living room interior with natural daylight, pale oak and expansive windows',
    excerpt: 'A twelve-metre living space organised by daylight, long views, and a single oak line.',
    description:
      'The brief called for one room that could shift easily from family time to a long table of guests, then return to quiet.',
    detail:
      'Three partitions gave way to a longer view from entry to garden. A continuous oak element grounds the room while low furniture keeps the ceiling plane open.',
    specs: [
      { label: 'Scope', value: 'Full interior architecture' },
      { label: 'Area', value: '210 m²' },
      { label: 'Materials', value: 'Oak · Travertine · Bronze' },
      { label: 'Duration', value: '14 months' }
    ]
  },
  {
    id: 'p-bedroom',
    title: 'Quiet Hours',
    category: 'Bedroom',
    location: 'City apartment',
    year: '2024',
    image: IMG.portfolio.bedroom,
    alt: 'Sunlit luxury modern bedroom interior with soft light textiles, natural daylight and calm neutral palette',
    excerpt: 'A city suite composed to make the changing morning light its central feature.',
    description:
      'This bedroom was designed as a retreat from the pace of the city, with quiet contrasts and tactile, natural finishes.',
    detail:
      'Layered linen, brushed plaster, and concealed lighting create a gentle transition from evening to morning.',
    specs: [
      { label: 'Scope', value: 'Primary suite' },
      { label: 'Area', value: '46 m²' },
      { label: 'Materials', value: 'Plaster · Linen · Walnut' },
      { label: 'Duration', value: '7 months' }
    ]
  },
  {
    id: 'p-kitchen',
    title: 'Stone & Grain',
    category: 'Kitchen',
    location: 'Coastal house',
    year: '2024',
    image: IMG.portfolio.kitchen,
    alt: 'Bright luxury modern kitchen with pale stone island, light timber cabinetry and abundant natural light',
    excerpt: 'A working kitchen where integrated joinery lets the stone island take the lead.',
    description:
      'A long, honed-stone island anchors the kitchen, its recessed plinth lending the monolithic form a sense of lightness.',
    detail:
      'Full-height joinery conceals appliances, while discreet task lighting keeps the working surfaces clear and the room composed.',
    specs: [
      { label: 'Scope', value: 'Kitchen & dining' },
      { label: 'Area', value: '68 m²' },
      { label: 'Materials', value: 'Honed stone · Smoked oak' },
      { label: 'Duration', value: '9 months' }
    ]
  },
  {
    id: 'p-commercial',
    title: 'Table No. 4',
    category: 'Commercial',
    location: 'Restaurant',
    year: '2025',
    image: IMG.portfolio.commercial,
    alt: 'Light-filled luxury restaurant interior with natural daylight, pale finishes and elegant sculptural bar',
    excerpt: 'A ninety-cover dining room balanced for lively service and comfortable conversation.',
    description:
      'The brief paired an energetic dining atmosphere with the acoustic comfort that lets conversation carry through the evening.',
    detail:
      'A continuous banquette, a sculptural bar, and carefully spaced ceiling baffles bring rhythm to the room and soften its sound.',
    specs: [
      { label: 'Scope', value: 'Full hospitality interior' },
      { label: 'Area', value: '430 m²' },
      { label: 'Materials', value: 'Brass · Oak · Bouclé' },
      { label: 'Duration', value: '11 months' }
    ]
  },
  {
    id: 'p-signature',
    title: 'House on the Ridge',
    category: 'Signature Project',
    location: 'Private residence',
    year: '2025',
    image: IMG.portfolio.signature,
    alt: 'Ultra luxury modern house interior with bright natural daylight, airy architecture and expansive glazing',
    excerpt: 'A complete residence where architecture, interior, and landscape share one language.',
    description:
      'The interiors and structure were developed together, allowing every opening to frame a view and serve the room.',
    detail:
      'Four levels turn around a top-lit stair. A restrained palette of board-marked concrete, smoked oak, and honed limestone connects each one.',
    specs: [
      { label: 'Scope', value: 'Architecture & interior' },
      { label: 'Area', value: '1,150 m²' },
      { label: 'Materials', value: 'Concrete · Oak · Limestone' },
      { label: 'Duration', value: '26 months' }
    ]
  }
];
