<script lang="ts">
  import routes from '../../routes';
</script>

<div class="container">
  {#each Object.keys(routes) as path (path)}
    <div class="card">
      <a href={path}><img src={routes[path].cover} alt={routes[path].name} /></a>
    </div>
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .card {
    border: 1px solid var(--border-color);
    border-radius: 20px;

    text-align: center;
    color: #ffffff;
    font-weight: 700;

    display: flex;
    flex-direction: column;

    overflow: hidden;
  }

  .card > a,
  .card > a > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card:hover,
  .card:focus,
  .card:focus-visible,
  .card:focus-within {
    border-color: var(--border-color-100);
  }

  @media screen and (min-width: 768px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 1024px) {
    .container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
