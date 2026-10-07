import { IMG } from './images';

export const processChapter = {
  index: '04',
  route: '/process',
  label: 'Process',
  title: 'A Clear Route from Brief to Build',
  display: ['From first brief', 'to final detail'],
  summary:
    'A collaborative design process with considered milestones, clear decisions, and close attention from the first conversation to handover.'
};

export const processStates = [
  {
    id: 'sketch',
    label: 'Sketch',
    title: 'Listen and Imagine',
    image: IMG.process.sketch,
    alt: 'Hand-drawn interior architecture sketch on bright clean paper of a light-filled living space',
    range: [0, 0.15],
    zoom: [1.01, 1.07],
    drift: [0, -1],
    caption: 'We establish the priorities, ambitions, and practical needs that will guide the design from day one.'
  },
  {
    id: 'plan',
    label: 'Floor Plan',
    title: 'A Plan That Works',
    image: IMG.process.plan,
    alt: 'Bright minimalist room with large windows, white plaster walls and architectural floor plan context',
    range: [0.15, 0.32],
    zoom: [1.03, 1.1],
    drift: [1.2, 0],
    caption: 'Plans and elevations test each idea against the realities of the site, budget, and daily use.'
  },
  {
    id: 'concept',
    label: '3D Concept',
    title: 'See the Space Clearly',
    image: IMG.process.concept,
    alt: 'Three dimensional architectural visualisation of a bright airy luxury interior with natural daylight',
    range: [0.32, 0.5],
    zoom: [1.06, 1.13],
    drift: [-1.2, 0.5],
    caption: 'Three-dimensional studies help align proportion, light, and finish before the work moves into detail.'
  },
  {
    id: 'materials',
    label: 'Materials',
    title: 'A Considered Palette',
    image: IMG.process.materials,
    alt: 'Interior design material board with light oak, pale marble, cream stone and neutral fabric samples',
    range: [0.5, 0.66],
    zoom: [1.07, 1.13],
    drift: [1, -0.5],
    caption: 'We select finishes for how they look, feel, wear, and relate to one another in the actual space.'
  },
  {
    id: 'construction',
    label: 'Construction',
    title: 'Careful Delivery',
    image: IMG.process.construction,
    alt: 'Bright interior shell with large windows, white plaster walls and architectural space under construction',
    range: [0.66, 0.84],
    zoom: [1.06, 1.15],
    drift: [-0.8, 0.8],
    caption: 'Regular site reviews keep the details aligned and give the build team timely, practical decisions.'
  },
  {
    id: 'reveal',
    label: 'Final Reveal',
    title: 'Ready for Everyday',
    image: IMG.process.reveal,
    alt: 'Finished bright luxury modern interior photographed with abundant natural daylight and airy atmosphere',
    range: [0.84, 1],
    zoom: [1.08, 1.18],
    drift: [0.6, -0.6],
    caption: 'At handover, the space is complete, considered, and ready to become part of everyday life.'
  }
];

export const processSpecs = [
  {
    stage: 'Discovery',
    duration: '2–3 weeks',
    deliverables: 'Brief · Site survey · Budget frame',
    note: 'We listen to how you use the space, what matters most, and what the project needs to achieve before shaping a direction.'
  },
  {
    stage: 'Concept',
    duration: '3–5 weeks',
    deliverables: 'Plans · Mood direction · Preliminary 3D',
    note: 'We test options for layout, mood, and material, then agree on one clear direction that balances ambition with practicality.'
  },
  {
    stage: 'Design Development',
    duration: '4–6 weeks',
    deliverables: 'Full drawing set · Material schedule · Joinery detail',
    note: 'Plans, joinery, finishes, and lighting are coordinated so the design can be delivered with confidence.'
  },
  {
    stage: 'Documentation',
    duration: '3–4 weeks',
    deliverables: 'Tender package · Specifications · Costing',
    note: 'Clear specifications and tender information help the project team price and plan the work accurately.'
  },
  {
    stage: 'Construction',
    duration: 'Project dependent',
    deliverables: 'Site supervision · Snagging · Styling',
    note: 'We review progress, answer design questions, and resolve details as the project takes shape on site.'
  },
  {
    stage: 'Handover',
    duration: '1 week',
    deliverables: 'Final styling · Photography · Care guide',
      note: 'We complete the final checks and styling, then hand over a space prepared for its next chapter.'
  }
];
