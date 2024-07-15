<script>
  import Graph from "./lib/Graph.svelte";
  import GraphController from "./lib/GraphController.svelte";

  var count = 0;
  var ceil = null;
</script>

<div class="wrapper">
  <main>
    <Graph {count} {ceil} />
  </main>

  <aside>
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
    justify-content: center;
    background-color: var(--secondary-background-color);
  }
</style>
