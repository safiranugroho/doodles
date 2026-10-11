<script lang="ts">
  import { page } from '$app/state';
  import { toStore } from 'svelte/store';

  import Footer from './Footer.svelte';
  import Head from './Head.svelte';

  export let background = '';

  const pathname = toStore(() => page.url.pathname);
  $: showFooter = $pathname !== '/';
</script>

<Head />

<div class="page" style="--background: {background};">
  <div class="header"><slot name="header" /></div>
  <div class="content"><slot name="content" /></div>
  {#if showFooter}<Footer />{/if}
</div>

<style>
  .page {
    padding: 0 36px;

    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    display: flex;
    flex-direction: column;

    background: var(--background);

    min-height: 100%;
    height: fit-content;

    overflow: scroll;
  }

  .header {
    margin-top: 64px;
  }

  .content {
    font-family: var(--content-font-family);

    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: auto;
    margin-top: 32px;
    margin-bottom: 64px;
  }
</style>
