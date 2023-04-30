<script lang="ts">
  import { animateSteps } from "utils/animate-steps";
  import TimeAgo from "components/TimeAgo.svelte";
  import {useLocalStorage} from "utils/LocalStorage";

  let start = useLocalStorage('timerStart', Date.now());

  const restart = () => {
    const goal = Date.now();

    animateSteps(100, ({ frame }) => {
      start.update((v) => v + Math.ceil(((goal - v) * frame) / 100))
    });
  };
</script>

<div class="h-screen grid items-center">
  <div class="grid flex-1 items-center pb-[40vh]">
    <!-- <h1 class="text-slate-600">Timer</h1> -->
    <div class="grid justify-center justify-items-center gap-4">
      <div
        class="font-bold font-mono text-5xl border-2 border-solid border-slate-100 px-4 py-2 rounded-md"
      >
        <TimeAgo start={$start}/>
      </div>
      <button
        class=" rounded-none bg-red-600 text-white border-none px-4 py-2 cursor-pointer hover:bg-red-400 duration-100 uppercase font-bold tracking-widest"
        on:click={restart}>Restart</button
      >
    </div>
  </div>
</div>
