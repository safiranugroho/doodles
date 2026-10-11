<script lang="ts">
  import InfoPanel from './InfoPanel.svelte';
  import type { OnInput } from './InputOffset.svelte';
  import Offsets from './Offsets.svelte';
  import type { Styles } from './_styles';

  export let currentStyles: Styles;
  export let onInput: (name: string) => OnInput;
  export let onSwitchImagePosition: () => void;
</script>

<Offsets bind:currentStyles {onInput}>
  <InfoPanel slot="vertical-offset-info">
    <svelte:fragment slot="title">Why isn't the bottom value being respected?</svelte:fragment>
    <svelte:fragment slot="description">
      <span>
        With position set to "sticky", the element is treated as relatively positioned until its
        containing block crosses a specified threshold, at which point its position is fixed to that
        threshold point.
      </span>
      <span>
        This child element is naturally positioned on top of its siblings in the markup, so even
        after scrolling its parent all the way to the bottom, the containing block will never cross
        the threshold set by the bottom value. Hence, the child element stays sticky to the top
        threshold point.
      </span>
      <span>
        Try moving the element
        <button class="inline-button" on:click={onSwitchImagePosition}>
          to the bottom in the markup
        </button> and see what happens!
      </span>
      <span>
        Once the scroll position is back to initial, the element will be re-positioned back to its
        relative position.
      </span>
      <span>
        <button class="inline-button" on:click={onSwitchImagePosition}>
          (Move it back to the top.)</button
        >
      </span>
    </svelte:fragment>
  </InfoPanel>
  <InfoPanel slot="horizontal-offset-info">
    <svelte:fragment slot="title">Why isn't the right value being respected?</svelte:fragment>
    <svelte:fragment slot="description">
      <span>
        With position set to "sticky", the element is treated as relatively positioned until its
        containing block crosses a specified threshold, at which point its position is fixed to that
        threshold point.
      </span>
      <span>
        This child element is naturally positioned on left of its siblings in the markup, so even
        after scrolling its parent all the way to the right, the containing block will never cross
        the threshold set by the right value. Hence, the child element sticky to the left threshold
        point.
      </span>
      <span>
        Once the scroll position is back to initial, the element will be re-positioned back to its
        relative position.
      </span>
    </svelte:fragment>
  </InfoPanel>
</Offsets>

<style>
  @import '../../../global.css';
</style>
