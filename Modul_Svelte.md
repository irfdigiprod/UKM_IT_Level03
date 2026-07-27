# Modul Pembelajaran Web Development: Frontend dengan Svelte
## Studi Kasus: Aplikasi Admin Pendataan Hafalan Al-Qur'an (CRUD + JWT Auth)

Modul ini dirancang untuk pembelajaran selama **8 Pertemuan**. Pembelajaran menggunakan pendekatan praktis (*project-based learning*) dengan membangun dan mengembangkan sebuah aplikasi admin dashboard interaktif menggunakan framework **Svelte**, bundler **Vite**, dan integrasi REST API **Bun + Hono**.

---

## Daftar Pertemuan

* [Pertemuan 1: Pengenalan Svelte & Setup Environment](#pertemuan-1-pengenalan-svelte--setup-environment)
* [Pertemuan 2: Sintaks Dasar Svelte & Reactivity](#pertemuan-2-sintaks-dasar-svelte--reactivity)
* [Pertemuan 3: Logic Blocks & Render Conditional](#pertemuan-3-logic-blocks--render-conditional)
* [Pertemuan 4: Event Handling & Component Bindings](#pertemuan-4-event-handling--component-bindings)
* [Pertemuan 5: Integrasi UI Halaman Register, Login & Manajemen Token JWT](#pertemuan-5-integrasi-ui-halaman-register-login--manajemen-token-jwt)
* [Pertemuan 6: State Management dengan Svelte Stores](#pertemuan-6-state-management-dengan-svelte-stores)
* [Pertemuan 7: Integrasi Fetch API dengan Authorization Bearer JWT](#pertemuan-7-integrasi-fetch-api-dengan-authorization-bearer-jwt)
* [Pertemuan 8: Fitur CRUD Hafalan, Dashboard Ringkasan & Desain UI Premium](#pertemuan-8-fitur-crud-hafalan-dashboard-ringkasan--desain-ui-premium)

---

## Rincian Materi Pertemuan

### Pertemuan 1: Pengenalan Svelte & Setup Environment
* **Tujuan**: Memahami arsitektur compiler Svelte yang membedakannya dengan framework Virtual DOM (React/Vue), menginisialisasi proyek Svelte dengan Vite, dan memahami struktur file `.svelte`.
* **Konsep Dasar**:
  - Svelte sebagai compiler (mengubah kode menjadi Vanilla JS efisien saat build-time).
  - Struktur file `.svelte` yang terdiri dari tiga blok: `<script>`, markup HTML, dan `<style>`.
  - Inisialisasi dengan Vite (`npm create vite@latest` atau `bun create svelte`).
* **Praktik**:
  ```html
  <script>
    let title = "Sistem Admin Hafalan Al-Qur'an";
  </script>

  <main>
    <h1>Selamat datang di {title}</h1>
  </main>

  <style>
    h1 {
      color: #ff3e00;
    }
  </style>
  ```
* **Tugas Mandiri**: Setup proyek Svelte baru menggunakan Vite di folder `pertemuan01`, jalankan server lokal, dan modifikasi konten `App.svelte` agar menampilkan informasi profil Anda sendiri beserta teks penyambung.

---

### Pertemuan 2: Sintaks Dasar Svelte & Reactivity
* **Tujuan**: Memahami konsep reactivity di Svelte, deklarasi state lokal, serta penggunaan tag label reactive `$:`.
* **Konsep Dasar**:
  - State reaktif di Svelte dideklarasikan cukup menggunakan kata kunci `let`.
  - Label reaktif `$: ` untuk menghitung ulang nilai secara otomatis (computed property) atau memicu efek samping (side effects) jika state berubah.
* **Praktik**:
  ```html
  <script>
    let jumlahSantri = 5;
    let targetHafalan = 30; // Juz
    $: totalHafalanSelesai = jumlahSantri * 2; // Contoh hitungan reaktif
  </script>

  <p>Jumlah Santri: {jumlahSantri}</p>
  <p>Prediksi Total Juz Dihafal: {totalHafalanSelesai} Juz</p>
  <button on:click={() => jumlahSantri++}>Tambah Santri</button>
  ```
* **Tugas Mandiri**: Buat form input kalkulator reaktif untuk menghitung persentase pencapaian hafalan santri (misal: santri menghafal 15 Juz dari target 30 Juz, tampilkan persentase reaktif `50%` di layar).

---

### Pertemuan 3: Logic Blocks & Render Conditional
* **Tujuan**: Mampu merender elemen HTML secara kondisional dan menampilkan data array menggunakan logic blocks khas Svelte.
* **Konsep Dasar**:
  - Logic block `#if`: Percabangan visual (`{#if}`, `{:else if}`, `{:else}`).
  - Logic block `#each`: Perulangan data array (`{#each data as item, index (key)}`).
  - Penanganan data asinkron langsung di HTML dengan `#await`.
* **Praktik**:
  ```html
  <script>
    let santriList = [
      { id: 1, nama: "Ahmad", kelas: "10-A", gender: "L" },
      { id: 2, nama: "Fatimah", kelas: "10-B", gender: "P" }
    ];
  </script>

  <ul>
    {#each santriList as santri (santri.id)}
      <li>{santri.nama} - Kelas: {santri.kelas} ({santri.gender === 'L' ? 'Ikhwan' : 'Akhwat'})</li>
    {:else}
      <p>Data santri kosong.</p>
    {/each}
  </ul>
  ```
* **Tugas Mandiri**: Buat file Svelte baru yang memiliki daftar santri. Sediakan tombol filter untuk menyaring hanya santri Ikhwan ('L') atau Akhwat ('P') yang tampil di layar menggunakan logic block `#if` dan `#each`.

---

### Pertemuan 4: Event Handling & Component Bindings
* **Tujuan**: Memahami model penanganan event, modifier event, dan two-way data binding pada form input Svelte.
* **Konsep Dasar**:
  - Mengikat event handler dengan sintaks `on:click|preventDefault={handler}`.
  - Two-way binding menggunakan kata kunci `bind:value` yang meniadakan boilerplate `onChange` / `setState`.
* **Praktik**:
  ```html
  <script>
    let nama = "";
    let kelas = "";
    let gender = "L";

    function simpan() {
      alert(`Data Disimpan: ${nama}, Kelas: ${kelas}, Gender: ${gender}`);
    }
  </script>

  <form on:submit|preventDefault={simpan}>
    <input type="text" bind:value={nama} placeholder="Nama Santri" required />
    <select bind:value={kelas}>
      <option value="10-A">10-A</option>
      <option value="10-B">10-B</option>
    </select>
    <label>
      <input type="radio" bind:group={gender} value="L" /> Ikhwan
    </label>
    <label>
      <input type="radio" bind:group={gender} value="P" /> Akhwat
    </label>
    <button type="submit">Tambah</button>
  </form>
  ```
* **Tugas Mandiri**: Buat form input lengkap untuk pencatatan hafalan (Surah, ayat mulai, ayat selesai, tanggal, nama penguji) dan tampilkan secara dinamis di bawah form setiap kali form tersebut disubmit (simpan data dalam array lokal sementara).

---

### Pertemuan 5: Integrasi UI Halaman Register, Login & Manajemen Token JWT
* **Tujuan**: Merancang antarmuka login & register admin, menghubungkannya dengan API auth Bun Hono, dan mengelola token JWT di client.
* **Konsep Dasar**:
  - LocalStorage untuk persistence token JWT.
  - Membaca status login awal dari LocalStorage saat aplikasi pertama kali dimuat.
  - Struktur UI Login/Register yang responsif dan elegan.
* **Praktik**:
  ```typescript
  async function login(username, password) {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login berhasil!");
    }
  }
  ```
* **Tugas Mandiri**: Buat halaman Register dan Login yang dapat berganti tampilan menggunakan variabel boolean (misal `let isLoginMode = true`). Pastikan token JWT tersimpan dengan benar di `localStorage` saat berhasil login.

---

### Pertemuan 6: State Management dengan Svelte Stores
* **Tujuan**: Menggunakan Svelte Stores untuk mengelola state global (status login dan daftar data santri/hafalan) agar tersinkronisasi antar-komponen tanpa "prop drilling".
* **Konsep Dasar**:
  - `writable` store: Store yang nilainya bisa dibaca, diubah, dan di-subscribe secara bebas.
  - Sintaks gula `$store` (auto-subscription) yang membebaskan pengembang dari unsubscribe manual.
* **Praktik**:
  ```typescript
  // store.ts
  import { writable } from 'svelte/store';
  
  export const tokenStore = writable(localStorage.getItem("token") || "");
  export const userStore = writable(null);
  ```
  ```html
  <!-- App.svelte -->
  <script>
    import { tokenStore } from './store';
    function logout() {
      localStorage.removeItem("token");
      tokenStore.set("");
    }
  </script>

  {#if $tokenStore}
    <p>Selamat datang, Admin! <button on:click={logout}>Keluar</button></p>
  {:else}
    <p>Silakan Login Terlebih Dahulu.</p>
  {/if}
  ```
* **Tugas Mandiri**: Buat store baru bernama `santriStore` yang menyimpan array data santri. Sediakan fungsi di dalam file store tersebut untuk menambah dan menghapus santri dari array global.

---

### Pertemuan 7: Integrasi Fetch API dengan Authorization Bearer JWT
* **Tujuan**: Melakukan request asinkronus ke server menggunakan authorization header Bearer Token JWT, serta menangani error 401 Unauthorized secara terpusat.
* **Konsep Dasar**:
  - Mengirim header `Authorization: Bearer <token>` pada setiap fetch request.
  - Menggunakan lifecycle hook `onMount` untuk memuat data dari API saat komponen pertama kali dimuat di layar.
* **Praktik**:
  ```typescript
  import { onMount } from 'svelte';
  import { tokenStore } from './store';

  let santri = [];

  async function loadSantri() {
    const res = await fetch("http://localhost:3000/api/protected/santri", {
      headers: { "Authorization": `Bearer ${$tokenStore}` }
    });
    if (res.status === 401) {
      alert("Sesi habis, silakan login kembali.");
      tokenStore.set("");
      return;
    }
    santri = await res.json();
  }
  
  onMount(loadSantri);
  ```
* **Tugas Mandiri**: Hubungkan halaman CRUD Santri Svelte dengan REST API Bun Hono Anda. Implementasikan operasi GET (ambil data), POST (tambah data), dan DELETE (hapus data) secara real-time ke database backend.

---

### Pertemuan 8: Fitur CRUD Hafalan, Dashboard Ringkasan & Desain UI Premium
* **Tujuan**: Merancang antarmuka dashboard admin yang premium dan dinamis dengan data ringkasan statistik dan form CRUD pencatatan hafalan santri yang lengkap.
* **Konsep Dasar**:
  - Dashboard UI design: Sidebar navigasi, Header info, Main area.
  - Komponen card statistik (total santri, total baris hafalan, rata-rata juz dihafal).
  - Vanilla CSS modern (Glassmorphism, CSS grid, rounded corners, drop shadows, hover micro-animations).
* **Praktik**:
  - Merancang layout utama dashboard yang membagi area CRUD Santri dan CRUD Hafalan Al-Qur'an.
  - Menghubungkan CRUD hafalan ke API backend `/api/protected/hafalan`.
  - Tombol logout yang membersihkan token dan store.
* **Tugas Mandiri**: Selesaikan proyek akhir Anda. Perindah tampilan CSS-nya agar terlihat profesional, bersih, dan modern. Lakukan uji coba penuh dari alur registrasi admin baru -> login -> tambah data santri -> catat hafalan santri tersebut -> dan lihat statistiknya berubah di dashboard.
