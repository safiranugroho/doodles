<script lang="ts">
  import InfoIcon from '#lib/assets/info-icon.svelte';
  import Icon from '#lib/components/Icon.svelte';
</script>

<details class="container">
  <summary class="title-container">
    <Icon><InfoIcon /></Icon>
    <p class="title"><slot name="title" /></p>
  </summary>
  <p class="description"><slot name="description" /></p>
</details>

<style>
  @import '../../../global.css';

  .container {
    font-size: 1rem;

    background-color: var(--background-color-50);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);

    padding: 1.25em 1em;
    margin: 24px 0;

    display: flex;
    gap: 8px;
  }

  .title-container {
    display: flex;
    gap: 8px;
    align-items: flex-start;

    cursor: pointer;

    list-style: none;
  }

  .title-container::-webkit-details-marker {
    display: none;
  }

  .title,
  .description {
    margin: 0;
  }

  .title {
    color: currentColor;
    font-weight: 700;
  }

  .description {
    padding-top: 16px;
    color: currentColor;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
