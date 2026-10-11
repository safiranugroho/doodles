<script lang="ts">
  import dollarIcon from '#lib/assets/dollar.svg';
  import peopleIcon from '#lib/assets/people.svg';

  let billAmount: number | null = null;
  let numberOfPeople: number | null = null;
  let tipAmount = 0;

  let totalTipAmount = 0;
  let totalPerPerson = 0;

  function handleReset() {
    billAmount = null;
    numberOfPeople = null;
    tipAmount = 0;

    totalTipAmount = 0;
    totalPerPerson = 0;
  }

  function handleCalculate() {
    totalTipAmount = tipAmount && billAmount ? billAmount * (tipAmount * 0.01) : 0;
    totalPerPerson =
      billAmount && numberOfPeople ? (billAmount + totalTipAmount) / numberOfPeople : 0;
  }
</script>

<div class="bill">
  <div class="output">
    <div class="description">
      <span class="label">Tip amount</span>
      <span class="label">% from bill amount</span>
    </div>
    <p class="value">
      <span class="currency">$</span>
      {totalTipAmount.toFixed(2)}
    </p>
  </div>
  <div class="output">
    <div class="description">
      <span class="label">Total per person</span>
      <span class="label">Bill + tip amount<br />divided by number of people</span>
    </div>
    <p class="value">
      <span class="currency">$</span>
      {totalPerPerson.toFixed(2)}
    </p>
  </div>
  <div class="inputs">
    <div class="bill-amount input">
      <div>
        <img alt="Dollar sign icon" src={dollarIcon} />
        <input type="number" id="bill-amount" maxlength={6} bind:value={billAmount} />
      </div>
      <label for="bill-amount">Bill amount</label>
    </div>
    <div class="number-of-people input">
      <div>
        <img alt="People icon" src={peopleIcon} />
        <input type="number" id="number-of-people" maxlength={4} bind:value={numberOfPeople} />
      </div>
      <label for="number-of-people">Number of people</label>
    </div>
  </div>
  <fieldset class="tip-amount">
    {#each [5, 10, 15, 20] as amount (amount)}
      <input
        type="radio"
        id={`${amount}-percent`}
        name="tip-amount"
        value={amount}
        bind:group={tipAmount}
      />
      <label for={`${amount}-percent`}>{amount}%</label>
    {/each}
  </fieldset>
  <div class="actions">
    <button on:click={handleReset}>Reset</button>
    <button on:click={handleCalculate}>Calculate</button>
  </div>
</div>

<style>
  @import '../../../global.css';

  .bill {
    font-family: 'Inter', sans-serif;
    color: #333333;

    background: #fff;
    border-radius: 20px;
    max-width: 768px;
    margin: auto;

    box-shadow: 0px 0px 42px rgba(148, 146, 120, 0.2);
  }

  .output {
    display: flex;
    padding: 40px 0;
  }

  .output:first-child {
    border-bottom: 1px solid var(--border-color);
    margin: 0 8px;
  }

  .description {
    flex: 1;

    padding: 16px 32px;

    display: flex;
    flex-direction: column;

    gap: 4px;
  }

  .label:first-child {
    font-family: 'Roboto Mono', sans-serif;
    font-weight: 700;
  }

  .label:last-child {
    font-family: 'Roboto Mono', sans-serif;
    font-weight: 400;
    font-style: italic;
    font-size: 12px;
  }

  .currency {
    font-size: 56px;
    vertical-align: text-top;
  }

  .value {
    flex: 2;

    font-weight: 700;
    font-size: 80px;
    line-height: 80px;

    margin: 0;

    display: flex;
    gap: 8px;
  }

  .inputs {
    background: #f7f7f7;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    display: flex;
    flex-direction: column;

    max-width: inherit;
  }

  .input {
    display: flex;
    flex-direction: column;
    padding: 56px 48px;

    text-align: center;

    font-size: 64px;
    font-weight: 700;
    line-height: 56px;
  }

  .input > div {
    display: flex;
    align-items: center;
    border-bottom: 2px dotted #b3b3b3;
  }

  .input > div > img {
    height: 0.8em;
    margin-right: 16px;
  }

  .input > div > input {
    all: unset;
    width: 100%;
    text-align: left;
  }

  .input > label {
    font-family: 'Roboto Mono', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;

    margin-top: 4px;
  }

  .bill-amount {
    flex: 2;
    border-right: 1px solid var(--border-color);
  }
  .number-of-people {
    flex: 1.5;
  }

  .tip-amount {
    all: unset;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    background: #eeeeee;
    padding: 24px 48px;

    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }

  .tip-amount > input {
    display: none;
  }

  .tip-amount > label {
    flex: 1;
    padding: 16px;

    background: #ffffff;
    border-radius: 16px;

    font-family: 'Roboto Mono', sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #60c1b6;
    text-align: center;
  }

  .tip-amount > input:hover + label,
  input:focus + label,
  input:focus-visible + label {
    text-decoration: underline;
  }

  .tip-amount > input:checked + label {
    background: #60c1b6;
    color: #ffffff;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: right;

    background: #f7f7f7;
    padding: 24px 48px;

    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .actions > button {
    all: unset;

    flex: 1;
    padding: 16px;

    border-radius: 16px;

    font-family: 'Roboto Mono', sans-serif;
    font-weight: 700;
    font-size: 24px;

    text-align: center;
  }

  .actions > button:hover,
  button:focus,
  button:focus-visible {
    text-decoration: underline;
  }

  .actions > button:first-child {
    border: 1px solid #ed7861;
    color: #ed7861;
  }

  .actions > button:last-child {
    background: #ed7861;
    color: #ffffff;
  }

  @media screen and (min-width: 768px) {
    .description {
      text-align: right;
      padding-right: 32px;
    }

    .inputs {
      flex-direction: row;
    }

    .tip-amount {
      grid-template-columns: repeat(4, 1fr);
      gap: 48px;
    }

    .actions {
      flex-direction: row;
      gap: 48px;
    }
  }
</style>
