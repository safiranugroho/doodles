import { writable } from 'svelte/store';

type Filter = {
  unit: string;
  default: number;
  value: number;
  min: number;
  max: number;
  update: (this: Filter, v: number) => void;
};

type Filters = {
  [key: string]: Filter;
};

function update(this: Filter, v: number) {
  this.value = v;
}

export const defaultFilters: Filters = {
  blur: {
    unit: 'px',
    default: 0,
    value: 0,
    min: 0,
    max: 100,
    update
  },
  brightness: {
    unit: '%',
    default: 100,
    value: 100,
    min: 0,
    max: 200,
    update
  },
  contrast: {
    unit: '%',
    default: 100,
    value: 100,
    min: 0,
    max: 200,
    update
  },
  grayscale: {
    unit: '%',
    default: 0,
    value: 0,
    min: 0,
    max: 100,
    update
  },
  'hue-rotate': {
    unit: 'deg',
    default: 0,
    value: 0,
    min: 0,
    max: 360,
    update
  },
  invert: {
    unit: '%',
    default: 0,
    value: 0,
    min: 0,
    max: 100,
    update
  },
  opacity: {
    unit: '%',
    default: 100,
    value: 100,
    min: 0,
    max: 100,
    update
  },
  saturate: {
    unit: '%',
    default: 100,
    value: 100,
    min: 0,
    max: 200,
    update
  },
  sepia: {
    unit: '%',
    default: 0,
    value: 0,
    min: 0,
    max: 100,
    update
  }
};

export default writable(defaultFilters);
