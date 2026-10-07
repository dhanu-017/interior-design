import { IMG } from './images';

export const homeChapter = {
  index: '01',
  route: '/',
  label: 'The Studio',
  title: 'Spaces in Their Finest Form',
  display: ['Spaces in', 'their finest form'],
  summary:
    'INTERIORA shapes purposeful interiors with a clear eye for proportion, enduring materials, and the way people truly live.'
};

export const homeStates = [
  {
    id: 'arrival',
    label: 'Arrival',
    title: 'A Quiet Arrival',
    image: IMG.home.arrival,
    alt: 'Bright airy luxury modern living room with natural daylight, light oak floors and expansive windows',
    range: [0, 0.17],
    zoom: [1.02, 1.1],
    drift: [0, -1.2],
    caption: 'A considered entrance sets the tone: measured, welcoming, and precise in every detail.'
  },
  {
    id: 'statement',
    label: 'Statement',
    title: 'A Sense of Place',
    image: IMG.home.statement,
    alt: 'Sunlit architectural interior with floor-to-ceiling glazing, light linen sofa and pale travertine surfaces',
    range: [0.17, 0.39],
    zoom: [1.05, 1.14],
    drift: [1.4, 0],
    caption: 'Furniture, light, and architecture align to make the everyday feel intuitive, never overworked.'
  },
  {
    id: 'depth',
    label: 'Depth',
    title: 'Room to Breathe',
    image: IMG.home.depth,
    alt: 'Bright minimal interior corridor with natural daylight, white plaster walls and a sculptural light oak chair',
    range: [0.39, 0.62],
    zoom: [1.1, 1.24],
    drift: [-1.6, 0.8],
    caption: 'Careful sightlines and balanced proportions give each room a sense of openness and quiet continuity.'
  },
  {
    id: 'light',
    label: 'Light & Material',
    title: 'The Material Edit',
    image: IMG.home.light,
    alt: 'Light-filled modern interior detail showing pale oak joinery, soft natural light and textured cream plaster',
    range: [0.62, 0.82],
    zoom: [1.12, 1.02],
    drift: [0, 1.4],
    caption: 'A restrained palette of stone, timber, plaster, and woven texture gives the interior its lasting character.'
  },
  {
    id: 'threshold',
    label: 'Threshold',
    title: 'Made to Be Lived In',
    image: IMG.home.threshold,
    alt: 'Bright open interior of a refined living space with natural daylight opening onto a sunlit garden',
    range: [0.82, 1],
    zoom: [1.02, 1.12],
    drift: [2, -1],
    caption: 'The finished room feels complete without feeling staged: generous, personal, and ready for daily life.'
  }
];

export const homeStudio = {
  eyebrow: 'The studio',
  heading: ['A clear language', 'for living well'],
  body:
    'We are an independent interior architecture studio working across private homes and considered commercial spaces. Each commission begins with listening: how a place is used, where light falls, and what should endure. From the first measured plan to the final finish, every decision is made to bring clarity, character, and purpose to the whole.',
  stats: [
    { value: '18', label: 'Years of practice' },
    { value: '240+', label: 'Spaces delivered' },
    { value: '11', label: 'Design awards' },
    { value: '6', label: 'Cities' }
  ],
  image: IMG.home.depth,
  alt: 'Minimal interior architecture detail with strong natural light and carefully composed material finishes'
};
