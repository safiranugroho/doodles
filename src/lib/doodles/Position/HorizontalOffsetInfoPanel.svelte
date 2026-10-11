<script lang="ts">
  import InfoPanel from './InfoPanel.svelte';
  import type { Styles } from './_styles';

  export let onUpdate: (f: (s: Styles) => void) => void;
</script>

<InfoPanel>
  <svelte:fragment slot="title">Why isn't the right value being respected?</svelte:fragment>
  <svelte:fragment slot="description">
    <span>
      This is because the text you're reading is written in English, which has a directionality of
      left-to-right ("ltr"), set by your user agent. In this text directionality, if both left and
      right are specified (not "auto"), the left value wins and the right value is ignored. Try
      <button class="inline-button" on:click={() => onUpdate((s) => s.child.left?.update('auto'))}>
        resetting the left value
      </button>
      and see what happens!
    </span>
    <slot />
  </svelte:fragment>
</InfoPanel>

<style>
  @import '../../../global.css';
</style>
