<script lang="ts">
  import Page from '#lib/components/Page.svelte';
  import Scanner from './Scanner.svelte';

  let barcode = '';
  const onDetected = (code: string) => {
    barcode = code;
  };
</script>

<Page>
  <div slot="content">
    <Scanner {onDetected} />
    <p>{barcode}</p>
  </div>
</Page>
