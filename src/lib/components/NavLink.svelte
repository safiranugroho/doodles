<script lang="ts" context="module">
  let current: Route = {};
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { toStore } from 'svelte/store';

  import arrowPrev from '#lib/assets/arrow-prev.png';
  import arrowNext from '#lib/assets/arrow-next.png';
  import { goto } from '$app/navigation';

  import routes, { type Route } from '../../routes';

  export let prev = false;

  toStore(() => page.url.pathname).subscribe((pathname) => {
    const doodle = routes[pathname];
    if (!doodle) current = {};
    if (doodle && current.name !== doodle.name) current = doodle;
  });

  let url = prev ? current?.prev : current?.next;
  let title = url && routes[url].name;
  let icon = prev ? arrowPrev : arrowNext;

  let alignText = prev ? 'left' : 'right';
  let alignItems = prev ? 'start' : 'end';
  let direction = prev ? 'row' : 'row-reverse';

  onMount(() => {
    if (current) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goto(current.prev ?? '/');
        if (e.key === 'ArrowRight') goto(current.next ?? '/');
      });
    }
  });
</script>

{#if url}
  <a
    href={url}
    title="Link to previous doodle"
    class="nav-link"
    style="--align-text: {alignText}; --align-items: {alignItems}; --direction: {direction}"
  >
    <img src={icon} alt="Previous doodle" class="nav-icon" />
    <p class="nav-text">{title}</p>
  </a>
{:else}
  <a
    href="/"
    title="Back to home"
    class="nav-link"
    style="--align-text: {alignText}; --align-items: {alignItems}; --direction: {direction}"
  >
    <img src={icon} alt="Back to home" class="nav-icon" />
    <p class="nav-text">Home</p>
  </a>
{/if}

<style>
  .nav-link {
    padding: 2px;
    border: 1px solid transparent;

    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: var(--align-items);

    font-size: 12px;
    text-align: var(--align-text);
  }

  .nav-text {
    margin: 0;
  }

  .nav-icon {
    width: 18px;
    height: 18px;
  }

  .nav-link:hover,
  .nav-link:focus,
  .nav-link:focus-visible,
  .nav-link:focus-within {
    border: 1px solid var(--border-color);
  }

  @media screen and (min-width: 768px) {
    .nav-link {
      flex-direction: var(--direction);
      gap: 8px;
      align-items: center;
    }
  }
</style>
