<script>
  import IncrementButton from "./IncrementButton.svelte";

  /** @type {string} 名前*/
  export var name;

  /** @type {number} 現在の数 */
  export var count;

  /** @type {number} 目標数 */
  export var goal;

  /**
   * @param {number} step
   */
  function increment(step) {
    count = Math.max(count + step, 0);
  }
</script>

<div class="container">
  <div class="input-container">
    <input type="text" name="item" placeholder="ほしいもの" bind:value={name} />
    <label for="goal">目標数</label>
    <input type="number" id="goal" bind:value={goal} />
  </div>
  <div class="input-container">
    <IncrementButton step={-1} on:click={() => increment(-1)} />
    <input
      type="number"
      class="current-count"
      name="current-count"
      bind:value={count}
    />
    <IncrementButton step={1} on:click={() => increment(1)} />
  </div>
</div>

<style>
  .container {
    font-size: 16px;
    display: grid;
    gap: 8px;
  }

  .input-container {
    display: flex;
    align-items: center;
  }

  input[type="text"] {
    width: 10em;
    margin-right: 12px;
  }

  label {
    margin: 0 2px 2px 0;
  }

  .current-count {
    margin: 0 8px;
  }
</style>
