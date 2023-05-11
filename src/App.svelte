<script lang="ts">
  import LapRow from "./LapRow.svelte";

  import PrimaryButton from "./lib/PrimaryButton.svelte";

  import { animateSteps } from "utils/animate-steps";
  import TimeAgo from "components/TimeAgo.svelte";
  import { useLocalStorage } from "utils/LocalStorage";
  import { addLap, lap, updateLaps } from "./model/Lap";
  import SecondaryButton from "./lib/SecondaryButton.svelte";

  let start = useLocalStorage("timerStart", Date.now());
  let editing = false;

  const restart = () => {
    const goal = Date.now();

    animateSteps(100, ({ frame }) => {
      start.update((v) => v + Math.ceil(((goal - v) * frame) / 100));
    });
  };
  const record = () => {
    const goal = Date.now();
    addLap({
      seconds: goal - $start,
    });

    animateSteps(100, ({ frame }) => {
      start.update((v) => v + Math.ceil(((goal - v) * frame) / 100));
    });
  };

  $: list = Object.entries($lap.laps)
    .map(([k, v]) => {
      return {
        time: parseInt(k),
        lap: v,
      };
    })
    .sort((a, b) => b.time - a.time);

  const toggleEditing = () => {
    if (editing) {
      updateLaps(list);
      editing = false;
    } else {
      editing = true;
    }
  };
</script>

<div class="grid gap-4 mt-4">
  <div class="grid justify-items-center gap-4">
    <div
      class="font-bold font-mono text-5xl border-2 border-solid border-slate-100 px-4 py-2 rounded-md">
      <TimeAgo start={$start} />
    </div>
    <div class="flex gap-2">
      <SecondaryButton on:click={restart}>Restart</SecondaryButton>
      <PrimaryButton on:click={record}>Record</PrimaryButton>
    </div>
  </div>

  <div
    class="grid justify-center justify-items-start gap-1 overflow-auto max-h-[100px]">
    {#each list as item}
      <LapRow bind:item {editing} />
    {/each}
  </div>

  <div class="grid justify-center gap-4">
    <SecondaryButton className="w-[100px]" on:click={toggleEditing}
      >{editing ? "Save" : "Edit"}</SecondaryButton>
  </div>
</div>
