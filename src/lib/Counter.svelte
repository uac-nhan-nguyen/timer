<script lang="ts">
  export let className: string
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment} class={className}>
  Click is <span class="font-mono">{count}</span>
</button>
