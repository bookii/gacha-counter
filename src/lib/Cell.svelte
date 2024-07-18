<script>
  import { tweened } from "svelte/motion";
  import RightGradient from "./gradient/RightGradient.svelte";
  import { cubicOut, cubicInOut } from "svelte/easing";

  /** @type {string} 名前 */
  export var name;

  /** @type {number} 現在の数 */
  export var count;

  /** @type {number} 目標数 */
  export var goal;

  /** @type {string} グラフのカラーのコード */
  export var graphColorCode;

  const contentWidth = 360;
  const contentHeight = 60;
  const padding = 20;
  const borderWidth = 4;
  const proportion = tweened(getProportion(count, goal), {
    duration: 0,
  });
  var previousProportion = getProportion(count, goal);
  var currentProportion = getProportion(count, goal);
  $: {
    currentProportion = getProportion(count, goal);
    const delta = Math.abs(currentProportion - previousProportion);
    const duration = Math.max(300, delta * 600);
    proportion.set(currentProportion, {
      duration: duration,
      easing: cubicOut,
    });
  }

  const textScale = tweened(1);
  $: {
    if (currentProportion >= 1) {
      textScale.set(1.2, {
        delay: 100,
        duration: 300,
        easing: cubicInOut,
      });
      textScale.set(1, {
        delay: 400,
        duration: 300,
        easing: cubicInOut,
      });
    }
  }

  const nameTextX = borderWidth + 16;
  const nameTextY = borderWidth + contentHeight / 2 + 2;
  const countTextX = contentWidth + borderWidth - 16;
  const countTextY = borderWidth + contentHeight / 2 + 2;

  $: restLength = contentWidth * (1 - $proportion);

  /**
   * @param {number} count
   * @param {number} goal
   */
  function getProportion(count, goal) {
    if (count == null || goal == null || goal == 0) {
      return 0;
    }
    return Math.min(count / goal, 1);
  }

  const colorId = "cell";
  const fillColorId = `url(#${colorId})`;
</script>

<div class="container">
  <svg
    class="element"
    width={contentWidth + (borderWidth + padding) * 2}
    height={contentHeight + (borderWidth + padding) * 2}
  >
    <RightGradient colorCode={graphColorCode} id={colorId} />
    <rect
      class="filled"
      x={borderWidth + padding}
      y={borderWidth + padding}
      width={contentWidth}
      height={contentHeight}
      fill={fillColorId}
    />
    <rect
      class="background"
      x={borderWidth + padding + contentWidth - restLength}
      y={borderWidth + padding}
      width={restLength}
      height={contentHeight}
    />
    <rect
      class="border"
      x={borderWidth / 2 + padding}
      y={borderWidth / 2 + padding}
      width={contentWidth + borderWidth}
      height={contentHeight + borderWidth}
      stroke-width={borderWidth}
      rx="8"
      ry="8"
    />
    <text
      text-anchor="start"
      x={nameTextX + padding}
      y={nameTextY + padding}
      alignment-baseline="middle"
      transform="scale({$textScale})"
      transform-origin="center"
    >
      {name}
    </text>
    <text
      text-anchor="end"
      x={countTextX + padding}
      y={countTextY + padding}
      alignment-baseline="middle"
      transform="scale({$textScale})"
      transform-origin="center"
    >
      {count}
    </text>
  </svg>
</div>

<style>
  .container {
    position: relative;
    width: 400px;
    height: 100px;
    margin: -20px;
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
  }

  .border {
    stroke: var(--border-color);
    fill: transparent;
  }

  text {
    font-weight: bold;
    font-size: 30px;
    fill: var(--label-color);
    stroke: var(--text-border-color);
    stroke-width: 4;
    paint-order: stroke;
    stroke-linejoin: round;
  }
</style>
