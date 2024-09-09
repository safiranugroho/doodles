import keyboard from '$lib/assets/keyboard.png';
import tip from '$lib/assets/tip.png';
import weather from '$lib/assets/weather.png';
import rps from '$lib/assets/rps.png';
import ball from '$lib/assets/ball.png';
import filter from '$lib/assets/filter.png';
import position from '$lib/assets/position.png';

export type Route = {
  prev?: string;
  name?: string;
  cover?: string;
  next?: string;
};

type Routes = { [key: string]: Route };

export default {
  '/position': {
    next: '/filter',
    name: 'CSS position playground',
    cover: position
  },
  '/filter': {
    next: '/ball',
    name: 'CSS filter playground',
    cover: filter,
    prev: '/position'
  },
  '/ball': {
    next: '/rps',
    name: 'Ball',
    cover: ball,
    prev: '/filter'
  },
  '/rps': {
    next: '/weather',
    name: 'Rock paper scissors',
    cover: rps,
    prev: '/ball'
  },
  '/weather': {
    next: '/tip-calculator',
    name: 'Weather forecast',
    cover: weather,
    prev: '/rps'
  },
  '/tip-calculator': {
    next: '/keyboard',
    name: 'Tip calculator',
    cover: tip,
    prev: '/weather'
  },
  '/keyboard': {
    name: 'Keyboard',
    cover: keyboard,
    prev: '/tip-calculator'
  }
} as Routes;
