<script>
  import RightGradient from "./gradient/RightGradient.svelte";

  export var name;
  export var count;
  export var goal;
  export var themeColorCode;

  const contentWidth = 360;
  const contentHeight = 60;
  const borderWidth = 4;
  $: restLength = (() => {
    if (count == null || goal == null) {
      return contentWidth;
    } else {
      return Math.max(contentWidth * (1 - count / goal), 0);
    }
  })();

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
