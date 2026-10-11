<script lang="ts">
  import Page from '#lib/components/Page.svelte';

  let value: string;
  let colors: string[] = [];

  const isValidHex = (s: string): boolean => /^#([0-9A-F]{3}){1,2}$/i.test(s);

  const handleColorInput = (s: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    console.log(s.currentTarget.value);
    if (isValidHex(s.currentTarget.value)) {
      colors.push(s.currentTarget.value);
      colors = colors;
      value = '';
    }
  };
</script>

<Page>
  <div class="container" slot="content">
    <label for="color-input"></label>
    <input id="color-input" type="text" bind:value on:change={handleColorInput} />
    <div class="colors-container">
      {#each colors as color, i (i)}
        <div class="color-box" style="--color: {color};"></div>
      {/each}
    </div>
  </div>
</Page>

<style>
  .container {
    width: 100%;
    flex: 1;
    text-align: center;
  }

  .colors-container {
    display: flex;
    width: 100%;
    height: 48px;

    margin-top: 24px;
  }

  .color-box {
    flex: 1;
    background: var(--color);

    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 1024px) {
    .colors-container {
      min-width: 720px;
      max-width: 100%;
    }
  }
</style>
