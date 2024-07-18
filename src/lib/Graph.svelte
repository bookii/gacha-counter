<script>
  import { cubicInOut, cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import UpGradient from "./gradient/UpGradient.svelte";

  export var graphColorCode;
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

  $: countTextX = borderWidth + radius;
  $: countTextY =
    ceil == null ? borderWidth + radius * 1.2 : borderWidth + radius * 1.1;
  var textScale = tweened(1);
  $: {
    if (isJustReachedCeil) {
      textScale.set(1.5, {
        duration: 300,
        easing: cubicInOut,
      });
      textScale.set(1, {
        delay: 300,
        duration: 300,
        easing: cubicInOut,
      });
    }
  }

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
    <UpGradient colorCode={graphColorCode} id={colorId} />
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
    <g
      transform="translate({(1 - $textScale) * countTextX},
       {(1 - $textScale) * countTextY}) scale({$textScale})"
    >
      <text
        class="count"
        text-anchor="middle"
        x={countTextX}
        y={countTextY}
        dx="4"
      >
        <tspan class="number">{count ?? 0}</tspan>
        <tspan class="ja" dy="-2">連</tspan>
      </text>
      {#if ceil != null}
        <text
          class="ceil"
          text-anchor="middle"
          x={borderWidth + radius}
          y={borderWidth + radius * 1.375}
        >
          {#if isJustReachedCeil}
            <tspan
              class="number"
              style="visibility: {ceilCount >= 2 ? 'visible' : 'hidden'};"
            >
              {ceilCount >= 2 ? ceilCount : ""}
            </tspan>
            <tspan class="ja" dy="-1">天井到達!</tspan>
          {:else}
            <tspan
              class="number"
              style="visibility: {ceilCount >= 1 ? 'visible' : 'hidden'};"
            >
              {ceilCount >= 1 ? ceilCount + 1 : ""}
            </tspan>
            <tspan class="ja" dy="-1">天井まで</tspan>
            <tspan class="number" dy="1">{remaining}</tspan>
            <tspan class="ja" dy="-1">連</tspan>
          {/if}
        </text>
      {/if}
    </g>
  </svg>
</div>

<style>
  .container {
    position: relative;
    width: 360px;
    height: 360px;
    padding: 12px 0;
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
    stroke: var(--secondary-background-color);
  }

  .graph-filled {
    fill: transparent;
  }

  text {
    font-weight: bold;
    /* gap between tspan */
    font-size: 12px;
    fill: var(--label-color);
    stroke: var(--text-border-color);
    stroke-width: 4;
    paint-order: stroke;
    stroke-linejoin: round;
    white-space-collapse: collapse;
  }

  text.count {
    fill: var(--label-color);
  }

  text.ceil {
    fill: var(--secondary-label-color);
  }

  .count .number {
    font-size: 108px;
  }

  .count .ja {
    font-size: 36px;
  }

  .count > .number {
    font-size: 108px;
    position: relative;
    top: 2px;
  }

  .count > .ja {
    font-size: 36px;
    margin-bottom: 20px;
  }

  .ceil > .number {
    font-size: 30px;
  }

  .ceil > .ja {
    font-size: 18px;
  }
</style>
