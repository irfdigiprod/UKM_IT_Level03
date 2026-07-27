# Pertemuan 1: Pengenalan Svelte & Setup Environment

## 📖 Teori & Konsep Dasar
1. **Svelte**: Merupakan framework compiler JavaScript. Berbeda dengan React atau Vue yang menggunakan Virtual DOM untuk membandingkan perubahan state pada runtime, Svelte memproses markup secara langsung saat dikompilasi (build-time) sehingga menghasilkan performa yang lebih gegas dengan kode bundle yang sangat kecil.
2. **Struktur File Svelte**: Menggunakan ekstensi `.svelte` yang menggabungkan HTML (markup), JS/TS (`<script>`), dan CSS scoped (`<style>`) dalam satu file komponen yang bersih.

## 💻 Panduan Praktik
1. Install dependensi dengan `bun install` atau `npm install`.
2. Jalankan aplikasi dalam mode development:
   ```bash
   bun run dev
   ```
3. Buka URL localhost di browser untuk melihat hasil render.

## ✍️ Tugas Mandiri
Modifikasi nilai variabel `ustadzName` menjadi nama Anda sendiri di file `src/App.svelte` dan buat background halaman berubah warna saat disentuh/hover.
