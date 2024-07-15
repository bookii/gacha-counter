<script>
  export const themeColor = "#4d89ff";
  export const count = 100;
  export const ceil = 200;

  $: remaining = ceil - (count % ceil);

  const radius = 180;
  const outlineWidth = 4;
  const graphWidth = 45;
  $: size = (radius + outlineWidth) * 2;
  $: outlineRadius = radius + outlineWidth / 2;
  $: graphRadius = radius - graphWidth / 2;

  $: proportion = count / ceil;
  $: circumference = 2 * Math.PI * graphRadius;
  $: strokeLength = circumference * proportion;
  $: remainingStrokeLength = circumference * (1 - proportion);
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
        <span style="font-size: 108px;">{count}</span>
        <span style="font-size: 36px;">連</span>
      </div>
      {#if ceil != null}
        <div class="count-sub">
          <span style="font-size: 18px;">天井まで</span>
          <span style="font-size: 30px;">{remaining}</span>
          <span style="font-size: 18px">連</span>
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
    color: var(--label-color);
    margin: -34px 0 -20px 4px;
  }

  .count-sub {
    color: var(--secondary-label-color);
    margin-bottom: -4px;
  }
</style>
