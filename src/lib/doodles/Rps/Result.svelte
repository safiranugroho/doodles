<script>
  import { fly } from 'svelte/transition';

  import computerBg from '#lib/assets/computer-wins.svg';
  import playerBg from '#lib/assets/you-win.svg';
  import { getContext } from 'svelte';

  /**
   * @type {string | null}
   */
  export let playerHand;
  /**
   * @type {string | null}
   */
  export let computerHand;
  /**
   * @type {string | null}
   */
  export let result;

  $: transitionOffset = result === 'computer' ? -2000 : 2000;
  $: background = result === 'computer' ? computerBg : playerBg;

  const hands = getContext('hands');
  const onReset = getContext('onReset');
</script>

{#if result && playerHand && computerHand}
  <div class="result-container" transition:fly={{ delay: 0, x: transitionOffset, duration: 250 }}>
    <img
      class={`result-bg ${result === 'computer' ? 'computer-wins' : 'player-wins'}`}
      src={background}
      alt=""
    />
    <div class="hand-result-container">
      <div class="hand-result">
        <p
          class="hand-result-text
        "
        >
          {#if result === 'player'}you win{/if}
          {#if result === 'draw'}it's a draw{/if}
        </p>
        <img class="hand-result-icon" src={hands[playerHand].icon} alt={playerHand} />
      </div>
      <div class="hand-result">
        <p
          class="hand-result-text
        "
        >
          {#if result === 'computer'}computer wins{/if}
        </p>
        <img class="hand-result-icon computer" src={hands[computerHand].icon} alt={computerHand} />
      </div>
    </div>
    <button class="reset" on:click={onReset}>play again?</button>
  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');

  .result-container {
    background: #ffffff;
    position: fixed;

    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: 'Roboto Mono', sans-serif;
    font-weight: 700;
    font-size: 24px;

    overflow: scroll;
  }

  .result-container > div {
    flex: 1;
  }

  .result-bg {
    position: fixed;
    top: 0;
    right: var(--right);
    left: var(--left);

    z-index: -1;

    height: 100%;
  }

  .result-bg.computer-wins {
    left: 'unset';
    right: 0;
  }

  .result-bg.player-wins {
    left: 0;
    right: 'unset';
  }

  .hand-result-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%;
  }

  .hand-result {
    flex: 1;
    height: 100%;

    display: grid;
    grid-template-rows: 1fr 0.75fr 3fr;
    justify-items: center;

    padding: 24px;
  }

  .hand-result-text {
    text-align: center;
    grid-row-start: 2;
    color: #000;
  }

  .hand-result-icon {
    mix-blend-mode: multiply;
    grid-row-start: 3;

    max-width: 100%;
  }

  .hand-result-icon.computer {
    transform: scaleX(-1);
  }

  .reset {
    background: transparent;
    border: 2px solid #000;

    padding: 18px 96px;
    margin-bottom: 96px;

    font-family: 'Roboto Mono', sans-serif;
    font-weight: 700;
    font-size: 24px;
  }

  @media screen and (min-width: 1024px) {
    .hand-result {
      padding: unset;
    }

    .hand-result-icon {
      max-width: unset;
    }
  }
</style>
