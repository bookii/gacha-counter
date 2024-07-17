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
