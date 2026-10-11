<script lang="ts">
  import Page from '#lib/components/Page.svelte';
  import Header from '#lib/components/Header.svelte';
  import ExternalLink from '#lib/components/ExternalLink.svelte';
  import PodcastEpisodes from '#lib/doodles/PodcastEpisodes/index.svelte';
</script>

<Page background="#f3f3f3">
  <Header
    slot="header"
    heading="Podcast episodes"
    subheading="Mark each episode as watched!"
    completedDate="16 January 2023"
    ><ExternalLink slot="promptBy" href="https://www.adventofcss.com/">Advent of CSS</ExternalLink
    ></Header
  >
  <PodcastEpisodes slot="content" />
</Page>
