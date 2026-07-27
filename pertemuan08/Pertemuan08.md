# Pertemuan 8: Fitur CRUD Hafalan, Dashboard Ringkasan & Desain UI Premium

## 📖 Teori & Konsep Dasar
1. **Desain Admin Dashboard Modern**: Menggunakan sidebar/tab navigasi untuk menyederhanakan perpindahan antar halaman. Card layout untuk ringkasan metrik statistik cepat, serta tabel yang dinamis untuk visualisasi data tabular.
2. **Modular Helper Fetch API**: Memadatkan pemanggilan Fetch API ke dalam fungsi pembantu reusable (`fetchAPI`) yang secara otomatis menyisipkan Authorization Token header dan mendeteksi kode status error `401 Unauthorized` untuk menangani force logout.

## 💻 Panduan Praktik
1. Nyalakan backend Bun Hono Anda di port 3000.
2. Jalankan aplikasi Svelte ini.
3. Silakan lakukan demo full stack: log in admin -> daftarkan santri baru -> input setoran hafalan santri tersebut -> dan amati grafik serta statistik berubah secara dinamis di tab Dashboard.

## 💡 Catatan Penting & Troubleshooting (Wajib Dibaca)
Saat mengembangkan frontend menggunakan Svelte, Vite, dan TypeScript, perhatikan aspek krusial berikut:
1. **File Entry Point Proyek**: Setiap folder proyek mandiri Vite memerlukan tiga file utama di root: `index.html` (titik masuk HTML), `src/main.ts` (bootstrap script), dan `vite.config.ts` (konfigurasi compiler).
2. **TypeScript Preprocessor di Svelte**: Komponen Svelte dengan tag `<script lang="ts">` membutuhkan preprocessor aktif di `vite.config.ts` agar compiler Vite memahami sintaks TypeScript. Konfigurasinya menggunakan `preprocess: [vitePreprocess()]` dari `@sveltejs/vite-plugin-svelte`.
3. **Instalasi Package di Windows OneDrive**: Bun secara default menggunakan link filesystem (*hardlink*). Jika Anda menginstal di dalam folder yang tersinkronisasi dengan OneDrive, proses ekstraksi file di root package (seperti `zod`) bisa gagal. Gunakan alternatif `npm install` atau jalankan `bun install --backend copyfile` agar file disalin secara fisik ke `node_modules` Anda.

## ✍️ Tugas Mandiri
Buatlah panel popup modal konfirmasi persetujuan kustom yang menarik menggunakan HTML/CSS Svelte saat menghapus data santri/hafalan, alih-alih menggunakan `confirm()` bawaan browser.
