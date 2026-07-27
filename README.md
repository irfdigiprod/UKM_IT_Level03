# 🎨 Modul Pembelajaran Frontend: Aplikasi Admin Pendataan Hafalan Al-Qur'an (Svelte + Vite)

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=flat&logo=svelte&logoColor=white)](https://svelte.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

Selamat datang di repositori **Modul Pembelajaran Frontend Web Development (Svelte)** untuk program studi Teknologi Informasi STAI 2026-2027. Repositori ini berisi materi pembelajaran, panduan langkah demi langkah, serta kode latihan dari **Pertemuan 1 hingga Pertemuan 8**.

Proyek utama dalam modul ini adalah membangun aplikasi **Admin Dashboard Pendataan Hafalan Al-Qur'an (CRUD)** yang terintegrasi dengan REST API Bun Hono dan menggunakan sistem keamanan JWT.

---

## 📋 Fitur Utama Aplikasi Admin Svelte
Aplikasi admin yang akan dibangun memiliki fitur-fitur modern sebagai berikut:
1. **Desain Dashboard Premium & Responsif**: Menggunakan CSS Vanilla modern dengan transisi yang halus, layout grid/flexbox, serta tipografi premium.
2. **Sistem Autentikasi Admin**: Halaman Login & Register terintegrasi dengan backend, penyimpanan token JWT di LocalStorage, dan proteksi halaman (hanya bisa diakses jika sudah login).
3. **CRUD Data Santri**: Form tambah, edit, list data santri, dan hapus santri.
4. **CRUD Pendataan Hafalan**: Mencatat hafalan baru (surah, ayat, penguji), melihat riwayat hafalan santri, dan menghapus data hafalan.
5. **Dashboard Statistik**: Panel ringkasan yang menampilkan total santri, total hafalan tercatat, surah terpopuler, dan grafik mini sederhana.

---

## 📂 Struktur Repositori Frontend
Direktori ini disusun secara bertahap (per-pertemuan) agar mempermudah mahasiswa mengikuti perkembangan materi dari nol hingga selesai.

```text
├── pertemuan01/              # Folder Materi Pertemuan 1: Inisialisasi Svelte & Vite
│   ├── package.json
│   ├── src/App.svelte
│   └── Pertemuan01.md        # Panduan & Teori Pertemuan 1
├── ...
├── pertemuan08/              # Folder Materi Pertemuan 8: Dashboard & Integrasi CRUD Final
│   ├── package.json
│   ├── src/                  # Kode Aplikasi Svelte Produksi Lengkap
│   └── Pertemuan08.md
├── Modul_Svelte.md           # Silabus lengkap & dokumen teori modul Svelte
├── LICENSE                   # Lisensi Creative Commons Attribution 4.0 International
└── README.md                 # Dokumentasi ini
```

---

## 📖 Ringkasan Silabus & Materi Pembelajaran

* **Pertemuan 1**: Pengenalan Svelte, Reactivity & Setup Environment (Vite).
* **Pertemuan 2**: Sintaks Dasar Svelte & Reactivity (`$: label`).
* **Pertemuan 3**: Logic Blocks & Render Conditional (`#if`, `#each`, `#await`).
* **Pertemuan 4**: Event Handling & Component Bindings (`bind:value`).
* **Pertemuan 5**: Integrasi UI Halaman Register, Login & Manajemen Token JWT.
* **Pertemuan 6**: State Management dengan Svelte Stores.
* **Pertemuan 7**: Integrasi Fetch API dengan Authorization Bearer JWT ke Bun Hono API.
* **Pertemuan 8**: Fitur CRUD Hafalan, Dashboard Ringkasan & Desain UI Premium.

*Detail penjelasan materi dan tugas mandiri per pertemuan dapat dibaca secara lengkap di berkas [Modul_Svelte.md](file:///c:/Users/irfan/OneDrive/Documents/STAI-2026-2027/Modul%20IT/Frontend/Frontend_Svelte/Modul_Svelte.md).*

---

## 🚀 Cara Menjalankan Proyek Latihan

### Prasyarat
Pastikan komputer Anda sudah terinstall **Node.js** atau **Bun**.

### Langkah Menjalankan Aplikasi Svelte (Dev Mode)
1. Buka terminal pada folder pertemuan tertentu (misal: `pertemuan01`).
2. Jalankan perintah berikut untuk menginstall dependensi:
   ```bash
   bun install   # atau npm install
   ```
3. Jalankan server lokal:
   ```bash
   bun run dev   # atau npm run dev
   ```
4. Buka URL yang tertera di terminal (biasanya `http://localhost:5173`) di browser Anda.
