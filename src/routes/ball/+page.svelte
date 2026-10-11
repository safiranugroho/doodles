<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import Page from '#lib/components/Page.svelte';
  import Ball from '#lib/doodles/Ball/index.svelte';
</script>

<Page>
  <Header
    slot="header"
    heading="Ball"
    subheading="IDK – it's just a bouncing ball."
    completedDate="21 January 2023"
  />
  <Ball slot="content" />
</Page>
