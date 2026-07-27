import { writable } from 'svelte/store';

// Token Store dengan inisialisasi awal dari LocalStorage
export const tokenStore = writable<string>(localStorage.getItem("token") || "");

// State Global daftar santri untuk sinkronisasi antar halaman
export const santriStore = writable<any[]>([]);

// Subscribe token changes dan simpan ke LocalStorage otomatis
tokenStore.subscribe((value) => {
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
});