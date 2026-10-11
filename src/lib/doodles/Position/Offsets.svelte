<script lang="ts">
  import { onMount } from 'svelte';
  import InputOffset, { type OnInput } from './InputOffset.svelte';
  import writeableStyles, { type OffsetName, type Styles } from './_styles';

  export let currentStyles: Styles;
  export let onInput: (name: string) => OnInput;

  const positions = ['top', 'bottom', 'left', 'right'] as Array<OffsetName>;

  let showVerticalOffsetInfo = false;
  let showHorizontalOffsetInfo = false;

  onMount(() => {
    writeableStyles.subscribe((s) => {
      if (s.child.position.value === 'sticky') {
        showVerticalOffsetInfo =
          typeof s.child.bottom?.value === 'number' || showVerticalOffsetInfo;
        showHorizontalOffsetInfo =
          typeof s.child.right?.value === 'number' || showHorizontalOffsetInfo;
      } else {
        showVerticalOffsetInfo =
          (typeof s.child.bottom?.value === 'number' && typeof s.child.top?.value === 'number') ||
          showVerticalOffsetInfo;

        showHorizontalOffsetInfo =
          (typeof s.child.right?.value === 'number' && typeof s.child.left?.value === 'number') ||
          showHorizontalOffsetInfo;
      }
    });
  });
</script>

{#each positions as name (name)}
  <InputOffset
    {name}
    value={currentStyles.child[name]?.value}
    label={`pixels from the ${name}`}
    onInput={onInput(name)}
  />
{/each}

{#if showVerticalOffsetInfo}<slot name="vertical-offset-info" />{/if}
{#if showHorizontalOffsetInfo}<slot name="horizontal-offset-info" />{/if}

<style>
  @import '../../../global.css';
</style>
