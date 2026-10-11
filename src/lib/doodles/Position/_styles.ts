import { writable } from 'svelte/store';

export const generateCssForClass = (s: Style) =>
  Object.entries(s)
    .reduce((a, [k, v]) => `${a}${k}: ${v.toText()};\n${' '.repeat(2)}`, '')
    .trimEnd();

export const generateCss = (s: Styles) => ({
  parent: generateCssForClass(s.parent),
  child: generateCssForClass(s.child)
});

export interface Property {
  value: string | number;
  unit: string;
  toText: (this: Property) => string;
  update: (this: Property, value: string | number, unit?: string) => void;
}

export type OffsetName = 'top' | 'bottom' | 'left' | 'right';
export type Offsets = {
  [key in OffsetName]?: Property;
};

export type Style = Offsets & {
  position: Property;
  direction?: Property;
  overflow?: Property;
};

export interface Styles {
  parent: Style;
  child: Style;
}

export const P = (value: string | number, unit: string = '') => ({
  value,
  unit,
  toText: function (this: Property) {
    return `${this.value}${this.unit}`;
  },
  update: function (this: Property, value: string | number, unit: string = '') {
    this.value = value;
    this.unit = unit;
  }
});

export const defaultStyles: Styles = {
  parent: {
    position: P('static'),
    overflow: P('scroll')
  },
  child: {
    position: P('static'),
    top: P('auto'),
    bottom: P('auto'),
    left: P('auto'),
    right: P('auto')
  }
};

export default writable(defaultStyles);
