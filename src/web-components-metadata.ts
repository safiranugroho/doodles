export type Screen = 'mobile' | 'tablet' | 'desktop' | 'all'
export type Doodle = {
  slug: string,
  title: string,
  description: string,
  componentName: string,
  date: Date,
  screen: Screen[]
}

export const doodles: Doodle[] = [
  {
    slug: 'position',
    title: 'CSS position playground',
    description: "No flex, no grid, just position.",
    componentName: 'Position',
    date: new Date('2023-02-01'),
    screen: ['all']
  },
  {
    slug: 'filter',
    title: 'CSS filter playground',
    description: "Explore CSS filter() via the sliders.",
    componentName: 'Filter',
    date: new Date('2023-01-22'),
    screen: ['all']
  },
  {
    slug: 'ball',
    title: 'Ball',
    description: "IDK - it's just a bouncing ball.",
    componentName: 'Ball',
    date: new Date('2023-01-21'),
    screen: ['all']
  },
  {
    slug: 'rps',
    title: 'Rock paper scissors',
    description: "Shoot!",
    componentName: 'Rps',
    date: new Date('2023-01-19'),
    screen: ['all']
  },
  {
    slug: 'weather',
    title: 'Weather forecast',
    description: "What's the weather like today?",
    componentName: 'Weather',
    date: new Date('2023-01-18'),
    screen: ['desktop']
  },
  {
    slug: 'tip-calculator',
    title: 'Tip calculator',
    description: "Input the bill amount and number of people, and select a tip percentage.",
    componentName: 'TipCalculator',
    date: new Date('2023-01-17'),
    screen: ['desktop']
  },
  {
    slug: 'keyboard',
    title: 'Keyboard',
    description: "My keyboard jiggle jiggles - press the key on your keyboard to stop the jiggle.",
    componentName: 'Keyboard',
    date: new Date('2023-01-16'),
    screen: ['desktop']
  }
];