<script>
  import { createEventDispatcher, onMount } from "svelte";
  import IncrementButton from "./IncrementButton.svelte";

  const dispatch = createEventDispatcher();
  var count = 0;
  var ceil = 200;

  $: {
    dispatch("updateCount", {
      count: count,
    });
  }

  $: {
    dispatch("updateCeil", {
      ceil: ceil,
    });
  }

  onMount(() => {
    dispatch("updateCeil", {
      ceil: ceil,
    });
  });

  /**
   * @param {number} step
   */
  function increment(step) {
    count = Math.max(count + step, 0);
  }
</script>

<div class="container">
  <div class="counter-container">
    <IncrementButton step={-10} on:click={() => increment(-10)} />
    <IncrementButton step={-1} on:click={() => increment(-1)} />
    <div class="counter-inner-container">
      <input type="number" bind:value={count} step="1" />
      <span>連</span>
    </div>
    <IncrementButton step={1} on:click={() => increment(1)} />
    <IncrementButton step={10} on:click={() => increment(10)} />
  </div>
  <div></div>
  <div class="counter-container">
    <span>（天井</span>
    <input type="number" bind:value={ceil} step="1" />
    <span>連）</span>
  </div>
</div>

<style>
  .container {
    font-size: 20px;
    margin-top: 20px;
  }

  .counter-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin: 8px 0 8px 0;
  }

  .counter-inner-container {
    margin: 0 12px 0 12px;
  }

  input[type="number"] {
    width: 4em;
    height: 30px;
    margin: 2px 4px 0 4px;
    font-size: 20px;
    color: var(--label-color);
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    appearance: textfield;
  }
</style>
