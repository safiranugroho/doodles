<script lang="ts">
  import Page from '#lib/components/Page.svelte';
  import Header from '#lib/components/Header.svelte';
  import ExternalLink from '#lib/components/ExternalLink.svelte';
  import Keyboard from '#lib/doodles/Keyboard/index.svelte';
</script>

<Page background="#f6f6f6">
  <Header
    slot="header"
    heading="Keyboard"
    subheading="My keyboard jiggle jiggles - press the key on your keyboard to stop the jiggle."
    completedDate="16 January 2023"
  >
    <ExternalLink slot="promptBy" href="https://www.adventofcss.com/">Advent of CSS</ExternalLink
    ></Header
  >

  <div class="container" slot="content">
    <Keyboard />
  </div>
</Page>

<style>
  .container {
    width: 100%;
  }
</style>
