<script>
  export var step;
</script>

<button on:click>
  {#if step > 0}
    +{step}
  {:else}
    {step}
  {/if}
</button>

<style>
  button {
    height: 32px;
    margin-top: 2px;
    font-size: 16px;
    color: var(--label-color);
  }
</style>
