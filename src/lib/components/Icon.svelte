<div class="icon">
  <slot />
</div>

<style>
  @import '../../global.css';

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  :global(.icon > svg) {
    fill: currentColor;
    width: inherit;
    height: inherit;
  }
</style>
