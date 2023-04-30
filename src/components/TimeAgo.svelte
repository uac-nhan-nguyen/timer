<script lang="ts">
  // IMPORT
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";

  // EXPORT
  export let start: number;

  dayjs.extend(utc);
  const ONE_HOUR = 1000 * 60 * 60;
  const ONE_DAY = 1000 * 60 * 60 * 24;

  let diff;
  let format;
  let now = Date.now()

  $:{
    diff = now - start;
    format = diff < ONE_HOUR ? "mm:ss" : diff < ONE_DAY ? "HH:mm:ss" : 'd [days] HH:mm:ss';
  }

  setInterval(() => {
    now = Date.now()
  }, 100);
</script>

{dayjs.utc(diff).format(format)}
