<script lang="ts">
  import { page } from '$app/state';
  import { toStore } from 'svelte/store';
  import { onMount } from 'svelte';
  import routes from '../../routes';

  const defaultTitle = 'Doodles by Safira';
  const pathname = toStore(() => page.url.pathname);
  $: title = routes[$pathname] ? `${routes[$pathname].name} | ${defaultTitle}` : defaultTitle;

  onMount(() => {
    document.title = title;
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
