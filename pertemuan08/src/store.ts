import { writable } from 'svelte/store';

export const tokenStore = writable<string>(localStorage.getItem("token") || "");
export const santriStore = writable<any[]>([]);
export const hafalanStore = writable<any[]>([]);

tokenStore.subscribe((value) => {
  if (value) localStorage.setItem("token", value);
  else localStorage.removeItem("token");
});