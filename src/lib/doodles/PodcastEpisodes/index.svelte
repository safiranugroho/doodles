<script lang="ts">
  import cover from '#lib/assets/podcast-cover.png';
</script>

<div class="container">
  <img class="cover" alt="Compressed.fm podcast cover" src={cover} />
  <div class="list">
    <p class="title">Listen to all the Compressed.fm episodes</p>
    {#each ['Trailer', "James Q's Quick Origin Story", "Amy Dutton's Origin Story", 'Tech Behind the Podcast', 'Tech Behind SelfTeach.me', 'Freelancing (Part 1)'] as episode, i (episode)}
      <div>
        <input type="checkbox" id={String(i)} class="checkbox" />
        <label for={String(i)} class="checkbox-label">{String(i + 1)} / {episode}</label>
      </div>
    {/each}
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;900&display=swap');

  .container {
    font-family: 'Nunito Sans', sans-serif;

    margin: auto;

    display: flex;
    flex-direction: column;
  }

  .cover {
    width: 100%;
    z-index: 999;

    box-shadow: 0px 4px 24px 0px #453f3f;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 24px;

    background: #ffffff;

    margin: 0 24px;
    padding: 56px;

    border-bottom-right-radius: 32px;
    border-bottom-left-radius: 32px;
    box-shadow: 0px 4px 20px 0px #e8eaef;

    font-size: 20px;
    font-weight: 300;
    color: #4e4e4e;
  }

  .title {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1em;

    margin: 0;

    color: #a7a7a7;
  }

  .checkbox {
    display: none;
  }

  .checkbox-label::before {
    content: '';
    background-image: url('#lib/assets/checkbox--unchecked.svg');
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
    margin-right: 12px;

    width: 24px;
    height: 24px;
  }

  .checkbox:checked + .checkbox-label::before {
    content: '';
    background-image: url('#lib/assets/checkbox--checked.svg');
  }

  .checkbox:checked + .checkbox-label {
    text-decoration: line-through;
    opacity: 0.5;
  }

  @media screen and (min-width: 1024px) {
    .container {
      flex-direction: row;
      width: fit-content;
      max-width: 1200px;
    }

    .cover {
      width: unset;
    }

    .title {
      margin-bottom: 16px;
    }

    .list {
      border-bottom-left-radius: 0;
      border-top-right-radius: 32px;

      margin: 24px 0;

      font-size: 24px;
      line-height: 33px;
    }

    .checkbox:checked + .checkbox-label::before {
      margin-right: 20px;

      width: 40px;
      height: 40px;
    }
  }
</style>
