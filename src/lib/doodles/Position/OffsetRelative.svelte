<script lang="ts">
  import HorizontalOffsetInfoPanel from './HorizontalOffsetInfoPanel.svelte';
  import type { OnInput } from './InputOffset.svelte';
  import Offsets from './Offsets.svelte';
  import VerticalOffsetInfoPanel from './VerticalOffsetInfoPanel.svelte';
  import { P, type Styles } from './_styles';

  export let currentStyles: Styles;
  export let onInput: (name: string) => OnInput;
  export let onUpdate: (f: (s: Styles) => void) => void;
</script>

<Offsets bind:currentStyles {onInput}>
  <VerticalOffsetInfoPanel slot="vertical-offset-info" {onUpdate} />
  <HorizontalOffsetInfoPanel slot="horizontal-offset-info" {onUpdate}>
    <svelte:fragment>
      <span>
        Alternatively, while it's not recommended to do this, watch what happens if both left and
        right values stay set, and the containing block's text direction is set to
        <button
          class="inline-button"
          on:click={() => onUpdate((s) => (s.parent.direction = P('rtl')))}
        >
          right-to-left ("rtl")
        </button>.
      </span>
      <span>(Spoiler alert: the right value wins!)</span>
      <button class="inline-button" on:click={() => onUpdate((s) => delete s.parent.direction)}>
        Reset back to default ("ltr").
      </button>
    </svelte:fragment>
  </HorizontalOffsetInfoPanel>
</Offsets>

<style>
  @import '../../../global.css';
</style>
