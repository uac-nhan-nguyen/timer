<script lang="ts">
  import { deleteLap, type LapDataItem } from "./model/Lap";
  import dayjs from "dayjs";
  import InlineButton from "./lib/InlineButton.svelte";

  export let item: { time: number; lap: LapDataItem };
  export let editing: boolean = false;

  const ONE_HOUR = 1000 * 60 * 60;
  const ONE_DAY = 1000 * 60 * 60 * 24;

  const { seconds } = item.lap;
  const format =
    seconds == null
      ? ""
      : seconds < ONE_HOUR
      ? "mm:ss"
      : seconds < ONE_DAY
      ? "HH:mm:ss"
      : "d [days] HH:mm:ss";
</script>

<div class="flex gap-4 items-center">
  <div>{dayjs(item.time).format("YYYY-MM-DD HH:mm:ss")}</div>

  {#if editing}
    <input bind:value={item.lap.name} />
    <InlineButton on:click={() => deleteLap(item.time)}>Delete</InlineButton>
  {:else}
    <div class="min-w-[100px]">{item.lap.name ?? ""}</div>
    <div>{dayjs.utc(seconds).format(format)}</div>
  {/if}
</div>
