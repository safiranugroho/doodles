<script lang="ts">
  import Page from '#lib/components/Page.svelte';
  import ExternalLink from '#lib/components/ExternalLink.svelte';
  import Header from '#lib/components/Header.svelte';
  import Weather from '#lib/doodles/Weather/index.svelte';
</script>

<Page background="#E9F5FA">
  <Header
    slot="header"
    heading="Weather forecast"
    subheading="What's the weather like today?"
    completedDate="18 January 2023"
    ><ExternalLink slot="promptBy" href="https://www.adventofcss.com/">Advent of CSS</ExternalLink
    ></Header
  >
  <Weather slot="content" />
</Page>
