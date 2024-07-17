<script>
  import { writable } from "svelte/store";
  import Graph from "./lib/Graph.svelte";
  import Cell from "./lib/Cell.svelte";
  import GraphController from "./lib/GraphController.svelte";
  import CellController from "./lib/CellController.svelte";

  var count = 0;
  var ceil = null;
  var themeColorCode = "#4d89ff";
  var id = -1;

  var items = writable([createItem()]);

  function createItem() {
    id++;
    return { id: id, name: "ほしいもの", count: 0, goal: 1 };
  }
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
      <td>
        <div class="colorPicker">
          <input type="color" id="themeColor" bind:value={themeColorCode} />
          <label for="themeColor">テーマカラー</label>
        </div>
      </td>
    </tr>
    {#each $items as item, index}
      <tr class="item {index % 2 == 0 ? 'even' : 'odd'}">
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
        <td>
          <button
            class="delete"
            on:click={() => {
              items.update((items) => {
                return items.filter((i) => i.id !== item.id);
              });
            }}>削除</button
          >
        </td>
      </tr>
    {/each}
    <tr>
      <td />
      <td>
        <div class="colorPicker">
          <button
            on:click={() =>
              items.update((items) => {
                items.push(createItem());
                return items;
              })}
          >
            ほしいものを追加する
          </button>
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
    padding-bottom: 32px;
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
    font-size: 16px;
  }

  .delete {
    color: crimson;
  }

  .even td:nth-child(2) {
    background-color: #f9f9f9;
  }
</style>
