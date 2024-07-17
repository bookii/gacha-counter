<script>
  import { writable } from "svelte/store";
  import Graph from "./lib/Graph.svelte";
  import Cell from "./lib/Cell.svelte";
  import GraphController from "./lib/GraphController.svelte";
  import CellController from "./lib/CellController.svelte";

  var count = 0;
  var ceil = null;
  var themeColorCode = "#4d89ff";

  var items = writable([{ name: "ほしいもの", count: 0, goal: 1 }]);
</script>

<div class="wrapper">
  <table>
    <tr class="graph">
      <td>
        <div>
          <Graph {count} {ceil} {themeColorCode} />
        </div>
      </td>
      <td>
        <GraphController
          on:updateCount={(event) => (count = event.detail.count)}
          on:updateCeil={(event) => (ceil = event.detail.ceil)}
        />
      </td>
    </tr>
    {#each $items as item}
      <tr class="items">
        <td>
          <Cell
            name={item.name}
            count={item.count}
            goal={item.goal}
            {themeColorCode}
          />
        </td>
        <td>
          <CellController
            bind:name={item.name}
            bind:count={item.count}
            bind:goal={item.goal}
          />
        </td>
      </tr>
    {/each}
    <tr>
      <td />
      <td>
        <div class="colorPicker">
          <input type="color" id="themeColor" bind:value={themeColorCode} />
          <label for="themeColor">テーマカラー</label>
        </div>
      </td>
    </tr>
  </table>
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
  }

  .graph {
    padding-bottom: 24px;
  }

  tr:nth-child(1) {
    border: 0;
  }

  tr:nth-child(2) {
    border: 1px solid black;
  }

  td {
    padding: 12px 36px;
    vertical-align: left;
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
