<script>
  /** @type {string} グラフのカラーコード */
  export var graphColorCode = "#4d89ff";

  /** @type {string} 背景色のカラーコード */
  export var backgroundColorCode = "#00ff00";
</script>

<header>
  <h1 class="title">ガチャ配信カウンター</h1>
  <ul>
    <li>
      <input type="color" id="theme-color" bind:value={graphColorCode} />
      <label for="theme-color">グラフの色</label>
    </li>
    <li>
      <input
        type="color"
        id="background-color"
        bind:value={backgroundColorCode}
      />
      <label for="background-color">背景色</label>
    </li>
  </ul>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-size: 24px;
    font-weight: 600;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 16px;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  header {
    background-color: var(--secondary-background-color);
    padding: 0 16px;
  }

  input[type="color"] {
    height: 30px;
    background-color: white;
    border-color: gray;
    border-radius: 2px;
  }

  label {
    font-size: 16px;
  }
</style>
