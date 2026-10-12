import { mount, unmount } from 'svelte';
import Ball from './lib/doodles/Ball/index.svelte';
import Filter from './lib/doodles/Filter/index.svelte';
import Keyboard from './lib/doodles/Keyboard/index.svelte';
import Position from './lib/doodles/Position/index.svelte';
import Rps from './lib/doodles/Rps/index.svelte';
import TipCalculator from './lib/doodles/TipCalculator/index.svelte';
import Weather from './lib/doodles/Weather/index.svelte';

import './fonts.css';

const doodles = [
  {
    slug: 'position',
    component: Position
  },
  {
    slug: 'filter',
    component: Filter
  },
  {
    slug: 'ball',
    component: Ball
  },
  {
    slug: 'rps',
    component: Rps
  },
  {
    slug: 'weather',
    component: Weather
  },
  {
    slug: 'tip-calculator',
    component: TipCalculator
  },
  {
    slug: 'keyboard',
    component: Keyboard
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defineCustomElement(name: string, Component: any) {
  customElements.define(
    name,
    class extends HTMLElement {
      _element: Record<string, unknown> | undefined;

      constructor() {
        super();

        // Create the shadow root.
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Instantiate the Svelte Component
        this._element = mount(Component, {
          // Tell it that it lives in the shadow root
          target: shadowRoot
        });
      }
      disconnectedCallback(): void {
        // Destroy the Svelte component when this web component gets
        // disconnected. If this web component is expected to be moved
        // in the DOM, then you need to use `connectedCallback()` and
        // set it up again if necessary.
        if (this._element) unmount(this._element);
        this._element = undefined;
      }
    }
  );
}

doodles.forEach((d) => {
  defineCustomElement(`doodle-${d.slug}`, d.component);
});
