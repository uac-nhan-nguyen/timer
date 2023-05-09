import { useLocalStorage } from "utils/LocalStorage"

type LapData = {
  laps: {
    [t: number]: {
      name?: string,
    }
  }
}

export const lap = useLocalStorage<LapData>('lap-data-3', {
  laps: {}
});

let last: number;
export const addLap = (props?: {
  name?: string,
}) => {
  const now = Date.now();
  if (last && Math.abs(last - now) < 1000) {
    return;
  }

  last = now

  lap.update((v: LapData) => {
    return {
      laps: {
        ...v.laps,
        [now]: {
          name: props?.name
        }
      }
    }
  })
}

export const updateLap = (id: number, props: {
  name?: string,
}) => {
  lap.update((v) => {
    const current = v.laps[id];
    const nextLaps = {
      ...v.laps,
      [id]: {
        ...current,
        ...props,
      }
    };
    return {
      laps: nextLaps
    }
  })
}

export const deleteLap = (id: number) => {
  lap.update((v) => {
    const nextLaps = { ...v.laps };
    delete nextLaps[id];
    return {
      laps: nextLaps
    }
  })
}