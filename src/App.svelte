<script lang="ts">
  import PrimaryButton from "./lib/PrimaryButton.svelte";

  import { animateSteps } from "utils/animate-steps";
  import TimeAgo from "components/TimeAgo.svelte";
  import { useLocalStorage } from "utils/LocalStorage";
  import { addLap, deleteLap, lap, updateLap } from "./model/Lap";
  import dayjs from "dayjs";
  import InlineButton from "./lib/InlineButton.svelte";
    import SecondaryButton from "./lib/SecondaryButton.svelte";

  let start = useLocalStorage("timerStart", Date.now());
  let editing = false
  let editingTime: number | undefined;
  let editingName: string = "";

  const restart = () => {
    const goal = Date.now();
    addLap();

    animateSteps(100, ({ frame }) => {
      start.update((v) => v + Math.ceil(((goal - v) * frame) / 100));
    });
  };

  const editItem = (item) => {
    editingName = item.name ?? "";
    editingTime = item.time;
  };

  const updateItem = () => {
    if (editingTime) {
      updateLap(editingTime, {
        name: editingName,
      });
      editingTime = undefined;
      editingName = "";
    }
  };

  $: list = Object.entries($lap.laps)
    .map(([k, v]) => {
      return {
        time: parseInt(k),
        name: v.name,
      };
    })
    .sort((a, b) => b.time - a.time);
</script>

<div class="grid gap-4 mt-4">
  <div class="grid justify-center gap-4">
    <div
      class="font-bold font-mono text-5xl border-2 border-solid border-slate-100 px-4 py-2 rounded-md">
      <TimeAgo start={$start} />
    </div>
    <PrimaryButton on:click={restart}>Restart</PrimaryButton>
  </div>

  <div
    class="grid justify-center justify-items-start gap-1 overflow-auto max-h-[100px]">
    {#each list as item}
      <div class="flex gap-4 items-center">
        <div>{dayjs(item.time).format("YYYY-MM-DD HH:mm:ss")}</div>

        <div>{item.name ?? ""}</div>
        {#if editingTime === item.time}
          <input bind:value={editingName} />
          <div class="grid gap-2">
            <InlineButton on:click={updateItem}>Ok</InlineButton>
            <InlineButton on:click={() => deleteLap(item.time)}
              >Delete</InlineButton>
          </div>
        {:else if editing}
          <InlineButton on:click={() => editItem(item)}>Edit</InlineButton>
        {/if}
      </div>
    {/each}
  </div>

  <div class="grid justify-center gap-4">
    <SecondaryButton className="w-[100px]" on:click={() => editing = !editing}>Edit</SecondaryButton>
  </div>
</div>
