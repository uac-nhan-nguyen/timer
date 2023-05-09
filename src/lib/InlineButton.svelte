<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const d = createEventDispatcher();
</script>

<button
  class=""
  on:click={(e) => d("click", e)}>
  <slot />
</button>
