<script lang="ts">
  import Page from '#lib/components/Page.svelte';

  import blog from '#lib/assets/blog-icon.png';
  import github from '#lib/assets/github.png';
  import twitter from '#lib/assets/twitter.png';
  import linkedin from '#lib/assets/linkedin.png';

  import Routes from '#lib/components/Routes.svelte';
</script>

<Page>
  <div slot="header" class="header">
    <h1 class="title">Doodles by Safira 🖍️</h1>
    <p class="desc">doodle /ˈduːd(ə)l/ - <i>verb</i>: <u>scribble</u> absent-mindedly.</p>
    <div class="socials">
      <a href="https://safira.me" title="Blog"
        ><img src={blog} alt="Blog logo" class="social-icon" /></a
      >
      <a
        href="https://github.com/safiranugroho/safira.me/tree/doodles"
        title="Source code on GitHub"><img src={github} alt="GitHub logo" class="social-icon" /></a
      >
      <a href="https://twitter.com/hisafira/" title="Twitter"
        ><img src={twitter} alt="Twitter logo" class="social-icon" /></a
      >
      <a href="https://www.linkedin.com/in/safiranugroho/" title="LinkedIn"
        ><img src={linkedin} alt="LinkedIn logo" class="social-icon" /></a
      >
    </div>
  </div>
  <div slot="content" class="content">
    <Routes />
  </div>
</Page>

<style>
  .header,
  .content {
    width: 100%;
    margin: auto;
  }

  .title {
    margin: 0;
  }

  .desc {
    margin-top: 0;
  }

  .socials {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .social-icon {
    width: 24px;
    height: 24px;
  }

  @media screen and (min-width: 768px) {
    .header,
    .content {
      width: 70%;
    }
  }

  @media screen and (min-width: 1024px) {
    .header,
    .content {
      width: 50%;
    }
  }
</style>
