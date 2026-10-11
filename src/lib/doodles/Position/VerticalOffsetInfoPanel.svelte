<script lang="ts">
  import InfoPanel from './InfoPanel.svelte';
  import type { Styles } from './_styles';

  export let onUpdate: (f: (s: Styles) => void) => void;
</script>

<InfoPanel>
  <svelte:fragment slot="title">Why isn't the bottom value being respected?</svelte:fragment>
  <span slot="description">
    If both top and bottom are specified (not "auto"), the top value wins and the bottom value is
    ignored. Try
    <button class="inline-button" on:click={() => onUpdate((s) => s.child.top?.update('auto'))}>
      resetting the top value
    </button>
    and see what happens!
  </span>
</InfoPanel>

<style>
  @import '../../../global.css';
</style>
