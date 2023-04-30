import {writable, type Writable} from "svelte/store";

export const getLocalStorage = <T>(key: string, init: T, mutate?: (T) => T): T | null => {
  const text = localStorage.getItem(key);
  if (!text) return init;

  if (typeof init === 'number') {
    const ans = parseInt(text);
    if (isNaN(ans)) {
      return init;
    }
    else {
      return ans as T;
    }
  }

  try {
    const data = JSON.parse(text);

    if (data == null) return init;
    let ans = {
      ...init,
      ...data,
    }
    if (mutate != null) ans = mutate(ans);
    return ans;
  } catch (e) {
    return text as T;
  }
}

export const setLocalStorage = <T>(key: string, data: T) => {
  if (typeof data === 'string') {
    localStorage.setItem(key, data);
  }
  else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

const sharedVariable: {
  [k: string]: Writable<any>,
} = {}

export const useLocalStorage = <T>(key: string, initialValue: T): Writable<T> => {
  if (sharedVariable[key]) return sharedVariable[key];

  const value = getLocalStorage<T>(key, initialValue);

  const w = writable(value);
  w.subscribe((value) => {
    setLocalStorage(key, value)
  })
  return sharedVariable[key] = w;
}