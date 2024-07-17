<script>
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import UpGradient from "./gradient/UpGradient.svelte";

  export var themeColorCode;
  export var count;
  export var ceil;

  $: remaining = ceil - (count % ceil);
  $: isJustReachedCeil = count >= ceil && count % ceil < 10;
  $: ceilCount = Math.floor(count / ceil);

  const radius = 180;
  const borderWidth = 4;
  const graphWidth = 45;
  $: size = (radius + borderWidth) * 2;
  $: outlineRadius = radius + borderWidth / 2;
  $: graphRadius = radius - graphWidth / 2;

  const proportion = tweened(0);
  var previousProportion = 0;

  $: {
    const currentProportion = (() => {
      if (isJustReachedCeil) {
        return 1;
      } else {
        return ceil == null ? 0 : ceil == 0 ? 0 : (count % ceil) / ceil;
      }
    })();
    const delta = Math.abs(previousProportion - currentProportion);
    const duration = Math.max(250, Math.min(delta * 5000, 500));
    proportion.set(currentProportion, {
      duration: duration,
      easing: cubicOut,
    });
    previousProportion = currentProportion;
  }

  $: circumference = 2 * Math.PI * graphRadius;
  $: strokeLength = circumference * $proportion;
  $: remainingStrokeLength = circumference * (1 - $proportion);

  const colorId = "graph";
  const fillColorId = `url(#${colorId})`;
</script>

<div class="container">
  <svg class="element" width={size} height={size}>
    <UpGradient {themeColorCode} id={colorId} />
    <circle
      class="background"
      cx="50%"
      cy="50%"
      r={outlineRadius}
      stroke-width={borderWidth}
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
      cx="50%"
      cy="50%"
      r={graphRadius}
      stroke={fillColorId}
      stroke-width={graphWidth}
      stroke-dashoffset={circumference / 4}
      stroke-dasharray="{strokeLength}, {remainingStrokeLength}"
    />
  </svg>
  <div class="element count-container">
    <div class="count">
      <span class="number">{count ?? 0}</span>
      <span class="ja">連</span>
    </div>
    {#if ceil != null}
      <div class="count-ceil">
        {#if isJustReachedCeil}
          <span
            class="number"
            style="visibility: {ceilCount >= 2 ? 'visible' : 'hidden'};"
          >
            {ceilCount >= 2 ? ceilCount : ""}
          </span>
          <span class="ja">天井到達!</span>
        {:else}
          <span
            class="number"
            style="visibility: {ceilCount >= 1 ? 'visible' : 'hidden'};"
          >
            {ceilCount >= 1 ? ceilCount + 1 : ""}
          </span>
          <span class="ja">天井まで</span>
          <span class="number">{remaining}</span>
          <span class="ja">連</span>
        {/if}
      </div>
    {/if}
  </div>
</div>

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
    min-height: 30px;
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
