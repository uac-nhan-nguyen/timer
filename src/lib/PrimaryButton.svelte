<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let className = "";

  const d = createEventDispatcher();
</script>

<button
  class="rounded-none bg-red-600 text-white border-none px-4 py-2 cursor-pointer hover:bg-red-400 duration-100 uppercase font-bold tracking-widest {className}"
  {...$$props}
  on:click={(e) => d("click", e)}>
  <slot />
</button>
