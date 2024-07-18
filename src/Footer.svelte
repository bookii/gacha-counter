<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onClickNotice() {
    dispatch("clickNotice");
  }

  function onClickHowToUse() {
    dispatch("clickHowToUse");
  }
</script>

<footer>
  <div class="footer-item">
    <a href="https://x.com/mizz_noff">(c)ミズノフ</a>
  </div>
  <span>|</span>
  <div class="footer-item">
    <button on:click={onClickHowToUse}>使い方</button>
  </div>
  <span>|</span>
  <div class="footer-item">
    <button on:click={onClickNotice}>注意事項</button>
  </div>
</footer>

<style>
  footer {
    position: fixed;
    display: flex;
    gap: 8px;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: 14px;
    justify-content: center;
    padding: 4px 0;
  }

  .footer-item button {
    font-size: 14px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }
</style>
