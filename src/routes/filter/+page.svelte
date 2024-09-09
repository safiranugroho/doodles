<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Header from '$lib/components/Header.svelte';
  import Filter from '$lib/doodles/Filter/index.svelte';
</script>

<Page>
  <Header
    slot="header"
    heading="CSS filter playground"
    subheading="Explore CSS filter() via the sliders."
    completedDate={'22 January 2023'}
  />
  <Filter slot="content" />
</Page>