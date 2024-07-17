<script>
  import { tweened } from "svelte/motion";
  import RightGradient from "./gradient/RightGradient.svelte";
  import { cubicOut } from "svelte/easing";

  /** @type {string} 名前*/
  export var name;

  /** @type {number} 現在の数 */
  export var count;

  /** @type {number} 目標数 */
  export var goal;

  /** @type {string} テーマカラーのコード */
  export var themeColorCode;

  const contentWidth = 360;
  const contentHeight = 60;
  const borderWidth = 4;
  const proportion = tweened(getProportion(count, goal), {
    duration: 0,
  });
  var previousProportion = getProportion(count, goal);
  $: {
    const currentProportion = getProportion(count, goal);
    const delta = Math.abs(currentProportion - previousProportion);
    const duration = Math.max(250, delta * 500);
    proportion.set(currentProportion, {
      duration: duration,
      easing: cubicOut,
    });
  }

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
    width={contentWidth + borderWidth * 2}
    height={contentHeight + borderWidth * 2}
  >
    <RightGradient {themeColorCode} id={colorId} />
    <rect
      class="filled"
      x={borderWidth}
      y={borderWidth}
      width={contentWidth}
      height={contentHeight}
      fill={fillColorId}
    />
    <rect
      class="background"
      x={borderWidth + contentWidth - restLength}
      y={borderWidth}
      width={restLength}
      height={contentHeight}
    />
    <rect
      class="border"
      x={borderWidth / 2}
      y={borderWidth / 2}
      width={contentWidth + borderWidth}
      height={contentHeight + borderWidth}
      stroke-width={borderWidth}
      rx="8"
      ry="8"
    />
  </svg>
  <div class="element text-container">
    <span class="name">{name}</span>
    <span>{count}</span>
  </div>
</div>

<style>
  .container {
    position: relative;
    width: 360px;
    height: 60px;
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

  .text-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .text-container span {
    font-size: 32px;
    font-weight: bold;
    padding: 0px 12px 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .name {
    flex: 1;
  }
</style>
