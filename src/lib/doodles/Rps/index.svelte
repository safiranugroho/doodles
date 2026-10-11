<script lang="ts">
  import { setContext } from 'svelte';

  import rock from '#lib/assets/rock.png';
  import paper from '#lib/assets/paper.png';
  import scissors from '#lib/assets/scissors.png';

  import Result from './Result.svelte';

  type HandMetadata = {
    icon: string;
    defeats: (h: string | null) => boolean;
  };

  type Hands = {
    [key: string]: HandMetadata;
  };

  const hands: Hands = {
    rock: { icon: rock, defeats: (h) => h === 'scissors' },
    paper: { icon: paper, defeats: (h) => h === 'rock' },
    scissors: { icon: scissors, defeats: (h) => h === 'paper' }
  };

  setContext('hands', hands);

  let playerHand: string | null = null;
  let computerHand: string | null = null;
  let result: 'player' | 'draw' | 'computer' | null = null;

  $: {
    if (playerHand) {
      const randomIndex = Math.floor(Math.random() * 3);
      computerHand = Object.keys(hands)[randomIndex];

      result =
        playerHand === computerHand
          ? 'draw'
          : hands[playerHand].defeats(computerHand)
            ? 'player'
            : 'computer';
    }
  }

  function handleReset() {
    playerHand = null;
    computerHand = null;
    result = null;
  }

  setContext('onReset', handleReset);
</script>

<div class="game-container">
  <p class="title">pick one</p>
  <fieldset class="hands">
    {#each Object.keys(hands) as hand (hand)}
      <input
        class="hand-checkbox"
        type="radio"
        id={hand}
        name="player-hand"
        value={hand}
        bind:group={playerHand}
      />
      <label for={hand} class="hand-container">
        <img class="hand-icon" src={hands[hand].icon} alt={hand} />
        <p class="hand-text">{hand}</p>
      </label>
    {/each}
  </fieldset>
  <Result {result} {playerHand} {computerHand} />
</div>

<style>
  @import '../../../global.css';

  .game-container {
    font-family: 'Roboto Mono', sans-serif;
    font-weight: 700;
    font-size: 24px;
  }

  .title {
    text-align: center;
    margin-bottom: 48px;
  }

  .hands {
    all: unset;

    display: flex;
    flex-direction: column;
    gap: 64px;

    max-width: 1096px;
    font-size: 18px;
  }

  .hand-checkbox {
    display: none;
  }

  .hand-container {
    flex: 1;
    background-color: white;

    padding: 24px;
    border: 2px solid currentColor;
    box-sizing: border-box;

    display: grid;
    grid-template-rows: 5fr 1fr;
    text-align: center;
    align-items: center;
  }

  .hand-checkbox:checked + .hand-container {
    margin: -8px;
    border: 10px solid #ffb800;
  }

  .hand-icon {
    max-width: 80%;
    max-height: 80%;

    margin: auto;

    object-fit: contain;
  }

  .hand-text {
    color: #000;
  }

  @media screen and (min-width: 768px) {
    .hands {
      flex-direction: row;
    }
  }
</style>
