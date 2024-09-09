<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Header from '$lib/components/Header.svelte';
  import Position from '$lib/doodles/Position/index.svelte';
</script>

<Page>
  <Header
    slot="header"
    heading="CSS position playground"
    subheading="No flex, no grid, just position."
    completedDate="1 February 2023"
  />
  <div class="container" slot="content">
    <Position />
  </div>
</Page>

<style>
  .container {
    padding: 48px;
  }

  @media screen and (min-width: 1024px) {
    .container {

      max-width: 70%;
      margin: auto;
    }
  }
</style>
