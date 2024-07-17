<script>
  import Graph from "./lib/Graph.svelte";
  import Cell from "./lib/Cell.svelte";
  import GraphController from "./lib/GraphController.svelte";

  var count = 0;
  var ceil = null;
  var themeColorCode = "#4d89ff";
</script>

<div class="wrapper">
  <main>
    <Graph {count} {ceil} {themeColorCode} />
    <Cell name="手毬たくさんラー" count="10" goal="4" {themeColorCode} />
  </main>

  <aside>
    <div class="colorPicker">
      <input type="color" id="themeColor" bind:value={themeColorCode} />
      <label for="themeColor">テーマカラー</label>
    </div>
    <GraphController
      on:updateCount={(event) => (count = event.detail.count)}
      on:updateCeil={(event) => (ceil = event.detail.ceil)}
    />
  </aside>
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
  }

  aside {
    display: flex;
    flex-direction: column;
    background-color: var(--secondary-background-color);
  }

  .colorPicker {
    margin-top: 20px;
  }

  input[type="color"] {
    height: 30px;
  }

  label {
    font-size: 20px;
  }
</style>
