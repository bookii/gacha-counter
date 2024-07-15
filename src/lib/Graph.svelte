<script>
  import { cubicOut } from "svelte/easing";

  export var themeColor = "#4d89ff";
  export var count = 0;
  export var ceil = null;

  import { tweened } from "svelte/motion";

  $: remaining = ceil - (count % ceil);
  $: isJustReachedCeil = count >= ceil && count % ceil < 10;

  const radius = 180;
  const outlineWidth = 4;
  const graphWidth = 45;
  $: size = (radius + outlineWidth) * 2;
  $: outlineRadius = radius + outlineWidth / 2;
  $: graphRadius = radius - graphWidth / 2;

  const proportion = tweened(0, {
    duration: 200,
    easing: cubicOut,
  });
  $: {
    if (isJustReachedCeil) {
      proportion.set(1);
    } else {
      proportion.set((count % ceil) / ceil);
    }
  }
  $: circumference = 2 * Math.PI * graphRadius;
  $: strokeLength = circumference * $proportion;
  $: remainingStrokeLength = circumference * (1 - $proportion);
</script>

<main>
  <div class="container">
    <svg class="element" width={size} height={size}>
      <circle
        class="background"
        cx="50%"
        cy="50%"
        r={outlineRadius}
        stroke-width={outlineWidth}
      />
      <circle
        class="graph-track"
        cx="50%"
        cy="50%"
        r={graphRadius}
        stroke-width={graphWidth}
      />
      <circle
        class="graph-filled"
        style="--theme-color: {themeColor}"
        cx="50%"
        cy="50%"
        r={graphRadius}
        stroke-width={graphWidth}
        stroke-dashoffset={circumference / 4}
        stroke-dasharray="{strokeLength}, {remainingStrokeLength}"
      />
    </svg>
    <div class="element count-container">
      <div class="count">
        <span class="number">{count}</span>
        <span class="ja">連</span>
      </div>
      {#if ceil != null}
        <div class="count-ceil">
          {#if isJustReachedCeil}
            <span class="number">{Math.floor(count / ceil)}</span>
            <span class="ja">天井到達!</span>
          {:else}
            {#if count > ceil}
              <span class="number">{Math.ceil(count / ceil)}</span>
            {/if}
            <span class="ja">天井まで</span>
            <span class="number">{remaining}</span>
            <span class="ja">連</span>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
  .container {
    position: relative;
    width: 360px;
    height: 360px;
  }

  .element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
  }

  .background {
    fill: var(--background-color);
    stroke: var(--border-color);
  }

  .graph-track {
    fill: transparent;
    stroke: #f2f2f2;
  }

  .graph-filled {
    fill: transparent;
    stroke: var(--theme-color);
    transform: rotate(90);
    transform-origin: center;
  }

  .count-container div {
    text-align: center;
    white-space: nowrap;
  }

  .count-container span {
    font-weight: bold;
  }

  .count {
    margin: -40px 0 -20px 4px;
  }

  .count > .number {
    font-size: 108px;
    position: relative;
    top: 2px;
  }

  .count > .ja {
    font-size: 36px;
  }

  .count-ceil {
    color: var(--secondary-label-color);
    margin-bottom: -10px;
  }

  .count-ceil > .number {
    font-size: 30px;
    position: relative;
    top: 1px;
  }

  .count-ceil > .ja {
    font-size: 18px;
  }
</style>
