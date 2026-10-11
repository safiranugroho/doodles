<script lang="ts">
  import { onMount } from 'svelte';

  import picture from '#lib/assets/filter-picture.jpeg';
  import Code from '#lib/components/Code.svelte';

  import filters, { defaultFilters } from './_filters';

  let all = defaultFilters;
  $: css = Object.entries(all).reduce(
    (a, [name, s]) => (s.value !== s.default ? `${a} ${name}(${s.value}${s.unit})` : a),
    ''
  );

  let img: HTMLImageElement;

  onMount(() => {
    filters.subscribe((f) => {
      all = f;
      img.style.filter = css;
    });
  });

  const handleInput =
    (name: string) => (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
      filters.update((f) => {
        f[name].update(Number(e.currentTarget.value));
        return f;
      });
    };

  const reset = (name: string) => () => {
    filters.update((f) => {
      f[name].update(f[name].default);
      return f;
    });
  };

  const resetAll = () => Object.keys(all).forEach((s) => reset(s)());
</script>

<div class="container">
  <div class="view-container">
    <div class="asset">
      <img
        bind:this={img}
        src={picture}
        class="asset-img"
        alt="Two people at the beach with a sun umbrella"
      />
    </div>
    <Code content={`filter:${css || ' none'};`} language="css" />
  </div>
  <div class="range-container">
    <button class="range-reset all" on:click={resetAll}>Reset all</button>
    {#each Object.entries(all) as [s, a] (s)}
      <div class="range">
        <p class="range-label">
          <span class="name">{s}</span><span class="value">{a.value}{a.unit}</span>
        </p>
        <div class="range-input">
          <input
            class="range-slider"
            type="range"
            on:input={handleInput(s)}
            value={a.value}
            min={a.min}
            max={a.max}
          />
          <button class="range-reset" on:click={reset(s)}>Reset</button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  @import '../../../global.css';
  .container {
    display: grid;
    width: 100%;
  }

  .view-container {
    width: 100%;

    display: grid;
    grid-template-rows: 3fr 1fr;
    gap: 24px;
  }

  .asset {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 24px;

    height: fit-content;
    margin: auto;
    overflow: hidden;
  }

  .asset-img {
    max-width: 100%;
    object-fit: contain;
  }

  .range-container {
    width: 100%;

    margin-top: 36px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  }

  .range {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    align-items: end;
  }

  .range-slider {
    width: 100%;
    accent-color: currentColor;
  }

  .range-label {
    display: flex;
    flex-direction: row;
    gap: 8px;

    margin: 0;
    padding: 0;
  }

  .range-label .name {
    font-family: var(--code-font-family);
    font-weight: 700;
  }

  .range-input {
    display: flex;
    gap: 16px;
  }

  .range-reset.all {
    width: auto;
    margin: 12px 0;
  }

  @media screen and (min-width: 1024px) {
    .container {
      grid-template-rows: unset;
      grid-template-columns: 1fr 1fr;
      gap: 72px;

      max-width: 1200px;

      margin: auto;
    }

    .view-container {
      height: 100%;
      grid-template-rows: 5.5fr 1fr;

      margin: auto;
    }

    .range-container {
      gap: 16px;
      margin-top: 0;
    }

    .range-reset {
      margin-top: -8px;
    }
  }
</style>
