<script>
  import { writable } from "svelte/store";
  import Graph from "./lib/Graph.svelte";
  import Cell from "./lib/Cell.svelte";
  import GraphController from "./lib/GraphController.svelte";
  import CellController from "./lib/CellController.svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  var count = 0;
  var ceil = null;

  /** @type {string} グラフのカラーコード */
  var graphColorCode = "#4d89ff";

  /** @type {string} 背景色のカラーコード */
  var backgroundColorCode = "#00ff00";

  /** @type {number} アイテムのID */
  var id = -1;

  var items = writable([createItem()]);

  function createItem() {
    id++;
    return { id: id, name: "ほしいもの", count: 0, goal: 1 };
  }

  /**
   * @param {string} [id]
   */
  function showDialog(id) {
    const dialog = document.querySelector(`#${id}`);
    if (dialog && dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    }
  }
</script>

<Header bind:graphColorCode bind:backgroundColorCode />

<div class="wrapper" style="--display-background-color: {backgroundColorCode}">
  <table>
    <tr class="graph">
      <td>
        <div>
          <Graph {count} {ceil} {graphColorCode} />
        </div>
      </td>
      <td>
        <GraphController
          on:updateCount={(event) => (count = event.detail.count)}
          on:updateCeil={(event) => (ceil = event.detail.ceil)}
        />
      </td>
      <td>
        <div class="color-picker-container"></div>
      </td>
    </tr>
    {#each $items as item, index}
      <tr class="item {index % 2 == 0 ? 'even' : 'odd'}">
        <td>
          <Cell
            name={item.name}
            count={item.count}
            goal={item.goal}
            {graphColorCode}
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
        <div>
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
      <td />
    </tr>
  </table>
</div>

<dialog id="how-to-use">
  <div class="how-to-use-container">
    <div>
      OBSの「ウィンドウキャプチャ」でこのページをキャプチャしてください。
    </div>
    <div>設定した背景色はクロマキーで透過することができます。</div>
    <div>
      ※OBSの「ブラウザ」は色の選択や日本語入力ができないので非推奨です。
    </div>
  </div>
  <form method="dialog">
    <button
      on:click={() => {
        showDialog();
      }}
    >
      OK
    </button>
  </form>
</dialog>

<dialog id="notice">
  <ul>
    <li>個人・企業を問わず商業利用可能です。</li>
    <li>クレジット表記や利用報告の義務はありません。</li>
    <li>
      本Webサイトの利用により発生したトラブルについては、一切の責任を負いかねます。
    </li>
  </ul>
  <form method="dialog">
    <button
      on:click={() => {
        showDialog();
      }}
    >
      OK
    </button>
  </form>
</dialog>

<Footer
  on:clickHowToUse={() => {
    showDialog("how-to-use");
  }}
  on:clickNotice={() => {
    showDialog("notice");
  }}
/>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 16px;
  }

  table {
    border-collapse: collapse;
  }

  td:nth-child(1) {
    background-color: var(--display-background-color);
  }

  td {
    padding: 12px 36px;
    vertical-align: left;
  }

  td:nth-child(2) {
    background-color: var(--background-color);
  }

  .even td:nth-child(2) {
    background-color: #f9f9f9;
  }

  td:nth-child(3) {
    background-color: var(--background-color);
  }

  .delete {
    color: crimson;
  }

  dialog {
    border: 0.1px solid var(--label-color);
    border-radius: 4px;
    color: var(--label-color);
    text-decoration-color: var(--label-color);
  }

  .how-to-use-container {
    margin-bottom: 16px;
  }

  dialog div + div {
    margin-top: 4px;
  }

  dialog ul {
    margin-top: 4px;
  }

  dialog li {
    margin: 0 8px 0 -8px;
  }

  dialog li + li {
    margin-top: 4px;
  }

  dialog form {
    display: flex;
    justify-content: center;
  }

  dialog::backdrop {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(4px);
  }
</style>
