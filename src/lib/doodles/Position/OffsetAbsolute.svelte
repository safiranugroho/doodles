<script lang="ts">
  import HorizontalOffsetInfoPanel from './HorizontalOffsetInfoPanel.svelte';
  import InfoPanel from './InfoPanel.svelte';
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
      <button class="inline-button" on:click={() => onUpdate((s) => delete s.parent.direction)}>
        Reset back to default ("ltr").
      </button>
    </svelte:fragment>
  </HorizontalOffsetInfoPanel>
</Offsets>

<InfoPanel>
  <svelte:fragment slot="title">A note about the term "parent".</svelte:fragment>
  <svelte:fragment slot="description">
    <span>
      More accurately, the element's position is calculated relative from its
      <em>containing block</em>. If the element's position is "absolute", the element's containing
      block is formed by the edge of the padding box of the nearest ancestor element that has a
      position value other than "static". In this case, the child's containing block happens to be
      the parent element, whose position is set to "relative".
    </span>
    <span>
      Watch what happens to the child element when we reset the <button
        class="inline-button"
        on:click={() => onUpdate((s) => s.parent.position?.update('static'))}
        >parent's position to "static".
      </button>
    </span>
    <span>
      (Spoiler alert: it anchors itself to &lt;body&gt; as it has no other positioned block
      ancestors!)
    </span>
    <button
      class="inline-button"
      on:click={() => onUpdate((s) => s.parent.position?.update('relative'))}
    >
      Set the parent's position back to "relative".
    </button>
  </svelte:fragment>
</InfoPanel>

<style>
  @import '../../../global.css';
</style>
