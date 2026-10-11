<script lang="ts">
  import Page from '#lib/components/Page.svelte';
  import Header from '#lib/components/Header.svelte';
  import ExternalLink from '#lib/components/ExternalLink.svelte';
  import TipCalculator from '#lib/doodles/TipCalculator/index.svelte';
</script>

<Page background="#f6f6f3">
  <Header
    slot="header"
    heading="Tip calculator"
    subheading="Input the bill amount and number of people, and select a tip percentage."
    completedDate="17 January 2023"
    ><ExternalLink slot="promptBy" href="https://www.adventofcss.com/">Advent of CSS</ExternalLink
    ></Header
  >
  <TipCalculator slot="content" />
</Page>
