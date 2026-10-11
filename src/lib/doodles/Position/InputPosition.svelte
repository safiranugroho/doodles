<script lang="ts">
  import rules from './_rules';
  import type { Property } from './_styles';

  export let currentPosition: Property;
</script>

<div class="position-select-container">
  <label for="position">I want to position the picture</label>
  <select bind:value={currentPosition.value} name="position" id="position" class="position-select">
    {#each Object.entries(rules) as [name, { text }] (name)}
      <option value={name} class="position-option">{text}</option>
    {/each}
  </select>
</div>

<strong class="position-select-helper" aria-hidden="true">{currentPosition.value}</strong>

<style>
  @import '../../../global.css';

  .position-select-container {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .position-select {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);

    font-weight: 700;
    padding: 0.5em;

    width: 100%;
    box-sizing: border-box;
  }

  .position-select:hover,
  .position-select:focus-visible {
    color: currentColor;
    border-color: var(--border-color-100);
    text-decoration: underline;
  }

  .position-select-helper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -99999;
    color: transparent;
  }
</style>
